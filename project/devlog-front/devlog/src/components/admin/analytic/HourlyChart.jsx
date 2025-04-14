import React from 'react';
import { BarChart } from 'lucide-react';
import SimpleBarChart from './SimpleBarChart';

/**
 * 시간대별 방문 차트 컴포넌트
 * 
 * @param {Array} data - 차트 데이터 배열
 */
const HourlyChart = ({ data }) => {
  // 값이 높은 순서로 정렬
  const sortedData = [...data].sort((a, b) => b.value - a.value);
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center mb-4">
        <BarChart className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mr-2" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">시간대별 방문 분포</h3>
      </div>
      
      <SimpleBarChart 
        data={sortedData} 
        valueKey="value" 
        labelKey="hour" 
        maxBars={6}
        maxValue={20}
        barColor="bg-indigo-500 dark:bg-indigo-400"
      />
      
      <div className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-center">
        시간대별 방문 비율 (%)
      </div>
    </div>
  );
};

export default HourlyChart;