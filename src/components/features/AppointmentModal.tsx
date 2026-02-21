import React, { useState } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { Dress } from '../../types';

const AppointmentModal = ({ dress, isOpen, onClose, location }: { dress: Dress, isOpen: boolean, onClose: () => void, location: string }) => {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    const handleBooking = () => {
        if (!date || !time) return;
        const message = `Bună ziua. Doresc o programare la showroom-ul din ${location} pentru rochia *${dress.name}* pe data de ${date}, ora ${time}.`;
        const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`Rezervare Privată`}>
            <div className="p-8 md:p-16 grid md:grid-cols-12 gap-12 items-start">
                <div className="md:col-span-5 space-y-12">
                    <div>
                        <h4 className="font-serif text-3xl italic text-[#212121] mb-4">Experiența Showroom</h4>
                        <p className="font-light text-[#959595] leading-relaxed text-sm">
                            Vă invităm în sanctuarul nostru din {location}. O sesiune privată unde veți descoperi texturile fine și croielile impecabile ale colecției {dress.collection}.
                        </p>
                    </div>

                    <div className="space-y-8">
                        <div className="space-y-3">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-[#212121]">Data Preferată</label>
                            <input
                                type="date"
                                className="w-full pb-3 border-b border-[#E4E1DE] focus:border-[#212121] outline-none font-serif text-2xl bg-transparent text-[#212121] transition-colors"
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-[#212121]">Interval Orar</label>
                            <select
                                className="w-full pb-3 border-b border-[#E4E1DE] focus:border-[#212121] outline-none font-serif text-2xl bg-transparent text-[#212121] transition-colors"
                                onChange={(e) => setTime(e.target.value)}
                            >
                                <option value="">Selectați ora</option>
                                <option value="10:00">10:00 - 11:30</option>
                                <option value="12:00">12:00 - 13:30</option>
                                <option value="14:00">14:00 - 15:30</option>
                                <option value="16:00">16:00 - 17:30</option>
                                <option value="18:00">18:00 - 19:30</option>
                            </select>
                        </div>
                    </div>

                    <div className="pt-4">
                        <Button onClick={handleBooking} disabled={!date || !time} className="w-full">Confirmă Programarea</Button>
                        <p className="text-center text-[10px] text-[#959595] mt-4 uppercase tracking-widest">Nu percepem taxe de probă</p>
                    </div>
                </div>

                <div className="hidden md:block md:col-span-7 h-full min-h-[500px] bg-[#F3F3F3] relative overflow-hidden">
                    <img src={dress.imageUrl} className="absolute inset-0 w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-[2s] vintage-pastel" alt="Preview" />
                </div>
            </div>
        </Modal>
    );
};

export default AppointmentModal;
