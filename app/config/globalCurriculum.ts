// 全局考纲配置文件
// 包含各地区最新考纲数据和配置信息
// 更新时间：2024年1月

export interface GlobalCurriculumConfig {
  version: string;
  lastUpdated: string;
  regions: RegionConfig[];
  subjects: SubjectConfig[];
  gradeMapping: GradeMapping;
}

export interface RegionConfig {
  id: string;
  name: string;
  fullName: string;
  examSystem: string; // 考试制度：中考、高考等
  curriculumStandard: string; // 课程标准版本
  lastReformYear: number; // 最近一次改革年份
  specialFeatures: string[]; // 地区特色
  officialWebsite?: string; // 官方网站
  contactInfo?: string; // 联系方式
}

export interface SubjectConfig {
  id: string;
  name: string;
  englishName: string;
  category: 'core' | 'elective' | 'practical'; // 科目类别
  examWeight: number; // 考试权重（满分）
  examDuration: number; // 考试时长（分钟）
  questionTypes: string[]; // 题型
}

export interface GradeMapping {
  [key: string]: {
    stage: string; // 学段：小学、初中、高中
    level: number; // 年级级别
    ageRange: string; // 年龄范围
    keyExams: string[]; // 关键考试
  };
}

// 全局考纲配置
export const GLOBAL_CURRICULUM_CONFIG: GlobalCurriculumConfig = {
  version: "2024.1.0",
  lastUpdated: "2024-01-15",
  
  regions: [
    {
      id: "national",
      name: "全国",
      fullName: "全国统一课程标准",
      examSystem: "中考/高考",
      curriculumStandard: "义务教育课程标准(2022年版)",
      lastReformYear: 2022,
      specialFeatures: ["统一标准", "基础教育", "全面发展"],
      officialWebsite: "http://www.moe.gov.cn/"
    },
    {
      id: "guangdong",
      name: "广东",
      fullName: "广东省",
      examSystem: "广东中考",
      curriculumStandard: "广东省义务教育课程标准",
      lastReformYear: 2023,
      specialFeatures: ["注重实践", "创新能力", "粤港澳特色"],
      officialWebsite: "http://edu.gd.gov.cn/"
    },
    {
      id: "beijing",
      name: "北京",
      fullName: "北京市",
      examSystem: "北京中考",
      curriculumStandard: "北京市义务教育课程标准",
      lastReformYear: 2023,
      specialFeatures: ["综合素质", "创新思维", "国际视野"],
      officialWebsite: "http://jw.beijing.gov.cn/"
    },
    {
      id: "shanghai",
      name: "上海",
      fullName: "上海市",
      examSystem: "上海中考",
      curriculumStandard: "上海市中小学课程标准",
      lastReformYear: 2022,
      specialFeatures: ["探究学习", "跨学科整合", "国际化"],
      officialWebsite: "http://edu.sh.gov.cn/"
    },
    {
      id: "jiangsu",
      name: "江苏",
      fullName: "江苏省",
      examSystem: "江苏中考",
      curriculumStandard: "江苏省义务教育课程标准",
      lastReformYear: 2023,
      specialFeatures: ["基础扎实", "能力培养", "素质教育"],
      officialWebsite: "http://jyt.jiangsu.gov.cn/"
    },
    {
      id: "zhejiang",
      name: "浙江",
      fullName: "浙江省",
      examSystem: "浙江中考",
      curriculumStandard: "浙江省义务教育课程标准",
      lastReformYear: 2023,
      specialFeatures: ["多元评价", "个性发展", "创新实践"],
      officialWebsite: "http://jyt.zj.gov.cn/"
    },
    {
      id: "shandong",
      name: "山东",
      fullName: "山东省",
      examSystem: "山东中考",
      curriculumStandard: "山东省义务教育课程标准",
      lastReformYear: 2023,
      specialFeatures: ["传统文化", "实践能力", "德育为先"],
      officialWebsite: "http://edu.shandong.gov.cn/"
    },
    {
      id: "sichuan",
      name: "四川",
      fullName: "四川省",
      examSystem: "四川中考",
      curriculumStandard: "四川省义务教育课程标准",
      lastReformYear: 2023,
      specialFeatures: ["地方特色", "民族文化", "生态教育"],
      officialWebsite: "http://edu.sc.gov.cn/"
    }
  ],

  subjects: [
    {
      id: "math",
      name: "数学",
      englishName: "Mathematics",
      category: "core",
      examWeight: 120,
      examDuration: 120,
      questionTypes: ["选择题", "填空题", "解答题"]
    },
    {
      id: "chinese",
      name: "语文",
      englishName: "Chinese",
      category: "core",
      examWeight: 120,
      examDuration: 150,
      questionTypes: ["选择题", "填空题", "阅读理解", "作文"]
    },
    {
      id: "english",
      name: "英语",
      englishName: "English",
      category: "core",
      examWeight: 120,
      examDuration: 120,
      questionTypes: ["听力", "选择题", "完形填空", "阅读理解", "写作"]
    },
    {
      id: "physics",
      name: "物理",
      englishName: "Physics",
      category: "core",
      examWeight: 100,
      examDuration: 90,
      questionTypes: ["选择题", "填空题", "实验题", "计算题"]
    },
    {
      id: "chemistry",
      name: "化学",
      englishName: "Chemistry",
      category: "core",
      examWeight: 100,
      examDuration: 90,
      questionTypes: ["选择题", "填空题", "实验题", "计算题"]
    },
    {
      id: "biology",
      name: "生物",
      englishName: "Biology",
      category: "core",
      examWeight: 100,
      examDuration: 90,
      questionTypes: ["选择题", "填空题", "实验题", "分析题"]
    },
    {
      id: "history",
      name: "历史",
      englishName: "History",
      category: "core",
      examWeight: 100,
      examDuration: 90,
      questionTypes: ["选择题", "材料分析题", "论述题"]
    },
    {
      id: "geography",
      name: "地理",
      englishName: "Geography",
      category: "core",
      examWeight: 100,
      examDuration: 90,
      questionTypes: ["选择题", "填空题", "读图分析题"]
    },
    {
      id: "politics",
      name: "道德与法治",
      englishName: "Morality and Law",
      category: "core",
      examWeight: 100,
      examDuration: 90,
      questionTypes: ["选择题", "材料分析题", "论述题"]
    }
  ],

  gradeMapping: {
    "一年级": {
      stage: "小学",
      level: 1,
      ageRange: "6-7岁",
      keyExams: []
    },
    "二年级": {
      stage: "小学",
      level: 2,
      ageRange: "7-8岁",
      keyExams: []
    },
    "三年级": {
      stage: "小学",
      level: 3,
      ageRange: "8-9岁",
      keyExams: []
    },
    "四年级": {
      stage: "小学",
      level: 4,
      ageRange: "9-10岁",
      keyExams: []
    },
    "五年级": {
      stage: "小学",
      level: 5,
      ageRange: "10-11岁",
      keyExams: []
    },
    "六年级": {
      stage: "小学",
      level: 6,
      ageRange: "11-12岁",
      keyExams: ["小升初"]
    },
    "七年级": {
      stage: "初中",
      level: 7,
      ageRange: "12-13岁",
      keyExams: []
    },
    "八年级": {
      stage: "初中",
      level: 8,
      ageRange: "13-14岁",
      keyExams: ["生物地理会考"]
    },
    "九年级": {
      stage: "初中",
      level: 9,
      ageRange: "14-15岁",
      keyExams: ["中考"]
    },
    "高一": {
      stage: "高中",
      level: 10,
      ageRange: "15-16岁",
      keyExams: []
    },
    "高二": {
      stage: "高中",
      level: 11,
      ageRange: "16-17岁",
      keyExams: ["学业水平考试"]
    },
    "高三": {
      stage: "高中",
      level: 12,
      ageRange: "17-18岁",
      keyExams: ["高考"]
    }
  }
};

