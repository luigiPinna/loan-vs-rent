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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-600 p-4">
      <div className="max-w-7xl mx-auto bg-white/95 rounded-3xl p-8 shadow-2xl">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          🏠 Mutuo vs Affitto - Analisi Matematica
        </h1>
        
        <InputSection 
          formData={formData} 
          onInputChange={handleInputChange} 
        />
        
        <button 
          onClick={handleCalculate}
          className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xl font-semibold rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 mb-8"
        >
          🧮 Calcola Confronto Dettagliato
        </button>
        
        {results && (
          <ResultsSection results={results} formData={formData} />
        )}
      </div>
    </div>
  );
}

export default App; 