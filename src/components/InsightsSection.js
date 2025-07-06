import React from 'react';

const InsightsSection = ({ insights }) => {
  return (
    <div className="mb-6 p-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <span className="mr-3">💡</span>
        Insights Personalizzati
      </h3>
      <div className="space-y-3">
        {insights.map((insight, index) => (
          <div key={index} className="flex items-start p-3 bg-white/15 rounded-lg">
            <span className="text-xl mr-3 mt-1">{insight.icona}</span>
            <span className="flex-1 leading-relaxed" dangerouslySetInnerHTML={{ __html: insight.testo }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default InsightsSection; 