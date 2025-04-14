import React, { useState } from 'react';
import { ThumbsUp, MessageCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

const Comment = ({ comment, isReply = false }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(comment.likes);
  const [showReplyForm, setShowReplyForm] = useState(false);
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true, locale: ko });
  };
  
  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };
  
  const toggleReplyForm = () => {
    setShowReplyForm(!showReplyForm);
  };
  
  return (
    <div className={`${isReply ? 'ml-12 mt-4' : 'border-t border-gray-200 dark:border-gray-700 py-6'}`}>
      <div className="flex items-start gap-4">
        <img 
          src={comment.author.avatar} 
          alt={comment.author.name}
          className="w-10 h-10 rounded-full"
        />
        
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className={`font-medium ${comment.isAuthor ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'}`}>
              {comment.author.name}
              {comment.isAuthor && <span className="ml-2 text-xs bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 px-2 py-0.5 rounded-full">작성자</span>}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {formatDate(comment.date)}
            </span>
          </div>
          
          <div className="mt-2 text-gray-700 dark:text-gray-300">
            {comment.content}
          </div>
          
          <div className="mt-3 flex items-center gap-4">
            <button 
              onClick={handleLike}
              className={`flex items-center gap-1 text-sm ${
                isLiked 
                  ? 'text-blue-600 dark:text-blue-400' 
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              <ThumbsUp className="w-4 h-4" />
              <span>{likeCount}</span>
            </button>
            
            <button 
              onClick={toggleReplyForm}
              className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400"
            >
              <MessageCircle className="w-4 h-4" />
              <span>답글</span>
            </button>
          </div>
          
          {/* 답글 폼 */}
          {showReplyForm && (
            <div className="mt-4">
              <textarea 
                placeholder="답글을 작성하세요..."
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                rows={3}
              />
              <div className="mt-2 flex justify-end gap-2">
                <button 
                  onClick={toggleReplyForm}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  취소
                </button>
                <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                  답글 작성
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const PostComments = ({ comments }) => {
  const [newComment, setNewComment] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // 실제로는 API 호출을 통해 댓글을 서버에 전송
    console.log('댓글 작성:', newComment);
    setNewComment('');
  };
  
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        댓글 {comments.length}개
      </h2>
      
      {/* 댓글 작성 폼 */}
      <form onSubmit={handleSubmit} className="mb-8">
        <textarea 
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="댓글을 작성하세요..."
          className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          rows={4}
          required
        />
        <div className="mt-3 flex justify-end">
          <button 
            type="submit"
            className="px-5 py-2.5 font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-500/50 transition-colors"
          >
            댓글 작성
          </button>
        </div>
      </form>
      
      {/* 댓글 목록 */}
      <div className="space-y-0">
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default PostComments;