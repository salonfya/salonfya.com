import React, { useState, useEffect } from 'react';
import Button from '../ui/Button';

const Hero = () => {
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const handleScroll = () => setOffset(window.scrollY * 0.4);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="relative h-[100vh] w-full overflow-hidden flex items-center justify-center bg-[#FAFAFA]">
            {/* YouTube Background */}
            <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
                <iframe
                    className="absolute top-1/2 left-1/2 w-[177.78vh] h-[56.25vw] min-h-screen min-w-full -translate-x-1/2 -translate-y-1/2 object-cover"
                    src="https://www.youtube.com/embed/dtbuUKJXAYc?autoplay=1&mute=1&controls=0&loop=1&playlist=dtbuUKJXAYc&start=5"
                    title="Hero Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ pointerEvents: 'none' }}
                ></iframe>
                <div className="absolute inset-0 bg-black/20 z-10"></div>
            </div>

            {/* Centered Overlay Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-20 p-6">
                <div className="bg-white/85 backdrop-blur-md p-12 md:p-20 text-center max-w-4xl animate-fadeInUp shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-white/50">
                    <p className="text-[11px] uppercase tracking-[0.4em] font-bold text-[#959595] mb-8">Colecția 2026</p>
                    <h1 className="hero-title text-[#212121] mb-10">
                        Imperial
                    </h1>
                    <p className="font-light text-[#212121] text-lg leading-relaxed max-w-lg mx-auto mb-12 font-serif italic text-opacity-80">
                        Eleganță regală, rafinament absolut. Rochii de mireasă create pentru momentele care definesc o viață.
                    </p>
                    <Button variant="outline" onClick={() => {
                        document.getElementById('colectii')?.scrollIntoView({ behavior: 'smooth' });
                    }}>
                        Explorează Colecția
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Hero;
