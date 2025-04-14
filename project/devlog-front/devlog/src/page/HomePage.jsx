import React, { useState, useEffect } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import FeaturedPost from '../components/post/FeaturedPost';
import PostCard from '../components/post/PostCard';
import Newsletter from '../components/common/Newsletter';
import CategorySection from '../components/category/CategorySection';
import TechStackSection from '../components/techstack/TechStackSection';
import { ArrowRight } from 'lucide-react';

// 실제 환경에서는 API로 데이터를 가져옵니다
const mockFeaturedPost = {
  id: 1,
  title: "마이크로서비스 아키텍처: 설계부터 배포까지",
  excerpt: "복잡한 애플리케이션을 위한 마이크로서비스 아키텍처의 철학, 설계 원칙, 실제 구현 방법을 알아봅니다.",
  coverImage: "https://i.namu.wiki/i/eg_6zDyuZMqWahu7RJ1KLYoIS-jZB0C4KN8Te26MzlvzdC2T-rymgBRqIPB2pCSrpbnZUq-8g3iEu0gyzKUVRNtPg2EZAuNu_osIIvMvVt0G3bsNhl3rfNi-rPFgNIQ_bpsymeIpDuKwwPF2qvXBzgUrcziYGQwrNFDWWWifhQ4.svg",
  date: "2025-04-05T09:00:00Z",
  author: {
    name: "김개발",
    avatar: "https://avatars.githubusercontent.com/u/111568619?v=4"
  },
  categories: ["아키텍처", "마이크로서비스"],
  readTime: 15
};

const mockPosts = [
  {
    id: 2,
    title: "PostgreSQL 성능 최적화: 인덱스 전략과 쿼리 튜닝",
    excerpt: "대용량 데이터베이스에서 필수적인 PostgreSQL 성능 최적화 기법을 알아봅니다.",
    coverImage: "https://i.namu.wiki/i/eg_6zDyuZMqWahu7RJ1KLYVMaHtusETQmKys7gMhh8wf4FTjqNMoVCBqpKzpVL9FmBQCpseCaBax0DNASF6hwkhwTJnjsS02F1uZPIMGTWE3F1As3Pn7LPh67rJYcl5aqUk8qUL1RJqHgG9b_1iV7IJRHB1h9Lg68sa58Odp7_g.svg",
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
    coverImage: "https://i.namu.wiki/i/eg_6zDyuZMqWahu7RJ1KLYoIS-jZB0C4KN8Te26MzlvzdC2T-rymgBRqIPB2pCSrpbnZUq-8g3iEu0gyzKUVRNtPg2EZAuNu_osIIvMvVt0G3bsNhl3rfNi-rPFgNIQ_bpsymeIpDuKwwPF2qvXBzgUrcziYGQwrNFDWWWifhQ4.svg",
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
    coverImage: "https://us.ovhcloud.com/sites/default/files/styles/desktop_full_width/public/2024-01/kafka.webp",
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
    coverImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/GraphQL_Logo.svg/500px-GraphQL_Logo.svg.png",
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
    coverImage: "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FNyGQe%2FbtsIdOoWC8W%2FmythKXG4xkyW5GGIoAK0Ek%2Fimg.png",
    date: "2025-03-18T15:20:00Z",
    author: {
      name: "김스프링",
      avatar: "/api/placeholder/64/64"
    },
    categories: ["Spring", "Java"],
    readTime: 10
  },
  {
    id: 8,
    title: "Spring Boot 3.0 새로운 기능과 마이그레이션 가이드",
    excerpt: "Spring Boot 최신 버전의 주요 변경사항과 기존 애플리케이션 마이그레이션 전략을 소개합니다.",
    coverImage: "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FNyGQe%2FbtsIdOoWC8W%2FmythKXG4xkyW5GGIoAK0Ek%2Fimg.png",
    date: "2025-03-18T15:20:00Z",
    author: {
      name: "김스프링",
      avatar: "/api/placeholder/64/64"
    },
    categories: ["Spring", "Java"],
    readTime: 10
  },

];

