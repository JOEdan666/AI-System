'use client'

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { CheckCircle, XCircle, BookOpen } from 'lucide-react';
import TableRenderer, { parseMarkdownTable } from '../TableRenderer';

interface ConfirmStepProps {
  content: string;
  isLoading?: boolean;
  onConfirmUnderstanding: () => void;
  onContinueExplanation: () => void;
  showConfirmation?: boolean;
}

const ConfirmStep: React.FC<ConfirmStepProps> = ({ 
  content, 
  isLoading = false, 
  onConfirmUnderstanding, 
  onContinueExplanation,
  showConfirmation = false
}) => {
  const [userChoice, setUserChoice] = useState<string>('');

  const handleConfirm = () => {
    setUserChoice('confirmed');
    onConfirmUnderstanding();
  };

  const handleContinue = () => {
    setUserChoice('continue');
    onContinueExplanation();
  };

  // 自定义Markdown组件
  const customComponents = {
    h1: ({ children }: any) => (
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 border-b-2 border-blue-500 pb-2">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 mt-6">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2 mt-4">
        {children}
      </h3>
    ),
    p: ({ children }: any) => (
      <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
        {children}
      </p>
    ),
    ul: ({ children }: any) => (
      <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-1 ml-4">
        {children}
      </ul>
    ),
    ol: ({ children }: any) => (
      <ol className="list-decimal list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-1 ml-4">
        {children}
      </ol>
    ),
    li: ({ children }: any) => (
      <li className="mb-1">
        {children}
      </li>
    ),
    strong: ({ children }: any) => (
      <strong className="font-semibold text-blue-600 dark:text-blue-400">
        {children}
      </strong>
    ),
    code: ({ children }: any) => (
      <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono text-gray-800 dark:text-gray-200">
        {children}
      </code>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-gray-700 dark:text-gray-300 mb-4 italic">
        {children}
      </blockquote>
    ),
    // 表格样式组件
    table: ({ children }: any) => (
      <div className="overflow-x-auto my-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
        <table className="w-full border-collapse bg-white dark:bg-gray-800">{children}</table>
      </div>
    ),
    thead: ({ children }: any) => (
      <thead className="bg-blue-100 dark:bg-blue-900">{children}</thead>
    ),
    tbody: ({ children }: any) => <tbody>{children}</tbody>,
    th: ({ children }: any) => (
      <th className="px-4 py-3 text-center text-sm font-bold text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600">
        {children}
      </th>
    ),
    td: ({ children }: any) => (
      <td className="px-4 py-3 text-center text-sm text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 whitespace-pre-wrap">
        {children}
      </td>
    ),
    tr: ({ children }: any) => (
      <tr className="bg-white dark:bg-gray-800 even:bg-gray-50 dark:even:bg-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200">
        {children}
      </tr>
    ),
  };

  // 混合渲染函数：检测表格并选择合适的渲染方式
  const renderContentWithTables = (content: string) => {
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
        <div>
          {parts.map((part, index) => {
            if (part.type === 'table') {
              return <TableRenderer key={index} content={part.content} />;
            } else {
              // 非表格内容使用ReactMarkdown渲染
              return (
                <ReactMarkdown
                  key={index}
                  components={customComponents}
                >
                  {part.content}
                </ReactMarkdown>
              );
            }
          })}
        </div>
      );
    } else {
      // 如果没有表格，直接使用ReactMarkdown
      return (
        <ReactMarkdown components={customComponents}>
          {content}
        </ReactMarkdown>
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
      {/* 标题区域 */}
      <div className="flex items-center mb-6">
        <BookOpen className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          知识理解确认
        </h1>
      </div>

      {/* 知识大纲内容 */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-6">
        <div className="prose prose-lg max-w-none dark:prose-invert">
          {renderContentWithTables(content)}
        </div>
      </div>

      {/* 确认按钮区域 */}
      {showConfirmation && !isLoading && (
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <div className="text-center mb-6">
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
              请确认你是否已经理解了以上知识点和解题方法？
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleConfirm}
              disabled={userChoice !== ''}
              className={`
                flex items-center justify-center px-6 py-3 rounded-lg font-medium text-white
                transition-all duration-200 min-w-[200px]
                ${userChoice === '' 
                  ? 'bg-green-600 hover:bg-green-700 hover:shadow-lg transform hover:-translate-y-0.5' 
                  : userChoice === 'confirmed'
                    ? 'bg-green-700 shadow-lg'
                    : 'bg-gray-400 cursor-not-allowed'
                }
              `}
            >
              <CheckCircle className="h-5 w-5 mr-2" />
              确认理解，进行测验
            </button>
            
            <button
              onClick={handleContinue}
              disabled={userChoice !== ''}
              className={`
                flex items-center justify-center px-6 py-3 rounded-lg font-medium text-white
                transition-all duration-200 min-w-[200px]
                ${userChoice === '' 
                  ? 'bg-orange-600 hover:bg-orange-700 hover:shadow-lg transform hover:-translate-y-0.5' 
                  : userChoice === 'continue'
                    ? 'bg-orange-700 shadow-lg'
                    : 'bg-gray-400 cursor-not-allowed'
                }
              `}
            >
              <XCircle className="h-5 w-5 mr-2" />
              需要继续讲解
            </button>
          </div>
        </div>
      )}

      {/* 加载状态 */}
      {isLoading && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600 dark:text-gray-400">正在处理...</span>
        </div>
      )}
    </div>
  );
};

export default ConfirmStep;