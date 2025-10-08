// 地区教学大纲相关类型定义

export interface CurriculumStandard {
  id: string;
  region: string;
  grade: string;
  subject: string;
  topics: CurriculumTopic[];
  examRequirements: ExamRequirement[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CurriculumTopic {
  id: string;
  name: string;
  description: string;
  difficulty: 'basic' | 'intermediate' | 'advanced';
  keyPoints: string[];
  learningObjectives: string[];
  examWeight: number; // 考试权重百分比
  prerequisites: string[]; // 前置知识点
  relatedTopics: string[]; // 相关知识点
}

export interface ExamRequirement {
  id: string;
  topicId: string;
  requirement: string;
  level: 'understand' | 'apply' | 'analyze' | 'evaluate';
  examples: string[];
  commonMistakes: string[];
}

export interface RegionConfig {
  region: string;
  displayName: string;
  educationSystem: string;
  examTypes: string[];
  specialFeatures: string[];
}

export interface GradeConfig {
  grade: string;
  displayName: string;
  ageRange: string;
  cognitiveLevel: string;
  learningCharacteristics: string[];
}

// 预定义的地区配置
export const REGION_CONFIGS: RegionConfig[] = [
  {
    region: '东莞',
    displayName: '东莞市',
    educationSystem: '广东省教育体系',
    examTypes: ['中考', '期末考试', '月考'],
    specialFeatures: ['注重实践应用', '结合制造业背景', '强调创新思维']
  },
  {
    region: '广州',
    displayName: '广州市',
    educationSystem: '广东省教育体系',
    examTypes: ['中考', '高考', '期末考试'],
    specialFeatures: ['国际化视野', '综合素质评价', '多元化发展']
  },
  {
    region: '深圳',
    displayName: '深圳市',
    educationSystem: '广东省教育体系',
    examTypes: ['中考', '高考', '期末考试'],
    specialFeatures: ['科技创新导向', '国际化教育', '素质教育']
  },
  {
    region: '北京',
    displayName: '北京市',
    educationSystem: '北京市教育体系',
    examTypes: ['中考', '高考', '期末考试'],
    specialFeatures: ['传统文化教育', '高等教育资源丰富', '综合改革试点']
  },
  {
    region: '上海',
    displayName: '上海市',
    educationSystem: '上海市教育体系',
    examTypes: ['中考', '高考', '期末考试'],
    specialFeatures: ['国际化程度高', '教育改革前沿', '多元评价体系']
  }
];

// 预定义的年级配置
export const GRADE_CONFIGS: GradeConfig[] = [
  {
    grade: '初中一年级',
    displayName: '初一',
    ageRange: '12-13岁',
    cognitiveLevel: '具体运算向形式运算过渡',
    learningCharacteristics: ['好奇心强', '需要具体实例', '注意力集中时间较短', '喜欢互动学习']
  },
  {
    grade: '初中二年级',
    displayName: '初二',
    ageRange: '13-14岁',
    cognitiveLevel: '形式运算初期',
    learningCharacteristics: ['抽象思维发展', '独立思考能力增强', '需要挑战性任务', '重视同伴认可']
  },
  {
    grade: '初中三年级',
    displayName: '初三',
    ageRange: '14-15岁',
    cognitiveLevel: '形式运算发展期',
    learningCharacteristics: ['逻辑思维较强', '目标导向明确', '应试压力较大', '需要系统性学习']
  },
  {
    grade: '高中一年级',
    displayName: '高一',
    ageRange: '15-16岁',
    cognitiveLevel: '形式运算成熟期',
    learningCharacteristics: ['抽象思维成熟', '学科分化明显', '自主学习能力强', '需要深度理解']
  },
  {
    grade: '高中二年级',
    displayName: '高二',
    ageRange: '16-17岁',
    cognitiveLevel: '形式运算熟练期',
    learningCharacteristics: ['专业兴趣明确', '批判性思维发展', '需要个性化指导', '重视实际应用']
  },
  {
    grade: '高中三年级',
    displayName: '高三',
    ageRange: '17-18岁',
    cognitiveLevel: '形式运算完善期',
    learningCharacteristics: ['系统性思维强', '高考压力大', '需要高效复习', '注重知识整合']
  }
];