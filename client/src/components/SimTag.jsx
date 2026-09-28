import React from 'react';

export const SimTag = ({ label = 'Simulated', className = '' }) => {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md bg-harvest-100 text-harvest-700 border border-harvest-400/60 px-1.5 h-5 text-[10px] font-semibold uppercase tracking-wide shrink-0 ${className}`}
      title="This value is simulated for demonstration purposes and does not represent live hardware output."
    >
      <span className="w-1 h-1 rounded-full bg-harvest-400 animate-pulse" />
      {label}
    </span>
  );
};

export default SimTag;
