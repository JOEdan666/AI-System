'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ConversationService } from '../../services/conversationService';
import { ConversationHistory } from '../../types/conversation';
import { ChatMessage } from '../../utils/chatTypes';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

// 自定义Markdown组件样式
const customComponents = {
  h1: ({node, ...props}: any) => <h1 className="text-2xl font-bold mt-6 mb-4 text-gray-900" {...props} />,
  h2: ({node, ...props}: any) => <h2 className="text-xl font-bold mt-5 mb-3 text-gray-800" {...props} />,
  h3: ({node, ...props}: any) => <h3 className="text-lg font-bold mt-4 mb-2 text-blue-600" {...props} />,
  p: ({node, ...props}: any) => <p className="mb-3 text-gray-700 leading-relaxed" {...props} />,
  strong: ({node, ...props}: any) => <strong className="font-bold text-blue-600" {...props} />,
  ul: ({node, ...props}: any) => <ul className="list-disc pl-6 mb-4 space-y-2" {...props} />,
  ol: ({node, ...props}: any) => <ol className="list-decimal pl-6 mb-4 space-y-2" {...props} />,
  li: ({node, ...props}: any) => <li className="text-gray-700 leading-relaxed" {...props} />,
  blockquote: ({node, ...props}: any) => <blockquote className="border-l-4 border-blue-300 pl-4 italic text-gray-600 bg-blue-50 py-2 rounded-r" {...props} />,
  code: ({node, inline, ...props}: any) => 
    inline 
      ? <code className="bg-gray-100 rounded px-1 py-0.5 font-mono text-sm text-red-600" {...props} />
      : <code className="block bg-gray-100 rounded p-3 font-mono text-sm overflow-x-auto" {...props} />,
  pre: ({node, ...props}: any) => <pre className="bg-gray-100 rounded p-3 overflow-x-auto mb-4" {...props} />,
};

export default function LearningBrowsePage() {
  const params = useParams();
  const conversationId = params.id as string;
  
  const [conversation, setConversation] = useState<ConversationHistory | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showChatBranch, setShowChatBranch] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [isCreatingBranch, setIsCreatingBranch] = useState(false);

  const conversationService = ConversationService.getInstance();

  useEffect(() => {
    loadConversation();
  }, [conversationId]);

  const loadConversation = async () => {
    try {
      setIsLoading(true);
      const conv = await conversationService.getConversation(conversationId);
      setConversation(conv);
    } catch (error) {
      console.error('加载对话失败:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateChatBranch = async () => {
    if (!newMessage.trim() || !conversation) return;
    
    setIsCreatingBranch(true);
    try {
      // 创建新的普通对话分支
      const newConversation = await conversationService.createConversation({
        type: 'general',
        title: `${conversation.title} - 延伸讨论`
      });

      // 发送第一条消息
      await conversationService.addMessage(newConversation.id, {
        role: 'user',
        content: newMessage
      });
      
      // 跳转到新的对话
      window.location.href = `/?conversation=${newConversation.id}`;
    } catch (error) {
      console.error('创建聊天分支失败:', error);
    } finally {
      setIsCreatingBranch(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">正在加载学习内容...</p>
        </div>
      </div>
    );
  }

  if (!conversation) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">未找到学习记录</p>
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            返回主页
          </Link>
        </div>
      </div>
    );
  }

  const messages = conversation.messages || [];
  const totalPages = Math.max(1, Math.ceil(messages.length / 2)); // 每页显示2条消息
  const currentMessages = messages.slice(currentPage * 2, (currentPage + 1) * 2);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                href="/"
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                返回主页
              </Link>
              <div className="text-gray-300">|</div>
              <h1 className="text-lg font-semibold text-gray-900">
                {conversation.title}
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                系统化学习记录
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                第 {currentPage + 1} 页 / 共 {totalPages} 页
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 主要内容区域 */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg">
          {/* 页面内容 */}
          <div className="p-6">
            <div className="space-y-6">
              {currentMessages.length === 0 ? (
                <div className="text-center text-gray-500 py-12">
                  <p>这一页暂无内容</p>
                </div>
              ) : (
                currentMessages.map((message, index) => (
                  <div key={index} className="border-b border-gray-100 pb-6 last:border-b-0">
                    <div className="flex items-start space-x-3">
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
                        message.role === 'user' ? 'bg-blue-500' : 'bg-green-500'
                      }`}>
                        {message.role === 'user' ? '你' : 'AI'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-gray-500 mb-2">
                          {message.role === 'user' ? '你的问题' : 'AI 回答'}
                          <span className="ml-2">
                            {new Date(conversation.updatedAt).toLocaleString('zh-CN')}
                          </span>
                        </div>
                        <div className="prose prose-sm max-w-none">
                          <ReactMarkdown
                            remarkPlugins={[remarkMath]}
                            rehypePlugins={[rehypeKatex]}
                            components={customComponents}
                          >
                            {message.content}
                          </ReactMarkdown>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* 底部控制栏 */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center justify-between">
              {/* 翻页控制 */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                  disabled={currentPage === 0}
                  className={`px-3 py-1 rounded-md text-sm font-medium ${
                    currentPage === 0
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  上一页
                </button>
                <span className="text-sm text-gray-600">
                  {currentPage + 1} / {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
                  disabled={currentPage === totalPages - 1}
                  className={`px-3 py-1 rounded-md text-sm font-medium ${
                    currentPage === totalPages - 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  下一页
                </button>
              </div>

              {/* 创建聊天分支按钮 */}
              <button
                onClick={() => setShowChatBranch(!showChatBranch)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                创建聊天分支
              </button>
            </div>

            {/* 聊天分支输入框 */}
            {showChatBranch && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="text-sm font-medium text-blue-800 mb-2">
                  基于这个学习内容创建新的讨论
                </h3>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="输入你想讨论的问题..."
                    className="flex-1 px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={isCreatingBranch}
                  />
                  <button
                    onClick={handleCreateChatBranch}
                    disabled={!newMessage.trim() || isCreatingBranch}
                    className={`px-4 py-2 rounded-md font-medium ${
                      !newMessage.trim() || isCreatingBranch
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {isCreatingBranch ? '创建中...' : '开始讨论'}
                  </button>
                  <button
                    onClick={() => setShowChatBranch(false)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                    disabled={isCreatingBranch}
                  >
                    取消
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}