// @ts-nocheck
'use client'
import { useState, useRef, useEffect } from 'react'

export default function Home() {
  // 状态管理
  const [inputText, setInputText] = useState('')
  const [savedItems, setSavedItems] = useState<string[]>([])
  const [isSaving, setIsSaving] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [useUniBackground, setUseUniBackground] = useState(false)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // 本地存储的键名
  const STORAGE_KEY = 'learning_system_items';
  
  // 检查localStorage是否可用的函数
  const isLocalStorageAvailable = () => {
    try {
      const testKey = '__storage_test__';
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      console.warn('localStorage不可用:', e);
      return false;
    }
  };
  
  // 显示当前localStorage内容的调试函数
  const debugLocalStorage = () => {
    if (isLocalStorageAvailable()) {
      const currentValue = localStorage.getItem(STORAGE_KEY);
      console.log('当前localStorage内容:', currentValue);
      console.log('localStorage所有键:', Object.keys(localStorage));
    }
  };
  
  // 从本地存储加载数据 - 增强版
  useEffect(() => {
    console.log('开始加载数据...');
    if (isLocalStorageAvailable()) {
      try {
        // 添加短暂延迟以确保localStorage完全可用
        setTimeout(() => {
          const savedData = localStorage.getItem(STORAGE_KEY);
          console.log('加载数据:', savedData);
          if (savedData) {
            try {
              const parsedData = JSON.parse(savedData);
              if (Array.isArray(parsedData)) {
                setSavedItems(parsedData);
                console.log('数据加载成功，共', parsedData.length, '项');
              } else {
                console.error('数据不是数组格式:', parsedData);
              }
            } catch (parseError) {
              console.error('解析localStorage数据失败:', parseError);
              // 清理无效数据
              localStorage.removeItem(STORAGE_KEY);
            }
          } else {
            console.log('localStorage中没有找到数据');
          }
          // 显示调试信息
          debugLocalStorage();
        }, 100);
      } catch (error) {
        console.error('从localStorage加载数据失败:', error);
      }
    } else {
      console.warn('localStorage不可用，使用内存存储');
    }
  }, []);
  
  // 保存数据到本地存储 - 增强版
  useEffect(() => {
    console.log('准备保存数据，当前项目数量:', savedItems.length);
    if (isLocalStorageAvailable()) {
      try {
        // 确保数据格式正确
        const dataToSave = Array.isArray(savedItems) ? savedItems : [];
        const jsonData = JSON.stringify(dataToSave);
        console.log('准备保存的JSON数据:', jsonData);
        
        // 清除并重新设置以确保数据完整性
        localStorage.removeItem(STORAGE_KEY);
        localStorage.setItem(STORAGE_KEY, jsonData);
        
        // 验证保存是否成功
        const verifyData = localStorage.getItem(STORAGE_KEY);
        if (verifyData === jsonData) {
          console.log('数据已成功保存到localStorage，共', dataToSave.length, '项');
          // 显示调试信息
          debugLocalStorage();
        } else {
          console.warn('数据保存验证失败，实际保存:', verifyData);
        }
      } catch (error) {
        console.error('保存数据到localStorage失败:', error);
        // 尝试使用sessionStorage作为备选
        try {
          sessionStorage.setItem(STORAGE_KEY + '_backup', JSON.stringify(savedItems));
          console.log('已将数据保存到sessionStorage作为备份');
        } catch (sessionError) {
          console.error('保存到sessionStorage也失败:', sessionError);
        }
      }
    }
  }, [savedItems]);

  // 初始化暗色模式
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setDarkMode(prefersDark)
  }, [])

  // 切换模式（暗色/亮色/uni背景）
  const toggleBackground = () => {
    if (useUniBackground) {
      // 从uni背景切换到亮色模式
      console.log('切换到亮色模式');
      setUseUniBackground(false)
      setDarkMode(false)
    } else if (darkMode) {
      // 从暗色模式切换到uni背景
      console.log('切换到uni背景');
      setDarkMode(false)
      setUseUniBackground(true)
    } else {
      // 从亮色模式切换到暗色模式
      console.log('切换到暗色模式');
      setDarkMode(true)
      setUseUniBackground(false)
    }
  }

  // 处理保存操作
  const handleSave = () => {
    if (inputText.trim()) {
      setIsSaving(true)
      
      // 模拟异步保存操作
      setTimeout(() => {
        setSavedItems((prevItems: string[]) => [...prevItems, inputText.trim()])
        setInputText('')
        setIsSaving(false)
        
        // 保存后自动聚焦到输入框
        if (inputRef.current) {
          inputRef.current.focus()
        }
        
        // 添加保存成功的动画效果
        if (containerRef.current) {
          containerRef.current.classList.add('save-success')
          setTimeout(() => {
            if (containerRef.current) {
              containerRef.current.classList.remove('save-success')
            }
          }, 500)
        }
      }, 500)
    }
  }

  // 处理键盘事件
  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSave();
    }
  };

  // 删除保存的项目
  const handleDeleteItem = (index: number) => {
    setSavedItems((prevItems) => prevItems.filter((_, i) => i !== index))
  };

  return (
    <div 
      ref={containerRef}
      className={`min-h-screen p-4 sm:p-6 md:p-8 flex flex-col transition-all duration-500 relative ${useUniBackground ? 'bg-cover bg-center bg-no-repeat' : (darkMode ? 'bg-cover bg-center bg-no-repeat' : 'bg-gradient-to-br from-blue-50 to-cyan-50')}`}
      style={{
        backgroundImage: useUniBackground ? "url('/uni.png')" : darkMode ? "url('/intelligent.jpg')" : undefined
      }}
    >
      {/* 头部 */}
      <header className="text-center mb-8 animate-fade-in relative">
        {/* 背景切换按钮 */}
        <button 
          onClick={(e) => {
            e.stopPropagation(); // 阻止事件冒泡
            console.log('切换背景模式:', useUniBackground ? '切换到亮色模式' : (darkMode ? '切换到uni背景' : '切换到暗色模式'));
            toggleBackground();
          }}
          className={`absolute top-0 right-0 p-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 backdrop-blur-sm z-50 ${useUniBackground ? 'bg-white/80' : (darkMode ? 'bg-gray-800/80' : 'bg-white/80')}`}
          aria-label={useUniBackground ? "切换到亮色模式" : (darkMode ? "切换到uni背景" : "切换到暗色模式")}
          style={{ cursor: 'pointer', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {useUniBackground ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 3v18M3 12h18" />
            </svg>
          ) : darkMode ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          )}
        </button>
        
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 animate-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500 hover:scale-105 hover:from-blue-400 hover:to-cyan-300">
          自学系统
        </h1>
        <p className="text-blue-200 text-lg font-medium tracking-wide transition-all duration-300 hover:text-blue-100">
              以自学为基础，以生产为导向
            </p>
      </header>
      
      {/* 主要内容区域 */}
      <div className="flex-grow flex gap-4">
        {/* 左侧 - 今日学习提示 */}
        <aside className="hidden md:block w-64 shrink-0 order-0">
          <div className="sticky top-6">
            <div className="bg-white/95 border border-blue-200 rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 backdrop-blur-md transform hover:-translate-y-0.5">
              <h3 className="text-base font-semibold text-blue-600 mb-2 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                今日学习提示
              </h3>
              <p className="text-gray-700 mb-3 text-sm leading-relaxed">
                学习是一个循序渐进的过程，每天记录一点，假以时日必有收获。
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                  自学
                </span>
                <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                  积累
                </span>
                <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                  思考
                </span>
              </div>
            </div>
          </div>
        </aside>
        
        {/* 中间主内容区域 - 记录学习板块 */}
        <main className="flex-grow order-1 flex flex-col items-center">
          {/* 记录学习的板块 - 居中大小适中 */}
          <div className="w-full max-w-2xl mx-auto my-6">
            {/* 移动端已保存内容 */}
            <div className="md:hidden mb-6">
              {savedItems.length > 0 && (
                <div className="animate-fade-in bg-white/70 border border-purple-200 rounded-lg p-3 shadow-md hover:shadow-lg transition-all duration-300 backdrop-blur-md">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-sm font-semibold text-purple-600 flex items-center gap-1">
                      <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-purple-100 text-purple-600 text-xs font-medium">
                        📝
                      </span>
                      已保存的内容 ({savedItems.length})
                    </h2>
                    <button 
                      onClick={() => setSavedItems([])}
                      className="text-xs text-gray-500 hover:text-red-500 transition-colors"
                      aria-label="清空所有内容"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                  <ul className="space-y-2 max-h-[180px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-purple-200 dark:scrollbar-thumb-purple-700 scrollbar-track-transparent">
                    {savedItems.map((item: string, index: number) => (
                      <li key={index} className="flex items-start p-2 rounded-md bg-purple-50 text-gray-700 hover:bg-purple-100/50 transition-all duration-200 group relative">
                        <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-purple-100 text-purple-600 text-xs font-medium mt-0.5">
                        {index + 1}
                      </span>
                        <span className="flex-grow whitespace-pre-wrap break-words text-xs group-hover:text-purple-600 transition-colors">{item}</span>
                        <button 
                          onClick={() => handleDeleteItem(index)}
                          className="absolute right-1 top-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                          aria-label={`删除第${index + 1}项`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-gray-400 hover:text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            {/* 已保存内容（桌面端） */}
            <div className="hidden md:block">
              {savedItems.length > 0 && (
                <div className="animate-fade-in bg-white/70 border border-purple-200 rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 backdrop-blur-md mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-sm font-semibold text-purple-600 flex items-center gap-1">
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-purple-100 text-purple-600 text-xs font-medium">
                        📝
                      </span>
                      已保存的内容 ({savedItems.length})
                    </h2>
                    <button 
                      onClick={() => setSavedItems([])}
                      className="text-sm text-gray-500 hover:text-red-500 transition-colors"
                      aria-label="清空所有内容"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                  <ul className="space-y-3 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-purple-200 dark:scrollbar-thumb-purple-700 scrollbar-track-transparent">
                    {savedItems.map((item: string, index: number) => (
                      <li key={index} className="flex items-start p-3 rounded-md bg-purple-50 text-gray-700 hover:bg-purple-100/50 transition-all duration-200 group relative">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-purple-100 text-purple-600 text-xs font-medium mt-0.5">
                        {index + 1}
                      </span>
                        <span className="flex-grow whitespace-pre-wrap break-words text-sm ml-2 group-hover:text-purple-600 transition-colors">{item}</span>
                        <button 
                          onClick={() => handleDeleteItem(index)}
                          className="absolute right-2 top-2.5 opacity-0 group-hover:opacity-100 transition-opacity"
                          aria-label={`删除第${index + 1}项`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 hover:text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
      
      {/* 固定在底部的输入区域 - 调小尺寸 */}
      <div className="fixed bottom-0 left-0 right-0 p-3 border-t border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="w-full max-w-3xl mx-auto">
          <div className="relative">
            <textarea
              ref={inputRef}
              value={inputText}
              onChange={(e) => {
                const newValue = e.target.value;
                setInputText(newValue);
                
                // 自动调整高度 - 更平滑的GPT风格
                if (inputRef.current) {
                  inputRef.current.style.height = 'auto';
                  const newHeight = Math.max(40, Math.min(inputRef.current.scrollHeight, 150));
                  inputRef.current.style.height = newHeight + 'px';
                }
              }}
              onKeyDown={(e) => {
                handleKeyDown(e);
              }}
              placeholder="输入你的学习心得、思考或灵感..."
              className="w-full pl-3 pr-14 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-sm transition-all duration-300 shadow-sm hover:shadow"
              disabled={isSaving}
              style={{ height: '40px', overflow: 'hidden' }}
            />
            
            {/* 发送按钮 - GPT风格的右下角按钮 */}
            <button
              onClick={handleSave}
              disabled={isSaving || inputText.trim().length === 0}
              className={`absolute right-3 bottom-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-105 ${isSaving || inputText.trim().length === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700 shadow hover:shadow-md'}`}
              aria-label="发送"
            >
              {isSaving ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          </div>
          
          {/* 输入提示 - GPT风格的提示 */}
          <div className="mt-2 text-xs text-gray-500 flex items-center justify-between">
            <div>
              <kbd className="px-2 py-1 bg-gray-100 rounded-md text-xs font-mono">Ctrl</kbd>
              <span className="mx-1">+</span>
              <kbd className="px-2 py-1 bg-gray-100 rounded-md text-xs font-mono">Enter</kbd>
              <span className="ml-2">发送</span>
            </div>
            <span className="text-gray-400">继续输入或按发送键保存</span>
          </div>
        </div>
      </div>
      
      {/* 底部空间，确保内容不被输入框遮挡 */}
      <div className="h-40"></div>
    </div>
  )
}