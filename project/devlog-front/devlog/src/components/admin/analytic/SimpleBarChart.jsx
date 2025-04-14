import React from 'react';

/**
 * 간단한 바 차트 컴포넌트
 * 
 * @param {Array} data - 차트 데이터 배열
 * @param {string} valueKey - 값을 가져올 키
 * @param {string} labelKey - 레이블을 가져올 키
 * @param {number} maxBars - 최대 표시할 바 수 (기본값: 5)
 * @param {number|null} maxValue - 최대값 (null이면 자동 계산)
 * @param {string} barColor - 바 색상 (기본값: 'bg-blue-500 dark:bg-blue-400')
 * @param {boolean} showPercentage - 퍼센트 표시 여부 (기본값: true)
 * @param {string} suffix - 값 접미사 (기본값: '%')
 */
const SimpleBarChart = ({ 
  data, 
  valueKey, 
  labelKey, 
  maxBars = 5, 
  maxValue = null,
  barColor = 'bg-blue-500 dark:bg-blue-400',
  showPercentage = true,
  suffix = '%'
}) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-40 text-gray-400 dark:text-gray-500">
        데이터가 없습니다.
      </div>
    );
  }
  
  // 최대값 계산
  const calculatedMaxValue = maxValue || Math.max(...data.map(item => item[valueKey]));
  
  // 필요한 경우 데이터 제한
  const displayData = data.slice(0, maxBars);
  
  return (
    <div className="space-y-2">
      {displayData.map((item, index) => (
        <div key={index} className="space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-300">{item[labelKey]}</span>
            <span className="font-medium text-gray-800 dark:text-gray-200">
              {item[valueKey]}{showPercentage && suffix}
            </span>
          </div>
          <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className={`h-full ${barColor} rounded-full`}
              style={{ width: `${(item[valueKey] / calculatedMaxValue) * 100}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SimpleBarChart;