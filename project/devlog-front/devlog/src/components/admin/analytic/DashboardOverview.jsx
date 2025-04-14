import React from 'react';
import { 
  FileText, 
  Users, 
  Eye, 
  MessageSquare, 
  TrendingUp, 
  TrendingDown,
  BarChart,
  PieChart,
  Calendar
} from 'lucide-react';
import { Link } from 'react-router-dom';

// 차트 대신 사용할 간단한 바 차트 컴포넌트
const SimpleBarChart = ({ data }) => {
  const maxValue = Math.max(...data.map(item => item.value));
  
  return (
    <div className="space-y-2">
      {data.map((item, index) => (
        <div key={index} className="space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-300">{item.name}</span>
            <span className="font-medium text-gray-800 dark:text-gray-200">{item.value}</span>
          </div>
          <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 dark:bg-blue-400 rounded-full"
              style={{ width: `${(item.value / maxValue) * 100}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

// 차트 대신 사용할 간단한 파이 차트 컴포넌트
const SimplePieChart = ({ data }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  return (
    <div className="space-y-3">
      {data.map((item, index) => (
        <div key={index} className="flex items-center">
          <div 
            className="w-3 h-3 rounded-full mr-2" 
            style={{ backgroundColor: item.color }}
          ></div>
          <span className="text-sm text-gray-600 dark:text-gray-300">{item.name}</span>
          <span className="ml-auto text-sm font-medium text-gray-800 dark:text-gray-200">
            {Math.round((item.value / total) * 100)}%
          </span>
        </div>
      ))}
    </div>
  );
};

const DashboardOverview = ({ showAlert }) => {
  // 대시보드 데이터 (실제로는 API에서 가져옴)
  const dashboardData = {
    stats: {
      posts: {
        total: 156,
        change: 12,
        increasing: true
      },
      views: {
        total: 25648,
        change: 8.3,
        increasing: true
      },
      comments: {
        total: 842,
        change: 5.7,
        increasing: true
      },
      users: {
        total: 423,
        change: 3.2,
        increasing: false
      }
    },
    popularPosts: [
      { id: 1, title: '마이크로서비스 아키텍처: 설계부터 배포까지', views: 4892 },
      { id: 2, title: 'PostgreSQL 성능 최적화: 인덱스 전략과 쿼리 튜닝', views: 3254 },
      { id: 3, title: 'Docker와 Kubernetes로 구현하는 CI/CD 파이프라인', views: 2987 },
      { id: 4, title: '실시간 데이터 처리를 위한 Apache Kafka 활용법', views: 2845 },
      { id: 5, title: 'GraphQL API 설계 모범 사례와 성능 최적화', views: 2156 }
    ],
    recentActivities: [
      { type: 'post', title: 'Spring WebFlux와 리액티브 프로그래밍', user: '김개발', time: '3시간 전' },
      { type: 'comment', title: '마이크로서비스 아키텍처: 설계부터 배포까지', user: '이클라우드', time: '5시간 전' },
      { type: 'user', title: '새 계정 등록', user: '박데이터', time: '8시간 전' },
      { type: 'comment', title: 'PostgreSQL 성능 최적화: 인덱스 전략과 쿼리 튜닝', user: '최스트림', time: '1일 전' },
      { type: 'post', title: 'OAuth 2.0과 JWT를 이용한 안전한 인증 구현', user: '정API', time: '1일 전' }
    ],
    categoryData: [
      { name: '아키텍처', value: 32, color: '#4F46E5' },
      { name: 'DevOps', value: 28, color: '#2563EB' },
      { name: '데이터베이스', value: 24, color: '#0EA5E9' },
      { name: 'API 설계', value: 16, color: '#14B8A6' },
      { name: '보안', value: 12, color: '#10B981' }
    ],
    viewsData: [
      { name: '1월', value: 5200 },
      { name: '2월', value: 5800 },
      { name: '3월', value: 6300 },
      { name: '4월', value: 7200 },
      { name: '5월', value: 6800 },
      { name: '6월', value: 7500 }
    ],
    // 하드코딩된 통계 (실제로는 API에서 가져옴)
    todayStats: {
      visitors: 523,
      pageViews: 984,
      commentCount: 15
    }
  };
  
  return (
    <div className="space-y-6">
      {/* 상태 카드 섹션 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* 게시물 수 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">게시물</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                {dashboardData.stats.posts.total}
              </p>
            </div>
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full">
              <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            {dashboardData.stats.posts.increasing ? (
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
            )}
            <span className={`text-sm ${
              dashboardData.stats.posts.increasing ? 'text-green-500' : 'text-red-500'
            }`}>
              {dashboardData.stats.posts.change}% 
              {dashboardData.stats.posts.increasing ? '증가' : '감소'}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
              (지난 달 대비)
            </span>
          </div>
        </div>
        
        {/* 조회수 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">조회수</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                {dashboardData.stats.views.total.toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-full">
              <Eye className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            {dashboardData.stats.views.increasing ? (
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
            )}
            <span className={`text-sm ${
              dashboardData.stats.views.increasing ? 'text-green-500' : 'text-red-500'
            }`}>
              {dashboardData.stats.views.change}% 
              {dashboardData.stats.views.increasing ? '증가' : '감소'}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
              (지난 달 대비)
            </span>
          </div>
        </div>
        
        {/* 댓글 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">댓글</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                {dashboardData.stats.comments.total}
              </p>
            </div>
            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-full">
              <MessageSquare className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            {dashboardData.stats.comments.increasing ? (
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
            )}
            <span className={`text-sm ${
              dashboardData.stats.comments.increasing ? 'text-green-500' : 'text-red-500'
            }`}>
              {dashboardData.stats.comments.change}% 
              {dashboardData.stats.comments.increasing ? '증가' : '감소'}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
              (지난 달 대비)
            </span>
          </div>
        </div>
        
        {/* 사용자 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">사용자</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                {dashboardData.stats.users.total}
              </p>
            </div>
            <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-full">
              <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            {dashboardData.stats.users.increasing ? (
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
            )}
            <span className={`text-sm ${
              dashboardData.stats.users.increasing ? 'text-green-500' : 'text-red-500'
            }`}>
              {dashboardData.stats.users.change}% 
              {dashboardData.stats.users.increasing ? '증가' : '감소'}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
              (지난 달 대비)
            </span>
          </div>
        </div>
      </div>
      
      {/* 오늘의 통계와 캘린더 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 오늘의 통계 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">오늘의 통계</h2>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {dashboardData.todayStats.visitors}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">방문자</div>
            </div>
            
            <div className="text-center p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
              <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                {dashboardData.todayStats.pageViews}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">페이지뷰</div>
            </div>
            
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {dashboardData.todayStats.commentCount}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">새 댓글</div>
            </div>
          </div>
        </div>
        
        {/* 캘린더 (간단한 대체 UI) */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center mb-4">
            <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">2025년 4월</h2>
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            <div className="text-center p-2 text-sm font-medium text-gray-500 dark:text-gray-400">일</div>
            <div className="text-center p-2 text-sm font-medium text-gray-500 dark:text-gray-400">월</div>
            <div className="text-center p-2 text-sm font-medium text-gray-500 dark:text-gray-400">화</div>
            <div className="text-center p-2 text-sm font-medium text-gray-500 dark:text-gray-400">수</div>
            <div className="text-center p-2 text-sm font-medium text-gray-500 dark:text-gray-400">목</div>
            <div className="text-center p-2 text-sm font-medium text-gray-500 dark:text-gray-400">금</div>
            <div className="text-center p-2 text-sm font-medium text-gray-500 dark:text-gray-400">토</div>
            
            {/* 날짜 */}
            <div className="text-center p-2 text-sm text-gray-400 dark:text-gray-500">30</div>
            <div className="text-center p-2 text-sm text-gray-400 dark:text-gray-500">31</div>
            <div className="text-center p-2 text-sm text-gray-700 dark:text-gray-300">1</div>
            <div className="text-center p-2 text-sm text-gray-700 dark:text-gray-300">2</div>
            <div className="text-center p-2 text-sm text-gray-700 dark:text-gray-300">3</div>
            <div className="text-center p-2 text-sm text-gray-700 dark:text-gray-300">4</div>
            <div className="text-center p-2 text-sm text-gray-700 dark:text-gray-300">5</div>
            
            <div className="text-center p-2 text-sm text-gray-700 dark:text-gray-300">6</div>
            <div className="text-center p-2 text-sm text-gray-700 dark:text-gray-300">7</div>
            <div className="text-center p-2 text-sm text-gray-700 dark:text-gray-300">8</div>
            <div className="text-center p-2 text-sm text-gray-700 dark:text-gray-300">9</div>
            <div className="text-center p-2 text-sm text-gray-700 dark:text-gray-300">10</div>
            <div className="text-center p-2 text-sm text-gray-700 dark:text-gray-300">11</div>
            <div className="text-center p-2 text-sm text-gray-700 dark:text-gray-300">12</div>
            
            <div className="text-center p-2 text-sm text-gray-700 dark:text-gray-300">13</div>
            <div className="text-center p-2 text-sm text-blue-600 dark:text-blue-400 font-bold bg-blue-50 dark:bg-blue-900/20 rounded-full">14</div>
            <div className="text-center p-2 text-sm text-gray-700 dark:text-gray-300">15</div>
            <div className="text-center p-2 text-sm text-gray-700 dark:text-gray-300">16</div>
            <div className="text-center p-2 text-sm text-gray-700 dark:text-gray-300">17</div>
            <div className="text-center p-2 text-sm text-gray-700 dark:text-gray-300">18</div>
            <div className="text-center p-2 text-sm text-gray-700 dark:text-gray-300">19</div>
          </div>
        </div>
      </div>
      
      {/* 차트와 인기 게시물 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 월별 조회수 차트 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center mb-6">
            <BarChart className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">월별 조회수</h2>
          </div>
          
          <SimpleBarChart data={dashboardData.viewsData} />
        </div>
        
        {/* 카테고리별 게시물 분포 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center mb-6">
            <PieChart className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">카테고리별 게시물</h2>
          </div>
          
          <SimplePieChart data={dashboardData.categoryData} />
        </div>
      </div>
      
      {/* 인기 게시물 및 최근 활동 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 인기 게시물 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">인기 게시물</h2>
          
          <div className="space-y-4">
            {dashboardData.popularPosts.map((post, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium text-sm w-6 h-6 rounded-full flex items-center justify-center mr-3">
                    {index + 1}
                  </div>
                  <Link to={`/posts/${post.id}`} className="text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm sm:text-base truncate max-w-xs">
                    {post.title}
                  </Link>
                </div>
                <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                  <Eye className="w-4 h-4 mr-1" />
                  {post.views.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Link to="/admin/posts" className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline">
              모든 게시물 보기
            </Link>
          </div>
        </div>
        
        {/* 최근 활동 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">최근 활동</h2>
          
          <div className="space-y-4">
            {dashboardData.recentActivities.map((activity, index) => (
              <div key={index} className="flex">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 flex-shrink-0
                  ${activity.type === 'post' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 
                    activity.type === 'comment' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' : 
                    'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'}`}>
                  {activity.type === 'post' ? (
                    <FileText className="w-5 h-5" />
                  ) : activity.type === 'comment' ? (
                    <MessageSquare className="w-5 h-5" />
                  ) : (
                    <Users className="w-5 h-5" />
                  )}
                </div>
                
                <div>
                  <p className="text-gray-800 dark:text-gray-200">
                    <span className="font-medium">{activity.user}</span>
                    {activity.type === 'post' && '님이 새 글을 작성했습니다:'}
                    {activity.type === 'comment' && '님이 댓글을 남겼습니다:'}
                    {activity.type === 'user' && '님이 가입했습니다'}
                  </p>
                  {activity.type !== 'user' && (
                    <p className="text-blue-600 dark:text-blue-400 text-sm mt-1 truncate max-w-xs">
                      {activity.title}
                    </p>
                  )}
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;