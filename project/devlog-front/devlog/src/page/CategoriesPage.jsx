import React, { useState, useEffect } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { Search, ChevronRight, TrendingUp, ArrowUpRight, Plus } from 'lucide-react';
import { categoryService } from '../services/api';

// 색상 매핑
const colorMap = {
  blue: "from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700",
  indigo: "from-indigo-500 to-indigo-600 dark:from-indigo-600 dark:to-indigo-700",
  emerald: "from-emerald-500 to-emerald-600 dark:from-emerald-600 dark:to-emerald-700",
  amber: "from-amber-500 to-amber-600 dark:from-amber-600 dark:to-amber-700",
  red: "from-red-500 to-red-600 dark:from-red-600 dark:to-red-700",
  orange: "from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700",
  purple: "from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700",
  cyan: "from-cyan-500 to-cyan-600 dark:from-cyan-600 dark:to-cyan-700"
};

// 색상에 따른 텍스트 및 백그라운드 클래스 생성 헬퍼 함수
const getColorClasses = (color, type) => {
  const colorClasses = {
    blue: {
      bg: "bg-blue-100 dark:bg-blue-900/20",
      text: "text-blue-600 dark:text-blue-400",
      border: "border-blue-200 dark:border-blue-800",
      hover: "hover:bg-blue-50 dark:hover:bg-blue-900/10"
    },
    indigo: {
      bg: "bg-indigo-100 dark:bg-indigo-900/20",
      text: "text-indigo-600 dark:text-indigo-400",
      border: "border-indigo-200 dark:border-indigo-800",
      hover: "hover:bg-indigo-50 dark:hover:bg-indigo-900/10"
    },
    emerald: {
      bg: "bg-emerald-100 dark:bg-emerald-900/20",
      text: "text-emerald-600 dark:text-emerald-400",
      border: "border-emerald-200 dark:border-emerald-800",
      hover: "hover:bg-emerald-50 dark:hover:bg-emerald-900/10"
    },
    amber: {
      bg: "bg-amber-100 dark:bg-amber-900/20",
      text: "text-amber-600 dark:text-amber-400",
      border: "border-amber-200 dark:border-amber-800",
      hover: "hover:bg-amber-50 dark:hover:bg-amber-900/10"
    },
    red: {
      bg: "bg-red-100 dark:bg-red-900/20",
      text: "text-red-600 dark:text-red-400",
      border: "border-red-200 dark:border-red-800",
      hover: "hover:bg-red-50 dark:hover:bg-red-900/10"
    },
    orange: {
      bg: "bg-orange-100 dark:bg-orange-900/20",
      text: "text-orange-600 dark:text-orange-400",
      border: "border-orange-200 dark:border-orange-800",
      hover: "hover:bg-orange-50 dark:hover:bg-orange-900/10"
    },
    purple: {
      bg: "bg-purple-100 dark:bg-purple-900/20",
      text: "text-purple-600 dark:text-purple-400",
      border: "border-purple-200 dark:border-purple-800",
      hover: "hover:bg-purple-50 dark:hover:bg-purple-900/10"
    },
    cyan: {
      bg: "bg-cyan-100 dark:bg-cyan-900/20",
      text: "text-cyan-600 dark:text-cyan-400",
      border: "border-cyan-200 dark:border-cyan-800",
      hover: "hover:bg-cyan-50 dark:hover:bg-cyan-900/10"
    }
  };
  
  return colorClasses[color][type];
};

