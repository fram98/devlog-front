import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

/**
 * 통계 카드 컴포넌트
 * 
 * @param {string} title - 카드 제목
 * @param {number|string} value - 표시할 값
 * @param {number} change - 변화율(%)
 * @param {boolean} isIncreasing - 증가 여부
 * @param {boolean} isGoodWhenIncreasing - 증가가 긍정적인지 여부 (기본값: true)
 * @param {React.ReactNode} icon - 표시할 아이콘
 * @param {string} compareText - 비교 텍스트 (기본값: '전월 대비')
 * @param {function} formatter - 값 포맷팅 함수
 */
const StatisticCard = ({ 
  title, 
  value, 
  change, 
  isIncreasing, 
  isGoodWhenIncreasing = true,
  icon, 
  compareText = '전월 대비',
  formatter = (val) => val
}) => {
  // 증가/감소가 긍정적인지 여부 계산
  const isPositiveChange = isGoodWhenIncreasing ? isIncreasing : !isIncreasing;
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            {formatter(value)}
          </p>
        </div>
        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full">
          {icon}
        </div>
      </div>
      <div className="flex items-center mt-4">
        {isIncreasing ? (
          <ArrowUp className={`w-4 h-4 ${isPositiveChange ? 'text-green-500' : 'text-red-500'} mr-1`} />
        ) : (
          <ArrowDown className={`w-4 h-4 ${isPositiveChange ? 'text-green-500' : 'text-red-500'} mr-1`} />
        )}
        <span className={`text-sm ${isPositiveChange ? 'text-green-500' : 'text-red-500'}`}>
          {change}% 
          {isIncreasing ? '증가' : '감소'}
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
          ({compareText})
        </span>
      </div>
    </div>
  );
};

export default StatisticCard;