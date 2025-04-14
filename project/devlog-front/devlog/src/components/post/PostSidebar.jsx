import React, { useState, useEffect } from 'react';
import { Share2, Bookmark, ThumbsUp } from 'lucide-react';

const PostSidebar = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likeCount);
  
  useEffect(() => {
    // 좋아요, 북마크 상태 로드
    const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
    setIsLiked(likedPosts.includes(post.id));
    
    const bookmarkedPosts = JSON.parse(localStorage.getItem('bookmarkedPosts') || '[]');
    setIsBookmarked(bookmarkedPosts.includes(post.id));
  }, [post.id]);
  
  const handleLike = () => {
    const newLikeState = !isLiked;
    setIsLiked(newLikeState);
    
    // 로컬 스토리지에 좋아요 상태 저장 (실제로는 API 호출)
    const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
    if (newLikeState) {
      likedPosts.push(post.id);
      setLikeCount(likeCount + 1);
    } else {
      const index = likedPosts.indexOf(post.id);
      if (index > -1) {
        likedPosts.splice(index, 1);
        setLikeCount(likeCount - 1);
      }
    }
    localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
  };
  
  const handleBookmark = () => {
    const newBookmarkState = !isBookmarked;
    setIsBookmarked(newBookmarkState);
    
    // 로컬 스토리지에 북마크 상태 저장 (실제로는 API 호출)
    const bookmarkedPosts = JSON.parse(localStorage.getItem('bookmarkedPosts') || '[]');
    if (newBookmarkState) {
      bookmarkedPosts.push(post.id);
    } else {
      const index = bookmarkedPosts.indexOf(post.id);
      if (index > -1) {
        bookmarkedPosts.splice(index, 1);
      }
    }
    localStorage.setItem('bookmarkedPosts', JSON.stringify(bookmarkedPosts));
  };
  
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href
        });
      } catch (error) {
        console.log('공유에 실패했습니다:', error);
      }
    } else {
      // 모바일이 아닌 환경에서는 URL을 클립보드에 복사
      navigator.clipboard.writeText(window.location.href);
      alert('URL이 클립보드에 복사되었습니다!');
    }
  };
  
  // 목차 생성을 위한 헤딩 추출
  const extractHeadings = (content) => {
    const headings = [];
    const headingRegex = /^(#{1,3})\s+(.+)$/gm;
    let match;
    
    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2];
      const id = text.toLowerCase().replace(/\s+/g, '-');
      
      headings.push({
        level,
        text,
        id
      });
    }
    
    return headings;
  };
  
  const postHeadings = extractHeadings(post.content);
  
  return (
    <div className="space-y-8 sticky top-24">
      {/* 상호작용 버튼 */}
      <div className="flex flex-col sm:flex-row lg:flex-col gap-4 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
        <button
          onClick={handleLike}
          className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg border ${
            isLiked 
              ? 'bg-blue-50 border-blue-200 text-blue-600 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-400' 
              : 'bg-white border-gray-200 text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300'
          } hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors`}
        >
          <ThumbsUp className={`w-5 h-5 ${isLiked ? 'fill-blue-600 dark:fill-blue-400' : ''}`} />
          <span className="font-medium">{likeCount.toLocaleString()}</span>
        </button>
        
        <button
          onClick={handleBookmark}
          className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg border ${
            isBookmarked 
              ? 'bg-blue-50 border-blue-200 text-blue-600 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-400' 
              : 'bg-white border-gray-200 text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300'
          } hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors`}
        >
          <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-blue-600 dark:fill-blue-400' : ''}`} />
          <span className="font-medium">북마크</span>
        </button>
        
        <button
          onClick={handleShare}
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg border bg-white border-gray-200 text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
        >
          <Share2 className="w-5 h-5" />
          <span className="font-medium">공유</span>
        </button>
      </div>
      
      {/* 목차 */}
      {postHeadings.length > 0 && (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">목차</h3>
          <nav className="space-y-2">
            {postHeadings.map((heading, index) => (
              <a
                key={index}
                href={`#${heading.id}`}
                className={`block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 ${
                  heading.level === 1 ? 'font-medium' : 
                  heading.level === 2 ? 'pl-3 text-sm' : 
                  'pl-6 text-sm text-gray-600 dark:text-gray-400'
                }`}
              >
                {heading.text}
              </a>
            ))}
          </nav>
        </div>
      )}
      
      {/* 태그 */}
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">태그</h3>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag, index) => (
            <a
              key={index}
              href={`/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
              className="px-3 py-1.5 text-sm bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 rounded-full hover:bg-blue-100 hover:text-blue-700 dark:hover:bg-blue-900/30 dark:hover:text-blue-400 transition-colors"
            >
              #{tag}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostSidebar;