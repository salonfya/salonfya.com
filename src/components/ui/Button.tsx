import React from 'react';

const Button = ({ children, onClick, variant = 'primary', className = '', disabled = false, icon = null }: any) => {
    const baseStyle = "group relative px-10 py-5 text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-4 rounded-none overflow-hidden outline-none";

    const variants: any = {
        primary: "bg-[#212121] text-white",
        secondary: "bg-white text-[#212121] border border-[#E4E1DE] hover:border-[#212121]",
        outline: "bg-transparent border-b border-[#212121] text-[#212121] px-0 py-2 gap-2 hover:opacity-50",
        ghost: "bg-transparent text-[#212121] hover:bg-[#F3F3F3]",
        danger: "bg-white text-red-800 border border-red-100 hover:bg-red-50"
    };

    return (
        <button
            onClick={onClick}
            className={`${baseStyle} ${variants[variant]} ${className}`}
            disabled={disabled}
        >
            {/* Sliding Background for Primary */}
            {variant === 'primary' && (
                <span className="absolute inset-0 bg-[#605F5F] transform translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0 z-0"></span>
            )}

            <span className="relative z-10 flex items-center gap-3">
                {icon && <span className="text-sm">{icon}</span>}
                {children}
            </span>

            {/* Decorative Border for Secondary */}
            {variant === 'secondary' && (
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#212121] transition-all duration-700 group-hover:w-full"></span>
            )}
        </button>
    );
};

export default Button;
