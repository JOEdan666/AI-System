'use client';

import React, { useState, useEffect } from 'react';

interface RegionalCurriculumSelectorProps {
  onCurriculumSelect: (region: string, curriculum: string) => void;
  selectedRegion?: string;
  selectedCurriculum?: string;
  onRegionChange?: (region: string) => void;
  onCurriculumChange?: (curriculum: string) => void;
  subject?: string;
  grade?: string;
}

interface CurriculumData {
  region: string;
  curriculums: {
    name: string;
    description: string;
    subjects: string[];
    lastUpdated: string;
  }[];
}

const CURRICULUM_DATA: CurriculumData[] = [
  {
    region: '全国',
    curriculums: [
      {
        name: '新课标（2022版）',
        description: '教育部最新发布的义务教育课程标准',
        subjects: ['语文', '数学', '英语', '物理', '化学', '生物', '历史', '地理', '政治'],
        lastUpdated: '2022-04'
      },
      {
        name: '高中新课标（2017版）',
        description: '普通高中课程标准',
        subjects: ['语文', '数学', '英语', '物理', '化学', '生物', '历史', '地理', '政治'],
        lastUpdated: '2020-06'
      }
    ]
  },
  {
    region: '北京',
    curriculums: [
      {
        name: '北京中考考纲（2024）',
        description: '北京市中考最新考试说明',
        subjects: ['语文', '数学', '英语', '物理', '化学', '生物', '历史', '地理', '政治'],
        lastUpdated: '2024-01'
      },
      {
        name: '北京高考考纲（2024）',
        description: '北京市高考考试说明',
        subjects: ['语文', '数学', '英语', '物理', '化学', '生物', '历史', '地理', '政治'],
        lastUpdated: '2024-02'
      }
    ]
  },
  {
    region: '上海',
    curriculums: [
      {
        name: '上海中考考纲（2024）',
        description: '上海市中考考试手册',
        subjects: ['语文', '数学', '英语', '物理', '化学', '生物', '历史', '地理', '政治'],
        lastUpdated: '2024-01'
      },
      {
        name: '上海高考考纲（2024）',
        description: '上海市高考考试手册',
        subjects: ['语文', '数学', '英语', '物理', '化学', '生物', '历史', '地理', '政治'],
        lastUpdated: '2024-02'
      }
    ]
  },
  {
    region: '广东',
    curriculums: [
      {
        name: '广东中考考纲（2024）',
        description: '广东省中考考试说明',
        subjects: ['语文', '数学', '英语', '物理', '化学', '生物', '历史', '地理', '政治'],
        lastUpdated: '2024-01'
      },
      {
        name: '广东高考考纲（2024）',
        description: '广东省高考考试说明',
        subjects: ['语文', '数学', '英语', '物理', '化学', '生物', '历史', '地理', '政治'],
        lastUpdated: '2024-02'
      }
    ]
  },
  {
    region: '江苏',
    curriculums: [
      {
        name: '江苏中考考纲（2024）',
        description: '江苏省中考考试说明',
        subjects: ['语文', '数学', '英语', '物理', '化学', '生物', '历史', '地理', '政治'],
        lastUpdated: '2024-01'
      },
      {
        name: '江苏高考考纲（2024）',
        description: '江苏省高考考试说明',
        subjects: ['语文', '数学', '英语', '物理', '化学', '生物', '历史', '地理', '政治'],
        lastUpdated: '2024-02'
      }
    ]
  },
  {
    region: '浙江',
    curriculums: [
      {
        name: '浙江中考考纲（2024）',
        description: '浙江省中考考试说明',
        subjects: ['语文', '数学', '英语', '物理', '化学', '生物', '历史', '地理', '政治'],
        lastUpdated: '2024-01'
      },
      {
        name: '浙江高考考纲（2024）',
        description: '浙江省高考考试说明',
        subjects: ['语文', '数学', '英语', '物理', '化学', '生物', '历史', '地理', '政治'],
        lastUpdated: '2024-02'
      }
    ]
  }
];

export default function RegionalCurriculumSelector({
  onCurriculumSelect,
  selectedRegion = '',
  selectedCurriculum = '',
  onRegionChange,
  onCurriculumChange,
  subject = '',
  grade = ''
}: RegionalCurriculumSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentRegion, setCurrentRegion] = useState(selectedRegion);
  const [currentCurriculum, setCurrentCurriculum] = useState(selectedCurriculum);

  const handleRegionSelect = (region: string) => {
    setCurrentRegion(region);
    setCurrentCurriculum(''); // 重置课程选择
    onRegionChange?.(region);
  };

  const handleCurriculumSelect = (curriculumName: string) => {
    setCurrentCurriculum(curriculumName);
    onCurriculumSelect(currentRegion, curriculumName);
    onCurriculumChange?.(curriculumName);
    setIsOpen(false);
  };

  const getCurrentCurriculumData = () => {
    const regionData = CURRICULUM_DATA.find(data => data.region === currentRegion);
    return regionData?.curriculums.find(curriculum => curriculum.name === currentCurriculum);
  };

  const currentData = getCurrentCurriculumData();

  return (
    <div className="relative">
      {/* 选择器按钮 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-3 bg-white border-2 border-blue-200 rounded-xl hover:border-blue-300 focus:border-blue-400 focus:outline-none transition-all duration-200 shadow-sm"
      >
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="text-left">
            <div className="font-semibold text-gray-800">
              {currentRegion && currentCurriculum ? `${currentRegion} - ${currentCurriculum}` : '选择考纲'}
            </div>
            {currentData && (
              <div className="text-sm text-gray-500">
                {currentData.description} (更新于 {currentData.lastUpdated})
              </div>
            )}
          </div>
        </div>
        <svg 
          className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* 下拉菜单 */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 max-h-96 overflow-y-auto">
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">选择地区和考纲</h3>
            
            {/* 地区选择 */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-600 mb-2">地区</h4>
              <div className="grid grid-cols-3 gap-2">
                {CURRICULUM_DATA.map((data) => (
                  <button
                    key={data.region}
                    onClick={() => handleRegionSelect(data.region)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      currentRegion === data.region
                        ? 'bg-blue-500 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {data.region}
                  </button>
                ))}
              </div>
            </div>

            {/* 考纲选择 */}
            {currentRegion && (
              <div>
                <h4 className="text-sm font-medium text-gray-600 mb-2">考纲版本</h4>
                <div className="space-y-2">
                  {CURRICULUM_DATA.find(data => data.region === currentRegion)?.curriculums.map((curriculum) => (
                    <button
                      key={curriculum.name}
                      onClick={() => handleCurriculumSelect(curriculum.name)}
                      className={`w-full text-left p-3 rounded-lg border transition-all duration-200 ${
                        currentCurriculum === curriculum.name
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="font-medium text-gray-800">{curriculum.name}</div>
                      <div className="text-sm text-gray-500 mt-1">{curriculum.description}</div>
                      <div className="text-xs text-gray-400 mt-1">
                        更新时间: {curriculum.lastUpdated} | 
                        涵盖科目: {curriculum.subjects.slice(0, 3).join('、')}
                        {curriculum.subjects.length > 3 && '等'}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 说明文字 */}
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <div className="flex items-start space-x-2">
                <svg className="w-5 h-5 text-blue-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="text-sm text-blue-700">
                  <div className="font-medium mb-1">选择考纲的作用：</div>
                  <ul className="space-y-1 text-xs">
                    <li>• AI将根据所选考纲调整讲解重点</li>
                    <li>• 突出该地区的考试要求和题型特点</li>
                    <li>• 提供针对性的解题方法和策略</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}