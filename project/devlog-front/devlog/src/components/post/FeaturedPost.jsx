import React from 'react';
import { Clock, Tag } from 'lucide-react';

const FeaturedPost = ({ post }) => {
  const { title, excerpt, coverImage, date, author, categories, readTime} = post;
  
  return (
    <div className="relative group rounded-2xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-2xl bg-gradient-to-br from-blue-600/90 to-indigo-700/90">
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src={coverImage || "/api/placeholder/1200/600"} 
          alt={title}
          className="w-full h-full object-cover opacity-20 dark:opacity-10 scale-105 transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      
      <div className="relative z-10 p-8 md:p-10 h-full flex flex-col">
        <div className="mb-auto">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-5">
            {categories && categories.map((category, index) => (
              <span 
                key={index} 
                className="inline-flex items-center px-3 py-1 text-xs font-medium bg-white/20 text-white rounded-full backdrop-blur-sm"
              >
                <Tag className="w-3 h-3 mr-1 stroke-[3]" />
                {category}
              </span>
            ))}
          </div>
          
          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white line-clamp-3 leading-tight">
            {title}
          </h2>
          
          {/* Excerpt */}
          <p className="text-base md:text-lg text-white/90 mb-6 line-clamp-3 leading-relaxed">
            {excerpt}
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-6 border-t border-white/20">
          {/* Author */}
          <div className="flex items-center mb-4 sm:mb-0">
            <img 
              src={author.avatar || "/api/placeholder/48/48"} 
              alt={author.name}
              className="w-10 h-10 rounded-full border-2 border-white/50 object-cover"
            />
            <span className="ml-3 text-white font-medium">{author.name}</span>
          </div>
          
          {/* Date & Read Time */}
          <div className="flex items-center text-sm text-white/80">
            <time dateTime={date}>
              {new Date(date).toLocaleDateString('ko-KR', { year: 'numeric', month: 'short', day: 'numeric' })}
            </time>
            <span className="mx-2">·</span>
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-1 stroke-[2.5]" />
              {readTime} 분 읽기
            </span>
          </div>
        </div>
      </div>
      
      {/* Overlay Link */}
      <a href={`/post/${post.id}`} className="absolute inset-0 z-20">
        <span className="sr-only">포스트 읽기: {title}</span>
      </a>
    </div>
  );
};

export default FeaturedPost;