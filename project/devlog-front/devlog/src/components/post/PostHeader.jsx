import React from 'react';
import { Calendar, Clock, User, ArrowLeft } from 'lucide-react';

const PostHeader = ({ post }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 py-16">
      <div className="container mx-auto px-4">
        <a 
          href="/posts" 
          className="inline-flex items-center mb-8 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          모든 포스트로 돌아가기
        </a>
        
        <div className="flex flex-wrap items-center gap-3 mb-4">
          {post.categories.map((category, index) => (
            <a 
              key={index}
              href={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
              className="px-3 py-1.5 text-sm bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
            >
              {category}
            </a>
          ))}
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
          {post.title}
        </h1>
        
        <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-4xl">
          {post.excerpt}
        </p>
        
        <div className="flex items-center flex-wrap gap-6">
          <div className="flex items-center">
            <img 
              src={post.author.avatar} 
              alt={post.author.name}
              className="w-12 h-12 rounded-full mr-4 border-2 border-white dark:border-gray-800 shadow-sm"
            />
            <div>
              <div className="font-medium text-gray-900 dark:text-white">
                {post.author.name}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {post.author.bio}
              </div>
            </div>
          </div>
          
          <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{formatDate(post.date)}</span>
          </div>
          
          <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
            <Clock className="w-4 h-4 mr-2" />
            <span>{post.readTime}분 소요</span>
          </div>
          
          <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
            <User className="w-4 h-4 mr-2" />
            <span>{post.viewCount.toLocaleString()}명 조회</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostHeader;