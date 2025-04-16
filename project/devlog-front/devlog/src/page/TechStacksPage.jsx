import React, { useState, useEffect } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import TechStackCard from '../components/techstack/TechStackCard';
import { Search, Filter, ChevronDown, Grid3X3, List, Database, Server, Code, Layers, Shield, Cloud, SlidersHorizontal } from 'lucide-react';
import { techStackService } from '../services/api';

// 카테고리 메타데이터
const categories = [
  { id: 'all', name: '모든 기술', icon: <Layers className="w-5 h-5" /> },
  { id: 'framework', name: '프레임워크', icon: <Code className="w-5 h-5" /> },
  { id: 'database', name: '데이터베이스', icon: <Database className="w-5 h-5" /> },
  { id: 'devops', name: 'DevOps', icon: <Server className="w-5 h-5" /> },
  { id: 'api', name: 'API', icon: <Shield className="w-5 h-5" /> },
  { id: 'cloud', name: '클라우드', icon: <Cloud className="w-5 h-5" /> },
];

const TechStacksPage = ({ isDarkMode, toggleDarkMode }) => {
  const [techStacks, setTechStacks] = useState([]);
  const [filteredStacks, setFilteredStacks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('alphabetical'); // alphabetical, articles
  const [viewMode, setViewMode] = useState('grid'); // grid, list
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [error, setError] = useState(null);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  
  // API로 데이터 가져오기
  useEffect(() => {
    const fetchTechStacks = async () => {
      try {
        setIsLoading(true);
        // 기술 스택 데이터 가져오기
        const data = await techStackService.getAllTechStacks();
        setTechStacks(data);
        setFilteredStacks(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching tech stacks:', error);
        setError('기술 스택을 불러오는 중 오류가 발생했습니다.');
        setIsLoading(false);
      }
    };

    fetchTechStacks();
  }, []);
  
  // 필터링 및 정렬
  useEffect(() => {
    if (!techStacks.length) return;
    
    let results = [...techStacks];
    
    // 카테고리 필터링
    if (selectedCategory !== 'all') {
      results = results.filter(stack => stack.category === selectedCategory);
    }
    
    // 검색어 필터링
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(stack => 
        stack.name.toLowerCase().includes(query) ||
        stack.description.toLowerCase().includes(query) ||
        stack.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // 정렬
    switch (sortBy) {
      case 'popularity':
        results.sort((a, b) => b.popularity - a.popularity);
        break;
      case 'alphabetical':
        results.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'articles':
        results.sort((a, b) => b.articleCount - a.articleCount);
        break;
      default:
        break;
    }
    
    setFilteredStacks(results);
  }, [searchQuery, selectedCategory, sortBy, techStacks]);
  
  // 검색 제출 핸들러
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // 이미 useEffect에서 필터링 처리
    setIsMobileSearchOpen(false); // 검색 후 모바일 검색창 닫기
  };

  // 검색 취소 핸들러 (모바일)
  const handleCancelSearch = () => {
    setSearchQuery('');
    setIsMobileSearchOpen(false);
  };
  
  // 로딩 스켈레톤 UI
  const TechStackSkeleton = () => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm border border-gray-100/60 dark:border-gray-700/40 h-full animate-pulse">
      <div className="p-6 pb-0">
        <div className="flex items-start justify-between">
          <div className="w-14 h-14 rounded-xl bg-gray-200 dark:bg-gray-700"></div>
          <div className="w-20 h-6 rounded-full bg-gray-200 dark:bg-gray-700"></div>
        </div>
        <div className="mt-5 flex items-start justify-between">
          <div className="h-7 w-36 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-6 w-20 rounded-md bg-gray-200 dark:bg-gray-700"></div>
        </div>
      </div>
      <div className="p-6">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-3/4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-6 w-1/2"></div>
        <div className="flex flex-wrap gap-2 mb-6">
          {[...Array(4)].map((_, idx) => (
            <div key={idx} className="h-6 w-16 rounded-lg bg-gray-200 dark:bg-gray-700"></div>
          ))}
        </div>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-4 w-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
            <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-4 w-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
            <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          </div>
        </div>
      </div>
      <div className="p-6 pt-0 border-t border-gray-100 dark:border-gray-700/50 mt-6">
        <div className="flex items-center justify-between">
          <div className="h-5 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-5 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    </div>
  );
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="flex-grow pt-16">
        {/* 헤더 섹션 */}
        <section className="pt-12 lg:pt-20 pb-10 md:pb-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 dark:text-white">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                  백엔드 기술 스택
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6 md:mb-10 max-w-3xl mx-auto px-4 md:px-0">
                현대 백엔드 개발에 필수적인 기술 스택을 탐색하고 최신 트렌드를 알아보세요
              </p>
              
              {/* 데스크톱 검색 바 */}
              <div className="max-w-xl mx-auto relative hidden md:block">
                <form onSubmit={handleSearchSubmit}>
                  <input
                    type="text"
                    placeholder="기술 스택 검색..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-6 py-4 pl-14 pr-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-900 dark:text-gray-100"
                  />
                  <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400"
                    >
                      ×
                    </button>
                  )}
                </form>
              </div>
              
              {/* 모바일 검색 버튼 */}
              <div className="md:hidden flex justify-center mt-6">
                <button 
                  onClick={() => setIsMobileSearchOpen(true)}
                  className="flex items-center justify-center w-full max-w-xs mx-auto py-3 px-4 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                >
                  <Search className="w-5 h-5 mr-2 text-gray-500" />
                  <span>기술 스택 검색</span>
                </button>
              </div>
              
              {/* 모바일 검색 오버레이 */}
              {isMobileSearchOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start pt-20 px-4 md:hidden">
                  <div className="bg-white dark:bg-gray-800 w-full rounded-xl p-4 shadow-lg">
                    <form onSubmit={handleSearchSubmit}>
                      <div className="relative mb-4">
                        <input
                          type="text"
                          placeholder="기술 스택 검색..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          autoFocus
                          className="w-full px-4 py-3 pl-10 pr-4 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-900 dark:text-gray-100"
                        />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
                        {searchQuery && (
                          <button
                            type="button"
                            onClick={() => setSearchQuery('')}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400"
                          >
                            ×
                          </button>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button 
                          type="submit"
                          className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          검색
                        </button>
                        <button 
                          type="button"
                          onClick={handleCancelSearch}
                          className="py-2 px-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          취소
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
        
        {/* 카테고리 및 필터 */}
        <section className="py-4 md:py-6 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 sticky top-16 z-10 backdrop-blur-sm">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              {/* 카테고리 필터 - 스크롤 가능한 컨테이너 */}
              <div className="w-full md:w-auto overflow-x-auto scrollbar-hide pb-2 md:pb-0 -mx-1 px-1 md:mx-0 md:px-0">
                <div className="flex space-x-2 min-w-max">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`whitespace-nowrap px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-all flex items-center ${
                        selectedCategory === category.id
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                      }`}
                    >
                      <span className="mr-1.5 md:mr-2">{category.icon}</span>
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* 정렬 및 보기 방식 */}
              <div className="flex items-center space-x-3">
                {/* 필터 버튼 (모바일) */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="md:hidden flex items-center justify-between px-4 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm text-gray-700 dark:text-gray-300"
                >
                  <div className="flex items-center">
                    <Filter className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" />
                    <span>필터</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </button>
                
                {/* 데스크톱 컨트롤 */}
                <div className="hidden md:flex items-center space-x-3">
                  {/* 정렬 셀렉트 */}
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none pl-10 pr-10 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 cursor-pointer text-sm"
                    >
                      <option value="alphabetical">이름순</option>
                      <option value="articles">포스트 수</option>
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
              <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-md md:hidden">
                <div className="mb-4">
                  <h3 className="text-sm font-medium mb-2 text-gray-900 dark:text-white">정렬</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setSortBy('alphabetical')}
                      className={`px-3 py-2 text-xs rounded-lg flex items-center justify-center ${
                        sortBy === 'alphabetical'
                          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      이름순
                    </button>
                    <button
                      onClick={() => setSortBy('articles')}
                      className={`px-3 py-2 text-xs rounded-lg flex items-center justify-center ${
                        sortBy === 'articles'
                          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      포스트 수
                    </button>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2 text-gray-900 dark:text-white">보기 방식</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`flex items-center px-4 py-2 text-xs rounded-lg ${
                        viewMode === 'grid'
                          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <Grid3X3 className="w-3.5 h-3.5 mr-1.5" />
                      그리드
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`flex items-center px-4 py-2 text-xs rounded-lg ${
                        viewMode === 'list'
                          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <List className="w-3.5 h-3.5 mr-1.5" />
                      리스트
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
        
        {/* 기술 스택 그리드 */}
        <section className="py-6 md:py-10">
          <div className="container mx-auto px-4 md:px-6">
            {isLoading ? (
              // 로딩 상태 UI
              <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8" : "space-y-4 md:space-y-6"}>
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="transform transition-all duration-500 animate-pulse">
                    <TechStackSkeleton />
                  </div>
                ))}
              </div>
            ) : error ? (
              // 오류 상태 UI
              <div className="py-10 md:py-16 text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-red-100 dark:bg-red-800/30 mb-4">
                  <svg className="w-7 h-7 md:w-8 md:h-8 text-red-500 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg md:text-xl font-medium mb-2 text-gray-900 dark:text-white">{error}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                  잠시 후 다시 시도해주세요.
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  새로고침
                </button>
              </div>
            ) : filteredStacks.length > 0 ? (
              // 기술 스택 목록
              <div className={viewMode === 'grid' 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8" 
                : "space-y-4 md:space-y-6"
              }>
                {filteredStacks.map((stack) => (
                  <div key={stack.id} className="transform transition-all duration-500 hover:-translate-y-1">
                    <TechStackCard stack={stack} />
                  </div>
                ))}
              </div>
            ) : (
              // 결과 없음 UI
              <div className="py-10 md:py-16 text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
                  <Search className="w-7 h-7 md:w-8 md:h-8 text-gray-400" />
                </div>
                <h3 className="text-lg md:text-xl font-medium mb-2 text-gray-900 dark:text-white">검색 결과가 없습니다</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto px-4 md:px-0">
                  다른 키워드로 검색하거나 카테고리를 변경해 보세요.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setSortBy('alphabetical');
                  }}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  모든 기술 스택 보기
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
      
      {/* Custom Scrollbar Style */}
      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default TechStacksPage;