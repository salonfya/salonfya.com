import React from 'react';

const Modal = ({ isOpen, onClose, children, title, fullScreen = false }: any) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-0">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-[#FAFAFA]/80 backdrop-blur-md transition-opacity duration-700"
                onClick={onClose}
            ></div>

            {/* Content Container */}
            <div className={`
        relative bg-white w-full 
        ${fullScreen ? 'h-full' : 'max-h-[95vh] max-w-7xl h-auto border border-[#E4E1DE] shadow-[0_40px_100px_rgba(0,0,0,0.1)]'} 
        animate-fadeInUp overflow-hidden flex flex-col
      `}>
                {/* Header */}
                <div className="px-8 md:px-16 py-10 flex justify-between items-center bg-white z-20 border-b border-[#F3F3F3]">
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-[0.4em] text-[#959595] font-bold mb-2">Fya Haute Couture</span>
                        <h3 className="font-serif text-3xl md:text-5xl text-[#212121] italic leading-tight">{title}</h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="group relative w-16 h-16 flex items-center justify-center border border-[#E4E1DE] hover:border-[#212121] transition-all rounded-full"
                        aria-label="Close"
                    >
                        <span className="absolute inset-0 bg-[#212121] scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full"></span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1"
                            className="relative z-10 group-hover:text-white group-hover:rotate-90 transition-all duration-500"
                        >
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>

                {/* Inner Content */}
                <div className="flex-1 overflow-y-auto scrollbar-hide bg-white">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
