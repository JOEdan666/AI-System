'use client';

import React, { useState, useEffect, useRef } from 'react';
import { LearningState } from '../../types/learning';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import ReAskModal from './ReAskModal';
import TableRenderer, { parseMarkdownTable } from '../TableRenderer';

interface ExplainStepProps {
  content: string;
  onNext: () => void;
  onAskQuestion?: (question: string) => void;
  step?: LearningState;
  onSkipToQuiz?: () => void;
  questionCount?: number;
  socraticDialogue?: Array<{question: string; answer: string; feedback?: string}>;
  onSocraticDialogueUpdate?: (dialogue: Array<{question: string; answer: string; feedback?: string}>) => void;
  subject?: string;
  topic?: string;
  initialAiExplanation?: string; // 从数据库恢复的AI讲解内容
  onAiExplanationUpdate?: (content: string) => void; // 保存AI讲解内容的回调
  selectedRegion?: string; // 选择的地区
  selectedCurriculum?: string; // 选择的考纲
  grade?: string; // 年级
}

// 自定义Markdown组件，优化字体和样式 - 浅蓝色主题
const customComponents = {
  h1: ({node, ...props}: any) => <h1 className="text-3xl font-bold mt-8 mb-6 text-blue-900 leading-tight" {...props} />,
  h2: ({node, ...props}: any) => <h2 className="text-2xl font-bold mt-6 mb-4 text-blue-800 leading-tight" {...props} />,
  h3: ({node, ...props}: any) => <h3 className="text-xl font-semibold mt-5 mb-3 text-blue-700 leading-tight" {...props} />,
  p: ({node, ...props}: any) => <p className="mb-4 text-blue-900 leading-relaxed text-lg" {...props} />,
  strong: ({node, ...props}: any) => <strong className="font-bold text-indigo-700" {...props} />,
  ul: ({node, ...props}: any) => <ul className="list-disc pl-6 mb-6 space-y-2" {...props} />,
  ol: ({node, ...props}: any) => <ol className="list-decimal pl-6 mb-6 space-y-2" {...props} />,
  li: ({node, ...props}: any) => <li className="text-blue-900 leading-relaxed text-lg" {...props} />,
  blockquote: ({node, ...props}: any) => <blockquote className="border-l-4 border-blue-400 pl-6 italic text-blue-800 bg-blue-50 py-4 rounded-r-lg my-6 shadow-sm" {...props} />,
  code: ({node, inline, ...props}: any) => 
    inline 
      ? <code className="bg-blue-100 rounded px-2 py-1 font-mono text-sm text-indigo-700" {...props} />
      : <code className="block bg-blue-50 rounded-lg p-4 font-mono text-sm overflow-x-auto text-blue-900 border border-blue-200" {...props} />,
  pre: ({node, ...props}: any) => <pre className="bg-blue-50 rounded-lg p-4 overflow-x-auto mb-6 border border-blue-200" {...props} />,
  // 表格样式组件 - 简洁整洁的表格外观
  table: ({node, ...props}: any) => (
    <div className="overflow-x-auto my-4 rounded-lg shadow-md border border-gray-200">
      <table className="w-full border-collapse bg-white" {...props} />
    </div>
  ),
  thead: ({node, ...props}: any) => (
    <thead className="bg-blue-100" {...props} />
  ),
  tbody: ({node, ...props}: any) => <tbody {...props} />,
  th: ({node, ...props}: any) => (
    <th className="px-4 py-3 text-center text-sm font-bold text-gray-800 border border-gray-300" {...props} />
  ),
  td: ({node, ...props}: any) => (
    <td className="px-4 py-3 text-center text-sm text-gray-700 border border-gray-300 whitespace-pre-wrap" {...props} />
  ),
  tr: ({node, ...props}: any) => <tr className="bg-white even:bg-gray-50 hover:bg-blue-50 transition-colors duration-200" {...props} />,
};

