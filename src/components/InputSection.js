import React from 'react';
import InputField from './InputField';
import SelectField from './SelectField';
import CheckboxField from './CheckboxField';

const InputSection = ({ formData, onInputChange }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8 mb-8">
      {/* Dati Immobile */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-3 border-b-2 border-blue-500">
          🏘️ Dati Immobile
        </h2>
        
        <InputField
          label="Prezzo d'acquisto (€)"
          name="prezzoAcquisto"
          value={formData.prezzoAcquisto}
          onChange={onInputChange}
          type="number"
        />
        
        <InputField
          label="Spese ristrutturazione/restauro (€)"
          name="speseRistrutturazione"
          value={formData.speseRistrutturazione}
          onChange={onInputChange}
          type="number"
          tooltip="Lavori iniziali: bagno, cucina, impianti, pitture"
        />
        
        <InputField
          label="IMU annuale (€)"
          name="imu"
          value={formData.imu}
          onChange={onInputChange}
          type="number"
        />
        
        <InputField
          label="Manutenzione annuale (% valore)"
          name="manutenzione"
          value={formData.manutenzione}
          onChange={onInputChange}
          type="number"
          step="0.1"
        />
        
        <InputField
          label="Assicurazione annuale (€)"
          name="assicurazione"
          value={formData.assicurazione}
          onChange={onInputChange}
          type="number"
        />
        
        <InputField
          label="Orizzonte temporale (anni)"
          name="orizzonteTempo"
          value={formData.orizzonteTempo}
          onChange={onInputChange}
          type="number"
          tooltip="Per quanto tempo prevedi di rimanere"
        />
        
        <InputField
          label="Valorizzazione annua immobile (%)"
          name="valorizzazione"
          value={formData.valorizzazione}
          onChange={onInputChange}
          type="number"
          step="0.1"
          tooltip="Quanto aumenta il valore dell'immobile ogni anno"
        />
        
        <SelectField
          label="Facilità di rivendita"
          name="liquidita"
          value={formData.liquidita}
          onChange={onInputChange}
          options={[
            { value: 1, label: "Molto difficile (periferia, mercato stagnante)" },
            { value: 0.9, label: "Difficile (zona poco richiesta)" },
            { value: 0.8, label: "Normale (mercato standard)" },
            { value: 0.7, label: "Buona (zona richiesta)" },
            { value: 0.6, label: "Ottima (centro città, alta domanda)" }
          ]}
          tooltip="Influenza i costi di vendita e i tempi"
        />
      </div>

      {/* Dati Mutuo */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-3 border-b-2 border-blue-500">
          🏦 Dati Mutuo
        </h2>
        
        <InputField
          label="Anticipo (%)"
          name="anticipo"
          value={formData.anticipo}
          onChange={onInputChange}
          type="number"
        />
        
        <InputField
          label="Tasso interesse annuo (%)"
          name="tassoInteresse"
          value={formData.tassoInteresse}
          onChange={onInputChange}
          type="number"
          step="0.1"
        />
        
        <InputField
          label="Durata mutuo (anni)"
          name="durataMutuo"
          value={formData.durataMutuo}
          onChange={onInputChange}
          type="number"
        />
        
        <InputField
          label="Spese notarili e agenzia (€)"
          name="speseNotarili"
          value={formData.speseNotarili}
          onChange={onInputChange}
          type="number"
          tooltip="Notaio, agenzia, tasse di registro"
        />
      </div>

      {/* Dati Affitto */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-3 border-b-2 border-blue-500">
          🏠 Dati Affitto
        </h2>
        
        <InputField
          label="Canone mensile (€)"
          name="canoneAffitto"
          value={formData.canoneAffitto}
          onChange={onInputChange}
          type="number"
          tooltip="Affitto dello stesso immobile o equivalente"
        />
        
        <InputField
          label="Aumento canone annuo (%)"
          name="aumentoCanone"
          value={formData.aumentoCanone}
          onChange={onInputChange}
          type="number"
          step="0.1"
          tooltip="Inflazione + rivalutazioni"
        />
        
        <InputField
          label="Cauzione (mensilità)"
          name="cauzione"
          value={formData.cauzione}
          onChange={onInputChange}
          type="number"
        />
        
        <InputField
          label="Spese condominiali mensili (€)"
          name="speseCondominiali"
          value={formData.speseCondominiali}
          onChange={onInputChange}
          type="number"
        />
        
        <InputField
          label="Costi trasloco ogni X anni (€)"
          name="costiTrasloco"
          value={formData.costiTrasloco}
          onChange={onInputChange}
          type="number"
        />
        
        <InputField
          label="Frequenza trasloco (anni)"
          name="frequenzaTrasloco"
          value={formData.frequenzaTrasloco}
          onChange={onInputChange}
          type="number"
        />
      </div>

      {/* Parametri Finanziari */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-3 border-b-2 border-blue-500">
          📊 Parametri Finanziari
        </h2>
        
        <InputField
          label="Inflazione annua (%)"
          name="inflazione"
          value={formData.inflazione}
          onChange={onInputChange}
          type="number"
          step="0.1"
        />
        
        <InputField
          label="Tassazione capital gains (%)"
          name="tassazione"
          value={formData.tassazione}
          onChange={onInputChange}
          type="number"
          tooltip="Tasse sulla plusvalenza immobiliare"
        />
        
        <SelectField
          label="Rischio mercato immobiliare"
          name="rischioMercato"
          value={formData.rischioMercato}
          onChange={onInputChange}
          options={[
            { value: 0, label: "Molto basso (mercato stabile)" },
            { value: 0.05, label: "Basso (lieve volatilità)" },
            { value: 0.1, label: "Medio (volatilità normale)" },
            { value: 0.15, label: "Alto (mercato volatile)" },
            { value: 0.2, label: "Molto alto (crisi possibile)" }
          ]}
        />
        
        <CheckboxField
          label="Considera investimenti alternativi"
          name="includiInvestimenti"
          checked={formData.includiInvestimenti}
          onChange={onInputChange}
          tooltip="Se attivato, considera il rendimento dell'anticipo investito altrove"
        />
        
        {formData.includiInvestimenti && (
          <InputField
            label="Tasso di sconto annuo (%)"
            name="tassoSconto"
            value={formData.tassoSconto}
            onChange={onInputChange}
            type="number"
            step="0.1"
            tooltip="Rendimento alternativo dei tuoi investimenti"
          />
        )}
      </div>
    </div>
  );
};

export default InputSection; 