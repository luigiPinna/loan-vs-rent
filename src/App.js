import React, { useState } from 'react';
import InputSection from './components/InputSection';
import ResultsSection from './components/ResultsSection';
import { calculateComparison } from './utils/calculations';

function App() {
  const [formData, setFormData] = useState({
    // Dati Immobile
    prezzoAcquisto: 200000,
    speseRistrutturazione: 15000,
    imu: 1200,
    manutenzione: 0.8,
    assicurazione: 300,
    orizzonteTempo: 15,
    valorizzazione: 2,
    liquidita: 0.6,
    
    // Dati Mutuo
    anticipo: 20,
    tassoInteresse: 3.5,
    durataMutuo: 25,
    speseNotarili: 8000,
    
    // Dati Affitto
    canoneAffitto: 650,
    aumentoCanone: 2,
    cauzione: 3,
    speseCondominiali: 150,
    costiTrasloco: 2000,
    frequenzaTrasloco: 5,
    
    // Parametri Finanziari
    inflazione: 2,
    tassazione: 26,
    rischioMercato: 0.1,
    includiInvestimenti: false,
    tassoSconto: 4
  });

  const [results, setResults] = useState(null);

  const handleInputChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCalculate = () => {
    const calculatedResults = calculateComparison(formData);
    setResults(calculatedResults);
  };

  const handleBackToForm = () => {
    setResults(null);
  };

  const handleRecalculate = () => {
    const calculatedResults = calculateComparison(formData);
    setResults(calculatedResults);
  };

  const handleNewAnalysis = () => {
    setFormData({
      // Dati Immobile
      prezzoAcquisto: 200000,
      speseRistrutturazione: 15000,
      imu: 1200,
      manutenzione: 0.8,
      assicurazione: 300,
      orizzonteTempo: 15,
      valorizzazione: 2,
      liquidita: 0.6,
      
      // Dati Mutuo
      anticipo: 20,
      tassoInteresse: 3.5,
      durataMutuo: 25,
      speseNotarili: 8000,
      
      // Dati Affitto
      canoneAffitto: 650,
      aumentoCanone: 2,
      cauzione: 3,
      speseCondominiali: 150,
      costiTrasloco: 2000,
      frequenzaTrasloco: 5,
      
      // Parametri Finanziari
      inflazione: 2,
      tassazione: 26,
      rischioMercato: 0.1,
      includiInvestimenti: false,
      tassoSconto: 4
    });
    setResults(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            🏠 Affitto vs Acquisto
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-6">
            Il confronto di sempre 
          </p>
   
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          {!results ? (
            <>
              <InputSection 
                formData={formData} 
                onInputChange={handleInputChange} 
              />
              
              <div className="p-6 bg-gradient-to-r from-gray-50 to-blue-50 border-t border-gray-200">
                <button 
                  onClick={handleCalculate}
                  className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 flex items-center justify-center gap-3"
                >
                  <span className="text-2xl">🧮</span>
                  Calcola Confronto Dettagliato
                </button>
              </div>
            </>
          ) : (
            <>
              <ResultsSection 
                results={results} 
                formData={formData} 
                onBackToForm={handleBackToForm}
                onNewAnalysis={handleNewAnalysis}
              />
              
              {/* Navigation Buttons */}
              <div className="p-6 bg-gradient-to-r from-gray-50 to-blue-50 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={handleBackToForm}
                    className="flex-1 py-3 px-6 bg-gray-600 text-white text-lg font-semibold rounded-xl hover:bg-gray-700 transition-all duration-200 flex items-center justify-center gap-3"
                  >
                    <span className="text-xl">✏️</span>
                    Modifica Dati
                  </button>
                  
                  <button 
                    onClick={handleRecalculate}
                    className="flex-1 py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 flex items-center justify-center gap-3"
                  >
                    <span className="text-xl">🔄</span>
                    Ricalcola
                  </button>
                  
                  <button 
                    onClick={handleNewAnalysis}
                    className="flex-1 py-3 px-6 bg-green-600 text-white text-lg font-semibold rounded-xl hover:bg-green-700 transition-all duration-200 flex items-center justify-center gap-3"
                  >
                    <span className="text-xl">🆕</span>
                    Nuova Analisi
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App; 