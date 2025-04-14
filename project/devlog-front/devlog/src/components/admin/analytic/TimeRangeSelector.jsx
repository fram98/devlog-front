import React from 'react';

/**
 * 시간 범위 선택 컴포넌트
 * 
 * @param {string} selectedRange - 현재 선택된 시간 범위
 * @param {function} onRangeChange - 시간 범위 변경 핸들러
 */
const TimeRangeSelector = ({ selectedRange, onRangeChange }) => {
  const timeRanges = [
    { id: 'today', label: '오늘' },
    { id: 'yesterday', label: '어제' },
    { id: 'last7days', label: '최근 7일' },
    { id: 'last30days', label: '최근 30일' },
    { id: 'thisMonth', label: '이번 달' },
    { id: 'lastMonth', label: '지난 달' }
  ];
  
  return (
    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10">
      <div className="p-3">
        <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">
          기간 선택
        </div>
        
        <div className="space-y-1">
          {timeRanges.map(range => (
            <label key={range.id} className="flex items-center">
              <input
                type="radio"
                checked={selectedRange === range.id}
                onChange={() => onRangeChange(range.id)}
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                {range.label}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimeRangeSelector;