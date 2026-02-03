
import { Dress, DressType, Collection } from './types';

export const DRESSES: (Dress & { collection: Collection })[] = [
  // --- Jardin de Lumière (Outdoor, Romantic, Garden, Natural Light) ---
  {
    id: '1',
    name: 'Lumière du Matin',
    description: 'O rochie diafană ce captează lumina dimineții. Materiale fluide care dansează în briză, ideală pentru ceremonii în aer liber.',
    rentPrice: 180,
    price: 650,
    type: DressType.RENT,
    imageUrl: '/images/dress_1_modern.png',
    sizes: ['XS', 'S', 'M'],
    colors: ['Alb Pur', 'Ivory'],
    collection: Collection.JARDIN_DE_LUMIERE,
    details: { fabric: 'Mătase Chiffon', silhouette: 'A-Line', neckline: 'V-Neck Adânc' }
  },
  {
    id: '2',
    name: 'Fleur Sauvage',
    description: 'Broderii florale subtile pe un corset structurat, continuând cu o fustă amplă din mătase naturală.',
    rentPrice: 200,
    type: DressType.RENT,
    imageUrl: '/images/dress_2_modern.png',
    sizes: ['S', 'M'],
    colors: ['Crem', 'Roz Pal'],
    collection: Collection.JARDIN_DE_LUMIERE,
    details: { fabric: 'Tulle Brodat', silhouette: 'Empire', neckline: 'Inimă' }
  },
  {
    id: '11',
    name: 'Briză de Vară',
    description: 'Ușoară ca o pană, această rochie din organza de mătase este definiția romantismului boem.',
    rentPrice: 190,
    type: DressType.RENT,
    imageUrl: '/images/dress_11_modern.png',
    sizes: ['S', 'M', 'L'],
    colors: ['Alb', 'Ivory'],
    collection: Collection.JARDIN_DE_LUMIERE,
    details: { fabric: 'Organza', silhouette: 'Dreaptă', neckline: 'Breteluțe' }
  },
  {
    id: '12',
    name: 'Grădina Secretă',
    description: 'Aplicații 3D florale care par să crească pe rochie, perfectă pentru o nuntă în grădină.',
    price: 850,
    type: DressType.BUY,
    imageUrl: '/images/dress_12_modern.png',
    sizes: ['XS', 'S'],
    colors: ['Nude', 'Ivory'],
    collection: Collection.JARDIN_DE_LUMIERE,
    details: { fabric: 'Dantelă 3D', silhouette: 'A-Line', neckline: 'Iluzie' }
  },

  // --- The Atelier of Dreams (Classic, Royal, Structured) ---
  {
    id: '3',
    name: 'Atelier Royal',
    description: 'O capodoperă a croitoriei clasice. Satin greu, linii impecabile și un aer regal demn de marile case de modă.',
    price: 1200,
    type: DressType.BUY,
    imageUrl: '/images/dress_3_modern.png',
    sizes: ['M', 'L'],
    colors: ['Alb Perlat'],
    collection: Collection.ATELIER_OF_DREAMS,
    details: { fabric: 'Satin Duchesse', silhouette: 'Ballgown', neckline: 'Barcă' }
  },
  {
    id: '4',
    name: 'Secrets de Mode',
    description: 'Eleganță atemporală. Un design care îmbrățișează silueta, perfect pentru evenimente sofisticate.',
    rentPrice: 250,
    type: DressType.RENT,
    imageUrl: '/images/dress_4_modern.png',
    sizes: ['S', 'M', 'L'],
    colors: ['Alb', 'Ivory'],
    collection: Collection.ATELIER_OF_DREAMS,
    details: { fabric: 'Crepe', silhouette: 'Mermaid', neckline: 'Halter' }
  },
  {
    id: '13',
    name: 'Grace',
    description: 'Inspirată de Grace Kelly, cu dantelă fină în partea superioară și o fustă structurată.',
    price: 1400,
    type: DressType.BUY,
    imageUrl: '/images/dress_13_modern.png',
    sizes: ['S', 'M', 'L'],
    colors: ['Alb'],
    collection: Collection.ATELIER_OF_DREAMS,
    details: { fabric: 'Dantelă Chantilly', silhouette: 'A-Line', neckline: 'Guler Înalt' }
  },
  {
    id: '14',
    name: 'Majesty',
    description: 'Trenă lungă de 3 metri și broderie manuală cu fir de argint. Pentru mireasa care vrea să fie regină.',
    rentPrice: 500,
    type: DressType.RENT,
    imageUrl: '/images/dress_14_modern.png',
    sizes: ['M', 'L'],
    colors: ['Champagne'],
    collection: Collection.ATELIER_OF_DREAMS,
    details: { fabric: 'Mikado', silhouette: 'Princess', neckline: 'Off-shoulder' }
  },

  // --- The Nymph (Ethereal, Sparkly, Fantasy) ---
  {
    id: '5',
    name: 'Siren\'s Song',
    description: 'Texturi care imită spuma mării și reflexii argintii. O rochie pentru cele care doresc să strălucească misterios.',
    rentPrice: 300,
    price: 950,
    type: DressType.RENT,
    imageUrl: '/images/dress_5_modern.png',
    sizes: ['XS', 'S'],
    colors: ['Argintiu', 'Nude'],
    collection: Collection.THE_NYMPH,
    details: { fabric: 'Tulle cu Paiete', silhouette: 'Sheath', neckline: 'V-Neck' }
  },
  {
    id: '6',
    name: 'Forest Spirit',
    description: 'Aplicații manuale de dantelă pe un tul fin, creând un efect de ploaie de stele.',
    rentPrice: 280,
    type: DressType.RENT,
    imageUrl: '/images/dress_6_modern.png',
    sizes: ['S', 'M'],
    colors: ['Auriu', 'Șampanie'],
    collection: Collection.THE_NYMPH,
    details: { fabric: 'Tulle', silhouette: 'A-Line', neckline: 'Iluzie Spate' }
  },
  {
    id: '15',
    name: 'Stardust',
    description: 'O rochie complet acoperită cu cristale Swarovski fine, strălucind la fiecare mișcare.',
    price: 2000,
    type: DressType.BUY,
    imageUrl: '/images/dress_15_modern.png',
    sizes: ['S', 'M'],
    colors: ['Alb Diamant'],
    collection: Collection.THE_NYMPH,
    details: { fabric: 'Plasă cu Cristale', silhouette: 'Column', neckline: 'Cowl' }
  },
  {
    id: '16',
    name: 'Ethereal Mist',
    description: 'Straturi suprapuse de tulle gri perlat și alb, creând un efect de ceață misterioasă.',
    rentPrice: 260,
    type: DressType.RENT,
    imageUrl: '/images/nymph_vintage.png',
    sizes: ['XS', 'S', 'M'],
    colors: ['Gri Perlat', 'Alb'],
    collection: Collection.THE_NYMPH,
    details: { fabric: 'Tulle Fin', silhouette: 'Ballgown', neckline: 'Corset' }
  },

  // --- The New Look (Modern, Minimalist, Architectural) ---
  {
    id: '7',
    name: 'Iconic Cape',
    description: 'Minimalism absolut. O rochie coloană completată de o capă dramatică, redefinind silueta modernă.',
    price: 800,
    type: DressType.BUY,
    imageUrl: '/images/new_look_vintage.png',
    sizes: ['S', 'M', 'L'],
    colors: ['Alb Mat', 'Ivory'],
    collection: Collection.THE_NEW_LOOK,
    details: { fabric: 'Crepe Elastan', silhouette: 'Column', neckline: 'Rotund' }
  },
  {
    id: '8',
    name: 'Sculptural White',
    description: 'Linii geometrice și decupaje îndrăznețe. Pentru mireasa care caută ceva diferit și contemporan.',
    rentPrice: 220,
    type: DressType.RENT,
    imageUrl: '/images/new_look_vintage.png',
    sizes: ['XS', 'S'],
    colors: ['Alb Gheață'],
    collection: Collection.THE_NEW_LOOK,
    details: { fabric: 'Tafta', silhouette: 'Asimetric', neckline: 'Un Umar' }
  },
  {
    id: '17',
    name: 'Urban Chic',
    description: 'O salopetă elegantă de mireasă cu trenă detașabilă. Confort și stil pentru cununia civilă.',
    price: 550,
    type: DressType.BUY,
    imageUrl: '/images/new_look_vintage.png',
    sizes: ['S', 'M'],
    colors: ['Alb'],
    collection: Collection.THE_NEW_LOOK,
    details: { fabric: 'Satin', silhouette: 'Jumpsuit', neckline: 'V-Neck' }
  },
  {
    id: '18',
    name: 'Modern Silk',
    description: 'Rochie slip dress din mătase grea, inspirată din anii 90, simplă dar extrem de sofisticată.',
    rentPrice: 150,
    type: DressType.RENT,
    imageUrl: '/images/new_look_vintage.png',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Ivory'],
    collection: Collection.THE_NEW_LOOK,
    details: { fabric: 'Mătase Naturală', silhouette: 'Slip', neckline: 'Spaghete' }
  },

  // --- Feminity (Volume, Ruffles, Dramatic) ---
  {
    id: '9',
    name: 'Grand Ball',
    description: 'Volum impresionant din straturi multiple de tul. O declarație de feminitate supremă și romantism.',
    rentPrice: 400,
    price: 1500,
    type: DressType.RENT,
    imageUrl: '/images/feminity_vintage.png',
    sizes: ['S', 'M', 'L'],
    colors: ['Ivory', 'Champagne'],
    collection: Collection.FEMINITY,
    details: { fabric: 'Tulle Plisat', silhouette: 'Ballgown', neckline: 'Inimă' }
  },
  {
    id: '10',
    name: 'Velvet Dreams',
    description: 'O combinație îndrăzneață de texturi bogate și croială amplă, pentru o apariție de neuitat.',
    rentPrice: 350,
    type: DressType.RENT,
    imageUrl: '/images/feminity_vintage.png',
    sizes: ['M', 'L'],
    colors: ['Alb', 'Ivory'],
    collection: Collection.FEMINITY,
    details: { fabric: 'Catifea & Tulle', silhouette: 'Princess', neckline: 'V-Neck' }
  },
  {
    id: '19',
    name: 'Ruffled Rose',
    description: 'Sute de volane mici creând o textură de trandafir. O rochie statement.',
    price: 1800,
    type: DressType.BUY,
    imageUrl: '/images/feminity_vintage.png',
    sizes: ['S', 'M'],
    colors: ['Roz Pal', 'Alb'],
    collection: Collection.FEMINITY,
    details: { fabric: 'Organza', silhouette: 'Mermaid', neckline: 'Strapless' }
  },
  {
    id: '20',
    name: 'Dramatic Bow',
    description: 'O rochie simplă în față cu o fundă supradimensionată la spate care se transformă în trenă.',
    rentPrice: 290,
    type: DressType.RENT,
    imageUrl: '/images/feminity_vintage.png',
    sizes: ['S', 'M', 'L'],
    colors: ['Alb'],
    collection: Collection.FEMINITY,
    details: { fabric: 'Mikado', silhouette: 'A-Line', neckline: 'Pătrat' }
  },

  // --- Carmen Collection (New) ---
  {
    id: 'carmen-1',
    name: 'Carmen',
    description: 'O rochie de vis ce emană o feminitate caldă și delicată, are un corset cu decolteu în V care îmbrățișează silueta, fiind decorat cu o broderie florală prețioasă, mărgele strălucitoare și paiete discrete.',
    rentPrice: 0,
    type: DressType.RENT, // Assuming rent/buy based on context or keeping generic for now
    imageUrl: '/images/carmen_1.jpg',
    sizes: ['XS', 'S', 'M'],
    colors: ['Alb', 'Ivory'],
    collection: Collection.CARMEN,
    details: { fabric: 'Tul & Dantelă', silhouette: 'Fit-and-flare', neckline: 'V-Neck' }
  }
];
