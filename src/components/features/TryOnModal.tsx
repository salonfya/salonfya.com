import React, { useState, useRef } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { Dress } from '../../types';
import { generateTryOn } from '../../services/ai';

const TryOnModal = ({ dress, isOpen, onClose }: { dress: Dress, isOpen: boolean, onClose: () => void }) => {
    const [userImage, setUserImage] = useState<string | null>(null);
    const [resultImage, setResultImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setErrorMsg(null);
            const reader = new FileReader();
            reader.onloadend = () => setUserImage(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleGenerate = async () => {
        if (!userImage) return;
        setLoading(true);
        setErrorMsg(null);
        try {
            const result = await generateTryOn(userImage, dress.imageUrl, dress.description);
            setResultImage(result);
        } catch (error: any) {
            console.error(error);
            setErrorMsg(error.message || 'A apărut o eroare. Vă rugăm să încercați o altă fotografie.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Probă Virtuală AI" fullScreen>
            <div className="grid grid-cols-1 md:grid-cols-2 h-full min-h-[85vh]">
                {/* Left Side: Interaction */}
                <div className="p-8 md:p-20 flex flex-col justify-center bg-[#EBE7E0] border-r border-[#E4E1DE]">
                    <div className="max-w-lg mx-auto w-full space-y-12">
                        <div className="space-y-6">
                            <h2 className="font-serif text-5xl italic text-[#212121]">Reflexia Ta</h2>
                            <p className="font-light text-[#959595] leading-relaxed">
                                Tehnologia noastră AI se adaptează proporțiilor tale.
                                Pentru un rezultat fotorealist, te rugăm să respecți câteva reguli simple:
                            </p>
                            <ul className="text-sm font-light text-[#605F5F] list-disc pl-5 space-y-2">
                                <li>Folosește o fotografie din față (sau ușor din unghi), din cap până-n picioare.</li>
                                <li>Asigură-te că lumina este uniformă (evită umbrele puternice pe corp).</li>
                                <li>O îmbrăcăminte strâmtă (de corp) va genera cele mai precise rezultate permițând AI-ului să croiască rochia corect.</li>
                            </ul>
                        </div>

                        {!userImage ? (
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="group border border-dashed border-[#AFA79D] py-20 px-8 text-center cursor-pointer hover:bg-white hover:border-[#212121] transition-all duration-500"
                            >
                                <span className="block text-4xl font-light text-[#AFA79D] group-hover:text-[#212121] mb-6 transition-colors">+</span>
                                <span className="uppercase tracking-[0.2em] text-[11px] font-bold text-[#212121]">Încarcă Fotografia</span>
                                <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={handleFileUpload} />
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <div className="relative aspect-[3/4] w-2/3 mx-auto bg-white p-2 shadow-sm">
                                    <img src={userImage} className="w-full h-full object-cover grayscale" alt="User" />
                                    <button onClick={() => setUserImage(null)} className="absolute -right-4 -top-4 w-8 h-8 flex items-center justify-center bg-[#212121] text-white rounded-full hover:bg-[#605F5F]">
                                        ✕
                                    </button>
                                </div>
                                {!resultImage && (
                                    <div className="space-y-4">
                                        <Button onClick={handleGenerate} disabled={loading} className="w-full" variant="primary">
                                            {loading ? "Procesare AI..." : "Generează Proba"}
                                        </Button>
                                        {errorMsg && (
                                            <p className="text-red-500 text-sm text-center">{errorMsg}</p>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Side: Result */}
                <div className="p-8 md:p-20 flex items-center justify-center bg-white relative">
                    {loading ? (
                        <div className="text-center space-y-8">
                            <div className="w-px h-24 bg-[#E4E1DE] mx-auto overflow-hidden">
                                <div className="w-full h-full bg-[#212121] animate-[loading_1.5s_ease-in-out_infinite]"></div>
                            </div>
                            <p className="font-serif text-2xl italic text-[#212121]">Croitorul digital lucrează...</p>
                        </div>
                    ) : resultImage ? (
                        <div className="relative w-full max-w-lg animate-fadeInUp">
                            <div className="p-4 bg-white shadow-2xl rotate-1 transition-transform hover:rotate-0 duration-700">
                                <img src={resultImage} className="w-full h-auto vintage-pastel" alt="Try On Result" />
                            </div>
                            <div className="mt-12 flex justify-center gap-6">
                                <Button onClick={() => setResultImage(null)} variant="outline">Încearcă din nou</Button>
                                <Button onClick={() => { }} variant="primary">Salvează Imaginea</Button>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center opacity-30 select-none">
                            <span className="font-serif text-[150px] italic text-[#E4E1DE] leading-none">Fya</span>
                        </div>
                    )}
                </div>
            </div>
        </Modal>
    );
};

export default TryOnModal;
