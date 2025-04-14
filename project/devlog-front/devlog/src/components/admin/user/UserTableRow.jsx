import React from 'react';
import { Edit, Trash2, Save, X, Lock } from 'lucide-react';
import UserEditForm from './UserEditForm';

/**
 * 사용자 테이블 행 컴포넌트
 */
const UserTableRow = ({
  user,
  isEditing,
  editingData,
  onCancelEdit,
  onSaveEdit,
  onEdit,
  onDelete,
  onStatusChange,
  onRoleChange,
  onPasswordReset
}) => {
  // 역할에 따른 스타일 및 레이블 설정
  const getRoleStyle = (role) => {
    switch (role) {
      case 'admin':
        return {
          className: 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300',
          label: '관리자'
        };
      case 'author':
        return {
          className: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300',
          label: '작성자'
        };
      default:
        return {
          className: 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300',
          label: '일반 사용자'
        };
    }
  };
  
  // 상태에 따른 스타일 및 레이블 설정
  const getStatusStyle = (status) => {
    switch (status) {
      case 'active':
        return {
          className: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300',
          label: '활성'
        };
      case 'inactive':
        return {
          className: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300',
          label: '비활성'
        };
      default:
        return {
          className: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300',
          label: '대기중'
        };
    }
  };
  
  // 날짜 형식 변환
  const formatDate = (dateString) => {
    if (!dateString) return '없음';
    return new Date(dateString).toLocaleDateString('ko-KR');
  };
  
  // 수정 모드
  if (isEditing) {
    return (
      <UserEditForm
        userData={editingData}
        onSave={onSaveEdit}
        onCancel={onCancelEdit}
      />
    );
  }
  
  // 일반 보기 모드
  const roleStyle = getRoleStyle(user.role);
  const statusStyle = getStatusStyle(user.status);
  
  return (
    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
      <td className="px-6 py-4">
        <div className="text-sm font-medium text-gray-900 dark:text-white">
          {user.name}
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {user.email}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${roleStyle.className}`}>
          {roleStyle.label}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusStyle.className}`}>
          {statusStyle.label}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
        {formatDate(user.joinDate)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
        {formatDate(user.lastLogin)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex items-center justify-end space-x-2">
          <button
            onClick={onEdit}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300"
            title="편집"
          >
            <Edit className="w-5 h-5" />
          </button>
          <button
            onClick={onPasswordReset}
            className="text-yellow-600 dark:text-yellow-400 hover:text-yellow-900 dark:hover:text-yellow-300"
            title="비밀번호 재설정"
          >
            <Lock className="w-5 h-5" />
          </button>
          <button 
            onClick={onDelete}
            className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
            title="삭제"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default UserTableRow;