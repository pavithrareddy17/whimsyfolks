import React, { useState } from 'react';
import { toPng, toJpeg } from 'html-to-image';
import jsPDF from 'jspdf';
import { LetterData } from '../types/stationery';
import { encodeLetterToHash } from '../utils/serialization';
import { sounds } from '../utils/soundEffects';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  letter: LetterData;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, letter }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [exportMessage, setExportMessage] = useState<string | null>(null);
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);
  const [isGeneratingLink, setIsGeneratingLink] = useState(false);

  if (!isOpen) return null;

  // Generate shareable link on demand
  const handleGenerateShareLink = () => {
    setIsGeneratingLink(true);
    sounds.playStampThud();
    setTimeout(() => {
      const hash = encodeLetterToHash(letter);
      const origin = window.location.origin + window.location.pathname;
      setGeneratedLink(`${origin}#letter=${hash}`);
      setIsGeneratingLink(false);
    }, 200);
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

  // Download as Image (PNG)
  const handleDownloadImage = async (format: 'png' | 'jpeg') => {
    const node = document.getElementById('printable-letter-paper') || document.getElementById('preview-canvas-container');
    if (!node) {
      setExportMessage('Please ensure preview is visible before exporting.');
      return;
    }

    try {
      setIsExporting(true);
      setExportMessage('Brewing your high-resolution stationery image...');
      sounds.playPaperRustle();

      const dataUrl =
        format === 'png'
          ? await toPng(node, { quality: 0.98, pixelRatio: 2.5 })
          : await toJpeg(node, { quality: 0.95, pixelRatio: 2.5 });

      const link = document.createElement('a');
      link.download = `billet-doux-${letter.recipientName.replace(/\s+/g, '-').toLowerCase() || 'letter'}.${format}`;
      link.href = dataUrl;
      link.click();
      sounds.playStampThud();
      setExportMessage('Downloaded image successfully!');
      setTimeout(() => setExportMessage(null), 3500);
    } catch (err) {
      console.error(err);
      setExportMessage('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  // Download PDF (Letter or Envelope + Letter)
  const handleDownloadPDF = async (includeEnvelope: boolean = false) => {
    const targetNode = includeEnvelope
      ? document.getElementById('preview-canvas-container') || document.getElementById('printable-letter-paper')
      : document.getElementById('printable-letter-paper') || document.getElementById('preview-canvas-container');

    if (!targetNode) {
      setExportMessage('Preview node not found. Please try again.');
      return;
    }

    try {
      setIsExporting(true);
      setExportMessage(includeEnvelope ? 'Assembling Envelope & Letter PDF keepsake...' : 'Creating vintage PDF keepsake...');
      sounds.playPaperRustle();

      const imgData = await toPng(targetNode, { pixelRatio: 2.2 });
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      const yOffset = pdfHeight < 297 ? (297 - pdfHeight) / 2 : 10;

      pdf.addImage(imgData, 'PNG', 0, yOffset, pdfWidth, pdfHeight);
      pdf.save(`billet-doux-${includeEnvelope ? 'envelope-keepsake' : 'letter'}.pdf`);

      sounds.playStampThud();
      setExportMessage('PDF saved!');
      setTimeout(() => setExportMessage(null), 3500);
    } catch (err) {
      console.error(err);
      setExportMessage('PDF export failed. Please try again.');
    } finally {
      setIsExporting(false);
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
            Share & Download
          </h2>
        </div>

        {/* Shareable Recipient Link */}
        <div className="mb-5 p-3.5 rounded-lg bg-[#F2EBDE] border border-[#DDD0BC]">
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
                  className="flex-1 text-xs px-3 py-2 bg-[#FFFDF9] border border-[#D5C6AF] rounded-md font-mono text-[#5C4D3D] focus:outline-none select-all shadow-inner"
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
                    window.location.hash = `letter=${encodeLetterToHash(letter)}`;
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

        {/* PDF & Image Downloads */}
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            {/* Standard Letter PDF */}
            <button
              type="button"
              disabled={isExporting}
              onClick={() => handleDownloadPDF(false)}
              className="p-3 bg-[#FFFDF9] hover:bg-[#F5EEE0] border border-[#D8CABE] rounded-md text-center transition-colors font-serif text-xs font-semibold text-[#2E2419] cursor-pointer disabled:opacity-50 flex items-center justify-center gap-1.5"
            >
              <span>📄</span>
              <span>Letter (PDF)</span>
            </button>

            {/* Envelope + Letter Coming Out PDF */}
            <button
              type="button"
              disabled={isExporting}
              onClick={() => handleDownloadPDF(true)}
              className="p-3 bg-[#FFFDF9] hover:bg-[#F5EEE0] border border-[#D8CABE] rounded-md text-center transition-colors font-serif text-xs font-semibold text-[#2E2419] cursor-pointer disabled:opacity-50 flex items-center justify-center gap-1.5"
            >
              <span>✉️</span>
              <span>Envelope & Letter (PDF)</span>
            </button>

            {/* High Res PNG */}
            <button
              type="button"
              disabled={isExporting}
              onClick={() => handleDownloadImage('png')}
              className="p-3 bg-[#FFFDF9] hover:bg-[#F5EEE0] border border-[#D8CABE] rounded-md text-center transition-colors font-serif text-xs font-semibold text-[#2E2419] cursor-pointer col-span-2 disabled:opacity-50 flex items-center justify-center gap-1.5"
            >
              <span>🖼️</span>
              <span>Download Image (PNG)</span>
            </button>
          </div>
        </div>

        {/* Status notification */}
        {exportMessage && (
          <div className="mt-4 p-2.5 rounded-md bg-[#FAF0DE] border border-[#E5D2B8] text-center text-xs font-serif text-[#684920] animate-fade-in">
            {exportMessage}
          </div>
        )}

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
