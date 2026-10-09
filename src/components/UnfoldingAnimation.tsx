import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { LetterData } from '../types/stationery';
import { EnvelopeView } from './EnvelopeView';
import { LetterPaper } from './LetterPaper';
import { sounds } from '../utils/soundEffects';

interface UnfoldingAnimationProps {
  letter: LetterData;
  onFinishedUnfold?: () => void;
  onFinishedFold?: () => void;
  onStageChange?: (stage: 'sealed' | 'unsealing' | 'sliding' | 'open') => void;
  initialState?: 'sealed' | 'open';
}

export const UnfoldingAnimation: React.FC<UnfoldingAnimationProps> = ({
  letter,
  onFinishedUnfold,
  onFinishedFold,
  onStageChange,
  initialState = 'sealed',
}) => {
  // 'sealed' -> 'unsealing' -> 'sliding' -> 'open'
  const [stage, setStage] = useState<'sealed' | 'unsealing' | 'sliding' | 'open'>(
    initialState === 'open' ? 'open' : 'sealed'
  );
  const [isFront, setIsFront] = useState(false);

  const updateStage = (next: 'sealed' | 'unsealing' | 'sliding' | 'open') => {
    setStage(next);
    onStageChange?.(next);
  };

  // Soft petal confetti celebration
  const triggerPetalBurst = () => {
    try {
      confetti({
        particleCount: 28,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#D28E95', '#F5E6CC', '#B5C8B4', '#D4AF37', '#EDE4D4'],
        shapes: ['circle'],
        scalar: 0.8,
        ticks: 120,
        gravity: 0.7,
      });
    } catch {
      // Ignore if canvas unavailable
    }
  };

  const handleBreakSeal = () => {
    if (stage !== 'sealed') return;

    sounds.playWaxCrack();
    triggerPetalBurst();
    updateStage('unsealing');

    // Flap opens, then paper slides out
    setTimeout(() => {
      sounds.playPaperRustle();
      updateStage('sliding');
    }, 600);

    // After sliding and unfolding
    setTimeout(() => {
      updateStage('open');
      onFinishedUnfold?.();
    }, 1400);
  };

  const handleFoldBack = () => {
    sounds.playPaperRustle();
    updateStage('sliding');

    setTimeout(() => {
      updateStage('unsealing');
      sounds.playStampThud();
    }, 600);

    setTimeout(() => {
      updateStage('sealed');
      onFinishedFold?.();
    }, 1200);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[550px] relative py-8 overflow-hidden">
      <AnimatePresence mode="wait">
        {/* STAGE 1: SEALED ENVELOPE */}
        {stage === 'sealed' && (
          <motion.div
            key="envelope-sealed"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0.9, scale: 0.98 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center"
          >
            <EnvelopeView
              letter={letter}
              isFront={isFront}
              isOpen={false}
              onBreakSeal={handleBreakSeal}
              onFlip={() => setIsFront(!isFront)}
              interactiveSeal={true}
            />
          </motion.div>
        )}

        {/* STAGE 2: UNSEALING & SLIDING OUT ANIMATION */}
        {(stage === 'unsealing' || stage === 'sliding') && (
          <motion.div
            key="envelope-animating"
            className="relative flex flex-col items-center"
          >
            {/* Base Envelope */}
            <EnvelopeView
              letter={letter}
              isFront={false}
              isOpen={true}
              interactiveSeal={false}
            />

            {/* Letter Paper Sliding Out of the Envelope */}
            <motion.div
              initial={{ y: 0, opacity: 0.85, scale: 0.7 }}
              animate={
                stage === 'sliding'
                  ? { y: -220, opacity: 1, scale: 0.9 }
                  : { y: -40, opacity: 0.9, scale: 0.75 }
              }
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-10 pointer-events-none z-30"
              style={{
                width: '460px',
                transformOrigin: 'bottom center',
              }}
            >
              <div
                className={`p-6 rounded-sm shadow-2xl border ${
                  letter.paperStyle === 'scalloped-linen'
                    ? 'bg-[#FFFDF8] border-2 border-[#A81C2B]'
                    : letter.paperStyle === 'lace-doily'
                    ? 'bg-[#FAF6EC] border border-[#DDD0BC]'
                    : letter.paperStyle === 'candy-stripe-card'
                    ? 'bg-[#FFFDF9] border-t-4 border-[#D94B5A]'
                    : 'bg-[#FAF7F0] border border-[#E0D2BD]'
                }`}
              >
                <div className="font-serif text-sm font-bold text-[#3D3226] mb-1">
                  {letter.salutation || 'Dear Friend,'}
                </div>
                <div className="font-serif text-xs italic text-[#7A6A56] mb-3 truncate">
                  {letter.title || 'A handwritten dispatch'}
                </div>
                <div className="space-y-1.5 opacity-60">
                  <div className="h-1.5 w-full bg-[#8C7B68]/30 rounded-full" />
                  <div className="h-1.5 w-5/6 bg-[#8C7B68]/30 rounded-full" />
                  <div className="h-1.5 w-4/6 bg-[#8C7B68]/30 rounded-full" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* STAGE 3: FULL UNFOLDED LETTER */}
        {stage === 'open' && (
          <motion.div
            key="letter-open"
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="w-full flex flex-col items-center"
          >
            {/* Quick action ribbon to fold back */}
            <div className="mb-4 flex items-center gap-3">
              <button
                type="button"
                onClick={handleFoldBack}
                className="px-3.5 py-1.5 text-xs font-serif font-medium text-[#4A3B32] bg-[#FAF5EB] hover:bg-[#EFE8DC] rounded-md border border-[#D5C6AF] shadow-xs transition-colors flex items-center gap-1.5"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 8v13H3V8" />
                  <path d="M1 3h22v5H1z" />
                  <path d="M10 12h4" />
                </svg>
                Fold Back into Envelope
              </button>
            </div>

            {/* Letter Paper Render */}
            <LetterPaper letter={letter} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
