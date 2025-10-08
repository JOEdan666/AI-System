// 学习流程相关类型定义

export interface LearningMaterial {
  id: string;
  content: string;
  subject: string;
  source: string;
}

export interface LearningSession {
  id: string;
  studentId: string;
  subject: string;
  topic: string;
  state: LearningState;
  steps: LearningStep[];
  learningMaterials?: LearningMaterial[];
  createdAt: Date;
  updatedAt: Date;
  questionCount?: number;
}

export type LearningState = 'EXPLAIN' | 'CONFIRM' | 'QUIZ' | 'RESULT' | 'REVIEW' | 'DONE';

export interface LearningStep {
  id: string;
  sessionId: string;
  step: LearningState;
  input: any;
  output: any;
  score?: number;
  createdAt: Date;
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: 'multiple_choice' | 'true_false' | 'short_answer';
  options?: string[];
  correctAnswer: string;
  explanation: string;
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  weaknesses: string[];
  suggestions: string[];
  questionResults: {
    questionId: string;
    userAnswer: string;
    isCorrect: boolean;
  }[];
}

export interface KnowledgeOutline {
  title: string; // 知识点标题
  summary: string; // 知识概括
  keyPoints: string[]; // 关键知识点
  framework: {
    concepts: string[]; // 核心概念
    methods: string[]; // 解题方法
    applications: string[]; // 应用场景
  };
  examples: string[]; // 典型例题
}

export interface ConfirmationResponse {
  outline: KnowledgeOutline; // 知识大纲
  confirmationPrompt: string; // 确认理解的提示文本
}

export interface DailyReport {
  sessionId: string;
  date: Date;
  subject: string;
  topic: string;
  duration: number; // 分钟
  stepsCompleted: LearningState[];
  quizScore?: number;
  keyPoints: string[];
  weaknesses: string[];
  recommendations: string[];
}

export interface StudentProfile {
  id: string;
  grade: string;
  subjects: string[];
  goals: string[];
  examDate?: Date;
  preferences: {
    learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'mixed';
    difficulty: 'easy' | 'medium' | 'hard';
  };
}