// 工具函数
export function getRegionConfig(regionId: string): RegionConfig | null {
  return GLOBAL_CURRICULUM_CONFIG.regions.find(r => r.id === regionId) || null;
}

export function getSubjectConfig(subjectId: string): SubjectConfig | null {
  return GLOBAL_CURRICULUM_CONFIG.subjects.find(s => s.id === subjectId) || null;
}

export function getGradeInfo(grade: string) {
  return GLOBAL_CURRICULUM_CONFIG.gradeMapping[grade] || null;
}

export function getAllRegions(): RegionConfig[] {
  return GLOBAL_CURRICULUM_CONFIG.regions;
}

export function getAllSubjects(): SubjectConfig[] {
  return GLOBAL_CURRICULUM_CONFIG.subjects;
}

export function getCoreSubjects(): SubjectConfig[] {
  return GLOBAL_CURRICULUM_CONFIG.subjects.filter(s => s.category === 'core');
}

export function getRegionsByExamSystem(examSystem: string): RegionConfig[] {
  return GLOBAL_CURRICULUM_CONFIG.regions.filter(r => r.examSystem.includes(examSystem));
}

// 考纲更新状态检查
export function checkCurriculumUpdateStatus() {
  const lastUpdate = new Date(GLOBAL_CURRICULUM_CONFIG.lastUpdated);
  const now = new Date();
  const daysSinceUpdate = Math.floor((now.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60 * 24));
  
  return {
    version: GLOBAL_CURRICULUM_CONFIG.version,
    lastUpdated: GLOBAL_CURRICULUM_CONFIG.lastUpdated,
    daysSinceUpdate,
    needsUpdate: daysSinceUpdate > 90, // 90天未更新则提示需要更新
    status: daysSinceUpdate > 90 ? 'outdated' : daysSinceUpdate > 30 ? 'warning' : 'current'
  };
}

// 地区特色功能获取
export function getRegionSpecialFeatures(regionId: string): string[] {
  const region = getRegionConfig(regionId);
  return region?.specialFeatures || [];
}

// 考试信息获取
export function getExamInfo(regionId: string, grade: string) {
  const region = getRegionConfig(regionId);
  const gradeInfo = getGradeInfo(grade);
  
  if (!region || !gradeInfo) return null;
  
  return {
    region: region.name,
    examSystem: region.examSystem,
    stage: gradeInfo.stage,
    keyExams: gradeInfo.keyExams,
    curriculumStandard: region.curriculumStandard,
    lastReform: region.lastReformYear
  };
}