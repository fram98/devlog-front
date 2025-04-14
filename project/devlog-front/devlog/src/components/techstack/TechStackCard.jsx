import React, { useState } from 'react';
import { ExternalLink, ChevronRight, BookOpen, Code } from 'lucide-react';

const TechStackCard = ({ stack }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // 이 컴포넌트는 기술 스택 페이지에서 사용됩니다
  const { 
    id, 
    name, 
    description, 
    icon, 
    type, 
    tags, 
    articleCount, 
    documentationUrl,
    isEnterprise = false, // 엔터프라이즈 기술 여부
    trend = 'rising' // rising, stable, declining (옵션)
  } = stack;

  // 기술 스택 이미지 경로 (실제 구현 시 변경 필요)
  const imagePath = `/api/placeholder/64/64`; // 실제 구현 시 `/images/tech/${id}.png` 같은 형태로 변경

  // 트렌드에 따른 UI (옵션)
  const getTrendUI = () => {
    switch (trend) {
      case 'rising':
        return (
          <div className="px-2 py-1 rounded-md bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs flex items-center">
            <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 17L12 10L19 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            인기 상승
          </div>
        );
      case 'stable':
        return (
          <div className="px-2 py-1 rounded-md bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs flex items-center">
            <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            안정적
          </div>
        );
      case 'declining':
        return (
          <div className="px-2 py-1 rounded-md bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 text-xs flex items-center">
            <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 7L12 14L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            인기 하락
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div 
      className="relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-100/60 dark:border-gray-700/40 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 배경 그라데이션 효과 */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 dark:from-blue-500/10 dark:to-indigo-500/10 transition-opacity duration-500 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      ></div>
      
      {/* 테두리 효과 */}
      <div 
        className={`absolute inset-0 rounded-2xl border-2 border-blue-500/60 dark:border-blue-400/60 transition-opacity duration-300 pointer-events-none ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      ></div>
      
      {/* 상단 헤더 */}
      <div className="relative p-6 pb-0">
        <div className="flex items-start justify-between">
          {/* 이미지 컨테이너 */}
          <div className="w-16 h-16 rounded-xl flex items-center justify-center bg-white dark:bg-gray-700 p-2 shadow-sm border border-gray-100 dark:border-gray-600 overflow-hidden">
            <img 
              src={imagePath} 
              alt={name}
              className={`w-full h-full object-contain transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`}
            />
          </div>
          
          {/* 타입 뱃지 */}
          <div className="flex items-center gap-2">
            {isEnterprise && (
              <div className="px-2 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-xs flex items-center">
                엔터프라이즈
              </div>
            )}
            <div className="px-2 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs">
              {type}
            </div>
          </div>
        </div>
        
        {/* 제목 & 트렌드 */}
        <div className="mt-5 flex items-start justify-between">
          <h3 className="text-xl font-bold dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {name}
          </h3>
          {getTrendUI()}
        </div>
      </div>
      
      {/* 메인 컨텐츠 */}
      <div className="p-6 flex-grow">
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-6">
          {description}
        </p>
        
        {/* 태그 */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag, idx) => (
            <span 
              key={idx} 
              className="inline-block text-xs px-2 py-1 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      {/* 하단 액션 영역 */}
      <div className="p-6 pt-0 border-t border-gray-100 dark:border-gray-700/50 mt-6">
        <div className="flex items-center justify-between">
          <a 
            href={`/tech-stacks/${id}`}
            className="flex items-center text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium group/link"
          >
            <BookOpen className="w-4 h-4 mr-1.5" />
            <span>관련 글 {articleCount}개</span>
            <ChevronRight className={`w-4 h-4 ml-1 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
          </a>
          
          <a 
            href={documentationUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <Code className="w-4 h-4 mr-1.5" />
            <span>공식 문서</span>
            <ExternalLink className="ml-1 w-3 h-3" />
          </a>
        </div>
      </div>
      
      {/* 링크 오버레이 */}
      <a href={`/tech-stacks/${id}`} className="absolute inset-0 z-10">
        <span className="sr-only">기술 스택 자세히 보기: {name}</span>
      </a>
    </div>
  );
};

export default TechStackCard;