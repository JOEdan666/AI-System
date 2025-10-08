// 对话历史相关类型定义

import { ChatMessage } from '../utils/chatTypes';
import { LearningSession } from './learning';

// 对话类型
export type ConversationType = 'learning' | 'general';

// 对话历史记录
export interface ConversationHistory {
  id: string;
  title: string;
  type: ConversationType;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
  
  // 系统化学习相关字段
  learningSession?: LearningSession;
  subject?: string;
  topic?: string;
  aiExplanation?: string; // 保存AI讲解的文字内容
  
  // 元数据
  messageCount: number;
  lastActivity: Date;
  isArchived?: boolean;
  tags?: string[];
}

// 对话列表查询参数
export interface ConversationListQuery {
  page?: number;
  limit?: number;
  type?: ConversationType;
  search?: string;
  sortBy?: 'createdAt' | 'updatedAt' | 'title' | 'lastActivity';
  sortOrder?: 'asc' | 'desc';
}

// 对话列表响应
export interface ConversationListResponse {
  conversations: ConversationHistory[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// 对话创建请求
export interface CreateConversationRequest {
  title?: string;
  type: ConversationType;
  initialMessage?: ChatMessage;
  
  // 系统化学习相关字段
  learningSession?: LearningSession;
  subject?: string;
  topic?: string;
  aiExplanation?: string; // AI讲解内容
}

// 对话更新请求
export interface UpdateConversationRequest {
  title?: string;
  messages?: ChatMessage[];
  isArchived?: boolean;
  tags?: string[];
  aiExplanation?: string; // AI讲解内容
}

// 标题生成请求
export interface GenerateTitleRequest {
  messages: ChatMessage[];
  type: ConversationType;
  subject?: string;
  topic?: string;
}

// 标题生成响应
export interface GenerateTitleResponse {
  title: string;
  confidence: number;
}