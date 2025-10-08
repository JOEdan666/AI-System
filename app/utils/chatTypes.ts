// 强类型定义
export type Role = 'system' | 'user' | 'assistant';
export interface ChatMessage {
  role: Role;
  content: string;
  image?: string; // 可选的base64图片数据
  timestamp?: string; // 可选的时间戳
}

// 把宽松的 { role: string; content: string }[] 转成严格的 ChatMessage[]
export function castToChat(
  msgs: { role: string; content: string }[]
): ChatMessage[] {
  const allowed: Role[] = ['system', 'user', 'assistant'];
  return msgs.map((m) => ({
    role: (allowed as readonly string[]).includes(m.role) ? (m.role as Role) : 'user',
    content: m.content ?? '',
  }));
}
