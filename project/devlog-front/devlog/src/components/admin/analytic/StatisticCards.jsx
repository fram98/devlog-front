import React from 'react';
import StatisticCard from './StatisticCard';
import { Users, Eye, Clock, Globe } from 'lucide-react';

/**
 * 여러 통계 카드를 모아서 보여주는 컴포넌트
 * 
 * @param {object} data - 통계 데이터
 * @param {object} data.visitors - 방문자 통계
 * @param {object} data.pageViews - 페이지뷰 통계
 * @param {object} data.avgSessionDuration - 평균 세션 시간 통계
 * @param {object} data.bounceRate - 이탈률 통계
 */
const StatisticCards = ({ data }) => {
  // 초 단위를 분:초 형식으로 변환하는 포맷터
  const durationFormatter = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}분 ${remainingSeconds}초`;
  };
  
  // 퍼센트 값 포맷터
  const percentFormatter = (value) => `${value}%`;
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* 방문자 수 */}
      <StatisticCard 
        title="방문자 수"
        value={data.visitors.value}
        change={data.visitors.change}
        isIncreasing={data.visitors.isIncreasing}
        icon={<Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />}
      />
      
      {/* 페이지뷰 */}
      <StatisticCard 
        title="페이지뷰"
        value={data.pageViews.value}
        change={data.pageViews.change}
        isIncreasing={data.pageViews.isIncreasing}
        icon={<Eye className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />}
      />
      
      {/* 평균 세션 시간 */}
      <StatisticCard 
        title="평균 세션 시간"
        value={data.avgSessionDuration.value}
        change={data.avgSessionDuration.change}
        isIncreasing={data.avgSessionDuration.isIncreasing}
        icon={<Clock className="w-6 h-6 text-green-600 dark:text-green-400" />}
        formatter={durationFormatter}
      />
      
      {/* 이탈률 */}
      <StatisticCard 
        title="이탈률"
        value={data.bounceRate.value}
        change={data.bounceRate.change}
        isIncreasing={data.bounceRate.isIncreasing}
        isGoodWhenIncreasing={false} // 이탈률은 감소가 긍정적
        icon={<Globe className="w-6 h-6 text-purple-600 dark:text-purple-400" />}
        formatter={percentFormatter}
      />
    </div>
  );
};

export default StatisticCards;