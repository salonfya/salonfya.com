import React from 'react';

const Hero = () => {
    return (
        <div className="relative h-[100vh] w-full overflow-hidden flex items-center justify-center bg-[#0A0A0A]">
            {/* Video Background */}
            <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
                <iframe
                    className="absolute top-1/2 left-1/2 w-[177.78vh] h-[56.25vw] min-h-screen min-w-full -translate-x-1/2 -translate-y-1/2 object-cover"
                    src="https://www.youtube.com/embed/dtbuUKJXAYc?autoplay=1&mute=1&controls=0&loop=1&playlist=dtbuUKJXAYc&start=5&showinfo=0&modestbranding=1"
                    title="Fya Atelier"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ pointerEvents: 'none' }}
                />
                <div className="absolute inset-0 bg-black/30 z-10" />
            </div>

            {/* Center Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-20 p-6">
                <div className="text-center max-w-4xl animate-fadeInUp-slow">
                    <p className="text-[10px] md:text-[11px] uppercase tracking-[0.4em] font-bold text-white/50 mb-6">Colecția 2026</p>
                    <h1 className="font-serif text-6xl md:text-8xl lg:text-[10rem] italic text-white mb-6 leading-[0.85] tracking-tight">
                        Fya
                    </h1>
                    <p className="text-[10px] md:text-[11px] uppercase tracking-[0.5em] font-bold text-white/40 mb-10">Haute Couture · Oradea</p>
                    <p className="font-light text-white/70 text-base md:text-xl leading-[1.8] max-w-lg mx-auto mb-14 font-serif italic">
                        O odă adusă feminității, sculptată în mătase pură pentru momente ce devin atemporale.
                    </p>
                    <button
                        onClick={() => {
                            const el = document.getElementById('colectii') || document.querySelector('section');
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                            else window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
                        }}
                        className="inline-flex items-center gap-3 border border-white/30 text-white/80 px-10 py-4 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-white hover:text-[#212121] transition-all duration-500"
                    >
                        Explorează Colecțiile
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M19 12H5M12 19l-7-7 7-7" style={{ transform: 'rotate(270deg)', transformOrigin: '12px 12px' }} />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 animate-pulse">
                <span className="text-[8px] uppercase tracking-[0.3em] text-white/30">Scroll</span>
                <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
            </div>
        </div>
    );
};

export default Hero;
