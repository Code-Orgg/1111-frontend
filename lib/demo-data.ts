import type { Product } from './types'

// Fallback catalogue used when the external API is unreachable, so the gallery
// always renders. Once NEXT_PUBLIC_API_URL is live, real data takes precedence.
export const DEMO_PRODUCTS: Product[] = [
  {
    id: '1111-01',
    title: 'Threshold',
    series: 'Apparitions',
    year: 2025,
    price: 1500,
    image: '/artworks/art-1.png',
    medium: 'Archival pigment print with AR layer',
    dimensions: '90 × 120 cm',
    editionSize: 100,
    editionRemaining: 42,
    availability: 'low',
    description:
      'A figure caught between states, rendered in champagne light. When viewed through the companion lens, the filaments breathe and unravel across the room — a private aurora for the collector.',
    arDurationSeconds: 38,
  },
  {
    id: '1111-02',
    title: 'Dissolve',
    series: 'Apparitions',
    year: 2025,
    price: 1200,
    image: '/artworks/art-2.png',
    medium: 'Archival pigment print with AR layer',
    dimensions: '80 × 100 cm',
    editionSize: 100,
    editionRemaining: 71,
    availability: 'available',
    description:
      'A portrait surrendering to gold particulate. The augmented layer scatters the sitter into a slow constellation that reassembles as you approach.',
    arDurationSeconds: 42,
  },
  {
    id: '1111-03',
    title: 'Portal I',
    series: 'Horizons',
    year: 2024,
    price: 950,
    image: '/artworks/art-3.png',
    medium: 'Archival pigment print with AR layer',
    dimensions: '100 × 100 cm',
    editionSize: 150,
    editionRemaining: 108,
    availability: 'available',
    description:
      'A single geometric portal on a darkened horizon. In augmented reality the aperture opens, casting a shifting field of light onto the wall beyond the frame.',
    arDurationSeconds: 30,
  },
  {
    id: '1111-04',
    title: 'Gilded Bloom',
    series: 'Still Life',
    year: 2024,
    price: 800,
    image: '/artworks/art-4.png',
    medium: 'Archival pigment print with AR layer',
    dimensions: '70 × 90 cm',
    editionSize: 200,
    editionRemaining: 3,
    availability: 'low',
    description:
      'A baroque botanical cast in liquid gold. The animation lets the bloom open and close with the rhythm of a held breath.',
    arDurationSeconds: 26,
  },
  {
    id: '1111-05',
    title: 'Nebula 1111',
    series: 'Horizons',
    year: 2025,
    price: 1350,
    image: '/artworks/art-5.png',
    medium: 'Archival pigment print with AR layer',
    dimensions: '110 × 140 cm',
    editionSize: 75,
    editionRemaining: 0,
    availability: 'sold',
    description:
      'The flagship of the 1111 series. An indigo nebula threaded with gold, its augmented layer drifting in perpetual, non-repeating motion.',
    arDurationSeconds: 55,
  },
  {
    id: '1111-06',
    title: 'Gesture (Gold)',
    series: 'Marks',
    year: 2023,
    price: 400,
    image: '/artworks/art-6.png',
    medium: 'Archival pigment print with AR layer',
    dimensions: '60 × 80 cm',
    editionSize: 300,
    editionRemaining: 194,
    availability: 'available',
    description:
      'A single calligraphic stroke in gold ink. The entry point to the collection — its AR layer redraws the gesture, stroke by stroke, on command.',
    arDurationSeconds: 18,
  },
]

export const FRAMING_OPTIONS = [
  { id: 'natural-oak', label: 'Natural Oak', priceModifier: 0 },
  { id: 'matte-black', label: 'Matte Black', priceModifier: 120 },
  { id: 'gilded', label: 'Hand-Gilded', priceModifier: 340 },
  { id: 'unframed', label: 'Unframed (rolled)', priceModifier: -180 },
]
