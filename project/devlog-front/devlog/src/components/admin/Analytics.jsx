import React, { useState } from 'react';
import AnalyticsHeader from './analytic/AnalyticsHeader';
import StatisticCards from './analytic/StatisticCard';
import VisitorsChart from './analytic/VisitorsChart';
import HourlyChart from './analytic/HourlyChart';
import TrafficSourcesChart from './analytic/TrafficSourcesChart';
import DeviceDistributionChart from './analytic/DeviceDistributionChart';
import RegionDistributionChart from './analytic/RegionDistributionChart';
import PopularPostsTable from './analytic/PopularPostsTable';
import RecentVisitorsTable from './analytic/RecentVisitorsTable';
import { analyticsData } from '../../data/mockData';

/**
 * 분석 및 통계 메인 컴포넌트
 */
const Analytics = ({ showAlert }) => {
  // 상태 및 설정
  const [timeRange, setTimeRange] = useState('last30days');
  const [isLoading, setIsLoading] = useState(false);
  const [sortField, setSortField] = useState('views');
  
  // 시간 범위 변경 핸들러
  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
    refreshData();
  };
  
  // 데이터 새로고침 핸들러
  const refreshData = () => {
    setIsLoading(true);
    
    // 실제로는 API 호출 (시뮬레이션)
    setTimeout(() => {
      setIsLoading(false);
      showAlert('분석 데이터가 새로고침되었습니다.');
    }, 800);
  };
  
  // 보고서 다운로드 핸들러
  const handleDownloadReport = (format) => {
    showAlert(`${format.toUpperCase()} 형식으로 보고서가 다운로드됩니다.`);
  };
  
  // 인기 게시물 정렬 핸들러
  const handlePopularPostsSort = (field) => {
    setSortField(field);
  };
  
  return (
    <div className="space-y-6">
      {/* 헤더 및 필터 */}
      <AnalyticsHeader 
        timeRange={timeRange}
        isLoading={isLoading}
        onTimeRangeChange={handleTimeRangeChange}
        onRefresh={refreshData}
        onDownload={handleDownloadReport}
      />
      
      {/* 주요 통계 */}
      <StatisticCards data={analyticsData.summaryData} />
      
      {/* 차트 및 분석 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 일간 방문자 추이 */}
        <VisitorsChart data={analyticsData.dailyVisitorsData} />
        
        {/* 시간대별 방문 분포 */}
        <HourlyChart data={analyticsData.hourlyData} />
      </div>
      
      {/* 더 많은 분석 데이터 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 트래픽 소스 */}
        <TrafficSourcesChart data={analyticsData.trafficSourceData} />
        
        {/* 기기 분포 */}
        <DeviceDistributionChart data={analyticsData.deviceData} />
        
        {/* 지역 분포 */}
        <RegionDistributionChart data={analyticsData.regionData} />
      </div>
      
      {/* 테이블 데이터 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 인기 게시물 */}
        <PopularPostsTable 
          data={analyticsData.popularPosts} 
          sortField={sortField}
          onSort={handlePopularPostsSort}
        />
        
        {/* 최근 방문자 */}
        <RecentVisitorsTable data={analyticsData.recentVisitors} />
      </div>
    </div>
  );
};

export default Analytics;