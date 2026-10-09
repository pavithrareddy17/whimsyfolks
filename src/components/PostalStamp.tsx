import React from 'react';

export type StampDesignId =
  | 'plain'
  | 'botanical'
  | 'butterfly'
  | 'birthday-cake'
  | 'golden-star'
  | 'airmail'
  | 'cottage';

interface PostalStampProps {
  design: StampDesignId;
  dateText?: string;
  locationText?: string;
  className?: string;
  showPostmark?: boolean;
}

export const PostalStamp: React.FC<PostalStampProps> = ({
  design = 'botanical',
  dateText = 'OCT 1924',
  locationText = 'VAL-DE-GRÂCE',
  className = '',
  showPostmark = true,
}) => {
  return (
    <div className={`relative inline-block select-none ${className}`}>
      {/* Postal Stamp Body with Perforated Edge */}
      <div
        className="relative w-20 sm:w-22 h-26 sm:h-28 bg-[#F6EFE2] p-1.5 shadow-md transform rotate-1 hover:rotate-0 transition-transform duration-300"
        style={{
          boxShadow: '0 3px 8px rgba(50, 35, 20, 0.16)',
          clipPath:
            'polygon(0% 4px, 2px 4px, 2px 0%, 6px 0%, 6px 4px, 10px 4px, 10px 0%, 14px 0%, 14px 4px, 18px 4px, 18px 0%, 22px 0%, 22px 4px, 26px 4px, 26px 0%, 30px 0%, 30px 4px, 34px 4px, 34px 0%, 38px 0%, 38px 4px, 42px 4px, 42px 0%, 46px 0%, 46px 4px, 50px 4px, 50px 0%, 54px 0%, 54px 4px, 58px 4px, 58px 0%, 62px 0%, 62px 4px, 66px 4px, 66px 0%, 70px 0%, 70px 4px, 74px 4px, 74px 0%, 78px 0%, 78px 4px, 82px 4px, 82px 0%, 86px 0%, 86px 4px, 90px 4px, 90px 0%, 94px 4px, 94px 0%, 100% 4px, 100% 8px, 96px 8px, 96px 12px, 100% 12px, 100% 16px, 96px 16px, 96px 20px, 100% 20px, 100% 24px, 96px 24px, 96px 28px, 100% 28px, 100% 32px, 96px 32px, 96px 36px, 100% 36px, 100% 40px, 96px 40px, 96px 44px, 100% 44px, 100% 48px, 96px 48px, 96px 52px, 100% 52px, 100% 56px, 96px 56px, 96px 60px, 100% 60px, 100% 64px, 96px 64px, 96px 68px, 100% 68px, 100% 72px, 96px 72px, 96px 76px, 100% 76px, 100% 80px, 96px 80px, 96px 84px, 100% 84px, 100% 88px, 96px 88px, 96px 92px, 100% 92px, 100% 96px, 96px 96px, 96px 100px, 100% 100px, 100% 104px, 96px 104px, 96px 108px, 100% 108px, 100% 112px, 96px 112px, 96px 116px, 100% 116px, 100% 120px, 96px 120px, 96px 124px, 100% 124px, 100% 128px, 94px 128px, 94px 124px, 90px 124px, 90px 128px, 86px 128px, 86px 124px, 82px 124px, 82px 128px, 78px 128px, 78px 124px, 74px 124px, 74px 128px, 70px 128px, 70px 124px, 66px 124px, 66px 128px, 62px 128px, 62px 124px, 58px 124px, 58px 128px, 54px 128px, 54px 124px, 50px 124px, 50px 128px, 46px 128px, 46px 124px, 42px 124px, 42px 128px, 38px 128px, 38px 124px, 34px 124px, 34px 128px, 30px 128px, 30px 124px, 26px 124px, 26px 128px, 22px 128px, 22px 124px, 18px 124px, 18px 128px, 14px 128px, 14px 124px, 10px 124px, 10px 128px, 6px 128px, 6px 124px, 2px 124px, 2px 128px, 0% 128px, 0% 124px, 4px 124px, 4px 120px, 0% 120px, 0% 116px, 4px 116px, 4px 112px, 0% 112px, 0% 108px, 4px 108px, 4px 104px, 0% 104px, 0% 100px, 4px 100px, 4px 96px, 0% 96px, 0% 92px, 4px 92px, 4px 88px, 0% 88px, 0% 84px, 4px 84px, 4px 80px, 0% 80px, 0% 76px, 4px 76px, 4px 72px, 0% 72px, 0% 68px, 4px 68px, 4px 64px, 0% 64px, 0% 60px, 4px 60px, 4px 56px, 0% 56px, 0% 52px, 4px 52px, 4px 48px, 0% 48px, 0% 44px, 4px 44px, 4px 40px, 0% 40px, 0% 36px, 4px 36px, 4px 32px, 0% 32px, 0% 28px, 4px 28px, 4px 24px, 0% 24px, 0% 20px, 4px 20px, 4px 16px, 0% 16px, 0% 12px, 4px 12px, 4px 8px, 0% 8px)',
        }}
      >
        <div className="w-full h-full border border-[#8C7A65] p-1 flex flex-col justify-between bg-[#EFE4D3]">
          {/* Header */}
          <div className="flex justify-between items-center text-[6.5px] font-serif tracking-widest text-[#5C4D3D] uppercase border-b border-[#C3B29D] pb-0.5">
            <span>POSTAGE</span>
            <span className="font-bold">12¢</span>
          </div>

          {/* Stamp Center Vignette */}
          <div className="flex-1 my-0.5 border border-[#D5C6B1] bg-[#F9F5EC] flex items-center justify-center p-1 overflow-hidden">
            {/* PLAIN STAMP OPTION */}
            {design === 'plain' && (
              <div className="w-full h-full flex flex-col items-center justify-center border border-dashed border-[#B8A48B]/60 p-1">
                <span className="font-serif text-[8px] tracking-widest text-[#6E5C47] uppercase font-bold">12¢</span>
                <span className="font-mono text-[5.5px] text-[#8C765C] tracking-wide mt-0.5">STANDARD</span>
              </div>
            )}

            {/* BOTANICAL WILDFLOWER */}
            {design === 'botanical' && (
              <svg viewBox="0 0 40 50" className="w-7 h-9 text-[#4F634B]">
                <path d="M20 45 C 20 30, 18 15, 20 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M19 32 Q 10 28 8 20" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                <path d="M21 24 Q 30 20 32 14" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                <circle cx="20" cy="5" r="3" fill="#B35D67" />
                <circle cx="7" cy="18" r="2" fill="#C97883" />
                <circle cx="33" cy="13" r="2" fill="#C97883" />
              </svg>
            )}

            {/* BUTTERFLY */}
            {design === 'butterfly' && (
              <svg viewBox="0 0 50 40" className="w-8 h-7 text-[#8C5D38]">
                <path d="M25 20 C 23 8, 8 4, 4 14 C 0 24, 15 28, 25 20 Z" fill="#D49A6A" stroke="currentColor" strokeWidth="1" />
                <path d="M25 20 C 27 8, 42 4, 46 14 C 50 24, 35 28, 25 20 Z" fill="#D49A6A" stroke="currentColor" strokeWidth="1" />
                <line x1="25" y1="10" x2="25" y2="30" stroke="#3D2918" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}

            {/* BIRTHDAY CAKE MINIATURE */}
            {design === 'birthday-cake' && (
              <svg viewBox="0 0 40 40" className="w-7 h-7 text-[#A32230]">
                <ellipse cx="20" cy="30" rx="14" ry="5" fill="#E8D7C4" stroke="currentColor" strokeWidth="1" />
                <rect x="8" y="20" width="24" height="10" fill="#FAF5EB" stroke="currentColor" strokeWidth="1" />
                <rect x="12" y="14" width="16" height="7" fill="#FAF5EB" stroke="currentColor" strokeWidth="1" />
                <line x1="20" y1="14" x2="20" y2="9" stroke="#7A1822" strokeWidth="1.2" />
                <circle cx="20" cy="7" r="1.5" fill="#E65A28" />
              </svg>
            )}

            {/* GOLDEN STAR */}
            {design === 'golden-star' && (
              <svg viewBox="0 0 40 40" className="w-7 h-7 text-[#B38328]">
                <polygon points="20,4 24,15 36,16 27,24 30,36 20,29 10,36 13,24 4,16 16,15" fill="#D4A73B" stroke="currentColor" strokeWidth="1" />
              </svg>
            )}

            {/* AIRMAIL */}
            {design === 'airmail' && (
              <svg viewBox="0 0 50 35" className="w-8 h-6 text-[#324D67]">
                <path d="M5 25 L 25 15 L 45 25" stroke="currentColor" strokeWidth="1.5" fill="none" />
                <path d="M25 6 L 25 28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            )}

            {/* COTTAGE */}
            {design === 'cottage' && (
              <svg viewBox="0 0 45 40" className="w-7 h-7 text-[#5C4533]">
                <path d="M10 22 L 22 10 L 35 22 V 34 H 10 Z" fill="#D9C5AB" stroke="currentColor" strokeWidth="1" />
              </svg>
            )}
          </div>

          {/* Footer */}
          <div className="text-[5.5px] font-serif text-center tracking-wider text-[#63513F] uppercase border-t border-[#C3B29D] pt-0.5">
            AIR MAIL
          </div>
        </div>
      </div>

      {/* Postmark Ink Cancellation Overlay */}
      {showPostmark && (
        <div className="absolute -left-7 -bottom-3 w-24 h-16 pointer-events-none opacity-60 rotate-[-6deg]">
          <svg viewBox="0 0 140 70" className="w-full h-full text-[#2B231D]">
            <circle cx="36" cy="35" r="26" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.85" />
            <text x="36" y="32" fontSize="6" fontFamily="'Courier Prime', monospace" fontWeight="bold" textAnchor="middle" fill="currentColor">
              {locationText}
            </text>
            <text x="36" y="42" fontSize="5.5" fontFamily="'Courier Prime', monospace" textAnchor="middle" fill="currentColor">
              {dateText}
            </text>
            <path d="M68 24 Q 80 20 92 24 T 116 24 T 136 24" fill="none" stroke="currentColor" strokeWidth="1.2" />
            <path d="M68 32 Q 80 28 92 32 T 116 32 T 136 32" fill="none" stroke="currentColor" strokeWidth="1.2" />
            <path d="M68 40 Q 80 36 92 40 T 116 40 T 136 40" fill="none" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </div>
      )}
    </div>
  );
};
