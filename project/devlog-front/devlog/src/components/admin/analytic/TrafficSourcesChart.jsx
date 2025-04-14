import React from 'react';
import { PieChart } from 'lucide-react';
import SimpleBarChart from './SimpleBarChart';

/**
 * 트래픽 소스 차트 컴포넌트
 * 
 * @param {Array} data - 차트 데이터 배열
 */
const TrafficSourcesChart = ({ data }) => {
  // 값이 높은 순서로 정렬
  const sortedData = [...data].sort((a, b) => b.value - a.value);
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center mb-4">
        <PieChart className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">트래픽 소스</h3>
      </div>
      
      <SimpleBarChart 
        data={sortedData} 
        valueKey="value" 
        labelKey="source" 
        barColor="bg-blue-500 dark:bg-blue-400"
      />
      
      <div className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-center">
        방문자 유입 경로 (%)
      </div>
    </div>
  );
};

export default TrafficSourcesChart;