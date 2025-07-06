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
    <div className="mb-4">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={handleChange}
        step={step}
        className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
      />
      {tooltip && (
        <div className="text-xs text-gray-500 mt-1 italic">
          {tooltip}
        </div>
      )}
    </div>
  );
};

export default InputField; 