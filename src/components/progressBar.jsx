import React from 'react';

const ProgressBar = ({ percentage }) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-6 mb-2">
      <div
        className="bg-cyan-500 h-full rounded-full text-center text-white font-semibold"
        style={{ width: `${percentage}%` }}
      >
        {percentage}%
      </div>
    </div>
  );
};

export default ProgressBar;
