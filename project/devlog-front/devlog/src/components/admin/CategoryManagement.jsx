import React, { useState } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Folder,
  ArrowUpDown,
  RefreshCw,
  Save,
  X
} from 'lucide-react';

const CategoryManagement = ({ showAlert }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [newCategory, setNewCategory] = useState({
    name: '',
    slug: '',
    description: '',
    icon: '📁'
  });
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  
  // 카테고리 데이터 (실제로는 API에서 가져옴)
  const [categoriesData, setCategoriesData] = useState([
    {
      id: 1,
      name: '아키텍처',
      slug: 'architecture',
      description: '시스템 설계, 마이크로서비스, 도메인 주도 설계',
      icon: '🏗️',
      postCount: 35
    },
    {
      id: 2,
      name: '데이터베이스',
      slug: 'database',
      description: 'SQL, NoSQL, 데이터 모델링, 성능 최적화 등',
      icon: '🗄️',
      postCount: 48
    },
    {
      id: 3,
      name: 'DevOps',
      slug: 'devops',
      description: 'CI/CD, 컨테이너화, 클라우드 인프라, 자동화',
      icon: '🔄',
      postCount: 41
    },
    {
      id: 4,
      name: 'API 설계',
      slug: 'api-design',
      description: 'RESTful API, GraphQL, gRPC, API 보안',
      icon: '🔌',
      postCount: 29
    },
    {
      id: 5,
      name: '보안',
      slug: 'security',
      description: '인증, 권한 부여, 암호화, 취약점 관리',
      icon: '🔒',
      postCount: 32
    },
    {
      id: 6,
      name: '성능 최적화',
      slug: 'performance',
      description: '프로파일링, 부하 테스트, 캐싱, 스케일링',
      icon: '⚡',
      postCount: 26
    },
    {
      id: 7,
      name: '테스트',
      slug: 'testing',
      description: '단위 테스트, 통합 테스트, 테스트 자동화',
      icon: '🧪',
      postCount: 30
    },
    {
      id: 8,
      name: '클라우드',
      slug: 'cloud',
      description: 'AWS, Azure, GCP, 서버리스, 클라우드 아키텍처',
      icon: '☁️',
      postCount: 37
    }
  ]);
  
  // 검색 및 정렬 적용
  const filteredCategories = categoriesData.filter(category => 
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const sortedCategories = [...filteredCategories].sort((a, b) => {
    let compareResult = 0;
    
    // 정렬 필드에 따라 비교
    switch (sortField) {
      case 'name':
        compareResult = a.name.localeCompare(b.name);
        break;
      case 'postCount':
        compareResult = a.postCount - b.postCount;
        break;
      default:
        compareResult = a.name.localeCompare(b.name);
    }
    
    // 정렬 방향 적용
    return sortDirection === 'asc' ? compareResult : -compareResult;
  });
  
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
  
  // 삭제 처리
  const handleDelete = (categoryId) => {
    // 게시물이 있는 카테고리는 삭제 전 경고
    const category = categoriesData.find(cat => cat.id === categoryId);
    if (category && category.postCount > 0) {
      showAlert(`경고: 이 카테고리에는 ${category.postCount}개의 게시물이 있습니다. 삭제하면 해당 게시물의 카테고리가 없어집니다.`);
    }
    
    setConfirmDelete(categoryId);
  };
  
  const confirmDeleteCategory = () => {
    // 실제로는 API 호출
    setCategoriesData(categoriesData.filter(cat => cat.id !== confirmDelete));
    showAlert(`카테고리 ID: ${confirmDelete}가 삭제되었습니다.`);
    setConfirmDelete(null);
  };
  
  // 데이터 새로고침
  const handleRefresh = () => {
    setIsLoading(true);
    
    // 실제로는 API 호출 (시뮬레이션)
    setTimeout(() => {
      setIsLoading(false);
      showAlert('카테고리 목록이 새로고침되었습니다.');
    }, 800);
  };
  
  // 카테고리 편집 시작
  const handleEditStart = (category) => {
    setEditingCategory({
      ...category
    });
  };
  
  // 카테고리 편집 취소
  const handleEditCancel = () => {
    setEditingCategory(null);
  };
  
  // 카테고리 편집 저장
  const handleEditSave = () => {
    if (!editingCategory.name || !editingCategory.slug) {
      showAlert('카테고리 이름과 슬러그는 필수 항목입니다.');
      return;
    }
    
    // 이미 존재하는 슬러그인지 확인 (다른 카테고리)
    const slugExists = categoriesData.some(
      cat => cat.id !== editingCategory.id && cat.slug === editingCategory.slug
    );
    
    if (slugExists) {
      showAlert('이미 사용 중인 슬러그입니다. 다른 슬러그를 입력해주세요.');
      return;
    }
    
    // 실제로는 API 호출
    setCategoriesData(
      categoriesData.map(cat => 
        cat.id === editingCategory.id ? editingCategory : cat
      )
    );
    
    showAlert('카테고리가 업데이트되었습니다.');
    setEditingCategory(null);
  };
  
  // 새 카테고리 추가 시작
  const handleAddStart = () => {
    setIsAddingCategory(true);
    setNewCategory({
      name: '',
      slug: '',
      description: '',
      icon: '📁'
    });
  };
  
  // 새 카테고리 추가 취소
  const handleAddCancel = () => {
    setIsAddingCategory(false);
  };
  
  // 새 카테고리 추가 저장
  const handleAddSave = () => {
    if (!newCategory.name || !newCategory.slug) {
      showAlert('카테고리 이름과 슬러그는 필수 항목입니다.');
      return;
    }
    
    // 이미 존재하는 슬러그인지 확인
    const slugExists = categoriesData.some(cat => cat.slug === newCategory.slug);
    
    if (slugExists) {
      showAlert('이미 사용 중인 슬러그입니다. 다른 슬러그를 입력해주세요.');
      return;
    }
    
    // 실제로는 API 호출 (여기서는 간단히 새 ID 생성)
    const newId = Math.max(...categoriesData.map(cat => cat.id)) + 1;
    
    setCategoriesData([
      ...categoriesData,
      {
        ...newCategory,
        id: newId,
        postCount: 0
      }
    ]);
    
    showAlert('새 카테고리가 추가되었습니다.');
    setIsAddingCategory(false);
  };
  
  // 슬러그 자동 생성
  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // 특수문자 제거
      .replace(/\s+/g, '-') // 공백을 '-'로 변경
      .replace(/--+/g, '-'); // 연속된 '-'를 하나로 통합
  };
  
  const handleNameChange = (value, isEditing) => {
    if (isEditing) {
      setEditingCategory({
        ...editingCategory,
        name: value,
        slug: editingCategory.slug || generateSlug(value)
      });
    } else {
      setNewCategory({
        ...newCategory,
        name: value,
        slug: newCategory.slug || generateSlug(value)
      });
    }
  };
  
  // 아이콘 옵션
  const iconOptions = ['📁', '🏗️', '🗄️', '🔄', '🔌', '🔒', '⚡', '🧪', '☁️', '🔍', '🔧', '🚀', '📊', '📱', '💻', '🌐', '📈', '🛠️'];
  
  return (
    <div className="space-y-6">
      {/* 상단 액션 바 */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        {/* 검색 */}
        <div className="relative">
          <input
            type="text"
            placeholder="카테고리 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white w-full sm:w-64"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        
        {/* 액션 버튼 */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleAddStart}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            새 카테고리
          </button>
          
          <button
            onClick={handleRefresh}
            className="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            disabled={isLoading}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            새로고침
          </button>
        </div>
      </div>
      
      {/* 카테고리 테이블 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                아이콘
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('name')}>
                <div className="flex items-center">
                  카테고리 이름
                  {sortField === 'name' && (
                    <ArrowUpDown className="w-4 h-4 ml-1" />
                  )}
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                슬러그
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                설명
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('postCount')}>
                <div className="flex items-center">
                  게시물 수
                  {sortField === 'postCount' && (
                    <ArrowUpDown className="w-4 h-4 ml-1" />
                  )}
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                작업
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {/* 새 카테고리 추가 폼 */}
            {isAddingCategory && (
              <tr className="bg-blue-50 dark:bg-blue-900/20">
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={newCategory.icon}
                    onChange={(e) => setNewCategory({...newCategory, icon: e.target.value})}
                    className="p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:text-white"
                  >
                    {iconOptions.map((icon, index) => (
                      <option key={index} value={icon}>{icon}</option>
                    ))}
                  </select>
                </td>
                <td className="px-6 py-4">
                  <input
                    type="text"
                    value={newCategory.name}
                    onChange={(e) => handleNameChange(e.target.value, false)}
                    placeholder="카테고리 이름"
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </td>
                <td className="px-6 py-4">
                  <input
                    type="text"
                    value={newCategory.slug}
                    onChange={(e) => setNewCategory({...newCategory, slug: e.target.value})}
                    placeholder="slug-format"
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </td>
                <td className="px-6 py-4">
                  <input
                    type="text"
                    value={newCategory.description}
                    onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
                    placeholder="카테고리 설명"
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  0
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    <button
                      onClick={handleAddSave}
                      className="text-green-600 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300"
                      title="저장"
                    >
                      <Save className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={handleAddCancel} 
                      className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                      title="취소"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            )}
            
            {/* 카테고리 목록 */}
            {sortedCategories.length > 0 ? (
              sortedCategories.map((category) => (
                <tr key={category.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  {editingCategory && editingCategory.id === category.id ? (
                    // 편집 모드
                    <>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={editingCategory.icon}
                          onChange={(e) => setEditingCategory({...editingCategory, icon: e.target.value})}
                          className="p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:text-white"
                        >
                          {iconOptions.map((icon, index) => (
                            <option key={index} value={icon}>{icon}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          value={editingCategory.name}
                          onChange={(e) => handleNameChange(e.target.value, true)}
                          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          value={editingCategory.slug}
                          onChange={(e) => setEditingCategory({...editingCategory, slug: e.target.value})}
                          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          value={editingCategory.description}
                          onChange={(e) => setEditingCategory({...editingCategory, description: e.target.value})}
                          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {category.postCount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={handleEditSave}
                            className="text-green-600 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300"
                            title="저장"
                          >
                            <Save className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={handleEditCancel} 
                            className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                            title="취소"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </>
                  ) : (
                    // 보기 모드
                    <>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-2xl">
                          {category.icon}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {category.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {category.slug}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">
                          {category.description}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {category.postCount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => handleEditStart(category)}
                            className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300"
                            title="편집"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={() => handleDelete(category.id)} 
                            className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                            title="삭제"
                            disabled={category.postCount > 0} // 게시물이 있는 카테고리는 비활성화
                          >
                            <Trash2 className={`w-5 h-5 ${category.postCount > 0 ? 'opacity-50 cursor-not-allowed' : ''}`} />
                          </button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                  일치하는 카테고리가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* 삭제 확인 모달 */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">카테고리 삭제 확인</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              이 카테고리를 정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
            </p>
            
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setConfirmDelete(null)}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                취소
              </button>
              <button
                onClick={confirmDeleteCategory}
                className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryManagement;