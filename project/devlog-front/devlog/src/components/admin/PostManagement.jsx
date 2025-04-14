import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  CheckCircle, 
  XCircle,
  ChevronLeft,
  ChevronRight,
  Filter,
  ArrowUpDown,
  RefreshCw
} from 'lucide-react';

const PostManagement = ({ showAlert }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPosts, setSelectedPosts] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(null);
  
  // 게시물 데이터 (실제로는 API에서 가져옴)
  const postsData = [
    {
      id: 1,
      title: '마이크로서비스 아키텍처: 설계부터 배포까지',
      author: '김개발',
      category: '아키텍처',
      status: 'published',
      date: '2025-04-05',
      views: 4892,
      comments: 32,
    },
    {
      id: 2,
      title: 'PostgreSQL 성능 최적화: 인덱스 전략과 쿼리 튜닝',
      author: '박데이터',
      category: '데이터베이스',
      status: 'published',
      date: '2025-04-02',
      views: 3254,
      comments: 24,
    },
    {
      id: 3,
      title: 'Docker와 Kubernetes로 구현하는 CI/CD 파이프라인',
      author: '이클라우드',
      category: 'DevOps',
      status: 'published',
      date: '2025-03-29',
      views: 2987,
      comments: 18,
    },
    {
      id: 4,
      title: '실시간 데이터 처리를 위한 Apache Kafka 활용법',
      author: '최스트림',
      category: '데이터 파이프라인',
      status: 'published',
      date: '2025-03-25',
      views: 2845,
      comments: 15,
    },
    {
      id: 5,
      title: 'GraphQL API 설계 모범 사례와 성능 최적화',
      author: '정API',
      category: 'API 설계',
      status: 'published',
      date: '2025-03-22',
      views: 2156,
      comments: 21,
    },
    {
      id: 6,
      title: 'Spring Boot 3.0 새로운 기능과 마이그레이션 가이드',
      author: '김스프링',
      category: 'Spring',
      status: 'draft',
      date: '2025-03-18',
      views: 0,
      comments: 0,
    },
    {
      id: 7,
      title: '머신러닝 모델 서빙을 위한 MLOps 파이프라인 구축',
      author: '이ML',
      category: '머신러닝',
      status: 'draft',
      date: '2025-03-15',
      views: 0,
      comments: 0,
    },
    {
      id: 8,
      title: '클라우드 네이티브 애플리케이션을 위한 서버리스 아키텍처',
      author: '박서버',
      category: '클라우드',
      status: 'scheduled',
      date: '2025-04-20',
      views: 0,
      comments: 0,
    },
    {
      id: 9,
      title: '효과적인 데이터 모델링 전략과 NoSQL 데이터베이스 선택 가이드',
      author: '김데이터',
      category: '데이터베이스',
      status: 'scheduled',
      date: '2025-04-15',
      views: 0,
      comments: 0,
    },
    {
      id: 10,
      title: '블록체인 기반 서비스 구현: 이더리움과 솔리디티 실전 가이드',
      author: '최블록',
      category: '블록체인',
      status: 'draft',
      date: '2025-03-10',
      views: 0,
      comments: 0,
    }
  ];
  
  // 카테고리 목록 추출
  const categories = ['all', ...new Set(postsData.map(post => post.category))];
  
  // 검색 및 필터링 적용
  const filteredPosts = postsData.filter(post => {
    // 검색어 필터링
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    // 카테고리 필터링
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    
    // 상태 필터링
    const matchesStatus = selectedStatus === 'all' || post.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });
  
  // 정렬 적용
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    let compareResult = 0;
    
    // 정렬 필드에 따라 비교
    switch (sortField) {
      case 'title':
        compareResult = a.title.localeCompare(b.title);
        break;
      case 'author':
        compareResult = a.author.localeCompare(b.author);
        break;
      case 'category':
        compareResult = a.category.localeCompare(b.category);
        break;
      case 'date':
        compareResult = new Date(a.date) - new Date(b.date);
        break;
      case 'views':
        compareResult = a.views - b.views;
        break;
      case 'comments':
        compareResult = a.comments - b.comments;
        break;
      default:
        compareResult = new Date(a.date) - new Date(b.date);
    }
    
    // 정렬 방향 적용
    return sortDirection === 'asc' ? compareResult : -compareResult;
  });
  
  // 페이지네이션
  const postsPerPage = 5;
  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedPosts = sortedPosts.slice(startIndex, startIndex + postsPerPage);
  
  // 정렬 처리
  const handleSort = (field) => {
    if (sortField === field) {
      // 같은 필드를 클릭한 경우 정렬 방향 변경
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // 다른 필드를 클릭한 경우 해당 필드로 정렬 및 기본 내림차순
      setSortField(field);
      setSortDirection('desc');
    }
  };
  
  // 페이지 변경 처리
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  
  // 선택 처리
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedPosts(paginatedPosts.map(post => post.id));
    } else {
      setSelectedPosts([]);
    }
  };
  
  const handleSelectPost = (postId) => {
    if (selectedPosts.includes(postId)) {
      setSelectedPosts(selectedPosts.filter(id => id !== postId));
    } else {
      setSelectedPosts([...selectedPosts, postId]);
    }
  };
  
  // 삭제 처리
  const handleDelete = (postId) => {
    setConfirmDelete(postId);
  };
  
  const confirmDeletePost = () => {
    // 실제로는 API 호출
    showAlert(`게시물 ID: ${confirmDelete}가 삭제되었습니다.`);
    setConfirmDelete(null);
    // 선택된 게시물 목록에서도 제거
    setSelectedPosts(selectedPosts.filter(id => id !== confirmDelete));
  };
  
  // 일괄 삭제 처리
  const handleBulkDelete = () => {
    if (selectedPosts.length === 0) {
      showAlert('삭제할 게시물을 선택해주세요.');
      return;
    }
    
    // 실제로는 API 호출
    showAlert(`${selectedPosts.length}개의 게시물이 삭제되었습니다.`);
    setSelectedPosts([]);
  };
  
  // 일괄 상태 변경 처리
  const handleBulkStatusChange = (status) => {
    if (selectedPosts.length === 0) {
      showAlert('상태를 변경할 게시물을 선택해주세요.');
      return;
    }
    
    // 실제로는 API 호출
    showAlert(`${selectedPosts.length}개의 게시물 상태가 '${status}'로 변경되었습니다.`);
    setSelectedPosts([]);
  };
  
  // 데이터 새로고침
  const handleRefresh = () => {
    setIsLoading(true);
    
    // 실제로는 API 호출 (시뮬레이션)
    setTimeout(() => {
      setIsLoading(false);
      showAlert('게시물 목록이 새로고침되었습니다.');
    }, 800);
  };
  
  return (
    <div className="space-y-6">
      {/* 상단 액션 바 */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        {/* 검색 */}
        <div className="relative">
          <input
            type="text"
            placeholder="제목 또는 작성자 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white w-full sm:w-64"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        
        {/* 액션 버튼 */}
        <div className="flex flex-wrap gap-2">
          <Link
            to="/editor"
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            새 글 작성
          </Link>
          
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
      
      {/* 필터 및 일괄 작업 바 */}
      <div className="flex flex-col sm:flex-row gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-2 sm:items-center flex-grow">
          <div className="flex items-center">
            <Filter className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-2" />
            <span className="text-sm text-gray-500 dark:text-gray-400">필터:</span>
          </div>
          
          {/* 카테고리 필터 */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          >
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category === 'all' ? '모든 카테고리' : category}
              </option>
            ))}
          </select>
          
          {/* 상태 필터 */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="all">모든 상태</option>
            <option value="published">발행됨</option>
            <option value="draft">임시저장</option>
            <option value="scheduled">예약됨</option>
          </select>
        </div>
        
        {/* 일괄 작업 */}
        {selectedPosts.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">선택됨: {selectedPosts.length}개</span>
            
            <div className="flex gap-2">
              <button
                onClick={() => handleBulkStatusChange('published')}
                className="px-3 py-1.5 text-sm bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-md hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
              >
                발행
              </button>
              
              <button
                onClick={() => handleBulkStatusChange('draft')}
                className="px-3 py-1.5 text-sm bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded-md hover:bg-yellow-200 dark:hover:bg-yellow-900/50 transition-colors"
              >
                임시저장
              </button>
              
              <button
                onClick={handleBulkDelete}
                className="px-3 py-1.5 text-sm bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-md hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
              >
                삭제
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* 게시물 테이블 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3 text-left">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                    onChange={handleSelectAll}
                    checked={selectedPosts.length === paginatedPosts.length && paginatedPosts.length > 0}
                  />
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('title')}>
                <div className="flex items-center">
                  제목
                  {sortField === 'title' && (
                    <ArrowUpDown className="w-4 h-4 ml-1" />
                  )}
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('author')}>
                <div className="flex items-center">
                  작성자
                  {sortField === 'author' && (
                    <ArrowUpDown className="w-4 h-4 ml-1" />
                  )}
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('category')}>
                <div className="flex items-center">
                  카테고리
                  {sortField === 'category' && (
                    <ArrowUpDown className="w-4 h-4 ml-1" />
                  )}
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                상태
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('date')}>
                <div className="flex items-center">
                  날짜
                  {sortField === 'date' && (
                    <ArrowUpDown className="w-4 h-4 ml-1" />
                  )}
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('views')}>
                <div className="flex items-center">
                  조회수
                  {sortField === 'views' && (
                    <ArrowUpDown className="w-4 h-4 ml-1" />
                  )}
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('comments')}>
                <div className="flex items-center">
                  댓글
                  {sortField === 'comments' && (
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
            {paginatedPosts.length > 0 ? (
              paginatedPosts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                        checked={selectedPosts.includes(post.id)}
                        onChange={() => handleSelectPost(post.id)}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900 dark:text-white truncate max-w-xs">
                      {post.title}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {post.author}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      post.status === 'published' 
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' 
                        : post.status === 'draft'
                        ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
                        : 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                    }`}>
                      {post.status === 'published' && '발행됨'}
                      {post.status === 'draft' && '임시저장'}
                      {post.status === 'scheduled' && '예약됨'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(post.date).toLocaleDateString('ko-KR')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {post.views.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {post.comments}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      {post.status === 'published' && (
                        <Link to={`/posts/${post.id}`} className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300" title="보기">
                          <Eye className="w-5 h-5" />
                        </Link>
                      )}
                      <Link to={`/editor/${post.id}`} className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300" title="편집">
                        <Edit className="w-5 h-5" />
                      </Link>
                      <button 
                        onClick={() => handleDelete(post.id)} 
                        className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                        title="삭제"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                  일치하는 게시물이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-700 dark:text-gray-300">
            {`전체 ${sortedPosts.length}개 중 ${startIndex + 1}-${Math.min(startIndex + postsPerPage, sortedPosts.length)}개 표시`}
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            {[...Array(totalPages).keys()].map((page) => (
              <button
                key={page + 1}
                onClick={() => handlePageChange(page + 1)}
                className={`w-8 h-8 flex items-center justify-center rounded-md ${
                  currentPage === page + 1
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {page + 1}
              </button>
            ))}
            
            <button
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
      
      {/* 삭제 확인 모달 */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">게시물 삭제 확인</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              이 게시물을 정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
            </p>
            
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setConfirmDelete(null)}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                취소
              </button>
              <button
                onClick={confirmDeletePost}
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

export default PostManagement;