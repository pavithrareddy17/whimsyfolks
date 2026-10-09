import React from 'react';
import { LetterData, PlacedSticker } from '../types/stationery';
import { WhimsicalSticker } from './WhimsicalAssets';
import { DraggableSticker } from './DraggableSticker';

interface LetterPaperProps {
  letter: LetterData;
  isEditable?: boolean;
  onUpdate?: (updates: Partial<LetterData>) => void;
  onUpdateStickerPosition?: (id: string, x: number, y: number) => void;
  onRemoveSticker?: (id: string) => void;
  innerRef?: React.RefObject<HTMLDivElement | null>;
  className?: string;
}

export const FONT_MAP: Record<string, string> = {
  playfair: "'Playfair Display', serif",
  caveat: "'Caveat', cursive",
  cedarville: "'Cedarville Cursive', cursive",
  courier: "'Courier Prime', monospace",
  garamond: "'EB Garamond', serif",
  homemade: "'Homemade Apple', cursive",
  'alex-brush': "'Alex Brush', cursive",
};

export const INK_COLORS: Record<string, string> = {
  sepia: '#4A3B32',
  espresso: '#281F1A',
  charcoal: '#242424',
  crimson: '#A61C2B',
  'dried-rose': '#7A3F49',
  forest: '#2A4533',
  indigo: '#24354A',
};

