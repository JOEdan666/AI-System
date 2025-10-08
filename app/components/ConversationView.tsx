'use client'

import React, { useState, useRef, useEffect } from 'react';
import { ConversationHistory } from '../types/conversation';
import { ChatMessage, Role } from '../utils/chatTypes';
import { ConversationService } from '../services/conversationService';
import { createProviderFromEnv } from '../services/ai';
import type { AIProvider } from '../services/ai';

interface ConversationViewProps {
  conversation: ConversationHistory;
  onConversationUpdate: (conversation: ConversationHistory) => void;
  onBack: () => void;
}

export default function ConversationView({ 
  conversation, 
  onConversationUpdate, 
  onBack 
}: ConversationViewProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(conversation.messages);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const aiProviderRef = useRef<AIProvider | null>(null);
  
  const conversationService = ConversationService.getInstance();

  // 初始化AI Provider
  useEffect(() => {
    const provider = createProviderFromEnv();
    if (provider) {
      aiProviderRef.current = provider;
      
      // 设置消息处理器
      provider.onMessage(async (content: string, isFinal: boolean) => {
        if (!content && !isFinal) return;
        
        setMessages(prev => {
          const lastMessage = prev[prev.length - 1];
          const validContent = content || '';
          
          if (lastMessage && lastMessage.role === 'assistant') {
            // 更新最后一条助手消息
            const updatedContent = lastMessage.content + validContent;
            const updatedMessage = {
              ...lastMessage,
              content: updatedContent
            };
            return [...prev.slice(0, -1), updatedMessage];
          } else {
            // 添加新的助手消息
            const newMessage = { role: 'assistant' as Role, content: validContent };
            return [...prev, newMessage];
          }
        });
        
        if (isFinal) {
          setIsLoading(false);
          
          // 当消息完成时，保存AI回复并处理标题生成
          setMessages(currentMessages => {
            const lastMessage = currentMessages[currentMessages.length - 1];
            if (lastMessage && lastMessage.role === 'assistant') {
              // 保存AI回复
              conversationService.addMessage(conversation.id, lastMessage).then(updatedConversation => {
                if (updatedConversation) {
                  onConversationUpdate(updatedConversation);
                  
                  // 自动生成标题：当消息数量达到4条且标题是默认标题时
                  if (currentMessages.length >= 4 && 
                      (updatedConversation.title.includes('对话') || 
                       updatedConversation.title === '新对话' ||
                       updatedConversation.title.includes(new Date().toLocaleString('zh-CN')))) {
                    
                    conversationService.generateTitle({
                      messages: currentMessages,
                      type: updatedConversation.type
                    }).then(titleResponse => {
                      if (titleResponse.title && titleResponse.title !== updatedConversation.title) {
                        // 更新对话标题
                        conversationService.updateConversation(updatedConversation.id, {
                          title: titleResponse.title
                        }).then(titleUpdatedConversation => {
                          if (titleUpdatedConversation) {
                            onConversationUpdate(titleUpdatedConversation);
                          }
                        });
                      }
                    }).catch(titleError => {
                      console.warn('自动生成标题失败:', titleError);
                    });
                  }
                }
              }).catch(error => {
                console.error('保存AI回复失败:', error);
              });
            }
            return currentMessages;
          });
        }
      });

      // 设置错误处理器
      provider.onError((errorMsg: string) => {
        console.error('AI回复失败:', errorMsg);
        const errorMessage: ChatMessage = {
          role: 'assistant' as Role,
          content: '抱歉，AI回复时出现错误，请稍后重试。'
        };
        setMessages(prev => [...prev, errorMessage]);
        setIsLoading(false);
      });
    }

    // 组件卸载时关闭连接
    return () => {
      if (aiProviderRef.current) {
        aiProviderRef.current.close();
      }
    };
  }, []);

  // 滚动到底部
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 发送消息
  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading || !aiProviderRef.current) return;

    const userMessage: ChatMessage = {
      role: 'user' as Role,
      content: inputValue.trim()
    };

    // 添加用户消息
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputValue('');
    setIsLoading(true);

    try {
      // 保存用户消息
      await conversationService.addMessage(conversation.id, userMessage);

      // 发送到AI (使用Xunfei API)
      await aiProviderRef.current.sendMessage(userMessage.content);

      // 注意：AI回复会通过onMessage回调处理，这里不需要手动添加回复消息
      // 但我们需要在回调中处理保存和标题生成逻辑
      
    } catch (error) {
      console.error('发送消息失败:', error);
      // 显示错误消息
      const errorMessage: ChatMessage = {
        role: 'assistant' as Role,
        content: '抱歉，发送消息时出现错误，请稍后重试。'
      };
      setMessages(prev => [...prev, errorMessage]);
      setIsLoading(false);
    }
  };

  // 处理键盘事件
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // 自动调整文本框高度
  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [inputValue]);

  // 格式化时间
  const formatMessageTime = (index: number) => {
    // 简单的时间估算，实际应该存储每条消息的时间戳
    const baseTime = conversation.createdAt.getTime();
    const messageTime = new Date(baseTime + index * 30000); // 假设每条消息间隔30秒
    return messageTime.toLocaleTimeString('zh-CN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* 头部 */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <button
            onClick={onBack}
            className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">{conversation.title}</h1>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span
                className={`px-2 py-0.5 text-xs rounded-full ${
                  conversation.type === 'learning'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-purple-100 text-purple-700'
                }`}
              >
                {conversation.type === 'learning' ? '系统化学习' : '普通对话'}
              </span>
              <span>•</span>
              <span>{messages.length} 条消息</span>
              <span>•</span>
              <span>{conversation.lastActivity.toLocaleDateString('zh-CN')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 消息列表 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">
            <p>开始新的对话吧！</p>
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <div className="whitespace-pre-wrap break-words">
                  {message.content}
                </div>
                <div
                  className={`text-xs mt-1 ${
                    message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}
                >
                  {formatMessageTime(index)}
                </div>
              </div>
            </div>
          ))
        )}
        
        {/* 加载指示器 */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg px-4 py-2">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-sm text-gray-500">AI正在思考...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* 输入区域 */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-end space-x-3">
          <div className="flex-1">
            <textarea
              ref={textareaRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="输入消息... (Enter发送，Shift+Enter换行)"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              style={{ minHeight: '40px', maxHeight: '120px' }}
              disabled={isLoading}
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}