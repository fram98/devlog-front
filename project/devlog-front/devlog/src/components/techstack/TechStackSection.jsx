import React, { useState, useEffect } from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { techStackService } from '../../services/api';

const TechStackSection = () => {
  const [techStacks, setTechStacks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTechStacks = async () => {
      try {
        setIsLoading(true);
        // 백엔드 카테고리 기술 스택 데이터 가져오기
        const data = await techStackService.getTechStacksByCategory('framework', 1, 3);
        setTechStacks(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching tech stacks:', error);
        setError('기술 스택을 불러오는 중 오류가 발생했습니다.');
        setIsLoading(false);
      }
    };

    fetchTechStacks();
  }, []);

  // 로딩 스켈레톤 UI
  const TechStackSkeleton = () => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm border border-gray-100/60 dark:border-gray-700/40 h-full animate-pulse">
      <div className="h-1 w-full bg-gray-200 dark:bg-gray-700"></div>
      <div className="p-4 sm:p-6">
        <div className="flex items-start justify-between mb-4 sm:mb-6">
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg bg-gray-200 dark:bg-gray-700"></div>
          <div className="w-16 sm:w-20 h-6 rounded-full bg-gray-200 dark:bg-gray-700"></div>
        </div>
        <div className="h-5 sm:h-6 w-32 sm:w-36 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-3/4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4 sm:mb-6 w-1/2"></div>
      </div>
      <div className="px-4 sm:px-6">
        <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
          {[...Array(3)].map((_, idx) => (
            <div key={idx} className="h-6 w-16 rounded-md bg-gray-200 dark:bg-gray-700"></div>
          ))}
        </div>
      </div>
      <div className="p-4 sm:p-6 pt-0 border-t border-gray-100 dark:border-gray-700/50">
        <div className="flex items-center justify-between">
          <div className="h-5 w-20 sm:w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-5 w-16 sm:w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    </div>
  );

  // 기술 스택 이미지 경로 (실제 구현 시 변경 필요)
  const getTechStackImage = (stack) => {
    return `/api/placeholder/80/80`; // 실제 구현 시 `/images/tech/${stack.imageName}`와 같이 변경
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-12">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3 dark:text-white">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                백엔드 기술 스택
              </span>
            </h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-2xl">
              현대 백엔드 개발에 필수적인 기술 스택과 트렌드를 살펴보세요
            </p>
          </div>
          <a 
            href="/tech-stacks" 
            className="inline-flex items-center mt-4 md:mt-0 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium group text-sm sm:text-base"
          >
            모든 기술 스택 보기
            <ArrowRight className="ml-1 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {isLoading ? (
            // 로딩 스켈레톤
            <>
              {[...Array(3)].map((_, index) => (
                <TechStackSkeleton key={index} />
              ))}
            </>
          ) : error ? (
            // 오류 메시지
            <div className="col-span-1 md:col-span-3 py-8 sm:py-10 text-center">
              <p className="text-red-500 dark:text-red-400">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
              >
                다시 시도
              </button>
            </div>
          ) : (
            // 기술 스택 카드
            techStacks.map((stack) => (
              <div key={stack.id} className="group relative h-full">
                <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 h-full border border-gray-100/60 dark:border-gray-700/40 flex flex-col">
                  {/* 상단 색상 액센트 바 */}
                  <div className="h-1 w-full bg-gradient-to-r from-blue-500 to-indigo-600 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                  
                  {/* 헤더 섹션 */}
                  <div className="p-4 sm:p-6">
                    <div className="flex items-start justify-between mb-4 sm:mb-6">
                      {/* 기술 스택 이미지 */}
                      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl overflow-hidden bg-white dark:bg-gray-700 p-2 shadow-sm border border-gray-100 dark:border-gray-600 flex items-center justify-center">
                        <img 
                          src={getTechStackImage(stack)} 
                          alt={stack.name}
                          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      
                      {/* 타입 배지 */}
                      <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full">
                        {stack.type}
                      </span>
                    </div>
                    
                    {/* 제목 */}
                    <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors dark:text-white">
                      {stack.name}
                    </h3>
                    
                    {/* 설명 */}
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 sm:mb-6 line-clamp-3">
                      {stack.description}
                    </p>
                  </div>
                  
                  {/* 태그 섹션 */}
                  <div className="px-4 sm:px-6">
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                      {stack.tags.map((tag, idx) => (
                        <span 
                          key={idx} 
                          className="inline-block text-xs px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* 하단 액션 영역 */}
                  <div className="mt-auto p-4 sm:p-6 pt-0 border-t border-gray-100 dark:border-gray-700/50">
                    <div className="flex items-center justify-between">
                      <a 
                        href={`/tech-stacks/${stack.id}`}
                        className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                      >
                        {stack.articleCount || 0}개의 글
                      </a>
                      
                      <a 
                        href={stack.documentationUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-xs sm:text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        공식 문서
                        <ExternalLink className="ml-1 w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
                
                {/* 호버 테두리 효과 */}
                <div className="absolute inset-0 border-2 border-blue-500/60 dark:border-blue-400/60 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                
                {/* 링크 오버레이 */}
                <a href={`/tech-stacks/${stack.id}`} className="absolute inset-0">
                  <span className="sr-only">기술 스택 자세히 보기: {stack.name}</span>
                </a>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;