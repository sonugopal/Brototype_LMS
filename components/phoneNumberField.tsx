import React from 'react';

const phoneNumberField = () => {
  return (
    <div className="flex items-center">
      <div className="mr-2">
        <select className="p-2 border border-gray-300 rounded">
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>
      </div>
      <input className="p-2 border border-gray-300 rounded" type="text" placeholder="Enter text..." />
      <button className="p-2 bg-blue-500 text-white rounded">Submit</button>
    </div>
  );
};

export default phoneNumberField;