import React from 'react';

const DetailedAnalysis = ({ results, formData, sensitivityAnalysis }) => {
  const { yieldAffitto } = results;
  const breakEven = results.isAcquistoConveniente ? 'Acquisto più conveniente' : 'Affitto più conveniente';

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">📋 Analisi Dettagliata</h3>
      
      <ul className="space-y-2 mb-6">
        <li><strong>Rendimento immobiliare annuo:</strong> {(formData.valorizzazione).toFixed(1)}%</li>
        <li><strong>Yield affitto:</strong> {yieldAffitto.toFixed(1)}%</li>
        <li><strong>Risultato:</strong> {breakEven}</li>
      </ul>
      
      {/* Analisi di Sensibilità */}
      <div className="mb-6 p-5 bg-gray-50 rounded-xl border-l-4 border-blue-500">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <span className="mr-3">⚖️</span>
          Analisi di Sensibilità
        </h3>
        <div className="space-y-3">
          {sensitivityAnalysis.map((analysis, index) => (
            <div key={index} className="flex justify-between items-center p-3 bg-white rounded-lg border-l-4" style={{ borderLeftColor: analysis.colore }}>
              <span className="font-medium text-gray-700">{analysis.scenario}</span>
              <span className="font-semibold" style={{ color: analysis.colore }}>{analysis.impatto}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Fattori di Rischio */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">⚠️ Fattori di Rischio</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
            <h4 className="font-semibold text-red-700 mb-2">Rischio Mercato</h4>
            <p className="text-sm text-gray-600">Volatilità prezzi immobiliari</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
            <h4 className="font-semibold text-yellow-700 mb-2">Rischio Tassi</h4>
            <p className="text-sm text-gray-600">Possibili aumenti dei tassi di interesse</p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
            <h4 className="font-semibold text-orange-700 mb-2">Rischio Liquidità</h4>
            <p className="text-sm text-gray-600">Difficoltà di vendita dell'immobile</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedAnalysis; 