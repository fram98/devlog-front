import React from 'react';
import { ArrowUpDown } from 'lucide-react';
import UserTableRow from './UserTableRow';
import UserAddForm from './UserAddForm';

/**
 * 사용자 목록 테이블 컴포넌트
 */
const UserTable = ({
  users,
  sortField,
  sortDirection,
  onSort,
  isAddingUser,
  onCancelAdd,
  onSaveNewUser,
  editingUser,
  onCancelEdit,
  onSaveEdit,
  onEdit,
  onDelete,
  onStatusChange,
  onRoleChange,
  onPasswordReset
}) => {
  // 정렬 헤더 렌더링 함수
  const renderSortHeader = (label, field) => (
    <div 
      className="flex items-center cursor-pointer"
      onClick={() => onSort(field)}
    >
      {label}
      {sortField === field && (
        <ArrowUpDown className="w-4 h-4 ml-1" />
      )}
    </div>
  );
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              {renderSortHeader('이름', 'name')}
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              {renderSortHeader('이메일', 'email')}
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              {renderSortHeader('역할', 'role')}
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              {renderSortHeader('상태', 'status')}
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              {renderSortHeader('가입일', 'joinDate')}
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              {renderSortHeader('최근 로그인', 'lastLogin')}
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              작업
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {/* 사용자 추가 폼 */}
          {isAddingUser && (
            <UserAddForm 
              onCancel={onCancelAdd}
              onSave={onSaveNewUser}
            />
          )}
          
          {/* 사용자 목록 */}
          {users.length > 0 ? (
            users.map((user) => (
              <UserTableRow
                key={user.id}
                user={user}
                isEditing={editingUser && editingUser.id === user.id}
                editingData={editingUser}
                onCancelEdit={onCancelEdit}
                onSaveEdit={onSaveEdit}
                onEdit={() => onEdit(user)}
                onDelete={() => onDelete(user.id)}
                onStatusChange={(status) => onStatusChange(user.id, status)}
                onRoleChange={(role) => onRoleChange(user.id, role)}
                onPasswordReset={() => onPasswordReset(user.email)}
              />
            ))
          ) : (
            <tr>
              <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                일치하는 사용자가 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;