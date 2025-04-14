import React from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';

// 기술 스택 이미지 경로 매핑 (실제 구현 시 이미지 파일이 필요합니다)
const techStackImages = {
  'Spring Boot': '/api/placeholder/80/80', // 실제 구현 시 '/images/tech/spring-boot.png'와 같이 변경
  'Docker & Kubernetes': '/api/placeholder/80/80', // 실제 구현 시 '/images/tech/docker-kubernetes.png'
  'MongoDB': '/api/placeholder/80/80', // 실제 구현 시 '/images/tech/mongodb.png'
};

const TechStackSection = ({ techStacks }) => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-3 dark:text-white">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                백엔드 기술 스택
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
              현대 백엔드 개발에 필수적인 기술 스택과 트렌드를 살펴보세요
            </p>
          </div>
          <a 
            href="/tech-stacks" 
            className="inline-flex items-center mt-4 md:mt-0 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium group"
          >
            모든 기술 스택 보기
            <ArrowRight className="ml-1 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {techStacks.map((stack) => (
            <div key={stack.id} className="group relative h-full">
              <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 h-full border border-gray-100/60 dark:border-gray-700/40 flex flex-col">
                {/* 상단 색상 액센트 바 */}
                <div className="h-1 w-full bg-gradient-to-r from-blue-500 to-indigo-600 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                
                {/* 헤더 섹션 */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-6">
                    {/* 기술 스택 이미지 */}
                    <div className="w-16 h-16 rounded-2xl overflow-hidden bg-white dark:bg-gray-700 p-2 shadow-sm border border-gray-100 dark:border-gray-600 flex items-center justify-center">
                      <img 
                        src={techStackImages[stack.name] || '/api/placeholder/64/64'} 
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
                  <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors dark:text-white">
                    {stack.name}
                  </h3>
                  
                  {/* 설명 */}
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-6">
                    {stack.description}
                  </p>
                </div>
                
                {/* 태그 섹션 */}
                <div className="px-6">
                  <div className="flex flex-wrap gap-2 mb-6">
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
                <div className="mt-auto p-6 pt-0 border-t border-gray-100 dark:border-gray-700/50">
                  <div className="flex items-center justify-between">
                    <a 
                      href={`/tech-stacks/${stack.id}`}
                      className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                    >
                      {stack.postCount}개의 글
                    </a>
                    
                    <a 
                      href={stack.documentationUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;