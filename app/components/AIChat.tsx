'use client'
// AI聊天组件
import { castToChat } from '../utils/chatTypes'
import React, { useState, useRef, useEffect } from 'react';
import type { LearningItem } from '../types';
import type { AIProvider } from '../services/ai';
import { createProviderFromEnv } from '../services/ai';
import type { ChatMessage as MessageItem } from '../services/ai/types';
import toast from 'react-hot-toast';
import LearningSession from '../components/LearningFlow/LearningSession';
import { ConversationService } from '../services/conversationService';
import { ConversationHistory, ConversationType } from '../types/conversation';
import { ChatMessage, Role } from '../utils/chatTypes';
import TableRenderer from './TableRenderer';

interface AIChatProps {
  savedItems: LearningItem[];
  onClose: () => void;
}

const AIChat: React.FC<AIChatProps> = ({ savedItems, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSavedContent, setShowSavedContent] = useState(false);
  const [showLearningFlow, setShowLearningFlow] = useState(false);
  const [conversations, setConversations] = useState<ConversationHistory[]>([]);
  const [activeConversation, setActiveConversation] = useState<ConversationHistory | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [showSidebar, setShowSidebar] = useState(true); // 控制对话列表的显示/隐藏
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const apiServiceRef = useRef<AIProvider | null>(null);
  const conversationService = ConversationService.getInstance();

  // 从环境变量创建 Provider；保持与原有环境变量兼容
  const DEBUG_MODE = (process.env.NEXT_PUBLIC_XUNFEI_DEBUG === 'true') || (process.env.NEXT_PUBLIC_AI_DEBUG === 'true');

  // 调试日志函数
  const debugLog = (...args: any[]): void => {
    if (DEBUG_MODE) {
      console.log('[AI聊天组件]', ...args);
    }
  };

  // 初始化 Provider
  useEffect(() => {
    const provider = createProviderFromEnv();
    if (provider) {
      debugLog('初始化AI Provider');
      apiServiceRef.current = provider;
      // 在不同 Provider 实现下安全启用调试
      if (DEBUG_MODE) (apiServiceRef.current as any)?.setDebugMode?.(true);

      // 设置消息处理器
      apiServiceRef.current.onMessage((content: string, isFinal: boolean) => {
        debugLog('收到消息内容:', content, '是否最终消息:', isFinal);
        
        // 确保消息内容不为空才更新状态
        if (!content && !isFinal) {
          debugLog('跳过空消息');
          return;
        }
        
        setMessages(prev => {
          const lastMessage = prev[prev.length - 1];
          
          // 确保内容不为undefined或null
          const validContent = content || '';
          
          if (lastMessage && lastMessage.role === 'assistant') {
            // 更新最后一条助手消息
            const updatedContent = lastMessage.content + validContent;
            const updatedMessage = {
              ...lastMessage,
              content: updatedContent
            };
            debugLog('更新助手消息内容:', { oldContent: lastMessage.content, newContent: updatedContent });
            return [...prev.slice(0, -1), updatedMessage];
          } else {
            // 添加新的助手消息
            const newMessage = { role: 'assistant' as const, content: validContent };
            debugLog('添加新助手消息:', newMessage);
            return [...prev, newMessage];
          }
        });

        debugLog('消息更新完成，isFinal:', isFinal);
        
        if (isFinal) {
          setIsLoading(false);
          debugLog('消息接收完成');
        }
      });

      // 设置错误处理器
      apiServiceRef.current.onError((errorMsg: string) => {
        setError(errorMsg);
        setIsLoading(false);
      });
    } else {
      setError('未检测到可用的AI Provider，请检查环境变量配置');
    }

    // 组件卸载时关闭连接
    return () => {
      if (apiServiceRef.current) {
        apiServiceRef.current.close();
      }
    };
  }, []);

  // 加载对话历史
  useEffect(() => {
    const loadConversations = async () => {
      try {
        const response = await conversationService.getConversations({
          type: 'general',
          sortBy: 'lastActivity',
          sortOrder: 'desc',
          limit: 50
        });
        setConversations(response.conversations);
        
        // 如果有对话，选择最近的一个
        if (response.conversations.length > 0) {
          const latest = response.conversations[0];
          setActiveConversation(latest);
          setMessages(latest.messages);
        }
      } catch (e) {
        console.warn('载入对话失败:', e);
      }
    };
    
    loadConversations();
  }, []);

  // 当消息变化时，保存到当前对话
  useEffect(() => {
    if (!activeConversation || messages.length === 0) return;
    
    const saveMessages = async () => {
      try {
        // 更新对话的消息
        await conversationService.updateConversation(activeConversation.id, {
          messages: messages
        });

        // 自动生成标题：当消息数量达到4条且标题是默认标题时
        if (messages.length >= 4 && 
            (activeConversation.title.includes('对话') || 
             activeConversation.title === '新对话' ||
             activeConversation.title.includes(new Date().toLocaleString('zh-CN')))) {
          
          try {
            const titleResponse = await conversationService.generateTitle({
              messages: messages,
              type: 'general'
            });
            
            if (titleResponse.title && titleResponse.title !== activeConversation.title) {
              // 更新对话标题
              const updatedConversation = await conversationService.updateConversation(activeConversation.id, {
                title: titleResponse.title
              });
              
              if (updatedConversation) {
                setActiveConversation(updatedConversation);
                // 更新对话列表中的标题
                setConversations(prev => prev.map(conv => 
                  conv.id === updatedConversation.id ? updatedConversation : conv
                ));
                toast.success(`已自动生成标题: ${titleResponse.title}`);
              }
            }
          } catch (titleError) {
            console.warn('自动生成标题失败:', titleError);
          }
        }
      } catch (e) {
        console.warn('保存消息失败:', e);
      }
    };
    
    saveMessages();
  }, [messages, activeConversation]);

  const deriveTitle = (msgs: ChatMessage[]): string => {
    const firstUser = msgs.find(m => m.role === 'user');
    if (firstUser) {
      const t = firstUser.content.trim().replace(/\s+/g, ' ');
      return t.length > 20 ? t.slice(0, 20) + '…' : t || '新对话';
    }
    return `对话 ${new Date().toLocaleString('zh-CN')}`;
  };

  const ensureActiveConversation = async (initialMessages: ChatMessage[] = []) => {
    if (activeConversation) return activeConversation.id;
    
    try {
      const newConversation = await conversationService.createConversation({
        title: deriveTitle(initialMessages),
        type: 'general',
        initialMessage: initialMessages.length > 0 ? initialMessages[0] : undefined
      });
      
      // 如果有多条初始消息，需要逐一添加
      if (initialMessages.length > 1) {
        for (let i = 1; i < initialMessages.length; i++) {
          await conversationService.addMessage(newConversation.id, initialMessages[i]);
        }
      }
      
      setActiveConversation(newConversation);
      setConversations(prev => [newConversation, ...prev]);
      return newConversation.id;
    } catch (e) {
      console.error('创建对话失败:', e);
      throw e;
    }
  };

  const handleSelectConversation = (id: string) => {
    const conv = conversations.find(c => c.id === id);
    if (conv) {
      setActiveConversation(conv);
      setMessages(conv.messages);
    }
  };

  const handleNewConversation = async () => {
    try {
      const newConversation = await conversationService.createConversation({
        title: `对话 ${new Date().toLocaleString('zh-CN')}`,
        type: 'general'
      });
      
      setActiveConversation(newConversation);
      setConversations(prev => [newConversation, ...prev]);
      setMessages([]);
      setInputMessage('');
    } catch (e) {
      console.error('创建新对话失败:', e);
      toast.error('创建新对话失败');
    }
  };

  // 重命名相关
  const startRename = (c: ConversationHistory) => {
    setEditingId(c.id);
    setEditingTitle(c.title);
  };

  const cancelRename = () => {
    setEditingId(null);
    setEditingTitle('');
  };

  const commitRename = async () => {
    if (!editingId) return;
    const newTitle = editingTitle.trim() || '未命名对话';
    
    try {
      await conversationService.updateConversation(editingId, {
        title: newTitle
      });
      
      setConversations(prev => 
        prev.map(c => c.id === editingId ? { ...c, title: newTitle } : c)
      );
      
      if (activeConversation?.id === editingId) {
        setActiveConversation(prev => prev ? { ...prev, title: newTitle } : null);
      }
      
      setEditingId(null);
    } catch (e) {
      console.error('重命名失败:', e);
      toast.error('重命名失败');
    }
  };

  // 删除会话
  const handleDeleteConversation = async (id: string) => {
    try {
      await conversationService.deleteConversation(id);
      
      setConversations(prev => prev.filter(c => c.id !== id));
      
      if (activeConversation?.id === id) {
        const remaining = conversations.filter(c => c.id !== id);
        if (remaining.length > 0) {
          const nextActive = remaining[0];
          setActiveConversation(nextActive);
          setMessages(nextActive.messages);
        } else {
          setActiveConversation(null);
          setMessages([]);
        }
      }
    } catch (e) {
      console.error('删除对话失败:', e);
      toast.error('删除对话失败');
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading || !apiServiceRef.current) return;

    try {
      // 确保有激活的会话
      const convId = ensureActiveConversation();
      
      const userMessage: MessageItem = { role: 'user', content: inputMessage };
      setMessages(prev => [...prev, userMessage]);
      setInputMessage('');
      setIsLoading(true);
      setError(null);

      // 发送消息到AI服务
      await apiServiceRef.current.sendMessage(inputMessage);
    } catch (err) {
      console.error('发送消息失败:', err);
      setError('发送消息失败: ' + (err as Error).message);
      setIsLoading(false);
    }
  };

  // 处理键盘事件（发送消息）
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // 处理重命名时的键盘事件
  const handleRenameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      commitRename();
    } else if (e.key === 'Escape') {
      cancelRename();
    }
  };

  // 格式化AI消息内容
  const formatAIMessage = (content: string) => {
    // 注意：表格渲染现在由TableRenderer组件处理
    let formattedContent = content;

    // 处理Markdown符号 - 使用更安全的正则表达式避免HTML标签冲突
    
    // 1. 首先处理代码块符号 ``` - 保持符号可见，显示为蓝色粗体
    formattedContent = formattedContent.replace(/(?<!<[^>]*)(```)/g, '<span style="color: #2563eb; font-weight: bold;">$1</span>');
    
    // 2. 处理行内代码符号 ` - 保持符号可见，显示为蓝色粗体（避免匹配HTML标签内的内容）
    formattedContent = formattedContent.replace(/(?<!<[^>]*)(?<!`)(\`)(?!`)(?![^<]*>)/g, '<span style="color: #2563eb; font-weight: bold;">$1</span>');
    
    // 3. 处理粗体符号 ** - 隐藏符号，显示蓝色粗体文字（避免匹配HTML标签）
    formattedContent = formattedContent.replace(/(?<!<[^>]*)\*\*([^*<>]+)\*\*(?![^<]*>)/g, '<span style="color: #2563eb; font-weight: bold;">$1</span>');
    
    // 4. 处理斜体符号 * - 隐藏符号，显示蓝色斜体文字（避免与列表符号和HTML标签冲突）
    formattedContent = formattedContent.replace(/(?<!<[^>]*)(?<!\*)\*([^*\n<>]+)\*(?!\*)(?![^<]*>)/g, '<span style="color: #2563eb; font-style: italic;">$1</span>');
    
    // 5. 处理标题 - 隐藏符号，只显示黑色粗体标题文字（避免匹配HTML标签）
    formattedContent = formattedContent.replace(/(?<!<[^>]*)(#{1,6})\s*(.+)$/gm, '<span style="color: #000000; font-weight: bold; font-size: 1.1em;">$2</span>');
    
    // 6. 处理有序列表符号 1. 2. 等 - 保持符号可见，显示为蓝色粗体
    formattedContent = formattedContent.replace(/^(\s*)(\d+\.)\s/gm, '$1<span style="color: #2563eb; font-weight: bold;">$2</span> ');
    
    // 7. 最后处理列表符号 - 和 * - 保持符号可见，显示为蓝色粗体
    formattedContent = formattedContent.replace(/^(\s*)([-])\s/gm, '$1<span style="color: #2563eb; font-weight: bold;">$2</span> ');
    formattedContent = formattedContent.replace(/^(\s*)(\*)\s/gm, '$1<span style="color: #2563eb; font-weight: bold;">$2</span> ');

    return formattedContent;
  };

  // 渲染单条消息
  const renderMessage = (message: MessageItem, index: number) => (
    <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[80%] p-3 rounded-lg ${
        message.role === 'user' 
          ? 'bg-primary text-white' 
          : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border dark:border-gray-700 shadow-sm'
      }`}>
        <div className="prose prose-sm dark:prose-invert max-w-none">
          {message.role === 'assistant' ? (
            <TableRenderer content={formatAIMessage(message.content).replace(/\n/g, '<br/>')} />
          ) : (
            message.content
          )}
        </div>
      </div>
    </div>
  );

  // 将LearningItem数组转换为LearningStep数组
  const convertLearningItemsToLearningSteps = (items: LearningItem[]): any[] => {
    return items.map((item, index) => ({
      id: item.id,
      sessionId: 'session_' + Date.now(),
      step: 'EXPLAIN' as const,
      input: { userInput: item.text },
      output: { explanation: item.text },
      createdAt: new Date(item.createdAt)
    }));
  };

  // 渲染已保存内容
  const renderSavedContent = () => {
    if (savedItems.length === 0) {
      return <p className="text-gray-500 text-sm">暂无已保存的学习内容</p>;
    }

    return (
      <div className="space-y-2 max-h-40 overflow-y-auto">
        {savedItems.slice(-5).reverse().map((item) => (
          <div key={item.id} className="p-2 bg-gray-50 rounded text-sm">
            <div className="font-medium text-primary">{item.subject}</div>
            <div className="text-gray-700 truncate">{item.text}</div>
            <div className="text-xs text-gray-400">
              {new Date(item.createdAt).toLocaleTimeString('zh-CN')}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex backdrop-blur-sm">
      {/* 左侧：会话列表 - 可以隐藏/显示 */}
      <aside className={`${showSidebar ? 'w-64 md:w-72' : 'w-0'} border-r border-gray-200 dark:border-gray-700 flex flex-col bg-white dark:bg-gray-800 transition-all duration-300 ease-in-out overflow-hidden`}>
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between bg-gray-50 dark:bg-gray-900">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">AI对话</h2>
          <div className="flex items-center gap-2">
            <button onClick={handleNewConversation} className="text-primary dark:text-primary text-sm hover:underline">新建</button>
            <button 
              onClick={() => setShowSidebar(false)}
              className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
              aria-label="隐藏会话列表"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        <div className="p-3 overflow-y-auto flex-1">
          {conversations.length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-gray-400">暂无历史对话</p>
          ) : (
            <ul className="space-y-2">
              {conversations.map((c) => (
                <li key={c.id} className="group">
                  {editingId === c.id ? (
                    <div className="flex items-center gap-2">
                      <input
                        autoFocus
                        value={editingTitle}
                        onChange={(e) => setEditingTitle(e.target.value)}
                        onKeyDown={handleRenameKeyDown}
                        onBlur={commitRename}
                        className="w-full text-sm border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="输入对话标题"
                      />
                      <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={commitRename}
                      className="text-xs px-2 py-1 rounded bg-primary text-white hover:bg-primary/90 transition-colors"
                      aria-label="保存重命名"
                      >保存</button>
                      <button
                        type="button"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={cancelRename}
                        className="text-xs px-2 py-1 rounded border dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        aria-label="取消重命名"
                      >取消</button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between gap-2">
                      <button
                        className={`flex-1 text-left text-sm truncate ${c.id === activeConversation?.id ? 'text-primary dark:text-primary underline' : 'text-primary dark:text-primary hover:underline'}`}
                        onClick={() => handleSelectConversation(c.id)}
                        title={c.title}
                      >
                        {c.title}
                      </button>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => startRename(c)}
                          className="opacity-70 group-hover:opacity-100 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 underline"
                          aria-label="重命名会话"
                          title="重命名"
                        >重命名</button>
                        <button
                          type="button"
                          onClick={() => handleDeleteConversation(c.id)}
                          className="opacity-70 group-hover:opacity-100 text-xs text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 underline"
                          aria-label="删除会话"
                          title="删除"
                        >删除</button>
                      </div>
                    </div>
                  )}
                  <div className="text-xs text-gray-400 dark:text-gray-500">{new Date(c.updatedAt).toLocaleString('zh-CN')}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="p-3 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
          <button onClick={onClose} className="w-full text-sm py-1.5 border dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">关闭</button>
        </div>
      </aside>

      {/* 右侧：聊天主区域 */}
      <main className="flex-1 flex flex-col bg-white dark:bg-gray-800">
        {/* 顶部栏 */}
        <div className="px-4 py-3 border-b dark:border-gray-700 flex items-center justify-between bg-gray-50 dark:bg-gray-900">
          <div className="flex items-center gap-2">
            {!showSidebar && (
              <button 
                onClick={() => setShowSidebar(true)}
                className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                aria-label="显示会话列表"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            )}
            <div className="font-medium text-gray-700 dark:text-gray-200 truncate">{activeConversation?.title || '新对话'}</div>
          </div>
          <div className="text-xs text-gray-400 dark:text-gray-500">{savedItems.length > 0 ? `已保存学习内容 ${savedItems.length} 项` : '无已保存内容'}</div>
        </div>

        {/* 错误提示 */}
        {error && (
          <div className="bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 px-4 py-3 border-b dark:border-red-800/30">{error}</div>
        )}

        {/* 聊天内容区域 */}
        <div ref={chatContainerRef} className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-900">
          {showLearningFlow ? (
            <div className="max-w-4xl mx-auto">
              {/* 修复类型错误：savedItems应该符合LearningSession的要求 */}
              <LearningSession 
                savedItems={convertLearningItemsToLearningSteps(savedItems)} 
                onExit={() => setShowLearningFlow(false)} 
              />
            </div>
          ) : (
            <div className="max-w-3xl mx-auto space-y-2">
              {messages.map(renderMessage)}
              {isLoading && (
                <div className="flex justify-start mb-4">
                  <div className="max-w-[80%] p-3 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border dark:border-gray-700 shadow-sm">
                    <p className="animate-pulse">AI正在思考...</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* 已保存内容切换 */}
        <div className="border-t dark:border-gray-700 px-4 py-2 bg-white dark:bg-gray-800">
          <div className="flex space-x-4">
            <button
              onClick={() => setShowSavedContent(!showSavedContent)}
              className="text-sm text-primary dark:text-primary hover:underline"
            >
              {showSavedContent ? '隐藏' : '显示'}已保存的学习内容 ({savedItems.length}项)
            </button>
            <button
              onClick={() => setShowLearningFlow(!showLearningFlow)}
              className="text-sm text-primary dark:text-primary hover:underline"
            >
              {showLearningFlow ? '退出' : '进入'}系统化学习
            </button>
          </div>
          {showSavedContent && (
            <div className="mt-2">{renderSavedContent()}</div>
          )}
        </div>

        {/* 输入区域 */}
        <div className="p-4 border-t dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="max-w-2xl mx-auto">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="输入您的问题，按Enter发送，Shift+Enter换行..."
              className="w-full pl-4 pr-12 py-2 border dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary resize-none text-sm bg-white dark:bg-gray-800 dark:text-white mx-auto shadow-sm hover:shadow-md transition-all duration-300"
              disabled={isLoading}
              style={{ height: '32px', overflow: 'hidden' }}
            />
            <div className="flex justify-end mt-2">
              <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className={`px-4 py-2 rounded-md text-white transition-colors ${inputMessage.trim() && !isLoading ? 'bg-primary hover:bg-primary/90' : 'bg-slate-300 dark:bg-slate-600 cursor-not-allowed'}`}
            >
                {isLoading ? '发送中...' : '发送'}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AIChat;