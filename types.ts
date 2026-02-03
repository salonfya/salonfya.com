
export enum DressType {
  BUY = 'BUY',
  RENT = 'RENT'
}

export interface Dress {
  id: string;
  name: string;
  description: string;
  price?: number; // Purchase price
  rentPrice?: number; // Rental price
  type: DressType;
  imageUrl: string;
  sizes: string[];
  colors: string[];
  collection?: Collection;
  details?: {
    fabric: string;
    silhouette: string;
    neckline: string;
  };
}

export interface Appointment {
  date: Date;
  timeSlot: string;
  dressId: string;
  customerName: string;
  customerPhone: string;
}

export interface WardrobeItem {
  dressId: string;
  notes: string;
  preferredStyle: string; // e.g., 'Boho', 'Glam', 'Classic'
  addedAt: Date;
}

export enum Collection {
  JARDIN_DE_LUMIERE = 'Jardin de Lumière',
  ATELIER_OF_DREAMS = 'The Atelier of Dreams',
  THE_NYMPH = 'The Nymph',
  THE_NEW_LOOK = 'The New Look',
  FEMINITY = 'Feminity',
  CARMEN = 'Carmen'
}
