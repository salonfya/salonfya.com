import React, { useState, useEffect } from 'react';
import { DRESSES } from './constants';
import { Dress, DressType, WardrobeItem, Collection } from './types';

// UI Components
import Button from './components/ui/Button';
import Tag from './components/ui/Tag';
import Modal from './components/ui/Modal';

// Feature Components
import WardrobeModal from './components/features/WardrobeModal';
import TryOnModal from './components/features/TryOnModal';
import VideoModal from './components/features/VideoModal';
import ImageZoomModal from './components/features/ImageZoomModal';
import AppointmentModal from './components/features/AppointmentModal';

import IntroAnimation from './components/features/IntroAnimation';

// Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import { Routes, Route, useLocation } from 'react-router-dom';
import ImperialCollection from './pages/ImperialCollection';
import AnnaCollection from './pages/AnnaCollection';

export default function App() {
  const [selectedDress, setSelectedDress] = useState<Dress | null>(null);
  const [modalType, setModalType] = useState<'details' | 'tryon' | 'video' | 'appointment' | 'wardrobe' | null>(null);

  const [wardrobe, setWardrobe] = useState<WardrobeItem[]>([]);
  const [zoomImage, setZoomImage] = useState<string | null>(null);

  const [introFinished, setIntroFinished] = useState(false);

  // Wardrobe Logic
  const toggleWardrobe = (dress: Dress) => {
    setWardrobe(prev => {
      const exists = prev.find(item => item.dressId === dress.id);
      if (exists) {
        return prev.filter(item => item.dressId !== dress.id);
      } else {
        return [...prev, { dressId: dress.id, notes: '', preferredStyle: '', addedAt: new Date() }];
      }
    });
  };

  const updateWardrobeItem = (id: string, field: keyof WardrobeItem, value: string) => {
    setWardrobe(prev => prev.map(item =>
      item.dressId === id ? { ...item, [field]: value } : item
    ));
  };

  const removeFromWardrobe = (id: string) => {
    setWardrobe(prev => prev.filter(item => item.dressId !== id));
  };

  const clearWardrobe = () => {
    if (confirm("Ești sigură că vrei să ștergi întreaga garderobă?")) {
      setWardrobe([]);
    }
  };

  const openDetails = (dress: Dress) => {
    setSelectedDress(dress);
    setModalType('details');
  };

  const closeModal = () => {
    setModalType(null);
    setTimeout(() => { if (!modalType) setSelectedDress(null); }, 500);
  };

  // Extract collections
  const imperialDresses = DRESSES.filter(d => d.collection === Collection.IMPERIAL);
  const annaDresses = DRESSES.filter(d => d.collection === Collection.ANNA);

  const isInWardrobe = (id: string) => wardrobe.some(item => item.dressId === id);

  const [bgColor, setBgColor] = useState('#FAFAFA');

  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      // Only apply dark background effect on Imperial Collection
      if (location.pathname !== '/' && location.pathname !== '/imperial') {
        setBgColor('#FAFAFA');
        return;
      }

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const totalHeight = document.documentElement.scrollHeight - windowHeight;
      const scrollProgress = scrollY / totalHeight;

      if (scrollProgress > 0.6) {
        const factor = Math.min((scrollProgress - 0.6) / 0.2, 1);
        const startRGB = { r: 250, g: 250, b: 250 };
        const endRGB = { r: 10, g: 10, b: 10 };

        const r = Math.round(startRGB.r + (endRGB.r - startRGB.r) * factor);
        const g = Math.round(startRGB.g + (endRGB.g - startRGB.g) * factor);
        const b = Math.round(startRGB.b + (endRGB.b - startRGB.b) * factor);

        setBgColor(`rgb(${r}, ${g}, ${b})`);
      } else {
        setBgColor('#FAFAFA');
      }
    };
    window.addEventListener('scroll', handleScroll);

    // Scroll to top on route change
    window.scrollTo(0, 0);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  return (
    <>
      {!introFinished && <IntroAnimation onComplete={() => setIntroFinished(true)} />}

      <div
        className={`min-h-screen text-[#212121] selection:bg-[#E4E1DE] font-sans transition-colors duration-[1.5s] ease-in-out ${!introFinished ? 'overflow-hidden h-screen' : ''}`}
        style={{ backgroundColor: bgColor }}
      >
        <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { transform: scale(1.1); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .vintage-pastel {
          filter: sepia(0.05) contrast(0.95) brightness(1.05);
        }
        .hero-title {
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-size: clamp(3rem, 5vw, 6rem);
          line-height: 1.1;
        }
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
              -ms-overflow-style: none;
              scrollbar-width: none;
          }
        .logo-mask {
          mask-image: radial-gradient(circle at 100% 100%, transparent 0%, transparent 8%, black 12%);
          -webkit-mask-image: radial-gradient(circle at 100% 100%, transparent 0%, transparent 8%, black 12%);
        }
        .vintage-pastel {
          filter: sepia(0.05) contrast(0.95) brightness(1.05);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          image-rendering: -webkit-optimize-contrast;
        }
        `}</style>



        {/* Navigation */}
        <Navbar onOpenWardrobe={() => setModalType('wardrobe')} wardrobeCount={wardrobe.length} />

        <Routes>
          <Route path="/" element={<ImperialCollection dresses={imperialDresses} onOpenDetails={openDetails} />} />
          <Route path="/imperial" element={<ImperialCollection dresses={imperialDresses} onOpenDetails={openDetails} />} />
          <Route path="/anna" element={<AnnaCollection dresses={annaDresses} onOpenDetails={openDetails} />} />
        </Routes>

        <Footer />

        {/* Image Zoom Modal */}
        <ImageZoomModal isOpen={!!zoomImage} onClose={() => setZoomImage(null)} imageUrl={zoomImage} />

        {/* Wardrobe Modal */}
        <WardrobeModal
          isOpen={modalType === 'wardrobe'}
          onClose={closeModal}
          wardrobe={wardrobe}
          onUpdateItem={updateWardrobeItem}
          onRemoveItem={removeFromWardrobe}
          onClearAll={clearWardrobe}
        />

        {/* Detail Modal */}
        <Modal isOpen={modalType === 'details'} onClose={closeModal} title={selectedDress?.name || ''} fullScreen={true}>
          {selectedDress && (
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-full">
              {/* Image Gallery Side */}
              <div className="lg:col-span-7 bg-[#F3F3F3] p-6 lg:p-12 overflow-y-auto">
                <div className="grid grid-cols-2 gap-4">
                  {selectedDress.images && selectedDress.images.length > 0 ? (
                    selectedDress.images.map((img, i) => (
                      <div
                        key={i}
                        className={`${i === 0 ? 'col-span-2' : 'col-span-1'} aspect-[3/4] cursor-zoom-in group overflow-hidden bg-white`}
                        onClick={() => setZoomImage(img)}
                      >
                        <img
                          src={img}
                          className={`w-full h-full object-contain object-center transition-transform duration-[2s] group-hover:scale-105 vintage-pastel ${selectedDress.id.includes('alma') ? 'logo-mask' : ''}`}
                          alt={`${selectedDress.name} view ${i + 1}`}
                          style={{
                            imageRendering: 'auto'
                          }}
                        />
                      </div>
                    ))
                  ) : (
                    <div className="col-span-2 aspect-[3/4] cursor-zoom-in group overflow-hidden" onClick={() => setZoomImage(selectedDress.imageUrl)}>
                      <img src={selectedDress.imageUrl} className="w-full h-full object-contain bg-white object-center transition-transform duration-[2s] group-hover:scale-105 vintage-pastel" alt={selectedDress.name} />
                    </div>
                  )}
                </div>
              </div>

              {/* Details Side */}
              <div className="lg:col-span-5 p-8 lg:p-20 bg-white flex flex-col h-full overflow-y-auto">
                <div className="mb-12">
                  <div className="flex justify-between items-start mb-6">
                    <Tag>{selectedDress.collection}</Tag>
                    <span className="text-xl font-serif italic text-[#212121]">
                      {selectedDress.type === DressType.RENT
                        ? `de la ${selectedDress.rentPrice} ${selectedDress.currency || '€'}`
                        : `${selectedDress.price} ${selectedDress.currency || '€'}`}
                    </span>
                  </div>
                  <h2 className="font-serif text-5xl md:text-6xl text-[#212121] leading-[0.9] mb-8">{selectedDress.name}</h2>
                  <p className="editorial-dropcap text-[#5a5a5a]">
                    {selectedDress.description}
                  </p>

                  {selectedDress.sketches && selectedDress.sketches.length > 0 && (
                    <div className="mt-12">
                      <h3 className="font-serif text-2xl text-[#212121] mb-6 border-b border-[#212121]/10 pb-2">Schițe de Design</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {selectedDress.sketches.map((img, i) => (
                          <div
                            key={i}
                            className="w-full aspect-[2/3] md:aspect-auto md:h-[60vh] cursor-zoom-in group overflow-hidden bg-white border border-[#212121]/5"
                            onClick={() => setZoomImage(img)}
                          >
                            <img
                              src={img}
                              className="w-full h-full object-contain object-center p-2 transition-transform duration-[2s] group-hover:scale-105"
                              alt={`${selectedDress.name} sketch ${i + 1}`}
                            />
                          </div>
                        ))}
                      </div>
                      <p className="mt-4 text-xs text-[#959595] italic text-center">
                        Conceptul original, ilustrat în faza de creație.
                      </p>
                    </div>
                  )}
                </div>

                {/* Technical Details Block */}
                {selectedDress.details && (
                  <div className="grid grid-cols-3 gap-4 border-y border-[#E4E1DE] py-6 mb-8">
                    <div className="space-y-1">
                      <span className="block text-[10px] uppercase tracking-widest font-bold text-[#959595]">Material</span>
                      <span className="text-sm font-light text-[#212121]">{selectedDress.details.fabric}</span>
                    </div>
                    <div className="space-y-1">
                      <span className="block text-[10px] uppercase tracking-widest font-bold text-[#959595]">Siluetă</span>
                      <span className="text-sm font-light text-[#212121]">{selectedDress.details.silhouette}</span>
                    </div>
                    <div className="space-y-1">
                      <span className="block text-[10px] uppercase tracking-widest font-bold text-[#959595]">Decolteu</span>
                      <span className="text-sm font-light text-[#212121]">{selectedDress.details.neckline}</span>
                    </div>
                  </div>
                )}

                <div className="space-y-8 pt-4 mb-12">
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <span className="block text-[10px] uppercase tracking-widest font-bold text-[#212121] mb-2">Culori</span>
                      <div className="flex gap-2 flex-wrap">
                        {selectedDress.colors.map(c => (
                          <span key={c} className="text-xs px-2 py-1 bg-[#F3F3F3] text-[#959595]">{c}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase tracking-widest font-bold text-[#212121] mb-2">Mărimi</span>
                      <div className="flex gap-2">
                        {selectedDress.sizes.map(s => (
                          <span key={s} className="w-8 h-8 flex items-center justify-center border border-[#E4E1DE] text-xs text-[#212121] hover:bg-[#212121] hover:text-white transition-colors cursor-pointer">{s}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-auto space-y-4">
                  <Button onClick={() => setModalType('appointment')} variant="primary" className="w-full">
                    Programează Vizită
                  </Button>
                  <Button
                    onClick={() => selectedDress && toggleWardrobe(selectedDress)}
                    variant="secondary"
                    className="w-full"
                    icon={isInWardrobe(selectedDress.id) ? "♥" : "♡"}
                  >
                    {isInWardrobe(selectedDress.id) ? "În Garderobă" : "Adaugă la Wishlist"}
                  </Button>

                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="p-4 border border-[#E4E1DE] text-center hover:border-[#212121] transition-colors cursor-pointer group" onClick={() => setModalType('tryon')}>
                      <span className="block text-2xl mb-2 group-hover:scale-110 transition-transform">✧</span>
                      <span className="text-[10px] uppercase tracking-widest font-bold">Probă AI</span>
                    </div>
                    <div className="p-4 border border-[#E4E1DE] text-center hover:border-[#212121] transition-colors cursor-pointer group" onClick={() => setModalType('video')}>
                      <span className="block text-2xl mb-2 group-hover:scale-110 transition-transform">◉</span>
                      <span className="text-[10px] uppercase tracking-widest font-bold">Video 360</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Modal >

        {/* Feature Modals */}
        {
          selectedDress && (
            <>
              <AppointmentModal
                dress={selectedDress}
                isOpen={modalType === 'appointment'}
                onClose={() => setModalType('details')}
                location="Oradea"
              />
              <TryOnModal
                dress={selectedDress}
                isOpen={modalType === 'tryon'}
                onClose={() => setModalType('details')}
              />
              <VideoModal
                dress={selectedDress}
                isOpen={modalType === 'video'}
                onClose={() => setModalType('details')}
              />
            </>
          )
        }
        <ImageZoomModal
          isOpen={!!zoomImage}
          onClose={() => setZoomImage(null)}
          imageUrl={zoomImage}
        />
      </div >
    </>
  );
}