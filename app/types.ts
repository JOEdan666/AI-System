// 应用类型定义

/**
 * 学习项目数据类型
 */
export interface LearningItem {
  id: string;
  text: string;
  subject: string;
  createdAt: string;
}

/**
 * 科目列表
 */
export const SUBJECTS = [
  '语文', '数学', '英语', '物理', 
  '政治', '历史', '生物', '地理', '化学','其他'
];