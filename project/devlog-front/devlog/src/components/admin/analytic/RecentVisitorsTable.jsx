import React from 'react';
import { Monitor, Smartphone, Tablet, Globe } from 'lucide-react';

/**
 * 최근 방문자 테이블 컴포넌트
 * 
 * @param {Array} data - 방문자 데이터 배열
 */
const RecentVisitorsTable = ({ data }) => {
  // 기기 타입에 따른 아이콘 렌더링
  const renderDeviceIcon = (deviceType) => {
    switch (deviceType.toLowerCase()) {
      case 'desktop':
        return <Monitor className="w-4 h-4 text-blue-500" />;
      case 'mobile':
        return <Smartphone className="w-4 h-4 text-green-500" />;
      case 'tablet':
        return <Tablet className="w-4 h-4 text-purple-500" />;
      default:
        return <Globe className="w-4 h-4 text-gray-500" />;
    }
  };
  
  // 레퍼러 소스에 따른 스타일 클래스
  const getReferrerClass = (referrer) => {
    switch (referrer.toLowerCase()) {
      case 'google':
        return 'text-blue-600 dark:text-blue-400';
      case 'facebook':
        return 'text-indigo-600 dark:text-indigo-400';
      case 'twitter':
        return 'text-sky-600 dark:text-sky-400';
      case 'linkedin':
        return 'text-blue-700 dark:text-blue-300';
      case 'direct':
        return 'text-green-600 dark:text-green-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">최근 방문자</h3>
      
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              <th className="pb-2">시간</th>
              <th className="pb-2">페이지</th>
              <th className="pb-2">유입 경로</th>
              <th className="pb-2">기기</th>
              <th className="pb-2">국가</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {data.map((visitor, index) => (
              <tr key={index} className="text-sm">
                <td className="py-2 whitespace-nowrap text-gray-600 dark:text-gray-400">
                  {visitor.time.split(' ')[1]}
                </td>
                <td className="py-2 pr-2">
                  <div className="text-gray-900 dark:text-white font-medium truncate max-w-xs">
                    {visitor.page}
                  </div>
                </td>
                <td className="py-2 whitespace-nowrap">
                  <span className={`font-medium ${getReferrerClass(visitor.referrer)}`}>
                    {visitor.referrer}
                  </span>
                </td>
                <td className="py-2 whitespace-nowrap">
                  <div className="flex items-center">
                    {renderDeviceIcon(visitor.device)}
                  </div>
                </td>
                <td className="py-2 whitespace-nowrap text-gray-600 dark:text-gray-400">
                  {visitor.country}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentVisitorsTable;