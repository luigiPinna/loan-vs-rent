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
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700">
        {label}
      </label>
      <select
        value={value}
        onChange={handleChange}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white hover:bg-gray-50 appearance-none"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {tooltip && (
        <div className="text-xs text-gray-500 bg-gray-50 px-3 py-2 rounded-md">
          💡 {tooltip}
        </div>
      )}
    </div>
  );
};

export default SelectField; 