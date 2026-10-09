import React from 'react';
import { EnvelopeStyleId, PaperStyleId, WaxSealMotif, WaxColor, StickerId, EnvelopeDecorId } from '../types/stationery';
import { WAX_COLOR_CONFIG, WaxSeal } from './WaxSeal';
import { WhimsicalSticker } from './WhimsicalAssets';

/**
 * Visual Miniature Image Previews for every single selectable item:
 * Envelope Styles, Card Paper Styles, Wax Seals, Stickers, and Trimmings.
 */

// 1. Envelope Thumbnail Image
export const EnvelopeStyleThumbnail: React.FC<{ styleId: EnvelopeStyleId }> = ({ styleId }) => {
  switch (styleId) {
    case 'plain-cream':
      return (
        <svg viewBox="0 0 80 54" className="w-full h-14 rounded-xs border border-[#D5C6AF] bg-[#FAF5EB]">
          {/* Plain Envelope Flaps */}
          <polygon points="0,0 40,28 80,0" fill="#F4EBDC" stroke="#D5C4AC" strokeWidth="0.8" />
          <polygon points="0,54 40,24 80,54" fill="#F0E5D4" stroke="#D5C4AC" strokeWidth="0.8" />
          <circle cx="40" cy="26" r="4" fill="#C5523A" />
        </svg>
      );

    case 'folk-floral':
      // Matching Image 1: Folk art flowers and scalloped flap
      return (
        <svg viewBox="0 0 80 54" className="w-full h-14 rounded-xs border border-[#9E7D47] bg-[#F7EEDC]">
          <polygon points="0,0 40,28 80,0" fill="#EFE2CC" stroke="#9E7D47" strokeWidth="0.8" />
          {/* Floral embellishments */}
          <circle cx="15" cy="12" r="3" fill="#B83232" />
          <circle cx="65" cy="12" r="3" fill="#B83232" />
          <circle cx="25" cy="12" r="2.5" fill="#D49B28" />
          <circle cx="55" cy="12" r="2.5" fill="#D49B28" />
          <circle cx="40" cy="27" r="4.5" fill="#B83232" />
          <circle cx="40" cy="27" r="2" fill="#D49B28" />
          {/* Little green leaves */}
          <path d="M18 16 Q 22 20 20 24" stroke="#486B49" strokeWidth="1" fill="none" />
          <path d="M62 16 Q 58 20 60 24" stroke="#486B49" strokeWidth="1" fill="none" />
        </svg>
      );

    case 'vienna-lace':
      // Matching Image 8: Sheer burgundy wine lace
      return (
        <svg viewBox="0 0 80 54" className="w-full h-14 rounded-xs border border-[#3A0D15] bg-[#5C1E28]">
          <polygon points="0,0 40,28 80,0" fill="#4A141D" stroke="#7A2837" strokeWidth="0.8" />
          {/* Lace circles */}
          <circle cx="20" cy="14" r="5" fill="none" stroke="#8A3242" strokeWidth="0.8" strokeDasharray="1.5 1.5" />
          <circle cx="60" cy="14" r="5" fill="none" stroke="#8A3242" strokeWidth="0.8" strokeDasharray="1.5 1.5" />
          <circle cx="40" cy="40" r="5" fill="none" stroke="#8A3242" strokeWidth="0.8" strokeDasharray="1.5 1.5" />
          <circle cx="40" cy="26" r="4" fill="#7A1828" stroke="#A84355" strokeWidth="0.8" />
        </svg>
      );

    case 'candy-stripe':
      // Matching Image 2: Red & pink vertical candy stripes
      return (
        <svg viewBox="0 0 80 54" className="w-full h-14 rounded-xs border border-[#A83B46] bg-[#F8E5E7] overflow-hidden">
          {/* Stripes */}
          {[0, 10, 20, 30, 40, 50, 60, 70].map((x) => (
            <rect key={x} x={x} y="0" width="5" height="54" fill="#D94B5A" />
          ))}
          <polygon points="0,0 40,28 80,0" fill="#C93F4E" stroke="#8A2632" strokeWidth="0.8" opacity="0.9" />
          <circle cx="40" cy="27" r="4" fill="#D4AF37" />
        </svg>
      );

    case 'crimson-velvet':
      // Matching Image 3: Deep rich crimson
      return (
        <svg viewBox="0 0 80 54" className="w-full h-14 rounded-xs border border-[#6E0D18] bg-[#B31E2A]">
          <polygon points="0,0 40,28 80,0" fill="#961520" stroke="#780C15" strokeWidth="0.8" />
          {/* White dashed scalloped hem */}
          <path d="M0 0 Q 20 12 40 28 Q 60 12 80 0" stroke="#FAF5EB" strokeWidth="1" strokeDasharray="2 2" fill="none" />
          <circle cx="40" cy="27" r="4.5" fill="#D4AF37" />
        </svg>
      );

    case 'blush-linen':
      return (
        <svg viewBox="0 0 80 54" className="w-full h-14 rounded-xs border border-[#C49FA2] bg-[#E5CDCE]">
          <polygon points="0,0 40,28 80,0" fill="#D7B9BA" stroke="#B89094" strokeWidth="0.8" />
          <circle cx="40" cy="26" r="4" fill="#C77983" />
        </svg>
      );

    case 'soft-sage':
      return (
        <svg viewBox="0 0 80 54" className="w-full h-14 rounded-xs border border-[#8FA690] bg-[#B6C8B7]">
          <polygon points="0,0 40,28 80,0" fill="#A3B8A4" stroke="#829983" strokeWidth="0.8" />
          <circle cx="40" cy="26" r="4" fill="#708E77" />
        </svg>
      );

    case 'kraft-rustic':
      return (
        <svg viewBox="0 0 80 54" className="w-full h-14 rounded-xs border border-[#A3815A] bg-[#C5A986]">
          <polygon points="0,0 40,28 80,0" fill="#B69771" stroke="#9E7C55" strokeWidth="0.8" />
          <circle cx="40" cy="26" r="4" fill="#8F3F35" />
        </svg>
      );

    default:
      return null;
  }
};

