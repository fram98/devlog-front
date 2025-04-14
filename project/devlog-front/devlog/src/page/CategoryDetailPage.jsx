import React, { useState, useEffect } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import PostCard from '../components/post/PostCard';
import { ChevronLeft, Filter, ArrowDown, ArrowUp} from 'lucide-react';

// 목업 데이터 (API 연동 시 교체)
const mockCategory = {
  id: 1,
  name: "데이터베이스",
  slug: "database",
  description: "SQL, NoSQL, 데이터 모델링, 성능 최적화 등에 관한 포스트",
  icon: "🗄️",
  postCount: 48
};

const mockPosts = [
  {
    id: 1,
    title: "PostgreSQL 성능 최적화: 인덱스 전략과 쿼리 튜닝",
    excerpt: "대용량 데이터베이스에서 필수적인 PostgreSQL 성능 최적화 기법과 인덱스 설계 전략을 알아봅니다.",
    coverImage: "/api/placeholder/400/225",
    date: "2025-04-02T12:30:00Z",
    author: {
      name: "박데이터",
      avatar: "/api/placeholder/64/64"
    },
    categories: ["데이터베이스", "PostgreSQL"],
    readTime: 10
  },
  {
    id: 2,
    title: "Redis 캐싱 전략으로 DB 부하 줄이기",
    excerpt: "트래픽이 많은 애플리케이션에서 Redis를 활용한 효과적인 캐싱 전략과 구현 방법을 소개합니다.",
    coverImage: "/api/placeholder/400/225",
    date: "2025-03-25T14:45:00Z",
    author: {
      name: "김캐시",
      avatar: "/api/placeholder/64/64"
    },
    categories: ["데이터베이스", "Redis", "캐싱"],
    readTime: 12
  },
  {
    id: 3,
    title: "MongoDB 스키마 디자인 패턴",
    excerpt: "NoSQL 데이터베이스인 MongoDB에서 효율적인 스키마 설계 패턴과 모델링 기법을 알아봅니다.",
    coverImage: "/api/placeholder/400/225",
    date: "2025-03-18T09:15:00Z",
    author: {
      name: "이노에스큐엘",
      avatar: "/api/placeholder/64/64"
    },
    categories: ["데이터베이스", "MongoDB", "NoSQL"],
    readTime: 15
  },
  {
    id: 4,
    title: "MySQL과 PostgreSQL 비교: 어떤 DB를 선택해야 할까?",
    excerpt: "두 가지 인기 있는 관계형 데이터베이스의 장단점과 적합한 사용 사례를 비교 분석합니다.",
    coverImage: "/api/placeholder/400/225",
    date: "2025-03-12T10:30:00Z",
    author: {
      name: "정데이터",
      avatar: "/api/placeholder/64/64"
    },
    categories: ["데이터베이스", "MySQL", "PostgreSQL"],
    readTime: 11
  },
  {
    id: 5,
    title: "JPA/Hibernate 성능 최적화 기법",
    excerpt: "Java 애플리케이션에서 JPA와 Hibernate를 사용할 때 발생하는 성능 이슈와 해결 방법을 알아봅니다.",
    coverImage: "/api/placeholder/400/225",
    date: "2025-03-05T16:20:00Z",
    author: {
      name: "한ORM",
      avatar: "/api/placeholder/64/64"
    },
    categories: ["데이터베이스", "JPA", "ORM", "Java"],
    readTime: 14
  },
  {
    id: 6,
    title: "시계열 데이터 처리를 위한 TimescaleDB 활용법",
    excerpt: "IoT나 모니터링 데이터와 같은 시계열 데이터 처리에 특화된 TimescaleDB 활용 방법을 소개합니다.",
    coverImage: "/api/placeholder/400/225",
    date: "2025-02-28T13:45:00Z",
    author: {
      name: "최시계열",
      avatar: "/api/placeholder/64/64"
    },
    categories: ["데이터베이스", "TimescaleDB", "시계열 데이터"],
    readTime: 13
  }
];

