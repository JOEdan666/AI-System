'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, Star, CheckCircle, XCircle, ArrowRight, RotateCcw, BookOpen, Target, Lightbulb } from 'lucide-react'

interface GradingResult {
  questionId: number
  score: number
  maxScore: number
  aiSolution: string
  solutionSteps: string[]
  studentAnalysis: string
  errorType: string
  feedback: string
  suggestions: string[]
}

interface ResultStepProps {
  answers: string[]
  questions: any[]
  knowledgeContent: string
  onRestart: () => void
  onContinue: () => void
}

export default function ResultStep({ answers, questions, knowledgeContent, onRestart, onContinue }: ResultStepProps) {
  const [gradingResults, setGradingResults] = useState<GradingResult[]>([])
  const [totalScore, setTotalScore] = useState(0)
  const [maxPossibleScore, setMaxPossibleScore] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [overallFeedback, setOverallFeedback] = useState('')
  const [learningAdvice, setLearningAdvice] = useState<string[]>([])
  const [strengthAreas, setStrengthAreas] = useState<string[]>([])
  const [improvementAreas, setImprovementAreas] = useState<string[]>([])
  const [wrongAnswers, setWrongAnswers] = useState<{questionId: number, question: string, userAnswer: string, correctAnswer: string, errorType: string}[]>([])

  // AI智能评分系统 - 先解题再评分
  const gradeAnswers = async () => {
    console.log('开始评分...', { answers, questions, knowledgeContent })
    setIsLoading(true)
    
    // 计算最大可能分数
    const maxScore = questions.reduce((sum, question) => sum + (question.points || 10), 0)
    setMaxPossibleScore(maxScore)
    
    // 重置所有状态
    setGradingResults([])
    setTotalScore(0)
    setOverallFeedback('')
    setLearningAdvice([])
    setStrengthAreas([])
    setImprovementAreas([])
    setWrongAnswers([])

    try {
      
      // 准备批改数据
      const gradingData = questions.map((question, index) => ({
        questionId: question.id,
        question: question.question,
        type: question.type,
        correctAnswer: question.correctAnswer,
        studentAnswer: answers[index] || '',
        maxScore: question.points,
        options: question.options || []
      }))

      const response = await fetch('/api/openai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content: `你是一位资深学科教师，现在需要对学生的答题进行智能评分。请按照以下步骤进行：

## 🧠 评分流程
### 第一步：AI解题分析
对每道题，你需要：
1. **理解题目**：分析题目考查的知识点和能力要求
2. **独立解题**：作为专家，先给出你的标准答案和解题思路
3. **分析难点**：识别题目的关键点和常见错误

### 第二步：学生答案评估
对比学生答案与标准解法：
1. **准确性判断**：答案是否正确
2. **思路分析**：解题思路是否合理
3. **错误诊断**：如果错误，分析具体错在哪里
4. **部分得分**：即使答案不完全正确，也要识别正确的部分

### 第三步：个性化反馈
1. **具体指出优点**：学生答案中的正确部分和好的思路
2. **明确错误原因**：不是泛泛而谈，而是具体分析错在哪个知识点或思维环节
3. **提供解题思路**：给出正确的解题方法和思维过程
4. **针对性建议**：基于错误类型给出具体的学习建议

## 📊 评分标准

### 🎯 选择题评分
- **完全正确**：满分
- **完全错误**：0分
- **需要分析**：为什么选错？是概念理解问题还是计算错误？

### ✏️ 填空题评分
- **完全正确**：满分
- **基本正确**：90%分数（如单位错误、小数位数问题）
- **部分正确**：50-80%分数（思路对但计算错误）
- **完全错误**：0-30%分数（根据是否有正确思路）

### 📝 论述题评分
- **观点正确性**：40%权重
- **论证充分性**：30%权重  
- **逻辑清晰度**：20%权重
- **表达规范性**：10%权重

## 📤 输出格式
请严格按照以下JSON格式输出：

\`\`\`json
{
  "results": [
    {
      "questionId": 1,
      "score": 18,
      "maxScore": 20,
      "aiSolution": "AI的标准解答和解题思路",
      "solutionSteps": ["解题步骤1", "解题步骤2", "解题步骤3"],
      "studentAnalysis": "学生答案的具体分析：哪里对了，哪里错了",
      "errorType": "错误类型：概念理解/计算错误/思路错误/表达不清等",
      "feedback": "针对性的详细反馈，包含鼓励和指导",
      "suggestions": ["具体可操作的学习建议1", "具体可操作的学习建议2"]
    }
  ],
  "totalScore": 85,
  "overallFeedback": "基于整体表现的评价",
  "learningAdvice": ["综合学习建议1", "综合学习建议2"],
  "strengthAreas": ["学生的优势领域"],
  "improvementAreas": ["需要重点提升的领域"]
}
\`\`\`

**关键要求**：
- 每道题都要先给出AI的标准解答
- 详细分析学生答案的对错之处
- 错误分析要具体到知识点
- 建议要可操作，不要空泛
- 语言要专业但易懂，既严谨又鼓励`
            },
            {
              role: 'user',
              content: `请对以下学生答案进行详细评分：

学习内容：
${knowledgeContent}

题目和答案：
${gradingData.map((item, index) => `
题目${item.questionId}（${item.type}，${item.maxScore}分）：
${item.question}
${item.correctAnswer ? `正确答案：${item.correctAnswer}` : ''}
学生答案：${item.studentAnswer || '未作答'}
`).join('\n')}

请严格按照JSON格式输出评分结果。`
            }
          ]
        })
      })

      if (!response.ok) {
        throw new Error('Failed to grade answers')
      }

      const data = await response.json()
      console.log('AI评分响应:', data)
      
      try {
        // 提取AI返回的内容
        let aiContent = data.content || data
        
        // 如果内容是字符串，尝试解析JSON
        if (typeof aiContent === 'string') {
          // 清理可能的markdown格式
          aiContent = aiContent.replace(/```json\s*|\s*```/g, '').trim()
          aiContent = JSON.parse(aiContent)
        }
        
        console.log('解析后的评分数据:', aiContent)
        
        if (aiContent.results && Array.isArray(aiContent.results)) {
          setGradingResults(aiContent.results)
          
          // 正确计算总分
          const calculatedTotalScore = aiContent.results.reduce((sum: number, result: GradingResult) => sum + result.score, 0)
          setTotalScore(calculatedTotalScore)
          
          // 收集错题信息
          const wrongAnswersList = aiContent.results
            .map((result: GradingResult, index: number) => {
              if (result.score < result.maxScore) {
                return {
                  questionId: result.questionId,
                  question: questions[index]?.question || '',
                  userAnswer: answers[index] || '未作答',
                  correctAnswer: questions[index]?.correctAnswer || '',
                  errorType: result.errorType
                }
              }
              return null
            })
            .filter((item: any): item is {questionId: number, question: string, userAnswer: string, correctAnswer: string, errorType: string} => item !== null)
          
          setWrongAnswers(wrongAnswersList)
          setOverallFeedback(aiContent.overallFeedback || '')
          setLearningAdvice(aiContent.learningAdvice || [])
          setStrengthAreas(aiContent.strengthAreas || [])
          setImprovementAreas(aiContent.improvementAreas || [])
        } else {
          throw new Error('Invalid grading format: ' + JSON.stringify(aiContent))
        }
      } catch (parseError) {
        console.error('Failed to parse grading results:', parseError)
        console.error('原始响应数据:', data)
        // 使用默认评分
        const defaultResults: GradingResult[] = questions.map((question, index) => ({
          questionId: question.id,
          score: answers[index] ? Math.floor(question.points * 0.7) : 0,
          maxScore: question.points,
          aiSolution: '解析功能暂时不可用，请参考标准答案',
          solutionSteps: ['查阅相关教材', '请教老师或同学'],
          studentAnalysis: answers[index] ? '已提交答案，建议对照标准答案检查' : '未提交答案',
          errorType: answers[index] ? '需要人工检查' : '未作答',
          feedback: answers[index] ? '您的答案显示了对知识点的基本理解，建议进一步深入学习。' : '未作答，建议重新学习相关内容。',
          suggestions: ['重新复习相关概念', '多做练习题巩固理解', '寻求老师或同学的帮助']
        }))
        
        const defaultTotal = defaultResults.reduce((sum, result) => sum + result.score, 0)
        
        // 收集默认错题信息
        const defaultWrongAnswers = defaultResults
          .map((result, index) => {
            if (result.score < result.maxScore) {
              return {
                questionId: result.questionId,
                question: questions[index]?.question || '',
                userAnswer: answers[index] || '未作答',
                correctAnswer: questions[index]?.correctAnswer || '',
                errorType: result.errorType
              }
            }
            return null
          })
          .filter((item: any): item is {questionId: number, question: string, userAnswer: string, correctAnswer: string, errorType: string} => item !== null)
        
        setGradingResults(defaultResults)
        setTotalScore(defaultTotal)
        setWrongAnswers(defaultWrongAnswers)
        setOverallFeedback('您对本次学习内容有一定的理解，建议继续努力，加强练习。')
        setLearningAdvice(['重新阅读学习材料', '多做相关练习', '与他人讨论交流'])
        setStrengthAreas(['学习态度积极'])
        setImprovementAreas(['知识掌握', '解题技巧'])
      }
    } catch (error) {
      console.error('Error grading answers:', error)
      // 使用默认评分作为备选
        const defaultResults: GradingResult[] = questions.map((question, index) => ({
          questionId: question.id,
          score: answers[index] ? Math.floor(question.points * 0.7) : 0,
          maxScore: question.points,
          aiSolution: '由于AI服务暂时不可用，无法提供标准解答',
          solutionSteps: ['请参考教材相关章节', '咨询老师获取标准答案'],
          studentAnalysis: answers[index] ? '您已提交答案，但无法进行详细分析' : '未提交答案',
          errorType: answers[index] ? '无法分析' : '未作答',
          feedback: answers[index] ? '您的答案显示了对知识点的基本理解，建议进一步深入学习。' : '未作答，建议重新学习相关内容。',
          suggestions: ['重新复习相关概念', '多做练习题巩固理解', '寻求老师或同学的帮助']
        }))
      
      const defaultTotal = defaultResults.reduce((sum, result) => sum + result.score, 0)
      
      // 收集默认错题信息
      const defaultWrongAnswers = defaultResults
        .map((result, index) => {
          if (result.score < result.maxScore) {
            return {
              questionId: result.questionId,
              question: questions[index]?.question || '',
              userAnswer: answers[index] || '未作答',
              correctAnswer: questions[index]?.correctAnswer || '',
              errorType: result.errorType
            }
          }
          return null
        })
        .filter((item: any): item is {questionId: number, question: string, userAnswer: string, correctAnswer: string, errorType: string} => item !== null)
      
      setGradingResults(defaultResults)
      setTotalScore(defaultTotal)
      setWrongAnswers(defaultWrongAnswers)
      setOverallFeedback('您对本次学习内容有一定的理解，建议继续努力，加强练习。')
      setLearningAdvice(['重新阅读学习材料', '多做相关练习', '与他人讨论交流'])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    console.log('ResultStep useEffect triggered', { 
      answersLength: answers.length, 
      questionsLength: questions.length, 
      knowledgeContentLength: knowledgeContent.length 
    })
    gradeAnswers()
  }, [answers, questions, knowledgeContent])

  const getScoreColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100
    if (percentage >= 90) return 'text-green-600'
    if (percentage >= 80) return 'text-blue-600'
    if (percentage >= 70) return 'text-yellow-600'
    if (percentage >= 60) return 'text-orange-600'
    return 'text-red-600'
  }

  const getScoreIcon = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100
    if (percentage >= 80) return <CheckCircle className="w-6 h-6 text-green-600" />
    return <XCircle className="w-6 h-6 text-red-600" />
  }

  const getOverallGrade = (totalScore: number, maxScore: number) => {
    const percentage = (totalScore / maxScore) * 100
    if (percentage >= 90) return { grade: 'A+', color: 'text-green-600', bg: 'bg-green-100' }
    if (percentage >= 85) return { grade: 'A', color: 'text-green-600', bg: 'bg-green-100' }
    if (percentage >= 80) return { grade: 'A-', color: 'text-blue-600', bg: 'bg-blue-100' }
    if (percentage >= 75) return { grade: 'B+', color: 'text-blue-600', bg: 'bg-blue-100' }
    if (percentage >= 70) return { grade: 'B', color: 'text-yellow-600', bg: 'bg-yellow-100' }
    if (percentage >= 65) return { grade: 'B-', color: 'text-yellow-600', bg: 'bg-yellow-100' }
    if (percentage >= 60) return { grade: 'C+', color: 'text-orange-600', bg: 'bg-orange-100' }
    if (percentage >= 55) return { grade: 'C', color: 'text-orange-600', bg: 'bg-orange-100' }
    return { grade: 'D', color: 'text-red-600', bg: 'bg-red-100' }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 relative">
        <div className="relative z-10 container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center py-20">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full mx-auto mb-6"
              />
              <h2 className="text-2xl font-bold text-gray-800 mb-4">AI正在批改您的答案...</h2>
              <p className="text-gray-600">专业评估中，请稍候</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const overallGrade = getOverallGrade(totalScore, maxPossibleScore)
  const scorePercentage = maxPossibleScore > 0 ? Math.round((totalScore / maxPossibleScore) * 100) : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 relative">
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* 总体成绩 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl p-8 mb-8"
          >
            <div className="text-center">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <Trophy className="w-8 h-8 text-green-600" />
                </div>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-800 mb-4">测验结果</h1>
              
              <div className="flex items-center justify-center space-x-8 mb-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">{totalScore}</div>
                  <div className="text-gray-600">总分</div>
                </div>
                
                <div className="text-center">
                  <div className={`text-4xl font-bold ${overallGrade.color} mb-2`}>
                    {scorePercentage}%
                  </div>
                  <div className="text-gray-600">得分率</div>
                </div>
                
                <div className="text-center">
                  <div className={`inline-flex items-center px-4 py-2 rounded-full text-2xl font-bold ${overallGrade.bg} ${overallGrade.color}`}>
                    {overallGrade.grade}
                  </div>
                  <div className="text-gray-600 mt-2">等级</div>
                </div>
              </div>
              
              <p className="text-lg text-gray-700 leading-relaxed">{overallFeedback}</p>
            </div>
          </motion.div>

          {/* 错题总结 */}
          {wrongAnswers.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-xl p-8 mb-8"
            >
              <h2 className="text-2xl font-bold text-red-600 mb-6 flex items-center">
                <XCircle className="w-6 h-6 mr-3" />
                错题总结 ({wrongAnswers.length}题)
              </h2>
              
              <div className="grid gap-4">
                {wrongAnswers.map((wrongAnswer, index) => (
                  <motion.div
                    key={wrongAnswer.questionId}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="border border-red-200 rounded-xl p-4 bg-red-50"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className="font-bold text-red-700">第 {wrongAnswer.questionId} 题</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        wrongAnswer.errorType === '未作答' ? 'bg-gray-200 text-gray-700' :
                        wrongAnswer.errorType === '概念理解' ? 'bg-red-200 text-red-700' :
                        wrongAnswer.errorType === '计算错误' ? 'bg-orange-200 text-orange-700' :
                        wrongAnswer.errorType === '思路错误' ? 'bg-purple-200 text-purple-700' :
                        'bg-blue-200 text-blue-700'
                      }`}>
                        {wrongAnswer.errorType}
                      </span>
                    </div>
                    
                    <div className="text-sm text-gray-700 mb-2">
                      <strong>题目：</strong>{wrongAnswer.question.substring(0, 100)}...
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-3 text-sm">
                      <div>
                        <strong className="text-red-600">您的答案：</strong>
                        <span className="text-gray-700">{wrongAnswer.userAnswer}</span>
                      </div>
                      <div>
                        <strong className="text-green-600">正确答案：</strong>
                        <span className="text-gray-700">{wrongAnswer.correctAnswer}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* 详细评分 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Target className="w-6 h-6 mr-3 text-blue-600" />
              详细评分
            </h2>
            
            <div className="space-y-6">
              {gradingResults.map((result, index) => (
                <motion.div
                  key={result.questionId}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="border border-gray-200 rounded-xl p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      {getScoreIcon(result.score, result.maxScore)}
                      <span className="font-bold text-gray-800">第 {result.questionId} 题</span>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${getScoreColor(result.score, result.maxScore)}`}>
                        {result.score}/{result.maxScore}
                      </div>
                      <div className="text-sm text-gray-500">
                        {Math.round((result.score / result.maxScore) * 100)}%
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                      <BookOpen className="w-4 h-4 mr-2" />
                      题目：
                    </h4>
                    <p className="text-gray-700">{questions[index]?.question}</p>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                      <Target className="w-4 h-4 mr-2" />
                      您的答案：
                    </h4>
                    <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">
                      {answers[index] || '未作答'}
                    </p>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-green-700 mb-2 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      AI标准解答：
                    </h4>
                    <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                      <p className="text-green-800 mb-2">{result.aiSolution}</p>
                      {result.solutionSteps.length > 0 && (
                        <div>
                          <p className="font-medium text-green-700 mb-1">解题步骤：</p>
                          <ol className="list-decimal list-inside space-y-1">
                            {result.solutionSteps.map((step, idx) => (
                              <li key={idx} className="text-green-700 text-sm">{step}</li>
                            ))}
                          </ol>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-blue-700 mb-2 flex items-center">
                      <Lightbulb className="w-4 h-4 mr-2" />
                      答案分析：
                    </h4>
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                      <p className="text-blue-800 mb-2">{result.studentAnalysis}</p>
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-blue-700">错误类型：</span>
                        <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${
                          result.errorType === '未作答' ? 'bg-gray-200 text-gray-700' :
                          result.errorType === '概念理解' ? 'bg-red-200 text-red-700' :
                          result.errorType === '计算错误' ? 'bg-orange-200 text-orange-700' :
                          result.errorType === '思路错误' ? 'bg-purple-200 text-purple-700' :
                          'bg-blue-200 text-blue-700'
                        }`}>
                          {result.errorType}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-800 mb-2">详细反馈：</h4>
                    <p className="text-gray-700 bg-yellow-50 p-3 rounded-lg border border-yellow-200">{result.feedback}</p>
                  </div>
                  
                  {result.suggestions.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">学习建议：</h4>
                      <ul className="list-disc list-inside space-y-1 bg-indigo-50 p-3 rounded-lg border border-indigo-200">
                        {result.suggestions.map((suggestion, idx) => (
                          <li key={idx} className="text-indigo-700">{suggestion}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 优势领域和改进领域 */}
          {(strengthAreas.length > 0 || improvementAreas.length > 0) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <div className="grid md:grid-cols-2 gap-6">
                {/* 优势领域 */}
                {strengthAreas.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-green-700 mb-3 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      优势领域
                    </h3>
                    <div className="space-y-2">
                      {strengthAreas.map((area, index) => (
                        <div key={index} className="flex items-center space-x-2 p-3 bg-green-50 rounded-lg border border-green-200">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-green-800">{area}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* 改进领域 */}
                {improvementAreas.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-orange-700 mb-3 flex items-center">
                      <Target className="w-5 h-5 mr-2" />
                      改进领域
                    </h3>
                    <div className="space-y-2">
                      {improvementAreas.map((area, index) => (
                        <div key={index} className="flex items-center space-x-2 p-3 bg-orange-50 rounded-lg border border-orange-200">
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          <span className="text-orange-800">{area}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* 学习建议 */}
          {learningAdvice.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Star className="w-6 h-6 text-yellow-500 mr-2" />
                学习建议
              </h2>
              
              <div className="grid gap-4">
                {learningAdvice.map((advice, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-start space-x-3 p-4 bg-yellow-50 rounded-lg"
                  >
                    <Star className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">{advice}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* 操作按钮 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex items-center justify-center space-x-6"
          >
            <button
              onClick={onRestart}
              className="flex items-center space-x-2 px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:border-gray-400 transition-colors"
            >
              <RotateCcw className="w-5 h-5" />
              <span>重新测验</span>
            </button>
            
            <button
              onClick={onContinue}
              className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 transition-all"
            >
              <BookOpen className="w-5 h-5" />
              <span>继续学习</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}