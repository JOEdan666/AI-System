'use client';

import React from 'react';

interface TableData {
  headers: string[];
  rows: string[][];
}

interface TableRendererProps {
  content: string;
}

// 解析Markdown表格的函数
const parseMarkdownTable = (content: string): TableData | null => {
  // 改进的Markdown表格匹配正则表达式
  const tableRegex = /^\s*\|(.+)\|\s*\n\s*\|[-\s|:]+\|\s*\n((?:\s*\|.+\|\s*\n?)*)/gm;
  const match = tableRegex.exec(content);
  
  if (!match) return null;
  
  const [, headerLine, rowsSection] = match;
  
  // 解析表头
  const headers = headerLine
    .split('|')
    .map(cell => cell.trim())
    .filter(cell => cell.length > 0);
  
  // 解析行数据
  const rows = rowsSection
    .trim()
    .split('\n')
    .map(row => {
      if (!row.trim()) return [];
      return row.split('|')
        .map(cell => cell.trim())
        .filter(cell => cell.length > 0);
    })
    .filter(row => row.length > 0);
  
  // 验证表格数据的有效性
  if (headers.length === 0 || rows.length === 0) return null;
  
  return { headers, rows };
};

// 表格组件
const Table: React.FC<{ data: TableData }> = ({ data }) => {
  return (
    <div className="overflow-x-auto my-4 rounded-lg shadow-md border border-gray-200">
      <table className="w-full border-collapse bg-white">
        <thead className="bg-blue-100">
          <tr>
            {data.headers.map((header, index) => (
              <th
                key={index}
                className="px-4 py-3 text-center text-sm font-bold text-gray-800 border border-gray-300"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`${
                rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'
              } hover:bg-blue-50 transition-colors duration-200`}
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="px-4 py-3 text-center text-sm text-gray-700 border border-gray-300 whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{
                    __html: cell.replace(/\n/g, '<br>').replace(/<br>/g, '<br>')
                  }}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// 主要的表格渲染器组件
const TableRenderer: React.FC<TableRendererProps> = ({ content }) => {
  // 检查内容是否包含表格
  const tableData = parseMarkdownTable(content);
  
  if (!tableData) {
    // 如果没有表格，返回原始内容（不使用dangerouslySetInnerHTML）
    return (
      <div className="whitespace-pre-wrap">
        {content}
      </div>
    );
  }
  
  // 改进的表格前后内容分离逻辑
  const tableRegex = /^\s*\|(.+)\|\s*\n\s*\|[-\s|:]+\|\s*\n((?:\s*\|.+\|\s*\n?)*)/gm;
  const match = tableRegex.exec(content);
  
  if (!match) {
    return (
      <div className="whitespace-pre-wrap">
        {content}
      </div>
    );
  }
  
  const tableStart = match.index;
  const tableEnd = tableStart + match[0].length;
  
  const beforeTable = content.substring(0, tableStart).trim();
  const afterTable = content.substring(tableEnd).trim();
  
  return (
    <div>
      {/* 表格前的内容 */}
      {beforeTable && (
        <div className="whitespace-pre-wrap mb-4">
          {beforeTable}
        </div>
      )}
      
      {/* 渲染表格 */}
      <Table data={tableData} />
      
      {/* 表格后的内容 */}
      {afterTable && (
        <div className="whitespace-pre-wrap mt-4">
          {afterTable}
        </div>
      )}
    </div>
  );
};

export default TableRenderer;
export { parseMarkdownTable, Table };
export type { TableData };