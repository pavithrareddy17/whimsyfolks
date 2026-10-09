import React from 'react';
import { WaxColor, WaxRimShape, WaxSealMotif } from '../types/stationery';

interface WaxSealProps {
  color: WaxColor;
  motif: WaxSealMotif;
  monogramLetter?: string;
  rimShape?: WaxRimShape;
  gilded?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isBroken?: boolean;
  className?: string;
  onClick?: () => void;
  interactive?: boolean;
}

export const WAX_COLOR_CONFIG: Record<
  WaxColor,
  { name: string; base: string; dark: string; light: string; highlight: string; textColor: string }
> = {
  'crimson-velvet': {
    name: 'Crimson Velvet (Image 2)',
    base: '#B01C28',
    dark: '#6E0B14',
    light: '#CC2B38',
    highlight: '#E86673',
    textColor: '#42040A',
  },
  'ruby-wine': {
    name: 'Ruby Wine (Image 2)',
    base: '#6E1B27',
    dark: '#3E0811',
    light: '#8F2837',
    highlight: '#BD495A',
    textColor: '#260309',
  },
  'metallic-bronze': {
    name: 'Metallic Bronze (Image 2)',
    base: '#7C2A30',
    dark: '#451216',
    light: '#9E3E45',
    highlight: '#D4766A',
    textColor: '#2C0A0D',
  },
  'dusty-mauve': {
    name: 'Dusty Mauve (Image 1)',
    base: '#917288',
    dark: '#583F52',
    light: '#AA8CA1',
    highlight: '#C9B1C1',
    textColor: '#382433',
  },
  'blush-pink': {
    name: 'Blush Pink (Image 1)',
    base: '#CA8594',
    dark: '#854654',
    light: '#DE9FAc',
    highlight: '#F0C2CD',
    textColor: '#572530',
  },
  'antique-gold': {
    name: 'Antique Gold',
    base: '#C69D3B',
    dark: '#7A5B15',
    light: '#DEBA5C',
    highlight: '#F3DB94',
    textColor: '#573D07',
  },
  'dusty-sage': {
    name: 'Dusty Sage',
    base: '#708E77',
    dark: '#45614C',
    light: '#8BA992',
    highlight: '#B0C9B6',
    textColor: '#2B4232',
  },
  terracotta: {
    name: 'Terracotta Clay',
    base: '#B75239',
    dark: '#7D2E1A',
    light: '#CF6C53',
    highlight: '#E89885',
    textColor: '#571D0F',
  },
};

