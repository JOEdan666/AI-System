'use client';

import React, { useState, useRef, useEffect } from 'react';
import { createProviderFromEnv } from '../../services/ai';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import TableRenderer, { parseMarkdownTable } from '../TableRenderer';

interface ReAskModalProps {
  isOpen: boolean;
  onClose: () => void;
  subject: string;
  topic: string;
  originalContent: string;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function ReAskModal({ isOpen, onClose, subject, topic, originalContent }: ReAskModalProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Markdown渲染的自定义组件
  const customComponents = {
    h1: ({ children }: any) => <h1 className="text-xl font-bold mb-3 text-gray-800">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-lg font-bold mb-2 text-gray-800">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-base font-bold mb-2 text-gray-700">{children}</h3>,
    p: ({ children }: any) => <p className="mb-2 text-gray-700 leading-relaxed">{children}</p>,
    strong: ({ children }: any) => <strong className="font-bold text-gray-800">{children}</strong>,
    em: ({ children }: any) => <em className="italic text-gray-700">{children}</em>,
    ul: ({ children }: any) => <ul className="list-disc list-inside mb-2 text-gray-700">{children}</ul>,
    ol: ({ children }: any) => <ol className="list-decimal list-inside mb-2 text-gray-700">{children}</ol>,
    li: ({ children }: any) => <li className="mb-1">{children}</li>,
    code: ({ children, className }: any) => {
      const isInline = !className;
      return isInline ? (
        <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono text-gray-800">{children}</code>
      ) : (
        <code className="block bg-gray-100 p-2 rounded text-sm font-mono text-gray-800 overflow-x-auto">{children}</code>
      );
    },
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-blue-300 pl-3 my-2 text-gray-600 italic">{children}</blockquote>
    ),
    table: ({ children }: any) => (
      <div className="overflow-x-auto my-4 rounded-lg shadow-md border border-gray-200">
        <table className="w-full border-collapse bg-white">{children}</table>
      </div>
    ),
    thead: ({ children }: any) => <thead className="bg-blue-100">{children}</thead>,
    tbody: ({ children }: any) => <tbody>{children}</tbody>,
    th: ({ children }: any) => (
      <th className="px-4 py-3 text-center text-sm font-bold text-gray-800 border border-gray-300">{children}</th>
    ),
    td: ({ children }: any) => (
      <td className="px-4 py-3 text-center text-sm text-gray-700 border border-gray-300 whitespace-pre-wrap">{children}</td>
    ),
    tr: ({ children }: any) => <tr className="bg-white even:bg-gray-50 hover:bg-blue-50 transition-colors duration-200">{children}</tr>,
  };

  // 混合渲染函数：使用TableRenderer处理表格，ReactMarkdown处理其他内容
  const renderContentWithTables = (content: string, components: any) => {
    // 检查内容是否包含表格
    const hasTable = parseMarkdownTable(content) !== null;
    
    if (hasTable) {
      // 如果包含表格，使用改进的分割逻辑
      const tableRegex = /^\s*\|(.+)\|\s*\n\s*\|[-\s|:]+\|\s*\n((?:\s*\|.+\|\s*\n?)*)/gm;
      let lastIndex = 0;
      const parts = [];
      let match;
      
      // 重置正则表达式的lastIndex
      tableRegex.lastIndex = 0;
      
      while ((match = tableRegex.exec(content)) !== null) {
        // 添加表格前的内容
        if (match.index > lastIndex) {
          const beforeTable = content.substring(lastIndex, match.index).trim();
          if (beforeTable) {
            parts.push({ type: 'markdown', content: beforeTable });
          }
        }
        
        // 添加表格内容
        parts.push({ type: 'table', content: match[0] });
        
        lastIndex = match.index + match[0].length;
      }
      
      // 添加最后一个表格后的内容
      if (lastIndex < content.length) {
        const afterTable = content.substring(lastIndex).trim();
        if (afterTable) {
          parts.push({ type: 'markdown', content: afterTable });
        }
      }
      
      return (
        <>
          {parts.map((part, index) => {
            if (part.type === 'table') {
              return <TableRenderer key={index} content={part.content} />;
            } else {
              // 非表格内容使用ReactMarkdown渲染
              return (
                <ReactMarkdown
                  key={index}
                  remarkPlugins={[remarkMath]}
                  rehypePlugins={[rehypeKatex]}
                  components={components}
                >
                  {part.content}
                </ReactMarkdown>
              );
            }
          })}
        </>
      );
    } else {
      // 如果没有表格，使用ReactMarkdown渲染整个内容
      return (
        <ReactMarkdown
          remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeKatex]}
          components={components}
        >
          {content}
        </ReactMarkdown>
      );
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: question.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setQuestion('');
    setIsLoading(true);

    try {
      const aiProvider = createProviderFromEnv();
      if (!aiProvider) {
        throw new Error('AI服务不可用');
      }
      
      // 构建上下文信息
      const contextPrompt = `你是一位耐心的老师，正在为学生解答关于"${subject} - ${topic}"的问题。

原始讲解内容：
${originalContent}

学生现在有新的问题需要你解答。请基于原始讲解内容，用简洁明了的方式回答学生的问题。如果问题与原内容相关，可以引用原内容；如果是新的问题，请提供清晰的解释。

学生的问题：${userMessage.content}`;

      let responseContent = '';
      
      // 设置消息处理器
      aiProvider.onMessage((message: string, isFinal: boolean) => {
        responseContent += message;
        
        if (isFinal) {
          const assistantMessage: ChatMessage = {
            role: 'assistant',
            content: responseContent,
            timestamp: new Date()
          };
          setMessages(prev => [...prev, assistantMessage]);
          setIsLoading(false);
        }
      });

      // 设置错误处理器
      aiProvider.onError((error: string) => {
        console.error('AI回答失败:', error);
        const errorMessage: ChatMessage = {
          role: 'assistant',
          content: '抱歉，我现在无法回答您的问题。请稍后再试。',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMessage]);
        setIsLoading(false);
      });

      // 发送消息
      await aiProvider.sendMessage(contextPrompt);
      
    } catch (error) {
      console.error('AI回答失败:', error);
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: '抱歉，我现在无法回答您的问题。请稍后再试。',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl h-[600px] flex flex-col">
        {/* 头部 */}
        <div className="flex items-center justify-between p-4 border-b">
          <div>
            <h2 className="text-lg font-semibold">向AI提问</h2>
            <p className="text-sm text-gray-600">{subject} - {topic}</p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={clearChat}
              className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded hover:bg-gray-200"
            >
              清空对话
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-xl"
            >
              ×
            </button>
          </div>
        </div>

        {/* 对话区域 */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 mt-8">
              <p>有什么不懂的地方吗？</p>
              <p className="text-sm mt-2">我会基于刚才的讲解内容为你解答</p>
            </div>
          ) : (
            messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {message.role === 'user' ? (
                    <div className="whitespace-pre-wrap">{message.content}</div>
                  ) : (
                    <div className="prose prose-sm max-w-none">
                      {renderContentWithTables(message.content, customComponents)}
                    </div>
                  )}
                  <div
                    className={`text-xs mt-1 ${
                      message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))
          )}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-800 p-3 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                  <span>AI正在思考...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* 输入区域 */}
        <div className="border-t p-4">
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="输入你的问题..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!question.trim() || isLoading}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              发送
            </button>
          </form>
          <p className="text-xs text-gray-500 mt-2">
            💡 提示：你可以问"这个概念我还是不太懂"、"能举个例子吗"等问题
          </p>
        </div>
      </div>
    </div>
  );
}