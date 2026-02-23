import React from 'react';
import Hero from '../components/sections/Hero';
import CollectionShowcase from '../components/sections/CollectionShowcase';
import CinematicSection from '../components/sections/CinematicSection';
import AtelierSection from '../components/sections/AtelierSection';
import InnovationSection from '../components/sections/InnovationSection';
import HistorySection from '../components/sections/HistorySection';
import WhereToBuySection from '../components/sections/WhereToBuySection';
import PartnerSection from '../components/sections/PartnerSection';

export default function Homepage() {
    return (
        <>
            <Hero />
            <CollectionShowcase />
            <CinematicSection />
            <AtelierSection />
            <InnovationSection />
            <HistorySection />
            <WhereToBuySection />
            <PartnerSection />
        </>
    );
}
