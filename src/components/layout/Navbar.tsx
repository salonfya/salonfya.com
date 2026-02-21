import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

const Navbar = ({ onOpenWardrobe, wardrobeCount }: any) => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 w-full z-40 px-6 md:px-12 py-6 flex justify-between items-center transition-all duration-700 ${scrolled ? 'bg-[#FAFAFA]/90 backdrop-blur-md border-b border-[#E4E1DE] py-4' : 'bg-transparent text-[#212121] py-6'}`}>
            <div className="w-1/3 hidden md:flex gap-8 text-[11px] font-bold uppercase tracking-[0.2em]">
                <Link to="/imperial" className="hover:text-[#605F5F] transition-colors">Imperial</Link>
                <Link to="/anna" className="hover:text-[#605F5F] transition-colors">Anna</Link>
            </div>

            <div className="w-1/3 text-center">
                <Link to="/" onClick={() => window.scrollTo(0, 0)} className="font-serif text-3xl italic tracking-wide cursor-pointer">Fya</Link>
            </div>

            <div className="w-1/3 flex justify-end gap-8 text-[11px] font-bold uppercase tracking-[0.2em]">
                <button className="hidden md:block hover:text-[#605F5F] transition-colors">Ro</button>
                <button className="flex items-center gap-2 hover:text-[#605F5F] transition-colors" onClick={onOpenWardrobe}>
                    Garderobă ({wardrobeCount})
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
