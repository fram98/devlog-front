import React from 'react';
import { Globe } from 'lucide-react';
import SimpleBarChart from './SimpleBarChart';

/**
 * 지역 분포 차트 컴포넌트
 * 
 * @param {Array} data - 차트 데이터 배열
 */
const RegionDistributionChart = ({ data }) => {
  // 값이 높은 순서로 정렬
  const sortedData = [...data].sort((a, b) => b.value - a.value);
  
  // 국가별 색상 설정
  const getRegionColor = (region) => {
    switch (region) {
      case '대한민국':
        return 'bg-purple-500 dark:bg-purple-400';
      case '미국':
        return 'bg-blue-500 dark:bg-blue-400';
      case '일본':
        return 'bg-red-500 dark:bg-red-400';
      case '중국':
        return 'bg-yellow-500 dark:bg-yellow-400';
      default:
        return 'bg-gray-500 dark:bg-gray-400';
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center mb-4">
        <Globe className="w-5 h-5 text-purple-600 dark:text-purple-400 mr-2" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">지역 분포</h3>
      </div>
      
      <div className="space-y-4">
        {sortedData.map((item, index) => (
          <div key={index} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-300">{item.region}</span>
              <span className="font-medium text-gray-800 dark:text-gray-200">{item.value}%</span>
            </div>
            <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className={`h-full ${getRegionColor(item.region)} rounded-full`}
                style={{ width: `${item.value}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 text-center">
        방문자 국가/지역 (%)
      </div>
    </div>
  );
};

export default RegionDistributionChart;