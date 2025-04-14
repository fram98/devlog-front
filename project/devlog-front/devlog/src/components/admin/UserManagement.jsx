import React, { useState } from 'react';
import UserSearchBar from './user/UserSearchBar';
import UserActionBar from './user/UserActionBar';
import UserTable from './user/UserTable';
import UserPagination from './user/UserPagination';
import UserDeleteModal from './user/UserDeleteModal';
import { mockUsersData } from '../../data/mockData';

const UserManagement = ({ showAlert }) => {
  // 상태 관리
  const [usersData, setUsersData] = useState(mockUsersData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  
  // 검색 및 필터링 적용
  const filteredUsers = usersData.filter(user => {
    // 검색어 필터링
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    // 역할 필터링
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    
    return matchesSearch && matchesRole;
  });
  
  // 정렬 적용
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    let compareResult = 0;
    
    // 정렬 필드에 따라 비교
    switch (sortField) {
      case 'name':
        compareResult = a.name.localeCompare(b.name);
        break;
      case 'email':
        compareResult = a.email.localeCompare(b.email);
        break;
      case 'role':
        compareResult = a.role.localeCompare(b.role);
        break;
      case 'status':
        compareResult = a.status.localeCompare(b.status);
        break;
      case 'joinDate':
        compareResult = new Date(a.joinDate) - new Date(b.joinDate);
        break;
      case 'lastLogin':
        // null 값 처리 (로그인 기록이 없는 경우)
        if (a.lastLogin === null && b.lastLogin === null) {
          compareResult = 0;
        } else if (a.lastLogin === null) {
          compareResult = 1; // null은 가장 뒤로
        } else if (b.lastLogin === null) {
          compareResult = -1;
        } else {
          compareResult = new Date(a.lastLogin) - new Date(b.lastLogin);
        }
        break;
      default:
        compareResult = a.name.localeCompare(b.name);
    }
    
    // 정렬 방향 적용
    return sortDirection === 'asc' ? compareResult : -compareResult;
  });
  
  // 페이지네이션
  const usersPerPage = 5;
  const totalPages = Math.ceil(sortedUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const paginatedUsers = sortedUsers.slice(startIndex, startIndex + usersPerPage);
  
  // 정렬 처리
  const handleSort = (field) => {
    if (sortField === field) {
      // 같은 필드를 클릭한 경우 정렬 방향 변경
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // 다른 필드를 클릭한 경우 해당 필드로 정렬 및 기본 오름차순
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  // 페이지 변경 처리
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  
  // 검색어 변경 처리
  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setCurrentPage(1); // 검색 시 첫 페이지로 리셋
  };
  
  // 역할 필터 변경 처리
  const handleRoleFilterChange = (value) => {
    setSelectedRole(value);
    setCurrentPage(1); // 필터 변경 시 첫 페이지로 리셋
  };
  
  // 사용자 추가 시작
  const handleAddUser = () => {
    setIsAddingUser(true);
  };
  
  // 사용자 추가 취소
  const handleCancelAdd = () => {
    setIsAddingUser(false);
  };
  
  // 사용자 추가 저장
  const handleSaveNewUser = (newUser) => {
    // 이메일 검증
    if (!validateEmail(newUser.email)) {
      showAlert('유효한 이메일 주소를 입력해주세요.');
      return false;
    }
    
    // 중복 이메일 검증
    if (usersData.some(user => user.email === newUser.email)) {
      showAlert('이미 사용 중인 이메일 주소입니다.');
      return false;
    }
    
    // 새 사용자 ID 생성
    const newId = Math.max(...usersData.map(user => user.id)) + 1;
    const today = new Date().toISOString().split('T')[0];
    
    // 사용자 추가
    setUsersData([
      ...usersData,
      {
        ...newUser,
        id: newId,
        joinDate: today,
        lastLogin: null
      }
    ]);
    
    showAlert('새 사용자가 추가되었습니다.');
    setIsAddingUser(false);
    return true;
  };
  
  // 사용자 편집 시작
  const handleEditUser = (user) => {
    setEditingUser({ ...user });
  };
  
  // 사용자 편집 취소
  const handleCancelEdit = () => {
    setEditingUser(null);
  };
  
  // 사용자 편집 저장
  const handleSaveEdit = (editedUser) => {
    // 이메일 검증
    if (!validateEmail(editedUser.email)) {
      showAlert('유효한 이메일 주소를 입력해주세요.');
      return false;
    }
    
    // 중복 이메일 검증 (자기 자신 제외)
    if (usersData.some(user => user.id !== editedUser.id && user.email === editedUser.email)) {
      showAlert('이미 사용 중인 이메일 주소입니다.');
      return false;
    }
    
    // 사용자 정보 업데이트
    setUsersData(
      usersData.map(user => 
        user.id === editedUser.id ? editedUser : user
      )
    );
    
    showAlert('사용자 정보가 업데이트되었습니다.');
    setEditingUser(null);
    return true;
  };
  
  // 사용자 삭제 확인 요청
  const handleDeleteRequest = (userId) => {
    setConfirmDelete(userId);
  };
  
  // 사용자 삭제 취소
  const handleCancelDelete = () => {
    setConfirmDelete(null);
  };
  
  // 사용자 삭제 확인
  const handleConfirmDelete = () => {
    // 사용자 삭제
    setUsersData(usersData.filter(user => user.id !== confirmDelete));
    showAlert('사용자가 삭제되었습니다.');
    setConfirmDelete(null);
  };
  
  // 상태 변경 처리
  const handleStatusChange = (userId, newStatus) => {
    setUsersData(
      usersData.map(user => 
        user.id === userId ? { ...user, status: newStatus } : user
      )
    );
    
    showAlert(`사용자 상태가 '${getStatusLabel(newStatus)}'로 변경되었습니다.`);
  };
  
  // 역할 변경 처리
  const handleRoleChange = (userId, newRole) => {
    setUsersData(
      usersData.map(user => 
        user.id === userId ? { ...user, role: newRole } : user
      )
    );
    
    showAlert(`사용자 역할이 '${getRoleLabel(newRole)}'로 변경되었습니다.`);
  };
  
  // 데이터 새로고침
  const handleRefresh = () => {
    setIsLoading(true);
    
    // 실제로는 API 호출 (시뮬레이션)
    setTimeout(() => {
      setIsLoading(false);
      showAlert('사용자 목록이 새로고침되었습니다.');
    }, 800);
  };
  
  // 비밀번호 재설정 링크 전송
  const handlePasswordReset = (email) => {
    showAlert(`${email}로 비밀번호 재설정 링크가 전송되었습니다.`);
  };
  
  // 유틸리티 함수들
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  const getStatusLabel = (status) => {
    switch (status) {
      case 'active': return '활성';
      case 'inactive': return '비활성';
      case 'pending': return '대기중';
      default: return status;
    }
  };
  
  const getRoleLabel = (role) => {
    switch (role) {
      case 'admin': return '관리자';
      case 'author': return '작성자';
      case 'user': return '일반 사용자';
      default: return role;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <UserSearchBar 
          searchTerm={searchTerm}
          selectedRole={selectedRole}
          onSearchChange={handleSearchChange}
          onRoleFilterChange={handleRoleFilterChange}
        />
        
        <UserActionBar 
          onAddUser={handleAddUser}
          onRefresh={handleRefresh}
          isLoading={isLoading}
        />
      </div>
      
      <UserTable
        users={paginatedUsers}
        sortField={sortField}
        sortDirection={sortDirection}
        onSort={handleSort}
        isAddingUser={isAddingUser}
        onCancelAdd={handleCancelAdd}
        onSaveNewUser={handleSaveNewUser}
        editingUser={editingUser}
        onCancelEdit={handleCancelEdit}
        onSaveEdit={handleSaveEdit}
        onEdit={handleEditUser}
        onDelete={handleDeleteRequest}
        onStatusChange={handleStatusChange}
        onRoleChange={handleRoleChange}
        onPasswordReset={handlePasswordReset}
      />
      
      {totalPages > 1 && (
        <UserPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          totalItems={sortedUsers.length}
          itemsPerPage={usersPerPage}
          startIndex={startIndex}
        />
      )}
      
      {confirmDelete && (
        <UserDeleteModal
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
};

export default UserManagement;