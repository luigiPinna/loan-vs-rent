import React from 'react';
import { formatCurrency } from '../utils/calculations';

const ComparisonCards = ({ results, formData }) => {
  const includiInv = formData.includiInvestimenti;
  
  // Calcolo dettagli mutuo
  const importoMutuo = formData.prezzoAcquisto * (1 - formData.anticipo / 100);
  const totaleRatePagate = results.rataMensile * 12 * formData.orizzonteTempo;
  const interessiTotali = totaleRatePagate - importoMutuo;
  
  // Calcolo dettagli affitto
  const canoneIniziale = formData.canoneAffitto;
  const canoneFinale = canoneIniziale * Math.pow(1 + formData.aumentoCanone / 100, formData.orizzonteTempo);
  const totaleAffitti = results.costiAffitto + (includiInv ? (results.importoAnticipo * Math.pow(1 + formData.tassoSconto / 100, formData.orizzonteTempo) - results.importoAnticipo) : 0);
  const numeroTraslochi = Math.floor(formData.orizzonteTempo / formData.frequenzaTrasloco);
  const costiTraslochiTotali = numeroTraslochi * formData.costiTrasloco;
  const speseCondominialiTotali = formData.speseCondominiali * 12 * formData.orizzonteTempo;
  
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
        
        {/* Dettagli Mutuo */}
        <div className="bg-blue-50 rounded-lg p-4 mb-4 border border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-3 flex items-center">
            <span className="mr-2">🏦</span>
            Dettagli Mutuo
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Importo mutuo:</span>
              <span className="font-medium">{formatCurrency(formData.prezzoAcquisto * (1 - formData.anticipo / 100))}</span>
            </div>
            <div className="flex justify-between">
              <span>Rata mensile:</span>
              <span className="font-medium">{formatCurrency(results.rataMensile)}/mese</span>
            </div>
            <div className="flex justify-between">
              <span>Tasso interesse:</span>
              <span className="font-medium">{formData.tassoInteresse}% annuo</span>
            </div>
            <div className="flex justify-between">
              <span>Durata mutuo:</span>
              <span className="font-medium">{formData.durataMutuo} anni</span>
            </div>
                      <div className="flex justify-between text-blue-700 font-semibold border-t border-blue-300 pt-2">
            <span>Totale rate pagate ({formData.orizzonteTempo} anni):</span>
            <span>{formatCurrency(totaleRatePagate)}</span>
          </div>
          <div className="flex justify-between text-red-600 font-semibold">
            <span>Interessi totali pagati:</span>
            <span>{formatCurrency(interessiTotali)}</span>
          </div>
          <div className="flex justify-between text-green-600 font-semibold">
            <span>Capitale restituito:</span>
            <span>{formatCurrency(importoMutuo)}</span>
          </div>
          
          {/* Breakdown Interessi vs Capitale */}
          <div className="mt-3 p-3 bg-blue-100 rounded border border-blue-300">
            <div className="text-xs text-blue-800 font-semibold mb-2">Breakdown {formData.orizzonteTempo} anni:</div>
            <div className="flex justify-between text-xs">
              <span>Interessi:</span>
              <span className="text-red-600">{formatCurrency(interessiTotali)}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span>Capitale:</span>
              <span className="text-green-600">{formatCurrency(importoMutuo)}</span>
            </div>
            <div className="flex justify-between text-xs font-semibold border-t border-blue-300 pt-1 mt-1">
              <span>Totale:</span>
              <span>{formatCurrency(totaleRatePagate)}</span>
            </div>
          </div>
          </div>
        </div>
        
        {/* Breakdown Costi */}
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
            <span>Rate mutuo ({formData.orizzonteTempo} anni):</span>
            <span>{formatCurrency(results.rataMensile * 12 * formData.orizzonteTempo)}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span>IMU + manutenzione ({formData.orizzonteTempo} anni):</span>
            <span>{formatCurrency((formData.imu + (formData.prezzoAcquisto * formData.manutenzione / 100) + formData.assicurazione) * formData.orizzonteTempo)}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span>Valore finale stimato:</span>
            <span className="text-green-600 font-medium">{formatCurrency(results.valoreNettoVendita)}</span>
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
        
        {/* Dettagli Affitto */}
        <div className="bg-purple-50 rounded-lg p-4 mb-4 border border-purple-200">
          <h4 className="font-semibold text-purple-800 mb-3 flex items-center">
            <span className="mr-2">📊</span>
            Dettagli Affitto
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Canone iniziale:</span>
              <span className="font-medium">{formatCurrency(canoneIniziale)}/mese</span>
            </div>
            <div className="flex justify-between">
              <span>Canone finale (dopo {formData.orizzonteTempo} anni):</span>
              <span className="font-medium">{formatCurrency(canoneFinale)}/mese</span>
            </div>
            <div className="flex justify-between">
              <span>Aumento canone:</span>
              <span className="font-medium">{formData.aumentoCanone}% annuo</span>
            </div>
            <div className="flex justify-between">
              <span>Cauzione:</span>
              <span className="font-medium">{formatCurrency(formData.canoneAffitto * formData.cauzione)}</span>
            </div>
            <div className="flex justify-between text-purple-700 font-semibold border-t border-purple-300 pt-2">
              <span>Totale affitti ({formData.orizzonteTempo} anni):</span>
              <span>{formatCurrency(totaleAffitti)}</span>
            </div>
          </div>
          
          {/* Breakdown Costi Affitto */}
          <div className="mt-3 p-3 bg-purple-100 rounded border border-purple-300">
            <div className="text-xs text-purple-800 font-semibold mb-2">Breakdown costi:</div>
            <div className="flex justify-between text-xs">
              <span>Affitti base:</span>
              <span>{formatCurrency(totaleAffitti)}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span>Spese condominiali:</span>
              <span>{formatCurrency(speseCondominialiTotali)}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span>Traslochi ({numeroTraslochi} volte):</span>
              <span>{formatCurrency(costiTraslochiTotali)}</span>
            </div>
            <div className="flex justify-between text-xs font-semibold border-t border-purple-300 pt-1 mt-1">
              <span>Totale:</span>
              <span>{formatCurrency(totaleAffitti + speseCondominialiTotali + costiTraslochiTotali)}</span>
            </div>
          </div>
        </div>
        
        {/* Breakdown Costi */}
        <div className="space-y-2">
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span>Cauzione iniziale:</span>
            <span>{formatCurrency(formData.canoneAffitto * formData.cauzione)}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span>Affitti totali ({formData.orizzonteTempo} anni):</span>
            <span>{formatCurrency(totaleAffitti)}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span>Spese condominiali ({formData.orizzonteTempo} anni):</span>
            <span>{formatCurrency(speseCondominialiTotali)}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span>Costi trasloco ({numeroTraslochi} traslochi):</span>
            <span>{formatCurrency(costiTraslochiTotali)}</span>
          </div>
          {investimentiInfo}
          <div className="flex justify-between py-2 font-semibold text-gray-800 border-t-2 border-purple-500 pt-3">
            <span>Costo totale:</span>
            <span>{formatCurrency(results.costiAffitto)}</span>
          </div>
          
          {/* Andamento Canone */}
          <div className="mt-4 p-3 bg-purple-50 rounded border border-purple-200">
            <div className="text-xs text-purple-800 font-semibold mb-2">📈 Andamento canone:</div>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="text-center">
                <div className="font-semibold">Inizio</div>
                <div className="text-purple-600">{formatCurrency(canoneIniziale)}/mese</div>
              </div>
              <div className="text-center">
                <div className="font-semibold">Metà periodo</div>
                <div className="text-purple-600">{formatCurrency(canoneIniziale * Math.pow(1 + formData.aumentoCanone / 100, Math.floor(formData.orizzonteTempo / 2)))}/mese</div>
              </div>
              <div className="text-center">
                <div className="font-semibold">Fine</div>
                <div className="text-purple-600">{formatCurrency(canoneFinale)}/mese</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonCards; 