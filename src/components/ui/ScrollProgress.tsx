import React, { useState, useEffect } from 'react';

const ScrollProgress = () => {
    const [progress, setProgress] = useState(0);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;
            setProgress(scrollPercent);
            setVisible(scrollTop > 400);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    const circumference = 2 * Math.PI * 18;
    const strokeDashoffset = circumference - progress * circumference;

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-8 right-8 z-40 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 group hidden md:flex ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}
            aria-label="Back to top"
        >
            {/* Progress circle */}
            <svg className="absolute inset-0 w-12 h-12 -rotate-90" viewBox="0 0 40 40">
                <circle cx="20" cy="20" r="18" fill="white" stroke="#E4E1DE" strokeWidth="1.5" />
                <circle
                    cx="20" cy="20" r="18"
                    fill="none"
                    stroke="#212121"
                    strokeWidth="1.5"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className="transition-[stroke-dashoffset] duration-100"
                />
            </svg>
            {/* Arrow */}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#212121" strokeWidth="2" className="relative z-10 group-hover:-translate-y-0.5 transition-transform">
                <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
        </button>
    );
};

export default ScrollProgress;
