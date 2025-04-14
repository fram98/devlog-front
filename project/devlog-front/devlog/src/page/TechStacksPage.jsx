import React, { useState, useEffect } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import TechStackCard from '../components/techstack/TechStackCard';
import { Search, Filter, ChevronDown, Grid3X3, List, Database, Server, Code, Layers, Shield, Cloud, SlidersHorizontal } from 'lucide-react';

// 목업 기술 스택 데이터
const mockTechStacks = [
  {
    id: 1,
    name: "Spring Boot",
    description: "자바 기반 강력한 백엔드 프레임워크로, 마이크로서비스 아키텍처와 클라우드 네이티브 애플리케이션 개발에 적합합니다.",
    icon: "🍃",
    type: "프레임워크",
    tags: ["Java", "Web", "API", "JPA"],
    articleCount: 42,
    documentationUrl: "https://spring.io/projects/spring-boot",
    popularity: 95,
    difficulty: 75,
    isEnterprise: false,
    trend: "rising",
    category: "framework"
  },
  {
    id: 2,
    name: "Docker & Kubernetes",
    description: "컨테이너화 및 오케스트레이션 도구로, 확장 가능하고 안정적인 애플리케이션 배포 환경을 제공합니다.",
    icon: "🐳",
    type: "DevOps",
    tags: ["컨테이너", "오케스트레이션", "CI/CD", "인프라"],
    articleCount: 36,
    documentationUrl: "https://kubernetes.io/docs/home/",
    popularity: 92,
    difficulty: 85,
    isEnterprise: false,
    trend: "rising",
    category: "devops"
  },
  {
    id: 3,
    name: "MongoDB",
    description: "유연한 스키마를 제공하는 대표적인 NoSQL 데이터베이스로, 대용량 데이터 처리에 적합합니다.",
    icon: "🍃",
    type: "데이터베이스",
    tags: ["NoSQL", "Document DB", "Schema-less", "스케일링"],
    articleCount: 29,
    documentationUrl: "https://docs.mongodb.com/",
    popularity: 88,
    difficulty: 65,
    isEnterprise: false,
    trend: "stable",
    category: "database"
  },
  {
    id: 4,
    name: "GraphQL",
    description: "효율적인 API 쿼리 언어 및 런타임으로 클라이언트가 필요한 데이터를 정확히 요청할 수 있게 해줍니다.",
    icon: "⚛️",
    type: "API",
    tags: ["API", "쿼리 언어", "Schema", "효율성"],
    articleCount: 24,
    documentationUrl: "https://graphql.org/learn/",
    popularity: 86,
    difficulty: 70,
    isEnterprise: false,
    trend: "rising",
    category: "api"
  },
  {
    id: 5,
    name: "Redis",
    description: "인메모리 데이터 구조 저장소로, 캐싱, 세션 관리, 메시징 큐 등 다양한 용도로 활용 가능합니다.",
    icon: "🔴",
    type: "데이터베이스",
    tags: ["인메모리", "캐싱", "NoSQL", "Pub/Sub"],
    articleCount: 28,
    documentationUrl: "https://redis.io/documentation",
    popularity: 90,
    difficulty: 60,
    isEnterprise: false,
    trend: "stable",
    category: "database"
  },
  {
    id: 6,
    name: "Node.js",
    description: "확장 가능한 네트워크 애플리케이션을 구축하기 위한 JavaScript 런타임으로, 이벤트 기반 비동기 I/O에 최적화되어 있습니다.",
    icon: "🟢",
    type: "프레임워크",
    tags: ["JavaScript", "서버", "비동기", "이벤트 기반"],
    articleCount: 32,
    documentationUrl: "https://nodejs.org/en/docs/",
    popularity: 92,
    difficulty: 65,
    isEnterprise: false,
    trend: "stable",
    category: "framework"
  },
  {
    id: 7,
    name: "AWS Lambda",
    description: "서버리스 컴퓨팅 서비스로, 인프라 관리 없이 코드를 실행하고 자동으로 확장할 수 있습니다.",
    icon: "λ",
    type: "클라우드",
    tags: ["서버리스", "FaaS", "이벤트 기반", "자동 확장"],
    articleCount: 25,
    documentationUrl: "https://docs.aws.amazon.com/lambda/",
    popularity: 88,
    difficulty: 75,
    isEnterprise: false,
    trend: "rising",
    category: "cloud"
  },
  {
    id: 8,
    name: "PostgreSQL",
    description: "강력한 오픈 소스 관계형 데이터베이스로, 확장성과 표준 준수를 특징으로 합니다.",
    icon: "🐘",
    type: "데이터베이스",
    tags: ["RDBMS", "SQL", "확장성", "ACID"],
    articleCount: 35,
    documentationUrl: "https://www.postgresql.org/docs/",
    popularity: 94,
    difficulty: 75,
    isEnterprise: false,
    trend: "rising",
    category: "database"
  },
  {
    id: 9,
    name: "Terraform",
    description: "인프라를 코드로 관리하는 도구로, 클라우드 리소스를 선언적 구성 파일로 정의하고 관리합니다.",
    icon: "🏗️",
    type: "DevOps",
    tags: ["IaC", "클라우드", "프로비저닝", "자동화"],
    articleCount: 22,
    documentationUrl: "https://www.terraform.io/docs",
    popularity: 87,
    difficulty: 80,
    isEnterprise: false,
    trend: "rising",
    category: "devops"
  }
];

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
  
  // 실제 환경에서는 API로 데이터를 가져옵니다
  useEffect(() => {
    // 데이터 로딩 시뮬레이션
    const timer = setTimeout(() => {
      setTechStacks(mockTechStacks);
      setFilteredStacks(mockTechStacks);
      setSortBy('alphabetical'); // 기본 정렬을 인기도가 아닌 이름순으로 변경
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // 필터링 및 정렬
  useEffect(() => {
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
        <section className="pt-12 lg:pt-20 pb-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-bold mb-6 dark:text-white">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                  백엔드 기술 스택
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto">
                현대 백엔드 개발에 필수적인 기술 스택을 탐색하고 최신 트렌드를 알아보세요
              </p>
              
              {/* 검색 바 */}
              <div className="max-w-xl mx-auto relative">
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
            </div>
          </div>
        </section>
        
        {/* 카테고리 및 필터 */}
        <section className="py-6 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 sticky top-16 z-10 backdrop-blur-sm">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              {/* 카테고리 필터 */}
              <div className="flex overflow-x-auto no-scrollbar pb-2 md:pb-0 -mx-1 px-1 md:mx-0 md:px-0">
                <div className="flex space-x-2">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center ${
                        selectedCategory === category.id
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                      }`}
                    >
                      <span className="mr-2">{category.icon}</span>
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
        <section className="py-10">
          <div className="container mx-auto px-4 md:px-6">
            {isLoading ? (
              // 로딩 상태 UI
              <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" : "space-y-6"}>
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="transform transition-all duration-500 animate-pulse">
                    <TechStackSkeleton />
                  </div>
                ))}
              </div>
            ) : filteredStacks.length > 0 ? (
              // 기술 스택 목록
              <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" : "space-y-6"}>
                {filteredStacks.map((stack) => (
                  <div key={stack.id} className="transform transition-all duration-500 hover:-translate-y-1">
                    <TechStackCard stack={stack} />
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

export default TechStacksPage;