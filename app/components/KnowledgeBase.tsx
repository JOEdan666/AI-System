'use client'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { toast } from 'react-hot-toast'
import { KnowledgeBaseService, type KBItem } from '../services/knowledgeBaseService'

const KB_STORAGE_KEY = 'kb_items_v2' // 升级版本号以支持新的存储结构
const KB_SESSION_KEY = 'kb_items_backup_v2'
const KB_INDEXEDDB_NAME = 'knowledge_base_db'
const KB_INDEXEDDB_STORE = 'kb_items'
const KB_INDEXEDDB_VERSION = 1

function formatBytes(bytes: number) {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

async function readAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result || ''))
    reader.onerror = reject
    reader.readAsText(file)
  })
}

async function readAsArrayBuffer(file: File): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as ArrayBuffer)
    reader.onerror = reject
    reader.readAsArrayBuffer(file)
  })
}

async function readAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result || ''))
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

// IndexedDB数据库操作
const openDatabase = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(KB_INDEXEDDB_NAME, KB_INDEXEDDB_VERSION);
    
    request.onerror = (event) => {
      console.error('IndexedDB打开失败:', event);
      reject('无法打开数据库');
    };
    
    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      resolve(db);
    };
    
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(KB_INDEXEDDB_STORE)) {
        db.createObjectStore(KB_INDEXEDDB_STORE, { keyPath: 'id' });
        console.log('创建IndexedDB存储');
      }
    };
  });
};

const saveToIndexedDB = async (items: KBItem[]): Promise<boolean> => {
  try {
    const db = await openDatabase();
    const transaction = db.transaction([KB_INDEXEDDB_STORE], 'readwrite');
    const store = transaction.objectStore(KB_INDEXEDDB_STORE);
    
    // 清除现有数据
    store.clear();
    
    // 添加所有项目
    for (const item of items) {
      store.add(item);
    }
    
    return new Promise((resolve) => {
      transaction.oncomplete = () => {
        db.close();
        resolve(true);
      };
      
      transaction.onerror = (event) => {
        console.error('保存到IndexedDB失败:', event);
        db.close();
        resolve(false);
      };
    });
  } catch (error) {
    console.error('IndexedDB操作失败:', error);
    return false;
  }
};

const loadFromIndexedDB = async (): Promise<KBItem[]> => {
  try {
    const db = await openDatabase();
    const transaction = db.transaction([KB_INDEXEDDB_STORE], 'readonly');
    const store = transaction.objectStore(KB_INDEXEDDB_STORE);
    const request = store.getAll();
    
    return new Promise((resolve) => {
      request.onsuccess = () => {
        db.close();
        resolve(request.result || []);
      };
      
      request.onerror = (event) => {
        console.error('从IndexedDB加载失败:', event);
        db.close();
        resolve([]);
      };
    });
  } catch (error) {
    console.error('IndexedDB操作失败:', error);
    return [];
  }
};

