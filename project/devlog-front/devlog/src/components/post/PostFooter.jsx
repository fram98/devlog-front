import React from 'react';

const PostFooter = ({ post }) => {
  return (
    <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-12">
      <div className="bg-blue-50 dark:bg-gray-800 border border-blue-100 dark:border-gray-700 rounded-xl p-6">
        <div className="flex items-start sm:items-center flex-col sm:flex-row gap-6">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-16 h-16 rounded-full border-2 border-white dark:border-gray-700 shadow-sm"
          />
          
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-1 text-gray-900 dark:text-white">
              {post.author.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-3">
              {post.author.bio}
            </p>
            <div className="flex flex-wrap gap-2">
              <a
                href={`/author/${post.author.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                더 많은 글 보기
              </a>
              <a
                href={`https://github.com/${post.author.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-sm font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostFooter;