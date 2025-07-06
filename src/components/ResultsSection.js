import React from 'react';
import ComparisonCards from './ComparisonCards';
import WinnerBanner from './WinnerBanner';
import InsightsSection from './InsightsSection';
import DetailedAnalysis from './DetailedAnalysis';
import ChartsSection from './ChartsSection';

const ResultsSection = ({ results, formData }) => {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 border-2 border-blue-500">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        📈 Risultati dell'Analisi
      </h2>
      
      <ComparisonCards results={results} formData={formData} />
      
      <WinnerBanner results={results} />
      
      <InsightsSection insights={results.insights} />
      
      <DetailedAnalysis 
        results={results} 
        formData={formData}
        sensitivityAnalysis={results.sensitivityAnalysis}
      />
      
      <ChartsSection chartData={results.chartData} />
    </div>
  );
};

export default ResultsSection; 