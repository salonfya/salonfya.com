import React from 'react';
import SectionTitle from '../ui/SectionTitle';
import FadeInSection from '../ui/FadeInSection';
import ProductCard from './ProductCard';
import { Dress } from '../../types';

const CollectionGrid = ({ dresses, onOpenDetails }: { dresses: Dress[], onOpenDetails: (dress: Dress) => void }) => {
    return (
        <div id="colectii" className="py-[120px] px-6 md:px-12 max-w-[1800px] mx-auto bg-[#FAFAFA]">
            <SectionTitle title="Colecția Imperial" subtitle="Eleganță Regală" centered />

            <FadeInSection>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-24">
                    {dresses.map((dress: Dress, idx: number) => (
                        <ProductCard key={dress.id} dress={dress} onClick={() => onOpenDetails(dress)} index={idx} />
                    ))}
                </div>
            </FadeInSection>
        </div>
    );
};

export default CollectionGrid;
