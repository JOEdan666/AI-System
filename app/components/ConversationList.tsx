'use client'

import React, { useState, useEffect } from 'react';
import { ConversationHistory, ConversationListQuery, ConversationType } from '../types/conversation';
import { ConversationService } from '../services/conversationService';

interface ConversationListProps {
  onSelectConversation: (conversation: ConversationHistory) => void;
  onNewConversation: () => void;
  selectedConversationId?: string;
}

export default function ConversationList({ 
  onSelectConversation, 
  onNewConversation,
  selectedConversationId 
}: ConversationListProps) {
  const [conversations, setConversations] = useState<ConversationHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [total, setTotal] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<ConversationType | 'all'>('all');
  
  const conversationService = ConversationService.getInstance();
  const pageSize = 20;

  // 加载对话列表
  const loadConversations = async (page: number = 1, reset: boolean = false) => {
    try {
      setLoading(true);
      
      const query: ConversationListQuery = {
        page,
        limit: pageSize,
        search: searchQuery || undefined,
        type: filterType === 'all' ? undefined : filterType,
        sortBy: 'lastActivity',
        sortOrder: 'desc'
      };

      const response = await conversationService.getConversations(query);
      
      if (reset) {
        setConversations(response.conversations);
      } else {
        setConversations(prev => [...prev, ...response.conversations]);
      }
      
      setHasMore(response.hasMore);
      setTotal(response.total);
      setCurrentPage(page);
    } catch (error) {
      console.error('加载对话列表失败:', error);
    } finally {
      setLoading(false);
    }
  };

  // 初始加载
  useEffect(() => {
    loadConversations(1, true);
  }, [searchQuery, filterType]);

  // 加载更多
  const loadMore = () => {
    if (!loading && hasMore) {
      loadConversations(currentPage + 1, false);
    }
  };

  // 删除对话
  const handleDeleteConversation = async (conversationId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    
    if (confirm('确定要删除这个对话吗？')) {
      try {
        await conversationService.deleteConversation(conversationId);
        setConversations(prev => prev.filter(conv => conv.id !== conversationId));
        setTotal(prev => prev - 1);
      } catch (error) {
        console.error('删除对话失败:', error);
      }
    }
  };

  // 格式化时间
  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) {
      return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
    } else if (days === 1) {
      return '昨天';
    } else if (days < 7) {
      return `${days}天前`;
    } else {
      return date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' });
    }
  };

  // 获取对话预览
  const getConversationPreview = (conversation: ConversationHistory) => {
    if (conversation.messages.length === 0) {
      return '暂无消息';
    }
    
    const lastMessage = conversation.messages[conversation.messages.length - 1];
    return lastMessage.content.length > 50 
      ? lastMessage.content.substring(0, 50) + '...'
      : lastMessage.content;
  };

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      {/* 头部 */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">对话历史</h2>
          <button
            onClick={onNewConversation}
            className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
          >
            新对话
          </button>
        </div>
        
        {/* 搜索框 */}
        <div className="mb-3">
          <input
            type="text"
            placeholder="搜索对话..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        {/* 过滤器 */}
        <div className="flex space-x-2">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1 text-xs rounded-full transition-colors ${
              filterType === 'all'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            全部 ({total})
          </button>
          <button
            onClick={() => setFilterType('learning')}
            className={`px-3 py-1 text-xs rounded-full transition-colors ${
              filterType === 'learning'
                ? 'bg-green-100 text-green-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            系统学习
          </button>
          <button
            onClick={() => setFilterType('general')}
            className={`px-3 py-1 text-xs rounded-full transition-colors ${
              filterType === 'general'
                ? 'bg-purple-100 text-purple-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            普通对话
          </button>
        </div>
      </div>

      {/* 对话列表 */}
      <div className="flex-1 overflow-y-auto">
        {conversations.length === 0 && !loading ? (
          <div className="p-4 text-center text-gray-500">
            {searchQuery ? '没有找到匹配的对话' : '暂无对话历史'}
          </div>
        ) : (
          <div className="space-y-1 p-2">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => onSelectConversation(conversation)}
                className={`p-3 rounded-lg cursor-pointer transition-colors group ${
                  selectedConversationId === conversation.id
                    ? 'bg-blue-50 border border-blue-200'
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    {/* 标题和类型 */}
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {conversation.title}
                      </h3>
                      <span
                        className={`px-2 py-0.5 text-xs rounded-full ${
                          conversation.type === 'learning'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-purple-100 text-purple-700'
                        }`}
                      >
                        {conversation.type === 'learning' ? '学习' : '对话'}
                      </span>
                    </div>
                    
                    {/* 预览内容 */}
                    <p className="text-xs text-gray-600 truncate mb-1">
                      {getConversationPreview(conversation)}
                    </p>
                    
                    {/* 元信息 */}
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{conversation.messageCount} 条消息</span>
                      <span>{formatTime(conversation.lastActivity)}</span>
                    </div>
                  </div>
                  
                  {/* 删除按钮 */}
                  <button
                    onClick={(e) => handleDeleteConversation(conversation.id, e)}
                    className="ml-2 p-1 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="删除对话"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* 加载更多 */}
        {hasMore && (
          <div className="p-4 text-center">
            <button
              onClick={loadMore}
              disabled={loading}
              className="px-4 py-2 text-sm text-blue-600 hover:text-blue-700 disabled:text-gray-400"
            >
              {loading ? '加载中...' : '加载更多'}
            </button>
          </div>
        )}
        
        {loading && conversations.length === 0 && (
          <div className="p-4 text-center text-gray-500">
            加载中...
          </div>
        )}
      </div>
    </div>
  );
}