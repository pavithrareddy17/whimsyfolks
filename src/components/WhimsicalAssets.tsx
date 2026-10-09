import React from 'react';
import { StickerId, EnvelopeDecorId } from '../types/stationery';

/**
 * Enhanced Whimsical Handcrafted Stickers & Details:
 * Rendered with rich watercolor gradients, die-cut paper sticker borders,
 * warm ambient drop shadows, and delicate vintage cottagecore textures.
 */

interface StickerGraphicProps {
  type: StickerId;
  className?: string;
}

export const WhimsicalSticker: React.FC<StickerGraphicProps> = ({ type, className = '' }) => {
  switch (type) {
    case 'birthday-cake':
      // Whimsical tiered birthday cake with scalloped cream frosting, ribbon bows, and glowing candles
      return (
        <svg
          viewBox="0 0 160 200"
          className={`w-28 sm:w-34 h-auto drop-shadow-lg select-none ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="cake-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFF3C4" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FFF3C4" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="cream-icing" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFFFFA" />
              <stop offset="100%" stopColor="#F9F1E2" />
            </linearGradient>
            <linearGradient id="cake-tier" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFFBF5" />
              <stop offset="50%" stopColor="#FAF2E4" />
              <stop offset="100%" stopColor="#EEDFC9" />
            </linearGradient>
            <linearGradient id="candle-red" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#D93848" />
              <stop offset="50%" stopColor="#B31E2A" />
              <stop offset="100%" stopColor="#8A131D" />
            </linearGradient>
          </defs>

          {/* Die-cut white paper sticker silhouette */}
          <path
            d="M 22 186 C 14 186 10 160 14 116 C 16 94 24 74 34 68 C 34 32 46 22 80 22 C 114 22 126 32 126 68 C 136 74 144 94 146 116 C 150 160 146 186 138 186 Z"
            fill="#FFFFFF"
            stroke="#F0E8DC"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Warm Candle Light Glow */}
          <circle cx="80" cy="30" r="32" fill="url(#cake-glow)" />

          {/* ===== BOTTOM TIER ===== */}
          <ellipse cx="80" cy="174" rx="56" ry="16" fill="#E6D3B8" />
          <path
            d="M 24 122 C 24 136 49 146 80 146 C 111 146 136 136 136 122 L 136 166 C 136 180 111 190 80 190 C 49 190 24 180 24 166 Z"
            fill="url(#cake-tier)"
            stroke="#8C6E53"
            strokeWidth="1.2"
          />
          <ellipse cx="80" cy="122" rx="56" ry="16" fill="url(#cream-icing)" stroke="#8C6E53" strokeWidth="1" />

          {/* Piped Buttercream Swags on Bottom Tier */}
          <path
            d="M 28 132 Q 54 148 80 148 Q 106 148 132 132"
            stroke="#C4A88E"
            strokeWidth="1.6"
            fill="none"
          />
          <path
            d="M 30 156 Q 55 170 80 170 Q 105 170 130 156"
            stroke="#C4A88E"
            strokeWidth="1.2"
            strokeDasharray="2 2"
            fill="none"
          />

          {/* ===== TOP TIER ===== */}
          <path
            d="M 38 68 C 38 80 57 90 80 90 C 103 90 122 80 122 68 L 122 112 C 122 124 103 132 80 132 C 57 132 38 124 38 112 Z"
            fill="url(#cake-tier)"
            stroke="#8C6E53"
            strokeWidth="1.2"
          />
          <ellipse cx="80" cy="68" rx="42" ry="13" fill="url(#cream-icing)" stroke="#8C6E53" strokeWidth="1" />

          {/* Piped Pearls on Top Tier */}
          <path
            d="M 40 78 Q 60 92 80 92 Q 100 92 120 78"
            stroke="#C4A88E"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M 42 98 Q 61 110 80 110 Q 99 110 118 98"
            stroke="#C4A88E"
            strokeWidth="1.2"
            strokeDasharray="2 2"
            fill="none"
          />

          {/* Red Satin Bow Knots on tiers */}
          {[
            { x: 50, y: 80, s: 0.65 },
            { x: 80, y: 88, s: 0.75 },
            { x: 110, y: 80, s: 0.65 },
            { x: 36, y: 138, s: 0.7 },
            { x: 64, y: 148, s: 0.7 },
            { x: 96, y: 148, s: 0.7 },
            { x: 124, y: 138, s: 0.7 },
          ].map((b, i) => (
            <g key={i} transform={`translate(${b.x}, ${b.y}) scale(${b.s})`}>
              <path d="M 0 0 C -12 -12 -16 -2 -6 2 C -2 3 0 0 0 0" fill="#B31E2A" />
              <path d="M 0 0 C 12 -12 16 -2 6 2 C 2 3 0 0 0 0" fill="#B31E2A" />
              <circle cx="0" cy="0" r="3" fill="#80101C" />
              <path d="M -2 2 Q -5 16 -7 20" stroke="#B31E2A" strokeWidth="2" strokeLinecap="round" />
              <path d="M 2 2 Q 5 16 7 20" stroke="#B31E2A" strokeWidth="2" strokeLinecap="round" />
            </g>
          ))}

          {/* Striped Lit Birthday Candles */}
          {[
            { x: 62, y: 40, h: 26 },
            { x: 80, y: 34, h: 30 },
            { x: 98, y: 40, h: 26 },
          ].map((c, idx) => (
            <g key={idx} transform={`translate(${c.x}, ${c.y})`}>
              <rect x="-3" y="0" width="6" height={c.h} rx="2" fill="url(#candle-red)" stroke="#730C16" strokeWidth="0.8" />
              <line x1="-3" y1="6" x2="3" y2="10" stroke="#FFF7ED" strokeWidth="1.2" />
              <line x1="-3" y1="14" x2="3" y2="18" stroke="#FFF7ED" strokeWidth="1.2" />
              <line x1="0" y1="0" x2="0" y2="-4" stroke="#3D2918" strokeWidth="1.2" />
              {/* Teardrop Candle Flame with warm glow */}
              <path d="M 0 -4 C -4 -9 -4 -16 0 -20 C 4 -16 4 -9 0 -4 Z" fill="#FFC936" />
              <path d="M 0 -6 C -2 -10 -2 -14 0 -17 C 2 -10 2 -14 0 -6 Z" fill="#FFF494" />
              <circle cx="0" cy="-9" r="2.5" fill="#E65100" />
            </g>
          ))}
        </svg>
      );

    case 'happy-birthday-cutout':
      // Scrapbook paper collage "HAPPY BIRTHDAY" letters with washi tape details
      return (
        <div
          className={`inline-block select-none rotate-[-3deg] hover:rotate-0 transition-transform ${className}`}
          style={{ filter: 'drop-shadow(2px 5px 8px rgba(40,25,15,0.22))' }}
        >
          <div className="relative bg-[#FFFDF7] border-2 border-[#E5DAC8] p-2 sm:p-2.5 rounded-sm shadow-sm">
            {/* Washi Tape Strip at Corner */}
            <div className="absolute -top-2 left-3 w-8 h-3.5 bg-[#E8C2B3]/80 border-t border-b border-dashed border-[#C49B89] rotate-[-5deg] shadow-xs" />
            <div className="absolute -bottom-2 right-3 w-8 h-3.5 bg-[#C5D9C4]/80 border-t border-b border-dashed border-[#96B595] rotate-[4deg] shadow-xs" />

            {/* Top row: HAPPY */}
            <div className="flex items-center gap-1">
              {['H', 'A', 'P', 'P', 'Y'].map((letter, i) => (
                <span
                  key={i}
                  className="inline-block px-1.5 py-0.5 font-bold text-sm sm:text-base text-[#9C1C28] bg-[#F7F1E6] border border-[#D5C4AC] rounded-2xs shadow-2xs font-serif"
                  style={{
                    transform: `rotate(${(i % 2 === 0 ? 1 : -1) * (i * 1.5 + 1)}deg)`,
                    backgroundImage: 'repeating-linear-gradient(transparent, transparent 6px, #C2D5E8 7px)',
                  }}
                >
                  {letter}
                </span>
              ))}
              <span className="text-[#C43444] text-xs ml-1">★</span>
            </div>

            {/* Bottom row: BIRTHDAY */}
            <div className="flex items-center gap-0.5 mt-1.5">
              {['B', 'I', 'R', 'T', 'H', 'D', 'A', 'Y'].map((letter, i) => (
                <span
                  key={i}
                  className="inline-block px-1 py-0.5 font-bold text-xs sm:text-sm text-[#73121C] bg-[#FAF5EC] border border-[#DDD0BC] rounded-2xs shadow-2xs font-serif"
                  style={{
                    transform: `rotate(${(i % 2 === 0 ? -1 : 1) * ((i % 3) * 2 + 1)}deg)`,
                    backgroundImage: 'repeating-linear-gradient(transparent, transparent 6px, #C2D5E8 7px)',
                  }}
                >
                  {letter}
                </span>
              ))}
            </div>
          </div>
        </div>
      );

    case 'gingham-bow':
      // Red & white gingham fabric ribbon bow with woven checkered pattern
      return (
        <svg
          viewBox="0 0 120 120"
          className={`w-20 sm:w-26 h-auto select-none ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ filter: 'drop-shadow(2px 5px 8px rgba(45,20,15,0.25))' }}
        >
          <defs>
            <pattern id="gingham-pat-rich" width="8" height="8" patternUnits="userSpaceOnUse">
              <rect width="8" height="8" fill="#FFFDF9" />
              <rect x="0" y="0" width="4" height="4" fill="#C93444" />
              <rect x="4" y="4" width="4" height="4" fill="#C93444" />
              <rect x="4" y="0" width="4" height="4" fill="#E8828E" opacity="0.85" />
              <rect x="0" y="4" width="4" height="4" fill="#E8828E" opacity="0.85" />
            </pattern>
          </defs>

          {/* White die-cut outline */}
          <path
            d="M 60 48 C 24 12 0 24 4 56 C 6 72 36 68 54 54 C 42 80 20 102 8 116 L 30 112 C 42 92 56 70 60 56 C 64 70 78 92 90 112 L 112 116 C 100 102 78 80 66 54 C 84 68 114 72 116 56 C 120 24 96 12 60 48 Z"
            fill="#FFFFFF"
            stroke="#FFFFFF"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Left Wing Loop */}
          <path
            d="M 60 48 C 30 16 4 26 8 52 C 10 66 38 62 60 52 Z"
            fill="url(#gingham-pat-rich)"
            stroke="#9E2230"
            strokeWidth="1.2"
          />

          {/* Right Wing Loop */}
          <path
            d="M 60 48 C 90 16 116 26 112 52 C 110 66 82 62 60 52 Z"
            fill="url(#gingham-pat-rich)"
            stroke="#9E2230"
            strokeWidth="1.2"
          />

          {/* Left Ribbon Tail */}
          <path
            d="M 56 52 C 45 76 24 98 10 112 L 28 110 C 38 90 52 70 58 54 Z"
            fill="url(#gingham-pat-rich)"
            stroke="#9E2230"
            strokeWidth="1.2"
          />

          {/* Right Ribbon Tail */}
          <path
            d="M 64 52 C 75 76 96 98 110 112 L 92 110 C 82 90 68 70 62 54 Z"
            fill="url(#gingham-pat-rich)"
            stroke="#9E2230"
            strokeWidth="1.2"
          />

          {/* Center Knot */}
          <ellipse cx="60" cy="50" rx="9" ry="8" fill="url(#gingham-pat-rich)" stroke="#8A1824" strokeWidth="1.5" />
        </svg>
      );

    case 'red-satin-bow':
      // Silky red satin ribbon bow with liquid highlights
      return (
        <svg
          viewBox="0 0 100 90"
          className={`w-18 sm:w-22 h-auto select-none ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ filter: 'drop-shadow(2px 5px 8px rgba(50,15,20,0.28))' }}
        >
          <defs>
            <linearGradient id="satin-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#D92B3C" />
              <stop offset="50%" stopColor="#A81525" />
              <stop offset="100%" stopColor="#6E0B16" />
            </linearGradient>
          </defs>

          {/* White die-cut outline */}
          <path
            d="M 50 35 C 24 8 6 22 12 44 C 16 56 36 50 48 40 L 20 82 L 40 62 L 50 42 L 60 62 L 80 82 L 52 40 C 64 50 84 56 88 44 C 94 22 76 8 50 35 Z"
            fill="#FFFFFF"
            stroke="#FFFFFF"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Left Loop */}
          <path
            d="M 50 35 C 26 12 8 24 14 44 C 18 54 38 48 50 38 Z"
            fill="url(#satin-grad)"
            stroke="#6E0D18"
            strokeWidth="1"
          />
          <path d="M 34 22 C 22 26 18 35 24 42" stroke="#FFA3AE" strokeWidth="1.6" strokeLinecap="round" opacity="0.75" />

          {/* Right Loop */}
          <path
            d="M 50 35 C 74 12 92 24 86 44 C 82 54 62 48 50 38 Z"
            fill="url(#satin-grad)"
            stroke="#6E0D18"
            strokeWidth="1"
          />
          <path d="M 66 22 C 78 26 82 35 76 42" stroke="#FFA3AE" strokeWidth="1.6" strokeLinecap="round" opacity="0.75" />

          {/* Ribbon Tails */}
          <path d="M 47 38 Q 34 60 20 80 Q 28 74 38 60 Q 46 48 50 40 Z" fill="#8F1220" />
          <path d="M 53 38 Q 66 60 80 80 Q 72 74 62 60 Q 54 48 50 40 Z" fill="#8F1220" />

          {/* Center Knot with shine */}
          <ellipse cx="50" cy="37" rx="7" ry="6" fill="#800E1A" />
          <ellipse cx="49" cy="36" rx="4.5" ry="3.5" fill="#B82434" />
        </svg>
      );

    case 'golden-stars':
      // Antique burnished brass celestial stars with multi-point sparkles
      return (
        <svg
          viewBox="0 0 80 80"
          className={`w-14 sm:w-16 h-auto select-none ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ filter: 'drop-shadow(2px 4px 6px rgba(45,30,10,0.25))' }}
        >
          <defs>
            <radialGradient id="star-gold" cx="40%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#FFF2B2" />
              <stop offset="50%" stopColor="#E5B842" />
              <stop offset="100%" stopColor="#966D14" />
            </radialGradient>
          </defs>

          {/* White outline */}
          <path
            d="M 40 4 L 48 26 L 72 28 L 54 44 L 60 68 L 40 54 L 20 68 L 26 44 L 8 28 L 32 26 Z"
            fill="#FFFFFF"
            stroke="#FFFFFF"
            strokeWidth="4"
            strokeLinejoin="round"
          />

          {/* 8-point Faceted Golden Star */}
          <polygon
            points="40,6 48,27 70,28 53,43 59,66 40,53 21,66 27,43 10,28 32,27"
            fill="url(#star-gold)"
            stroke="#7A560D"
            strokeWidth="1.2"
          />

          {/* Facet ridges */}
          <line x1="40" y1="6" x2="40" y2="53" stroke="#FFF7D6" strokeWidth="1.2" opacity="0.8" />
          <line x1="10" y1="28" x2="59" y2="66" stroke="#66460A" strokeWidth="0.8" opacity="0.6" />
          <line x1="70" y1="28" x2="21" y2="66" stroke="#66460A" strokeWidth="0.8" opacity="0.6" />

          {/* Central Star Glimmer */}
          <circle cx="40" cy="38" r="3" fill="#FFFFFF" />
          <circle cx="40" cy="38" r="5" fill="#FFEAA8" opacity="0.5" />
        </svg>
      );

    case 'vintage-button':
      // Mother-of-pearl carved button with stitched thread
      return (
        <svg
          viewBox="0 0 60 60"
          className={`w-12 sm:w-14 h-auto select-none ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ filter: 'drop-shadow(2px 4px 5px rgba(50,35,20,0.22))' }}
        >
          <defs>
            <radialGradient id="pearl-shimmer" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="45%" stopColor="#F5EEE4" />
              <stop offset="85%" stopColor="#DFD2C0" />
              <stop offset="100%" stopColor="#C4B49E" />
            </radialGradient>
          </defs>

          {/* White outline */}
          <circle cx="30" cy="30" r="28" fill="#FFFFFF" />

          {/* Button Disc */}
          <circle cx="30" cy="30" r="25" fill="url(#pearl-shimmer)" stroke="#A89780" strokeWidth="1.2" />
          <circle cx="30" cy="30" r="18" fill="none" stroke="#BAA993" strokeWidth="0.8" strokeDasharray="3 2" />

          {/* 4 Thread Holes */}
          <circle cx="24" cy="24" r="2.5" fill="#4A3B2C" />
          <circle cx="36" cy="24" r="2.5" fill="#4A3B2C" />
          <circle cx="24" cy="36" r="2.5" fill="#4A3B2C" />
          <circle cx="36" cy="36" r="2.5" fill="#4A3B2C" />

          {/* Crossed Stitch Thread */}
          <line x1="24" y1="24" x2="36" y2="36" stroke="#FAF7ED" strokeWidth="2" strokeLinecap="round" />
          <line x1="36" y1="24" x2="24" y2="36" stroke="#FAF7ED" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'pressed-daisy':
      // Pressed botanical wildflower daisy with dried translucent petals
      return (
        <svg
          viewBox="0 0 80 80"
          className={`w-16 sm:w-18 h-auto select-none ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ filter: 'drop-shadow(2px 4px 6px rgba(40,30,15,0.2))' }}
        >
          {/* White outline */}
          <circle cx="40" cy="40" r="32" fill="#FFFFFF" />

          {/* 12 Pressed Petals */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
            <ellipse
              key={i}
              cx="40"
              cy="20"
              rx="6"
              ry="16"
              fill={i % 2 === 0 ? '#FCFAF5' : '#F6F0E4'}
              stroke="#D8CCBA"
              strokeWidth="0.8"
              transform={`rotate(${angle} 40 40)`}
              opacity="0.95"
            />
          ))}

          {/* Dried Yellow Pollen Center */}
          <circle cx="40" cy="40" r="10" fill="#E8B83D" stroke="#9E7618" strokeWidth="1" />
          <circle cx="40" cy="40" r="8" fill="#D49E24" />
          <circle cx="38" cy="38" r="1.5" fill="#FFF2BD" />
          <circle cx="42" cy="41" r="1.2" fill="#80590A" />
          <circle cx="39" cy="43" r="1.2" fill="#80590A" />
        </svg>
      );

    case 'lavender-sprig':
      // Dried lavender sprig tied with twine
      return (
        <svg
          viewBox="0 0 60 100"
          className={`w-14 sm:w-16 h-auto select-none ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ filter: 'drop-shadow(2px 4px 6px rgba(35,25,30,0.22))' }}
        >
          {/* White outline */}
          <path
            d="M 26 95 L 34 95 L 34 50 C 44 45 44 20 30 5 C 16 20 16 45 26 50 Z"
            fill="#FFFFFF"
            stroke="#FFFFFF"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Herb stem */}
          <path d="M 30 92 L 30 20" stroke="#68805F" strokeWidth="2.5" strokeLinecap="round" />

          {/* Clustered Violet Lavender Florets */}
          {[
            { y: 15, x: 30, r: 5 },
            { y: 22, x: 25, r: 4.5 },
            { y: 22, x: 35, r: 4.5 },
            { y: 30, x: 23, r: 5 },
            { y: 30, x: 37, r: 5 },
            { y: 38, x: 24, r: 4.8 },
            { y: 38, x: 36, r: 4.8 },
            { y: 46, x: 25, r: 4.5 },
            { y: 46, x: 35, r: 4.5 },
          ].map((f, i) => (
            <ellipse
              key={i}
              cx={f.x}
              cy={f.y}
              rx={f.r}
              ry={f.r * 1.3}
              fill={i % 2 === 0 ? '#8672A3' : '#6F568F'}
              stroke="#4E366E"
              strokeWidth="0.8"
            />
          ))}

          {/* Twine bow */}
          <circle cx="30" cy="70" r="3" fill="#B58F59" />
          <path d="M 30 70 Q 20 65 18 72 Q 22 75 30 71" stroke="#9E763B" strokeWidth="1.5" fill="none" />
          <path d="M 30 70 Q 40 65 42 72 Q 38 75 30 71" stroke="#9E763B" strokeWidth="1.5" fill="none" />
          <path d="M 28 72 L 24 84" stroke="#9E763B" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M 32 72 L 36 84" stroke="#9E763B" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );

    case 'sweet-heart':
      // Blushed conversation candy heart with sweet vintage flourish
      return (
        <svg
          viewBox="0 0 70 70"
          className={`w-14 sm:w-16 h-auto select-none ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ filter: 'drop-shadow(2px 4px 6px rgba(50,20,30,0.22))' }}
        >
          <defs>
            <radialGradient id="sweet-heart-grad" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#FFA6B3" />
              <stop offset="60%" stopColor="#F06B7E" />
              <stop offset="100%" stopColor="#C43449" />
            </radialGradient>
          </defs>

          {/* White outline */}
          <path
            d="M 35 62 C 12 46 4 34 4 20 C 4 9 13 2 24 2 C 30 2 34 6 35 10 C 36 6 40 2 46 2 C 57 2 66 9 66 20 C 66 34 58 46 35 62 Z"
            fill="#FFFFFF"
            stroke="#FFFFFF"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          <path
            d="M 35 58 C 14 44 7 32 7 20 C 7 11 15 5 24 5 C 29 5 33 8 35 12 C 37 8 41 5 46 5 C 55 5 63 11 63 20 C 63 32 56 44 35 58 Z"
            fill="url(#sweet-heart-grad)"
            stroke="#A31C30"
            strokeWidth="1.2"
          />

          {/* Highlight sheen */}
          <path
            d="M 15 15 C 18 10 24 8 28 9"
            stroke="#FFFFFF"
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity="0.8"
          />
          {/* Subtle text */}
          <text
            x="35"
            y="32"
            textAnchor="middle"
            fill="#FFF0F3"
            fontSize="10"
            fontFamily="'Caveat', cursive"
            fontWeight="bold"
          >
            with love
          </text>
        </svg>
      );

    case 'cottage-strawberry':
      // Sweet ripe strawberry with blossom flower
      return (
        <svg
          viewBox="0 0 70 80"
          className={`w-14 sm:w-16 h-auto select-none ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ filter: 'drop-shadow(2px 4px 6px rgba(45,20,15,0.22))' }}
        >
          <defs>
            <radialGradient id="berry-red" cx="40%" cy="40%" r="65%">
              <stop offset="0%" stopColor="#FF4D62" />
              <stop offset="65%" stopColor="#D91E36" />
              <stop offset="100%" stopColor="#960C1F" />
            </radialGradient>
          </defs>

          {/* White outline */}
          <path
            d="M 35 74 C 18 64 8 48 10 30 C 12 18 24 16 35 20 C 46 16 58 18 60 30 C 62 48 52 64 35 74 Z"
            fill="#FFFFFF"
            stroke="#FFFFFF"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Berry Body */}
          <path
            d="M 35 70 C 20 60 12 46 14 32 C 16 22 26 20 35 24 C 44 20 54 22 56 32 C 58 46 50 60 35 70 Z"
            fill="url(#berry-red)"
            stroke="#7A0B1A"
            strokeWidth="1"
          />

          {/* Seeds */}
          {[
            { x: 26, y: 34 }, { x: 35, y: 36 }, { x: 44, y: 34 },
            { x: 22, y: 44 }, { x: 30, y: 46 }, { x: 40, y: 46 }, { x: 48, y: 44 },
            { x: 28, y: 56 }, { x: 36, y: 56 }, { x: 42, y: 56 },
            { x: 35, y: 64 },
          ].map((s, idx) => (
            <ellipse key={idx} cx={s.x} cy={s.y} rx="1" ry="1.6" fill="#FFE899" />
          ))}

          {/* Green Calyx Leaves */}
          <path
            d="M 35 24 C 30 16 20 18 16 22 C 24 24 28 26 35 26 C 42 26 46 24 54 22 C 50 18 40 16 35 24 Z"
            fill="#5E8755"
            stroke="#3B5A34"
            strokeWidth="0.8"
          />
          <path d="M 35 24 L 35 12" stroke="#5E8755" strokeWidth="2.5" strokeLinecap="round" />

          {/* Tiny white blossom */}
          <circle cx="20" cy="18" r="4" fill="#FFFFFF" stroke="#E0D6C5" strokeWidth="0.6" />
          <circle cx="20" cy="18" r="1.5" fill="#FFCC00" />
        </svg>
      );

    case 'storybook-bunny':
      // Fluffy cottontail bunny rabbit with forget-me-not flower
      return (
        <svg
          viewBox="0 0 70 80"
          className={`w-14 sm:w-16 h-auto select-none ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ filter: 'drop-shadow(2px 4px 6px rgba(40,30,20,0.2))' }}
        >
          {/* White outline */}
          <path
            d="M 32 72 C 16 72 12 56 16 44 C 18 36 24 32 26 24 C 20 12 28 2 34 10 C 38 4 48 10 44 24 C 52 30 56 42 54 54 C 54 66 46 72 32 72 Z"
            fill="#FFFFFF"
            stroke="#FFFFFF"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Bunny Body */}
          <ellipse cx="34" cy="54" rx="18" ry="16" fill="#FAF6EE" stroke="#CBBBA8" strokeWidth="1" />
          {/* Bunny Head */}
          <circle cx="34" cy="34" r="12" fill="#FAF6EE" stroke="#CBBBA8" strokeWidth="1" />
          {/* Ears */}
          <path d="M 28 26 C 24 14 26 4 30 8 C 34 12 32 20 30 26 Z" fill="#FAF6EE" stroke="#CBBBA8" strokeWidth="1" />
          <path d="M 28 22 C 26 14 28 8 30 10 C 32 12 30 18 29 22 Z" fill="#FCE5E8" />
          <path d="M 38 26 C 42 14 44 4 40 8 C 36 12 36 20 38 26 Z" fill="#FAF6EE" stroke="#CBBBA8" strokeWidth="1" />
          <path d="M 38 22 C 40 14 42 8 40 10 C 38 12 38 18 39 22 Z" fill="#FCE5E8" />

          {/* Eye & Nose */}
          <circle cx="38" cy="32" r="1.5" fill="#3D2B1F" />
          <circle cx="43" cy="35" r="1.2" fill="#E8A7B2" />
          {/* Cotton tail */}
          <circle cx="16" cy="56" r="5" fill="#FFFFFF" stroke="#CBBBA8" strokeWidth="0.8" />

          {/* Tiny blue flower */}
          <circle cx="44" cy="48" r="3" fill="#6B97C2" />
          <circle cx="44" cy="48" r="1" fill="#FFD152" />
        </svg>
      );

    case 'vintage-teacup':
      // Floral china teacup with rose pattern and gold trim
      return (
        <svg
          viewBox="0 0 80 60"
          className={`w-16 sm:w-18 h-auto select-none ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ filter: 'drop-shadow(2px 4px 6px rgba(40,25,15,0.22))' }}
        >
          {/* White outline */}
          <path
            d="M 12 50 C 12 56 68 56 68 50 C 68 46 64 44 60 44 L 60 20 C 68 20 74 26 72 34 C 70 40 64 42 60 42 L 20 42 C 16 42 12 46 12 50 Z"
            fill="#FFFFFF"
            stroke="#FFFFFF"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Saucer */}
          <ellipse cx="40" cy="50" rx="32" ry="6" fill="#FFFDF8" stroke="#D4AF37" strokeWidth="1.2" />

          {/* Cup Body */}
          <path
            d="M 22 20 C 22 42 32 46 40 46 C 48 46 58 42 58 20 Z"
            fill="#FFFDF8"
            stroke="#D4AF37"
            strokeWidth="1.2"
          />
          {/* Cup Rim with tea */}
          <ellipse cx="40" cy="20" rx="18" ry="5" fill="#8C5338" stroke="#D4AF37" strokeWidth="1.2" />

          {/* Handle */}
          <path
            d="M 58 24 C 68 24 70 36 58 40"
            stroke="#D4AF37"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Miniature Rose on cup */}
          <circle cx="40" cy="33" r="3.5" fill="#E86B7E" />
          <circle cx="40" cy="33" r="1.5" fill="#B32439" />
          <path d="M 44 34 Q 47 32 46 36" stroke="#4A7543" strokeWidth="1" fill="none" />
        </svg>
      );

    case 'enchanted-mushroom':
      // Red amanita toadstool with cream dots and grass sprig
      return (
        <svg
          viewBox="0 0 60 70"
          className={`w-13 sm:w-15 h-auto select-none ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ filter: 'drop-shadow(2px 4px 6px rgba(40,20,15,0.22))' }}
        >
          {/* White outline */}
          <path
            d="M 30 8 C 10 8 4 34 6 42 L 24 42 L 24 64 L 36 64 L 36 42 L 54 42 C 56 34 50 8 30 8 Z"
            fill="#FFFFFF"
            stroke="#FFFFFF"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Mushroom Cap */}
          <path
            d="M 30 10 C 12 10 8 34 9 40 C 18 42 42 42 51 40 C 52 34 48 10 30 10 Z"
            fill="#D92B3C"
            stroke="#8F1422"
            strokeWidth="1.2"
          />

          {/* Cream Polka Dots */}
          {[
            { x: 30, y: 18, r: 4 },
            { x: 19, y: 26, r: 3.5 },
            { x: 41, y: 26, r: 3.5 },
            { x: 26, y: 34, r: 2.8 },
            { x: 36, y: 34, r: 2.8 },
          ].map((d, i) => (
            <circle key={i} cx={d.x} cy={d.y} r={d.r} fill="#FFFDF5" />
          ))}

          {/* Stem */}
          <path d="M 26 40 L 25 62 L 35 62 L 34 40 Z" fill="#F7F1E4" stroke="#C9B8A3" strokeWidth="1" />
          {/* Under-cap gills */}
          <ellipse cx="30" cy="40" rx="20" ry="3" fill="#EBDDCB" stroke="#B8A38B" strokeWidth="0.8" />
        </svg>
      );

    case 'honey-bee':
      // Golden bumblebee with gossamer lace wings
      return (
        <svg
          viewBox="0 0 70 60"
          className={`w-14 sm:w-16 h-auto select-none ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ filter: 'drop-shadow(2px 4px 6px rgba(45,30,10,0.22))' }}
        >
          {/* White outline */}
          <path
            d="M 35 15 C 22 2 12 8 20 25 C 10 28 10 40 22 46 C 30 52 40 52 48 46 C 60 40 60 28 50 25 C 58 8 48 2 35 15 Z"
            fill="#FFFFFF"
            stroke="#FFFFFF"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Gossamer Wings */}
          <ellipse cx="24" cy="18" rx="14" ry="7" fill="#E8F4FA" stroke="#89ADC2" strokeWidth="0.8" opacity="0.85" transform="rotate(-30 24 18)" />
          <ellipse cx="46" cy="18" rx="14" ry="7" fill="#E8F4FA" stroke="#89ADC2" strokeWidth="0.8" opacity="0.85" transform="rotate(30 46 18)" />

          {/* Bee Body */}
          <ellipse cx="35" cy="34" rx="12" ry="16" fill="#F2B729" stroke="#80590A" strokeWidth="1.2" />
          {/* Black Furry Stripes */}
          <path d="M 24 28 Q 35 32 46 28" stroke="#2B1D0E" strokeWidth="3" />
          <path d="M 23 35 Q 35 39 47 35" stroke="#2B1D0E" strokeWidth="3" />
          <path d="M 25 42 Q 35 46 45 42" stroke="#2B1D0E" strokeWidth="3" />

          {/* Bee Head */}
          <circle cx="35" cy="20" r="6" fill="#2B1D0E" />
          {/* Antennae */}
          <path d="M 33 16 Q 28 10 26 12" stroke="#2B1D0E" strokeWidth="1.2" strokeLinecap="round" fill="none" />
          <path d="M 37 16 Q 42 10 44 12" stroke="#2B1D0E" strokeWidth="1.2" strokeLinecap="round" fill="none" />
        </svg>
      );

    default:
      return null;
  }
};

/**
 * Envelope Outer Decorative Elements (Fixed Accents)
 */
export const EnvelopeDecorOverlay: React.FC<{ decor: EnvelopeDecorId }> = ({ decor }) => {
  switch (decor) {
    case 'golden-stars':
      return (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-6 left-6 rotate-[-12deg] scale-90">
            <WhimsicalSticker type="golden-stars" />
          </div>
          <div className="absolute bottom-6 right-6 rotate-[15deg] scale-90">
            <WhimsicalSticker type="golden-stars" />
          </div>
          <div className="absolute bottom-10 left-8 rotate-[8deg] scale-75">
            <WhimsicalSticker type="golden-stars" />
          </div>
        </div>
      );

    case 'gingham-bow':
      return (
        <div className="absolute top-2 left-6 z-30 pointer-events-none rotate-[-6deg]">
          <WhimsicalSticker type="gingham-bow" />
        </div>
      );

    case 'red-satin-bow':
      return (
        <div className="absolute top-2 right-6 z-30 pointer-events-none rotate-[8deg]">
          <WhimsicalSticker type="red-satin-bow" />
        </div>
      );

    case 'pearl-buttons':
      return (
        <div className="absolute bottom-4 left-6 z-30 pointer-events-none flex gap-2">
          <WhimsicalSticker type="vintage-button" />
          <WhimsicalSticker type="vintage-button" />
        </div>
      );

    case 'dried-florals':
      return (
        <div className="absolute bottom-3 left-5 z-30 pointer-events-none rotate-[-15deg]">
          <WhimsicalSticker type="pressed-daisy" />
        </div>
      );

    default:
      return null;
  }
};
