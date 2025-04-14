import React, { useState, useEffect } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import PostCard from '../components/post/PostCard';
import { Search, Filter, ChevronDown, SlidersHorizontal, Grid3X3, List, BookOpen } from 'lucide-react';

// 목업 데이터
const mockPosts = [
  {
    id: 1,
    title: "마이크로서비스 아키텍처: 설계부터 배포까지",
    excerpt: "복잡한 애플리케이션을 위한 마이크로서비스 아키텍처의 철학, 설계 원칙, 실제 구현 방법을 알아봅니다.",
    coverImage: "/api/placeholder/800/450",
    date: "2025-04-05T09:00:00Z",
    author: {
      name: "김개발",
      avatar: "/api/placeholder/64/64"
    },
    categories: ["아키텍처", "마이크로서비스"],
    readTime: 15
  },
  {
    id: 2,
    title: "PostgreSQL 성능 최적화: 인덱스 전략과 쿼리 튜닝",
    excerpt: "대용량 데이터베이스에서 필수적인 PostgreSQL 성능 최적화 기법을 알아봅니다.",
    coverImage: "/api/placeholder/800/450",
    date: "2025-04-02T12:30:00Z",
    author: {
      name: "박데이터",
      avatar: "/api/placeholder/64/64"
    },
    categories: ["데이터베이스", "PostgreSQL"],
    readTime: 10
  },
  {
    id: 3,
    title: "Docker와 Kubernetes로 구현하는 CI/CD 파이프라인",
    excerpt: "컨테이너화된 애플리케이션의 지속적 통합 및 배포 파이프라인 구축 방법을 소개합니다.",
    coverImage: "/api/placeholder/800/450",
    date: "2025-03-29T14:45:00Z",
    author: {
      name: "이클라우드",
      avatar: "/api/placeholder/64/64"
    },
    categories: ["DevOps", "CI/CD"],
    readTime: 12
  },
  {
    id: 4,
    title: "실시간 데이터 처리를 위한 Apache Kafka 활용법",
    excerpt: "대규모 실시간 데이터 스트림 처리를 위한 Apache Kafka 아키텍처와 구현 패턴입니다.",
    coverImage: "/api/placeholder/800/450",
    date: "2025-03-25T10:15:00Z",
    author: {
      name: "최스트림",
      avatar: "/api/placeholder/64/64"
    },
    categories: ["데이터 파이프라인", "Kafka"],
    readTime: 15
  },
  {
    id: 5,
    title: "GraphQL API 설계 모범 사례와 성능 최적화",
    excerpt: "RESTful API를 넘어서는 GraphQL의 장점과 효율적인 API 설계 전략을 알아봅니다.",
    coverImage: "/api/placeholder/800/450",
    date: "2025-03-22T08:30:00Z",
    author: {
      name: "정API",
      avatar: "/api/placeholder/64/64"
    },
    categories: ["API", "GraphQL"],
    readTime: 13
  },
  {
    id: 6,
    title: "Spring Boot 3.0 새로운 기능과 마이그레이션 가이드",
    excerpt: "Spring Boot 최신 버전의 주요 변경사항과 기존 애플리케이션 마이그레이션 전략을 소개합니다.",
    coverImage: "/api/placeholder/800/450",
    date: "2025-03-18T15:20:00Z",
    author: {
      name: "김스프링",
      avatar: "/api/placeholder/64/64"
    },
    categories: ["Spring", "Java"],
    readTime: 10
  },
  {
    id: 7,
    title: "AWS Lambda를 활용한 서버리스 아키텍처 구축",
    excerpt: "서버리스 컴퓨팅의 장점과 AWS Lambda를 이용한 확장 가능한 백엔드 서비스 구현 방법을 설명합니다.",
    coverImage: "/api/placeholder/800/450",
    date: "2025-03-15T11:45:00Z",
    author: {
      name: "한서버리스",
      avatar: "/api/placeholder/64/64"
    },
    categories: ["AWS", "서버리스"],
    readTime: 14
  },
  {
    id: 8,
    title: "Redis 캐싱 전략으로 API 성능 10배 향상하기",
    excerpt: "고부하 환경에서 Redis를 활용한 효과적인 캐싱 전략과 구현 패턴을 소개합니다.",
    coverImage: "/api/placeholder/800/450",
    date: "2025-03-10T09:20:00Z",
    author: {
      name: "장캐시",
      avatar: "/api/placeholder/64/64"
    },
    categories: ["Redis", "캐싱", "성능 최적화"],
    readTime: 11
  },
  {
    id: 9,
    title: "gRPC를 이용한 마이크로서비스 통신 구현",
    excerpt: "효율적인 서비스 간 통신을 위한 gRPC 프로토콜의 원리와 실제 적용 방법에 대해 알아봅니다.",
    coverImage: "/api/placeholder/800/450",
    date: "2025-03-05T14:30:00Z",
    author: {
      name: "윤프로토콜",
      avatar: "/api/placeholder/64/64"
    },
    categories: ["마이크로서비스", "gRPC"],
    readTime: 13
  }
];

