import React, { useState } from 'react';
import { LetterData } from '../types/stationery';
import { createLetterShareUrl, encodeLetterToHash, generateOneLineShareUrl } from '../utils/serialization';
import { downloadLetterAsPng } from '../utils/exportImage';
import { sounds } from '../utils/soundEffects';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  letter: LetterData;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, letter }) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);
  const [isGeneratingLink, setIsGeneratingLink] = useState(false);
  const [isSavingImage, setIsSavingImage] = useState(false);
  const [saveImageMessage, setSaveImageMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  // Generate shareable link on demand (clean one-line URL)
  const handleGenerateShareLink = async () => {
    setIsGeneratingLink(true);
    sounds.playStampThud();
    try {
      const url = await generateOneLineShareUrl(letter);
      setGeneratedLink(url);
    } catch {
      const fallbackUrl = createLetterShareUrl(letter);
      setGeneratedLink(fallbackUrl);
    } finally {
      setIsGeneratingLink(false);
    }
  };

  const handleCopyLink = async () => {
    if (!generatedLink) return;
    try {
      await navigator.clipboard.writeText(generatedLink);
      setCopiedLink(true);
      sounds.playStampThud();
      setTimeout(() => setCopiedLink(false), 3000);
    } catch {
      // Fallback
    }
  };

  const handleSaveImage = async () => {
    try {
      setIsSavingImage(true);
      sounds.playPaperRustle();
      setSaveImageMessage('Rendering letter image...');
      await downloadLetterAsPng(letter);
      sounds.playStampThud();
      setSaveImageMessage('✓ Letter image saved (PNG)!');
      setTimeout(() => setSaveImageMessage(null), 3500);
    } catch (err) {
      console.error(err);
      setSaveImageMessage('Could not save image. Please try again.');
      setTimeout(() => setSaveImageMessage(null), 3000);
    } finally {
      setIsSavingImage(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs animate-fade-in">
      <div
        className="relative w-full max-w-lg bg-[#FAF7F0] border border-[#D5C6AF] rounded-lg shadow-2xl p-6 sm:p-8 text-[#3D3226]"
        style={{
          boxShadow: '0 20px 40px -10px rgba(45, 30, 15, 0.3)',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-[#7A6A56] hover:text-[#3D3226] rounded-md transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* Header */}
        <div className="text-center mb-5">
          <h2 className="text-xl font-serif font-medium text-[#2E2419]">
            Share Letter
          </h2>
          <p className="text-xs text-[#7A6A56] font-serif mt-1">
            Send an interactive envelope link or save the letter card as an image
          </p>
        </div>

        {/* Shareable Recipient Link */}
        <div className="mb-4 p-3.5 rounded-lg bg-[#F2EBDE] border border-[#DDD0BC]">
          {!generatedLink ? (
            <button
              type="button"
              onClick={handleGenerateShareLink}
              disabled={isGeneratingLink}
              className="w-full py-2.5 px-4 bg-[#8F3F35] hover:bg-[#7D3229] text-[#FAF5EB] rounded-md font-serif text-xs font-semibold shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              <span>🔗</span>
              <span>{isGeneratingLink ? 'Generating Link...' : 'Generate Share Link'}</span>
            </button>
          ) : (
            <div className="space-y-2.5 animate-fade-in">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={generatedLink}
                  className="flex-1 text-xs px-3 py-2 bg-[#FFFDF9] border border-[#D5C6AF] rounded-md font-mono text-[#5C4D3D] focus:outline-none select-all shadow-inner truncate whitespace-nowrap overflow-x-auto"
                />
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className={`px-3.5 py-2 text-xs font-serif font-medium rounded-md transition-colors flex items-center gap-1.5 whitespace-nowrap shadow-xs cursor-pointer ${
                    copiedLink
                      ? 'bg-[#4B6E50] text-[#FFFDF9]'
                      : 'bg-[#8F3F35] text-[#FAF5EB] hover:bg-[#7D3229]'
                  }`}
                >
                  {copiedLink ? '✓ Copied' : 'Copy Link'}
                </button>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    sounds.playWaxCrack();
                    if (generatedLink) {
                      const hashIdx = generatedLink.indexOf('#');
                      if (hashIdx >= 0) {
                        window.location.hash = generatedLink.slice(hashIdx + 1);
                        onClose();
                        return;
                      }
                    }
                    window.location.hash = `l=${encodeLetterToHash(letter)}`;
                    onClose();
                  }}
                  className="flex-1 py-1.5 px-3 text-xs font-serif bg-[#FFFDF9] hover:bg-[#FAF7F0] border border-[#D5C6AF] rounded-md text-[#3D3226] transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span>👁️</span>
                  <span>Open Receiver View</span>
                </button>
                <button
                  type="button"
                  onClick={handleGenerateShareLink}
                  className="py-1.5 px-2.5 text-xs font-serif text-[#7A6A56] hover:text-[#2E2419] cursor-pointer"
                  title="Regenerate link"
                >
                  ↻ Regenerate
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Save as Image (PNG) */}
        <div className="space-y-1.5">
          <button
            type="button"
            disabled={isSavingImage}
            onClick={handleSaveImage}
            className="w-full p-2.5 bg-[#FFFDF9] hover:bg-[#F5EEE0] border border-[#DDD0BC] rounded-md text-center transition-colors font-serif text-xs text-[#5C4533] cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2 shadow-2xs font-medium"
          >
            <span>🖼️</span>
            <span>{isSavingImage ? 'Rendering PNG Image...' : 'Save as Image (PNG)'}</span>
          </button>

          {saveImageMessage && (
            <div className="p-2 bg-[#FAF0DE] border border-[#E5D2B8] rounded text-center text-xs font-serif text-[#684920] animate-fade-in">
              {saveImageMessage}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-[#E5DAC6] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-serif font-medium text-[#5C4B39] hover:text-[#2E2419] rounded-md hover:bg-[#EFE8DC] transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
