'use client'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'

// 添加全局类型声明
declare global {
  interface Window {
    pdfjsLib: any;
  }
}

type Props = {
  dataUrl: string
  name?: string
  onClose: () => void
  onExtract?: (text: string) => void
}

const PDFViewer: React.FC<Props> = ({ dataUrl, name, onClose, onExtract }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [pdfLib, setPdfLib] = useState<any>(null)
  const [pdfDoc, setPdfDoc] = useState<any>(null)
  const [pageNum, setPageNum] = useState(1)
  const [numPages, setNumPages] = useState(1)
  const [scale, setScale] = useState(1.2)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [ocrRunning, setOcrRunning] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [textExtractionProgress, setTextExtractionProgress] = useState(0)

  // 初始化 PDF.js（使用直接CDN引用，避免模块导入问题）
  useEffect(() => {
    let cancelled = false
    
    const loadPdfJs = async () => {
      try {
        setLoading(true)
        setLoadingProgress(10)
        
        // 直接使用全局变量方式
        if (typeof window === 'undefined') {
          throw new Error('浏览器环境不可用')
        }
        
        // 检查是否已加载
        if (window.pdfjsLib) {
          setLoadingProgress(50)
          return window.pdfjsLib
        }
        
        // 动态加载PDF.js脚本
        const loadScript = (src: string): Promise<void> => {
          return new Promise((resolve, reject) => {
            const script = document.createElement('script')
            script.src = src
            script.onload = () => resolve()
            script.onerror = () => reject(new Error(`加载脚本失败: ${src}`))
            document.head.appendChild(script)
          })
        }
        
        // 加载PDF.js库
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js')
        setLoadingProgress(40)
        
        // 确保pdfjsLib存在
        if (!window.pdfjsLib) {
          throw new Error('PDF.js库未正确加载')
        }
        
        // 设置worker
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js'
        
        setLoadingProgress(50)
        return window.pdfjsLib
      } catch (error) {
        console.error('加载PDF.js失败:', error)
        throw error
      }
    }
    
    const loadPdf = async () => {
      try {
        // 加载PDF.js库
        const pdfjs = await loadPdfJs()
        if (cancelled) return
        
        setPdfLib(pdfjs)
        
        // 加载PDF文档
        const loadingTask = pdfjs.getDocument({ url: dataUrl })
        loadingTask.onProgress = (progressData: { loaded: number, total: number }) => {
          if (progressData.total) {
            const progress = Math.min(90, 50 + Math.round((progressData.loaded / progressData.total) * 40))
            setLoadingProgress(progress)
          }
        }
        
        const doc = await loadingTask.promise
        if (cancelled) return
        
        setPdfDoc(doc)
        setNumPages(doc.numPages || 1)
        setPageNum(1)
        setLoadingProgress(100)
      } catch (e: any) {
        const errorMsg = e?.message || 'PDF 加载失败'
        console.error('PDF加载错误:', e)
        setError(errorMsg)
        toast.error(errorMsg)
      } finally {
        setLoading(false)
      }
    }
    
    loadPdf()
    return () => { cancelled = true }
  }, [dataUrl])

  const renderPage = useCallback(async (n: number) => {
    if (!pdfDoc || !canvasRef.current) return
    try {
      const page = await pdfDoc.getPage(n)
      const viewport = page.getViewport({ scale })
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      
      // 设置高DPI支持
      const outputScale = window.devicePixelRatio || 1
      canvas.width = Math.floor(viewport.width * outputScale)
      canvas.height = Math.floor(viewport.height * outputScale)
      canvas.style.width = Math.floor(viewport.width) + 'px'
      canvas.style.height = Math.floor(viewport.height) + 'px'
      
      const transform = outputScale !== 1 
        ? [outputScale, 0, 0, outputScale, 0, 0] 
        : undefined
      
      await page.render({ 
        canvasContext: ctx, 
        viewport,
        transform
      }).promise
    } catch (e) {
      console.warn('渲染页面失败', e)
      toast.error('页面渲染失败，请尝试重新加载')
    }
  }, [pdfDoc, scale])

  useEffect(() => { 
    if (pdfDoc) {
      renderPage(pageNum) 
    }
  }, [pageNum, renderPage, pdfDoc])

  const prev = () => setPageNum(p => Math.max(1, p - 1))
  const next = () => setPageNum(p => Math.min(numPages, p + 1))
  const zoomIn = () => setScale(s => Math.min(3, s + 0.2))
  const zoomOut = () => setScale(s => Math.max(0.5, s - 0.2))
  
  // 键盘快捷键支持
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'ArrowRight') next()
      else if (e.key === '+' || e.key === '=') zoomIn()
      else if (e.key === '-') zoomOut()
      else if (e.key === 'Escape') onClose()
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [numPages])

  const extractAllText = async () => {
    if (!pdfDoc) return
    try {
      setTextExtractionProgress(0)
      toast.loading('正在提取文本...', { id: 'extract-text' })
      
      let full = ''
      for (let i = 1; i <= pdfDoc.numPages; i++) {
        try {
          const page = await pdfDoc.getPage(i)
          const content = await page.getTextContent()
          const text = content.items.map((it: any) => it.str || '').join(' ')
          full += (i > 1 ? '\n\n' : '') + text
          
          // 更新进度
          setTextExtractionProgress(Math.round((i / pdfDoc.numPages) * 100))
        } catch (pageError) {
          console.error(`提取第${i}页文本失败:`, pageError)
          // 继续处理下一页
          continue
        }
      }
      
      if (full.trim().length === 0) {
        toast.error('未能提取到文本，请尝试OCR', { id: 'extract-text' })
      } else {
        // 确保文本被正确传递
        if (onExtract && typeof onExtract === 'function') {
          onExtract(full)
          toast.success('文本提取成功', { id: 'extract-text' })
        } else {
          toast.error('回调函数无效，无法保存提取的文本', { id: 'extract-text' })
        }
      }
    } catch (e) {
      console.error('提取文本失败:', e)
      toast.error('提取文本失败', { id: 'extract-text' })
      setError('提取文本失败')
    } finally {
      setTextExtractionProgress(0)
    }
  }

  const ocrAllPages = async () => {
    if (!pdfDoc) return
    try {
      setOcrRunning(true)
      toast.loading('OCR处理中，这可能需要一些时间...', { id: 'ocr-process' })
      
      const Tesseract: any = await import('tesseract.js')
      const limit = Math.min(pdfDoc.numPages, 10) // 避免阻塞，默认最多10页
      let full = ''
      
      for (let i = 1; i <= limit; i++) {
        toast.loading(`OCR处理第 ${i}/${limit} 页...`, { id: 'ocr-process' })
        const page = await pdfDoc.getPage(i)
        const viewport = page.getViewport({ scale: 2 })
        const c = document.createElement('canvas')
        const ctx = c.getContext('2d')
        if (!ctx) continue
        c.width = viewport.width
        c.height = viewport.height
        await page.render({ canvasContext: ctx, viewport }).promise
        
        const { data } = await Tesseract.recognize(c, 'eng+chi_sim', {
          logger: (m: any) => {
            if (m.status === 'recognizing text') {
              toast.loading(`OCR处理第 ${i}/${limit} 页: ${Math.round(m.progress * 100)}%`, { id: 'ocr-process' })
            }
          }
        })
        
        const t = String(data?.text || '').trim()
        if (t) full += (i > 1 ? '\n\n' : '') + t
      }
      
      if (full.trim().length === 0) {
        toast.error('OCR未识别到文本（可能是低清晰度或受限PDF）', { id: 'ocr-process' })
        setError('OCR 未识别到文本（可能是低清晰度或受限PDF）')
      } else {
        onExtract?.(full)
        toast.success('OCR处理完成', { id: 'ocr-process' })
      }
    } catch (e: any) {
      const errorMsg = e?.message || 'OCR 失败'
      toast.error(errorMsg, { id: 'ocr-process' })
      setError(errorMsg)
    } finally {
      setOcrRunning(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 w-full max-w-5xl rounded-lg shadow-2xl overflow-hidden flex flex-col h-[90vh]">
        <div className="px-4 py-3 border-b dark:border-gray-700 flex items-center justify-between bg-gray-50 dark:bg-gray-900">
          <div className="text-sm font-medium truncate dark:text-white">{name || 'PDF 预览'}</div>
          <div className="flex items-center gap-2 flex-wrap justify-end">
            <button className="px-2 py-1 text-sm border border-slate-200 rounded hover:bg-slate-100 hover:border-slate-300 dark:hover:bg-slate-700 dark:border-slate-600 dark:text-slate-200 transition-all" onClick={zoomOut} title="缩小 (-)">-</button>
            <span className="text-xs text-slate-500 dark:text-slate-400 min-w-[40px] text-center">{Math.round(scale * 100)}%</span>
            <button className="px-2 py-1 text-sm border border-slate-200 rounded hover:bg-slate-100 hover:border-slate-300 dark:hover:bg-slate-700 dark:border-slate-600 dark:text-slate-200 transition-all" onClick={zoomIn} title="放大 (+)">+</button>
            <button className="px-2 py-1 text-sm border border-slate-200 rounded hover:bg-slate-100 hover:border-slate-300 dark:hover:bg-slate-700 dark:border-slate-600 dark:text-slate-200 transition-all" onClick={prev} disabled={pageNum<=1} title="上一页 (←)">上一页</button>
            <span className="text-xs text-slate-500 dark:text-slate-400 min-w-[50px] text-center">{pageNum}/{numPages}</span>
            <button className="px-2 py-1 text-sm border border-slate-200 rounded hover:bg-slate-100 hover:border-slate-300 dark:hover:bg-slate-700 dark:border-slate-600 dark:text-slate-200 transition-all" onClick={next} disabled={pageNum>=numPages} title="下一页 (→)">下一页</button>
            {onExtract && (
              <>
                <button 
                  className="px-2 py-1 text-sm bg-primary text-white rounded hover:bg-primary/90 active:bg-primary/80 transition-all" 
                  onClick={extractAllText}
                  disabled={textExtractionProgress > 0}
                >
                  {textExtractionProgress > 0 ? `提取中 ${textExtractionProgress}%` : '提取文本用于AI'}
                </button>
                <button 
                  className="px-2 py-1 text-sm bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white rounded transition-all disabled:opacity-50" 
                  disabled={ocrRunning} 
                  onClick={ocrAllPages}
                >
                  {ocrRunning ? 'OCR处理中…' : 'OCR提取（慢）'}
                </button>
              </>
            )}
            <button className="px-2 py-1 text-sm border border-slate-200 rounded hover:bg-slate-100 hover:border-slate-300 dark:hover:bg-slate-700 dark:border-slate-600 dark:text-slate-200 transition-all" onClick={onClose} title="关闭 (ESC)">关闭</button>
          </div>
        </div>
        <div className="flex-1 overflow-auto bg-gray-100 dark:bg-gray-900 grid place-items-center p-4">
          {loading ? (
            <div className="flex flex-col items-center">
              <div className="w-48 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-300" 
                  style={{ width: `${loadingProgress}%` }}
                ></div>
              </div>
              <div className="text-gray-500 dark:text-gray-400 text-sm mt-2">加载中... {loadingProgress}%</div>
            </div>
          ) : error ? (
            <div className="text-red-500 dark:text-red-400 text-sm p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
              <div className="font-medium mb-1">加载错误</div>
              {error}
            </div>
          ) : (
            <div className="relative">
              <canvas ref={canvasRef} className="shadow-lg border bg-white rounded" />
              <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                第 {pageNum} / {numPages} 页
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PDFViewer