const CategoriesPage = ({ isDarkMode, toggleDarkMode }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [featuredCategories, setFeaturedCategories] = useState([]);
  const [otherCategories, setOtherCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // 초기 데이터 로드 및 필터링
  useEffect(() => {
    const loadCategories = async () => {
      try {
        setIsLoading(true);
        const categoriesData = await categoryService.getAllCategories();
        
        // 카테고리 분류 (featured와 non-featured로 구분)
        const featured = categoriesData.filter(cat => cat.featured);
        const others = categoriesData.filter(cat => !cat.featured);
        
        setFeaturedCategories(featured);
        setOtherCategories(others);
        setFilteredCategories(categoriesData);
        setIsLoading(false);
      } catch (err) {
        console.error('Error loading categories:', err);
        setError('카테고리를 불러오는 중 오류가 발생했습니다.');
        setIsLoading(false);
      }
    };
    
    loadCategories();
  }, []);
  
  // 검색 기능
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredCategories([...featuredCategories, ...otherCategories]);
      return;
    }
    
    const filtered = [...featuredCategories, ...otherCategories].filter(category => 
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setFilteredCategories(filtered);
  }, [searchQuery, featuredCategories, otherCategories]);
  
  // 검색 제출 핸들러
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // 이미 useEffect에서 처리
  };
  
  // 로딩 스켈레톤
  const CategorySkeleton = () => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm border border-gray-100/60 dark:border-gray-700/40 h-full animate-pulse">
      <div className="h-20 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600"></div>
      <div className="p-6">
        <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-3/4"></div>
        <div className="mt-4 h-10 bg-gray-100 dark:bg-gray-800 rounded"></div>
      </div>
    </div>
  );
  
  // 특집 카테고리 카드
  const FeaturedCategoryCard = ({ category }) => (
    <div className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 h-full border border-gray-100/60 dark:border-gray-700/40">
      {/* 헤더 배경 */}
      <div className={`h-28 bg-gradient-to-r ${colorMap[category.colorName]} p-6 relative overflow-hidden`}>
        {/* 배경 패턴 */}
        <div className="absolute inset-0 opacity-10">
          <svg className="h-full w-full" viewBox="0 0 80 80">
            <pattern id={`grid-${category.id}`} width="20" height="20" patternUnits="userSpaceOnUse">
              <rect width="20" height="20" fill="none" />
              <circle cx="10" cy="10" r="2" fill="currentColor" className="text-white" />
            </pattern>
            <rect width="100%" height="100%" fill={`url(#grid-${category.id})`} />
          </svg>
        </div>
        
        {/* 아이콘 및 포스트 카운트 */}
        <div className="relative flex justify-between items-start">
          <div className="w-16 h-16 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center text-3xl shadow-lg">
            {category.icon}
          </div>
          <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-medium">
            {category.postCount}개의 포스트
          </span>
        </div>
      </div>
      
      {/* 컨텐츠 */}
      <div className="p-6 bg-white dark:bg-gray-800">
        <h3 className="text-xl font-bold mb-2 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {category.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-5">
          {category.description}
        </p>
        
        {/* 최근 포스트 */}
        <div className={`p-3 rounded-xl ${getColorClasses(category.colorName, 'bg')} ${getColorClasses(category.colorName, 'border')} border`}>
          <div className="flex items-center text-xs font-medium mb-2">
            <TrendingUp className={`w-3.5 h-3.5 mr-1.5 ${getColorClasses(category.colorName, 'text')}`} />
            <span className={getColorClasses(category.colorName, 'text')}>최근 포스트</span>
          </div>
          <ul className="space-y-2">
            {category.latestPosts && category.latestPosts.map(post => (
              <li key={post.id} className="text-sm">
                <a href={`/post/${post.id}`} className="hover:underline text-gray-700 dark:text-gray-300">
                  {post.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
        
        {/* 더보기 아이콘 */}
        <div className="absolute bottom-4 right-4">
          <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${getColorClasses(category.colorName, 'bg')} ${getColorClasses(category.colorName, 'text')} opacity-0 group-hover:opacity-100 transition-all duration-300`}>
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </div>
      </div>
      
      {/* 링크 오버레이 */}
      <a href={`/categories/${category.slug}`} className="absolute inset-0">
        <span className="sr-only">카테고리 더 보기: {category.name}</span>
      </a>
    </div>
  );
  
  // 일반 카테고리 카드
  const CategoryCard = ({ category }) => (
    <div className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500 h-full border border-gray-100/60 dark:border-gray-700/40">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${getColorClasses(category.colorName, 'bg')}`}>
            {category.icon}
          </div>
          <span className="px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs">
            {category.postCount}개
          </span>
        </div>
        
        <h3 className="text-lg font-bold mb-2 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {category.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          {category.description}
        </p>
        
        {/* 더보기 링크 */}
        <div className="mt-4 flex items-center text-sm font-medium">
          <span className={`${getColorClasses(category.colorName, 'text')} group-hover:underline`}>
            포스트 보기
          </span>
          <ChevronRight className={`w-4 h-4 ml-1 transition-transform duration-300 ${getColorClasses(category.colorName, 'text')} group-hover:translate-x-1`} />
        </div>
      </div>
      
      {/* 링크 오버레이 */}
      <a href={`/categories/${category.slug}`} className="absolute inset-0">
        <span className="sr-only">카테고리 더 보기: {category.name}</span>
      </a>
    </div>
  );
  
  // 에러 화면
  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300">
        <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center max-w-md mx-auto p-6">
            <div className="text-red-500 text-5xl mb-4">!</div>
            <h2 className="text-2xl font-bold mb-2 dark:text-white">오류가 발생했습니다</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              다시 시도
            </button>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300">
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="flex-grow pt-16">
        {/* 헤더 섹션 */}
        <section className="py-16 bg-gradient-to-b from-blue-50 via-white to-gray-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-4 dark:text-white">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                  카테고리 탐색
                </span>
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                다양한 백엔드 개발 주제를 살펴보고 관심 있는 분야의 전문 콘텐츠를 확인하세요
              </p>
              
              {/* 검색 바 */}
              <div className="max-w-lg mx-auto">
                <form onSubmit={handleSearchSubmit} className="relative">
                  <input
                    type="text"
                    placeholder="카테고리 검색..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-5 py-3 pl-12 pr-12 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 shadow-sm"
                  />
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      ×
                    </button>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>
        
        {/* 특집 카테고리 */}
        {!isLoading && featuredCategories.length > 0 && (
          <section className="py-12">
            <div className="container mx-auto px-6">
              <div className="mb-10">
                <div className="flex items-center mb-6">
                  <h2 className="text-2xl font-bold dark:text-white">특집 카테고리</h2>
                  <div className="ml-3 px-2.5 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-medium">
                    인기
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {isLoading ? (
                    Array(3).fill(0).map((_, idx) => <CategorySkeleton key={idx} />)
                  ) : (
                    featuredCategories.map(category => (
                      <FeaturedCategoryCard key={category.id} category={category} />
                    ))
                  )}
                </div>
              </div>
            </div>
          </section>
        )}
        
        {/* 모든 카테고리 또는 검색 결과 */}
        <section className="py-12 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-6">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2 dark:text-white">
                {searchQuery ? '검색 결과' : '모든 카테고리'}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {searchQuery 
                  ? `"${searchQuery}"에 대한 ${filteredCategories.length}개의 카테고리` 
                  : '모든 백엔드 개발 카테고리를 탐색해보세요'}
              </p>
            </div>
            
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array(8).fill(0).map((_, idx) => <CategorySkeleton key={idx} />)}
              </div>
            ) : filteredCategories.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {(searchQuery ? filteredCategories : otherCategories).map(category => (
                  <CategoryCard key={category.id} category={category} />
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-900 rounded-xl p-8 text-center">
                <Search className="mx-auto w-12 h-12 text-gray-400 mb-4" />
                <h3 className="text-xl font-medium mb-2 dark:text-white">검색 결과가 없습니다</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  다른 검색어를 시도하거나 아래 버튼을 눌러 모든 카테고리를 확인해보세요.
                </p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  모든 카테고리 보기
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoriesPage;