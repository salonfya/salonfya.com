import React from 'react';
import SectionTitle from '../ui/SectionTitle';
import FadeInSection from '../ui/FadeInSection';

const WhereToBuySection = () => {
    const locations = [
        { city: "București", address: "Calea Victoriei 128", phone: "+40 722 000 001" },
        { city: "Oradea", address: "Str. Republicii 12", phone: "+40 722 000 002" },
        { city: "Cluj-Napoca", address: "Str. Eroilor 5", phone: "+40 722 000 003" }
    ];

    return (
        <div className="py-[120px] px-6 md:px-12 max-w-[1800px] mx-auto where-to-buy">
            <SectionTitle title="Locații" subtitle="Where to Buy" centered />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                {locations.map((loc, idx) => (
                    <FadeInSection key={idx} delay={idx * 100}>
                        <div className="text-center p-8 border border-[#F3F3F3] hover:border-[#212121] transition-colors duration-500">
                            <h3 className="font-serif text-2xl italic text-[#212121] mb-4">{loc.city}</h3>
                            <p className="text-sm font-light text-[#959595] mb-2">{loc.address}</p>
                            <p className="text-sm font-light text-[#959595]">{loc.phone}</p>
                            <button className="mt-6 text-[10px] uppercase tracking-[0.2em] font-bold border-b border-[#212121] pb-1 hover:text-[#959595] hover:border-[#959595] transition-all">
                                Vezi pe Hartă
                            </button>
                        </div>
                    </FadeInSection>
                ))}
            </div>
        </div>
    );
};

export default WhereToBuySection;
