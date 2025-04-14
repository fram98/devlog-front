import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  FolderTree, 
  Users, 
  Settings, 
  BarChart2,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

const AdminSidebar = ({ activeTab, setActiveTab, isDarkMode }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  
  const menuItems = [
    { id: 'dashboard', label: '대시보드', icon: <LayoutDashboard /> },
    { id: 'posts', label: '게시물 관리', icon: <FileText /> },
    { id: 'categories', label: '카테고리 관리', icon: <FolderTree /> },
    { id: 'users', label: '사용자 관리', icon: <Users /> },
    { id: 'analytics', label: '분석 및 통계', icon: <BarChart2 /> },
    { id: 'settings', label: '블로그 설정', icon: <Settings /> },
  ];
  
  return (
    <div className={`${isCollapsed ? 'w-20' : 'w-64'} h-[calc(100vh-64px)] border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex-shrink-0 transition-all duration-300 ease-in-out relative`}>
      {/* 사이드바 헤더 */}
      <div className="h-16 flex items-center justify-center border-b border-gray-200 dark:border-gray-700">
        {!isCollapsed ? (
          <div className="font-bold text-xl text-blue-600 dark:text-blue-400">
            관리자 패널
          </div>
        ) : (
          <div className="font-bold text-xl text-blue-600 dark:text-blue-400">
            👨‍💻
          </div>
        )}
      </div>
      
      {/* 접기/펼치기 버튼 */}
      <button 
        onClick={toggleSidebar}
        className="absolute -right-3 top-20 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full p-1 shadow-md"
      >
        {isCollapsed ? (
          <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        )}
      </button>
      
      {/* 메뉴 항목 */}
      <div className="py-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'justify-start'} px-4 py-3 mb-1 ${
              activeTab === item.id 
                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-r-4 border-blue-600 dark:border-blue-400' 
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            } transition-colors`}
            onClick={() => setActiveTab(item.id)}
          >
            <div className={`${isCollapsed ? '' : 'mr-4'}`}>
              {React.cloneElement(item.icon, { 
                size: isCollapsed ? 24 : 20,
                className: activeTab === item.id 
                  ? 'text-blue-600 dark:text-blue-400' 
                  : 'text-gray-500 dark:text-gray-400'
              })}
            </div>
            
            {!isCollapsed && (
              <span className="font-medium">{item.label}</span>
            )}
          </button>
        ))}
      </div>
      
      {/* 하단 정보 */}
      {!isCollapsed && (
        <div className="absolute bottom-0 p-4 w-full border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <img
              src="/api/placeholder/40/40" 
              alt="Admin Avatar"
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <div className="font-medium text-gray-900 dark:text-white">
                관리자
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                admin@example.com
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSidebar;