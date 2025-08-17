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
    <div className="space-y-2">
      <label className="flex items-center cursor-pointer p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
        <input
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          className="w-5 h-5 mr-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
        />
        <span className="text-sm font-semibold text-gray-700">
          {label}
        </span>
      </label>
      {tooltip && (
        <div className="text-xs text-gray-500 bg-gray-50 px-3 py-2 rounded-md ml-8">
          💡 {tooltip}
        </div>
      )}
    </div>
  );
};

export default CheckboxField; 