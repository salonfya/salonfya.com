import React from 'react';
import SectionTitle from '../ui/SectionTitle';
import FadeInSection from '../ui/FadeInSection';

const InnovationSection = () => (
    <div className="py-[120px] px-6 md:px-12 bg-[#F3F3F3]">
        <div className="max-w-7xl mx-auto">
            <SectionTitle title="Inovație Digitală" subtitle="Fya Tech" centered />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
                <FadeInSection delay={100}>
                    <div className="bg-white p-12 border border-[#E4E1DE] h-full hover:border-[#212121] transition-colors duration-500 group">
                        <span className="text-4xl mb-6 block group-hover:scale-110 transition-transform duration-500 origin-left">✧</span>
                        <h3 className="font-serif text-3xl text-[#212121] italic mb-4">Probă Virtuală AI</h3>
                        <p className="text-[#959595] font-light leading-relaxed">
                            Nu ești sigură de mărime sau stil? Tehnologia noastră de ultimă generație îți permite să "probezi" rochiile digital.
                            Încarcă o fotografie, iar algoritmul nostru va adapta perfect rochia pe silueta ta, respectând lumina și postura.
                        </p>
                    </div>
                </FadeInSection>

                <FadeInSection delay={200}>
                    <div className="bg-white p-12 border border-[#E4E1DE] h-full hover:border-[#212121] transition-colors duration-500 group">
                        <span className="text-4xl mb-6 block group-hover:scale-110 transition-transform duration-500 origin-left">◉</span>
                        <h3 className="font-serif text-3xl text-[#212121] italic mb-4">Cinematografie 360°</h3>
                        <p className="text-[#959595] font-light leading-relaxed">
                            Experimentează fiecare detaliu în mișcare. Generăm video-uri 360° de înaltă definiție pentru a surprinde fluiditatea materialelor
                            și strălucirea aplicațiilor din orice unghi, oferindu-ți o perspectivă completă înainte de a rezerva.
                        </p>
                    </div>
                </FadeInSection>
            </div>
        </div>
    </div>
);

export default InnovationSection;
