import React from 'react';

export const PlatformStructure = ({children}:{children:any}) => {
  return (
    <div className="flex bg-bren-blue-100 min-h-screen w-full bg-gradient-to-r from-[#1C2637] to-[#101526]">
      {children}
    </div>
  );
};