import React, { useState } from 'react';
import { LetterData } from '../types/stationery';
import { sounds } from '../utils/soundEffects';
import { ExportModal } from './ExportModal';
import { UnfoldingAnimation } from './UnfoldingAnimation';

interface RecipientViewProps {
  letter: LetterData;
  onComposeReply?: () => void;
  onExitToStudio?: () => void;
}

export const RecipientView: React.FC<RecipientViewProps> = ({
  letter,
  onComposeReply,
  onExitToStudio,
}) => {
  const [currentStage, setCurrentStage] = useState<'sealed' | 'unsealing' | 'sliding' | 'open'>('sealed');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showExportModal, setShowExportModal] = useState(false);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sounds.enabled = next;
  };

  return (
    <div className="min-h-screen bg-[#F4EFE6] text-[#3D3226] relative overflow-x-hidden flex flex-col justify-between">
      {/* Background Subtle Desk Atmosphere */}
      <div
        className="fixed inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 15%, rgba(255,255,255,0.7) 0%, transparent 60%), radial-gradient(circle at 10% 90%, rgba(195,170,140,0.15) 0%, transparent 50%)',
        }}
      />

      {/* Top Atmospheric Header */}
      <header className="relative z-20 px-6 py-4 flex items-center justify-between border-b border-[#E2D6C5]/70 bg-[#FAF7F0]/80 backdrop-blur-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#E5D5C0] flex items-center justify-center text-sm shadow-xs border border-[#D5C6AF]">
            🌸
          </div>
          <div>
            <h1 className="font-serif text-base sm:text-lg font-bold text-[#2E2419]">
              Whimsifolks · Handcrafted Dispatch
            </h1>
            <p className="text-[11px] text-[#7A6A56] font-serif italic">
              {letter.senderName ? `A letter from ${letter.senderName}` : 'A sealed personal letter'}
            </p>
          </div>
        </div>

        {/* Right Tools: Sound FX toggle & Exit button */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={toggleSound}
            className={`p-2 rounded-md border text-xs flex items-center gap-1.5 transition-colors cursor-pointer ${
              soundEnabled
                ? 'bg-[#EAE0D0] border-[#D5C6AF] text-[#3D3226]'
                : 'bg-transparent border-[#DDD0BC] text-[#8C7B68]'
            }`}
            title={soundEnabled ? 'Stationery sound effects enabled' : 'Sound effects muted'}
          >
            <span>{soundEnabled ? '🔔 Sound On' : '🔕 Muted'}</span>
          </button>

          {currentStage === 'open' && (
            <button
              type="button"
              onClick={() => setShowExportModal(true)}
              className="px-3 py-1.5 text-xs font-serif font-medium bg-[#EAE0D0] hover:bg-[#E0D4C2] border border-[#D5C6AF] rounded-md transition-colors text-[#3D3226] cursor-pointer"
            >
              Save Keepsake
            </button>
          )}

          {onComposeReply && (
            <button
              type="button"
              onClick={onComposeReply}
              className="px-3.5 py-1.5 text-xs font-serif font-medium bg-[#8F3F35] hover:bg-[#7D3229] text-[#FAF5EB] rounded-md shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>Write a Reply</span>
            </button>
          )}

          {onExitToStudio && (
            <button
              type="button"
              onClick={onExitToStudio}
              className="px-3 py-1.5 text-xs font-serif text-[#7A6A56] hover:text-[#3D3226] rounded-md transition-colors cursor-pointer"
            >
              Customizer Studio →
            </button>
          )}
        </div>
      </header>

      {/* Main Recipient Content Arena */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-2xl flex flex-col items-center">
          {/* Greeting when sealed */}
          {currentStage === 'sealed' && (
            <div className="text-center mb-4 animate-fade-in">
              <span className="text-xs uppercase tracking-widest text-[#8C765C] font-semibold font-serif">
                Special Delivery
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#2E2419] mt-0.5">
                For {letter.recipientName || 'You'}
              </h2>
            </div>
          )}

          {/* Interactive Unfolding Ceremony with Letter Sliding Out */}
          <UnfoldingAnimation
            letter={letter}
            initialState="sealed"
            onStageChange={(st) => setCurrentStage(st)}
          />

          {/* Reply invitation card when letter is open */}
          {currentStage === 'open' && onComposeReply && (
            <div className="mt-8 p-6 rounded-lg bg-[#FAF7F0] border border-[#D8CABE] text-center max-w-md shadow-md animate-fade-in">
              <span className="text-2xl block mb-2">🕊</span>
              <h3 className="font-serif text-lg font-medium text-[#2E2419]">
                Send a Handwritten Reply
              </h3>
              <p className="text-xs text-[#7A6A56] font-serif italic mt-1 mb-4">
                Reply to {letter.senderName || 'your friend'} with your own customized vintage stationery, wax seal, and stickers.
              </p>
              <button
                type="button"
                onClick={onComposeReply}
                className="px-5 py-2 rounded-md bg-[#4B6E50] hover:bg-[#3E5C42] text-[#FAF5EB] font-serif text-xs font-medium transition-colors shadow-xs cursor-pointer"
              >
                Draft Your Reply Letter
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Atmospheric Footer */}
      <footer className="relative z-10 py-4 text-center text-xs font-serif text-[#8C7B68] border-t border-[#E2D6C5]/60 bg-[#FAF7F0]/40">
        <p>Whimsifolks · Whimsical Handcrafted Stationery Experience</p>
      </footer>

      {/* Export / Share Modal */}
      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        letter={letter}
      />
    </div>
  );
};
