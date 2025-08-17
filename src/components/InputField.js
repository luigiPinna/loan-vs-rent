import React from 'react';

const InputField = ({ 
  label, 
  name, 
  value, 
  onChange, 
  type = "number", 
  step, 
  tooltip 
}) => {
  const handleChange = (e) => {
    const newValue = type === "number" ? parseFloat(e.target.value) || 0 : e.target.value;
    onChange(name, newValue);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700">
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={handleChange}
          step={step}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white hover:bg-gray-50"
          placeholder="0"
        />
        {type === "number" && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <span className="text-gray-400 text-sm">€</span>
          </div>
        )}
      </div>
      {tooltip && (
        <div className="text-xs text-gray-500 bg-gray-50 px-3 py-2 rounded-md">
          💡 {tooltip}
        </div>
      )}
    </div>
  );
};

export default InputField; 