// 轻量解析器：立即支持 txt/csv/json；其余类型按需动态解析或存占位
async function extractText(file: File): Promise<{ text?: string; note?: string }> {
  const mime = (file.type || '').toLowerCase()
  const name = file.name.toLowerCase()

  // 纯文本族
  if (
    mime.startsWith('text/') ||
    name.endsWith('.txt') ||
    name.endsWith('.md') ||
    name.endsWith('.csv') ||
    name.endsWith('.json')
  ) {
    try {
      const raw = await readAsText(file)
      return { text: raw }
    } catch (e) {
      return { note: '读取文本失败' }
    }
  }

  // PDF（先尝试文本提取；若文本极少，回退到少量页面的OCR）
  if (mime === 'application/pdf' || name.endsWith('.pdf')) {
    try {
      const pdfjsLib: any = await import('pdfjs-dist')
      const ab = await readAsArrayBuffer(file)
      // 配置 worker：统一使用 CDN，避免模块对象赋值导致运行时错误
      try {
        ;(pdfjsLib as any).GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${(pdfjsLib as any).version}/pdf.worker.min.js`
      } catch {}
      const doc = await pdfjsLib.getDocument({ data: ab }).promise
      let full = ''
      for (let p = 1; p <= doc.numPages; p++) {
        const page = await doc.getPage(p)
        const content = await page.getTextContent()
        const text = content.items.map((it: any) => it.str || '').join(' ')
        full += (p > 1 ? '\n\n' : '') + text
      }
      const plain = (full || '').replace(/\s+/g, ' ').trim()

      // 如果文本极少（可能是扫描版PDF），尝试对前若干页做OCR回退
      if (plain.length < 50) {
        try {
          const Tesseract: any = await import('tesseract.js')
          const maxOcrPages = Math.min(doc.numPages, 8) // 为了性能限制到前8页
          let ocrAll = ''
          for (let p = 1; p <= maxOcrPages; p++) {
            const page = await doc.getPage(p)
            const viewport = page.getViewport({ scale: 2 })
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')
            if (!ctx) continue
            canvas.width = viewport.width
            canvas.height = viewport.height
            await page.render({ canvasContext: ctx, viewport }).promise
            const { data } = await Tesseract.recognize(canvas, 'eng+chi_sim')
            const t = String(data?.text || '').trim()
            if (t) ocrAll += (p > 1 ? '\n\n' : '') + t
          }
          if (ocrAll.trim().length > 0) {
            return { text: ocrAll, note: `通过OCR提取了前${maxOcrPages}页文本` }
          }
        } catch (e) {
          // OCR失败则继续返回原始提取
        }
      }

      return { text: full }
    } catch (e) {
      return { note: 'PDF 解析未启用（缺少依赖或运行环境限制）' }
    }
  }

  // DOCX（mammoth）
  if (name.endsWith('.docx')) {
    try {
      // 使用动态导入并添加类型断言
      const mammoth = await import('mammoth/mammoth.browser') as any
      const ab = await readAsArrayBuffer(file)
      const result = await mammoth.convertToHtml({ arrayBuffer: ab })
      // 粗暴去标签
      const tmp = document.createElement('div')
      tmp.innerHTML = result.value
      const text = tmp.textContent || tmp.innerText || ''
      return { text }
    } catch (e) {
      return { note: 'DOCX 解析未启用（缺少依赖）' }
    }
  }

  // XLSX（xlsx -> CSV 文本）
  if (name.endsWith('.xlsx') || name.endsWith('.xls')) {
    try {
      const XLSX: any = await import('xlsx')
      const ab = await readAsArrayBuffer(file)
      const wb = XLSX.read(ab, { type: 'array' })
      const sheets = wb.SheetNames
      const parts: string[] = []
      for (const s of sheets) {
        const ws = wb.Sheets[s]
        const csv = XLSX.utils.sheet_to_csv(ws)
        parts.push(`# ${s}\n${csv}`)
      }
      return { text: parts.join('\n\n') }
    } catch (e) {
      return { note: 'Excel 解析未启用（缺少依赖）' }
    }
  }

  // 图片 OCR（Tesseract）- 可选
  if (mime.startsWith('image/') || name.endsWith('.png') || name.endsWith('.jpg') || name.endsWith('.jpeg')) {
    try {
      const Tesseract: any = await import('tesseract.js')
      const url = URL.createObjectURL(file)
      const { data } = await Tesseract.recognize(url, 'eng+chi_sim')
      URL.revokeObjectURL(url)
      return { text: data?.text || '', note: 'OCR 自动提取' }
    } catch (e) {
      return { note: 'OCR 未启用（缺少依赖）' }
    }
  }

  // 视频/其它格式：存元数据与备注
  if (mime.startsWith('video/') || name.endsWith('.mov') || name.endsWith('.mp4')) {
    return { note: '视频暂不自动转写音频，可添加手动摘要' }
  }

  return { note: '暂不支持的文件类型，已保存元数据' }
}

import PDFViewer from './PDFViewer'

