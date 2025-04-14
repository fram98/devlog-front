import React from 'react';
import { ArrowUpDown, Eye, Users, Clock, Zap } from 'lucide-react';

/**
 * 인기 게시물 테이블 컴포넌트
 * 
 * @param {Array} data - 게시물 데이터 배열
 * @param {string} sortField - 정렬 필드
 * @param {function} onSort - 정렬 변경 핸들러
 */
const PopularPostsTable = ({ data, sortField, onSort }) => {
  // 정렬된 데이터
  const sortedData = [...data].sort((a, b) => b[sortField] - a[sortField]);
  
  // 시간(초)을 분:초 형식으로 변환
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">인기 게시물</h3>
      
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              <th className="pb-2">제목</th>
              <th className="pb-2 cursor-pointer" onClick={() => onSort('views')}>
                <div className="flex items-center">
                  <Eye className="w-4 h-4 mr-1" />
                  <span>조회수</span>
                  {sortField === 'views' && <ArrowUpDown className="w-4 h-4 ml-1" />}
                </div>
              </th>
              <th className="pb-2 cursor-pointer" onClick={() => onSort('uniqueVisitors')}>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  <span>방문자</span>
                  {sortField === 'uniqueVisitors' && <ArrowUpDown className="w-4 h-4 ml-1" />}
                </div>
              </th>
              <th className="pb-2 cursor-pointer whitespace-nowrap" onClick={() => onSort('avgTimeOnPage')}>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>평균 시간</span>
                  {sortField === 'avgTimeOnPage' && <ArrowUpDown className="w-4 h-4 ml-1" />}
                </div>
              </th>
              <th className="pb-2 cursor-pointer" onClick={() => onSort('bounceRate')}>
                <div className="flex items-center">
                  <Zap className="w-4 h-4 mr-1" />
                  <span>이탈률</span>
                  {sortField === 'bounceRate' && <ArrowUpDown className="w-4 h-4 ml-1" />}
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {sortedData.map((post) => (
              <tr key={post.id} className="text-sm">
                <td className="py-2 pr-2">
                  <div className="text-gray-900 dark:text-white font-medium truncate max-w-xs">
                    <a href={`/posts/${post.id}`} className="hover:text-blue-600 dark:hover:text-blue-400">
                      {post.title}
                    </a>
                  </div>
                </td>
                <td className="py-2 whitespace-nowrap text-gray-600 dark:text-gray-400">
                  {post.views.toLocaleString()}
                </td>
                <td className="py-2 whitespace-nowrap text-gray-600 dark:text-gray-400">
                  {post.uniqueVisitors.toLocaleString()}
                </td>
                <td className="py-2 whitespace-nowrap text-gray-600 dark:text-gray-400">
                  {formatTime(post.avgTimeOnPage)}
                </td>
                <td className="py-2 whitespace-nowrap text-gray-600 dark:text-gray-400">
                  {post.bounceRate}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PopularPostsTable;