// 混合渲染函数：检测表格并选择合适的渲染方式
const renderContentWithTables = (content: string) => {
  // 检查内容是否包含表格
  const hasTable = parseMarkdownTable(content) !== null;
  
  if (hasTable) {
    // 如果包含表格，使用改进的分割逻辑
    const tableRegex = /^\s*\|(.+)\|\s*\n\s*\|[-\s|:]+\|\s*\n((?:\s*\|.+\|\s*\n?)*)/gm;
    let lastIndex = 0;
    const parts = [];
    let match;
    
    // 重置正则表达式的lastIndex
    tableRegex.lastIndex = 0;
    
    while ((match = tableRegex.exec(content)) !== null) {
      // 添加表格前的内容
      if (match.index > lastIndex) {
        const beforeTable = content.substring(lastIndex, match.index).trim();
        if (beforeTable) {
          parts.push({ type: 'markdown', content: beforeTable });
        }
      }
      
      // 添加表格内容
      parts.push({ type: 'table', content: match[0] });
      
      lastIndex = match.index + match[0].length;
    }
    
    // 添加最后一个表格后的内容
    if (lastIndex < content.length) {
      const afterTable = content.substring(lastIndex).trim();
      if (afterTable) {
        parts.push({ type: 'markdown', content: afterTable });
      }
    }
    
    return (
      <div>
        {parts.map((part, index) => {
          if (part.type === 'table') {
            return <TableRenderer key={index} content={part.content} />;
          } else {
            // 非表格内容使用ReactMarkdown渲染
            return (
              <ReactMarkdown
                key={index}
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeKatex]}
                components={customComponents}
              >
                {part.content}
              </ReactMarkdown>
            );
          }
        })}
      </div>
    );
  } else {
    // 如果没有表格，直接使用ReactMarkdown
    return (
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={customComponents}
      >
        {content}
      </ReactMarkdown>
    );
  }
};

