import React from 'react';
import { formatCurrency } from '../utils/calculations';

const ComparisonCards = ({ results, formData }) => {
  const includiInv = formData.includiInvestimenti;
  let investimentiInfo = '';
  if (includiInv) {
    const rendimentoAlternativo = results.importoAnticipo * Math.pow(1 + formData.tassoSconto / 100, formData.orizzonteTempo);
    investimentiInfo = (
      <div className="flex justify-between py-2 border-b border-gray-200">
        <span>Risparmio investimenti (anticipo):</span>
        <span>-{formatCurrency(rendimentoAlternativo - results.importoAnticipo)}</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      {/* Acquisto con Mutuo */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">🏠 Acquisto con Mutuo</h3>
        <div className="space-y-2">
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span>Anticipo:</span>
            <span>{formatCurrency(results.importoAnticipo)}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span>Spese notarili + agenzia:</span>
            <span>{formatCurrency(formData.speseNotarili)}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span>Ristrutturazione iniziale:</span>
            <span>{formatCurrency(formData.speseRistrutturazione)}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span>Rate + spese {formData.orizzonteTempo} anni:</span>
            <span>{formatCurrency(results.rataMensile * 12 * formData.orizzonteTempo)}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span>Valore finale stimato:</span>
            <span>{formatCurrency(results.valoreNettoVendita)}</span>
          </div>
          <div className="flex justify-between py-2 font-semibold text-gray-800 border-t-2 border-blue-500 pt-3">
            <span>Costo totale netto:</span>
            <span>{formatCurrency(results.costiMutuo)}</span>
          </div>
        </div>
      </div>

      {/* Affitto */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">🏠 Affitto</h3>
        <div className="space-y-2">
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span>Canone iniziale:</span>
            <span>{formatCurrency(formData.canoneAffitto)}/mese</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span>Cauzione:</span>
            <span>{formatCurrency(formData.canoneAffitto * 3)}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span>Totale affitti {formData.orizzonteTempo} anni:</span>
            <span>{formatCurrency(results.costiAffitto + (includiInv ? (results.importoAnticipo * Math.pow(1 + formData.tassoSconto / 100, formData.orizzonteTempo) - results.importoAnticipo) : 0))}</span>
          </div>
          {investimentiInfo}
          <div className="flex justify-between py-2 font-semibold text-gray-800 border-t-2 border-blue-500 pt-3">
            <span>Costo totale:</span>
            <span>{formatCurrency(results.costiAffitto)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonCards; 