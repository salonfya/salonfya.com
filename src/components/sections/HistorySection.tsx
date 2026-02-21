import React, { useState, useEffect, useRef } from 'react';

const useScrollProgress = (ref: React.RefObject<HTMLElement>) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!ref.current) return;
            const rect = ref.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const start = windowHeight * 0.9;
            const end = windowHeight * 0.4;
            const elementTop = rect.top;
            let p = (start - elementTop) / (start - end);
            p = Math.min(Math.max(p, 0), 1);
            setProgress(p);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [ref]);

    return progress;
};

const ScrollTextReveal = ({ text, className = "" }: { text: string, className?: string }) => {
    const ref = useRef<HTMLDivElement>(null);
    const progress = useScrollProgress(ref);
    const words = text.split(" ");

    return (
        <p ref={ref} className={`${className} flex flex-wrap gap-[0.3em]`}>
            {words.map((word, i) => {
                const wordProgress = (progress * words.length) - i;
                const opacity = Math.min(Math.max(wordProgress + 0.2, 0.2), 1);
                return (
                    <span key={i} style={{ opacity, transition: 'opacity 0.1s' }}>{word}</span>
                );
            })}
        </p>
    );
};

const HistorySection = () => {
    return (
        <div className="bg-[#0A0A0A] text-white py-40 transition-colors duration-1000 relative z-10">
            <div className="max-w-[1800px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-40">
                <div className="lg:col-span-12 relative h-[80vh] overflow-hidden">
                    <div className="absolute inset-0 bg-black/20 z-10"></div>
                    <img src="/images/history_hero_portrait.png" className="w-full h-full object-cover object-top parallax-y" alt="Fya Muse" />
                    <div className="absolute bottom-12 left-6 md:left-12 z-20">
                        <h2 className="font-serif text-6xl md:text-[8rem] leading-none text-white mix-blend-difference opacity-90">Origins</h2>
                    </div>
                </div>
            </div>
            <div className="max-w-4xl mx-auto px-6 mb-40">
                <ScrollTextReveal
                    text="Fya Atelier nu a început ca un brand, ci ca o stare de spirit. O rebeliune tăcută împotriva zgomotului, o întoarcere la esențial. În fiecare cusătură ascundem o poveste despre timp, răbdare și căutarea perfecțiunii în imperfecțiune."
                    className="font-serif text-3xl md:text-5xl leading-tight text-center text-[#E4E1DE]"
                />
            </div>
            <div className="max-w-[1600px] mx-auto px-6 space-y-32 mb-40">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                    <div className="md:col-span-5 md:col-start-2">
                        <div className="aspect-[4/5] overflow-hidden relative group">
                            <img src="/images/atelier_hands_sewing.png" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" alt="Craftsmanship" />
                        </div>
                    </div>
                    <div className="md:col-span-4 md:col-start-8">
                        <h3 className="text-[10px] uppercase tracking-[0.3em] text-[#959595] mb-6">01. Măiestrie</h3>
                        <p className="font-light text-[#959595] text-lg leading-relaxed">Nu credem în grabă. Fiecare rochie este sculptată manual, un proces lent și deliberat care transformă materialul brut într-o a doua piele.</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                    <div className="md:col-span-4 md:col-start-2 order-2 md:order-1">
                        <h3 className="text-[10px] uppercase tracking-[0.3em] text-[#959595] mb-6">02. Materialitate</h3>
                        <p className="font-light text-[#959595] text-lg leading-relaxed">Mătasea, dantela și lumina sunt singurele noastre instrumente. Restul este viziune și absența compromisului.</p>
                    </div>
                    <div className="md:col-span-5 md:col-start-7 order-1 md:order-2">
                        <div className="aspect-[4/5] overflow-hidden relative group">
                            <img src="/images/atelier_vintage.png" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-1000" alt="Atelier Atmosphere" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative w-full h-screen overflow-hidden">
                <video className="w-full h-full object-cover grayscale opacity-60" autoPlay loop muted playsInline>
                    <source src="/images/CINEMATIC.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 flex items-center justify-center">
                    <h2 className="font-serif text-[10vw] italic text-white/20 mix-blend-overlay">Atelier 2026</h2>
                </div>
            </div>
        </div>
    );
};

export default HistorySection;
