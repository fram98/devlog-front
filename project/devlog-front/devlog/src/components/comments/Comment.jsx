import React, { useState, useEffect } from 'react';
import { Clock, Bookmark, Share2, ThumbsUp, MessageSquare, User, Calendar, Tag, Copy, Check, ChevronDown, ChevronRight, ExternalLink } from 'lucide-react';

const Comment = ({ comment, onReply, onLike }) => (
    <div className={`${comment.parentId ? 'ml-12 mt-4 pl-4 border-l-2 border-blue-200' : 'border-b border-gray-200 pb-6'}`}>
      <div className="flex items-start mb-2">
        <div className={`${comment.parentId ? 'w-8 h-8' : 'w-10 h-10'} bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white mr-3 shadow-sm`}>
          {comment.author.avatar ? (
            <img src={comment.author.avatar} alt={comment.author.name} className="w-full h-full rounded-full object-cover" />
          ) : (
            <User size={comment.parentId ? 14 : 18} />
          )}
        </div>
        <div>
          <div className="flex items-center">
            <h4 className="font-semibold text-gray-900 mr-2">{comment.author.name}</h4>
            <span className="text-xs text-gray-500">{comment.createdAt}</span>
          </div>
          <p className="text-gray-700 mt-1">
            {comment.content}
          </p>
          <div className="flex items-center mt-2 text-sm">
            <button 
              onClick={() => onReply(comment.id)} 
              className="text-gray-500 hover:text-blue-600 mr-4 transition-colors"
            >
              답글
            </button>
            <button 
              onClick={() => onLike(comment.id)} 
              className="flex items-center text-gray-500 hover:text-blue-600 transition-colors"
            >
              <ThumbsUp size={14} className={comment.isLiked ? "mr-1 text-blue-500" : "mr-1"} />
              <span>{comment.likes}</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* 답글이 있으면 재귀적으로 렌더링 */}
      {comment.replies && comment.replies.map(reply => (
        <Comment 
          key={reply.id} 
          comment={reply} 
          onReply={onReply} 
          onLike={onLike} 
        />
      ))}
    </div>
  );

  export default Comment;