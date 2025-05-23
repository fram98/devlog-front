import React, { useState } from 'react';
import { Save, X } from 'lucide-react';

/**
 * 사용자 정보 편집 폼 컴포넌트
 */
const UserEditForm = ({ userData, onSave, onCancel }) => {
  const [editData, setEditData] = useState({
    id: userData.id,
    name: userData.name,
    email: userData.email,
    role: userData.role,
    status: userData.status,
    joinDate: userData.joinDate,
    lastLogin: userData.lastLogin
  });

  // 폼 제출 처리
  const handleSubmit = () => {
    // 필수 입력 값 검증
    if (!editData.name.trim() || !editData.email.trim()) {
      return false;
    }
    
    onSave(editData);
  };

  // 입력 값 변경 처리
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: value
    });
  };

  return (
    <tr className="bg-blue-50 dark:bg-blue-900/20">
      <td className="px-6 py-4">
        <input
          type="text"
          name="name"
          value={editData.name}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          placeholder="이름"
        />
      </td>
      <td className="px-6 py-4">
        <input
          type="email"
          name="email"
          value={editData.email}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          placeholder="이메일"
        />
      </td>
      <td className="px-6 py-4">
        <select
          name="role"
          value={editData.role}
          onChange={handleChange}
          className="p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
        >
          <option value="admin">관리자</option>
          <option value="author">작성자</option>
          <option value="user">일반 사용자</option>
        </select>
      </td>
      <td className="px-6 py-4">
        <select
          name="status"
          value={editData.status}
          onChange={handleChange}
          className="p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
        >
          <option value="active">활성</option>
          <option value="inactive">비활성</option>
          <option value="pending">대기중</option>
        </select>
      </td>
      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
        {editData.joinDate ? new Date(editData.joinDate).toLocaleDateString('ko-KR') : '없음'}
      </td>
      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
        {editData.lastLogin ? new Date(editData.lastLogin).toLocaleDateString('ko-KR') : '없음'}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex items-center justify-end space-x-2">
          <button
            onClick={handleSubmit}
            className="text-green-600 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300"
            title="저장"
          >
            <Save className="w-5 h-5" />
          </button>
          <button 
            onClick={onCancel}
            className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
            title="취소"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default UserEditForm;