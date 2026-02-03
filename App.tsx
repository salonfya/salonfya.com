import React, { useState, useRef, useEffect } from 'react';
import { DRESSES } from './constants';
import { Dress, Collection, DressType, WardrobeItem } from './types';
import { generateTryOn, generate360Video } from './services/ai';

// --- Utils ---
// Component to trigger animations when elements enter viewport
const FadeInSection: React.FC<{ children?: React.ReactNode, delay?: number }> = ({ children, delay = 0 }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      });
    }, { threshold: 0.1 });

    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- Design System Components ---

// Button component reflecting the minimalist, high-end style
const Button = ({ children, onClick, variant = 'primary', className = '', disabled = false, icon = null }: any) => {
  const baseStyle = "group relative px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 rounded-none overflow-hidden";

  const variants: any = {
    primary: "bg-[#212121] text-white hover:bg-[#605F5F] border border-[#212121] hover:border-[#605F5F]",
    secondary: "bg-white text-[#212121] hover:bg-[#212121] hover:text-white border border-[#212121]",
    outline: "bg-transparent border-b border-[#212121] text-[#212121] hover:text-[#959595] hover:border-[#959595] px-0 py-2 gap-2",
    ghost: "bg-transparent text-[#212121] hover:text-[#605F5F]",
    danger: "bg-white text-red-800 hover:bg-red-50 border border-red-200"
  };

  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`} disabled={disabled}>
      <span className="relative z-10 flex items-center gap-2">
        {icon}
        {children}
      </span>
    </button>
  );
};

// Tag component for categories
const Tag = ({ children }: { children?: React.ReactNode }) => (
  <span className="inline-block px-4 py-1 bg-[#F3F3F3] text-[10px] uppercase tracking-[0.15em] text-[#959595] font-bold mb-2">
    {children}
  </span>
);

// Section Title Component adhering to the responsive font sizes from the dataset
const SectionTitle = ({ title, subtitle, centered = false }: { title: string, subtitle?: string, centered?: boolean }) => (
  <div className={`mb-16 ${centered ? 'text-center' : ''}`}>
    <FadeInSection>
      {subtitle && (
        <span className="block text-[11px] uppercase tracking-[0.3em] text-[#959595] mb-6 font-bold">
          {subtitle}
        </span>
      )}
      <h2 className="hero-title text-[#212121]">
        {title}
      </h2>
    </FadeInSection>
  </div>
);

// --- Modals ---

const Modal = ({ isOpen, onClose, children, title, fullScreen = false }: any) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#FAFAFA]/95 backdrop-blur-sm transition-all duration-700">
      <div className={`bg-white w-full ${fullScreen ? 'h-full' : 'max-h-[90vh] max-w-6xl h-auto border border-[#E4E1DE] shadow-[0_0_40px_rgba(0,0,0,0.05)]'} relative flex flex-col animate-fadeInUp overflow-hidden`}>
        {/* Header */}
        <div className="px-8 md:px-12 py-8 flex justify-between items-center bg-white z-20 border-b border-[#F3F3F3]">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#959595]">Fya Atelier</span>
            <h3 className="font-serif text-3xl md:text-4xl text-[#212121] italic">{title}</h3>
          </div>
          <button onClick={onClose} className="group relative w-12 h-12 flex items-center justify-center border border-transparent hover:border-[#E4E1DE] transition-all rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#212121" strokeWidth="1" className="group-hover:rotate-90 transition-transform duration-500"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto scrollbar-hide bg-white">
          {children}
        </div>
      </div>
    </div>
  );
};

// --- Functional Feature Components ---

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
                    <div className="w-full md:w-48 aspect-[3/4] bg-[#F3F3F3]">
                      <img src={dress.imageUrl} alt={dress.name} className="w-full h-full object-cover vintage-pastel" />
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

const ImageZoomModal = ({ isOpen, onClose, imageUrl }: { isOpen: boolean, onClose: () => void, imageUrl: string | null }) => {
  if (!isOpen || !imageUrl) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-[#FAFAFA] transition-all duration-500 p-4 md:p-12 cursor-zoom-out"
      onClick={onClose}
    >
      <img
        src={imageUrl}
        alt="Zoom"
        className="h-full w-auto object-contain shadow-xl animate-fadeInUp vintage-pastel"
        onClick={(e) => e.stopPropagation()}
      />
      <button
        onClick={onClose}
        className="absolute top-8 right-8 text-[#212121] hover:opacity-50 transition-opacity"
      >
        <span className="text-[11px] uppercase tracking-widest font-bold">Închide</span>
      </button>
    </div>
  );
};

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

const TryOnModal = ({ dress, isOpen, onClose }: { dress: Dress, isOpen: boolean, onClose: () => void }) => {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setUserImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!userImage) return;
    setLoading(true);
    try {
      const result = await generateTryOn(userImage, dress.imageUrl, dress.description);
      setResultImage(result);
    } catch (error) {
      console.error(error);
      alert('A apărut o eroare. Vă rugăm să încercați o altă fotografie.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Probă Virtuală AI" fullScreen>
      <div className="grid grid-cols-1 md:grid-cols-2 h-full min-h-[85vh]">
        {/* Left Side: Interaction */}
        <div className="p-8 md:p-20 flex flex-col justify-center bg-[#FAFAFA] border-r border-[#E4E1DE]">
          <div className="max-w-lg mx-auto w-full space-y-12">
            <div className="space-y-6">
              <h2 className="font-serif text-5xl italic text-[#212121]">Reflexia Ta</h2>
              <p className="font-light text-[#959595] leading-relaxed">
                Tehnologia noastră AI personalizează rochia {dress.name} pe silueta ta.
                Pentru rezultate optime, folosește o fotografie clară, cu lumină naturală, în care corpul este vizibil în întregime.
              </p>
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
                  <Button onClick={handleGenerate} disabled={loading} className="w-full" variant="primary">
                    {loading ? "Procesare AI..." : "Generează Proba"}
                  </Button>
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

const VideoModal = ({ dress, isOpen, onClose }: { dress: Dress, isOpen: boolean, onClose: () => void }) => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && !videoUrl) {
      generateVideo();
    }
  }, [isOpen]);

  const generateVideo = async () => {
    setLoading(true);
    try {
      const url = await generate360Video(dress.imageUrl, dress.name);
      setVideoUrl(url);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Cinematics: ${dress.name}`}>
      <div className="flex flex-col items-center justify-center p-8 min-h-[70vh] bg-[#1a1a1a]">
        {loading ? (
          <div className="text-center space-y-8 max-w-md">
            <div className="w-12 h-12 border border-[#959595] border-t-white rounded-full animate-spin mx-auto"></div>
            <p className="font-serif text-xl italic text-white">
              Generăm prezentarea 360°...
            </p>
          </div>
        ) : videoUrl ? (
          <div className="w-full max-w-md aspect-[9/16] shadow-2xl relative">
            <video src={videoUrl} autoPlay loop controls className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="text-center text-white">
            <p className="mb-4">Nu s-a putut genera videoclipul.</p>
            <Button onClick={generateVideo} variant="secondary">Încearcă din nou</Button>
          </div>
        )}
      </div>
    </Modal>
  );
};



