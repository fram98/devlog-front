import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import PostHeader from '../components/post/PostHeader';
import PostContent from '../components/post/PostContent';
import PostSidebar from '../components/post/PostSidebar';
import PostFooter from '../components/post/PostFooter';
import RelatedPosts from '../components/post/RelatedPosts';
import PostComments from '../components/post/PostComments';
import { mockPostData } from '../data/mockData';

const PostDetailPage = ({ isDarkMode, toggleDarkMode }) => {
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  
  useEffect(() => {
    // 실제 환경에서는 API로 게시물 데이터를 가져옴
    // 목업 데이터 사용
    setPost(mockPostData);
    setIsLoading(false);
    
    // 스크롤 위치 상단으로 조정
    window.scrollTo(0, 0);
  }, [id]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="text-xl text-gray-500 dark:text-gray-400">게시물을 불러오는 중...</div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300">
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="flex-grow pt-16">
        {/* 상단 네비게이션 */}
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <a href="/" className="hover:text-blue-600 dark:hover:text-blue-400">홈</a>
            <span className="mx-2">/</span>
            <a href={`/category/${post.categories[0].toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-blue-600 dark:hover:text-blue-400">
              {post.categories[0]}
            </a>
            <span className="mx-2">/</span>
            <span className="text-gray-900 dark:text-gray-200">{post.title}</span>
          </div>
        </div>
        
        {/* 게시물 헤더 */}
        <PostHeader post={post} />
        
        {/* 게시물 본문 + 사이드바 */}
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* 메인 콘텐츠 영역 */}
            <div className="w-full lg:w-2/3">
              <PostContent content={post.content} isDarkMode={isDarkMode} />
              <PostFooter post={post} />
              <PostComments comments={post.comments} />
            </div>
            
            {/* 사이드바 */}
            <div className="w-full lg:w-1/3">
              <PostSidebar post={post} />
            </div>
          </div>
        </div>
        
        {/* 관련 게시물 */}
        <div className="bg-gray-50 dark:bg-gray-800 py-16">
          <div className="container mx-auto px-4">
            <RelatedPosts posts={post.relatedPosts} />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PostDetailPage;