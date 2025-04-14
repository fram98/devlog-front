import React from 'react';

/**
 * 간단한 라인 차트 컴포넌트
 * 
 * @param {Array} data - 차트 데이터 배열
 * @param {string} valueKey - 값을 가져올 키
 * @param {string} labelKey - 레이블을 가져올 키
 * @param {number} height - 차트 높이 (기본값: 200)
 * @param {string} lineColor - 라인 색상 (기본값: '#3B82F6')
 * @param {string} pointColor - 포인트 색상 (기본값: '#3B82F6')
 * @param {boolean} showLabels - X축 레이블 표시 여부 (기본값: true)
 */
const SimpleLineChart = ({ 
  data, 
  valueKey, 
  labelKey, 
  height = 200,
  lineColor = '#3B82F6',
  pointColor = '#3B82F6',
  showLabels = true
}) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-40 text-gray-400 dark:text-gray-500">
        데이터가 없습니다.
      </div>
    );
  }
  
  // 차트 크기 및 여백 설정
  const maxValue = Math.max(...data.map(item => item[valueKey]));
  const width = 100; // 백분율 기준
  const padding = 10; // 픽셀 기준
  
  // 데이터 포인트 좌표 계산
  const points = data.map((item, index) => {
    const x = (index / (data.length - 1)) * (width - padding * 2) + padding;
    const y = height - ((item[valueKey] / maxValue) * (height - padding * 2) + padding);
    return { x, y };
  });
  
  // SVG 경로 생성
  const pathData = points.map((point, index) => 
    `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
  ).join(' ');
  
  // 레이블 생성 (처음, 중간, 마지막)
  const labels = [
    data[0][labelKey],
    data[Math.floor(data.length / 2)][labelKey],
    data[data.length - 1][labelKey]
  ];
  
  return (
    <div className="relative h-40">
      <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
        {/* 좌표축 */}
        <line
          x1={padding}
          y1={height - padding}
          x2={width - padding}
          y2={height - padding}
          stroke="#E5E7EB"
          strokeWidth="1"
        />
        
        {/* 가로 그리드 라인 (25%, 50%, 75%) */}
        {[0.25, 0.5, 0.75].map((ratio, index) => (
          <line
            key={index}
            x1={padding}
            y1={height - padding - (height - padding * 2) * ratio}
            x2={width - padding}
            y2={height - padding - (height - padding * 2) * ratio}
            stroke="#E5E7EB"
            strokeWidth="0.5"
            strokeDasharray="2,2"
          />
        ))}
        
        {/* 데이터 라인 */}
        <path
          d={pathData}
          fill="none"
          stroke={lineColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* 데이터 포인트 */}
        {points.map((point, index) => (
          <circle
            key={index}
            cx={point.x}
            cy={point.y}
            r="2"
            fill={pointColor}
          />
        ))}
      </svg>
      
      {/* X축 레이블 */}
      {showLabels && (
        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 dark:text-gray-400">
          {labels.map((label, index) => (
            <span key={index}>{label}</span>
          ))}
        </div>
      )}
    </div>
  );
};

export default SimpleLineChart;