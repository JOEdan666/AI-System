// 为mammoth模块添加类型声明
declare module 'mammoth/mammoth.browser' {
  interface ConvertToHtmlOptions {
    arrayBuffer: ArrayBuffer;
    // 可以根据需要添加更多选项
  }
  
  interface ConvertResult {
    value: string;
    messages: Array<{
      type: string;
      message: string;
    }>;
  }
  
  export function convertToHtml(options: ConvertToHtmlOptions): Promise<ConvertResult>;
  
  // 导出默认对象
  const mammoth: {
    convertToHtml: typeof convertToHtml;
  };
  
  export default mammoth;
}