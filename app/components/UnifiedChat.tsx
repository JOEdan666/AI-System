'use client'

import React, { useState, useEffect, useRef } from 'react';
import { ConversationHistory, CreateConversationRequest } from '../types/conversation';
import { ConversationService } from '../services/conversationService';
import { ChatMessage } from '../utils/chatTypes';
import { SUBJECTS, LearningItem } from '../types';
import { toast } from 'react-hot-toast';
import { createProviderFromEnv } from '../services/ai';
import type { AIProvider } from '../services/ai';

// 地区选项
const REGIONS = [
  '北京', '上海', '广州', '深圳', '东莞', '佛山', '中山', '珠海', '江门', '惠州',
  '杭州', '南京', '苏州', '成都', '重庆', '武汉', '西安', '天津', '青岛', '大连',
  '厦门', '福州', '长沙', '郑州', '济南', '石家庄', '太原', '沈阳', '长春', '哈尔滨',
  '南昌', '合肥', '南宁', '昆明', '贵阳', '兰州', '银川', '西宁', '乌鲁木齐', '拉萨'
];

// 年级选项
const GRADES = [
  '小学一年级', '小学二年级', '小学三年级', '小学四年级', '小学五年级', '小学六年级',
  '初中一年级', '初中二年级', '初中三年级',
  '高中一年级', '高中二年级', '高中三年级'
];

interface UnifiedChatProps {
  onClose?: () => void;
  savedItems?: LearningItem[];
}

