import React from 'react';

const CheckboxField = ({ 
  label, 
  name, 
  checked, 
  onChange, 
  tooltip 
}) => {
  const handleChange = (e) => {
    onChange(name, e.target.checked);
  };

  return (
    <div className="mb-4">
      <label className="flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          className="w-4 h-4 mr-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <span className="text-sm font-semibold text-gray-700">
          {label}
        </span>
      </label>
      {tooltip && (
        <div className="text-xs text-gray-500 mt-1 italic ml-7">
          {tooltip}
        </div>
      )}
    </div>
  );
};

export default CheckboxField; 