/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { LetterData } from './types/stationery';
import { DEFAULT_LETTER } from './utils/presets';
import {
  decodeLetterFromHash,
  loadCurrentDraft,
  saveLetterToStorage,
} from './utils/serialization';
import { sounds } from './utils/soundEffects';
import { LetterPaper } from './components/LetterPaper';
import { EnvelopeView } from './components/EnvelopeView';
import { UnfoldingAnimation } from './components/UnfoldingAnimation';
import { GuidedCraftingStudio } from './components/GuidedCraftingStudio';
import { ExportModal } from './components/ExportModal';
import { RecipientView } from './components/RecipientView';
import { StationeryBoxModal } from './components/StationeryBoxModal';

export default function App() {
  const [letter, setLetter] = useState<LetterData>(DEFAULT_LETTER);
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [isRecipientSharedView, setIsRecipientSharedView] = useState(false);

  // Clean front/back view toggle for Envelope step
  const [envelopeViewSide, setEnvelopeViewSide] = useState<'back' | 'front'>('back');

  // Modals & Sound
  const [showExportModal, setShowExportModal] = useState(false);
  const [showBoxModal, setShowBoxModal] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Initialize from URL hash, query param, or localStorage
  useEffect(() => {
    const handleHash = () => {
      // Check query parameter ?letter=
      try {
        const params = new URLSearchParams(window.location.search);
        const queryEncoded = params.get('letter');
        if (queryEncoded) {
          const decoded = decodeLetterFromHash(queryEncoded);
          if (decoded) {
            setLetter(decoded);
            setIsRecipientSharedView(true);
            return;
          }
        }
      } catch {
        // ignore
      }

      // Check URL hash #letter=
      const hash = window.location.hash;
      if (hash.startsWith('#letter=')) {
        const encoded = hash.slice('#letter='.length);
        const decoded = decodeLetterFromHash(encoded);
        if (decoded) {
          setLetter(decoded);
          setIsRecipientSharedView(true);
          return;
        }
      }

      // If no shared hash, load last saved draft
      const draft = loadCurrentDraft();
      setLetter(draft);
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Update letter helper and auto-save
  const handleUpdateLetter = (updates: Partial<LetterData>) => {
    setLetter((prev) => {
      const next = { ...prev, ...updates, updatedAt: Date.now() };
      saveLetterToStorage(next);
      return next;
    });
  };

  // Remove individual sticker from letter
  const handleRemoveSticker = (id: string) => {
    sounds.playStampThud();
    setLetter((prev) => {
      const next = {
        ...prev,
        stickers: prev.stickers.filter((s) => s.id !== id),
        updatedAt: Date.now(),
      };
      saveLetterToStorage(next);
      return next;
    });
  };

  // Move individual sticker to new x, y position
  const handleUpdateStickerPosition = (id: string, x: number, y: number) => {
    setLetter((prev) => {
      const updatedStickers = prev.stickers.map((s) =>
        s.id === id ? { ...s, x, y } : s
      );
      const next = { ...prev, stickers: updatedStickers, updatedAt: Date.now() };
      saveLetterToStorage(next);
      return next;
    });
  };

  // Toggle Sound FX
  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sounds.enabled = next;
  };

  // New letter reset (Clean plain slate)
  const handleNewLetter = () => {
    const fresh: LetterData = {
      ...DEFAULT_LETTER,
      id: `letter-${Date.now()}`,
      updatedAt: Date.now(),
      envelopeStyle: 'plain-cream',
      envelopeDecor: 'none',
      paperStyle: 'plain-ivory',
      stickers: [],
    };
    setLetter(fresh);
    saveLetterToStorage(fresh);
    setCurrentStep(1);
  };

  // Reply generator
  const handleComposeReply = () => {
    const replyLetter: LetterData = {
      ...DEFAULT_LETTER,
      id: `letter-${Date.now()}`,
      updatedAt: Date.now(),
      recipientName: letter.senderName || 'My Friend',
      senderName: letter.recipientName || 'Your Companion',
      salutation: `Dear ${letter.senderName || 'Friend'},`,
      title: `A warm reply from my desk`,
      body: `Your lovely letter brought such warmth to my morning. Reading your words felt like sitting down together over a quiet cup of tea...`,
      dateHeading: 'In sweet reply',
      envelopeStyle: 'plain-cream',
      paperStyle: 'plain-ivory',
      stickers: [],
    };
    setLetter(replyLetter);
    saveLetterToStorage(replyLetter);
    setIsRecipientSharedView(false);
    setCurrentStep(2);
    window.location.hash = '';
  };

  // If this is a dedicated recipient link view (opened by receiver)
  if (isRecipientSharedView) {
    return (
      <RecipientView
        letter={letter}
        onComposeReply={handleComposeReply}
        onExitToStudio={() => {
          setIsRecipientSharedView(false);
          setCurrentStep(1);
          window.location.hash = '';
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F3EB] text-[#3D3226] flex flex-col font-sans select-text">
      {/* ================= TOP NAVIGATION BAR ================= */}
      <header className="sticky top-0 z-40 bg-[#FAF7F0]/95 backdrop-blur-xs border-b border-[#DDD1C0] px-4 sm:px-6 py-2.5 flex items-center justify-between shadow-xs">
        {/* Brand identity: Whimsifolks */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#EADAC5] border border-[#CDBBA5] flex items-center justify-center text-sm shadow-xs">
            🌸
          </div>
          <div>
            <h1 className="font-serif text-base sm:text-lg font-bold tracking-wide text-[#2E2419] flex items-center gap-2">
              <span>Whimsifolks</span>
              <span className="hidden sm:inline-block text-[10.5px] font-normal px-2 py-0.5 rounded-sm bg-[#EFE4D3] text-[#715B44] border border-[#DECDB8]">
                Handcrafted Stationery
              </span>
            </h1>
            <p className="text-[11px] text-[#7A6A56] font-serif italic hidden md:block">
              Folk envelopes, scalloped cards, wax seals & whimsical stickers
            </p>
          </div>
        </div>

        {/* Right Tools & Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Receiver preview mode button */}
          <button
            type="button"
            onClick={() => {
              sounds.playWaxCrack();
              setIsRecipientSharedView(true);
            }}
            className="px-3 py-1.5 text-xs font-serif bg-[#EFE7DC] hover:bg-[#E5DACB] border border-[#DDD0BC] rounded-md text-[#3D3226] transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Preview how receiver opens the sealed envelope"
          >
            <span>👁️</span>
            <span className="hidden sm:inline">Receiver View</span>
          </button>

          {/* Sound toggle */}
          <button
            type="button"
            onClick={handleToggleSound}
            className={`p-2 rounded-md border text-xs transition-colors cursor-pointer ${
              soundEnabled
                ? 'bg-[#EAE0D0] border-[#D5C6AF] text-[#3D3226]'
                : 'bg-transparent border-transparent text-[#8C7B68] hover:bg-[#EAE0D0]'
            }`}
            title={soundEnabled ? 'Tactile sound effects enabled' : 'Sound effects muted'}
            aria-label="Toggle sound"
          >
            {soundEnabled ? '🔔' : '🔕'}
          </button>

          {/* Stationery Box (Drafts) */}
          <button
            type="button"
            onClick={() => setShowBoxModal(true)}
            className="px-2.5 py-1.5 text-xs font-serif bg-[#EFE7DC] hover:bg-[#E5DACB] border border-[#DDD0BC] rounded-md text-[#3D3226] transition-colors flex items-center gap-1 cursor-pointer"
            title="Open saved drafts"
          >
            <span>🗃️</span>
            <span className="hidden md:inline">Drafts</span>
          </button>

          {/* Export & Send CTA */}
          <button
            type="button"
            onClick={() => {
              sounds.playStampThud();
              setShowExportModal(true);
            }}
            className="px-3.5 py-1.5 text-xs font-serif font-medium bg-[#8F3F35] hover:bg-[#7D3229] text-[#FAF5EB] rounded-md shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span>💌</span>
            <span>Send & PDF</span>
          </button>
        </div>
      </header>

      {/* ================= MAIN SPLIT WORKSPACE ================= */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* LEFT / CENTER: INTERACTIVE PREVIEW CANVAS */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex flex-col items-center justify-start relative bg-[#F7F3EB]">
          {/* Ambient Texture */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              backgroundImage:
                'radial-gradient(ellipse at 50% 20%, rgba(255,255,255,0.7) 0%, transparent 60%)',
            }}
          />

          {/* ================= STEP 1 PREVIEW: ENVELOPE CANVAS ================= */}
          {currentStep === 1 && (
            <div
              id="preview-canvas-container"
              className="w-full max-w-2xl flex flex-col items-center animate-fade-in relative z-10 py-2"
            >
              {/* Clean segmented side toggle: Wax Flap vs Address */}
              <div className="mb-4 flex items-center p-1 bg-[#EFE7DC] rounded-lg border border-[#DDD0BC] shadow-inner text-xs font-serif">
                <button
                  type="button"
                  onClick={() => {
                    sounds.playPenClick();
                    setEnvelopeViewSide('back');
                  }}
                  className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                    envelopeViewSide === 'back'
                      ? 'bg-[#FAF7F0] text-[#2E2419] font-semibold shadow-xs'
                      : 'text-[#6E5C47] hover:text-[#2E2419]'
                  }`}
                >
                  Wax Flap (Back)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    sounds.playPenClick();
                    setEnvelopeViewSide('front');
                  }}
                  className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                    envelopeViewSide === 'front'
                      ? 'bg-[#FAF7F0] text-[#2E2419] font-semibold shadow-xs'
                      : 'text-[#6E5C47] hover:text-[#2E2419]'
                  }`}
                >
                  Address (Front)
                </button>
              </div>

              {/* Envelope Display */}
              <EnvelopeView
                letter={letter}
                isFront={envelopeViewSide === 'front'}
                isOpen={false}
                interactiveSeal={false}
                isInteractive={true}
                onUpdateStickerPosition={handleUpdateStickerPosition}
                onRemoveSticker={handleRemoveSticker}
              />
            </div>
          )}

          {/* ================= STEP 2 PREVIEW: CARD & STICKERS ================= */}
          {currentStep === 2 && (
            <div
              id="preview-canvas-container"
              className="w-full max-w-2xl flex flex-col items-center animate-fade-in relative z-10"
            >
              <div className="w-full flex items-center justify-between mb-3 px-2 text-xs font-serif text-[#7A6A56]">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] uppercase tracking-wider text-[#8C765C] font-semibold">
                    Live Stationery Card
                  </span>
                  <span>·</span>
                  <span className="italic">Type directly on the card or use panel</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-[#8C765C]">
                    {(letter.stickers || []).filter((s) => s.target === 'card' || !s.target).length} stickers on card
                  </span>
                </div>
              </div>

              {/* The Tactile Letter Paper */}
              <LetterPaper
                letter={letter}
                isEditable={true}
                onUpdate={handleUpdateLetter}
                onUpdateStickerPosition={handleUpdateStickerPosition}
                onRemoveSticker={handleRemoveSticker}
              />
            </div>
          )}

          {/* ================= STEP 3 & 4 PREVIEW: INTERACTIVE ENVELOPE & UNFOLDING ================= */}
          {(currentStep === 3 || currentStep === 4) && (
            <div
              id="preview-canvas-container"
              className="w-full max-w-2xl flex flex-col items-center animate-fade-in relative z-10 py-2"
            >
              <div className="text-center mb-3">
                <h2 className="text-lg font-serif text-[#2E2419]">
                  Click the Wax Seal to Open
                </h2>
              </div>

              {/* Interactive Unfolding Ceremony */}
              <UnfoldingAnimation
                letter={letter}
                initialState="sealed"
              />
            </div>
          )}
        </div>

        {/* RIGHT: GUIDED 4-STEP CRAFTING STUDIO DRAWER */}
        <div className="w-full lg:w-[440px] xl:w-[480px] shrink-0 h-auto lg:h-[calc(100vh-57px)] flex flex-col">
          <GuidedCraftingStudio
            currentStep={currentStep}
            onSetStep={(st) => setCurrentStep(st)}
            letter={letter}
            onChange={handleUpdateLetter}
            onOpenExportModal={() => setShowExportModal(true)}
          />
        </div>
      </div>

      {/* ================= MODALS ================= */}
      {/* Export & Sharing Modal */}
      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        letter={letter}
      />

      {/* Stationery Box Drafts Modal */}
      <StationeryBoxModal
        isOpen={showBoxModal}
        onClose={() => setShowBoxModal(false)}
        onSelectLetter={(selected) => setLetter(selected)}
        onNewLetter={handleNewLetter}
        currentLetterId={letter.id}
      />
    </div>
  );
}
