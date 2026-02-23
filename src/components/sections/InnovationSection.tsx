import React from 'react';
import SectionTitle from '../ui/SectionTitle';
import FadeInSection from '../ui/FadeInSection';

const InnovationSection = () => (
    <div className="py-[120px] px-6 md:px-12 bg-[#F3F3F3]">
        <div className="max-w-7xl mx-auto">
            <SectionTitle title="Viitorul Couture-ului" subtitle="Fya Tech" centered />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16 px-4 md:px-0">
                <FadeInSection delay={100} className="h-full">
                    <div className="bg-white p-10 md:p-16 border border-[#E4E1DE] h-full hover:border-[#212121] transition-colors duration-[1.5s] group flex flex-col justify-center">
                        <span className="text-4xl mb-8 block group-hover:scale-110 transition-transform duration-[1.5s] ease-out origin-left text-[#AFA79D]">✧</span>
                        <h3 className="font-serif text-3xl md:text-4xl text-[#212121] italic mb-6">Probă Virtuală AI</h3>
                        <p className="text-[#959595] font-light leading-[2] text-sm md:text-base">
                            Incertitudinea vizuală dispare. Tehnologia noastră proprietară îți permite proba digitală a oricărei creații Fya.
                            Încarci o fotografie, iar algoritmul drapează digital mătasea pe silueta ta, respectând arhitectura rochiei, unghiurile de lumină și căderea naturală a materialului.
                        </p>
                    </div>
                </FadeInSection>

                <FadeInSection delay={300} className="h-full">
                    <div className="bg-white p-10 md:p-16 border border-[#E4E1DE] h-full hover:border-[#212121] transition-colors duration-[1.5s] group flex flex-col justify-center">
                        <span className="text-4xl mb-8 block group-hover:scale-110 transition-transform duration-[1.5s] ease-out origin-left text-[#AFA79D]">◉</span>
                        <h3 className="font-serif text-3xl md:text-4xl text-[#212121] italic mb-6">Cinematografie 360°</h3>
                        <p className="text-[#959595] font-light leading-[2] text-sm md:text-base">
                            Fiecare detaliu prinde viață. Oferim o perspectivă cinematică completă pentru fiecare piesă, surprinzând
                            fluiditatea texturilor și reflexiile broderiilor în mișcare. O confirmare vizuală absolută a deciziei tale.
                        </p>
                    </div>
                </FadeInSection>
            </div>
        </div>
    </div>
);

export default InnovationSection;