// 2. Card Paper Style Thumbnail Image
export const PaperStyleThumbnail: React.FC<{ styleId: PaperStyleId }> = ({ styleId }) => {
  switch (styleId) {
    case 'plain-ivory':
      return (
        <svg viewBox="0 0 80 54" className="w-full h-14 rounded-xs border border-[#DDD0BC] bg-[#FFFDF9]">
          <rect x="10" y="10" width="30" height="2" rx="1" fill="#C5B39A" opacity="0.6" />
          <rect x="10" y="18" width="60" height="2" rx="1" fill="#D8C8B3" opacity="0.4" />
          <rect x="10" y="24" width="55" height="2" rx="1" fill="#D8C8B3" opacity="0.4" />
          <rect x="10" y="30" width="45" height="2" rx="1" fill="#D8C8B3" opacity="0.4" />
        </svg>
      );

    case 'scalloped-linen':
      // Matching Image 3: Scalloped crimson red hem
      return (
        <svg viewBox="0 0 80 54" className="w-full h-14 rounded-xs border-2 border-[#A81C2B] bg-[#FFFDF8]">
          <rect x="4" y="4" width="72" height="46" rx="2" fill="none" stroke="#A81C2B" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.7" />
          <rect x="12" y="14" width="28" height="2.5" rx="1" fill="#A81C2B" opacity="0.7" />
          <rect x="12" y="22" width="56" height="2" rx="1" fill="#7A444E" opacity="0.4" />
          <rect x="12" y="28" width="50" height="2" rx="1" fill="#7A444E" opacity="0.4" />
        </svg>
      );

    case 'lace-doily':
      // Matching Image 4: Eyelet lace border with ribbon bow
      return (
        <svg viewBox="0 0 80 54" className="w-full h-14 rounded-xs border border-[#DDD0BC] bg-[#FAF6EC]">
          <rect x="4" y="4" width="72" height="46" rx="1" fill="none" stroke="#D5C6AF" strokeWidth="2" strokeDasharray="1 2" />
          {/* Top Left Ribbon Bow */}
          <circle cx="10" cy="10" r="3" fill="#A81C2B" />
          <path d="M10 10 L 6 15" stroke="#A81C2B" strokeWidth="1" />
          <path d="M10 10 L 14 15" stroke="#A81C2B" strokeWidth="1" />
          <rect x="18" y="18" width="44" height="2" rx="1" fill="#7A6856" opacity="0.5" />
          <rect x="18" y="24" width="38" height="2" rx="1" fill="#7A6856" opacity="0.5" />
        </svg>
      );

    case 'folk-botanical':
      // Matching Image 1: Folk floral header
      return (
        <svg viewBox="0 0 80 54" className="w-full h-14 rounded-xs border-2 border-[#8A6D3B] bg-[#FAF5EB]">
          <rect x="0" y="0" width="80" height="12" fill="#F2E5CE" />
          <circle cx="20" cy="6" r="2.5" fill="#B83232" />
          <circle cx="40" cy="6" r="2.5" fill="#D49B28" />
          <circle cx="60" cy="6" r="2.5" fill="#B83232" />
          <rect x="12" y="20" width="30" height="2" rx="1" fill="#5C4533" opacity="0.6" />
          <rect x="12" y="26" width="56" height="2" rx="1" fill="#8C765C" opacity="0.4" />
        </svg>
      );

    case 'candy-stripe-card':
      // Matching Image 2: Candy stripe borders
      return (
        <svg viewBox="0 0 80 54" className="w-full h-14 rounded-xs border border-[#DDD0BC] bg-[#FFFDF9]">
          <rect x="0" y="0" width="80" height="5" fill="#D94B5A" />
          <rect x="0" y="49" width="80" height="5" fill="#D94B5A" />
          <rect x="12" y="16" width="30" height="2" rx="1" fill="#D94B5A" opacity="0.7" />
          <rect x="12" y="24" width="56" height="2" rx="1" fill="#8C765C" opacity="0.4" />
        </svg>
      );

    case 'cotton-deckle':
      return (
        <svg viewBox="0 0 80 54" className="w-full h-14 rounded-xs border border-[#E8DEC9] bg-[#FAF7F0] shadow-inner">
          <rect x="10" y="14" width="28" height="2" rx="1" fill="#7A6856" opacity="0.6" />
          <rect x="10" y="22" width="60" height="2" rx="1" fill="#A8947A" opacity="0.4" />
          <rect x="10" y="28" width="50" height="2" rx="1" fill="#A8947A" opacity="0.4" />
        </svg>
      );

    case 'vintage-parchment':
      return (
        <svg viewBox="0 0 80 54" className="w-full h-14 rounded-xs border border-[#D8C6AE] bg-[#F5ECDC]">
          <rect x="10" y="14" width="32" height="2" rx="1" fill="#5C4533" opacity="0.6" />
          <rect x="10" y="22" width="60" height="2" rx="1" fill="#8C765C" opacity="0.4" />
        </svg>
      );

    case 'lined-notebook':
      return (
        <svg viewBox="0 0 80 54" className="w-full h-14 rounded-xs border border-[#DDD0BC] bg-[#FAF8F2]">
          <line x1="16" y1="0" x2="16" y2="54" stroke="#E29494" strokeWidth="1" />
          {[12, 20, 28, 36, 44].map((y) => (
            <line key={y} x1="0" y1={y} x2="80" y2={y} stroke="#B8CDE2" strokeWidth="0.8" />
          ))}
        </svg>
      );

    default:
      return null;
  }
};

