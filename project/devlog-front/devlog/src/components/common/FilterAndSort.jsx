// src/components/common/FilterAndSort.jsx
import React, { useState } from 'react';
import { Filter, ChevronDown, SlidersHorizontal, Grid3X3, List } from 'lucide-react';

/**
 * 필터 및 정렬 옵션 컴포넌트
 * 
 * @param {Object} props
 * @param {string} props.sortBy - 현재 정렬 기준
 * @param {function} props.setSortBy - 정렬 기준 변경 함수
 * @param {string} props.viewMode - 현재 보기 모드 (grid/list)
 * @param {function} props.setViewMode - 보기 모드 변경 함수
 * @param {Array} props.sortOptions - 정렬 옵션 배열 [{value, label}]
 * @param {boolean} props.showViewToggle - 보기 모드 토글 표시 여부
 */
const FilterAndSort = ({ 
  sortBy, 
  setSortBy, 
  viewMode, 
  setViewMode, 
  sortOptions = [
    { value: 'latest', label: '최신순' },
    { value: 'oldest', label: '오래된순' },
    { value: 'popular', label: '인기순' }
  ],
  showViewToggle = true
}) => {
  const [showFilters, setShowFilters] = useState(false);
  
  return (
    <>
      {/* 모바일 필터 버튼 */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="md:hidden flex items-center justify-between px-4 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm text-gray-700 dark:text-gray-300"
      >
        <div className="flex items-center">
          <Filter className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" />
          <span>필터 및 정렬</span>
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
      </button>
      
      {/* 데스크톱 컨트롤 */}
      <div className="hidden md:flex items-center gap-3">
        {/* 정렬 드롭다운 */}
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="appearance-none pl-10 pr-10 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 cursor-pointer text-sm"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          <SlidersHorizontal className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400" />
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400 pointer-events-none" />
        </div>
        
        {/* 뷰 모드 토글 */}
        {showViewToggle && (
          <div className="flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${
                viewMode === 'grid'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
              title="그리드 보기"
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 border-l border-gray-200 dark:border-gray-700 ${
                viewMode === 'list'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
              title="리스트 보기"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
      
      {/* 모바일 필터 패널 */}
      {showFilters && (
        <div className="md:hidden mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-md">
          {/* 정렬 옵션 */}
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-2 text-gray-900 dark:text-white">정렬</h3>
            <div className="flex flex-wrap gap-2">
              {sortOptions.map(option => (
                <button
                  key={option.value}
                  onClick={() => setSortBy(option.value)}
                  className={`px-3 py-1.5 text-xs rounded-full ${
                    sortBy === option.value
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-medium'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
          
          {/* 뷰 모드 */}
          {showViewToggle && (
            <div>
              <h3 className="text-sm font-medium mb-2 text-gray-900 dark:text-white">보기 방식</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`flex items-center px-3 py-1.5 text-xs rounded-full ${
                    viewMode === 'grid'
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-medium'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <Grid3X3 className="w-3 h-3 mr-1" />
                  그리드
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`flex items-center px-3 py-1.5 text-xs rounded-full ${
                    viewMode === 'list'
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-medium'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <List className="w-3 h-3 mr-1" />
                  리스트
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default FilterAndSort;