export default function ExplainStep({ 
  content, 
  onNext, 
  onAskQuestion, 
  step, 
  onSkipToQuiz,
  questionCount = 0,
  socraticDialogue = [],
  onSocraticDialogueUpdate,
  subject,
  topic,
  initialAiExplanation = '',
  onAiExplanationUpdate,
  selectedRegion = '全国',
  selectedCurriculum = '',
  grade = ''
}: ExplainStepProps) {
  const [showReAskModal, setShowReAskModal] = useState(false);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [aiExplanation, setAiExplanation] = useState(initialAiExplanation);
  const [isAnswering, setIsAnswering] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // 动态生成AI讲解prompt的方法
  const generateDynamicPrompt = (topic?: string, subject?: string, curriculumInfo?: string) => {
    return `🎭 角色设定  
 你是一名【系统化AI学习教练】，能针对任何学科或知识点（语文、数学、英语、物理、化学、生物、历史、地理、政治、编程、通识、音乐等）进行完整系统讲解。  
 你融合课本体系、考试要求、知识图谱与跨学科创造思维，目标是让我真正实现"学懂 → 会用 → 能迁移"。  
 你既是学霸级讲解者，也是启发式导师，讲解风格像真实课堂——有节奏、有思维、有启发。 
 
 --- 
 
 🎯 教学总目标  
 1. 让我在短时间内高效率、高质量掌握一个知识点，并能独立运用于考试与实际生活。  
 2. 内容系统化、逻辑清晰、层次分明，覆盖"教材知识 + 考纲核心 + 实际应用"。  
 3. 按学科类型自动调整讲解重点（如物理讲实验与计算、语文讲思维与表达、数学讲方法与解题策略）。  
 4. 通过"理解 → 运用 → 迁移"的认知递进，让我真正掌握知识结构与解题逻辑。  
 5. 在课堂中穿插启发式问题、小总结与思考点，帮助我主动思考而非被动听讲。  
 
 --- 
 
 🧠 教学工作流（智能学习闭环）  
 讲解遵循"导图概览 → 系统讲解 → 例题演练 → 拓展提升 → 课堂小结与复盘"五步逻辑，表达自然流畅，像课堂一样递进展开。  
 
 --- 
 
 【第一步｜知识导图与整体框架】  
 在正式讲解前，先输出该知识点的**思维导图或知识框架**（树状文本结构）。  
 要求：  
 - 层次分明（核心概念 → 原理 → 方法 → 应用）  
 - 框架符合《人教版教材》《地方考试大纲》《主流题库知识体系》  
 - 节点简明清晰，如：  
   知识点A  
    ├─ 核心概念  
    ├─ 原理与规律  
    ├─ 解题方法  
    ├─ 易错点  
    └─ 应用与拓展  
 
 --- 
 
 【第二步｜系统化讲解（核心环节）】  
 对导图内容进行系统讲解，语气自然、生动、逻辑递进，帮助我**"听懂、想通、会做"**。  
 要求：  
 - **结构化讲解**：概念 → 原理 → 方法 → 应用，层层深入；  
 - **考纲融合**：结合考试要求与题型能力目标讲解；  
 - **思维引导**：用"为什么？→怎么用？→还有别的方法吗？"激发思考；  
 - **视觉化理解**：必要时用生活例子、图像或比喻帮助理解；  
 - **学科自适应重点**：  
   - 语文/英语：阅读技巧、写作逻辑、语法与表达；  
   - 数学：公式原理、思维模型、题型规律；  
   - 物理/化学：实验原理、计算思路、易混点与真实应用；  
   - 生物：结构功能关系、概念链条、图像与过程逻辑；  
   - 历史/政治/地理：因果关系、事件逻辑、时间线、人物与影响；  
   - 编程/通识：算法逻辑、结构思维、创新应用；  
 - **认知递进层**：  
   ① 理解层——讲清概念与原理；  
   ② 运用层——讲清方法与做题逻辑；  
   ③ 迁移层——讲清思路如何推广到新情境；  
 - **课堂体验**：讲解要像老师授课，有节奏、有提问、有归纳；  
 - **课堂小结与核心记忆法（选填）**：  
   - 在该部分末尾，输出一句简洁的"课堂小结"，用一句话回顾本节核心。  
   - 若遇到生物、历史等需要记忆的重点，可在必要时提供**1~3个巧妙记忆法或口诀**（如"哥赔五双鞋"记《南京条约》内容）。  
   - 口诀仅在关键、抽象或高考/中考必背内容出现时使用，不可滥用。  
   - 记忆法必须简单、有逻辑、不生造。  
 
 --- 
 
 【第三步｜题型训练与解法讲解】  
 结合考试题型与考纲要求，展示高频题与完整解题过程。  
 要求：  
 - **题型覆盖**：包含基础、中档、拔高层次；  
 - **分步引导**：从思路出发，逐步推理到答案；  
 - **详细讲解内容包括：**  
   1. 高频题型分析（2–3种）  
   2. 典型例题讲解：  
      - 题目内容  
      - 解题思路（从审题到分析）  
      - 分步提示（每步原因与逻辑）  
      - 完整解析（含推导、运算、论证）  
      - 标准答案（明确结果）  
      - 答题逻辑总结（这题考什么、为什么这样做）  
   3. 变式题（迁移练习）——帮助我举一反三；  
   4. 易错点（列出3个常见错误 + 对策）；  
   5. 拔高题1道，指出"思维跳跃点"与提升方向。  
 
 题目要体现**做题逻辑 + 思维路径 + 答案总结**，不是单纯给结果。  
 讲解中可穿插"思考微提问"，如："下一步你会想到哪条公式？"、"有没有更简的做法？"  
 
 --- 
 
 【第四步｜跨学科与创造应用】（选填）  
 展示该知识在其他领域的延伸与启发。  
 - 数学模型 → AI算法、经济分析；  
 - 物理原理 → 工程、机械、编程逻辑；  
 - 历史规律 → 社会决策、创新启示；  
 - 艺术规律 → 审美与设计。  
 要求内容真实、有启发、可落地。  
 
 --- 
 
 【第五步｜课堂复盘与行动卡】  
 总结本节的核心要点：  
 1. 一句话复盘：今天我学到了什么？  
 2. 若有必要，再输出1个核心记忆法（选填）。  
 3. 三步强化建议：  
    - 今日最清晰的模型是什么？  
    - 我的瓶颈：难度 / 盲区 / 速度？  
    - 下一步补强行动（3个步骤）。  
 → 输出行动卡：目标｜执行步骤｜截止时间｜突破点。  
 
 --- 
 
 🚀 输出与教学规范  
 • 风格：系统化、启发式、贴近课堂节奏，适合小学–高中学生。  
 • 节奏：先导图→再讲解→再做题→最后总结。  
 • 内容：逻辑连贯，逐层深入；讲解要有课堂"呼吸感"。  
 • 解题：必须包含"思路 + 步骤 + 过程 + 答案 + 总结"。  
 • 小结：每节课末尾输出课堂小结，可选附核心记忆法（限1–3条）。  
 • 不输出寒暄、自我说明或模板句式。  
 
 --- 
 
 🌍 教学思维指令（模型内部逻辑）  
 1. 自动识别学科类型与难度层。  
 2. 优先调用教材核心概念与考纲能力要求。  
 3. 在讲解中自然嵌入图示、比喻、记忆法和微提问。  
 4. 解题环节严格遵循"思路→推理→答案→反思"。  
 5. 每次讲解结尾必须输出"课堂小结"，如遇复杂内容可附一句核心记忆法。  
 6. 全程保持课堂感、学习体验感和节奏感。  
 
 --- 
 
 ✅ 输出模板示例  
 【知识导图】  
 主题 → 子概念 → 方法 → 应用 → 易错点  
 
 【系统讲解】  
 ……  
 
 【题型讲解】  
 题目：……  
 思路：……  
 分步解析：……  
 标准答案：……  
 总结：……  
 
 【拓展与创造应用】  
 ……  
 
 【课堂小结与行动卡】  
 目标｜步骤｜截止时间｜突破点  

${curriculumInfo || ''}

## 📖 具体任务
请基于以上要求，对"${topic}"这一主题进行专业、系统、高质量的讲解。`;
  };

  // 生成AI讲解
  const generateAIExplanation = async () => {
    if (aiExplanation || isGeneratingAI) return;
    
    setIsGeneratingAI(true);
    try {
      // 获取考纲信息
      let curriculumInfo = '';
      if (selectedRegion && grade && subject && topic) {
        try {
          const { getCurriculumByRegion, getTopicRequirements } = await import('../../data/curriculumDatabase');
          const curriculum = getCurriculumByRegion(selectedRegion, grade, subject);
          const topicData = getTopicRequirements(selectedRegion, grade, subject, topic);
          
          if (curriculum && topicData?.topic) {
            curriculumInfo = `
## 📋 考纲依据
**地区**: ${selectedRegion}地区
**年级**: ${grade}
**学科**: ${subject}
**主题**: ${topicData.topic.name}

### 🎯 考纲要求
**难度等级**: ${topicData.topic.difficulty}
**考试权重**: ${topicData.topic.examWeight}%
**核心要点**: ${topicData.topic.keyPoints.join('、')}
**学习目标**: ${topicData.topic.learningObjectives.join('；')}

### 📝 具体要求
${topicData.requirements.map((req: any) => `- **${req.level}级要求**: ${req.requirement}`).join('\n')}

### ⚠️ 常见错误
${topicData.requirements.flatMap((req: any) => req.commonMistakes).map((mistake: string) => `- ${mistake}`).join('\n')}

### 💡 典型例题类型
${topicData.requirements.flatMap((req: any) => req.examples).map((example: string) => `- ${example}`).join('\n')}
`;
          }
        } catch (error) {
          console.warn('获取考纲信息失败，使用通用模板:', error);
        }
      }
      
      const response = await fetch('/api/openai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content: generateDynamicPrompt(topic, subject, curriculumInfo)
            },
            {
              role: 'user',
              content: `请详细讲解以下内容：\n\n${content}`
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate AI explanation');
      }

      const data = await response.json();
      const explanation = data.content;
      setAiExplanation(explanation);
      
      // 立即保存到数据库
      if (onAiExplanationUpdate) {
        try {
          await onAiExplanationUpdate(explanation);
          console.log('AI讲解内容已保存到数据库');
        } catch (error) {
          console.error('保存AI讲解内容失败:', error);
        }
      }
    } catch (error) {
      console.error('Error generating AI explanation:', error);
      // 设置一个默认的错误提示内容
      setAiExplanation(`
## 😅 AI讲解暂时不可用

抱歉，AI讲解功能暂时遇到了一些技术问题。不过别担心，你仍然可以：

### 📚 学习建议
1. **仔细阅读原始内容** - 先尝试自己理解材料
2. **记录疑问点** - 把不懂的地方标记出来
3. **查阅相关资料** - 使用教科书或在线资源
4. **与同学讨论** - 交流学习心得和理解

### 🎯 接下来你可以
- 点击"开始练习"直接进入题目练习
- 使用"苏格拉底式提问"功能进行互动学习
- 稍后再试AI讲解功能

**提示**: 系统正在努力修复中，请稍后再试！
      `);
    } finally {
      setIsGeneratingAI(false);
    }
  };

  // 苏格拉底式提问
  const handleSocraticQuestion = async () => {
    if (isAnswering) return;
    
    setIsAnswering(true);
    try {
      // 获取考纲信息
      let curriculumInfo = '';
      if (selectedRegion && grade && subject && topic) {
        try {
          const { getCurriculumByRegion, getTopicRequirements } = await import('../../data/curriculumDatabase');
          const curriculum = getCurriculumByRegion(selectedRegion, grade, subject);
          const topicData = getTopicRequirements(selectedRegion, grade, subject, topic);
          
          if (curriculum && topicData?.topic) {
            curriculumInfo = `
## 📋 考纲依据
**地区**: ${selectedRegion}地区
**年级**: ${grade}
**学科**: ${subject}
**主题**: ${topicData.topic.name}

### 🎯 考纲要求
**难度等级**: ${topicData.topic.difficulty}
**考试权重**: ${topicData.topic.examWeight}%
**核心要点**: ${topicData.topic.keyPoints.join('、')}
**学习目标**: ${topicData.topic.learningObjectives.join('；')}

### 📝 具体要求
${topicData.requirements.map((req: any) => `- **${req.level}级要求**: ${req.requirement}`).join('\n')}

### ⚠️ 常见错误
${topicData.requirements.flatMap((req: any) => req.commonMistakes).map((mistake: string) => `- ${mistake}`).join('\n')}
`;
          }
        } catch (error) {
          console.warn('获取考纲信息失败，使用通用模板:', error);
        }
      }

      const response = await fetch('/api/openai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content: `你是一位使用苏格拉底式教学法的资深教师，专门针对${selectedRegion || ''}地区${grade || ''}学生进行教学。基于学习内容、考纲要求和之前的对话，提出一个引导性问题来帮助学生深入思考。

${curriculumInfo}

## 🎯 苏格拉底式提问原则

### 📋 问题设计要求
1. **考纲对标**：问题必须紧扣上述考纲要求和学习目标
2. **引导思考**：不直接给出答案，而是引导学生自主思考
3. **循序渐进**：根据学生理解程度逐步深入
4. **针对性强**：针对常见错误和难点设计问题
5. **启发性强**：能够启发学生发现问题本质

### 🔍 问题类型策略
- **概念理解类**：帮助学生理解核心概念的本质
- **应用分析类**：引导学生将知识应用到具体情境
- **比较对比类**：帮助学生区分相似概念或方法
- **因果关系类**：引导学生思考现象背后的原因
- **举一反三类**：帮助学生从具体例子中抽象出一般规律

### ⚠️ 避免的问题类型
- 简单的是非题或选择题
- 纯记忆性问题
- 过于开放没有明确方向的问题
- 超出学生认知水平的问题

### 📤 输出要求
请直接输出一个具体的苏格拉底式问题，不需要额外的解释或格式。问题应该：
- 简洁明了，一次只问一个核心问题
- 具有启发性，能引导学生思考
- 符合考纲要求和学习目标
- 适合当前学习阶段`
            },
            {
              role: 'user',
              content: `学习内容：${content}\n\n之前的对话：${JSON.stringify(socraticDialogue)}\n\n请基于考纲要求提出下一个引导性问题。`
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate question');
      }

      const data = await response.json();
      setCurrentQuestion(data.content);
    } catch (error) {
      console.error('Error generating question:', error);
      // 设置一个默认的问题
      setCurrentQuestion('很抱歉，AI提问功能暂时不可用。不过你可以尝试思考：这个内容的核心概念是什么？它在实际生活中有什么应用？');
    } finally {
      setIsAnswering(false);
    }
  };

  // 提交答案并获取反馈
  const handleAnswerSubmit = async () => {
    if (!userAnswer.trim() || !currentQuestion) return;

    try {
      const response = await fetch('/api/openai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content: `你是一位耐心的老师，正在使用苏格拉底式教学法。请对学生的回答给出建设性的反馈，并决定是否需要进一步提问。反馈应该：
1. 肯定正确的部分
2. 指出需要改进的地方
3. 提供适当的引导
4. 鼓励深入思考`
            },
            {
              role: 'user',
              content: `问题：${currentQuestion}\n学生回答：${userAnswer}\n\n请给出反馈。`
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get feedback');
      }

      const data = await response.json();
      const feedback = data.content;

      // 更新对话记录
      const newDialogue = [...socraticDialogue, {
        question: currentQuestion,
        answer: userAnswer,
        feedback: feedback
      }];
      onSocraticDialogueUpdate?.(newDialogue);

      // 清空当前问答
      setCurrentQuestion('');
      setUserAnswer('');
    } catch (error) {
      console.error('Error getting feedback:', error);
      // 提供默认反馈
      const defaultFeedback = '很抱歉，AI反馈功能暂时不可用。不过你的思考很有价值！请继续保持这种学习态度，可以尝试从不同角度思考这个问题。';
      
      // 更新对话记录
      const newDialogue = [...socraticDialogue, {
        question: currentQuestion,
        answer: userAnswer,
        feedback: defaultFeedback
      }];
      onSocraticDialogueUpdate?.(newDialogue);

      // 清空当前问答
      setCurrentQuestion('');
      setUserAnswer('');
    }
  };

  // 保存学习记录
  const handleSaveLearningRecord = async () => {
    if (isSaving) return;
    
    setIsSaving(true);
    try {
      // 生成会话ID
      const conversationId = `session_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
      
      // 准备学习数据
      const learningData = {
        conversationId,
        subject: subject || '语文',
        topic: topic || '静夜思',
        region: selectedRegion,
        grade: grade,
        aiExplanation: aiExplanation || content,
        socraticDialogue: socraticDialogue,
        currentStep: 'EXPLAIN',
        isCompleted: false
      };

      // 调用API保存数据
      const response = await fetch('/api/learning-progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(learningData)
      });

      if (!response.ok) {
        throw new Error('保存学习记录失败');
      }

      const result = await response.json();
      console.log('学习记录保存成功:', result);
      
      // 显示成功提示
      alert('学习记录已保存！');
      
    } catch (error) {
      console.error('保存学习记录失败:', error);
      alert('保存失败，请重试');
    } finally {
      setIsSaving(false);
    }
  };

  // 组件挂载时生成AI讲解
  useEffect(() => {
    if (!initialAiExplanation) {
      generateAIExplanation();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 relative">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white/50 to-blue-100/30"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]"></div>
      <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(147,197,253,0.1),transparent_50%)]"></div>
      
      {/* 主要内容区域 */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* 头部区域 */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-10 mb-8 border border-blue-100/50">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  知识深度讲解
                </h1>
                <p className="text-blue-600/70 text-lg font-medium">
                  {step === 'EXPLAIN' && '第 1 步 · 理解与掌握'}
                  {step === 'CONFIRM' && '第 2 步 · 确认理解'}
                  {step === 'QUIZ' && '第 3 步 · 智能测验'}
                  {step === 'REVIEW' && '第 4 步 · 智能复习'}
                  {!step && '第 1 步 · 理解与掌握'}
                </p>
              </div>
            </div>
            
            {/* AI状态指示器 */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 bg-blue-50/80 px-4 py-2 rounded-xl border border-blue-200/50">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full animate-pulse"></div>
                <span className="text-blue-700 font-medium text-sm">AI智能分析中</span>
              </div>
            </div>
          </div>
          
          {/* 学习进度 */}
          <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100/50">
            <div className="flex items-center justify-between mb-3">
              <span className="text-blue-700 font-semibold text-lg">学习进度</span>
              <span className="text-blue-600 font-medium">
                {step === 'EXPLAIN' && '25%'}
                {step === 'CONFIRM' && '50%'}
                {step === 'QUIZ' && '75%'}
                {step === 'REVIEW' && '100%'}
                {!step && '25%'}
              </span>
            </div>
            <div className="w-full bg-blue-100/70 rounded-full h-3 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-500 ease-out shadow-sm"
                style={{ 
                  width: step === 'EXPLAIN' ? '25%' : 
                         step === 'CONFIRM' ? '50%' : 
                         step === 'QUIZ' ? '75%' : 
                         step === 'REVIEW' ? '100%' : '25%' 
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* 内容区域 */}
        <div ref={contentRef} data-screenshot-content className="space-y-8">
          
          {/* AI智能讲解 - 优化设计 */}
          <div className="bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50 border-2 border-blue-200 rounded-3xl p-10 shadow-2xl mb-10">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mr-6 shadow-xl border border-blue-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-blue-800">AI智能深度讲解</h2>
              </div>
              {isGeneratingAI && (
                <div className="ml-4 animate-spin rounded-full h-7 w-7 border-b-2 border-blue-500"></div>
              )}
            </div>
            
            {isGeneratingAI ? (
              <div className="flex items-center justify-center h-40">
                <div className="text-center">
                  <div className="relative mb-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-sky-200 border-t-sky-500 mx-auto"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="w-6 h-6 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-blue-700 font-medium">AI正在为您生成专业讲解...</p>
                </div>
              </div>
            ) : aiExplanation ? (
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-blue-200">
                <div className="prose prose-blue max-w-none prose-lg">
                  {renderContentWithTables(aiExplanation)}
                </div>
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-cyan-100 border-2 border-blue-300 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-blue-800 mb-3">准备生成专业教练讲解</h3>
                <p className="text-blue-600 mb-6">点击下方按钮开始专业讲解</p>
                <button
                  onClick={generateAIExplanation}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg border-2 border-blue-600 hover:border-blue-700 relative z-10"
                >
                  🤖 开始专业私教讲解
                </button>
              </div>
            )}
          </div>

          {/* 苏格拉底式对话区域 - 优化版 */}
          {socraticDialogue.length > 0 && (
            <div className="mt-8 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 border-2 border-indigo-200 rounded-2xl p-8 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-indigo-800">🎯 苏格拉底式深度对话</h3>
                    <p className="text-sm text-indigo-600 mt-1">通过启发式提问，引导深入思考</p>
                  </div>
                </div>
                <div className="bg-white rounded-full px-4 py-2 shadow-md border border-indigo-200">
                  <span className="text-sm font-semibold text-indigo-700">
                    {socraticDialogue.length} 轮对话
                  </span>
                </div>
              </div>
              
              <div className="space-y-6 max-h-96 overflow-y-auto pr-2">
                {socraticDialogue.map((dialogue, index) => (
                  <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-indigo-100 hover:shadow-xl transition-all duration-300">
                    {/* 问题部分 */}
                    <div className="mb-4">
                      <div className="flex items-start mb-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mr-3 shadow-md flex-shrink-0">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <span className="font-bold text-blue-700 text-sm uppercase tracking-wide">🎓 老师提问</span>
                          <div className="bg-blue-50 rounded-xl p-4 mt-2 border-l-4 border-blue-400">
                            <p className="text-gray-800 leading-relaxed">{dialogue.question}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* 回答部分 */}
                    <div className="mb-4">
                      <div className="flex items-start mb-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mr-3 shadow-md flex-shrink-0">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <span className="font-bold text-green-700 text-sm uppercase tracking-wide">💭 我的思考</span>
                          <div className="bg-green-50 rounded-xl p-4 mt-2 border-l-4 border-green-400">
                            <p className="text-gray-800 leading-relaxed">{dialogue.answer}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* 反馈部分 */}
                    {dialogue.feedback && (
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center mr-3 shadow-md flex-shrink-0">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <span className="font-bold text-amber-700 text-sm uppercase tracking-wide">✨ 教练反馈</span>
                          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 mt-2 border-l-4 border-amber-400">
                            <p className="text-gray-800 leading-relaxed">{dialogue.feedback}</p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* 对话序号 */}
                    <div className="flex justify-end mt-4">
                      <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                        第 {index + 1} 轮对话
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* 对话统计 */}
              <div className="mt-6 p-4 bg-white rounded-xl border border-indigo-100 shadow-sm">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-indigo-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span>深度思考进行中</span>
                  </div>
                  <div className="text-gray-500">
                    已完成 {socraticDialogue.length} 轮启发式对话
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 苏格拉底式提问输入区域 - 优化版 */}
          {currentQuestion && (
            <div className="mt-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-2 border-blue-200 rounded-2xl p-8 shadow-xl animate-fade-in">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg animate-pulse">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-blue-800">🤔 思考时刻</h3>
                    <p className="text-sm text-blue-600 mt-1">专业教练正在引导你深入思考</p>
                  </div>
                </div>
                <div className="bg-white rounded-full px-4 py-2 shadow-md border border-blue-200">
                  <span className="text-sm font-semibold text-blue-700">
                    💡 启发式提问
                  </span>
                </div>
              </div>
              
              {/* 问题展示区域 */}
              <div className="bg-white rounded-2xl p-6 border-l-4 border-blue-400 mb-6 shadow-lg">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mr-4 shadow-md flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-3">
                      <span className="font-bold text-blue-700 text-sm uppercase tracking-wide">🎓 老师的启发</span>
                      <div className="ml-auto bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-semibold">
                        第 {socraticDialogue.length + 1} 轮
                      </div>
                    </div>
                    <p className="text-gray-800 text-lg leading-relaxed font-medium">{currentQuestion}</p>
                  </div>
                </div>
              </div>
              
              {/* 回答输入区域 */}
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mr-3 shadow-md">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </div>
                    <span className="font-bold text-green-700 text-sm uppercase tracking-wide">💭 你的深度思考</span>
                  </div>
                  
                  <textarea
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="请仔细思考老师的问题，写下你的理解和想法...&#10;&#10;💡 提示：&#10;• 可以从多个角度分析&#10;• 结合具体例子说明&#10;• 表达你的疑问和困惑"
                    className="w-full p-6 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-400 resize-none transition-all duration-300 text-gray-800 leading-relaxed"
                    rows={6}
                    style={{ minHeight: '150px' }}
                  />
                  
                  {/* 字数统计 */}
                  <div className="flex justify-between items-center mt-3 text-sm text-gray-500">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>深入思考，详细表达你的想法</span>
                    </div>
                    <span className={`font-medium ${userAnswer.length > 20 ? 'text-green-600' : 'text-gray-400'}`}>
                      {userAnswer.length} 字
                    </span>
                  </div>
                </div>
                
                {/* 操作按钮 */}
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => {
                      setCurrentQuestion('');
                      setUserAnswer('');
                    }}
                    className="flex items-center px-6 py-3 text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    暂时跳过
                  </button>
                  
                  <div className="flex space-x-3">
                    <button
                      onClick={() => setUserAnswer('')}
                      className="flex items-center px-4 py-3 text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-100 transition-all duration-300 border border-blue-200"
                      disabled={!userAnswer.trim()}
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      重新思考
                    </button>
                    
                    <button
                      onClick={handleAnswerSubmit}
                      disabled={!userAnswer.trim() || isAnswering}
                      className="flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      {isAnswering ? (
                        <>
                          <svg className="animate-spin w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          AI正在思考...
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                          提交思考
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 底部按钮区域 - 增强可见性设计 */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-200 mt-8 mb-8">
          <div className="flex justify-between items-center">
            {/* 左侧按钮组 */}
            <div className="flex gap-4 flex-wrap">
              {/* AI苏格拉底提问按钮 */}
              <button
                onClick={handleSocraticQuestion}
                disabled={isAnswering || !!currentQuestion}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-3 border-2 border-blue-600 hover:border-blue-700"
              >
                {isAnswering ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    生成问题中...
                  </>
                ) : (
                  <>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    AI苏格拉底提问
                  </>
                )}
              </button>

              {/* 不懂追问按钮 */}
              <button
                onClick={() => setShowReAskModal(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center gap-3 border-2 border-green-600 hover:border-green-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                不懂追问
              </button>
            </div>

            {/* 右侧按钮组 */}
            <div className="flex items-center gap-3">
              {/* 保存学习记录按钮 */}
              <button
                onClick={handleSaveLearningRecord}
                disabled={isSaving}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-4 rounded-2xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center gap-3 border-2 border-gray-600 hover:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSaving ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    保存中...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                    </svg>
                    保存学习记录
                  </>
                )}
              </button>

              {/* 继续学习按钮 */}
              <button
                onClick={() => {
                  console.log('[ExplainStep] 继续学习按钮被点击');
                  console.log('[ExplainStep] onSkipToQuiz:', typeof onSkipToQuiz, onSkipToQuiz);
                  console.log('[ExplainStep] onNext:', typeof onNext, onNext);
                  const handler = onSkipToQuiz || onNext;
                  console.log('[ExplainStep] 选择的处理函数:', typeof handler, handler);
                  if (handler) {
                    console.log('[ExplainStep] 调用处理函数');
                    handler();
                  } else {
                    console.log('[ExplainStep] 没有可用的处理函数');
                  }
                }}
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center gap-3 border-2 border-purple-600 hover:border-purple-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                继续学习
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 重新提问模态框 */}
      {showReAskModal && (
        <ReAskModal
          isOpen={showReAskModal}
          onClose={() => setShowReAskModal(false)}
          originalContent={content}
          subject={subject || ''}
          topic={topic || ''}
        />
      )}
    </div>
  );
}