// 3. Wax Seal Thumbnail (Rendered in actual wax color!)
export const WaxSealThumbnail: React.FC<{
  motif: WaxSealMotif;
  color: WaxColor;
  label: string;
  gilded?: boolean;
}> = ({ motif, color, label, gilded = false }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-11 h-11 flex items-center justify-center">
        <WaxSeal color={color} motif={motif} size="sm" gilded={gilded} interactive={false} />
      </div>
      <span className="text-[10px] font-serif text-[#2E2419] font-medium mt-0.5 text-center leading-tight">
        {label}
      </span>
    </div>
  );
};

// 4. Sticker Miniature Picture - Visual First, Minimal Words
export const StickerThumbnail: React.FC<{ type: StickerId; label?: string }> = ({
  type,
  label,
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-1 text-center group">
      <div className="h-14 sm:h-16 flex items-center justify-center overflow-visible group-hover:scale-105 transition-transform">
        <div className="scale-75 sm:scale-80 transform origin-center">
          <WhimsicalSticker type={type} />
        </div>
      </div>
      {label && (
        <span className="font-serif text-[10px] sm:text-[11px] text-[#4A3B2C] truncate max-w-full mt-0.5">
          {label}
        </span>
      )}
    </div>
  );
};

// 5. Font Choice Visual Specimen Thumbnail - Visual representation of lettering style
export const FontThumbnail: React.FC<{ fontId: string; sampleWord: string }> = ({
  fontId,
  sampleWord,
}) => {
  const fontFamilies: Record<string, string> = {
    cedarville: "'Cedarville Cursive', cursive",
    caveat: "'Caveat', cursive",
    playfair: "'Playfair Display', serif",
    courier: "'Courier Prime', monospace",
    garamond: "'EB Garamond', serif",
    homemade: "'Homemade Apple', cursive",
    'alex-brush': "'Alex Brush', cursive",
  };

  const family = fontFamilies[fontId] || "'Caveat', cursive";

  return (
    <div className="h-14 w-full flex flex-col items-center justify-center bg-[#FAF6EE] rounded-sm p-1 border border-[#E0D4C3]">
      <span
        style={{ fontFamily: family }}
        className="text-base sm:text-lg text-[#2E2419] leading-none select-none tracking-wide"
      >
        {sampleWord}
      </span>
    </div>
  );
};

// 6. Envelope Trimming Thumbnail (Bow, Stars, Button)
export const TrimmingThumbnail: React.FC<{ decor: EnvelopeDecorId; label?: string }> = ({
  decor,
  label,
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-1 text-center">
      <div className="h-12 flex items-center justify-center">
        {decor === 'none' && <span className="text-sm font-serif text-[#8C765C]">None</span>}
        {decor === 'golden-stars' && (
          <div className="scale-75">
            <WhimsicalSticker type="golden-stars" />
          </div>
        )}
        {decor === 'gingham-bow' && (
          <div className="scale-60">
            <WhimsicalSticker type="gingham-bow" />
          </div>
        )}
        {decor === 'red-satin-bow' && (
          <div className="scale-65">
            <WhimsicalSticker type="red-satin-bow" />
          </div>
        )}
        {decor === 'pearl-buttons' && (
          <div className="scale-75">
            <WhimsicalSticker type="vintage-button" />
          </div>
        )}
        {decor === 'dried-florals' && (
          <div className="scale-75">
            <WhimsicalSticker type="pressed-daisy" />
          </div>
        )}
      </div>
      {label && <span className="font-serif text-[10px] text-[#4A3B2C] truncate">{label}</span>}
    </div>
  );
};
