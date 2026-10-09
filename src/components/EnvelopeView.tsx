import React from 'react';
import { EnvelopeStyleId, LetterData } from '../types/stationery';
import { WaxSeal } from './WaxSeal';
import { EnvelopeDecorOverlay } from './WhimsicalAssets';
import { DraggableSticker } from './DraggableSticker';

interface EnvelopeViewProps {
  letter: LetterData;
  isFront?: boolean;
  isOpen?: boolean;
  onBreakSeal?: () => void;
  onFlip?: () => void;
  interactiveSeal?: boolean;
  isInteractive?: boolean;
  onUpdateStickerPosition?: (id: string, x: number, y: number) => void;
  onRemoveSticker?: (id: string) => void;
  className?: string;
}

export const ENVELOPE_STYLES: Record<
  EnvelopeStyleId,
  {
    name: string;
    tagline: string;
    outerColor: string;
    innerColor: string;
    borderColor: string;
    shadow: string;
    textColor: string;
  }
> = {
  'plain-cream': {
    name: 'Plain Ivory Linen',
    tagline: 'Clean, minimalist unadorned stationery envelope',
    outerColor: '#F7EFE1',
    innerColor: '#EFE4D2',
    borderColor: '#D8C7B0',
    shadow: 'rgba(50, 35, 20, 0.15)',
    textColor: '#3A2818',
  },
  'folk-floral': {
    name: 'Folk Botanical Bloom',
    tagline: 'Embroidered Hungarian folk floral motifs (Image 1)',
    outerColor: '#F7EEDC',
    innerColor: '#EFE2CC',
    borderColor: '#8A6D3B',
    shadow: 'rgba(50, 30, 15, 0.22)',
    textColor: '#3A2818',
  },
  'vienna-lace': {
    name: 'Vienna Lace Set',
    tagline: 'Intricate burgundy wine sheer floral lace (Image 8)',
    outerColor: '#5C1E28',
    innerColor: '#45121B',
    borderColor: '#360A12',
    shadow: 'rgba(60, 15, 25, 0.3)',
    textColor: '#FAF4EC',
  },
  'candy-stripe': {
    name: 'Candy Stripe & Stars',
    tagline: 'Crimson & cream candy stripes with star charms (Image 2)',
    outerColor: '#E87D88',
    innerColor: '#D96572',
    borderColor: '#A83B46',
    shadow: 'rgba(60, 20, 30, 0.2)',
    textColor: '#3D1D22',
  },
  'crimson-velvet': {
    name: 'Crimson Velvet',
    tagline: 'Deep passionate red envelope with scalloped cards (Image 3)',
    outerColor: '#B31E2A',
    innerColor: '#941420',
    borderColor: '#730C16',
    shadow: 'rgba(70, 10, 20, 0.28)',
    textColor: '#FFFDF9',
  },
  'blush-linen': {
    name: 'Blush Linen',
    tagline: 'Delicate dusty rose weave with satin ribbons',
    outerColor: '#E5CDCE',
    innerColor: '#D7B9BA',
    borderColor: '#C49FA2',
    shadow: 'rgba(60, 30, 40, 0.18)',
    textColor: '#422125',
  },
  'soft-sage': {
    name: 'Country Sage',
    tagline: 'Earthy herb garden green with botanical accents',
    outerColor: '#B6C8B7',
    innerColor: '#A3B8A4',
    borderColor: '#8FA690',
    shadow: 'rgba(30, 50, 35, 0.2)',
    textColor: '#213322',
  },
  'kraft-rustic': {
    name: 'Vintage Kraft',
    tagline: 'Natural warm kraft paper with twine bow and stamps',
    outerColor: '#C5A986',
    innerColor: '#B69771',
    borderColor: '#A3815A',
    shadow: 'rgba(50, 35, 20, 0.22)',
    textColor: '#362412',
  },
};