export const WaxSeal: React.FC<WaxSealProps> = ({
  color = 'crimson-velvet',
  motif = 'rose',
  monogramLetter = 'W',
  rimShape = 'organic-melted',
  gilded = false,
  size = 'md',
  isBroken = false,
  className = '',
  onClick,
  interactive = false,
}) => {
  const conf = WAX_COLOR_CONFIG[color] || WAX_COLOR_CONFIG['crimson-velvet'];

  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20',
    xl: 'w-24 h-24',
  }[size];

  // Engraved Motif stroke/fill color (or gilded gold if enabled!)
  const motifColor = gilded ? '#F3DB94' : conf.dark;

  // Render Motifs strictly based on user's reference images
  const renderMotifGraphic = () => {
    switch (motif) {
      case 'rose':
        // High-relief blooming garden rose with layered petals and leafy stem (Image 1 & 2)
        return (
          <g stroke={motifColor} fill="none" strokeWidth="1.8" strokeLinecap="round">
            {/* Center Swirl Petals */}
            <path d="M50 38 C 45 35, 42 40, 46 44 C 50 48, 56 46, 56 40 C 56 34, 46 32, 42 38" />
            {/* Outer Petals */}
            <path d="M42 38 C 36 44, 38 52, 46 54 C 54 56, 62 52, 60 44 C 60 40, 56 38, 52 38" />
            <path d="M38 46 C 34 52, 38 60, 48 62 C 58 64, 66 56, 64 48" />
            <path d="M42 56 C 45 62, 55 64, 60 60" />
            {/* Stem & Leaves */}
            <path d="M50 63 Q 48 74 44 80" strokeWidth="2.2" />
            <path d="M49 68 Q 42 66 38 72 Q 45 74 48 70" fill={motifColor} opacity="0.6" />
            <path d="M48 73 Q 56 70 60 76 Q 53 78 47 75" fill={motifColor} opacity="0.6" />
          </g>
        );

      case 'butterfly':
        // Detailed engraved butterfly with wing veins (Image 1)
        return (
          <g stroke={motifColor} fill="none" strokeWidth="1.6" strokeLinecap="round">
            {/* Thorax and Antennae */}
            <line x1="50" y1="36" x2="50" y2="66" strokeWidth="2.4" stroke={motifColor} />
            <circle cx="50" cy="34" r="2.5" fill={motifColor} />
            <path d="M48 32 Q 44 26 40 28" />
            <path d="M52 32 Q 56 26 60 28" />
            {/* Left Forewing */}
            <path d="M49 42 C 34 26, 18 32, 22 48 C 24 58, 38 56, 49 52 Z" />
            <path d="M48 44 C 36 38, 28 42, 30 48" opacity="0.8" />
            <path d="M48 47 C 38 46, 32 50, 36 53" opacity="0.8" />
            {/* Right Forewing */}
            <path d="M51 42 C 66 26, 82 32, 78 48 C 76 58, 62 56, 51 52 Z" />
            <path d="M52 44 C 64 38, 72 42, 70 48" opacity="0.8" />
            <path d="M52 47 C 62 46, 68 50, 64 53" opacity="0.8" />
            {/* Hindwings */}
            <path d="M49 52 C 36 56, 26 66, 34 74 C 42 80, 48 68, 50 58 Z" />
            <path d="M51 52 C 64 56, 74 66, 66 74 C 58 80, 52 68, 50 58 Z" />
          </g>
        );

      case 'strawberry':
        // Cottagecore textured strawberry with seed dots & leafy crown (Image 1)
        return (
          <g stroke={motifColor} strokeLinecap="round">
            {/* Berry outline */}
            <path
              d="M50 78 C 36 68, 28 54, 32 42 C 36 32, 64 32, 68 42 C 72 54, 64 68, 50 78 Z"
              fill="none"
              strokeWidth="2"
            />
            {/* Seeds */}
            {[
              { x: 42, y: 44 }, { x: 50, y: 43 }, { x: 58, y: 44 },
              { x: 38, y: 52 }, { x: 46, y: 51 }, { x: 54, y: 51 }, { x: 62, y: 52 },
              { x: 42, y: 60 }, { x: 50, y: 59 }, { x: 58, y: 60 },
              { x: 46, y: 67 }, { x: 54, y: 67 },
              { x: 50, y: 73 },
            ].map((s, i) => (
              <circle key={i} cx={s.x} cy={s.y} r="1" fill={motifColor} />
            ))}
            {/* Calyx Leaves & Stem */}
            <path d="M50 32 L 50 24" strokeWidth="2" fill="none" />
            <path d="M50 33 Q 40 28 34 34 Q 42 36 49 35" fill={motifColor} />
            <path d="M50 33 Q 60 28 66 34 Q 58 36 51 35" fill={motifColor} />
            <path d="M50 33 Q 50 40 50 42" strokeWidth="1.5" />
          </g>
        );

      case 'bunny':
        // Gentle cottontail rabbit with ears and wheat stalk (Image 1)
        return (
          <g stroke={motifColor} fill="none" strokeWidth="1.8" strokeLinecap="round">
            {/* Bunny head & ears */}
            <path d="M46 44 C 42 42, 38 46, 40 52 C 42 56, 48 58, 52 54" />
            <path d="M46 44 C 44 36, 42 26, 46 22 C 48 26, 48 34, 49 42" />
            <path d="M49 42 C 50 34, 52 24, 56 22 C 56 28, 54 36, 52 44" />
            {/* Bunny back, paws & cottontail */}
            <path d="M52 54 C 58 56, 64 62, 64 70 C 64 76, 56 78, 48 78 C 42 78, 38 72, 42 66 C 44 64, 46 64, 46 56" />
            <circle cx="66" cy="72" r="3" fill={motifColor} />
            {/* Wheat stalk behind */}
            <path d="M34 80 Q 32 50 34 32" strokeWidth="1.2" />
            {[34, 40, 46, 52].map((y, i) => (
              <path key={i} d={`M34 ${y} Q ${i % 2 === 0 ? 28 : 40} ${y - 4} 34 ${y - 8}`} strokeWidth="1.2" />
            ))}
          </g>
        );

      case 'tulip':
        // Slender elegant tulip blossom with leaves (Image 1)
        return (
          <g stroke={motifColor} fill="none" strokeWidth="1.8" strokeLinecap="round">
            {/* Center & side petals */}
            <path d="M50 30 C 42 32, 38 45, 42 55 C 46 62, 54 62, 58 55 C 62 45, 58 32, 50 30 Z" />
            <path d="M42 38 C 45 48, 48 56, 50 60" />
            <path d="M58 38 C 55 48, 52 56, 50 60" />
            {/* Stem */}
            <line x1="50" y1="62" x2="50" y2="80" strokeWidth="2.2" />
            {/* Two arching leaves */}
            <path d="M50 74 C 40 68, 32 52, 34 44 C 36 56, 42 68, 50 74" fill={motifColor} opacity="0.6" />
            <path d="M50 74 C 60 68, 68 52, 66 44 C 64 56, 58 68, 50 74" fill={motifColor} opacity="0.6" />
          </g>
        );

      case 'swans':
        // Two swans forming a heart neck silhouette on water ripples (Image 1)
        return (
          <g stroke={motifColor} fill="none" strokeWidth="1.7" strokeLinecap="round">
            {/* Left Swan (Neck curving into heart) */}
            <path d="M48 40 C 44 32, 36 32, 38 42 C 40 50, 44 56, 42 62 L 32 62 C 30 60, 26 56, 32 52" />
            <circle cx="47" cy="41" r="1" fill={motifColor} />
            {/* Right Swan */}
            <path d="M52 40 C 56 32, 64 32, 62 42 C 60 50, 56 56, 58 62 L 68 62 C 70 60, 74 56, 68 52" />
            <circle cx="53" cy="41" r="1" fill={motifColor} />
            {/* Water Ripple Waves */}
            <path d="M26 66 Q 50 63 74 66" />
            <path d="M30 72 Q 50 69 70 72" />
            <path d="M36 77 Q 50 75 64 77" />
          </g>
        );

      case 'ribbon-bow':
        // Puffy tied gift ribbon bow with loops and tails (Image 1)
        return (
          <g stroke={motifColor} fill="none" strokeWidth="1.8" strokeLinecap="round">
            {/* Left Bow Loop */}
            <path d="M50 48 C 30 30, 20 40, 26 56 C 30 64, 46 56, 50 50 Z" />
            <path d="M34 46 Q 30 52 38 52" opacity="0.6" />
            {/* Right Bow Loop */}
            <path d="M50 48 C 70 30, 80 40, 74 56 C 70 64, 54 56, 50 50 Z" />
            <path d="M66 46 Q 70 52 62 52" opacity="0.6" />
            {/* Center Knot */}
            <circle cx="50" cy="50" r="4.5" fill={motifColor} />
            {/* Tails */}
            <path d="M48 54 Q 38 68 30 78 Q 40 76 46 64" />
            <path d="M52 54 Q 62 68 70 78 Q 60 76 54 64" />
          </g>
        );

      case 'love':
        // Retro puffy bubble lettering "LOVE" with heart/kiss (Image 1)
        return (
          <g stroke={motifColor} fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {/* L */}
            <path d="M30 40 V 58 H 38" />
            {/* O (with inner heart) */}
            <ellipse cx="44" cy="50" rx="5.5" ry="8" />
            {/* V */}
            <path d="M54 42 L 58 58 L 62 42" />
            {/* E */}
            <path d="M74 42 H 68 V 58 H 74 M 68 50 H 73" />
            {/* Little heart underline */}
            <path d="M48 64 C 44 60, 48 58, 50 61 C 52 58, 56 60, 52 64 L 50 67 Z" fill={motifColor} />
          </g>
        );

      case 'heart-wreath':
        // Hand-drawn sketch heart encircled by laurel leafy wreath (Image 2)
        return (
          <g stroke={motifColor} fill="none" strokeWidth="1.8" strokeLinecap="round">
            {/* Center Heart */}
            <path
              d="M50 64 C 36 52, 34 38, 42 36 C 47 35, 49 40, 50 42 C 51 40, 53 35, 58 36 C 66 38, 64 52, 50 64 Z"
              strokeWidth="2.2"
            />
            {/* Circular Laurel Wreath */}
            <circle cx="50" cy="50" r="28" strokeWidth="1" strokeDasharray="3 3" opacity="0.7" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
              <g key={i} transform={`rotate(${deg} 50 50)`}>
                <ellipse cx="50" cy="22" rx="3.5" ry="2" fill={motifColor} opacity="0.75" />
              </g>
            ))}
          </g>
        );

      case 'heart-balloons':
        // Bouquet of 3 heart balloons with ribbon bow (Image 2)
        return (
          <g stroke={motifColor} fill="none" strokeWidth="1.8" strokeLinecap="round">
            {/* Center Top Heart */}
            <path d="M50 36 C 42 26, 42 18, 47 18 C 50 18, 50 21, 50 22 C 50 21, 50 18, 53 18 C 58 18, 58 26, 50 36 Z" fill={motifColor} opacity="0.7" />
            {/* Left Heart */}
            <path d="M38 46 C 30 36, 30 28, 35 28 C 38 28, 38 31, 38 32 C 38 31, 38 28, 41 28 C 46 28, 46 36, 38 46 Z" fill={motifColor} opacity="0.7" />
            {/* Right Heart */}
            <path d="M62 46 C 54 36, 54 28, 59 28 C 62 28, 62 31, 62 32 C 62 31, 62 28, 65 28 C 70 28, 70 36, 62 46 Z" fill={motifColor} opacity="0.7" />
            {/* Strings */}
            <path d="M50 36 Q 50 52 50 62" strokeWidth="1.2" />
            <path d="M38 46 Q 44 54 50 62" strokeWidth="1.2" />
            <path d="M62 46 Q 56 54 50 62" strokeWidth="1.2" />
            {/* Bow at bottom */}
            <path d="M50 62 C 44 56, 38 64, 48 66" />
            <path d="M50 62 C 56 56, 62 64, 52 66" />
            <path d="M50 64 L 46 76" />
            <path d="M50 64 L 54 76" />
          </g>
        );

      case 'sword-rose':
        // Ornate royal sword piercing a blooming rose (Image 2)
        return (
          <g stroke={motifColor} fill="none" strokeWidth="1.8" strokeLinecap="round">
            {/* Sword Blade */}
            <line x1="50" y1="20" x2="50" y2="82" strokeWidth="2.4" />
            {/* Sword Hilt Crossguard & Pommel */}
            <line x1="38" y1="30" x2="62" y2="30" strokeWidth="3" />
            <circle cx="50" cy="18" r="3" fill={motifColor} />
            {/* Pierced Rose in Center */}
            <circle cx="50" cy="50" r="10" strokeWidth="2" />
            <path d="M44 48 C 46 44, 54 44, 56 48 C 56 54, 44 54, 44 48" />
            <path d="M42 56 Q 34 58 32 64 Q 40 64 44 58" fill={motifColor} opacity="0.5" />
            <path d="M58 56 Q 66 58 68 64 Q 60 64 56 58" fill={motifColor} opacity="0.5" />
          </g>
        );

      case 'botanical':
        // Dandelion / Wildflower botanical sprig (Image 1 & 2)
        return (
          <g stroke={motifColor} fill="none" strokeWidth="1.8" strokeLinecap="round">
            <path d="M50 80 Q 48 50 50 24" strokeWidth="2.2" />
            {/* Dandelion seed head radiating lines */}
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => (
              <g key={i} transform={`rotate(${deg} 50 32)`}>
                <line x1="50" y1="32" x2="50" y2="18" strokeWidth="1.2" />
                <circle cx="50" cy="17" r="1.2" fill={motifColor} />
              </g>
            ))}
            {/* Leaves at base */}
            <path d="M49 65 Q 38 60 34 50 Q 44 56 49 60" fill={motifColor} opacity="0.6" />
            <path d="M51 68 Q 62 62 66 52 Q 56 58 51 63" fill={motifColor} opacity="0.6" />
          </g>
        );

      case 'bee':
        // Vintage Honeybee
        return (
          <g stroke={motifColor} fill={motifColor}>
            <ellipse cx="50" cy="52" rx="9" ry="14" />
            <circle cx="50" cy="35" r="6" />
            <path d="M44 48 C 30 36, 20 40, 24 50 C 28 58, 40 52, 44 49 Z" fill="none" strokeWidth="2.2" />
            <path d="M56 48 C 70 36, 80 40, 76 50 C 72 58, 60 52, 56 49 Z" fill="none" strokeWidth="2.2" />
            <path d="M47 30 Q 42 22 38 23" fill="none" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M53 30 Q 58 22 62 23" fill="none" strokeWidth="1.8" strokeLinecap="round" />
          </g>
        );

      case 'monogram':
        // Calligraphy monogram letter (Image 2)
        return (
          <g>
            <text
              x="50"
              y="61"
              textAnchor="middle"
              fontFamily="'Playfair Display', serif"
              fontSize="34"
              fontStyle="italic"
              fontWeight="bold"
              fill={motifColor}
            >
              {monogramLetter.slice(0, 1).toUpperCase() || 'W'}
            </text>
            {/* Elegant flourish around monogram */}
            <path d="M32 68 Q 50 74 68 68" stroke={motifColor} strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <path d="M36 34 Q 50 28 64 34" stroke={motifColor} strokeWidth="1.5" fill="none" strokeLinecap="round" />
          </g>
        );

      default:
        return null;
    }
  };

  // Rim Outline generator based on rimShape
  const renderRimOutline = () => {
    switch (rimShape) {
      case 'round-classic':
        return (
          <circle cx="50" cy="50" r="46" fill={`url(#wax-grad-${color})`} />
        );

      case 'oval-vintage':
        return (
          <ellipse cx="50" cy="50" rx="42" ry="48" fill={`url(#wax-grad-${color})`} />
        );

      case 'ruffled-petal':
        return (
          <path
            d="M50 4 C 62 4, 68 12, 78 14 C 88 16, 94 26, 96 36 C 98 48, 92 56, 90 68 C 88 80, 78 88, 68 92 C 56 96, 44 96, 32 92 C 22 88, 12 80, 10 68 C 8 56, 2 48, 4 36 C 6 26, 12 16, 22 14 C 32 12, 38 4, 50 4 Z"
            fill={`url(#wax-grad-${color})`}
          />
        );

      case 'organic-melted':
      default:
        // Organic irregular melted spill with puddle contours (very authentic!)
        return (
          <path
            d="M50 4 C 65 3, 76 10, 85 20 C 94 30, 97 45, 95 58 C 93 72, 86 84, 73 92 C 60 99, 42 98, 29 93 C 16 88, 5 76, 4 60 C 3 45, 9 32, 18 21 C 28 10, 38 5, 50 4 Z"
            fill={`url(#wax-grad-${color})`}
          />
        );
    }
  };

  const Component = interactive && onClick ? 'button' : 'div';

  return (
    <Component
      {...(Component === 'button' ? { type: 'button' as const } : {})}
      onClick={interactive ? onClick : undefined}
      className={`relative inline-block select-none focus:outline-none transition-transform ${
        interactive ? 'cursor-pointer hover:scale-105 active:scale-95' : 'cursor-default'
      } ${sizeClasses} ${className}`}
      aria-label={`Wax seal motif: ${motif}, color: ${conf.name}`}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-md"
        style={{
          filter: 'drop-shadow(0 4px 8px rgba(35, 18, 10, 0.35))',
        }}
      >
        <defs>
          <radialGradient id={`wax-grad-${color}`} cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor={conf.highlight} />
            <stop offset="35%" stopColor={conf.light} />
            <stop offset="75%" stopColor={conf.base} />
            <stop offset="100%" stopColor={conf.dark} />
          </radialGradient>
          <linearGradient id={`bevel-${color}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
            <stop offset="50%" stopColor="transparent" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.55" />
          </linearGradient>
        </defs>

        {/* Melted organic wavy rim shape */}
        {isBroken ? (
          <g>
            <path
              d="M50 8 C 30 8, 12 25, 8 46 C 5 62, 16 82, 34 91 C 42 95, 47 95, 48 94 L 46 72 L 52 56 L 44 42 L 50 8 Z"
              fill={`url(#wax-grad-${color})`}
            />
            <path
              d="M54 8 C 72 9, 88 23, 92 44 C 95 64, 82 85, 64 92 C 56 94, 53 94, 52 94 L 50 72 L 56 56 L 48 42 L 54 8 Z"
              fill={`url(#wax-grad-${color})`}
              transform="translate(4, 2) rotate(4 50 50)"
            />
          </g>
        ) : (
          renderRimOutline()
        )}

        {/* Surface 3D lighting ring */}
        {!isBroken && (
          <>
            <path
              d="M50 6 C 70 6, 92 24, 92 50 C 92 76, 70 94, 50 94 C 30 94, 8 76, 8 50 C 8 24, 30 6, 50 6 Z"
              fill="none"
              stroke={`url(#bevel-${color})`}
              strokeWidth="2.5"
            />

            {/* Inner recessed stamped reservoir */}
            <circle cx="50" cy="50" r="32" fill={conf.base} />
            <circle
              cx="50"
              cy="50"
              r="32"
              fill="none"
              stroke={conf.dark}
              strokeWidth="2"
              opacity="0.75"
            />
            <circle
              cx="50"
              cy="50"
              r="30"
              fill="none"
              stroke={conf.highlight}
              strokeWidth="1"
              opacity="0.4"
            />

            {/* Engraved bead border */}
            <circle
              cx="50"
              cy="50"
              r="27"
              fill="none"
              stroke={conf.dark}
              strokeWidth="1.2"
              strokeDasharray="2, 3"
              opacity="0.8"
            />

            {/* Center Motif (embossed into the wax, with optional gilded foil shine!) */}
            <g
              style={{
                filter: gilded
                  ? `drop-shadow(0px 1px 2px rgba(255,230,140,0.8))`
                  : `drop-shadow(0px 1px 0px ${conf.highlight})`,
              }}
            >
              {renderMotifGraphic()}
            </g>

            {/* Top curved light reflection highlight */}
            <path
              d="M26 26 C 33 19, 44 16, 56 16"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              opacity="0.4"
            />
          </>
        )}
      </svg>
    </Component>
  );
};