const KnowledgeBase: React.FC<{ onItemsChange?: (items: KBItem[]) => void; hideParsingText?: boolean }> = ({ onItemsChange, hideParsingText = false }) => {
  const [items, setItems] = useState<KBItem[]>([])
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [previewItem, setPreviewItem] = useState<KBItem | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [kbService] = useState(() => new KnowledgeBaseService())
  const [isMigrating, setIsMigrating] = useState(false)

  // 载入知识库项目
  useEffect(() => {
    const loadItems = async () => {
      setIsLoading(true);
      try {
        // 首先尝试从数据库加载
        const loadedItems = await kbService.getItems();
        
        if (loadedItems.length > 0) {
          setItems(loadedItems);
          if (onItemsChange) onItemsChange(loadedItems);
          console.log('从数据库加载了', loadedItems.length, '个项目');
        } else {
          // 如果数据库中没有数据，检查是否需要从本地存储迁移
          const hasLocalData = await checkLocalStorageData();
          if (hasLocalData) {
            setIsMigrating(true);
            try {
              const migratedItems = await kbService.migrateFromLocalStorage();
              setItems(migratedItems);
              if (onItemsChange) onItemsChange(migratedItems);
              toast.success(`已迁移${migratedItems.length}个知识库项目到数据库`);
              console.log('迁移了', migratedItems.length, '个项目到数据库');
            } catch (error) {
              console.error('迁移失败:', error);
              toast.error('迁移本地数据失败');
            } finally {
              setIsMigrating(false);
            }
          }
        }
      } catch (error) {
        console.error('加载知识库项目失败:', error);
        toast.error('加载知识库失败，请刷新重试');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadItems();
  }, [kbService, onItemsChange])

  // 检查本地存储是否有数据
  const checkLocalStorageData = async (): Promise<boolean> => {
    try {
      // 检查localStorage
      const localData = localStorage.getItem(KB_STORAGE_KEY);
      if (localData) {
        const parsed = JSON.parse(localData);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return true;
        }
      }

      // 检查sessionStorage
      const sessionData = sessionStorage.getItem(KB_SESSION_KEY);
      if (sessionData) {
        const parsed = JSON.parse(sessionData);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return true;
        }
      }

      // 检查IndexedDB
      try {
        const indexedDBItems = await loadFromIndexedDB();
        if (indexedDBItems.length > 0) {
          return true;
        }
      } catch (error) {
        console.warn('检查IndexedDB失败:', error);
      }

      return false;
    } catch (error) {
      console.error('检查本地存储失败:', error);
      return false;
    }
  }

  // 当items变化时通知父组件
  useEffect(() => {
    onItemsChange?.(items);
  }, [items, onItemsChange])

  const handleFiles = useCallback(async (files: FileList | null) => {
    if (!files || files.length === 0) return
    setIsLoading(true)
    const newItems: KBItem[] = []
    for (const file of Array.from(files)) {
      const id = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
      const base: KBItem = {
        id,
        name: file.name,
        type: file.type,
        size: file.size,
        lastModified: file.lastModified,
        createdAt: Date.now(),
        include: true,
      }
      let dataUrl: string | undefined = undefined
      // 对 PDF 小于 2MB 的，保存 base64 以支持后续预览（避免占满 localStorage）
      const lower = file.name.toLowerCase()
      if ((file.type === 'application/pdf' || lower.endsWith('.pdf')) && file.size <= 2 * 1024 * 1024) {
          try { 
            dataUrl = await readAsDataURL(file) 
            
            // 显示加载提示
            toast.loading(`正在自动处理PDF文件"${file.name}"...`, {
              id: `pdf-ocr-${id}`,
              duration: 10000
            })
            
            // 创建临时项目，稍后更新
            const tempItem: KBItem = {
              ...base,
              text: `[PDF文件: ${file.name}]\n\n正在自动提取文本，请稍候...\n\n文件大小: ${formatBytes(file.size)}\n上传时间: ${new Date().toLocaleString()}`,
              notes: '',
              dataUrl
            }
            
            // 先添加临时项目
            newItems.push(tempItem)
            
            // 异步处理OCR，完成后更新项目
            setTimeout(async () => {
              try {
                // 创建PDF查看器需要的环境
                const pdfjs = await (async () => {
                  if (typeof window === 'undefined') return null
                  if (window.pdfjsLib) return window.pdfjsLib
                  
                  // 动态加载PDF.js
                  const loadScript = (src: string): Promise<void> => {
                    return new Promise((resolve, reject) => {
                      const script = document.createElement('script')
                      script.src = src
                      script.onload = () => resolve()
                      script.onerror = () => reject(new Error(`加载脚本失败: ${src}`))
                      document.head.appendChild(script)
                    })
                  }
                  
                  await loadScript('https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js')
                  if (!window.pdfjsLib) throw new Error('PDF.js库未正确加载')
                  window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js'
                  return window.pdfjsLib
                })()
                
                if (!pdfjs) throw new Error('无法加载PDF.js')
                
                // 加载PDF文档
                const loadingTask = pdfjs.getDocument({ url: dataUrl })
                const doc = await loadingTask.promise
                
                // 提取文本
                let extractedText = ''
                for (let i = 1; i <= Math.min(doc.numPages, 10); i++) {
                  try {
                    const page = await doc.getPage(i)
                    const content = await page.getTextContent()
                    const pageText = content.items.map((it: any) => it.str || '').join(' ')
                    extractedText += (i > 1 ? '\n\n' : '') + pageText
                  } catch (e) {
                    console.error(`提取第${i}页文本失败:`, e)
                  }
                }
                
                // 如果提取的文本太少，尝试OCR
                if (extractedText.trim().length < 100) {
                  toast.loading(`PDF文本较少，正在尝试OCR识别...`, {
                    id: `pdf-ocr-${id}`,
                    duration: 20000
                  })
                  
                  // 加载Tesseract
                  const Tesseract = await import('tesseract.js')
                  
                  // 创建canvas用于OCR
                  const c = document.createElement('canvas')
                  const ctx = c.getContext('2d')
                  if (!ctx) throw new Error('无法创建Canvas上下文')
                  
                  // 对前3页进行OCR
                  let ocrText = ''
                  for (let i = 1; i <= Math.min(doc.numPages, 3); i++) {
                    const page = await doc.getPage(i)
                    const viewport = page.getViewport({ scale: 2 })
                    c.width = viewport.width
                    c.height = viewport.height
                    await page.render({ canvasContext: ctx, viewport }).promise
                    
                    const { data } = await Tesseract.recognize(c, 'eng+chi_sim')
                    const t = String(data?.text || '').trim()
                    if (t) ocrText += (i > 1 ? '\n\n' : '') + t
                  }
                  
                  if (ocrText.trim().length > 0) {
                    extractedText = ocrText
                  }
                }
                
                // 更新项目
                if (extractedText.trim().length > 0) {
                  try {
                    await kbService.updateItem(id, { text: extractedText })
                    setItems(prev => prev.map(item => 
                      item.id === id 
                        ? { ...item, text: extractedText } 
                        : item
                    ))
                    toast.success(`PDF文件"${file.name}"文本提取成功`, {
                      id: `pdf-ocr-${id}`
                    })
                  } catch (error) {
                    console.error('更新PDF文本失败:', error)
                    toast.error(`文本提取成功但保存失败`, {
                      id: `pdf-ocr-${id}`
                    })
                  }
                } else {
                  toast.error(`无法从PDF提取文本，请手动处理`, {
                    id: `pdf-ocr-${id}`
                  })
                }
              } catch (e) {
                console.error('自动OCR处理失败:', e)
                toast.error(`自动处理PDF失败，请手动提取文本`, {
                  id: `pdf-ocr-${id}`
                })
              }
            }, 500)
            
          } catch (e) {
            console.error('PDF处理失败:', e)
            // 如果自动处理失败，添加默认文本
            const pdfDefaultText = `[PDF文件: ${file.name}]\n\n此PDF已上传到知识库，但自动提取失败。请手动提取文本。\n\n文件大小: ${formatBytes(file.size)}\n上传时间: ${new Date().toLocaleString()}`
            const { note } = await extractText(file)
            newItems.push({ ...base, text: pdfDefaultText, notes: note, dataUrl })
          }
          continue // 跳过下面的处理
        }
        const { text, note } = await extractText(file)
      newItems.push({ ...base, text, notes: note, dataUrl })
    }
    
    // 保存到数据库
    try {
      const savedItems = await kbService.saveItems(newItems);
      setItems(prev => [...savedItems, ...prev]);
      toast.success(`成功添加${savedItems.length}个文件到知识库`);
    } catch (error) {
      console.error('保存文件失败:', error);
      toast.error('保存文件失败，请重试');
    }
    
    setIsLoading(false)
  }, [kbService])

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragOver(false)
    handleFiles(e.dataTransfer.files)
  }
  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); setDragOver(true) }
  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); setDragOver(false) }

  const removeItem = async (id: string) => {
    try {
      await kbService.deleteItem(id);
      setItems(prev => prev.filter(i => i.id !== id));
      toast.success('文件已删除');
    } catch (error) {
      console.error('删除文件失败:', error);
      toast.error('删除文件失败，请重试');
    }
  }

  const tryReparse = async (item: KBItem) => {
    // 仅在缺少文本时尝试
    const filePicker = document.createElement('input')
    filePicker.type = 'file'
    filePicker.accept = ''
    filePicker.onchange = async () => {
      const f = filePicker.files?.[0]
      if (!f) return
      try {
        const { text, note } = await extractText(f)
        await kbService.updateItem(item.id, { text, notes: note })
        setItems(prev => prev.map(it => it.id === item.id ? { ...it, text, notes: note } : it))
        toast.success('文件重新解析成功')
      } catch (error) {
        console.error('重新解析失败:', error)
        toast.error('重新解析失败，请重试')
      }
    }
    filePicker.click()
  }

  return (
    <section className="bg-slate-50/90 border border-slate-200 dark:border-slate-700 rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-semibold text-primary">
          知识库（上传文件以加入上下文）
          {isMigrating && <span className="ml-2 text-sm text-orange-600">正在迁移本地数据...</span>}
        </h2>
        <div className="flex items-center gap-2">
          <button
            className="px-3 py-1.5 text-sm rounded border border-slate-200 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
            onClick={() => fileInputRef.current?.click()}
          >选择文件</button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </div>
      </div>

      <div
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        className={`border-2 border-dashed rounded-md p-6 text-center transition-all ${dragOver ? 'border-primary bg-primary/5 ring-1 ring-primary/20' : 'border-slate-300 bg-slate-100/50 dark:border-slate-700 dark:bg-slate-800/50'}`}
      >
        拖拽文件到此处，或点击"选择文件"上传
      </div>

      <div className="mt-4">
        {items.length === 0 ? (
          <p className="text-sm text-gray-500">尚未上传文件。</p>
        ) : (
          <ul className="space-y-3 max-h-72 overflow-y-auto">
            {items.map(item => (
              <li key={item.id} className="border rounded-md p-3 bg-white">
                <div className="flex items-center justify-between">
                  <div className="font-medium text-slate-800 dark:text-slate-200 truncate" title={item.name}>{item.name}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">{item.type || '未知类型'} · {formatBytes(item.size)}</div>
                </div>
                <div className="mt-2 flex items-center justify-between text-xs">
                  <label className="inline-flex items-center gap-1 text-slate-600 dark:text-slate-300">
                    <input
                      type="checkbox"
                      checked={item.include !== false}
                      onChange={async (e) => {
                        const newInclude = e.target.checked;
                        try {
                          await kbService.updateItem(item.id, { include: newInclude });
                          setItems(prev => prev.map(it => it.id === item.id ? { ...it, include: newInclude } : it));
                        } catch (error) {
                          console.error('更新文件状态失败:', error);
                          toast.error('更新文件状态失败');
                          // 恢复checkbox状态
                          e.target.checked = !newInclude;
                        }
                      }}
                    />
                    用于AI对话
                  </label>
                  {(item.dataUrl && (item.type === 'application/pdf' || item.name.toLowerCase().endsWith('.pdf'))) && (
                    <button className="underline text-primary hover:text-primary/80 transition-colors" onClick={() => setPreviewItem(item)}>预览 PDF</button>
                  )}
                </div>
                {!hideParsingText && (
                  item.text ? (
                    <div className="mt-2 text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap max-h-24 overflow-y-auto">
                      {item.text.slice(0, 1000)}{item.text.length > 1000 ? '…' : ''}
                    </div>
                  ) : (
                    <div className="mt-2 text-sm text-gray-500 flex items-center gap-2">
                      <span>{item.notes || '尚未解析内容'}</span>
                      <button className="text-primary underline text-xs hover:text-primary/80 transition-colors" onClick={() => tryReparse(item)}>尝试解析</button>
                    </div>
                  )
                )}
                <div className="mt-2 flex items-center justify-between text-xs text-gray-400">
                  <span>更新时间：{new Date(item.createdAt).toLocaleString('zh-CN')}</span>
                  <button className="underline text-slate-500 hover:text-red-500 transition-colors" onClick={() => removeItem(item.id)}>删除</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {previewItem && previewItem.dataUrl && (
        <PDFViewer
          dataUrl={previewItem.dataUrl}
          name={previewItem.name}
          onClose={() => setPreviewItem(null)}
          onExtract={(text) => {
            setItems(prev => prev.map(it => it.id === previewItem.id ? { ...it, text } : it))
            setPreviewItem(null)
          }}
        />
      )}
    </section>
  )
}

export default KnowledgeBase