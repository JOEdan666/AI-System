'use client'

import { 
  ConversationHistory, 
  ConversationListQuery, 
  ConversationListResponse,
  CreateConversationRequest,
  UpdateConversationRequest,
  GenerateTitleRequest,
  GenerateTitleResponse,
  ConversationType
} from '../types/conversation';
import { ChatMessage } from '../utils/chatTypes';
import { createProviderFromEnv } from './ai';
import type { AIProvider } from './ai';

// 本地存储键名
const STORAGE_KEY = 'conversation_history';
const STORAGE_VERSION = '1.0';

export class ConversationService {
  private static instance: ConversationService;
  private aiProvider: AIProvider | null = null;
  
  private constructor() {
    // 初始化AI Provider
    this.aiProvider = createProviderFromEnv();
  }
  
  static getInstance(): ConversationService {
    if (!ConversationService.instance) {
      ConversationService.instance = new ConversationService();
    }
    return ConversationService.instance;
  }

  // 获取所有对话历史
  private getAllConversations(): ConversationHistory[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return [];
      
      const data = JSON.parse(stored);
      if (data.version !== STORAGE_VERSION) {
        // 版本不匹配，清空数据
        localStorage.removeItem(STORAGE_KEY);
        return [];
      }
      
      return data.conversations.map((conv: any) => ({
        ...conv,
        createdAt: new Date(conv.createdAt),
        updatedAt: new Date(conv.updatedAt),
        lastActivity: new Date(conv.lastActivity),
        learningSession: conv.learningSession ? {
          ...conv.learningSession,
          createdAt: new Date(conv.learningSession.createdAt),
          updatedAt: new Date(conv.learningSession.updatedAt)
        } : undefined
      }));
    } catch (error) {
      console.error('获取对话历史失败:', error);
      return [];
    }
  }

  // 保存所有对话历史
  private saveAllConversations(conversations: ConversationHistory[]): void {
    try {
      const data = {
        version: STORAGE_VERSION,
        conversations: conversations
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('保存对话历史失败:', error);
    }
  }

  // 查找现有的学习对话（不创建新的）
  findExistingLearningConversation(subject: string, topic: string): ConversationHistory | null {
    const conversations = this.getAllConversations();
    return conversations.find(conv => 
      conv.type === 'learning' && 
      conv.subject === subject && 
      conv.topic === topic &&
      !conv.isArchived
    ) || null;
  }

  // 查找或创建学习对话（避免重复创建相同主题的对话）
  async findOrCreateLearningConversation(request: CreateConversationRequest): Promise<ConversationHistory> {
    if (request.type === 'learning' && request.subject && request.topic) {
      // 查找是否已存在相同主题的学习对话
      const conversations = this.getAllConversations();
      const existingConversation = conversations.find(conv => 
        conv.type === 'learning' && 
        conv.subject === request.subject && 
        conv.topic === request.topic &&
        !conv.isArchived
      );

      if (existingConversation) {
        // 更新现有对话的最后活动时间和AI讲解内容
        const now = new Date();
        existingConversation.lastActivity = now;
        existingConversation.updatedAt = now;
        if (request.aiExplanation) {
          existingConversation.aiExplanation = request.aiExplanation;
        }
        
        // 如果有初始消息，添加到对话中
        if (request.initialMessage) {
          existingConversation.messages.push(request.initialMessage);
          existingConversation.messageCount = existingConversation.messages.length;
        }

        // 移动到列表顶部
        const index = conversations.findIndex(conv => conv.id === existingConversation.id);
        if (index > 0) {
          conversations.splice(index, 1);
          conversations.unshift(existingConversation);
        }

        this.saveAllConversations(conversations);
        return existingConversation;
      }
    }

    // 如果不是学习对话或没有找到现有对话，创建新对话
    return this.createConversation(request);
  }

  // 创建新对话
  async createConversation(request: CreateConversationRequest): Promise<ConversationHistory> {
    const now = new Date();
    const conversation: ConversationHistory = {
      id: `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      title: request.title || await this.generateDefaultTitle(request),
      type: request.type,
      messages: request.initialMessage ? [request.initialMessage] : [],
      createdAt: now,
      updatedAt: now,
      lastActivity: now,
      messageCount: request.initialMessage ? 1 : 0,
      learningSession: request.learningSession,
      subject: request.subject,
      topic: request.topic,
      aiExplanation: request.aiExplanation,
      isArchived: false,
      tags: []
    };

    const conversations = this.getAllConversations();
    conversations.unshift(conversation); // 新对话放在最前面
    this.saveAllConversations(conversations);

    return conversation;
  }

  // 更新对话
  async updateConversation(id: string, request: UpdateConversationRequest): Promise<ConversationHistory | null> {
    const conversations = this.getAllConversations();
    const index = conversations.findIndex(conv => conv.id === id);
    
    if (index === -1) return null;

    const conversation = conversations[index];
    const now = new Date();

    // 更新字段
    if (request.title !== undefined) conversation.title = request.title;
    if (request.messages !== undefined) {
      conversation.messages = request.messages;
      conversation.messageCount = request.messages.length;
    }
    if (request.isArchived !== undefined) conversation.isArchived = request.isArchived;
    if (request.tags !== undefined) conversation.tags = request.tags;
    if (request.aiExplanation !== undefined) conversation.aiExplanation = request.aiExplanation;

    conversation.updatedAt = now;
    conversation.lastActivity = now;

    this.saveAllConversations(conversations);
    return conversation;
  }

  // 添加消息到对话
  async addMessage(conversationId: string, message: ChatMessage): Promise<ConversationHistory | null> {
    const conversations = this.getAllConversations();
    const index = conversations.findIndex(conv => conv.id === conversationId);
    
    if (index === -1) return null;

    const conversation = conversations[index];
    conversation.messages.push(message);
    conversation.messageCount = conversation.messages.length;
    conversation.updatedAt = new Date();
    conversation.lastActivity = new Date();

    // 移动到列表顶部
    conversations.splice(index, 1);
    conversations.unshift(conversation);

    this.saveAllConversations(conversations);
    return conversation;
  }

  // 获取对话列表
  async getConversations(query: ConversationListQuery = {}): Promise<ConversationListResponse> {
    const {
      page = 1,
      limit = 20,
      type,
      search,
      sortBy = 'lastActivity',
      sortOrder = 'desc'
    } = query;

    let conversations = this.getAllConversations();

    // 过滤
    if (type) {
      conversations = conversations.filter(conv => conv.type === type);
    }

    if (search) {
      const searchLower = search.toLowerCase();
      conversations = conversations.filter(conv => 
        conv.title.toLowerCase().includes(searchLower) ||
        conv.subject?.toLowerCase().includes(searchLower) ||
        conv.topic?.toLowerCase().includes(searchLower) ||
        conv.messages.some(msg => msg.content.toLowerCase().includes(searchLower))
      );
    }

    // 排序
    conversations.sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];
      
      if (aValue instanceof Date && bValue instanceof Date) {
        return sortOrder === 'desc' ? bValue.getTime() - aValue.getTime() : aValue.getTime() - bValue.getTime();
      }
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'desc' ? bValue.localeCompare(aValue) : aValue.localeCompare(bValue);
      }
      
      return 0;
    });

    // 分页
    const total = conversations.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedConversations = conversations.slice(startIndex, endIndex);

    return {
      conversations: paginatedConversations,
      total,
      page,
      limit,
      hasMore: endIndex < total
    };
  }

  // 获取单个对话
  async getConversation(id: string): Promise<ConversationHistory | null> {
    const conversations = this.getAllConversations();
    return conversations.find(conv => conv.id === id) || null;
  }

  // 删除对话
  async deleteConversation(id: string): Promise<boolean> {
    const conversations = this.getAllConversations();
    const index = conversations.findIndex(conv => conv.id === id);
    
    if (index === -1) return false;

    conversations.splice(index, 1);
    this.saveAllConversations(conversations);
    return true;
  }

  // 生成对话标题
  async generateTitle(request: GenerateTitleRequest): Promise<GenerateTitleResponse> {
    try {
      if (request.type === 'learning' && request.subject && request.topic) {
        // 系统化学习对话直接基于主题生成标题
        return {
          title: `${request.subject} - ${request.topic}`,
          confidence: 1.0
        };
      }

      // 普通对话使用AI生成标题
      if (!this.aiProvider) {
        throw new Error('AI Provider 未初始化');
      }

      const recentMessages = request.messages.slice(-6); // 取最近6条消息
      const conversationContent = recentMessages
        .map(msg => `${msg.role}: ${msg.content}`)
        .join('\n');

      const prompt = `请基于以下对话内容，生成一个简洁精炼的对话标题（不超过15个字）：

${conversationContent}

要求：
1. 标题要能概括对话的主要内容
2. 简洁明了，不超过10个字
3. 避免使用"关于"、"讨论"等冗余词汇
4. 直接返回标题，不要其他解释

标题：`;

      // 使用Promise来处理异步响应
      return new Promise((resolve, reject) => {
        let fullResponse = '';
        
        // 设置消息处理器
        this.aiProvider!.onMessage((message: string, isFinal: boolean) => {
          fullResponse += message;
          if (isFinal) {
            // 消息完成
            const title = fullResponse.trim().replace(/^标题：?/, '').trim();
            resolve({
              title: title || '新对话',
              confidence: 0.8
            });
          }
        });
        
        // 设置错误处理器
        this.aiProvider!.onError((error: string) => {
          console.error('生成标题失败:', error);
          resolve({
            title: request.type === 'learning' ? '系统化学习' : '新对话',
            confidence: 0.5
          });
        });
        
        // 发送消息
        this.aiProvider!.sendMessage(prompt);
      });
    } catch (error) {
      console.error('生成标题失败:', error);
    }

    // 默认标题
    return {
      title: request.type === 'learning' ? '系统化学习' : '新对话',
      confidence: 0.5
    };
  }

  // 生成默认标题
  private async generateDefaultTitle(request: CreateConversationRequest): Promise<string> {
    if (request.type === 'learning' && request.subject && request.topic) {
      return `${request.subject} - ${request.topic}`;
    }
    
    if (request.initialMessage) {
      const titleResponse = await this.generateTitle({
        messages: [request.initialMessage],
        type: request.type,
        subject: request.subject,
        topic: request.topic
      });
      return titleResponse.title;
    }

    return request.type === 'learning' ? '系统化学习' : '新对话';
  }

  // 清空所有对话历史
  async clearAllConversations(): Promise<void> {
    localStorage.removeItem(STORAGE_KEY);
  }

  // 导出对话历史
  async exportConversations(): Promise<string> {
    const conversations = this.getAllConversations();
    return JSON.stringify({
      version: STORAGE_VERSION,
      exportDate: new Date().toISOString(),
      conversations
    }, null, 2);
  }

  // 导入对话历史
  async importConversations(jsonData: string): Promise<boolean> {
    try {
      const data = JSON.parse(jsonData);
      if (data.conversations && Array.isArray(data.conversations)) {
        this.saveAllConversations(data.conversations);
        return true;
      }
      return false;
    } catch (error) {
      console.error('导入对话历史失败:', error);
      return false;
    }
  }
}