export const EnvelopeView: React.FC<EnvelopeViewProps> = ({
  letter,
  isFront = false,
  isOpen = false,
  onBreakSeal,
  interactiveSeal = true,
  isInteractive = true,
  onUpdateStickerPosition,
  onRemoveSticker,
  className = '',
}) => {
  const styleConf = ENVELOPE_STYLES[letter.envelopeStyle] || ENVELOPE_STYLES['plain-cream'];

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      {/* 3D Envelope Container */}
      <div
        className="relative w-[340px] sm:w-[500px] h-[230px] sm:h-[340px] transition-transform duration-500 perspective-1000"
        style={{
          filter: `drop-shadow(0 14px 28px ${styleConf.shadow})`,
        }}
      >
        <svg viewBox="0 0 540 360" className="w-full h-full overflow-visible">
          <defs>
            {/* Candy Stripe Pattern */}
            <pattern id="env-candy-stripes" width="20" height="20" patternUnits="userSpaceOnUse">
              <rect width="20" height="20" fill="#F8E5E7" />
              <rect x="0" y="0" width="10" height="20" fill="#D94B5A" />
            </pattern>

            {/* Vienna Lace Pattern */}
            <pattern id="env-lace-pattern" width="30" height="30" patternUnits="userSpaceOnUse">
              <rect width="30" height="30" fill="#541B24" />
              <circle cx="15" cy="15" r="9" fill="none" stroke="#8C3544" strokeWidth="1" opacity="0.6" />
              <circle cx="15" cy="15" r="4" fill="#3D0F16" />
              <circle cx="0" cy="0" r="6" fill="none" stroke="#8C3544" strokeWidth="0.8" opacity="0.5" />
              <circle cx="30" cy="0" r="6" fill="none" stroke="#8C3544" strokeWidth="0.8" opacity="0.5" />
              <circle cx="0" cy="30" r="6" fill="none" stroke="#8C3544" strokeWidth="0.8" opacity="0.5" />
              <circle cx="30" cy="30" r="6" fill="none" stroke="#8C3544" strokeWidth="0.8" opacity="0.5" />
            </pattern>

            <filter id="env-shadow" x="-5%" y="-5%" width="110%" height="110%">
              <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#000000" floodOpacity="0.2" />
            </filter>
          </defs>

          {/* FRONT OF ENVELOPE */}
          {isFront ? (
            <g>
              {/* Envelope Body Base */}
              <rect
                x="20"
                y="20"
                width="500"
                height="320"
                rx="8"
                fill={
                  letter.envelopeStyle === 'candy-stripe'
                    ? 'url(#env-candy-stripes)'
                    : letter.envelopeStyle === 'vienna-lace'
                    ? 'url(#env-lace-pattern)'
                    : styleConf.outerColor
                }
                stroke={styleConf.borderColor}
                strokeWidth="1.5"
              />

              {/* Folk Art Floral Garland (Image 1) */}
              {letter.envelopeStyle === 'folk-floral' && (
                <g>
                  <rect
                    x="28"
                    y="28"
                    width="484"
                    height="304"
                    rx="6"
                    fill="none"
                    stroke="#8A6B3D"
                    strokeWidth="1"
                    strokeDasharray="4 3"
                  />
                  <g fill="#B83232">
                    <circle cx="50" cy="50" r="8" />
                    <circle cx="490" cy="50" r="8" />
                    <circle cx="50" cy="310" r="8" />
                    <circle cx="490" cy="310" r="8" />
                  </g>
                  <g fill="#D49B28">
                    <circle cx="70" cy="50" r="6" />
                    <circle cx="470" cy="50" r="6" />
                    <circle cx="70" cy="310" r="6" />
                    <circle cx="470" cy="310" r="6" />
                  </g>
                  <g stroke="#486B49" strokeWidth="1.5" fill="none">
                    <path d="M50 70 Q 70 85 50 100" />
                    <path d="M490 70 Q 470 85 490 100" />
                    <path d="M50 290 Q 70 275 50 260" />
                    <path d="M490 290 Q 470 275 490 260" />
                  </g>
                </g>
              )}

              {/* Clean Central Address Box */}
              <g transform="translate(100, 100)">
                <rect
                  x="0"
                  y="0"
                  width="340"
                  height="160"
                  rx="4"
                  fill="#FFFDF7"
                  stroke={letter.envelopeStyle === 'folk-floral' ? '#9E7D47' : '#D5C4AF'}
                  strokeWidth="1.2"
                  filter="url(#env-shadow)"
                />
                <rect
                  x="4"
                  y="4"
                  width="332"
                  height="152"
                  rx="3"
                  fill="none"
                  stroke="#CBB599"
                  strokeWidth="0.8"
                  strokeDasharray="3 3"
                />

                {/* To: Recipient Calligraphy */}
                <text
                  x="20"
                  y="65"
                  fontFamily="'Alex Brush', cursive"
                  fontSize="36"
                  fill="#362215"
                >
                  To: {letter.recipientName || 'You'}
                </text>
                <text
                  x="24"
                  y="105"
                  fontFamily="'EB Garamond', serif"
                  fontSize="15"
                  fontStyle="italic"
                  fill="#694C33"
                >
                  From: {letter.senderName || 'A loving friend'}
                </text>
              </g>
            </g>
          ) : (
            /* BACK OF ENVELOPE (Folded Flaps & Wax Seal) */
            <g>
              {/* Back Base */}
              <rect
                x="20"
                y="20"
                width="500"
                height="320"
                rx="8"
                fill={
                  letter.envelopeStyle === 'candy-stripe'
                    ? 'url(#env-candy-stripes)'
                    : letter.envelopeStyle === 'vienna-lace'
                    ? 'url(#env-lace-pattern)'
                    : styleConf.innerColor
                }
                stroke={styleConf.borderColor}
                strokeWidth="1.5"
              />

              {/* Open Envelope Lining & Letter Peeking */}
              {isOpen && (
                <g>
                  {/* Triangular Lining Interior Area */}
                  <polygon
                    points="20,20 270,180 520,20"
                    fill={styleConf.outerColor}
                  />

                  {/* Folded letter peeking out of open envelope */}
                  <rect
                    x="70"
                    y="35"
                    width="400"
                    height="180"
                    rx="4"
                    fill="#FFFDF7"
                    stroke="#D9CBB5"
                    strokeWidth="1.5"
                    filter="url(#env-shadow)"
                  />
                  <line x1="100" y1="70" x2="440" y2="70" stroke="#4A3B32" strokeWidth="1.2" opacity="0.3" />
                  <line x1="100" y1="92" x2="410" y2="92" stroke="#4A3B32" strokeWidth="1.2" opacity="0.3" />
                  <line x1="100" y1="114" x2="380" y2="114" stroke="#4A3B32" strokeWidth="1.2" opacity="0.3" />
                </g>
              )}

              {/* Left Side Flap */}
              <polygon
                points="20,20 270,180 20,340"
                fill={
                  letter.envelopeStyle === 'candy-stripe'
                    ? 'url(#env-candy-stripes)'
                    : letter.envelopeStyle === 'vienna-lace'
                    ? 'url(#env-lace-pattern)'
                    : styleConf.outerColor
                }
                stroke={styleConf.borderColor}
                strokeWidth="0.8"
                opacity="0.95"
              />

              {/* Right Side Flap */}
              <polygon
                points="520,20 270,180 520,340"
                fill={
                  letter.envelopeStyle === 'candy-stripe'
                    ? 'url(#env-candy-stripes)'
                    : letter.envelopeStyle === 'vienna-lace'
                    ? 'url(#env-lace-pattern)'
                    : styleConf.outerColor
                }
                stroke={styleConf.borderColor}
                strokeWidth="0.8"
                opacity="0.95"
              />

              {/* Bottom Triangular Flap */}
              <polygon
                points="20,340 270,165 520,340"
                fill={
                  letter.envelopeStyle === 'candy-stripe'
                    ? 'url(#env-candy-stripes)'
                    : letter.envelopeStyle === 'vienna-lace'
                    ? 'url(#env-lace-pattern)'
                    : styleConf.outerColor
                }
                stroke={styleConf.borderColor}
                strokeWidth="1.2"
                filter="url(#env-shadow)"
              />

              {/* Top Flap (Closed or Open) */}
              {!isOpen ? (
                <g>
                  <polygon
                    points="20,20 270,210 520,20"
                    fill={
                      letter.envelopeStyle === 'candy-stripe'
                        ? 'url(#env-candy-stripes)'
                        : letter.envelopeStyle === 'vienna-lace'
                        ? 'url(#env-lace-pattern)'
                        : styleConf.outerColor
                    }
                    stroke={styleConf.borderColor}
                    strokeWidth="1.5"
                    filter="url(#env-shadow)"
                  />
                  {(letter.envelopeStyle === 'folk-floral' || letter.envelopeStyle === 'crimson-velvet') && (
                    <path
                      d="M20 20 Q 80 70 140 115 Q 200 160 270 210 Q 340 160 400 115 Q 460 70 520 20"
                      fill="none"
                      stroke="#FAF5EB"
                      strokeWidth="2"
                      strokeDasharray="4 3"
                    />
                  )}
                </g>
              ) : (
                /* Top flap opened upward (flipped up) */
                <g>
                  <polygon
                    points="20,20 270,-115 520,20"
                    fill={
                      letter.envelopeStyle === 'candy-stripe'
                        ? 'url(#env-candy-stripes)'
                        : letter.envelopeStyle === 'vienna-lace'
                        ? 'url(#env-lace-pattern)'
                        : styleConf.outerColor
                    }
                    stroke={styleConf.borderColor}
                    strokeWidth="1.5"
                  />
                </g>
              )}

              {/* Central Wax Seal */}
              <foreignObject
                x="225"
                y={isOpen ? '155' : '165'}
                width="90"
                height="90"
                className="overflow-visible"
              >
                <div className="w-full h-full flex items-center justify-center">
                  <WaxSeal
                    color={letter.waxColor}
                    motif={letter.waxSealMotif}
                    monogramLetter={letter.waxSealMonogramLetter}
                    rimShape={letter.waxRimShape}
                    gilded={letter.waxGilded}
                    size="lg"
                    isBroken={isOpen}
                    interactive={interactiveSeal}
                    onClick={onBreakSeal}
                  />
                </div>
              </foreignObject>
            </g>
          )}
        </svg>

        {/* Envelope Decorations (Stars, Gingham Bow, Red Satin Bow, Buttons) */}
        <EnvelopeDecorOverlay decor={letter.envelopeDecor} />

        {/* Movable Individual Stickers Placed on Envelope */}
        {letter.stickers &&
          letter.stickers
            .filter((s) => s.target === 'envelope')
            .map((stk) => (
              <DraggableSticker
                key={stk.id}
                sticker={stk}
                isInteractive={isInteractive}
                onUpdatePosition={onUpdateStickerPosition}
                onRemove={onRemoveSticker}
              />
            ))}

        {/* Click prompt badge on sealed envelope */}
        {!isOpen && !isFront && interactiveSeal && (
          <div
            onClick={onBreakSeal}
            className="absolute bottom-3 inset-x-0 flex justify-center cursor-pointer group"
          >
            <span className="px-3.5 py-1 text-xs font-serif italic rounded-full bg-[#FAF6EE]/95 text-[#4A3B32] shadow-sm border border-[#D5C6AF] group-hover:scale-105 transition-transform flex items-center gap-1.5">
              <span>✦</span> Click wax seal to open letter <span>✦</span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