const mockSubCategories = [
  { id: 101, name: "SQL", postCount: 18 },
  { id: 102, name: "NoSQL", postCount: 12 },
  { id: 103, name: "ORM", postCount: 8 },
  { id: 104, name: "성능 최적화", postCount: 15 },
  { id: 105, name: "PostgreSQL", postCount: 10 },
  { id: 106, name: "MySQL", postCount: 8 },
  { id: 107, name: "Redis", postCount: 7 },
  { id: 108, name: "MongoDB", postCount: 6 }
];

const CategoryDetailPage = () => {
  // 실제 구현 시 URL 파라미터에서 카테고리 슬러그 추출
  // const slug = window.location.pathname.split('/').pop();
  
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [sortOption, setSortOption] = useState('latest'); // latest, popular, oldest
  const [selectedTags, setSelectedTags] = useState([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  // 서버에서 받아올 데이터
  const [category, setCategory] = useState(mockCategory);
  const [posts, setPosts] = useState(mockPosts);
  const [subCategories, setSubCategories] = useState(mockSubCategories);
  
  // 다크 모드 설정
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);
  
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };
  
  // 실제 구현 시 카테고리 로드 함수
  const loadCategoryData = async (slug, sort = 'latest', tags = []) => {
    try {
      // API 호출 (실제 구현 시 주석 해제)
      // let url = `/api/categories/${slug}?sort=${sort}`;
      // if (tags.length > 0) {
      //   url += `&tags=${tags.join(',')}`;
      // }
      // const response = await fetch(url);
      // const data = await response.json();
      // 
      // setCategory(data.category);
      // setPosts(data.posts);
      // setSubCategories(data.subCategories);
      
      // 목업 데이터 사용 (실제 구현 시 제거)
      setCategory(mockCategory);
      setPosts(mockPosts);
      setSubCategories(mockSubCategories);
    } catch (error) {
      console.error('카테고리 데이터를 불러오는 중 오류 발생:', error);
    }
  };
  
  // 정렬 변경 시 서버에서 데이터 다시 로드
  useEffect(() => {
    loadCategoryData('database', sortOption, selectedTags);
  }, [sortOption, selectedTags]);
  
  // 태그 토글
  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  
  // 필터 초기화
  const resetFilters = () => {
    setSelectedTags([]);
    setSortOption('latest');
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300">
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="flex-grow pt-16">
        {/* 카테고리 헤더 */}
        <section className="py-12 bg-gradient-to-b from-blue-50 to-white dark:from-gray-800 dark:to-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <a 
                href="/categories" 
                className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-6"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                모든 카테고리
              </a>
              
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 flex items-center justify-center bg-blue-100 dark:bg-blue-900 rounded-lg text-3xl mr-5">
                  {category.icon}
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold dark:text-white">
                    {category.name}
                  </h1>
                  <div className="flex items-center mt-2">
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      포스트 {category.postCount}개
                    </span>
                  </div>
                </div>
              </div>
              
              <p className="text-lg text-gray-600 dark:text-gray-300 mt-4 mb-6">
                {category.description}
              </p>
              
              {/* 정렬 옵션 (데스크톱) */}
              <div className="hidden md:flex items-center mt-8 justify-end">
                <span className="text-sm text-gray-600 dark:text-gray-400 mr-3">정렬:</span>
                <div className="flex rounded-lg overflow-hidden">
                  <button
                    onClick={() => setSortOption('latest')}
                    className={`px-4 py-2 text-sm ${
                      sortOption === 'latest'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    최신순
                  </button>
                  <button
                    onClick={() => setSortOption('popular')}
                    className={`px-4 py-2 text-sm border-l-0 ${
                      sortOption === 'popular'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    인기순
                  </button>
                  <button
                    onClick={() => setSortOption('oldest')}
                    className={`px-4 py-2 text-sm border-l-0 ${
                      sortOption === 'oldest'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    오래된순
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* 필터 및 콘텐츠 */}
        <section className="py-10">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* 사이드바 */}
                <div className="lg:w-64 shrink-0">
                  {/* 모바일 필터 토글 */}
                  <div className="lg:hidden mb-6">
                    <button
                      onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                      className="w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm"
                    >
                      <div className="flex items-center">
                        <Filter className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" />
                        <span className="font-medium text-gray-800 dark:text-gray-200">필터 및 정렬</span>
                      </div>
                      {mobileFiltersOpen ? 
                        <ArrowUp className="w-5 h-5 text-gray-500 dark:text-gray-400" /> : 
                        <ArrowDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                      }
                    </button>
                  </div>
                  
                  {/* 필터 패널 (모바일에서는 토글) */}
                  <div className={`${mobileFiltersOpen ? 'block' : 'hidden'} lg:block`}>
                    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm p-5">
                      <h3 className="text-lg font-medium mb-4 dark:text-white">하위 카테고리</h3>
                      <div className="space-y-2">
                        {subCategories.map((subcat) => (
                          <button
                            key={subcat.id}
                            onClick={() => toggleTag(subcat.name)}
                            className={`flex items-center justify-between w-full px-3 py-2 text-sm rounded-lg transition-colors text-left ${
                              selectedTags.includes(subcat.name)
                                ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                                : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                            }`}
                          >
                            <span>{subcat.name}</span>
                            <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full">
                              {subcat.postCount}
                            </span>
                          </button>
                        ))}
                      </div>
                      
                      {/* 모바일용 정렬 옵션 */}
                      <div className="mt-6 lg:hidden">
                        <h3 className="text-lg font-medium mb-4 dark:text-white">정렬</h3>
                        <div className="space-y-2">
                          <button
                            onClick={() => setSortOption('latest')}
                            className={`w-full px-3 py-2 text-sm rounded-lg transition-colors text-left ${
                              sortOption === 'latest'
                                ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                                : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                            }`}
                          >
                            최신순
                          </button>
                          <button
                            onClick={() => setSortOption('popular')}
                            className={`w-full px-3 py-2 text-sm rounded-lg transition-colors text-left ${
                              sortOption === 'popular'
                                ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                                : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                            }`}
                          >
                            인기순
                          </button>
                          <button
                            onClick={() => setSortOption('oldest')}
                            className={`w-full px-3 py-2 text-sm rounded-lg transition-colors text-left ${
                              sortOption === 'oldest'
                                ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                                : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                            }`}
                          >
                            오래된순
                          </button>
                        </div>
                      </div>
                      
                      {/* 필터 초기화 */}
                      {(selectedTags.length > 0 || sortOption !== 'latest') && (
                        <button
                          onClick={resetFilters}
                          className="mt-4 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                        >
                          필터 초기화
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* 포스트 그리드 */}
                <div className="flex-1">
                  {/* 선택된 태그 표시 */}
                  {selectedTags.length > 0 && (
                    <div className="mb-6 flex flex-wrap items-center gap-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">선택된 필터:</span>
                      {selectedTags.map((tag) => (
                        <span 
                          key={tag}
                          className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                        >
                          {tag}
                          <button
                            onClick={() => toggleTag(tag)}
                            className="ml-1 text-blue-700 dark:text-blue-300 hover:text-blue-900 dark:hover:text-blue-100"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                      <button
                        onClick={() => setSelectedTags([])}
                        className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 ml-2"
                      >
                        모두 지우기
                      </button>
                    </div>
                  )}
                  
                  {/* 포스트 카운트 */}
                  <div className="mb-6">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {posts.length}개의 포스트
                    </p>
                  </div>
                  
                  {/* 포스트 그리드 */}
                  {posts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {posts.map((post) => (
                        <PostCard key={post.id} post={post} />
                      ))}
                    </div>
                  ) : (
                    <div className="py-12 text-center bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                      <p className="text-gray-600 dark:text-gray-300 mb-3">선택한 필터에 맞는 포스트가 없습니다.</p>
                      <button 
                        onClick={resetFilters}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                      >
                        필터 초기화
                      </button>
                    </div>
                  )}
                  
                  {/* 더 보기 버튼 (페이지네이션 대신) */}
                  {posts.length > 0 && (
                    <div className="mt-10 text-center">
                      <a
                        href="#"
                        className="inline-block px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        더 보기
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoryDetailPage;