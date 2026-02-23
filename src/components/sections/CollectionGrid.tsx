import React from 'react';
import SectionTitle from '../ui/SectionTitle';
import FadeInSection from '../ui/FadeInSection';
import ProductCard from './ProductCard';
import { Dress } from '../../types';

interface CollectionGridProps {
    dresses: Dress[];
    onOpenDetails: (dress: Dress) => void;
    title?: string;
    subtitle?: string;
    bgColor?: string;
}

const CollectionGrid = ({ dresses, onOpenDetails, title, subtitle, bgColor = '#FAFAFA' }: CollectionGridProps) => {
    return (
        <div id="colectii" className={`py-[120px] px-6 md:px-12 max-w-[1800px] mx-auto`} style={{ backgroundColor: bgColor }}>
            {title && subtitle && <SectionTitle title={title} subtitle={subtitle} centered />}

            <FadeInSection>
                <div className={`grid gap-x-8 gap-y-24 ${dresses.length <= 2
                        ? 'grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto'
                        : dresses.length <= 3
                            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto'
                            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                    }`}>
                    {dresses.map((dress: Dress, idx: number) => (
                        <ProductCard key={dress.id} dress={dress} onClick={() => onOpenDetails(dress)} index={idx} />
                    ))}
                </div>
            </FadeInSection>
        </div>
    );
};

export default CollectionGrid;
