import React, { useState, useEffect } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import FeaturedPost from '../components/post/FeaturedPost';
import PostCard from '../components/post/PostCard';
import Newsletter from '../components/common/Newsletter';
import CategorySection from '../components/category/CategorySection';
import TechStackSection from '../components/techstack/TechStackSection';
import { ArrowRight } from 'lucide-react';

import { postService, categoryService, techStackService } from '../services/api';

const HomePage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [categories, setCategories] = useState([]);
  const [techStacks, setTechStacks] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [featuredPost, setFeaturedPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Initialize dark mode from user preferences or system settings
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);
  
  useEffect(() => {
    // Data fetching using the service layer
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Use Promise.all to fetch data in parallel
        const [categoriesData, techStacksData, recentPostsData, featuredPostData] = await Promise.all([
          categoryService.getAllCategories(),
          techStackService.getAllTechStacks(),
          postService.getRecentPosts(),
          postService.getFeaturedPost()
        ]);
        
        setCategories(categoriesData);
        setTechStacks(techStacksData);
        setRecentPosts(recentPostsData);
        setFeaturedPost(featuredPostData);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
        setIsLoading(false);
      }
    };
    
    fetchData();
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
  
  // Error state UI
  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300">
        <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">Error Loading Data</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  // Loading state UI
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300">
        <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-gray-200 dark:border-gray-700 border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-700 dark:text-gray-300">Loading content...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Prepare categories for CategorySection component
  const formattedCategories = categories.map(category => ({
    ...category,
    icon: (
      <div className="w-12 h-12 flex items-center justify-center bg-blue-100 dark:bg-blue-900 rounded-lg">
        {category.icon}
      </div>
    )
  }));
  
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
            {featuredPost && (
              <div className="max-w-5xl mx-auto">
                <FeaturedPost post={featuredPost} />
              </div>
            )}
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
              {recentPosts.slice(0, 6).map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Categories */}
        <section className="py-12 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <CategorySection categories={formattedCategories} />
          </div>
        </section>
        
        {/* TechStacks */}
        <TechStackSection techStacks={techStacks} />
        
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