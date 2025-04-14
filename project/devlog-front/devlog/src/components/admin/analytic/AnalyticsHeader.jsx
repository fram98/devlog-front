import React, { useState } from 'react';
import { Calendar, ChevronDown, RefreshCw, Download } from 'lucide-react';
import TimeRangeSelector from './TimeRangeSelector';

/**
 * 분석 페이지 헤더 컴포넌트
 * 
 * @param {string} timeRange - 현재 선택된 시간 범위
 * @param {boolean} isLoading - 로딩 상태
 * @param {function} onTimeRangeChange - 시간 범위 변경 핸들러
 * @param {function} onRefresh - 새로고침 핸들러
 * @param {function} onDownload - 다운로드 핸들러
 */
const AnalyticsHeader = ({ 
  timeRange, 
  isLoading, 
  onTimeRangeChange, 
  onRefresh, 
  onDownload 
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);
  
  // 필터 토글 핸들러
  const toggleFilters = () => {
    setShowFilters(!showFilters);
    setShowDownloadOptions(false);
  };
  
  // 다운로드 옵션 토글 핸들러
  const toggleDownloadOptions = () => {
    setShowDownloadOptions(!showDownloadOptions);
    setShowFilters(false);
  };
  
  // 시간 범위에 따른 라벨 반환
  const getTimeRangeLabel = () => {
    switch (timeRange) {
      case 'today':
        return '오늘';
      case 'yesterday':
        return '어제';
      case 'last7days':
        return '최근 7일';
      case 'last30days':
        return '최근 30일 (2025-03-14 ~ 2025-04-13)';
      case 'thisMonth':
        return '2025년 4월';
      case 'lastMonth':
        return '2025년 3월';
      default:
        return '최근 30일';
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            방문자 분석
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
            블로그 방문자 및 사용 통계 정보를 확인합니다.
          </p>
        </div>
        
        <div className="flex gap-2">
          {/* 필터 버튼 */}
          <div className="relative">
            <button
              className="flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              onClick={toggleFilters}
            >
              <span className="mr-1">필터</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            
            {/* 필터 드롭다운 */}
            {showFilters && (
              <TimeRangeSelector 
                selectedRange={timeRange}
                onRangeChange={onTimeRangeChange}
              />
            )}
          </div>
          
          {/* 새로고침 버튼 */}
          <button
            onClick={onRefresh}
            className="flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            disabled={isLoading}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            새로고침
          </button>
          
          {/* 내보내기 버튼 */}
          <div className="relative">
            <button
              className="flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              onClick={toggleDownloadOptions}
            >
              <Download className="w-4 h-4 mr-2" />
              내보내기
            </button>
            
            {/* 내보내기 옵션 드롭다운 */}
            {showDownloadOptions && (
              <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10">
                <div className="p-2">
                  <button
                    onClick={() => onDownload('csv')}
                    className="block w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                  >
                    CSV 형식
                  </button>
                  <button
                    onClick={() => onDownload('excel')}
                    className="block w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                  >
                    Excel 형식
                  </button>
                  <button
                    onClick={() => onDownload('pdf')}
                    className="block w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                  >
                    PDF 형식
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* 시간 범위 표시 */}
      <div className="flex items-center mb-6">
        <Calendar className="w-5 h-5 text-gray-600 dark:text-gray-400 mr-2" />
        <span className="text-gray-700 dark:text-gray-300 text-sm">
          {getTimeRangeLabel()}
        </span>
      </div>
    </div>
  );
};

export default AnalyticsHeader;