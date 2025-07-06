import React from 'react';
import { formatCurrency } from '../utils/calculations';

const WinnerBanner = ({ results }) => {
  const { differenza, percentualeDiff, isAcquistoConveniente } = results;
  
  const bannerStyle = isAcquistoConveniente 
    ? 'bg-gradient-to-r from-green-500 to-green-600' 
    : 'bg-gradient-to-r from-blue-500 to-blue-600';
  
  const icon = isAcquistoConveniente ? '🏆 ACQUISTO CONVIENE' : '🏆 AFFITTO CONVIENE';
  const savings = formatCurrency(Math.abs(differenza));
  
  return (
    <div className={`${bannerStyle} text-white text-center py-6 px-8 rounded-xl font-semibold text-xl mb-6`}>
      {icon}<br />
      Risparmi: {savings} ({percentualeDiff.toFixed(1)}%)
    </div>
  );
};

export default WinnerBanner; 