import React from 'react';

// Tag component for categories
const Tag = ({ children }: { children?: React.ReactNode }) => (
    <span className="inline-block px-4 py-1 bg-[#F3F3F3] text-[10px] uppercase tracking-[0.15em] text-[#959595] font-bold mb-2">
        {children}
    </span>
);

export default Tag;
