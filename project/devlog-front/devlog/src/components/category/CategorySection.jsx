import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const CategorySection = ({ categories }) => {
  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4 dark:text-white">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            카테고리 탐색
          </span>
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          백엔드 개발 분야의 다양한 주제를 탐색하고 전문 지식을 습득하세요
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.map((category) => (
          <a
            key={category.id}
            href={`/category/${category.slug}`}
            className="group relative overflow-hidden bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full border border-gray-100/60 dark:border-gray-700/40"
          >
            {/* 배경 효과 - 그라데이션 */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/3 to-indigo-500/3 dark:from-blue-500/5 dark:to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* 상단 아이콘과 포스트 수 */}
            <div className="p-6 relative">
              <div className="flex items-start justify-between mb-6">
                <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-900/20 group-hover:scale-110 transition-transform duration-500">
                  {category.icon}
                </div>
                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-full">
                  {category.postCount}개
                </span>
              </div>
              
              {/* 제목과 설명 */}
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {category.name}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-6">
                {category.description}
              </p>
              
              {/* 더 알아보기 버튼 */}
              <div className="mt-auto flex justify-end">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 
                      opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </div>
            
            {/* 호버 테두리 효과 */}
            <div className="absolute inset-0 border-2 border-blue-500/60 dark:border-blue-400/60 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;