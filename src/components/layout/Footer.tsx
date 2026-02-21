import React from 'react';
import FadeInSection from '../ui/FadeInSection';

const Footer = () => (
    <footer className="bg-[#212121] text-white py-[100px] px-6">
        <FadeInSection>
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
                <div className="md:col-span-1">
                    <span className="font-serif text-4xl italic">Fya</span>
                    <p className="mt-6 text-sm font-light text-[#959595]">Excellence in every stitch.</p>
                </div>

                <div className="space-y-8">
                    <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#959595]">Client Service</h4>
                    <ul className="space-y-4 text-sm font-light text-[#E4E1DE]">
                        <li><a href="#" className="hover:text-white transition-colors">Programări</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Livrare & Retur</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Întrebări Frecvente</a></li>
                    </ul>
                </div>

                <div className="space-y-8">
                    <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#959595]">Legal</h4>
                    <ul className="space-y-4 text-sm font-light text-[#E4E1DE]">
                        <li><a href="#" className="hover:text-white transition-colors">Termeni și Condiții</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Politica de Confidențialitate</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">ANPC</a></li>
                    </ul>
                </div>

                <div className="space-y-8">
                    <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#959595]">Newsletter</h4>
                    <div className="text-sm font-light space-y-4">
                        <p className="text-[#E4E1DE]">Abonează-te pentru a primi ultimele noutăți din atelier.</p>
                        <div className="flex border-b border-[#605F5F]">
                            <input type="email" placeholder="Email-ul tău" className="bg-transparent w-full py-2 outline-none text-white placeholder-[#605F5F]" />
                            <button className="uppercase text-[10px] font-bold tracking-widest hover:text-[#959595]">OK</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-24 pt-8 border-t border-[#605F5F]/30 text-center">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#959595]">© 2025 Fya Robes. All Rights Reserved.</p>
            </div>
        </FadeInSection>
    </footer>
);

export default Footer;
