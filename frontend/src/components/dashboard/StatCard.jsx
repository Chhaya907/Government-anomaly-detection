import React from 'react';

const StatCard = ({
  title,
  value,
  trend,
  trendType = 'neutral', // 'positive' | 'negative' | 'neutral'
  icon = '📈',
}) => {
  return (
    <div className="stat-card">
      <div>
        <div className="stat-title">{title}</div>
        <div className="stat-value">{value}</div>
        {trend && (
          <div className={`stat-trend ${trendType}`}>
            <span>{trendType === 'positive' ? '↑' : trendType === 'negative' ? '↓' : '•'}</span>
            <span>{trend}</span>
          </div>
        )}
      </div>
      <div className="stat-icon-wrapper">{icon}</div>
    </div>
  );
};

export default StatCard;
