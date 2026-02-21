import React from 'react';
import Modal from '../ui/Modal';
import { WardrobeItem } from '../../types';
import { DRESSES } from '../../constants';

const WardrobeModal = ({
    isOpen,
    onClose,
    wardrobe,
    onUpdateItem,
    onRemoveItem,
    onClearAll
}: {
    isOpen: boolean;
    onClose: () => void;
    wardrobe: WardrobeItem[];
    onUpdateItem: (id: string, field: keyof WardrobeItem, value: string) => void;
    onRemoveItem: (id: string) => void;
    onClearAll: () => void;
}) => {
    const styles = ["Boho", "Classic", "Princess", "Mermaid", "Minimalist", "Glamour", "Vintage"];

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`Garderoba Mea (${wardrobe.length})`}>
            <div className="p-6 md:p-12 min-h-[50vh]">
                {wardrobe.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full py-20 text-center">
                        <span className="text-6xl mb-6 text-[#E4E1DE]">♡</span>
                        <p className="font-serif text-2xl italic text-[#212121] mb-2">Garderoba este goală</p>
                        <p className="text-sm text-[#959595]">Adaugă rochiile preferate pentru a le personaliza.</p>
                    </div>
                ) : (
                    <div className="space-y-12">
                        <div className="flex justify-end">
                            <button
                                onClick={onClearAll}
                                className="text-[10px] uppercase tracking-widest text-red-800 border-b border-red-200 pb-1 hover:border-red-800 transition-all"
                            >
                                Șterge Tot
                            </button>
                        </div>

                        <div className="grid grid-cols-1 gap-12">
                            {wardrobe.map((item) => {
                                const dress = DRESSES.find(d => d.id === item.dressId);
                                if (!dress) return null;

                                return (
                                    <div key={item.dressId} className="flex flex-col md:flex-row gap-8 pb-12 border-b border-[#F3F3F3]">
                                        <div className="w-full md:w-48 aspect-[3/4] bg-white">
                                            <img src={dress.imageUrl} alt={dress.name} className="w-full h-full object-contain object-top vintage-pastel" />
                                        </div>

                                        <div className="flex-1 space-y-6">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <span className="text-[10px] uppercase tracking-widest text-[#959595]">{dress.collection}</span>
                                                    <h4 className="font-serif text-2xl italic text-[#212121]">{dress.name}</h4>
                                                </div>
                                                <button onClick={() => onRemoveItem(item.dressId)} className="text-[#959595] hover:text-[#212121]">✕</button>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#212121]">Notițe Personale</label>
                                                    <textarea
                                                        value={item.notes}
                                                        onChange={(e) => onUpdateItem(item.dressId, 'notes', e.target.value)}
                                                        placeholder="Adaugă detalii despre ce ți-a plăcut..."
                                                        className="w-full p-3 bg-[#FAFAFA] border border-[#E4E1DE] focus:border-[#212121] outline-none text-sm font-light min-h-[80px] resize-none transition-colors"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#212121]">Stil Preferat</label>
                                                    <div className="flex flex-wrap gap-2">
                                                        {styles.map(style => (
                                                            <button
                                                                key={style}
                                                                onClick={() => onUpdateItem(item.dressId, 'preferredStyle', style)}
                                                                className={`px-3 py-1 text-[10px] uppercase tracking-widest border transition-all ${item.preferredStyle === style
                                                                    ? 'bg-[#212121] text-white border-[#212121]'
                                                                    : 'bg-transparent text-[#959595] border-[#E4E1DE] hover:border-[#212121]'
                                                                    }`}
                                                            >
                                                                {style}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default WardrobeModal;