export const LetterPaper: React.FC<LetterPaperProps> = ({
  letter,
  isEditable = false,
  onUpdate,
  onUpdateStickerPosition,
  onRemoveSticker,
  innerRef,
  className = '',
}) => {
  const fontStyle = FONT_MAP[letter.fontChoice] || FONT_MAP.cedarville;
  const inkColor = INK_COLORS[letter.inkColor] || INK_COLORS.sepia;

  // Render Paper Base Container classes
  const getPaperClasses = () => {
    switch (letter.paperStyle) {
      case 'plain-ivory':
        return 'bg-[#FFFDF9] border border-[#E2D8C7]';
      case 'scalloped-linen':
        // Image 3: Cream card with crimson scalloped border
        return 'bg-[#FFFDF8] border-2 border-[#A81C2B]';
      case 'lace-doily':
        // Image 4: Vintage cream lace framed card
        return 'bg-[#FAF6EC] border border-[#DDD0BC] shadow-xl';
      case 'folk-botanical':
        // Image 1: Folk art frame
        return 'bg-[#FAF5EB] border-2 border-[#8A6D3B]';
      case 'candy-stripe-card':
        // Image 2: Candy stripe border
        return 'bg-[#FFFDF9] border-t-8 border-b-8 border-[#D94B5A]';
      case 'vintage-parchment':
        return 'bg-parchment-texture border-[#E0D2BD]';
      case 'lined-notebook':
        return 'bg-lined-paper border-[#E5DECD]';
      case 'cotton-deckle':
      default:
        return 'bg-cotton-paper border-[#EFE8DA]';
    }
  };

  const getPositionClasses = (pos: PlacedSticker['position']) => {
    switch (pos) {
      case 'top-left':
        return 'top-4 left-4';
      case 'top-right':
        return 'top-4 right-4';
      case 'bottom-left':
        return 'bottom-4 left-4';
      case 'bottom-right':
        return 'bottom-4 right-4';
      case 'center-top':
        return 'top-2 inset-x-0 mx-auto flex justify-center';
      default:
        return 'top-4 right-4';
    }
  };

  return (
    <div
      ref={innerRef}
      id="printable-letter-paper"
      className={`relative w-full max-w-[620px] min-h-[720px] p-8 sm:p-14 mx-auto rounded-md shadow-2xl transition-all duration-300 select-text overflow-hidden ${getPaperClasses()} ${className}`}
      style={{
        color: inkColor,
        fontFamily: fontStyle,
        boxShadow:
          '0 2px 4px rgba(45, 30, 15, 0.04), 0 12px 28px -4px rgba(50, 35, 20, 0.12), 0 30px 60px -15px rgba(40, 25, 10, 0.15)',
      }}
    >
      {/* SCALLOPED EMBROIDERED HEM (Image 3) */}
      {letter.paperStyle === 'scalloped-linen' && (
        <div className="absolute inset-2 pointer-events-none border border-dashed border-[#A81C2B]/60 rounded-xs" />
      )}

      {/* VINTAGE LACE DOILY BORDER (Image 4) */}
      {letter.paperStyle === 'lace-doily' && (
        <div className="absolute inset-3 pointer-events-none border-4 border-dotted border-[#D5C6AF] rounded-sm opacity-70">
          <div className="absolute -top-1 left-2 text-[#A81C2B] text-lg">❦</div>
          <div className="absolute -top-1 right-2 text-[#A81C2B] text-lg">❦</div>
          <div className="absolute -bottom-1 left-2 text-[#A81C2B] text-lg">❦</div>
          <div className="absolute -bottom-1 right-2 text-[#A81C2B] text-lg">❦</div>
        </div>
      )}

      {/* FOLK ART FLORAL TOP/BOTTOM BORDER (Image 1) */}
      {letter.paperStyle === 'folk-botanical' && (
        <div className="absolute inset-x-0 top-0 py-1.5 bg-[#F2E5CE] border-b border-[#8A6D3B] flex items-center justify-center gap-3 text-xs text-[#8A6D3B]">
          <span>🌸</span>
          <span className="font-serif tracking-widest text-[10px] uppercase font-bold text-[#8F2424]">
            BILLET-DOUX · SOUVENIR
          </span>
          <span>🌸</span>
        </div>
      )}

      {/* PLACED WHIMSICAL STICKERS (Freely Movable on Card) */}
      {letter.stickers &&
        letter.stickers
          .filter((s) => s.target === 'card' || !s.target)
          .map((stk) => (
            <DraggableSticker
              key={stk.id}
              sticker={stk}
              isInteractive={isEditable}
              onUpdatePosition={onUpdateStickerPosition}
              onRemove={onRemoveSticker}
            />
          ))}

      {/* MAIN LETTER CONTENT */}
      <div className={`relative z-1 space-y-6 ${letter.paperStyle === 'folk-botanical' ? 'pt-6' : ''}`}>
        {/* Date / Location Header */}
        <div className="flex justify-end text-sm sm:text-base opacity-80 italic tracking-wide">
          {isEditable ? (
            <input
              type="text"
              value={letter.dateHeading}
              onChange={(e) => onUpdate?.({ dateHeading: e.target.value })}
              placeholder="e.g. A bright Saturday morning"
              className="w-full text-right bg-transparent border-b border-transparent hover:border-[#D5C6AF] focus:border-[#A89478] focus:outline-none py-0.5 px-1 font-inherit"
            />
          ) : (
            <span>{letter.dateHeading}</span>
          )}
        </div>

        {/* Salutation */}
        <div className="text-xl sm:text-2xl font-medium tracking-wide">
          {isEditable ? (
            <input
              type="text"
              value={letter.salutation}
              onChange={(e) => onUpdate?.({ salutation: e.target.value })}
              placeholder="e.g. Dearest Friend,"
              className="w-full bg-transparent border-b border-transparent hover:border-[#D5C6AF] focus:border-[#A89478] focus:outline-none py-0.5 px-1 font-inherit text-xl sm:text-2xl font-medium"
            />
          ) : (
            <h2>{letter.salutation}</h2>
          )}
        </div>

        {/* Title / Heading */}
        {letter.title && (
          <div
            className={`text-lg sm:text-xl font-semibold opacity-90 ${
              letter.textAlign === 'center' ? 'text-center' : ''
            }`}
          >
            {isEditable ? (
              <input
                type="text"
                value={letter.title}
                onChange={(e) => onUpdate?.({ title: e.target.value })}
                placeholder="Optional letter title or subject..."
                className={`w-full bg-transparent border-b border-transparent hover:border-[#D5C6AF] focus:border-[#A89478] focus:outline-none py-0.5 px-1 font-inherit text-lg sm:text-xl font-semibold ${
                  letter.textAlign === 'center' ? 'text-center' : ''
                }`}
              />
            ) : (
              <h3>{letter.title}</h3>
            )}
          </div>
        )}

        {/* Body Paragraphs */}
        <div
          className={`leading-relaxed sm:leading-loose text-base sm:text-lg whitespace-pre-wrap ${
            letter.textAlign === 'center'
              ? 'text-center'
              : letter.textAlign === 'justify'
              ? 'text-justify'
              : 'text-left'
          }`}
        >
          {isEditable ? (
            <textarea
              value={letter.body}
              onChange={(e) => onUpdate?.({ body: e.target.value })}
              rows={11}
              placeholder="Write your letter thoughts here..."
              className="w-full bg-transparent border border-transparent hover:border-[#E0D3BF] focus:border-[#A89478] focus:outline-none p-2 rounded-sm resize-y leading-relaxed sm:leading-loose font-inherit text-base sm:text-lg"
            />
          ) : (
            <div className="space-y-4">
              {letter.body.split('\n\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          )}
        </div>

        {/* Sign-off & Sender */}
        <div className="pt-4 flex flex-col items-end space-y-1">
          <div className="text-base sm:text-lg italic opacity-90">
            {isEditable ? (
              <input
                type="text"
                value={letter.signoff}
                onChange={(e) => onUpdate?.({ signoff: e.target.value })}
                placeholder="Sign-off, e.g. Warmly and eagerly,"
                className="text-right bg-transparent border-b border-transparent hover:border-[#D5C6AF] focus:border-[#A89478] focus:outline-none py-0.5 px-1 font-inherit text-base sm:text-lg italic"
              />
            ) : (
              <span>{letter.signoff}</span>
            )}
          </div>
          <div className="text-xl sm:text-2xl font-semibold">
            {isEditable ? (
              <input
                type="text"
                value={letter.senderName}
                onChange={(e) => onUpdate?.({ senderName: e.target.value })}
                placeholder="Your name"
                className="text-right bg-transparent border-b border-transparent hover:border-[#D5C6AF] focus:border-[#A89478] focus:outline-none py-0.5 px-1 font-inherit text-xl sm:text-2xl font-semibold"
              />
            ) : (
              <span>{letter.senderName}</span>
            )}
          </div>
        </div>

        {/* Postscript (P.S.) */}
        {(letter.postscript || isEditable) && (
          <div className="pt-4 border-t border-[#E5DAC6]/70 text-sm sm:text-base italic opacity-85">
            {isEditable ? (
              <div className="flex items-start gap-1">
                <span className="font-semibold text-xs uppercase tracking-wider py-1">P.S.</span>
                <input
                  type="text"
                  value={letter.postscript}
                  onChange={(e) => onUpdate?.({ postscript: e.target.value })}
                  placeholder="Postscript whisper..."
                  className="w-full bg-transparent border-b border-transparent hover:border-[#D5C6AF] focus:border-[#A89478] focus:outline-none py-0.5 px-1 font-inherit text-sm sm:text-base italic"
                />
              </div>
            ) : (
              letter.postscript && <p>{letter.postscript}</p>
            )}
          </div>
        )}
      </div>

      {/* Bottom Subtle Watermark */}
      <div className="mt-8 pt-4 flex justify-center items-center opacity-30 pointer-events-none">
        <div className="w-12 h-px bg-current" />
        <span className="mx-3 text-[10px] tracking-widest uppercase">❦</span>
        <div className="w-12 h-px bg-current" />
      </div>
    </div>
  );
};
