import React from 'react';
import { Dress } from '../types';
import Hero from '../components/sections/Hero';
import CollectionGrid from '../components/sections/CollectionGrid';
import AtelierSection from '../components/sections/AtelierSection';
import InnovationSection from '../components/sections/InnovationSection';
import HistorySection from '../components/sections/HistorySection';
import WhereToBuySection from '../components/sections/WhereToBuySection';
import PartnerSection from '../components/sections/PartnerSection';

interface ImperialCollectionProps {
    dresses: Dress[];
    onOpenDetails: (dress: Dress) => void;
}

export default function ImperialCollection({ dresses, onOpenDetails }: ImperialCollectionProps) {
    return (
        <>
            <main>
                <Hero />
                <CollectionGrid
                    dresses={dresses}
                    onOpenDetails={onOpenDetails}
                    title="Colecția Imperial"
                    subtitle="Eleganță Regală"
                />
            </main>

            <AtelierSection />
            <InnovationSection />
            <HistorySection />
            <WhereToBuySection />
            <PartnerSection />
        </>
    );
}
