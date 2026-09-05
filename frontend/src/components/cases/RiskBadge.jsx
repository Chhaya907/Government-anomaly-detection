import React from 'react';
import { getRiskBadgeClass } from '../../utils/formatters';

const RiskBadge = ({ level = 'LOW', showIcon = true }) => {
  const badgeClass = getRiskBadgeClass(level);
  
  const getIcon = () => {
    switch ((level || '').toUpperCase()) {
      case 'CRITICAL':
        return '●';
      case 'HIGH':
        return '▲';
      case 'MEDIUM':
        return '■';
      case 'LOW':
      default:
        return '✓';
    }
  };

  return (
    <span className={badgeClass}>
      {showIcon && <span style={{ fontSize: '0.65rem' }}>{getIcon()}</span>}
      <span>{level}</span>
    </span>
  );
};

export default RiskBadge;
