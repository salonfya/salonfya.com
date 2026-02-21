import React, { useState, useEffect } from 'react';

const IntroAnimation = ({ onComplete }: { onComplete: () => void }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [phase, setPhase] = useState(0);

    useEffect(() => {
        // Phases: 0 - initial, 1 - visible, 2 - fade out
        const t1 = setTimeout(() => setPhase(1), 100);
        const t2 = setTimeout(() => setPhase(2), 2500);
        const t3 = setTimeout(() => {
            setIsVisible(false);
            onComplete();
        }, 3200);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
        };
    }, [onComplete]);

    if (!isVisible) return null;

    return (
        <div className={`fixed inset-0 z-[200] bg-[#FAFAFA] flex items-center justify-center transition-opacity duration-1000 ${phase === 2 ? 'opacity-0' : 'opacity-100'}`}>
            <div className="relative overflow-hidden">
                <div className="flex flex-col items-center">
                    <span className={`text-[10px] uppercase tracking-[0.5em] text-[#959595] mb-4 transition-all duration-1000 ${phase >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        Bienvenue à
                    </span>
                    <h1 className={`font-serif text-5xl md:text-8xl text-[#212121] uppercase tracking-[0.3em] transition-all duration-[1.5s] ease-out ${phase >= 1 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-110'}`}>
                        Fya Atelier
                    </h1>
                    <div className={`w-20 h-px bg-[#212121] mt-8 transition-all duration-1000 delay-500 ${phase >= 1 ? 'w-40 opacity-100' : 'w-0 opacity-0'}`}></div>
                </div>
            </div>
        </div>
    );
};

export default IntroAnimation;
