'use client';

import React from 'react';
import { CheckCircle, XCircle, BookOpen } from 'lucide-react';

interface ConfirmStepProps {
  content: string;
  isLoading?: boolean;
  showConfirmation?: boolean;
  onConfirmUnderstanding: () => void;
  onContinueExplanation: () => void;
}

export default function ConfirmStep({
  content,
  isLoading = false,
  showConfirmation = true,
  onConfirmUnderstanding,
  onContinueExplanation
}: ConfirmStepProps) {
  return (
    <div className="space-y-6">
      {/* 知识大纲展示 */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="w-6 h-6 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-800">知识大纲</h3>
        </div>
        
        <div className="prose prose-sm max-w-none">
          <div 
            className="text-gray-700 leading-relaxed whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>

      {/* 确认理解按钮区域 */}
      {showConfirmation && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h4 className="text-md font-medium text-gray-800 mb-4">
            请确认你的理解状态：
          </h4>
          
          <div className="flex flex-col sm:flex-row gap-4">
            {/* 确认理解按钮 */}
            <button
              onClick={onConfirmUnderstanding}
              disabled={isLoading}
              className="flex-1 flex items-center justify-center gap-3 px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors duration-200"
            >
              <CheckCircle className="w-5 h-5" />
              我已理解，进入测验
            </button>

            {/* 继续讲解按钮 */}
            <button
              onClick={onContinueExplanation}
              disabled={isLoading}
              className="flex-1 flex items-center justify-center gap-3 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors duration-200"
            >
              <XCircle className="w-5 h-5" />
              需要继续讲解
            </button>
          </div>

          {/* 提示文字 */}
          <div className="mt-4 text-sm text-gray-600 text-center">
            <p>
              如果你已经理解了上述知识点，可以点击"我已理解"进入测验环节。
              如果还有疑问，可以点击"需要继续讲解"返回详细讲解。
            </p>
          </div>
        </div>
      )}

      {/* 加载状态 */}
      {isLoading && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">处理中...</span>
        </div>
      )}
    </div>
  );
}