import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// 구현된 페이지 컴포넌트 임포트
import HomePage from './page/HomePage';
import CategoriesPage from './page/CategoriesPage';
import CategoryDetailPage from './page/CategoryDetailPage';
import TechStacksPage from './page/TechStacksPage';
import PostListPage from './page/PostListPage';
import PostDetailPage from './page/PostDetailPage'; 
import PostEditorPage from './page/PostEditorPage';
import AdminDashboardPage from './page/admin/AdminDashboardPage'; // 관리자 대시보드 페이지 추가
import AboutPage from './page/AboutPage';
import ScrollToTop from './utils/ScrollToTop';

// 애니메이션 및 글로벌 스타일 임포트
import './styles/globals.css';

// 프로그레스 바 설정
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
NProgress.configure({ 
  minimum: 0.3,
  easing: 'ease',
  speed: 500,
  showSpinner: false
});

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // 초기 다크 모드 설정
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
    
    // 페이지 초기 로딩 시 애니메이션
    const timer = setTimeout(() => {
      setIsLoading(false);
      NProgress.done();
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // 다크 모드 토글 함수
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
  
  // 페이지 전환 시 프로그레스 바 처리
  useEffect(() => {
    // 라우트 변경 시작 시 프로그레스 바 시작
    const handleRouteChangeStart = () => {
      NProgress.start();
    };

    // 라우트 변경 완료 시 프로그레스 바 완료
    const handleRouteChangeComplete = () => {
      NProgress.done();
    };

    // 라우트 변경 오류 시 프로그레스 바 완료
    const handleRouteChangeError = () => {
      NProgress.done();
    };

    // 이벤트 리스너 등록 (실제 구현 시 라우터 이벤트에 연결)
    window.addEventListener('routeChangeStart', handleRouteChangeStart);
    window.addEventListener('routeChangeComplete', handleRouteChangeComplete);
    window.addEventListener('routeChangeError', handleRouteChangeError);

    return () => {
      window.removeEventListener('routeChangeStart', handleRouteChangeStart);
      window.removeEventListener('routeChangeComplete', handleRouteChangeComplete);
      window.removeEventListener('routeChangeError', handleRouteChangeError);
    };
  }, []);
  
  // 로딩 화면
  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-900 z-50">
        <div className="flex flex-col items-center">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">
            DEV<span className="font-light">log</span>
          </div>
          <div className="w-12 h-12 border-4 border-gray-200 dark:border-gray-700 border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }
  
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <Routes>
          <Route 
            path="/" 
            element={<HomePage isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />} 
          />
          <Route 
            path="/categories" 
            element={<CategoriesPage isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />} 
          />
          <Route 
            path="/categories/:slug" 
            element={<CategoryDetailPage isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />} 
          />
          <Route 
            path="/tech-stacks" 
            element={<TechStacksPage isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />} 
          />
          <Route 
            path="/posts" 
            element={<PostListPage isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />} 
          />
          <Route 
            path="/post/:id" 
            element={<PostDetailPage isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />} 
          />
          <Route 
            path="/editor" 
            element={<PostEditorPage isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />} 
          />
          <Route 
            path="/editor/:id" 
            element={<PostEditorPage isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />} 
          />
          <Route 
            path="/about" 
            element={<AboutPage isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />} 
          />
          
          {/* 관리자 경로 */}
          <Route 
            path="/admin" 
            element={<AdminDashboardPage isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />} 
          />
          <Route 
            path="/admin/login" 
            element={<Navigate to="/admin" replace />} 
          />
          
          {/* 유효하지 않은 경로는 홈으로 리다이렉트 */}
          <Route 
            path="*" 
            element={<Navigate to="/" replace />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;