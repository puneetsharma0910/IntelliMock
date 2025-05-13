import React from 'react';

const SpinnerLoader = ({ size = 'sm', color = 'white' }) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  };

  const colorClasses = {
    white: 'border-white',
    gray: 'border-gray-600',
    orange: 'border-orange-500'
  };

  return (
    <div className={`inline-block ${sizeClasses[size]} animate-spin rounded-full border-2 border-solid ${colorClasses[color]} border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]`} 
      role="status">
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  );
};

export default SpinnerLoader;
