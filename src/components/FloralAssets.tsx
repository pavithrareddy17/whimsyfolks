import React from 'react';

export type FloralTopper =
  | 'none'
  | 'babys-breath'
  | 'lavender-sprig'
  | 'pressed-daisy'
  | 'eucalyptus'
  | 'wild-rose'
  | 'ginkgo';

export type PinStyle = 'washi-tape' | 'brass-clip' | 'twine-tie' | 'none';

interface FloralProps {
  type: FloralTopper;
  className?: string;
}

export const FloralGraphic: React.FC<FloralProps> = ({ type, className = '' }) => {
  switch (type) {
    case 'babys-breath':
      return (
        <svg viewBox="0 0 120 160" className={`w-28 h-36 ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="drop-shadow(2px 4px 6px rgba(40,25,10,0.15))">
            {/* Main stems */}
            <path d="M60 150 C 58 110, 52 80, 45 40" stroke="#7A684D" strokeWidth="2" strokeLinecap="round" />
            <path d="M55 100 C 65 85, 80 65, 85 45" stroke="#7A684D" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M48 70 C 35 55, 25 45, 20 30" stroke="#7A684D" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M68 80 C 85 75, 100 65, 105 45" stroke="#7A684D" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M52 50 C 55 35, 62 25, 65 15" stroke="#7A684D" strokeWidth="1.2" strokeLinecap="round" />
            
            {/* Delicate little florets */}
            {[
              { cx: 45, cy: 38, r: 4 },
              { cx: 38, cy: 30, r: 3.5 },
              { cx: 50, cy: 26, r: 3 },
              { cx: 20, cy: 28, r: 3.8 },
              { cx: 16, cy: 22, r: 3.2 },
              { cx: 26, cy: 20, r: 3.5 },
              { cx: 85, cy: 42, r: 4.2 },
              { cx: 92, cy: 36, r: 3.5 },
              { cx: 78, cy: 32, r: 3.2 },
              { cx: 105, cy: 44, r: 4 },
              { cx: 110, cy: 38, r: 3 },
              { cx: 65, cy: 14, r: 4.2 },
              { cx: 60, cy: 8, r: 3.2 },
              { cx: 72, cy: 10, r: 3.5 },
              { cx: 60, cy: 60, r: 3.5 },
              { cx: 75, cy: 65, r: 3.2 },
            ].map((f, i) => (
              <g key={i}>
                <circle cx={f.cx} cy={f.cy} r={f.r + 0.5} fill="#EDE6D6" opacity="0.9" />
                <circle cx={f.cx} cy={f.cy} r={f.r} fill="#FFFDF8" />
                <circle cx={f.cx} cy={f.cy} r={f.r * 0.35} fill="#DFCE9F" />
              </g>
            ))}
          </g>
        </svg>
      );

    case 'lavender-sprig':
      return (
        <svg viewBox="0 0 100 180" className={`w-24 h-40 ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="drop-shadow(2px 5px 6px rgba(35,20,15,0.18))">
            {/* Stem */}
            <path d="M50 170 Q 48 110 52 20" stroke="#5E684C" strokeWidth="2.2" strokeLinecap="round" />
            {/* Thin leaves */}
            <path d="M49 140 Q 30 135 25 125" stroke="#687352" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M51 125 Q 70 120 78 110" stroke="#687352" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M50 100 Q 35 95 30 85" stroke="#687352" strokeWidth="1.3" strokeLinecap="round" />

            {/* Lavender buds cluster */}
            {[
              { cx: 50, cy: 22, color: '#8E7C9D' },
              { cx: 46, cy: 30, color: '#9B8AA9' },
              { cx: 54, cy: 32, color: '#7E6B8E' },
              { cx: 44, cy: 40, color: '#9583A5' },
              { cx: 55, cy: 42, color: '#887599' },
              { cx: 43, cy: 52, color: '#7E6B8E' },
              { cx: 56, cy: 53, color: '#A191B0' },
              { cx: 46, cy: 64, color: '#8E7C9D' },
              { cx: 54, cy: 66, color: '#766286' },
              { cx: 45, cy: 76, color: '#9583A5' },
              { cx: 55, cy: 78, color: '#8E7C9D' },
              { cx: 48, cy: 88, color: '#7E6B8E' },
              { cx: 53, cy: 90, color: '#6E5C7F' },
            ].map((bud, i) => (
              <g key={i}>
                <ellipse cx={bud.cx} cy={bud.cy} rx="5" ry="3.5" transform={`rotate(${i % 2 === 0 ? -25 : 25} ${bud.cx} ${bud.cy})`} fill={bud.color} />
                <ellipse cx={bud.cx} cy={bud.cy} rx="3.5" ry="2" transform={`rotate(${i % 2 === 0 ? -25 : 25} ${bud.cx} ${bud.cy})`} fill="#C2B2D1" opacity="0.6" />
              </g>
            ))}
          </g>
        </svg>
      );

    case 'pressed-daisy':
      return (
        <svg viewBox="0 0 130 150" className={`w-32 h-36 ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="drop-shadow(2px 5px 7px rgba(35,25,15,0.18))">
            {/* Pressed curved stem */}
            <path d="M65 140 Q 60 95 62 65" stroke="#71674E" strokeWidth="2" strokeLinecap="round" />
            <path d="M62 105 Q 48 98 42 90" stroke="#786E53" strokeWidth="1.2" strokeLinecap="round" />

            {/* Daisy Petals (flattened vintage look) */}
            <g transform="translate(62, 65)">
              {[0, 24, 48, 72, 96, 120, 144, 168, 192, 216, 240, 264, 288, 312, 336].map((deg, i) => (
                <path
                  key={i}
                  d="M0 0 C -4 -15, -4 -32, 0 -38 C 4 -32, 4 -15, 0 0"
                  transform={`rotate(${deg})`}
                  fill={i % 2 === 0 ? '#FBF6EA' : '#F5ECD7'}
                  stroke="#E8DCBE"
                  strokeWidth="0.5"
                  opacity="0.95"
                />
              ))}
              {/* Textured pressed pollen center */}
              <circle cx="0" cy="0" r="11" fill="#CCA03B" />
              <circle cx="0" cy="0" r="9" fill="#B3862A" opacity="0.7" />
              <circle cx="0" cy="0" r="7" fill="#8C6316" opacity="0.5" />
              {[
                { x: -3, y: -2 }, { x: 2, y: 1 }, { x: -1, y: 3 }, { x: 4, y: -2 }, { x: -4, y: 2 }
              ].map((pt, i) => (
                <circle key={i} cx={pt.x} cy={pt.y} r="1" fill="#E6BA4E" />
              ))}
            </g>
          </g>
        </svg>
      );

    case 'eucalyptus':
      return (
        <svg viewBox="0 0 110 170" className={`w-28 h-40 ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="drop-shadow(2px 4px 6px rgba(35,25,15,0.16))">
            {/* Woody Stem */}
            <path d="M55 160 Q 52 90 55 20" stroke="#6C5B49" strokeWidth="2" strokeLinecap="round" />
            {/* Rounded dusty sage leaves */}
            {[
              { cx: 40, cy: 35, rx: 14, ry: 10, rot: -20, col: '#8BA18B' },
              { cx: 70, cy: 42, rx: 15, ry: 11, rot: 25, col: '#7F967F' },
              { cx: 38, cy: 68, rx: 17, ry: 12, rot: -30, col: '#829983' },
              { cx: 72, cy: 76, rx: 18, ry: 13, rot: 20, col: '#8BA18B' },
              { cx: 36, cy: 105, rx: 19, ry: 14, rot: -25, col: '#788E79' },
              { cx: 74, cy: 115, rx: 19, ry: 14, rot: 30, col: '#829983' },
              { cx: 55, cy: 18, rx: 10, ry: 7, rot: 0, col: '#96AB96' },
            ].map((leaf, i) => (
              <g key={i}>
                <ellipse
                  cx={leaf.cx}
                  cy={leaf.cy}
                  rx={leaf.rx}
                  ry={leaf.ry}
                  transform={`rotate(${leaf.rot} ${leaf.cx} ${leaf.cy})`}
                  fill={leaf.col}
                  stroke="#6F836F"
                  strokeWidth="0.6"
                />
                {/* Subtle leaf midrib vein */}
                <line
                  x1={leaf.cx - leaf.rx * 0.7}
                  y1={leaf.cy}
                  x2={leaf.cx + leaf.rx * 0.7}
                  y2={leaf.cy}
                  transform={`rotate(${leaf.rot} ${leaf.cx} ${leaf.cy})`}
                  stroke="#5F725F"
                  strokeWidth="0.7"
                  opacity="0.6"
                />
              </g>
            ))}
          </g>
        </svg>
      );

    case 'wild-rose':
      return (
        <svg viewBox="0 0 120 160" className={`w-28 h-36 ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="drop-shadow(2px 5px 6px rgba(35,20,15,0.18))">
            {/* Stem with tiny thorn */}
            <path d="M60 150 Q 56 100 58 60" stroke="#605445" strokeWidth="2" strokeLinecap="round" />
            <path d="M57 110 L 51 106" stroke="#605445" strokeWidth="1.5" strokeLinecap="round" />
            {/* Pressed Rosebud Petals */}
            <g transform="translate(58, 50)">
              <path d="M-15 10 C -25 -5, -15 -25, 0 -28 C 15 -25, 25 -5, 15 10 C 5 18, -5 18, -15 10 Z" fill="#C97A84" />
              <path d="M-10 6 C -18 -4, -10 -20, 0 -22 C 10 -20, 18 -4, 10 6 C 4 12, -4 12, -10 6 Z" fill="#B96671" />
              <path d="M-6 2 C -12 -5, -6 -16, 0 -17 C 6 -16, 12 -5, 6 2 C 2 7, -2 7, -6 2 Z" fill="#A8525D" />
              <path d="M-2 -2 C -5 -6, 0 -12, 1 -12 C 4 -12, 6 -6, 2 -2 Z" fill="#8E3C47" />
              {/* Sepals */}
              <path d="M-12 12 Q -18 20 -22 30" stroke="#5C664C" strokeWidth="1.5" fill="none" />
              <path d="M12 12 Q 18 20 22 30" stroke="#5C664C" strokeWidth="1.5" fill="none" />
              <path d="M0 14 Q 0 25 2 32" stroke="#5C664C" strokeWidth="1.5" fill="none" />
            </g>
          </g>
        </svg>
      );

    case 'ginkgo':
      return (
        <svg viewBox="0 0 120 150" className={`w-28 h-36 ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="drop-shadow(2px 5px 6px rgba(45,30,10,0.18))">
            {/* Long thin stalk */}
            <path d="M60 140 Q 58 90 60 50" stroke="#876839" strokeWidth="1.8" strokeLinecap="round" />
            {/* Pressed golden ginkgo fan */}
            <path
              d="M60 50 C 40 46, 20 38, 12 20 C 22 10, 42 6, 56 16 C 58 17, 60 17, 62 16 C 76 6, 96 10, 106 20 C 98 38, 78 46, 60 50 Z"
              fill="#D6A74B"
              stroke="#B3862A"
              strokeWidth="0.8"
            />
            {/* Fan vein striations */}
            {[20, 32, 45, 55, 65, 75, 88, 100].map((x, i) => (
              <path
                key={i}
                d={`M60 50 Q ${50 + (x - 60) * 0.7} 32 ${x} ${20 + Math.abs(x - 60) * 0.15}`}
                stroke="#C19339"
                strokeWidth="0.5"
                opacity="0.75"
              />
            ))}
          </g>
        </svg>
      );

    default:
      return null;
  }
};

interface FloralPinProps {
  pinStyle: PinStyle;
  position: 'top-left' | 'top-right' | 'bottom-right';
}

export const FloralPinAttachment: React.FC<FloralPinProps> = ({ pinStyle, position }) => {
  if (pinStyle === 'none') return null;

  const isLeft = position === 'top-left';

  if (pinStyle === 'brass-clip') {
    return (
      <div
        className={`absolute z-20 pointer-events-none ${
          isLeft ? 'top-2 left-6 rotate-[-12deg]' : 'top-2 right-6 rotate-[12deg]'
        }`}
      >
        <svg width="22" height="48" viewBox="0 0 22 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <filter id="clip-shadow" x="-4" y="-2" width="30" height="54" filterUnits="userSpaceOnUse">
            <feDropShadow dx="1" dy="2" stdDeviation="1.5" floodColor="#2a1f10" floodOpacity="0.4" />
          </filter>
          <path
            d="M5 14 V 38 C 5 42, 17 42, 17 38 V 8 C 17 4, 9 4, 9 8 V 34 C 9 36, 13 36, 13 34 V 14"
            stroke="url(#brass-grad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#clip-shadow)"
          />
          <defs>
            <linearGradient id="brass-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D4AF37" />
              <stop offset="40%" stopColor="#F3E5AB" />
              <stop offset="70%" stopColor="#AA7A1E" />
              <stop offset="100%" stopColor="#875F17" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  }

  if (pinStyle === 'washi-tape') {
    return (
      <div
        className={`absolute z-20 pointer-events-none w-20 h-6 washi-tape-strip ${
          isLeft ? 'top-5 left-4 -rotate-12' : 'top-5 right-4 rotate-12'
        }`}
        style={{
          backgroundColor: 'rgba(235, 222, 200, 0.88)',
          boxShadow: '0 2px 4px rgba(45,30,10,0.12)',
        }}
      >
        <div className="w-full h-full flex items-center justify-around opacity-40">
          <div className="w-1.5 h-1.5 rounded-full bg-[#B2997C]" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#B2997C]" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#B2997C]" />
        </div>
      </div>
    );
  }

  if (pinStyle === 'twine-tie') {
    return (
      <div
        className={`absolute z-20 pointer-events-none ${
          isLeft ? 'top-4 left-6 -rotate-6' : 'top-4 right-6 rotate-6'
        }`}
      >
        <svg width="34" height="28" viewBox="0 0 34 28" fill="none">
          <path d="M17 12 C 10 4, 2 6, 6 16 C 9 20, 16 14, 17 12" stroke="#9E8563" strokeWidth="2" strokeLinecap="round" />
          <path d="M17 12 C 24 4, 32 6, 28 16 C 25 20, 18 14, 17 12" stroke="#9E8563" strokeWidth="2" strokeLinecap="round" />
          <circle cx="17" cy="13" r="3" fill="#886F4E" />
          <path d="M16 15 Q 12 25 8 26" stroke="#9E8563" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M18 15 Q 22 24 26 25" stroke="#9E8563" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </div>
    );
  }

  return null;
};
