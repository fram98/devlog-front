import React from 'react';

/**
 * 사용자 삭제 확인 모달 컴포넌트
 * 
 * @param {function} onCancel - 취소 버튼 클릭 핸들러
 * @param {function} onConfirm - 확인 버튼 클릭 핸들러
 */
const UserDeleteModal = ({ onCancel, onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          사용자 삭제 확인
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          이 사용자를 정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
        </p>
        
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDeleteModal;