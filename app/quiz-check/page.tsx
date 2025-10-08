'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, XCircle, AlertTriangle, RefreshCw, Eye, FileText, BarChart3 } from 'lucide-react'

interface Question {
  id: number
  question: string
  type: 'multiple_choice' | 'short_answer' | 'essay'
  options?: string[]
  correctAnswer?: string
  explanation?: string
  points: number
}

interface CheckResult {
  isValid: boolean
  score: number
  issues: string[]
  suggestions: string[]
  typeDistribution: {
    multiple_choice: number
    short_answer: number
    essay: number
  }
}

export default function QuizCheckPage() {
  const [content, setContent] = useState('')
  const [topic, setTopic] = useState('')
  const [region, setRegion] = useState('通用')
  const [grade, setGrade] = useState('初中')
  const [subject, setSubject] = useState('数学')
  const [isGenerating, setIsGenerating] = useState(false)
  const [isChecking, setIsChecking] = useState(false)
  const [questions, setQuestions] = useState<Question[]>([])
  const [checkResult, setCheckResult] = useState<CheckResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const generateQuestions = async () => {
    if (!content.trim()) {
      setError('请输入学习内容')
      return
    }

    setIsGenerating(true)
    setError(null)
    setQuestions([])
    setCheckResult(null)

    try {
      const response = await fetch('/api/openai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content: `你是一位资深的${grade}${subject}教师和考试专家。请根据提供的学习内容和考纲要求，生成10道高质量的考试题目。

要求：
1. 题目类型分布：2道选择题 + 5道简答题 + 3道论述题
2. 选择题：重点考查概念理解、常见陷阱、易错点和重难点
3. 简答题：有一定深度的计算和分析题，避免简单的原理介绍
4. 论述题：综合性强的材料分析题和实际应用题
5. 题目难度：${grade}考试水平，注重计算和思考
6. 地区特色：结合${region}地区的考试特点

请严格按照以下JSON格式输出：
{
  "questions": [
    {
      "id": 1,
      "question": "题目内容",
      "type": "multiple_choice",
      "options": ["A. 选项1", "B. 选项2", "C. 选项3", "D. 选项4"],
      "correctAnswer": "A. 选项1",
      "explanation": "详细解析",
      "points": 10
    },
    {
      "id": 2,
      "question": "题目内容",
      "type": "short_answer",
      "correctAnswer": "标准答案",
      "explanation": "详细解析",
      "points": 8
    },
    {
      "id": 3,
      "question": "题目内容",
      "type": "essay",
      "correctAnswer": "参考答案要点",
      "explanation": "评分标准",
      "points": 15
    }
  ]
}`
            },
            {
              role: 'user',
              content: `请根据以下学习内容生成题目：

主题：${topic || '未指定'}
学习内容：
${content}

请生成10道题目，严格按照JSON格式输出。`
            }
          ]
        })
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`API请求失败: ${response.status} ${response.statusText}\n详细信息: ${errorText}`)
      }

      const data = await response.json()

      if (!data.content) {
        throw new Error('API响应格式错误：缺少content字段')
      }

      // 解析JSON响应
      let questionsData
      try {
        questionsData = JSON.parse(data.content)
      } catch (e) {
        const jsonMatch = data.content.match(/\{[\s\S]*\}/)
        if (jsonMatch) {
          questionsData = JSON.parse(jsonMatch[0])
        } else {
          throw new Error(`无法解析API返回的JSON格式\n原始响应: ${data.content}`)
        }
      }

      if (!questionsData.questions || !Array.isArray(questionsData.questions)) {
        throw new Error(`API返回的数据格式错误：缺少questions数组\n返回数据: ${JSON.stringify(questionsData)}`)
      }

      setQuestions(questionsData.questions)
      
      // 自动进行质量检查
      await checkQuestions(questionsData.questions)

    } catch (error) {
      console.error('题目生成失败:', error)
      setError(error instanceof Error ? error.message : '未知错误')
    } finally {
      setIsGenerating(false)
    }
  }

  const checkQuestions = async (questionsToCheck: Question[] = questions) => {
    if (questionsToCheck.length === 0) {
      setError('没有题目可以检查')
      return
    }

    setIsChecking(true)
    setError(null)

    try {
      const issues: string[] = []
      const suggestions: string[] = []
      let score = 100

      // 检查题目数量
      if (questionsToCheck.length !== 10) {
        issues.push(`题目数量错误：期望10道，实际${questionsToCheck.length}道`)
        score -= 20
      }

      // 检查题目类型分布
      const typeDistribution = {
        multiple_choice: questionsToCheck.filter(q => q.type === 'multiple_choice').length,
        short_answer: questionsToCheck.filter(q => q.type === 'short_answer').length,
        essay: questionsToCheck.filter(q => q.type === 'essay').length
      }

      if (typeDistribution.multiple_choice !== 2) {
        issues.push(`选择题数量错误：期望2道，实际${typeDistribution.multiple_choice}道`)
        score -= 10
      }

      if (typeDistribution.short_answer !== 5) {
        issues.push(`简答题数量错误：期望5道，实际${typeDistribution.short_answer}道`)
        score -= 10
      }

      if (typeDistribution.essay !== 3) {
        issues.push(`论述题数量错误：期望3道，实际${typeDistribution.essay}道`)
        score -= 10
      }

      // 检查每道题目的格式
      for (let i = 0; i < questionsToCheck.length; i++) {
        const q = questionsToCheck[i]
        
        if (!q.id || !q.question || !q.type || !q.points) {
          issues.push(`第${i+1}道题目缺少必要字段`)
          score -= 5
        }

        if (!['multiple_choice', 'short_answer', 'essay'].includes(q.type)) {
          issues.push(`第${i+1}道题目类型错误：${q.type}`)
          score -= 5
        }

        if (q.type === 'multiple_choice') {
          if (!q.options || !Array.isArray(q.options) || q.options.length !== 4) {
            issues.push(`第${i+1}道选择题缺少4个选项`)
            score -= 5
          }
          if (!q.correctAnswer) {
            issues.push(`第${i+1}道选择题缺少正确答案`)
            score -= 3
          }
        }

        if (q.question.length < 10) {
          issues.push(`第${i+1}道题目内容过短，可能质量不高`)
          score -= 2
        }

        if (!q.explanation) {
          suggestions.push(`第${i+1}道题目建议添加解析说明`)
        }
      }

      // 质量评估建议
      if (score >= 90) {
        suggestions.push('题目质量优秀，符合考试标准')
      } else if (score >= 70) {
        suggestions.push('题目质量良好，有少量问题需要修正')
      } else if (score >= 50) {
        suggestions.push('题目质量一般，建议重新生成或大幅修改')
      } else {
        suggestions.push('题目质量较差，强烈建议重新生成')
      }

      const result: CheckResult = {
        isValid: issues.length === 0,
        score: Math.max(0, score),
        issues,
        suggestions,
        typeDistribution
      }

      setCheckResult(result)

    } catch (error) {
      console.error('题目检查失败:', error)
      setError(error instanceof Error ? error.message : '检查过程中发生未知错误')
    } finally {
      setIsChecking(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-blue-100 rounded-xl">
              <BarChart3 className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">题目生成检查系统</h1>
              <p className="text-gray-600">验证和监控AI生成题目的质量</p>
            </div>
          </div>

          {/* 输入区域 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  学习内容 *
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="请输入要生成题目的学习内容..."
                  className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    主题
                  </label>
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="如：垂直平分线"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    地区
                  </label>
                  <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="通用">通用</option>
                    <option value="北京">北京</option>
                    <option value="上海">上海</option>
                    <option value="广东">广东</option>
                    <option value="江苏">江苏</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    年级
                  </label>
                  <select
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="小学">小学</option>
                    <option value="初中">初中</option>
                    <option value="高中">高中</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    学科
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="数学">数学</option>
                    <option value="语文">语文</option>
                    <option value="英语">英语</option>
                    <option value="物理">物理</option>
                    <option value="化学">化学</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={generateQuestions}
                  disabled={isGenerating || !content.trim()}
                  className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      生成中...
                    </>
                  ) : (
                    <>
                      <FileText className="w-5 h-5" />
                      生成题目
                    </>
                  )}
                </button>

                <button
                  onClick={() => checkQuestions()}
                  disabled={isChecking || questions.length === 0}
                  className="bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isChecking ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      检查中...
                    </>
                  ) : (
                    <>
                      <Eye className="w-5 h-5" />
                      质量检查
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* 检查结果 */}
            <div className="space-y-6">
              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-red-50 border border-red-200 rounded-lg p-4"
                >
                  <div className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-red-800">错误信息</h3>
                      <p className="text-red-700 text-sm mt-1 whitespace-pre-wrap">{error}</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {checkResult && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-4"
                >
                  {/* 总体评分 */}
                  <div className={`border rounded-lg p-4 ${
                    checkResult.score >= 90 ? 'bg-green-50 border-green-200' :
                    checkResult.score >= 70 ? 'bg-yellow-50 border-yellow-200' :
                    'bg-red-50 border-red-200'
                  }`}>
                    <div className="flex items-center gap-3">
                      {checkResult.score >= 90 ? (
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      ) : checkResult.score >= 70 ? (
                        <AlertTriangle className="w-6 h-6 text-yellow-500" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-500" />
                      )}
                      <div>
                        <h3 className="font-medium">质量评分</h3>
                        <p className="text-2xl font-bold">{checkResult.score}/100</p>
                      </div>
                    </div>
                  </div>

                  {/* 题目类型分布 */}
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h3 className="font-medium mb-3">题目类型分布</h3>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {checkResult.typeDistribution.multiple_choice}
                        </div>
                        <div className="text-gray-600">选择题</div>
                        <div className="text-xs text-gray-500">(期望: 2)</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {checkResult.typeDistribution.short_answer}
                        </div>
                        <div className="text-gray-600">简答题</div>
                        <div className="text-xs text-gray-500">(期望: 5)</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">
                          {checkResult.typeDistribution.essay}
                        </div>
                        <div className="text-gray-600">论述题</div>
                        <div className="text-xs text-gray-500">(期望: 3)</div>
                      </div>
                    </div>
                  </div>

                  {/* 问题列表 */}
                  {checkResult.issues.length > 0 && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <h3 className="font-medium text-red-800 mb-2">发现的问题</h3>
                      <ul className="space-y-1">
                        {checkResult.issues.map((issue, index) => (
                          <li key={index} className="text-red-700 text-sm flex items-start gap-2">
                            <XCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                            {issue}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* 建议列表 */}
                  {checkResult.suggestions.length > 0 && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h3 className="font-medium text-blue-800 mb-2">改进建议</h3>
                      <ul className="space-y-1">
                        {checkResult.suggestions.map((suggestion, index) => (
                          <li key={index} className="text-blue-700 text-sm flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                            {suggestion}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </div>

          {/* 题目预览 */}
          {questions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="border-t pt-8"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6">生成的题目预览</h2>
              <div className="space-y-6">
                {questions.map((question, index) => (
                  <div key={question.id} className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="font-medium text-lg">第{index + 1}题</h3>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          question.type === 'multiple_choice' ? 'bg-blue-100 text-blue-800' :
                          question.type === 'short_answer' ? 'bg-green-100 text-green-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {question.type === 'multiple_choice' ? '选择题' :
                           question.type === 'short_answer' ? '简答题' : '论述题'}
                        </span>
                        <span className="text-sm text-gray-500">{question.points}分</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-800 mb-4 whitespace-pre-wrap">{question.question}</p>
                    
                    {question.options && (
                      <div className="space-y-2 mb-4">
                        {question.options.map((option, optIndex) => (
                          <div key={optIndex} className="text-gray-700">{option}</div>
                        ))}
                      </div>
                    )}
                    
                    {question.correctAnswer && (
                      <div className="text-sm text-green-700 bg-green-50 p-2 rounded">
                        <strong>答案：</strong>{question.correctAnswer}
                      </div>
                    )}
                    
                    {question.explanation && (
                      <div className="text-sm text-blue-700 bg-blue-50 p-2 rounded mt-2">
                        <strong>解析：</strong>{question.explanation}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}