const ImageGallery = ({ images }: { images: string[] }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {images.map((img, idx) => (
          <div
            key={idx}
            className="group relative aspect-[3/4] overflow-hidden cursor-zoom-in border border-[#E4E1DE]"
            onClick={() => setSelectedImage(img)}
          >
            <img src={img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 vintage-pastel" alt={`Gallery ${idx}`} />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="bg-white/80 p-2 rounded-full text-[10px] uppercase tracking-widest block">Zoom</span>
            </div>
          </div>
        ))}
      </div>

      {/* Full Screen Zoom Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[110] bg-white/95 backdrop-blur-xl flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            className="max-w-full max-h-full object-contain shadow-2xl animate-[scaleIn_0.3s_ease-out]"
            alt="Zoom Detail"
          />
        </div>
      )}
    </>
  );
};

const CarmenFullPage = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-[#FAFAFA] animate-fadeInUp overflow-y-auto scrollbar-hide">
      {/* Navigation / Close - Floating */}
      <div className="fixed top-0 w-full z-50 px-6 md:px-12 py-6 flex justify-between items-center mix-blend-difference text-white">
        <span className="font-serif text-2xl italic tracking-widest uppercase">Fya Atelier</span>
        <button onClick={onClose} className="group flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] hover:text-gray-300 transition-colors">
          <span>Închide</span>
          <div className="w-8 h-8 rounded-full border border-white flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
            ✕
          </div>
        </button>
      </div>

      {/* 1. Cinematic Hero Section */}
      <div className="relative w-full h-screen bg-black">
        <video
          ref={(el) => {
            if (el) {
              el.playbackRate = 0.5; // Slow motion
            }
          }}
          className="w-full h-full object-cover grayscale"
          autoPlay
          loop
          muted
          playsInline
          onLoadedMetadata={(e) => {
            e.currentTarget.currentTime = 7; // Start from 7s
          }}
        >
          <source src="/images/CINEMATIC.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Centered Overlay Title */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="font-serif text-[15vw] leading-none italic opacity-90 mix-blend-overlay">Carmen</h1>
          <p className="text-[12px] uppercase tracking-[0.5em] mt-4 font-light mix-blend-overlay">Noua Colecție 2025</p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/80 animate-bounce">
          <span className="text-[10px] uppercase tracking-widest">Descoperă</span>
        </div>
      </div>

      {/* 2. Editorial Content Section - Ninfa Style */}
      <div className="bg-white text-[#212121] relative">

        {/* Section 1: Sketch & Intro */}
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 items-center">
          {/* Left: Graphic/Sketch - Centered with plenty of white space */}
          <div className="h-full bg-[#FAFAFA] flex items-center justify-center p-12 lg:p-24 order-2 lg:order-1">
            <div className="relative w-full max-w-lg">
              <span className="absolute -top-12 left-0 text-4xl text-[#212121]">✦</span>
              <img
                src="/images/carmen_sketch_triptych.png"
                className="w-full h-auto mix-blend-multiply opacity-90"
                alt="Carmen Sketch"
              />
              <div className="mt-8 flex justify-between items-end border-t border-[#212121]/20 pt-4">
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#959595]">Fig 1.</span>
                <span className="font-serif italic text-sm text-[#959595]">Technical View</span>
              </div>
            </div>
          </div>

          {/* Right: Typography */}
          <div className="h-full flex flex-col justify-center p-12 lg:p-32 order-1 lg:order-2">
            <h2 className="font-serif text-4xl lg:text-5xl leading-[1.2] text-[#212121] uppercase tracking-wider font-light mb-12">
              Colecția Carmen <br />
              <span className="text-[#959595]">Întruchipează frumusețea</span> <br />
              fiecărei femei.
            </h2>

            <div className="space-y-8 text-[#605F5F] font-light leading-relaxed text-sm md:text-base text-justify">
              <p>
                Prezența ei se simte ca o adiere caldă, o siluetă ce captează privirile prin simplitate și rafinament.
                Corsetul cu decolteu în V îmbrățișează formele, decorat cu o broderie florală prețioasă ce pare să crească organic pe piele.
              </p>
              <p>
                În această colecție, o atenție deosebită este acordată detaliilor care transformă o rochie într-o poveste.
                Fusta fluidă din tulle și trenă diafană oferă o notă de mister și tandrețe, un echilibru perfect între clasic și modern.
              </p>


              {/* Distinctive Elements - Visual Grid (Refactored) */}
              <div className="pt-12 mt-12 border-t border-[#E4E1DE]">
                <span className="block text-[10px] uppercase tracking-widest font-bold text-[#212121] mb-8">Elemente Distinctive</span>
                <div className="grid grid-cols-2 gap-4">
                  {/* Visual Item 1: Corset */}
                  <div className="space-y-3">
                    <div className="aspect-[3/4] overflow-hidden bg-[#FAFAFA]">
                      <img src="/images/carmen_model_detail_v2.png" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="Corset Detail" />
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase tracking-widest text-[#959595]">Corset</span>
                      <span className="font-serif italic text-sm text-[#212121]">Broderie 3D</span>
                    </div>
                  </div>
                  {/* Visual Item 2: Back */}
                  <div className="space-y-3">
                    <div className="aspect-[3/4] overflow-hidden bg-[#FAFAFA]">
                      <img src="/images/carmen_model_back_v2.png" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="Back Detail" />
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase tracking-widest text-[#959595]">Spate</span>
                      <span className="font-serif italic text-sm text-[#212121]">Nasturi & Trenă</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Reality/Model - Mirrored */}
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 items-center border-t border-[#FAFAFA]">
          {/* Left: Typography & Story */}
          <div className="h-full flex flex-col justify-center p-12 lg:p-32 order-1 lg:order-1">
            <h2 className="font-serif text-4xl lg:text-5xl leading-[1.2] text-[#212121] uppercase tracking-wider font-light mb-12">
              Carmen — Este <br />
              <span className="text-[#959595]">Poezie în Mișcare.</span>
            </h2>
            <div className="space-y-8 text-[#605F5F] font-light leading-relaxed text-sm md:text-base text-justify">
              <p>
                Pe lângă detaliile sculpturale, Carmen oferă o experiență tactilă inedită. Materialele alese cu grijă – tulle fin, dantelă franțuzească și aplicații 3D – creează un joc de texturi care fascinează.
              </p>
              <p>
                Este o rochie pentru femeia care își dorește să strălucească natural, fără efort. Un tribut adus feminității atemporale.
              </p>

              <div className="pt-12">
                <Button variant="outline" className="w-full md:w-auto" onClick={() => window.location.href = "https://wa.me/?text=Buna%20ziua%2C%20sunt%20interesata%20de%20rochia%20Carmen"}>
                  Programează o Probă
                </Button>
              </div>
            </div>
          </div>

          {/* Right: Model Image */}
          <div className="h-full bg-[#FAFAFA] flex items-center justify-center p-0 lg:p-0 overflow-hidden order-2 lg:order-2 relative group">
            <img
              src="/images/carmen_model_front_v2.png"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[1.5s] ease-in-out"
              alt="Carmen Model"
            />
            <div className="absolute bottom-12 right-12 bg-white/90 backdrop-blur p-4 max-w-xs text-right opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-300">
              {/* Left: Typography & Story */}
              <div className="h-full flex flex-col justify-center p-12 lg:p-32 order-1 lg:order-1">
                <h2 className="font-serif text-4xl lg:text-5xl leading-[1.2] text-[#212121] uppercase tracking-wider font-light mb-12">
                  Carmen — Este <br />
                  <span className="text-[#959595]">Poezie în Mișcare.</span>
                </h2>
                <div className="space-y-8 text-[#605F5F] font-light leading-relaxed text-sm md:text-base text-justify">
                  <p>
                    Pe lângă detaliile sculpturale, Carmen oferă o experiență tactilă inedită. Materialele alese cu grijă – tulle fin, dantelă franțuzească și aplicații 3D – creează un joc de texturi care fascinează.
                  </p>
                  <p>
                    Este o rochie pentru femeia care își dorește să strălucească natural, fără efort. Un tribut adus feminității atemporale.
                  </p>

                  <div className="pt-12">
                    <Button variant="outline" className="w-full md:w-auto" onClick={() => window.location.href = "https://wa.me/?text=Buna%20ziua%2C%20sunt%20interesata%20de%20rochia%20Carmen"}>
                      Programează o Probă
                    </Button>
                  </div>
                </div>
              </div>

              {/* Right: Model Image */}
              <div className="h-full bg-[#FAFAFA] flex items-center justify-center p-0 lg:p-0 overflow-hidden order-2 lg:order-2 relative group">
                <img
                  src="/images/carmen_model_front_v2.png"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[1.5s] ease-in-out"
                  alt="Carmen Model"
                />
                <div className="absolute bottom-12 right-12 bg-white/90 backdrop-blur p-4 max-w-xs text-right opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-300">
                  <p className="font-serif italic text-lg">"Lumina naturală este cel mai bun accesoriu."</p>
                </div>
              </div>
            </div>

            {/* New Section: Full Gallery Restored */}
            <div className="py-24 px-6 md:px-12 bg-white border-t border-[#FAFAFA]">
              <div className="max-w-[1600px] mx-auto">
                <div className="flex justify-between items-end mb-12">
                  <h3 className="font-serif text-3xl italic text-[#212121]">Galerie Completă</h3>
                  <span className="text-[10px] uppercase tracking-widest text-[#959595]">4 Imagini</span>
                </div>

                <ImageGallery images={[
                  '/images/carmen_model_front_v2.png',
                  '/images/carmen_model_side_v2.png',
                  '/images/carmen_model_back_v2.png',
                  '/images/carmen_model_detail_v2.png'
                ]} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CarmenTeaser = ({ onOpen }: { onOpen: () => void }) => {
  return (
    <div className="relative w-full h-[80vh] overflow-hidden group cursor-pointer" onClick={onOpen}>
      <img
        src="/images/carmen_model_front_v2.png" // Updated to use the new high quality image
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105 vintage-pastel"
        alt="Carmen Collection"
      />
      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-700"></div>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-6">
        <div className="bg-white/10 backdrop-blur-md p-10 md:p-16 border border-white/30 transform transition-transform duration-700 group-hover:-translate-y-4">
          <span className="text-[10px] uppercase tracking-[0.4em] mb-4 block animate-fadeInUp">Colecție Nouă</span>
          <h2 className="font-serif text-6xl md:text-7xl italic mb-6 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>Carmen</h2>
          <span className="text-[10px] uppercase tracking-[0.2em] border-b border-white/50 pb-2 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>Fit-and-Free</span>
          <div className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
            <span className="text-[10px] bg-white text-[#212121] px-6 py-3 uppercase tracking-widest font-bold">Descoperă Povestea</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const IntroAnimation = ({ onComplete }: { onComplete: () => void }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500); // Wait for fade out
    }, 2500); // Duration of text animation
    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return <div className="fixed inset-0 z-[200] bg-[#FAFAFA] pointer-events-none opacity-0 transition-opacity duration-700" />;

  return (
    <div className="fixed inset-0 z-[200] bg-[#FAFAFA] flex items-center justify-center">
      <div className="overflow-hidden">
        <h1 className="font-serif text-4xl md:text-6xl text-[#212121] uppercase tracking-[0.2em] animate-[trackingExpand_2s_ease-out_forwards] opacity-0 animate-[fadeIn_1s_ease-out_forwards]">
          Fya Atelier
        </h1>
      </div>
    </div>
  );
};

const Navbar = ({ onOpenWardrobe, wardrobeCount }: any) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-40 px-6 md:px-12 py-6 flex justify-between items-center transition-all duration-700 ${scrolled ? 'bg-[#FAFAFA]/90 backdrop-blur-md border-b border-[#E4E1DE] py-4' : 'bg-transparent text-[#212121] py-6'}`}>
      <div className="w-1/3 hidden md:flex gap-8 text-[11px] font-bold uppercase tracking-[0.2em]">
        <a href="#colectii" className="hover:text-[#605F5F] transition-colors">Colecții</a>
        <a href="#atelier" className="hover:text-[#605F5F] transition-colors">Atelier</a>
        <a href="#parteneri" className="hover:text-[#605F5F] transition-colors">Parteneri</a>
      </div>

      <div className="w-1/3 text-center">
        <a href="#" onClick={() => window.scrollTo(0, 0)} className="font-serif text-3xl italic tracking-wide cursor-pointer">Fya</a>
      </div>

      <div className="w-1/3 flex justify-end gap-8 text-[11px] font-bold uppercase tracking-[0.2em]">
        <button className="hidden md:block hover:text-[#605F5F] transition-colors">Ro</button>
        <button className="flex items-center gap-2 hover:text-[#605F5F] transition-colors" onClick={onOpenWardrobe}>
          Garderobă ({wardrobeCount})
        </button>
      </div>
    </nav>
  );
};

const Hero = () => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffset(window.scrollY * 0.4); // Parallax factor
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative h-[100vh] w-full overflow-hidden flex items-center justify-center bg-[#FAFAFA]">
      {/* YouTube Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <iframe
          className="absolute top-1/2 left-1/2 w-[177.78vh] h-[56.25vw] min-h-screen min-w-full -translate-x-1/2 -translate-y-1/2 object-cover"
          src="https://www.youtube.com/embed/dtbuUKJXAYc?autoplay=1&mute=1&controls=0&loop=1&playlist=dtbuUKJXAYc&start=5"
          title="Hero Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ pointerEvents: 'none' }}
        ></iframe>
        {/* Dark Overlay for text readability */}
        <div className="absolute inset-0 bg-black/20 z-10"></div>
      </div>

      {/* Centered Overlay Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 p-6">
        <div className="bg-white/85 backdrop-blur-md p-12 md:p-20 text-center max-w-4xl animate-fadeInUp shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-white/50">
          <p className="text-[11px] uppercase tracking-[0.4em] font-bold text-[#959595] mb-8">Colecția 2025</p>
          <h1 className="hero-title text-[#212121] mb-10">
            Jardin de Lumière
          </h1>
          <p className="font-light text-[#212121] text-lg leading-relaxed max-w-lg mx-auto mb-12 font-serif italic text-opacity-80">
            O odă adusă luminii naturale și texturilor eteree. Rochii de mireasă create pentru a capta fiecare rază de soare.
          </p>
          <Button variant="outline" onClick={() => {
            document.getElementById('colectii')?.scrollIntoView({ behavior: 'smooth' });
          }}>
            Explorează
          </Button>
        </div>
      </div>
    </div>
  );
};

const ProductCard: React.FC<{ dress: Dress, onClick: () => void, index: number }> = ({ dress, onClick, index }) => {
  return (
    <FadeInSection delay={index * 100}>
      <div
        onClick={onClick}
        className="group cursor-pointer flex flex-col gap-6"
      >
        <div className="relative aspect-[3/4] overflow-hidden bg-[#F3F3F3]">
          <img
            src={dress.imageUrl}
            alt={dress.name}
            className="w-full h-full object-cover transition-all duration-[1s] ease-out group-hover:scale-105 group-hover:opacity-90 vintage-pastel"
          />
          {/* Minimal Overlay */}
          <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-500"></div>

          {/* Badges */}
          <div className="absolute top-4 left-4">
            {dress.type === DressType.RENT && (
              <span className="bg-white/90 backdrop-blur px-3 py-1 text-[10px] uppercase tracking-widest font-bold text-[#212121]">Rent</span>
            )}
          </div>
        </div>

        <div className="text-center space-y-3">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#959595] block">{dress.collection}</span>
          <h3 className="font-serif text-3xl text-[#212121] italic group-hover:text-[#605F5F] transition-colors">{dress.name}</h3>
          <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#212121]">
            {dress.type === DressType.RENT ? `de la ${dress.rentPrice} €` : `${dress.price} €`}
          </p>
        </div>
      </div>
    </FadeInSection>
  );
};

const CollectionGrid = ({ dresses, onOpenDetails, filter, setFilter }: any) => {
  const categories = ['TOATE', ...new Set(DRESSES.map(d => d.collection))];

  return (
    <div id="colectii" className="py-[120px] px-6 md:px-12 max-w-[1800px] mx-auto bg-[#FAFAFA]">
      <SectionTitle title="Colecțiile Noastre" subtitle="Alege Stilul Tău" centered />

      {/* Minimal Filter */}
      <FadeInSection>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-24">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`text-[11px] uppercase tracking-[0.2em] font-bold pb-2 transition-all duration-500 ${filter === cat ? 'text-[#212121] border-b border-[#212121]' : 'text-[#959595] border-transparent hover:text-[#212121]'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </FadeInSection>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-24">
        {dresses.map((dress: Dress, idx: number) => (
          <ProductCard key={dress.id} dress={dress} onClick={() => onOpenDetails(dress)} index={idx} />
        ))}
      </div>
    </div>
  );
};

const AtelierSection = () => (
  <div id="atelier" className="py-[120px] bg-[#212121] text-white overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
      <div className="order-2 lg:order-1 space-y-16">
        <FadeInSection>
          <SectionTitle title="Atelierul de Creație" subtitle="Meșteșug & Inovație" />
          <p className="text-[#959595] font-light leading-relaxed text-lg max-w-xl mt-8">
            Fiecare rochie Fya este rezultatul a sute de ore de muncă manuală, îmbinate cu precizia tehnologiei moderne.
            Credem în "Slow Fashion" și în piese care transcend tendințele sezoniere.
          </p>
          <div className="grid grid-cols-2 gap-12 pt-12 border-t border-[#605F5F]/30 mt-12">
            <div>
              <span className="block text-5xl font-serif italic mb-3">100%</span>
              <span className="text-[10px] uppercase tracking-widest text-[#959595]">Mătase Naturală</span>
            </div>
            <div>
              <span className="block text-5xl font-serif italic mb-3">Oradea</span>
              <span className="text-[10px] uppercase tracking-widest text-[#959595]">Fabricat în România</span>
            </div>
          </div>
        </FadeInSection>
      </div>
      <div className="order-1 lg:order-2 relative aspect-square">
        <FadeInSection delay={300}>
          <div className="w-full h-full relative overflow-hidden">
            <img
              src="/images/atelier_vintage.png"
              className="w-full h-full object-cover opacity-80 hover:scale-105 transition-transform duration-[2s] vintage-pastel"
              alt="Atelier detail"
            />
            <div className="absolute bottom-12 right-12 text-right">
              <p className="font-serif text-3xl italic">"Detaliile fac perfecțiunea."</p>
              <p className="text-[10px] uppercase tracking-widest mt-4 opacity-50">Leonardo da Vinci</p>
            </div>
          </div>
        </FadeInSection>
      </div>
    </div>
  </div>
);

const InnovationSection = () => (
  <div className="py-[120px] px-6 md:px-12 bg-[#F3F3F3]">
    <div className="max-w-7xl mx-auto">
      <SectionTitle title="Inovație Digitală" subtitle="Fya Tech" centered />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
        <FadeInSection delay={100}>
          <div className="bg-white p-12 border border-[#E4E1DE] h-full hover:border-[#212121] transition-colors duration-500 group">
            <span className="text-4xl mb-6 block group-hover:scale-110 transition-transform duration-500 origin-left">✧</span>
            <h3 className="font-serif text-3xl text-[#212121] italic mb-4">Probă Virtuală AI</h3>
            <p className="text-[#959595] font-light leading-relaxed">
              Nu ești sigură de mărime sau stil? Tehnologia noastră de ultimă generație îți permite să "probezi" rochiile digital.
              Încarcă o fotografie, iar algoritmul nostru va adapta perfect rochia pe silueta ta, respectând lumina și postura.
            </p>
          </div>
        </FadeInSection>

        <FadeInSection delay={200}>
          <div className="bg-white p-12 border border-[#E4E1DE] h-full hover:border-[#212121] transition-colors duration-500 group">
            <span className="text-4xl mb-6 block group-hover:scale-110 transition-transform duration-500 origin-left">◉</span>
            <h3 className="font-serif text-3xl text-[#212121] italic mb-4">Cinematografie 360°</h3>
            <p className="text-[#959595] font-light leading-relaxed">
              Experimentează fiecare detaliu în mișcare. Generăm video-uri 360° de înaltă definiție pentru a surprinde fluiditatea materialelor
              și strălucirea aplicațiilor din orice unghi, oferindu-ți o perspectivă completă înainte de a rezerva.
            </p>
          </div>
        </FadeInSection>
      </div>
    </div>
  </div>
);

const WhereToBuySection = () => {
  const locations = [
    { city: "București", address: "Calea Victoriei 128", phone: "+40 722 000 001" },
    { city: "Oradea", address: "Str. Republicii 12", phone: "+40 722 000 002" },
    { city: "Cluj-Napoca", address: "Str. Eroilor 5", phone: "+40 722 000 003" }
  ];

  return (
    <div className="py-[120px] px-6 md:px-12 max-w-[1800px] mx-auto where-to-buy">
      <SectionTitle title="Locații" subtitle="Where to Buy" centered />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        {locations.map((loc, idx) => (
          <FadeInSection key={idx} delay={idx * 100}>
            <div className="text-center p-8 border border-[#F3F3F3] hover:border-[#212121] transition-colors duration-500">
              <h3 className="font-serif text-2xl italic text-[#212121] mb-4">{loc.city}</h3>
              <p className="text-sm font-light text-[#959595] mb-2">{loc.address}</p>
              <p className="text-sm font-light text-[#959595]">{loc.phone}</p>
              <button className="mt-6 text-[10px] uppercase tracking-[0.2em] font-bold border-b border-[#212121] pb-1 hover:text-[#959595] hover:border-[#959595] transition-all">
                Vezi pe Hartă
              </button>
            </div>
          </FadeInSection>
        ))}
      </div>
    </div>
  );
};

const PartnerSection = () => (
  <div id="parteneri" className="py-[120px] bg-[#FAFAFA] border-t border-[#E4E1DE]">
    <div className="max-w-4xl mx-auto px-6">
      <SectionTitle title="Devino Partener" subtitle="B2B Collaboration" centered />
      <FadeInSection>
        <form className="partner-form mt-12 space-y-8 bg-white p-8 md:p-16 shadow-[0_0_50px_rgba(0,0,0,0.03)] border border-[#E4E1DE]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#959595]">Nume Companie</label>
              <input type="text" className="w-full pb-2 border-b border-[#E4E1DE] outline-none focus:border-[#212121] bg-transparent transition-colors font-serif text-xl" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#959595]">Persoană de Contact</label>
              <input type="text" className="w-full pb-2 border-b border-[#E4E1DE] outline-none focus:border-[#212121] bg-transparent transition-colors font-serif text-xl" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-[#959595]">Email Official</label>
            <input type="email" className="w-full pb-2 border-b border-[#E4E1DE] outline-none focus:border-[#212121] bg-transparent transition-colors font-serif text-xl" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-[#959595]">Mesaj</label>
            <textarea className="w-full pb-2 border-b border-[#E4E1DE] outline-none focus:border-[#212121] bg-transparent transition-colors font-serif text-xl min-h-[100px] resize-none"></textarea>
          </div>
          <div className="text-center pt-8">
            <Button variant="primary" className="w-full md:w-auto">Trimite Solicitarea</Button>
          </div>
        </form>
      </FadeInSection>
    </div>
  </div>
);

const Footer = () => (
  <footer className="bg-[#212121] text-white py-[100px] px-6">
    <FadeInSection>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
        <div className="md:col-span-1">
          <span className="font-serif text-4xl italic">Fya</span>
          <p className="mt-6 text-sm font-light text-[#959595]">Excellence in every stitch.</p>
        </div>

        <div className="space-y-8">
          <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#959595]">Client Service</h4>
          <ul className="space-y-4 text-sm font-light text-[#E4E1DE]">
            <li><a href="#" className="hover:text-white transition-colors">Programări</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Livrare & Retur</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Întrebări Frecvente</a></li>
          </ul>
        </div>

        <div className="space-y-8">
          <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#959595]">Legal</h4>
          <ul className="space-y-4 text-sm font-light text-[#E4E1DE]">
            <li><a href="#" className="hover:text-white transition-colors">Termeni și Condiții</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Politica de Confidențialitate</a></li>
            <li><a href="#" className="hover:text-white transition-colors">ANPC</a></li>
          </ul>
        </div>

        <div className="space-y-8">
          <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#959595]">Newsletter</h4>
          <div className="text-sm font-light space-y-4">
            <p className="text-[#E4E1DE]">Abonează-te pentru a primi ultimele noutăți din atelier.</p>
            <div className="flex border-b border-[#605F5F]">
              <input type="email" placeholder="Email-ul tău" className="bg-transparent w-full py-2 outline-none text-white placeholder-[#605F5F]" />
              <button className="uppercase text-[10px] font-bold tracking-widest hover:text-[#959595]">OK</button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-24 pt-8 border-t border-[#605F5F]/30 text-center">
        <p className="text-[10px] uppercase tracking-[0.2em] text-[#959595]">© 2025 Fya Robes. All Rights Reserved.</p>
      </div>
    </FadeInSection>
  </footer>
);

// --- History & About Section Components ---

const useScrollProgress = (ref: React.RefObject<HTMLElement>) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate progress: 0 when element top enters viewport, 1 when element bottom leaves viewport
      // Or bespoke for text reveal: 0 when top is at bottom of viewport, 1 when top is at center?
      // "as they reach the center of the viewport"

      const start = windowHeight * 0.9;
      const end = windowHeight * 0.4;

      // Clamp between 0 and 1
      const elementTop = rect.top;
      let p = (start - elementTop) / (start - end);
      p = Math.min(Math.max(p, 0), 1);

      setProgress(p);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [ref]);

  return progress;
};

const ScrollTextReveal = ({ text, className = "" }: { text: string, className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const progress = useScrollProgress(ref);
  const words = text.split(" ");

  return (
    <p ref={ref} className={`${className} flex flex-wrap gap-[0.3em]`}>
      {words.map((word, i) => {
        const wordProgress = (progress * words.length) - i;
        const opacity = Math.min(Math.max(wordProgress + 0.2, 0.2), 1); // Start at 0.2, go to 1
        return (
          <span key={i} style={{ opacity, transition: 'opacity 0.1s' }}>
            {word}
          </span>
        );
      })}
    </p>
  );
};

const HistorySection = () => {
  return (
    <div className="bg-[#0A0A0A] text-white py-40 transition-colors duration-1000 relative z-10">
      {/* Section 1: Hero Vertical */}
      <div className="max-w-[1800px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-40">
        <div className="lg:col-span-12 relative h-[80vh] overflow-hidden">
          <div className="absolute inset-0 bg-black/20 z-10"></div>
          <img
            src="/images/history_hero_portrait.png"
            className="w-full h-full object-cover object-top parallax-y"
            alt="Fya Muse"
          />
          <div className="absolute bottom-12 left-6 md:left-12 z-20">
            <h2 className="font-serif text-6xl md:text-[8rem] leading-none text-white mix-blend-difference opacity-90">
              Origins
            </h2>
          </div>
        </div>
      </div>

      {/* Section 2: Narrative Sticky */}
      <div className="max-w-4xl mx-auto px-6 mb-40">
        <ScrollTextReveal
          text="Fya Atelier nu a început ca un brand, ci ca o stare de spirit. O rebeliune tăcută împotriva zgomotului, o întoarcere la esențial. În fiecare cusătură ascundem o poveste despre timp, răbdare și căutarea perfecțiunii în imperfecțiune."
          className="font-serif text-3xl md:text-5xl leading-tight text-center text-[#E4E1DE]"
        />
      </div>

      {/* Section 3: Alternating Gallery - Broken Grid */}
      <div className="max-w-[1600px] mx-auto px-6 space-y-32 mb-40">
        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-5 md:col-start-2">
            <div className="aspect-[4/5] overflow-hidden relative group">
              <img
                src="/images/atelier_hands_sewing.png"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                alt="Craftsmanship"
              />
            </div>
          </div>
          <div className="md:col-span-4 md:col-start-8">
            <h3 className="text-[10px] uppercase tracking-[0.3em] text-[#959595] mb-6">01. Măiestrie</h3>
            <p className="font-light text-[#959595] text-lg leading-relaxed">
              Nu credem în grabă. Fiecare rochie este sculptată manual, un proces lent și deliberat care transformă materialul brut într-o a doua piele.
            </p>
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-4 md:col-start-2 order-2 md:order-1">
            <h3 className="text-[10px] uppercase tracking-[0.3em] text-[#959595] mb-6">02. Materialitate</h3>
            <p className="font-light text-[#959595] text-lg leading-relaxed">
              Mătasea, dantela și lumina sunt singurele noastre instrumente. Restul este viziune și absența compromisului.
            </p>
          </div>
          <div className="md:col-span-5 md:col-start-7 order-1 md:order-2">
            <div className="aspect-[4/5] overflow-hidden relative group">
              <img
                src="/images/atelier_vintage.png"
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-1000"
                alt="Atelier Atmosphere"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section 4: Immersive Finale */}
      <div className="relative w-full h-screen overflow-hidden">
        <img
          src="/images/CINEMATIC.mp4" // Fallback to cinematic logic or just use a nice image? Let's use the video as bg here too or a large image.
          // Actually let's use a nice large image. We don't have immersive_atelier_wide. Let's use atelier_vintage with scale.
          className="hidden"
          alt=""
        />
        <video
          className="w-full h-full object-cover grayscale opacity-60"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/images/CINEMATIC.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="font-serif text-[10vw] italic text-white/20 mix-blend-overlay">Atelier 2026</h2>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [selectedDress, setSelectedDress] = useState<Dress | null>(null);
  const [modalType, setModalType] = useState<'details' | 'tryon' | 'video' | 'appointment' | 'wardrobe' | null>(null);
  const [filter, setFilter] = useState<string>('TOATE');
  const [wardrobe, setWardrobe] = useState<WardrobeItem[]>([]);
  const [zoomImage, setZoomImage] = useState<string | null>(null);

  const [showCarmen, setShowCarmen] = useState(false);
  const [introFinished, setIntroFinished] = useState(false);

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

  // Derived state
  const displayedDresses = filter === 'TOATE'
    ? DRESSES.filter(d => d.collection !== Collection.CARMEN) // Exclude Carmen from main grid if handled separately, or keep it. Let's keep it exclusive if we have a teaser.
    : DRESSES.filter(dress => dress.collection === filter);

  const isInWardrobe = (id: string) => wardrobe.some(item => item.dressId === id);


  const [bgColor, setBgColor] = useState('#FAFAFA'); // Default white/light

  // Chameleon Effect Logic: Change bg color based on scroll position relative to History Section
  // For simplicity without complex refs here, we can just detect if we are near bottom or specifically target the section.
  // OR simpler: The HistorySection itself is black background `bg-[#0A0A0A]`. 
  // The prompt asked for "entire body background must smoothly interpolate".
  // Let's make the main div use `bgColor` state.

  useEffect(() => {
    const handleScroll = () => {
      // Simple logic: if scrolled past a certain point, darken.
      // Better: Check if HistorySection is in view. 
      // For now, let's keep it manual or based on a specific threshold since we put HistorySection near the end.
      const scrollMax = document.body.scrollHeight - window.innerHeight;
      const scrollY = window.scrollY;

      // Assuming HistorySection is the last major section before footer.
      // Let's say if we are in the last 40% of the page? No, that's brittle.
      // Let's trigger it when passing the "Inovation" section.
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        /* Hide scrollbar */
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
              -ms-overflow-style: none;
              scrollbar-width: none;
          }
        `}</style>

        {/* Carmen Full Page Overlay */}
        <CarmenFullPage isOpen={showCarmen} onClose={() => setShowCarmen(false)} />

        {/* Navigation */}
        <Navbar onOpenWardrobe={() => setModalType('wardrobe')} wardrobeCount={wardrobe.length} />

        <main>
          <Hero />

          {/* Insert Carmen Teaser Here */}
          <CarmenTeaser onOpen={() => setShowCarmen(true)} />

          <CollectionGrid
            dresses={displayedDresses}
            onOpenDetails={openDetails}
            filter={filter}
            setFilter={setFilter}
          />
        </main>

        <AtelierSection />

        <InnovationSection />

        <HistorySection />

        <WhereToBuySection />

        <PartnerSection />

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
                  <div className="col-span-2 aspect-[3/4] cursor-zoom-in group overflow-hidden" onClick={() => setZoomImage(selectedDress.imageUrl)}>
                    <img src={selectedDress.imageUrl} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105 vintage-pastel" alt={selectedDress.name} />
                  </div>
                  {/* Mock additional images */}
                  <div className="aspect-[3/4] bg-white opacity-50"></div>
                  <div className="aspect-[3/4] bg-white opacity-50"></div>
                </div>
              </div>

              {/* Details Side */}
              <div className="lg:col-span-5 p-8 lg:p-20 bg-white flex flex-col h-full overflow-y-auto">
                <div className="mb-12">
                  <div className="flex justify-between items-start mb-6">
                    <Tag>{selectedDress.collection}</Tag>
                    <span className="text-xl font-serif italic text-[#212121]">
                      {selectedDress.type === DressType.RENT ? `${selectedDress.rentPrice} €` : `${selectedDress.price} €`}
                    </span>
                  </div>
                  <h2 className="font-serif text-5xl md:text-6xl text-[#212121] leading-[0.9] mb-8">{selectedDress.name}</h2>
                  <p className="text-[#959595] font-light leading-relaxed text-lg">
                    {selectedDress.description}
                  </p>
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
        </Modal>

        {/* Feature Modals */}
        {selectedDress && (
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
        )}
      </div>
    </>
  );
}