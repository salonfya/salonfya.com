import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function PageTransition({ children }: { children: React.ReactNode }) {
    const location = useLocation();
    const [displayLocation, setDisplayLocation] = useState(location);
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        if (location.pathname !== displayLocation.pathname) {
            setIsTransitioning(true);
            // Begin fade out, wait for duration, then swap location and fade in
            setTimeout(() => {
                setDisplayLocation(location);
                window.scrollTo(0, 0); // Scroll to top instantly
                setIsTransitioning(false); // Begin fade in
            }, 600); // 600ms matches the duration in CSS
        }
    }, [location, displayLocation]);

    return (
        <div
            className={`transition-opacity duration-[600ms] ease-luxury w-full bg-white min-h-screen ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
        >
            {/* Render the displayLocation children so the old page stays until fully faded out */}
            <div key={displayLocation.pathname}>
                {children}
            </div>
        </div>
    );
}
