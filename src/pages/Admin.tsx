import React, { useState } from 'react';
import SectionTitle from '../components/ui/SectionTitle';

const Admin = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Temporary local bypass for UI development. 
        // In production, this will hit an /api/login route to verify against the hashed password for sothirs.serenia@gmail.com
        if (password === 'admin123') {
            setIsAuthenticated(true);
        } else {
            alert('Parolă incorectă');
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-[#EBE7E0] flex items-center justify-center p-6">
                <div className="bg-white p-12 shadow-2xl max-w-md w-full border border-[#E4E1DE] text-center">
                    <h1 className="font-serif text-4xl italic text-[#212121] mb-2">Fya Admin</h1>
                    <p className="text-[10px] uppercase tracking-widest text-[#959595] mb-12">Acces Restricționat</p>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="text-left">
                            <label className="block text-xs uppercase tracking-widest text-[#959595] mb-2">Email Autorizat</label>
                            <input
                                type="email"
                                value="sothirs.serenia@gmail.com"
                                disabled
                                className="w-full p-3 bg-[#FAFAFA] border border-[#E4E1DE] text-[#959595] outline-none text-sm font-light cursor-not-allowed"
                            />
                        </div>
                        <div className="text-left">
                            <label className="block text-xs uppercase tracking-widest text-[#959595] mb-2">Parolă</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-3 bg-white border border-[#E4E1DE] focus:border-[#212121] outline-none text-sm font-light transition-colors"
                                placeholder="Introduceți parola..."
                                required
                            />
                        </div>
                        <button type="submit" className="w-full bg-[#212121] text-white py-4 text-[10px] uppercase tracking-[0.2em] hover:bg-[#1a1a1a] transition-colors">
                            Autentificare
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#EBE7E0] flex">
            {/* Sidebar */}
            <div className="w-64 bg-white border-r border-[#E4E1DE] flex flex-col">
                <div className="p-8 border-b border-[#F3F3F3]">
                    <h2 className="font-serif text-3xl italic text-[#212121]">Fya</h2>
                    <p className="text-[9px] uppercase tracking-widest text-[#959595] mt-1">Sistem Administrare</p>
                </div>
                <nav className="flex-1 p-6 space-y-4">
                    <button className="w-full text-left text-sm tracking-wide text-[#212121] font-bold">Colecții</button>
                    <button className="w-full text-left text-sm tracking-wide text-[#959595] hover:text-[#212121] transition-colors">Rochii & Media</button>
                    <button className="w-full text-left text-sm tracking-wide text-[#959595] hover:text-[#212121] transition-colors">Texte Website</button>
                </nav>
                <div className="p-6 border-t border-[#F3F3F3]">
                    <button onClick={() => setIsAuthenticated(false)} className="text-xs text-red-800 uppercase tracking-widest hover:text-red-600 transition-colors">
                        Deconectare
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-12 overflow-y-auto">
                <div className="max-w-4xl">
                    <SectionTitle title="Gestiune Colecții" subtitle="Adaugă sau modifică colecțiile existente" />

                    <div className="bg-white p-8 border border-[#E4E1DE] mt-12 shadow-sm">
                        <h3 className="font-serif text-2xl text-[#212121] mb-6">Adaugă Colecție Nouă</h3>
                        <p className="text-sm text-[#959595] font-light mb-8">Aici va apărea interfața drag and drop pentru poze și clipuri video, conectată la baza de date Vercel.</p>

                        <div className="border-2 border-dashed border-[#E4E1DE] p-12 text-center bg-[#FAFAFA] cursor-pointer hover:border-[#212121] transition-colors">
                            <span className="text-sm font-light text-[#959595]">Trage fișierele aici sau dă click pentru a încărca (Imagini / Video)</span>
                        </div>

                        <div className="mt-8 space-y-6">
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-[#959595] mb-2">Sau adaugă Link Video (YouTube/Vimeo/URL Direct)</label>
                                <input type="url" placeholder="https://..." className="w-full p-3 border border-[#E4E1DE] focus:border-[#212121] outline-none text-sm font-light" />
                            </div>

                            <div className="flex items-center gap-3">
                                <input type="checkbox" id="autoplay" className="w-4 h-4 accent-[#212121]" />
                                <label htmlFor="autoplay" className="text-sm text-[#212121] font-light">Pornește videoclipul automat (Autoplay)</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;
