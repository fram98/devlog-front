import React from 'react';
import { Smartphone, Monitor, Tablet } from 'lucide-react';

/**
 * 기기 분포 차트 컴포넌트
 * 
 * @param {Array} data - 차트 데이터 배열
 */
const DeviceDistributionChart = ({ data }) => {
  // 값이 높은 순서로 정렬
  const sortedData = [...data].sort((a, b) => b.value - a.value);
  
  // 기기 아이콘 렌더링
  const renderDeviceIcon = (deviceType) => {
    const iconClass = "w-5 h-5 text-gray-600 dark:text-gray-400 mr-2";
    
    switch (deviceType.toLowerCase()) {
      case 'desktop':
        return <Monitor className={iconClass} />;
      case 'mobile':
        return <Smartphone className={iconClass} />;
      case 'tablet':
        return <Tablet className={iconClass} />;
      default:
        return null;
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">기기 분포</h3>
      </div>
      
      <div className="space-y-4">
        {sortedData.map((item, index) => (
          <div key={index} className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                {renderDeviceIcon(item.device)}
                <span className="text-gray-600 dark:text-gray-300">{item.device}</span>
              </div>
              <span className="font-medium text-gray-800 dark:text-gray-200">{item.value}%</span>
            </div>
            <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-green-500 dark:bg-green-400 rounded-full`}
                style={{ width: `${item.value}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 text-center">
        방문자 기기 유형 (%)
      </div>
    </div>
  );
};

export default DeviceDistributionChart;