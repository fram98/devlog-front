import React from 'react';
import { LineChart } from 'lucide-react';
import SimpleLineChart from './SimpleLineChart';

/**
 * 일간 방문자 차트 컴포넌트
 * 
 * @param {Array} data - 차트 데이터 배열
 */
const VisitorsChart = ({ data }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center mb-4">
        <LineChart className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">일간 방문자 추이</h3>
      </div>
      
      <SimpleLineChart
        data={data} 
        valueKey="value" 
        labelKey="date" 
        lineColor="#3B82F6"
        pointColor="#3B82F6"
      />
      
      <div className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-center">
        4월 일별 방문자 수
      </div>
    </div>
  );
};

export default VisitorsChart;