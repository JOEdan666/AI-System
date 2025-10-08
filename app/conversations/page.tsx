'use client'

import React, { useState } from 'react';
import ConversationList from '../components/ConversationList';
import ConversationView from '../components/ConversationView';
import { ConversationHistory, CreateConversationRequest } from '../types/conversation';
import { ConversationService } from '../services/conversationService';
import { ChatMessage, Role } from '../utils/chatTypes';

export default function ConversationsPage() {
  const [selectedConversation, setSelectedConversation] = useState<ConversationHistory | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  
  const conversationService = ConversationService.getInstance();

  // 选择对话
  const handleSelectConversation = (conversation: ConversationHistory) => {
    setSelectedConversation(conversation);
  };

  // 创建新对话
  const handleNewConversation = async () => {
    try {
      const request: CreateConversationRequest = {
        type: 'general',
        title: '新对话'
      };
      
      const newConversation = await conversationService.createConversation(request);
      setSelectedConversation(newConversation);
      setRefreshKey(prev => prev + 1); // 刷新列表
    } catch (error) {
      console.error('创建新对话失败:', error);
    }
  };

  // 返回列表
  const handleBackToList = () => {
    setSelectedConversation(null);
    setRefreshKey(prev => prev + 1); // 刷新列表
  };

  // 对话更新
  const handleConversationUpdate = (updatedConversation: ConversationHistory) => {
    setSelectedConversation(updatedConversation);
    setRefreshKey(prev => prev + 1); // 刷新列表
  };

  return (
    <div className="h-screen flex bg-gray-50">
      {/* 左侧对话列表 */}
      <div className={`${selectedConversation ? 'hidden lg:block' : 'block'} w-full lg:w-80 flex-shrink-0`}>
        <ConversationList
          key={refreshKey}
          onSelectConversation={handleSelectConversation}
          onNewConversation={handleNewConversation}
          selectedConversationId={selectedConversation?.id}
        />
      </div>

      {/* 右侧对话视图 */}
      <div className={`${selectedConversation ? 'block' : 'hidden lg:block'} flex-1`}>
        {selectedConversation ? (
          <ConversationView
            conversation={selectedConversation}
            onConversationUpdate={handleConversationUpdate}
            onBack={handleBackToList}
          />
        ) : (
          <div className="h-full flex items-center justify-center bg-white">
            <div className="text-center text-gray-500">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">选择一个对话</h3>
              <p className="text-gray-500">从左侧列表中选择一个对话开始聊天，或创建新对话</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}