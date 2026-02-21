import React from 'react';
import SectionTitle from '../ui/SectionTitle';
import FadeInSection from '../ui/FadeInSection';

const AtelierSection = () => (
    <div id="atelier" className="py-[120px] bg-[#212121] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="order-2 lg:order-1 space-y-16">
                <FadeInSection>
                    <SectionTitle title="Atelierul de Creație" subtitle="Meșteșug & Inovație" />
                    <p className="text-[#959595] font-light leading-relaxed text-lg max-w-xl mt-8">
                        Fiecare rochie Fya este rezultatul a sute de ore de muncă manuală, îmbinate cu precizia tehnologiei moderne.
                        Credem în "Slow Fashion" și în piese care transcend tendințele sezoniere.
                    </p>
                    <div className="grid grid-cols-2 gap-12 pt-12 border-t border-[#605F5F]/30 mt-12">
                        <div>
                            <span className="block text-5xl font-serif italic mb-3">100%</span>
                            <span className="text-[10px] uppercase tracking-widest text-[#959595]">Mătase Naturală</span>
                        </div>
                        <div>
                            <span className="block text-5xl font-serif italic mb-3">Oradea</span>
                            <span className="text-[10px] uppercase tracking-widest text-[#959595]">Fabricat în România</span>
                        </div>
                    </div>
                </FadeInSection>
            </div>
            <div className="order-1 lg:order-2 relative aspect-square">
                <FadeInSection delay={300}>
                    <div className="w-full h-full relative overflow-hidden">
                        <img
                            src="/images/atelier_vintage.png"
                            className="w-full h-full object-cover opacity-80 hover:scale-105 transition-transform duration-[2s] vintage-pastel"
                            alt="Atelier detail"
                        />
                        <div className="absolute bottom-12 right-12 text-right">
                            <p className="font-serif text-3xl italic">"Detaliile fac perfecțiunea."</p>
                            <p className="text-[10px] uppercase tracking-widest mt-4 opacity-50">Leonardo da Vinci</p>
                        </div>
                    </div>
                </FadeInSection>
            </div>
        </div>
    </div>
);

export default AtelierSection;
