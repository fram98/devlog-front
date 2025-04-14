import React from 'react';
import { UserPlus, RefreshCw } from 'lucide-react';

/**
 * 사용자 관리 액션 버튼 컴포넌트
 * 
 * @param {function} onAddUser - 사용자 추가 버튼 클릭 핸들러
 * @param {function} onRefresh - 새로고침 버튼 클릭 핸들러
 * @param {boolean} isLoading - 로딩 상태 표시 여부
 */
const UserActionBar = ({ onAddUser, onRefresh, isLoading }) => {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={onAddUser}
        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        <UserPlus className="w-4 h-4 mr-2" />
        새 사용자
      </button>
      
      <button
        onClick={onRefresh}
        className="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        disabled={isLoading}
      >
        <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
        새로고침
      </button>
    </div>
  );
};

export default UserActionBar;