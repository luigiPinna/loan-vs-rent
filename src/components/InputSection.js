import React, { useState } from 'react';
import InputField from './InputField';
import SelectField from './SelectField';
import CheckboxField from './CheckboxField';

const InputSection = ({ formData, onInputChange }) => {
  const [activeTab, setActiveTab] = useState('immobile');

  const tabs = [
    { id: 'immobile', label: '🏘️ Immobile', icon: '🏘️' },
    { id: 'mutuo', label: '🏦 Mutuo', icon: '🏦' },
    { id: 'affitto', label: '🏠 Affitto', icon: '🏠' },
    { id: 'avanzati', label: '⚙️ Avanzati', icon: '⚙️' }
  ];

  return (
    <div className="p-6">
      {/* Mobile Tabs */}
      <div className="md:hidden mb-6">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <span className="block text-lg mb-1">{tab.icon}</span>
              <span className="text-xs">{tab.label.split(' ')[1]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Desktop Grid */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`p-4 rounded-xl text-left transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-blue-50 border-2 border-blue-200 text-blue-700'
                : 'bg-gray-50 border-2 border-transparent text-gray-600 hover:bg-gray-100'
            }`}
          >
            <div className="text-2xl mb-2">{tab.icon}</div>
            <div className="font-semibold">{tab.label.split(' ')[1]}</div>
          </button>
        ))}
      </div>

      {/* Content Sections */}
      <div className="space-y-6">
        {/* Dati Immobile */}
        {(activeTab === 'immobile' || window.innerWidth >= 768) && (
          <div className={`${activeTab === 'immobile' ? 'block' : 'hidden md:block'}`}>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
              <h2 className="text-xl font-bold text-blue-800 mb-6 flex items-center">
                <span className="text-2xl mr-3">🏘️</span>
                Dati Immobile
              </h2>
        
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField
                  label="Prezzo d'acquisto (€)"
                  name="prezzoAcquisto"
                  value={formData.prezzoAcquisto}
                  onChange={onInputChange}
                  type="number"
                />
                
                <InputField
                  label="Spese ristrutturazione (€)"
                  name="speseRistrutturazione"
                  value={formData.speseRistrutturazione}
                  onChange={onInputChange}
                  type="number"
                  tooltip="Lavori iniziali: bagno, cucina, impianti"
                />
                
                <InputField
                  label="IMU annuale (€)"
                  name="imu"
                  value={formData.imu}
                  onChange={onInputChange}
                  type="number"
                />
                
                <InputField
                  label="Manutenzione (% valore)"
                  name="manutenzione"
                  value={formData.manutenzione}
                  onChange={onInputChange}
                  type="number"
                  step="0.1"
                />
                
                <InputField
                  label="Assicurazione (€)"
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
                  label="Valorizzazione annua (%)"
                  name="valorizzazione"
                  value={formData.valorizzazione}
                  onChange={onInputChange}
                  type="number"
                  step="0.1"
                  tooltip="Quanto aumenta il valore ogni anno"
                />
                
                <SelectField
                  label="Facilità di rivendita"
                  name="liquidita"
                  value={formData.liquidita}
                  onChange={onInputChange}
                  options={[
                    { value: 1, label: "Molto difficile (periferia)" },
                    { value: 0.9, label: "Difficile (zona poco richiesta)" },
                    { value: 0.8, label: "Normale (mercato standard)" },
                    { value: 0.7, label: "Buona (zona richiesta)" },
                    { value: 0.6, label: "Ottima (centro città)" }
                  ]}
                  tooltip="Influenza i costi di vendita"
                />
              </div>
            </div>
          </div>
        )}
      </div>

        {/* Dati Mutuo */}
        {(activeTab === 'mutuo' || window.innerWidth >= 768) && (
          <div className={`${activeTab === 'mutuo' ? 'block' : 'hidden md:block'}`}>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
              <h2 className="text-xl font-bold text-green-800 mb-6 flex items-center">
                <span className="text-2xl mr-3">🏦</span>
                Dati Mutuo
              </h2>
        
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField
                  label="Anticipo (%)"
                  name="anticipo"
                  value={formData.anticipo}
                  onChange={onInputChange}
                  type="number"
                />
                
                <InputField
                  label="Tasso interesse (%)"
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
                  label="Spese notarili (€)"
                  name="speseNotarili"
                  value={formData.speseNotarili}
                  onChange={onInputChange}
                  type="number"
                  tooltip="Notaio, agenzia, tasse di registro"
                />
              </div>
            </div>
          </div>
        )}

        {/* Dati Affitto */}
        {(activeTab === 'affitto' || window.innerWidth >= 768) && (
          <div className={`${activeTab === 'affitto' ? 'block' : 'hidden md:block'}`}>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
              <h2 className="text-xl font-bold text-purple-800 mb-6 flex items-center">
                <span className="text-2xl mr-3">🏠</span>
                Dati Affitto
              </h2>
        
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField
                  label="Canone mensile (€)"
                  name="canoneAffitto"
                  value={formData.canoneAffitto}
                  onChange={onInputChange}
                  type="number"
                  tooltip="Affitto dello stesso immobile"
                />
                
                <InputField
                  label="Aumento canone (%)"
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
                  label="Spese condominiali (€)"
                  name="speseCondominiali"
                  value={formData.speseCondominiali}
                  onChange={onInputChange}
                  type="number"
                />
                
                <InputField
                  label="Costi trasloco (€)"
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
            </div>
          </div>
        )}

        {/* Parametri Avanzati */}
        {(activeTab === 'avanzati' || window.innerWidth >= 768) && (
          <div className={`${activeTab === 'avanzati' ? 'block' : 'hidden md:block'}`}>
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-200">
              <h2 className="text-xl font-bold text-orange-800 mb-6 flex items-center">
                <span className="text-2xl mr-3">⚙️</span>
                Parametri Avanzati
              </h2>
        
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  tooltip="Tasse sulla plusvalenza"
                />
                
                <SelectField
                  label="Rischio mercato"
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
                  tooltip="Rendimento dell'anticipo investito altrove"
                />
                
                {formData.includiInvestimenti && (
                  <InputField
                    label="Tasso di sconto (%)"
                    name="tassoSconto"
                    value={formData.tassoSconto}
                    onChange={onInputChange}
                    type="number"
                    step="0.1"
                    tooltip="Rendimento alternativo"
                  />
                )}
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default InputSection; 