export default function UnifiedChat({ onClose, savedItems }: UnifiedChatProps) {
  // 状态管理
  const [conversations, setConversations] = useState<ConversationHistory[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<ConversationHistory | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showNewChatForm, setShowNewChatForm] = useState(false);
  
  // 重命名相关状态
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');
  
  // 新对话表单状态
  const [chatType, setChatType] = useState<'general' | 'learning'>('general');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [learningTopic, setLearningTopic] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
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
             const newMessage: ChatMessage = { role: 'assistant', content: validContent };
             return [...prev, newMessage];
           }
        });
        
        if (isFinal) {
          setIsLoading(false);
          
          // 当消息完成时，保存AI回复并处理标题生成
          setMessages(currentMessages => {
            const lastMessage = currentMessages[currentMessages.length - 1];
            if (lastMessage && lastMessage.role === 'assistant' && selectedConversation) {
              // 保存AI回复
              conversationService.addMessage(selectedConversation.id, lastMessage).then(updatedConversation => {
                if (updatedConversation) {
                  setSelectedConversation(updatedConversation);
                  loadConversations();
                  
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
                            setSelectedConversation(titleUpdatedConversation);
                            loadConversations();
                            toast.success(`已自动生成标题: ${titleResponse.title}`);
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
        toast.error('AI回复失败');
        setIsLoading(false);
      });
    }

    // 组件卸载时关闭连接
    return () => {
      if (aiProviderRef.current) {
        aiProviderRef.current.close();
      }
    };
  }, [selectedConversation]);

  // 加载对话列表
  useEffect(() => {
    loadConversations();
  }, []);

  // 滚动到底部
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // 格式化AI消息内容
  const formatAIMessage = (content: string) => {
    // 处理Markdown表格
    const tableRegex = /\|(.+)\|\n\|[-\s|:]+\|\n((?:\|.+\|\n?)*)/g;
    
    let formattedContent = content.replace(tableRegex, (match, header, rows) => {
      const headerCells = header.split('|').map((cell: string) => cell.trim()).filter((cell: string) => cell);
      const rowsArray = rows.trim().split('\n').map((row: string) => 
        row.split('|').map((cell: string) => cell.trim()).filter((cell: string) => cell)
      );
      
      let tableHTML = '<div class="overflow-x-auto my-4 rounded-lg shadow-md border border-gray-200">';
      tableHTML += '<table class="w-full border-collapse bg-white">';
      
      // 表头
      tableHTML += '<thead class="bg-blue-100">';
      tableHTML += '<tr>';
      headerCells.forEach((cell: string) => {
        tableHTML += `<th class="px-4 py-3 text-center text-sm font-bold text-gray-800 border border-gray-300">${cell}</th>`;
      });
      tableHTML += '</tr>';
      tableHTML += '</thead>';
      
      // 表体
      tableHTML += '<tbody>';
      rowsArray.forEach((row: string[], index: number) => {
        const bgClass = index % 2 === 0 ? 'bg-white' : 'bg-gray-50';
        tableHTML += `<tr class="${bgClass} hover:bg-blue-50 transition-colors duration-200">`;
        row.forEach((cell: string) => {
          tableHTML += `<td class="px-4 py-3 text-center text-sm text-gray-700 border border-gray-300 whitespace-pre-wrap">${cell}</td>`;
        });
        tableHTML += '</tr>';
      });
      tableHTML += '</tbody>';
      tableHTML += '</table>';
      tableHTML += '</div>';
      
      return tableHTML;
    });

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

  const loadConversations = async () => {
    try {
      const response = await conversationService.getConversations();
      setConversations(response.conversations);
    } catch (error) {
      console.error('加载对话列表失败:', error);
      toast.error('加载对话列表失败');
    }
  };

  // 选择对话
  const handleSelectConversation = async (conversation: ConversationHistory) => {
    if (conversation.type === 'learning' && conversation.subject && conversation.topic) {
      // 学习类型对话：直接跳转到学习界面并恢复学习状态
      const learningUrl = `/learning-interface?subject=${encodeURIComponent(conversation.subject)}&topic=${encodeURIComponent(conversation.topic)}&conversationId=${conversation.id}`;
      window.location.href = learningUrl;
      return;
    }
    
    // 普通对话：在当前界面显示
    setSelectedConversation(conversation);
    setMessages(conversation.messages || []);
    setShowNewChatForm(false);
  };

  // 创建新对话
  const handleCreateNewChat = async () => {
    if (chatType === 'learning') {
      // 系统化学习：跳转到图形化学习界面
      if (!selectedSubject || !learningTopic || !selectedRegion || !selectedGrade) {
        toast.error('请填写完整的学习信息（学科、主题、地区、年级）');
        return;
      }
      
      // 跳转到图形化学习界面，传递地区和年级信息
      const learningUrl = `/learning-interface?subject=${encodeURIComponent(selectedSubject)}&topic=${encodeURIComponent(learningTopic)}&region=${encodeURIComponent(selectedRegion)}&grade=${encodeURIComponent(selectedGrade)}`;
      window.location.href = learningUrl;
      return;
    }

    // 普通对话：创建普通聊天对话
    try {
      const request: CreateConversationRequest = {
        type: chatType,
        title: '新对话',
        subject: undefined,
        topic: undefined
      };

      const newConversation = await conversationService.createConversation(request);
      setSelectedConversation(newConversation);
      setMessages([]);
      setShowNewChatForm(false);
      await loadConversations();
      
      toast.success('新对话创建成功');
    } catch (error) {
      console.error('创建新对话失败:', error);
      toast.error('创建新对话失败');
    }
  };

  // 发送消息
  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !selectedConversation || isLoading || !aiProviderRef.current) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: inputMessage.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // 添加用户消息到对话
      await conversationService.addMessage(selectedConversation.id, userMessage);

      // 发送到AI (使用Xunfei API)
      await aiProviderRef.current.sendMessage(userMessage.content);

      // 注意：AI回复会通过onMessage回调处理，这里不需要手动添加回复消息

    } catch (error) {
      console.error('发送消息失败:', error);
      toast.error('发送消息失败');
      setIsLoading(false);
    }
  };

  // 删除对话
  const handleDeleteConversation = async (conversationId: string) => {
    try {
      await conversationService.deleteConversation(conversationId);
      await loadConversations();
      
      if (selectedConversation?.id === conversationId) {
        setSelectedConversation(null);
        setMessages([]);
      }
      
      toast.success('对话已删除');
    } catch (error) {
      console.error('删除对话失败:', error);
      toast.error('删除对话失败');
    }
  };

  // 重命名相关函数
  const startRename = (conversation: ConversationHistory) => {
    setEditingId(conversation.id);
    setEditingTitle(conversation.title);
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
      
      if (selectedConversation?.id === editingId) {
        setSelectedConversation(prev => prev ? { ...prev, title: newTitle } : null);
      }
      
      setEditingId(null);
      toast.success('重命名成功');
    } catch (e) {
      console.error('重命名失败:', e);
      toast.error('重命名失败');
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

  return (
    <div className="fixed inset-0 z-50 flex bg-gray-50">
      {/* 左侧对话列表 */}
      <div className={`${selectedConversation && !showNewChatForm ? 'hidden lg:block' : 'block'} w-full lg:w-80 flex-shrink-0 bg-white border-r border-gray-200`}>
        <div className="h-full flex flex-col">
          {/* 头部 */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-semibold text-gray-900">对话</h1>
              {onClose && (
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            
            <button
              onClick={() => setShowNewChatForm(true)}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              新对话
            </button>
          </div>

          {/* 新对话表单 */}
          {showNewChatForm && (
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <h3 className="text-sm font-medium text-gray-900 mb-3">创建新对话</h3>
              
              {/* 对话类型选择 */}
              <div className="mb-3">
                <label className="block text-xs font-medium text-gray-700 mb-1">对话类型</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setChatType('general')}
                    className={`px-3 py-1 text-xs rounded-md transition-colors ${
                      chatType === 'general' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    普通对话
                  </button>
                  <button
                    onClick={() => setChatType('learning')}
                    className={`px-3 py-1 text-xs rounded-md transition-colors ${
                      chatType === 'learning' 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    系统化学习
                  </button>
                </div>
              </div>

              {/* 学习对话额外字段 */}
              {chatType === 'learning' && (
                <>
                  <div className="mb-3">
                    <label className="block text-xs font-medium text-gray-700 mb-1">学科</label>
                    <select
                      value={selectedSubject}
                      onChange={(e) => setSelectedSubject(e.target.value)}
                      className="w-full px-3 py-1 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">选择学科</option>
                      {SUBJECTS.map(subject => (
                        <option key={subject} value={subject}>{subject}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="mb-3">
                    <label className="block text-xs font-medium text-gray-700 mb-1">学习主题</label>
                    <input
                      type="text"
                      value={learningTopic}
                      onChange={(e) => setLearningTopic(e.target.value)}
                      placeholder="例如：二次函数"
                      className="w-full px-3 py-1 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label className="block text-xs font-medium text-gray-700 mb-1">所在地区</label>
                    <select
                      value={selectedRegion}
                      onChange={(e) => setSelectedRegion(e.target.value)}
                      className="w-full px-3 py-1 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">选择地区</option>
                      {REGIONS.map(region => (
                        <option key={region} value={region}>{region}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="mb-3">
                    <label className="block text-xs font-medium text-gray-700 mb-1">年级</label>
                    <select
                      value={selectedGrade}
                      onChange={(e) => setSelectedGrade(e.target.value)}
                      className="w-full px-3 py-1 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">选择年级</option>
                      {GRADES.map(grade => (
                        <option key={grade} value={grade}>{grade}</option>
                      ))}
                    </select>
                  </div>
                </>
              )}

              <div className="flex gap-2">
                <button
                  onClick={handleCreateNewChat}
                  className="flex-1 px-3 py-1 bg-blue-500 text-white text-xs rounded-md hover:bg-blue-600 transition-colors"
                >
                  创建
                </button>
                <button
                  onClick={() => setShowNewChatForm(false)}
                  className="flex-1 px-3 py-1 bg-gray-300 text-gray-700 text-xs rounded-md hover:bg-gray-400 transition-colors"
                >
                  取消
                </button>
              </div>
            </div>
          )}

          {/* 对话列表 */}
          <div className="flex-1 overflow-y-auto">
            {conversations.length === 0 ? (
              <div className="p-4 text-center text-gray-500 text-sm">
                暂无对话记录
              </div>
            ) : (
              conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`p-3 border-b border-gray-100 group hover:bg-gray-50 transition-colors ${
                    selectedConversation?.id === conversation.id ? 'bg-blue-50 border-blue-200' : ''
                  }`}
                >
                  {editingId === conversation.id ? (
                    // 重命名模式
                    <div className="space-y-2">
                      <input
                        type="text"
                        autoFocus
                        value={editingTitle}
                        onChange={(e) => setEditingTitle(e.target.value)}
                        onKeyDown={handleRenameKeyDown}
                        onBlur={commitRename}
                        className="w-full text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="输入对话标题"
                      />
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={commitRename}
                          className="text-xs px-2 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                          aria-label="保存重命名"
                        >保存</button>
                        <button
                          type="button"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={cancelRename}
                          className="text-xs px-2 py-1 rounded border border-gray-300 hover:bg-gray-50 transition-colors"
                          aria-label="取消重命名"
                        >取消</button>
                      </div>
                    </div>
                  ) : (
                    // 正常显示模式
                    <div className="flex items-start justify-between">
                      <div 
                        className="flex-1 min-w-0 cursor-pointer"
                        onClick={() => handleSelectConversation(conversation)}
                      >
                        <h3 className="text-sm font-medium text-gray-900 truncate">
                          {conversation.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`px-2 py-0.5 text-xs rounded-full ${
                            conversation.type === 'learning' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {conversation.type === 'learning' ? '学习' : '对话'}
                          </span>
                          <span className="text-xs text-gray-500">
                            {conversation.messages?.length || 0} 条消息
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(conversation.updatedAt).toLocaleString('zh-CN')}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            startRename(conversation);
                          }}
                          className="p-1 text-gray-400 hover:text-blue-500 transition-colors"
                          title="重命名"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteConversation(conversation.id);
                          }}
                          className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                          title="删除"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* 右侧对话区域 */}
      <div className={`${selectedConversation ? 'block' : 'hidden lg:block'} flex-1 flex flex-col bg-white`}>
        {selectedConversation ? (
          <>
            {/* 对话头部 */}
            <div className="p-4 border-b border-gray-200 bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedConversation(null)}
                    className="lg:hidden p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">{selectedConversation.title}</h2>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-2 py-0.5 text-xs rounded-full ${
                        selectedConversation.type === 'learning' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {selectedConversation.type === 'learning' ? '系统化学习' : '普通对话'}
                      </span>
                      {selectedConversation.subject && (
                        <span className="text-xs text-gray-500">
                          {selectedConversation.subject}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 消息列表 */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* 显示AI讲解内容（仅限系统化学习对话） */}
              {selectedConversation.type === 'learning' && selectedConversation.aiExplanation && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <h3 className="text-sm font-medium text-green-800">AI智能讲解</h3>
                  </div>
                  <div className="text-sm text-green-700 whitespace-pre-wrap break-words">
                    {selectedConversation.aiExplanation}
                  </div>
                </div>
              )}
              
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] p-3 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <div className="whitespace-pre-wrap break-words">
                      {message.role === 'assistant' ? (
                        <div 
                          dangerouslySetInnerHTML={{ 
                            __html: formatAIMessage(message.content).replace(/\n/g, '<br/>') 
                          }} 
                        />
                      ) : (
                        message.content
                      )}
                    </div>
                    {/* 显示图片（如果有） */}
                    {message.image && (
                      <div className="mt-3">
                        <img 
                          src={message.image} 
                          alt="学习内容截图" 
                          className="max-w-full h-auto rounded-lg border border-gray-200 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                          onClick={() => {
                            // 点击图片放大显示
                            const modal = document.createElement('div');
                            modal.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4';
                            modal.onclick = () => modal.remove();
                            
                            const img = document.createElement('img');
                            img.src = message.image!;
                            img.className = 'max-w-full max-h-full object-contain';
                            
                            modal.appendChild(img);
                            document.body.appendChild(modal);
                          }}
                        />
                        <div className="text-xs text-gray-500 mt-1">
                          点击图片查看大图
                        </div>
                      </div>
                    )}
                    {/* 显示时间戳（如果有） */}
                    {message.timestamp && (
                      <div className="text-xs text-gray-400 mt-2">
                        {new Date(message.timestamp).toLocaleString('zh-CN')}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* 输入区域 */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="输入消息... (Enter发送，Shift+Enter换行)"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  发送
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center text-gray-500">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">开始对话</h3>
              <p className="text-gray-500">选择一个对话或创建新对话开始聊天</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}