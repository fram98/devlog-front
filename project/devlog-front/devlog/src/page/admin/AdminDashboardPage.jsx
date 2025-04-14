import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import AdminSidebar from '../../components/admin/AdminSidebar';
import DashboardOverview from '../../components/admin/analytic/DashboardOverview';
import PostManagement from '../../components/admin/PostManagement';
import CategoryManagement from '../../components/admin/CategoryManagement';
import UserManagement from '../../components/admin/UserManagement';
import SettingsPanel from '../../components/admin/SettingsPanel';
import Analytics from '../../components/admin/Analytics';
import { LogOut, AlertCircle } from 'lucide-react';

const AdminDashboardPage = ({ isDarkMode, toggleDarkMode }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  
  // 인증 상태 확인 (실제로는 API 호출이나 토큰 확인)
  useEffect(() => {
    // 로컬 스토리지에서 관리자 토큰 확인 (예시)
    const adminToken = localStorage.getItem('adminToken');
    
    // 실제 환경에서는 서버 API로 토큰 유효성 검증
    if (adminToken) {
      setIsAuthenticated(true);
    }
    
    setIsLoading(false);
  }, []);
  
  // 로그아웃 처리
  const handleLogout = () => {
    // 로컬 스토리지에서 토큰 제거
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    
    // 로그인 페이지로 리다이렉트
    navigate('/admin/login');
  };
  
  // 알림 메시지 표시
  const showAlertMessage = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
    
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };
  
  // 로그인 상태가 아니면 로그인 페이지로 리다이렉트
  if (!isAuthenticated && !isLoading) {
    // 실제 구현에서는 로그인 페이지로 리다이렉트
    // navigate('/admin/login');
    
    // 예시용으로 로그인 화면 렌더링
    return (
      <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300">
        <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        
        <main className="flex-grow flex items-center justify-center pt-16">
          <div className="max-w-md w-full mx-4 p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              관리자 로그인
            </h1>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              // 예시용 임시 로그인
              localStorage.setItem('adminToken', 'example-token');
              setIsAuthenticated(true);
            }}>
              <div className="mb-4">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200">
                  이메일
                </label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="admin@example.com"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200">
                  비밀번호
                </label>
                <input 
                  type="password" 
                  id="password" 
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="••••••••"
                  required
                />
              </div>
              
              <button 
                type="submit"
                className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium transition-colors"
              >
                로그인
              </button>
            </form>
            
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 text-center">
              예시를 위해 아무 정보나 입력하고 로그인 버튼을 클릭하세요.
            </p>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }
  
  // 로딩 상태일 때
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="text-xl text-gray-500 dark:text-gray-400">
          <div className="w-12 h-12 border-4 border-gray-200 dark:border-gray-700 border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin mb-4 mx-auto"></div>
          로딩 중...
        </div>
      </div>
    );
  }
  
  // 활성 탭에 따른 컨텐츠 렌더링
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview showAlert={showAlertMessage} />;
      case 'posts':
        return <PostManagement showAlert={showAlertMessage} />;
      case 'categories':
        return <CategoryManagement showAlert={showAlertMessage} />;
      case 'users':
        return <UserManagement showAlert={showAlertMessage} />;
      case 'settings':
        return <SettingsPanel showAlert={showAlertMessage} />;
      case 'analytics':
        return <Analytics showAlert={showAlertMessage} />;
      default:
        return <DashboardOverview showAlert={showAlertMessage} />;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      {/* 알림 메시지 */}
      {showAlert && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md">
          <div className="mx-4 p-4 rounded-lg bg-red-100 dark:bg-red-900 border border-red-200 dark:border-red-800 shadow-md">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 mr-3 flex-shrink-0" />
              <span className="text-red-800 dark:text-red-200">{alertMessage}</span>
            </div>
          </div>
        </div>
      )}
      
      <main className="flex-grow pt-16 flex">
        {/* 사이드바 */}
        <AdminSidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          isDarkMode={isDarkMode}
        />
        
        {/* 메인 컨텐츠 */}
        <div className="flex-grow p-6 overflow-y-auto">
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {activeTab === 'dashboard' && '대시보드'}
              {activeTab === 'posts' && '게시물 관리'}
              {activeTab === 'categories' && '카테고리 관리'}
              {activeTab === 'users' && '사용자 관리'}
              {activeTab === 'settings' && '블로그 설정'}
              {activeTab === 'analytics' && '분석 및 통계'}
            </h1>
            
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <LogOut className="w-4 h-4 mr-2" />
              로그아웃
            </button>
          </div>
          
          {/* 탭에 따른 컨텐츠 */}
          {renderContent()}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminDashboardPage;