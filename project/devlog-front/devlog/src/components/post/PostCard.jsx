import React, { useState } from 'react';
import { Clock, ArrowUpRight, BookOpen, Heart } from 'lucide-react';

const PostCard = ({ post }) => {
  const { id, title, excerpt, coverImage, date, author, categories, readTime } = post;
  const [isHovered, setIsHovered] = useState(false);
  
  // 게시일 형식 변환
  const formattedDate = new Date(date).toLocaleDateString('ko-KR', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
  
  return (
    <div 
      className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full border border-gray-100/60 dark:border-gray-700/50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 호버 테두리 효과 */}
      <div className={`absolute inset-0 rounded-2xl border-2 border-blue-500/60 dark:border-blue-400/60 z-10 opacity-0 ${isHovered ? 'opacity-100' : ''} transition-opacity duration-300 pointer-events-none`}></div>
      
      {/* 상단 이미지 */}
      <a href={`/post/${id}`} className="block relative overflow-hidden">
        <div className="aspect-[16/9] bg-gray-100 dark:bg-gray-700 overflow-hidden">
          <img 
            src={coverImage || "/api/placeholder/400/225"} 
            alt={title}
            className={`w-full h-full object-cover transition-transform duration-700 ${isHovered ? 'scale-105 filter brightness-105' : 'scale-100'}`}
          />
          
          {/* 오버레이 그라데이션 */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>
          
          {/* 카테고리 태그 */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
            {categories && categories.slice(0, 2).map((category, index) => (
              <span 
                key={index} 
                className="px-3 py-1.5 text-xs font-medium bg-white/90 dark:bg-gray-900/90 text-blue-600 dark:text-blue-400 rounded-full backdrop-blur-sm shadow-sm transition-transform duration-300 transform"
                style={{ transform: isHovered ? 'translateY(0)' : 'translateY(-10px)', opacity: isHovered ? 1 : 0, transitionDelay: `${index * 50}ms` }}
              >
                {category}
              </span>
            ))}
          </div>
          
          {/* 우측 하단 화살표 아이콘 */}
          <div className={`absolute bottom-4 right-4 z-10 transition-transform duration-300 ${isHovered ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            <div className="p-2.5 bg-blue-600 rounded-full text-white shadow-lg">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </a>
      
      {/* 컨텐츠 */}
      <div className="p-6 flex flex-col flex-grow">
        {/* 주요 메타 정보 */}
        <div className="flex items-center justify-between mb-3 text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center">
            <Clock className="w-3.5 h-3.5 mr-1.5" />
            <span>{readTime} 분 읽기</span>
          </div>
          <div className="flex items-center">
            <BookOpen className="w-3.5 h-3.5 mr-1.5" />
            <span>{(Math.random() * 1000).toFixed(0)}+ 조회</span>
          </div>
        </div>
        
        {/* 제목 */}
        <h3 className="text-lg font-bold mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 dark:text-white">
          {title}
        </h3>
        
        {/* 요약 */}
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-5 line-clamp-2 flex-grow">
          {excerpt}
        </p>
        
        {/* 하단 메타 정보 */}
        <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700/50 flex items-center justify-between">
          {/* 작성자 정보 */}
          <div className="flex items-center">
            <div className="h-9 w-9 rounded-full overflow-hidden border-2 border-white dark:border-gray-800 shadow-sm mr-2">
              <img 
                src={author.avatar || "/api/placeholder/32/32"} 
                alt={author.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                {author.name}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {formattedDate}
              </div>
            </div>
          </div>
          
          {/* 좋아요 버튼 */}
          <button className="group/like flex items-center space-x-1 text-gray-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors">
            <Heart className="w-4 h-4 group-hover/like:fill-current" />
            <span className="text-xs">{(Math.random() * 100).toFixed(0)}</span>
          </button>
        </div>
      </div>
      
      {/* 전체 링크 오버레이 */}
      <a href={`/post/${id}`} className="absolute inset-0 z-20">
        <span className="sr-only">포스트 읽기: {title}</span>
      </a>
    </div>
  );
};

export default PostCard;