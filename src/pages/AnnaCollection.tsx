import React from 'react';
import { Dress } from '../types';
import CollectionGrid from '../components/sections/CollectionGrid';

interface AnnaCollectionProps {
    dresses: Dress[];
    onOpenDetails: (dress: Dress) => void;
}

export default function AnnaCollection({ dresses, onOpenDetails }: AnnaCollectionProps) {
    return (
        <div className="pt-32 pb-20 bg-white">
            <div className="text-center mb-24 max-w-3xl mx-auto animate-fadeInUp px-4 md:px-12">
                <span className="block text-[10px] uppercase tracking-[0.3em] font-bold text-[#959595] mb-6">Atingerea Naturii</span>
                <h1 className="font-serif text-5xl md:text-7xl text-[#212121] italic mb-6">Colecția Anna</h1>
                <p className="text-[#5a5a5a] font-light leading-relaxed text-lg">
                    Puritate absolută și o estetică organică. Creată pentru mireasa
                    care visează la o eleganță atemporală, romantică și care îmbrățișează
                    frumusețea naturală, nealterată.
                </p>
            </div>

            <CollectionGrid dresses={dresses} onOpenDetails={onOpenDetails} bgColor="transparent" />
        </div>
    );
}