const mockCategories = [
  {
    id: 1,
    name: "데이터베이스",
    slug: "database",
    description: "SQL, NoSQL, 데이터 모델링, 성능 최적화 등",
    icon: <div className="w-12 h-12 flex items-center justify-center bg-blue-100 dark:bg-blue-900 rounded-lg">🗄️</div>,
    postCount: 48
  },
  {
    id: 2,
    name: "아키텍처",
    slug: "architecture",
    description: "시스템 설계, 마이크로서비스, 도메인 주도 설계",
    icon: <div className="w-12 h-12 flex items-center justify-center bg-blue-100 dark:bg-blue-900 rounded-lg">🏗️</div>,
    postCount: 35
  },
  {
    id: 3,
    name: "DevOps",
    slug: "devops",
    description: "CI/CD, 컨테이너화, 클라우드 인프라, 자동화",
    icon: <div className="w-12 h-12 flex items-center justify-center bg-blue-100 dark:bg-blue-900 rounded-lg">🔄</div>,
    postCount: 41
  },
  {
    id: 4,
    name: "API 설계",
    slug: "api-design",
    description: "RESTful API, GraphQL, gRPC, API 보안",
    icon: <div className="w-12 h-12 flex items-center justify-center bg-blue-100 dark:bg-blue-900 rounded-lg">🔌</div>,
    postCount: 29
  },
  {
    id: 5,
    name: "보안",
    slug: "security",
    description: "인증, 권한 부여, 암호화, 취약점 관리",
    icon: <div className="w-12 h-12 flex items-center justify-center bg-blue-100 dark:bg-blue-900 rounded-lg">🔒</div>,
    postCount: 32
  },
  {
    id: 6,
    name: "성능 최적화",
    slug: "performance",
    description: "프로파일링, 부하 테스트, 캐싱, 스케일링",
    icon: <div className="w-12 h-12 flex items-center justify-center bg-blue-100 dark:bg-blue-900 rounded-lg">⚡</div>,
    postCount: 26
  },
  {
    id: 7,
    name: "테스트",
    slug: "testing",
    description: "단위 테스트, 통합 테스트, 테스트 자동화",
    icon: <div className="w-12 h-12 flex items-center justify-center bg-blue-100 dark:bg-blue-900 rounded-lg">🧪</div>,
    postCount: 30
  },
  {
    id: 8,
    name: "클라우드",
    slug: "cloud",
    description: "AWS, Azure, GCP, 서버리스, 클라우드 아키텍처",
    icon: <div className="w-12 h-12 flex items-center justify-center bg-blue-100 dark:bg-blue-900 rounded-lg">☁️</div>,
    postCount: 37
  }
];

const mockTechStacks = [
  {
    id: 1,
    name: "Spring Boot",
    description: "자바 기반 강력한 백엔드 프레임워크로, 마이크로서비스 아키텍처와 클라우드 네이티브 애플리케이션 개발에 적합합니다.",
    icon: "🍃",
    type: "프레임워크",
    tags: ["Java", "Web", "API", "JPA"],
    articleCount: 42,
    documentationUrl: "https://spring.io/projects/spring-boot"
  },
  {
    id: 2,
    name: "Docker & Kubernetes",
    description: "컨테이너화 및 오케스트레이션 도구로, 확장 가능하고 안정적인 애플리케이션 배포 환경을 제공합니다.",
    icon: "🐳",
    type: "DevOps",
    tags: ["컨테이너", "오케스트레이션", "CI/CD", "인프라"],
    articleCount: 36,
    documentationUrl: "https://kubernetes.io/docs/home/"
  },
  {
    id: 3,
    name: "MongoDB",
    description: "유연한 스키마를 제공하는 대표적인 NoSQL 데이터베이스로, 대용량 데이터 처리에 적합합니다.",
    icon: "🍃",
    type: "데이터베이스",
    tags: ["NoSQL", "Document DB", "Schema-less", "스케일링"],
    articleCount: 29,
    documentationUrl: "https://docs.mongodb.com/"
  }
];

const HomePage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  useEffect(() => {
    // 시스템 설정이나 사용자 선호도에 따라 초기 테마 설정
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
  
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300">
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="pt-12 lg:pt-20 pb-20 bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto mb-16 text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600">
                백엔드 개발의 모든 것
              </h1>
              <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
                최신 백엔드 기술, 아키텍처 및 모범 사례에 대한 심층적인 통찰력을 발견하세요
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/categories" 
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                >
                  탐색 시작하기
                </a>
                <a 
                  href="/tech-stacks" 
                  className="px-8 py-3 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 font-medium rounded-lg border border-blue-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-gray-600 transition-colors"
                >
                  기술 스택 보기
                </a>
              </div>
            </div>
            
            {/* Featured Post */}
            <div className="max-w-5xl mx-auto">
              <FeaturedPost post={mockFeaturedPost} />
            </div>
          </div>
        </section>
        
        {/* Latest Posts */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
              <div>
                <h2 className="text-3xl font-bold mb-2 dark:text-white">최신 포스트</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  백엔드 개발자를 위한 최신 트렌드와 심층 기술 분석
                </p>
              </div>
              <a 
                href="/posts" 
                className="inline-flex items-center mt-4 md:mt-0 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
              >
                모든 포스트 보기
                <ArrowRight className="ml-1 w-4 h-4" />
              </a>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mockPosts.slice(0, 6).map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Categories */}
        <section className="py-12 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <CategorySection categories={mockCategories} />
          </div>
        </section>
        
        {/* TechStacks */}
        <TechStackSection techStacks={mockTechStacks} />
        
        {/* Newsletter */}
        <section className="py-16 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
          <div className="container mx-auto px-4">
            <Newsletter />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;