import React from 'react';

const SelectField = ({ 
  label, 
  name, 
  value, 
  onChange, 
  options, 
  tooltip 
}) => {
  const handleChange = (e) => {
    const newValue = parseFloat(e.target.value);
    onChange(name, newValue);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>
      <select
        value={value}
        onChange={handleChange}
        className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {tooltip && (
        <div className="text-xs text-gray-500 mt-1 italic">
          {tooltip}
        </div>
      )}
    </div>
  );
};

export default SelectField; 