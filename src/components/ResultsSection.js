import React from 'react';
import ComparisonCards from './ComparisonCards';
import WinnerBanner from './WinnerBanner';
import InsightsSection from './InsightsSection';
import DetailedAnalysis from './DetailedAnalysis';
import ChartsSection from './ChartsSection';

const ResultsSection = ({ results, formData, onBackToForm, onNewAnalysis }) => {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 border-2 border-blue-500">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          📈 Risultati dell'Analisi
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-2">
          {onBackToForm && (
            <button 
              onClick={onBackToForm}
              className="px-4 py-2 bg-gray-600 text-white text-sm font-semibold rounded-lg hover:bg-gray-700 transition-all duration-200 flex items-center gap-2"
            >
              <span>✏️</span>
              Modifica Dati
            </button>
          )}
          
          {onNewAnalysis && (
            <button 
              onClick={onNewAnalysis}
              className="px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition-all duration-200 flex items-center gap-2"
            >
              <span>🆕</span>
              Nuova Analisi
            </button>
          )}
        </div>
      </div>
      
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