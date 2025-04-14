import React from 'react';
import { Search, Shield } from 'lucide-react';

/**
 * 사용자 검색 및 필터링 컴포넌트
 * 
 * @param {string} searchTerm - 현재 검색어
 * @param {string} selectedRole - 선택된 역할 필터
 * @param {function} onSearchChange - 검색어 변경 핸들러
 * @param {function} onRoleFilterChange - 역할 필터 변경 핸들러
 */
const UserSearchBar = ({ searchTerm, selectedRole, onSearchChange, onRoleFilterChange }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      {/* 검색 입력 필드 */}
      <div className="relative">
        <input
          type="text"
          placeholder="이름 또는 이메일 검색..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white w-full sm:w-64"
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>
      
      {/* 역할 필터 */}
      <div className="flex items-center bg-white dark:bg-gray-800 p-2 rounded-lg border border-gray-200 dark:border-gray-700">
        <Shield className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-2" />
        <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">역할:</span>
        
        <select
          value={selectedRole}
          onChange={(e) => onRoleFilterChange(e.target.value)}
          className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
        >
          <option value="all">모든 역할</option>
          <option value="admin">관리자</option>
          <option value="author">작성자</option>
          <option value="user">일반 사용자</option>
        </select>
      </div>
    </div>
  );
};

export default UserSearchBar;