// 목업 카테고리 데이터
const mockCategories = [
  { id: 1, name: "전체", slug: "all", count: 48 },
  { id: 2, name: "아키텍처", slug: "architecture", count: 12 },
  { id: 3, name: "데이터베이스", slug: "database", count: 15 },
  { id: 4, name: "DevOps", slug: "devops", count: 10 },
  { id: 5, name: "API", slug: "api", count: 8 },
  { id: 6, name: "마이크로서비스", slug: "microservices", count: 6 },
  { id: 7, name: "성능 최적화", slug: "performance", count: 9 },
  { id: 8, name: "Java", slug: "java", count: 14 },
  { id: 9, name: "Spring", slug: "spring", count: 11 },
  { id: 10, name: "캐싱", slug: "caching", count: 5 }
];

const PostListPage = ({ isDarkMode, toggleDarkMode }) => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('latest'); // latest, oldest, popular
  const [viewMode, setViewMode] = useState('grid'); // grid, list
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  
  // 실제 환경에서는 API로 데이터를 가져옵니다
  useEffect(() => {
    // 데이터 로딩 시뮬레이션
    const timer = setTimeout(() => {
      setPosts(mockPosts);
      setFilteredPosts(mockPosts);
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // 포스트 필터링
  useEffect(() => {
    let results = [...posts];
    
    // 카테고리 필터링
    if (selectedCategory !== 'all') {
      results = results.filter(post => 
        post.categories.some(cat => 
          cat.toLowerCase() === selectedCategory.toLowerCase()
        )
      );
    }
    
    // 검색어 필터링
    if (searchQuery) {
      results = results.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.categories.some(cat => cat.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // 정렬
    switch (sortBy) {
      case 'latest':
        results.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'oldest':
        results.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'popular':
        // 실제로는 조회수나 좋아요 등으로 정렬
        results.sort((a, b) => b.readTime - a.readTime);
        break;
      default:
        break;
    }
    
    setFilteredPosts(results);
    setCurrentPage(1); // 필터 변경 시 첫 페이지로 이동
  }, [searchQuery, selectedCategory, sortBy, posts]);
  
  // 페이지네이션 계산
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  
  // 페이지 변경 함수
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    // 페이지 상단으로 부드럽게 스크롤
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // 검색 제출 핸들러
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // 이미 useEffect에서 필터링 처리
  };
  
  // 로딩 스켈레톤 UI
  const PostSkeleton = () => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm border border-gray-100/60 dark:border-gray-700/50 h-full animate-pulse">
      <div className="aspect-[16/9] bg-gray-200 dark:bg-gray-700"></div>
      <div className="p-6">
        <div className="flex justify-between mb-3">
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
        </div>
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-6 w-3/4"></div>
        <div className="flex justify-between pt-4 border-t border-gray-100 dark:border-gray-700/50">
          <div className="flex items-center">
            <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full mr-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
          </div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-8"></div>
        </div>
      </div>
    </div>
  );
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="flex-grow pt-16">
        {/* 헤더 섹션 */}
        <section className="py-10 md:py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900 dark:text-white">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                      모든 포스트
                    </span>
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300">
                    모든 백엔드 개발 관련 글을 탐색하세요
                  </p>
                </div>
                
                {/* 검색 바 */}
                <div className="w-full md:w-auto">
                  <form onSubmit={handleSearchSubmit} className="relative">
                    <input
                      type="text"
                      placeholder="포스트 검색..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full md:w-80 px-4 py-3 pl-12 pr-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-900 dark:text-gray-100"
                    />
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery('')}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400"
                      >
                        ×
                      </button>
                    )}
                  </form>
                </div>
              </div>
              
              {/* 카테고리 탭 */}
              <div className="mt-8 mb-4 relative">
                <div className="flex overflow-x-auto md:justify-center no-scrollbar pb-2">
                  <div className="flex space-x-2 px-1">
                    {mockCategories.map(category => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.slug)}
                        className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          selectedCategory === category.slug
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                        }`}
                      >
                        {category.name} {category.count > 0 && <span className="text-xs ml-1 opacity-70">({category.count})</span>}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Gradient fade indicators for scrollable content */}
                <div className="absolute top-0 left-0 bottom-0 w-8 bg-gradient-to-r from-gray-50 to-transparent dark:from-gray-900 dark:to-transparent pointer-events-none"></div>
                <div className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-l from-gray-50 to-transparent dark:from-gray-900 dark:to-transparent pointer-events-none"></div>
              </div>
            </div>
          </div>
        </section>
        
        {/* 필터 및 포스트 영역 */}
        <section className="py-10">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-7xl mx-auto">
              {/* 필터 및 정렬 컨트롤 */}
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                    <BookOpen className="w-4 h-4 mr-1.5" />
                    총 {filteredPosts.length}개의 포스트
                  </p>
                </div>
                
                <div className="flex flex-col xs:flex-row gap-3">
                  {/* 필터 버튼 (모바일) */}
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
                        <option value="latest">최신순</option>
                        <option value="oldest">오래된순</option>
                        <option value="popular">인기순</option>
                      </select>
                      <SlidersHorizontal className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400" />
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400 pointer-events-none" />
                    </div>
                    
                    {/* 뷰 모드 토글 */}
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
                  </div>
                </div>
              </div>
              
              {/* 모바일 필터 패널 */}
              {showFilters && (
                <div className="md:hidden mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                  {/* 정렬 옵션 */}
                  <div className="mb-4">
                    <h3 className="text-sm font-medium mb-2 text-gray-900 dark:text-white">정렬</h3>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setSortBy('latest')}
                        className={`px-3 py-1.5 text-xs rounded-full ${
                          sortBy === 'latest'
                            ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-medium'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        최신순
                      </button>
                      <button
                        onClick={() => setSortBy('oldest')}
                        className={`px-3 py-1.5 text-xs rounded-full ${
                          sortBy === 'oldest'
                            ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-medium'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        오래된순
                      </button>
                      <button
                        onClick={() => setSortBy('popular')}
                        className={`px-3 py-1.5 text-xs rounded-full ${
                          sortBy === 'popular'
                            ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-medium'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        인기순
                      </button>
                    </div>
                  </div>
                  
                  {/* 뷰 모드 */}
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
                </div>
              )}
              
              {/* 포스트 그리드/리스트 */}
              {isLoading ? (
                // 로딩 상태 UI
                <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-6"}>
                  {[...Array(6)].map((_, index) => (
                    <PostSkeleton key={index} />
                  ))}
                </div>
              ) : filteredPosts.length > 0 ? (
                // 포스트 목록
                <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-6"}>
                  {currentPosts.map((post) => (
                    <div key={post.id} className="transform transition-all duration-500 hover:-translate-y-1">
                      <PostCard post={post} />
                    </div>
                  ))}
                </div>
              ) : (
                // 결과 없음 UI
                <div className="py-16 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">검색 결과가 없습니다</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                    다른 키워드로 검색하거나 필터를 조정해 보세요.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                      setSortBy('latest');
                    }}
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                  >
                    모든 포스트 보기
                  </button>
                </div>
              )}
              
              {/* 페이지네이션 */}
              {!isLoading && filteredPosts.length > postsPerPage && (
                <div className="mt-12 flex justify-center">
                  <nav className="flex items-center space-x-1">
                    <button
                      onClick={() => paginate(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="p-2 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
                    >
                      &laquo;
                    </button>
                    
                    {Array.from({ length: Math.min(5, totalPages) }).map((_, index) => {
                      let pageNumber;
                      
                      // 페이지 번호 계산 로직
                      if (totalPages <= 5 || currentPage <= 3) {
                        pageNumber = index + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNumber = totalPages - 4 + index;
                      } else {
                        pageNumber = currentPage - 2 + index;
                      }
                      
                      if (pageNumber > totalPages) return null;
                      
                      return (
                        <button
                          key={pageNumber}
                          onClick={() => paginate(pageNumber)}
                          className={`w-10 h-10 rounded-md ${
                            currentPage === pageNumber
                              ? 'bg-blue-600 text-white font-medium'
                              : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                          }`}
                        >
                          {pageNumber}
                        </button>
                      );
                    })}
                    
                    <button
                      onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
                    >
                      &raquo;
                    </button>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      
      {/* Custom Scrollbar Style */}
      <style jsx global>{`
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default PostListPage;