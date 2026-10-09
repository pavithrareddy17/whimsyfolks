import React, { useState } from 'react';
import { toPng, toJpeg } from 'html-to-image';
import jsPDF from 'jspdf';
import { encodeLetterToHash } from '../utils/serialization';
import {
  EnvelopeDecorId,
  EnvelopeStyleId,
  FontChoice,
  InkColor,
  LetterData,
  PaperStyleId,
  PlacedSticker,
  StickerId,
  WaxColor,
  WaxRimShape,
  WaxSealMotif,
} from '../types/stationery';
import { ENVELOPE_STYLES } from './EnvelopeView';
import { WAX_COLOR_CONFIG } from './WaxSeal';
import { sounds } from '../utils/soundEffects';
import {
  EnvelopeStyleThumbnail,
  FontThumbnail,
  PaperStyleThumbnail,
  StickerThumbnail,
  TrimmingThumbnail,
  WaxSealThumbnail,
} from './SelectionThumbnails';

interface GuidedCraftingStudioProps {
  currentStep: 1 | 2 | 3 | 4;
  onSetStep: (step: 1 | 2 | 3 | 4) => void;
  letter: LetterData;
  onChange: (updates: Partial<LetterData>) => void;
  onOpenExportModal: () => void;
}

const ALL_STICKERS: { id: StickerId; label: string }[] = [
  { id: 'birthday-cake', label: 'Birthday Cake' },
  { id: 'happy-birthday-cutout', label: 'Cutout Letters' },
  { id: 'gingham-bow', label: 'Gingham Bow' },
  { id: 'red-satin-bow', label: 'Satin Bow' },
  { id: 'golden-stars', label: 'Brass Stars' },
  { id: 'vintage-button', label: 'Pearl Button' },
  { id: 'pressed-daisy', label: 'Pressed Daisy' },
  { id: 'lavender-sprig', label: 'Lavender' },
  { id: 'sweet-heart', label: 'Sweet Heart' },
  { id: 'cottage-strawberry', label: 'Strawberry' },
  { id: 'storybook-bunny', label: 'Bunny' },
  { id: 'vintage-teacup', label: 'Tea Cup' },
  { id: 'enchanted-mushroom', label: 'Mushroom' },
  { id: 'honey-bee', label: 'Honeybee' },
];

export const GuidedCraftingStudio: React.FC<GuidedCraftingStudioProps> = ({
  currentStep,
  onSetStep,
  letter,
  onChange,
  onOpenExportModal,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportStatus, setExportStatus] = useState<string | null>(null);
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);
  const [isGeneratingLink, setIsGeneratingLink] = useState(false);

  const steps = [
    { num: 1 as const, title: 'Envelope & Wax', icon: '✉️' },
    { num: 2 as const, title: 'Card & Letter', icon: '📜' },
    { num: 3 as const, title: 'Preview & Unfold', icon: '🕯️' },
    { num: 4 as const, title: 'Send & PDF', icon: '💌' },
  ];

  const handleUpdate = (updates: Partial<LetterData>, sound?: 'pen' | 'stamp' | 'wax') => {
    if (sound === 'stamp') sounds.playStampThud();
    else if (sound === 'wax') sounds.playWaxCrack();
    else sounds.playPenClick();
    // Invalidate previously generated link if content changed
    setGeneratedLink(null);
    onChange(updates);
  };

  const handleGenerateShareLink = () => {
    setIsGeneratingLink(true);
    sounds.playStampThud();
    setTimeout(() => {
      const hash = encodeLetterToHash(letter);
      const url = `${window.location.origin}${window.location.pathname}#letter=${hash}`;
      setGeneratedLink(url);
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

  const handleDownloadPDF = async (includeEnvelope: boolean) => {
    const targetNode = includeEnvelope
      ? document.getElementById('preview-canvas-container') || document.getElementById('printable-letter-paper')
      : document.getElementById('printable-letter-paper') || document.getElementById('preview-canvas-container');

    if (!targetNode) return;

    try {
      setIsExporting(true);
      setExportStatus('Generating PDF...');
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
      setExportStatus('PDF downloaded');
      setTimeout(() => setExportStatus(null), 3000);
    } catch {
      setExportStatus('Failed to generate PDF');
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownloadImage = async () => {
    const node = document.getElementById('printable-letter-paper') || document.getElementById('preview-canvas-container');
    if (!node) return;

    try {
      setIsExporting(true);
      setExportStatus('Generating Image...');
      sounds.playPaperRustle();

      const dataUrl = await toPng(node, { quality: 0.98, pixelRatio: 2.5 });
      const link = document.createElement('a');
      link.download = 'billet-doux-letter.png';
      link.href = dataUrl;
      link.click();

      sounds.playStampThud();
      setExportStatus('Image downloaded');
      setTimeout(() => setExportStatus(null), 3000);
    } catch {
      setExportStatus('Failed to generate Image');
    } finally {
      setIsExporting(false);
    }
  };

  // Add individual sticker to designated target ('envelope' | 'card')
  const addIndividualSticker = (type: StickerId, target: 'envelope' | 'card') => {
    sounds.playStampThud();
    const current = [...(letter.stickers || [])];

    // Place near center with slight random offset so multiple stickers don't stack perfectly
    const offsetSpread = 18;
    const newX = Math.round(50 + (Math.random() * offsetSpread - offsetSpread / 2));
    const newY = Math.round(45 + (Math.random() * offsetSpread - offsetSpread / 2));
    const newRotation = Math.round(Math.random() * 16 - 8);

    const newSticker: PlacedSticker = {
      id: `stk-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      type,
      target,
      x: newX,
      y: newY,
      rotation: newRotation,
    };

    current.push(newSticker);
    onChange({ stickers: current });
  };

  // Remove individual sticker
  const removeSticker = (id: string) => {
    sounds.playPenClick();
    const current = (letter.stickers || []).filter((s) => s.id !== id);
    onChange({ stickers: current });
  };

  const envelopeStickers = (letter.stickers || []).filter((s) => s.target === 'envelope');
  const cardStickers = (letter.stickers || []).filter((s) => s.target === 'card' || !s.target);

  return (
    <div className="w-full bg-[#FAF7F0] border-t lg:border-t-0 lg:border-l border-[#D8CABE] flex flex-col h-full shadow-lg">
      {/* ================= STEP STEPPER BAR ================= */}
      <div className="px-4 py-3 bg-[#F4EFE6] border-b border-[#DDD1C0]">
        <div className="flex items-center justify-between gap-1">
          {steps.map((st) => {
            const isCurrent = currentStep === st.num;
            const isCompleted = currentStep > st.num;
            return (
              <button
                key={st.num}
                type="button"
                onClick={() => {
                  sounds.playPenClick();
                  onSetStep(st.num);
                }}
                className={`flex-1 flex flex-col items-center py-1.5 px-1 rounded-md text-center transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-[#FAF7F0] border border-[#CDBBA5] shadow-xs text-[#2E2419]'
                    : isCompleted
                    ? 'text-[#5C4533] hover:bg-[#EAE0D0]'
                    : 'text-[#8C765C] opacity-70 hover:opacity-100 hover:bg-[#EAE0D0]'
                }`}
              >
                <div className="flex items-center gap-1">
                  <span className="text-sm">{st.icon}</span>
                  <span
                    className={`text-[10px] uppercase font-mono font-bold px-1.5 py-0.2 rounded-full ${
                      isCurrent
                        ? 'bg-[#8F3F35] text-white'
                        : isCompleted
                        ? 'bg-[#5B785D] text-white'
                        : 'bg-[#DDD0BC] text-[#5C4533]'
                    }`}
                  >
                    {isCompleted ? '✓' : st.num}
                  </span>
                </div>
                <span className="text-[11px] font-serif font-medium mt-0.5 truncate max-w-full">
                  {st.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ================= STEP CONTENT BODY ================= */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6 text-[#3D3226]">
        {/* ================= STEP 1: ENVELOPE & WAX ================= */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fade-in">
            {/* 1. TOP FIRST: TO & FROM CALLIGRAPHY RECIPIENT NAMES */}
            <div className="p-3.5 bg-[#FFFDF9] rounded-md border border-[#D5C6AF] shadow-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-serif font-bold uppercase tracking-wider text-[#6E5A44] flex items-center gap-1.5">
                  <span>✒️</span> Addressed Envelope
                </span>
                <span className="text-[10px] text-[#8C765C] font-serif italic">
                  Shown on front
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[10.5px] font-serif font-semibold text-[#5C4D3D] block mb-1">
                    To:
                  </label>
                  <input
                    type="text"
                    value={letter.recipientName}
                    onChange={(e) => handleUpdate({ recipientName: e.target.value })}
                    placeholder="e.g. Lady Eleanor"
                    className="w-full px-2.5 py-1.5 text-xs font-serif bg-[#FAF8F2] border border-[#C5B39A] rounded-md focus:outline-none focus:ring-1 focus:ring-[#8F3F35] text-[#2E2419]"
                  />
                </div>
                <div>
                  <label className="text-[10.5px] font-serif font-semibold text-[#5C4D3D] block mb-1">
                    From:
                  </label>
                  <input
                    type="text"
                    value={letter.senderName}
                    onChange={(e) => handleUpdate({ senderName: e.target.value })}
                    placeholder="e.g. Clara"
                    className="w-full px-2.5 py-1.5 text-xs font-serif bg-[#FAF8F2] border border-[#C5B39A] rounded-md focus:outline-none focus:ring-1 focus:ring-[#8F3F35] text-[#2E2419]"
                  />
                </div>
              </div>
            </div>

            {/* 2. MOVABLE STICKERS ON ENVELOPE (Tap to add, drag freely on envelope) */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-serif font-bold uppercase tracking-wider text-[#6E5A44] flex items-center gap-1.5">
                  <span>✨</span> Add Stickers on Envelope
                </label>
                <span className="text-[10px] text-[#8C765C] font-serif italic">
                  {envelopeStickers.length} placed · drag to position
                </span>
              </div>

              {/* Active placed stickers mini chips */}
              {envelopeStickers.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-2.5 p-2 bg-[#F2ECE0] rounded-md border border-[#DDD0BC]">
                  {envelopeStickers.map((stk) => (
                    <div
                      key={stk.id}
                      className="inline-flex items-center gap-1.5 bg-[#FFFDF9] border border-[#D5C6AF] px-2 py-0.5 rounded-full text-[10.5px] font-serif text-[#3D2C1F] shadow-2xs"
                    >
                      <span className="capitalize">{stk.type.replace('-', ' ')}</span>
                      <button
                        type="button"
                        onClick={() => removeSticker(stk.id)}
                        className="text-[#8F2424] hover:text-[#500] font-bold text-xs cursor-pointer"
                        title="Remove"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Grid of Individual Charming Stickers */}
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-1.5">
                {ALL_STICKERS.map((stk) => (
                  <button
                    key={stk.id}
                    type="button"
                    onClick={() => addIndividualSticker(stk.id, 'envelope')}
                    className="p-1 rounded-md border border-[#DDD0BC] bg-[#FAF8F2] hover:border-[#8F3F35] hover:bg-[#FFFDF9] hover:shadow-xs transition-all cursor-pointer flex flex-col items-center justify-center h-20 group"
                    title={`Add ${stk.label} to envelope`}
                  >
                    <StickerThumbnail type={stk.id} label={stk.label} />
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-[#8C765C] font-serif italic mt-1 text-center">
                ✦ Tap any sticker to add, then drag & drop anywhere on the envelope!
              </p>
            </div>

            {/* 3. Envelope Patterns (Visual pictorial images) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-serif font-bold uppercase tracking-wider text-[#6E5A44]">
                  Envelope Pattern
                </label>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {(Object.entries(ENVELOPE_STYLES) as [
                  EnvelopeStyleId,
                  (typeof ENVELOPE_STYLES)[EnvelopeStyleId]
                ][]).map(([styleId, conf]) => {
                  const isSelected = letter.envelopeStyle === styleId;
                  return (
                    <button
                      key={styleId}
                      type="button"
                      onClick={() => handleUpdate({ envelopeStyle: styleId }, 'stamp')}
                      className={`p-2 rounded-md border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'border-[#8F3F35] bg-[#FFFDF9] ring-2 ring-[#8F3F35]/25 shadow-xs'
                          : 'border-[#DDD0BC] bg-[#FAF8F2] hover:border-[#B5A189]'
                      }`}
                    >
                      <div className="mb-1.5">
                        <EnvelopeStyleThumbnail styleId={styleId} />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-[11px] font-semibold text-[#2E2419] truncate">
                          {conf.name}
                        </span>
                        {isSelected && <span className="text-[#8F3F35] text-[10px] font-bold">✓</span>}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Outer Trimmings (Visual Pictures) */}
            <div>
              <label className="block text-xs font-serif font-bold uppercase tracking-wider text-[#6E5A44] mb-2">
                Outer Trimmings & Ribbons
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'none' as const, label: 'Clean' },
                  { id: 'golden-stars' as const, label: 'Stars' },
                  { id: 'gingham-bow' as const, label: 'Gingham' },
                  { id: 'red-satin-bow' as const, label: 'Red Bow' },
                  { id: 'pearl-buttons' as const, label: 'Buttons' },
                  { id: 'dried-florals' as const, label: 'Daisy' },
                ].map((dec) => {
                  const isSelected = letter.envelopeDecor === dec.id;
                  return (
                    <button
                      key={dec.id}
                      type="button"
                      onClick={() => handleUpdate({ envelopeDecor: dec.id as EnvelopeDecorId }, 'pen')}
                      className={`p-1.5 rounded-md border transition-all cursor-pointer h-20 flex flex-col justify-between ${
                        isSelected
                          ? 'border-[#8F3F35] bg-[#FFFDF9] ring-2 ring-[#8F3F35]/20 shadow-xs'
                          : 'border-[#DDD0BC] bg-[#FAF8F2] hover:border-[#B5A189]'
                      }`}
                    >
                      <TrimmingThumbnail decor={dec.id} label={dec.label} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 5. Wax Seal Embossed Motifs (Visual 3D Pictures) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-serif font-bold uppercase tracking-wider text-[#6E5A44]">
                  Wax Seal Motif
                </label>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {[
                  { id: 'rose' as const, label: 'Rose' },
                  { id: 'butterfly' as const, label: 'Butterfly' },
                  { id: 'strawberry' as const, label: 'Strawberry' },
                  { id: 'bunny' as const, label: 'Bunny' },
                  { id: 'tulip' as const, label: 'Tulip' },
                  { id: 'swans' as const, label: 'Swans' },
                  { id: 'ribbon-bow' as const, label: 'Bow' },
                  { id: 'love' as const, label: 'Love' },
                  { id: 'heart-wreath' as const, label: 'Heart' },
                  { id: 'heart-balloons' as const, label: 'Balloons' },
                  { id: 'sword-rose' as const, label: 'Sword' },
                  { id: 'botanical' as const, label: 'Botanical' },
                  { id: 'bee' as const, label: 'Honeybee' },
                  { id: 'monogram' as const, label: 'Monogram' },
                ].map((m) => {
                  const isSelected = letter.waxSealMotif === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => handleUpdate({ waxSealMotif: m.id as WaxSealMotif }, 'wax')}
                      className={`p-1.5 rounded-md border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#8F3F35] bg-[#FFFDF9] ring-2 ring-[#8F3F35]/20 shadow-xs'
                          : 'border-[#DDD0BC] bg-[#FAF8F2] hover:border-[#B5A189]'
                      }`}
                    >
                      <WaxSealThumbnail
                        motif={m.id}
                        color={letter.waxColor}
                        label={m.label}
                        gilded={letter.waxGilded}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Monogram Input if chosen */}
            {letter.waxSealMotif === 'monogram' && (
              <div className="p-3 bg-[#F2ECE0] rounded-md border border-[#DDD0BC] flex items-center justify-between">
                <span className="text-xs font-serif font-semibold text-[#2E2419]">
                  Monogram Initial:
                </span>
                <input
                  type="text"
                  maxLength={1}
                  value={letter.waxSealMonogramLetter}
                  onChange={(e) =>
                    handleUpdate({
                      waxSealMonogramLetter: e.target.value.toUpperCase() || 'W',
                    })
                  }
                  className="w-10 h-10 text-center font-serif text-lg font-bold uppercase bg-[#FAF8F2] border border-[#C5B39A] rounded-md focus:outline-none focus:ring-1 focus:ring-[#8F3F35]"
                />
              </div>
            )}

            {/* 6. Wax Color Tint Droplets */}
            <div>
              <label className="block text-xs font-serif font-bold uppercase tracking-wider text-[#6E5A44] mb-1.5">
                Wax Color Tint
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {Object.entries(WAX_COLOR_CONFIG).map(([key, conf]) => {
                  const isSelected = letter.waxColor === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => handleUpdate({ waxColor: key as WaxColor }, 'wax')}
                      className={`p-1.5 rounded-sm border flex items-center gap-2 text-xs font-serif cursor-pointer ${
                        isSelected
                          ? 'border-[#8F3F35] bg-[#FFFDF9] ring-1 ring-[#8F3F35] font-bold text-[#2E2419]'
                          : 'border-[#DDD0BC] bg-[#FAF8F2] text-[#5C4D3D]'
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full shadow-inner border border-black/10 shrink-0"
                        style={{ backgroundColor: conf.base }}
                      />
                      <span className="truncate text-[11px]">{conf.name.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 7. Wax Rim Melt Contour */}
            <div>
              <label className="block text-xs font-serif font-bold uppercase tracking-wider text-[#6E5A44] mb-2">
                Wax Rim Melt
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'organic-melted' as const, label: 'Organic Puddle' },
                  { id: 'round-classic' as const, label: 'Round Coin' },
                  { id: 'oval-vintage' as const, label: 'Vintage Oval' },
                  { id: 'ruffled-petal' as const, label: 'Petal Edge' },
                ].map((rim) => {
                  const isSelected = (letter.waxRimShape || 'organic-melted') === rim.id;
                  return (
                    <button
                      key={rim.id}
                      type="button"
                      onClick={() => handleUpdate({ waxRimShape: rim.id as WaxRimShape }, 'wax')}
                      className={`p-2 rounded-md border text-center cursor-pointer transition-all ${
                        isSelected
                          ? 'border-[#8F3F35] bg-[#FFFDF9] ring-1 ring-[#8F3F35] font-semibold text-[#2E2419]'
                          : 'border-[#DDD0BC] bg-[#FAF8F2] text-[#5C4D3D]'
                      }`}
                    >
                      <div className="font-serif text-[11px]">{rim.label}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Gilded Gold Foil Highlight Toggle */}
            <div className="p-3 bg-[#F2ECE0] rounded-md border border-[#DDD0BC] flex items-center justify-between">
              <span className="text-xs font-serif font-semibold text-[#2E2419]">
                ✨ Gold Gilded Dusting
              </span>
              <button
                type="button"
                onClick={() => handleUpdate({ waxGilded: !letter.waxGilded }, 'wax')}
                className={`px-3 py-1 text-xs font-serif rounded-md transition-colors cursor-pointer border ${
                  letter.waxGilded
                    ? 'bg-[#D4AF37] text-[#2E2419] font-bold border-[#9E7D20]'
                    : 'bg-[#FAF8F2] text-[#7A6A56] border-[#D5C6AF]'
                }`}
              >
                {letter.waxGilded ? '✓ Gilded' : 'Plain'}
              </button>
            </div>

            {/* Next Step CTA */}
            <button
              type="button"
              onClick={() => {
                sounds.playPaperRustle();
                onSetStep(2);
              }}
              className="w-full py-2.5 bg-[#8F3F35] hover:bg-[#7D3229] text-[#FAF5EB] rounded-md font-serif text-xs font-semibold shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Next: Step 2 · Card & Letter</span>
              <span>→</span>
            </button>
          </div>
        )}

        {/* ================= STEP 2: CARD & LETTER ================= */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fade-in">
            {/* 1. Card Paper Style with Visual Pictures */}
            <div>
              <label className="block text-xs font-serif font-bold uppercase tracking-wider text-[#6E5A44] mb-2">
                Card Paper Material
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'plain-ivory' as const, name: 'Plain Ivory' },
                  { id: 'scalloped-linen' as const, name: 'Scalloped Hem' },
                  { id: 'lace-doily' as const, name: 'Lace Doily' },
                  { id: 'folk-botanical' as const, name: 'Folk Floral' },
                  { id: 'candy-stripe-card' as const, name: 'Candy Stripe' },
                  { id: 'cotton-deckle' as const, name: 'Cotton Deckled' },
                  { id: 'vintage-parchment' as const, name: 'Aged Parchment' },
                  { id: 'lined-notebook' as const, name: 'Ruled Journal' },
                ].map((pap) => {
                  const isSelected = letter.paperStyle === pap.id;
                  return (
                    <button
                      key={pap.id}
                      type="button"
                      onClick={() => handleUpdate({ paperStyle: pap.id as PaperStyleId }, 'stamp')}
                      className={`p-2 rounded-md border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'border-[#8F3F35] bg-[#FFFDF9] ring-2 ring-[#8F3F35]/25 shadow-xs'
                          : 'border-[#DDD0BC] bg-[#FAF8F2] hover:border-[#B5A189]'
                      }`}
                    >
                      <div className="mb-1.5">
                        <PaperStyleThumbnail styleId={pap.id} />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-[11px] font-semibold text-[#2E2419]">
                          {pap.name}
                        </span>
                        {isSelected && <span className="text-[#8F3F35] text-[10px] font-bold">✓</span>}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. MOVABLE STICKERS ON LETTER CARD (Tap to add, drag freely on letter) */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-serif font-bold uppercase tracking-wider text-[#6E5A44] flex items-center gap-1.5">
                  <span>🎀</span> Add Stickers on Letter
                </label>
                <span className="text-[10px] text-[#8C765C] font-serif italic">
                  {cardStickers.length} placed · drag to position
                </span>
              </div>

              {/* Active placed stickers mini chips */}
              {cardStickers.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-2.5 p-2 bg-[#F2ECE0] rounded-md border border-[#DDD0BC]">
                  {cardStickers.map((stk) => (
                    <div
                      key={stk.id}
                      className="inline-flex items-center gap-1.5 bg-[#FFFDF9] border border-[#D5C6AF] px-2 py-0.5 rounded-full text-[10.5px] font-serif text-[#3D2C1F] shadow-2xs"
                    >
                      <span className="capitalize">{stk.type.replace('-', ' ')}</span>
                      <button
                        type="button"
                        onClick={() => removeSticker(stk.id)}
                        className="text-[#8F2424] hover:text-[#500] font-bold text-xs cursor-pointer"
                        title="Remove"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Grid of Individual Charming Stickers */}
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-1.5">
                {ALL_STICKERS.map((stk) => (
                  <button
                    key={stk.id}
                    type="button"
                    onClick={() => addIndividualSticker(stk.id, 'card')}
                    className="p-1 rounded-md border border-[#DDD0BC] bg-[#FAF8F2] hover:border-[#8F3F35] hover:bg-[#FFFDF9] hover:shadow-xs transition-all cursor-pointer flex flex-col items-center justify-center h-20 group"
                    title={`Add ${stk.label} to card`}
                  >
                    <StickerThumbnail type={stk.id} label={stk.label} />
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-[#8C765C] font-serif italic mt-1 text-center">
                ✦ Tap any sticker to add, then drag & drop anywhere on the letter card!
              </p>
            </div>

            {/* 3. Calligraphy Fonts (Visual rendered lettering specimens) */}
            <div>
              <label className="block text-xs font-serif font-bold uppercase tracking-wider text-[#6E5A44] mb-2">
                Lettering Style
              </label>
              <div className="grid grid-cols-2 gap-2 mb-3">
                {[
                  { id: 'cedarville' as const, name: 'Cedarville', sample: 'Dearest love' },
                  { id: 'caveat' as const, name: 'Caveat Hand', sample: 'Sweet thoughts' },
                  { id: 'playfair' as const, name: 'Playfair', sample: 'Elegance' },
                  { id: 'courier' as const, name: 'Typewriter', sample: 'DISPATCH' },
                  { id: 'homemade' as const, name: 'Quill Ink', sample: 'Forever yours' },
                  { id: 'alex-brush' as const, name: 'Alex Script', sample: 'Romance' },
                ].map((f) => {
                  const isSelected = letter.fontChoice === f.id;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => handleUpdate({ fontChoice: f.id as FontChoice }, 'pen')}
                      className={`p-1.5 rounded-md border cursor-pointer transition-all flex flex-col items-center gap-1 ${
                        isSelected
                          ? 'border-[#8F3F35] bg-[#FFFDF9] ring-2 ring-[#8F3F35]/25 shadow-xs'
                          : 'border-[#DDD0BC] bg-[#FAF8F2] hover:border-[#B5A189]'
                      }`}
                    >
                      <FontThumbnail fontId={f.id} sampleWord={f.sample} />
                      <span className="text-[10.5px] font-serif text-[#2E2419] font-medium">
                        {f.name}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Ink Palette */}
              <label className="block text-[10.5px] font-serif font-semibold text-[#6E5A44] mb-1.5 uppercase">
                Ink Color
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: 'crimson' as const, name: 'Crimson', color: '#A61C2B' },
                  { id: 'sepia' as const, name: 'Sepia', color: '#4A3B32' },
                  { id: 'espresso' as const, name: 'Espresso', color: '#281F1A' },
                  { id: 'charcoal' as const, name: 'Charcoal', color: '#242424' },
                  { id: 'dried-rose' as const, name: 'Dried Rose', color: '#7A3F49' },
                  { id: 'forest' as const, name: 'Forest', color: '#2A4533' },
                ].map((ink) => (
                  <button
                    key={ink.id}
                    type="button"
                    onClick={() => handleUpdate({ inkColor: ink.id as InkColor }, 'pen')}
                    className={`p-1.5 rounded-sm border flex items-center gap-1.5 text-[11px] font-serif cursor-pointer ${
                      letter.inkColor === ink.id
                        ? 'border-[#8F3F35] bg-[#FFFDF9] font-bold ring-1 ring-[#8F3F35]'
                        : 'border-[#DDD0BC] bg-[#FAF8F2]'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full shrink-0 shadow-inner"
                      style={{ backgroundColor: ink.color }}
                    />
                    <span className="truncate">{ink.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Letter Writing Area */}
            <div className="space-y-3 p-3.5 bg-[#F2ECE0] rounded-md border border-[#DDD0BC]">
              <span className="text-xs font-serif font-bold text-[#5C4D3D] uppercase tracking-wider block">
                Letter Prose
              </span>

              <div>
                <label className="block text-[10.5px] font-serif text-[#7A6A56] mb-1">
                  Salutation
                </label>
                <input
                  type="text"
                  value={letter.salutation}
                  onChange={(e) => handleUpdate({ salutation: e.target.value })}
                  className="w-full px-2.5 py-1 text-xs bg-[#FFFDF9] border border-[#D5C6AF] rounded-sm font-serif"
                />
              </div>

              <div>
                <label className="block text-[10.5px] font-serif text-[#7A6A56] mb-1">
                  Body Prose
                </label>
                <textarea
                  rows={5}
                  value={letter.body}
                  onChange={(e) => handleUpdate({ body: e.target.value })}
                  className="w-full px-2.5 py-1.5 text-xs bg-[#FFFDF9] border border-[#D5C6AF] rounded-sm font-serif leading-relaxed resize-y"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10.5px] font-serif text-[#7A6A56] mb-1">
                    Sign-off
                  </label>
                  <input
                    type="text"
                    value={letter.signoff}
                    onChange={(e) => handleUpdate({ signoff: e.target.value })}
                    className="w-full px-2 py-1 text-xs bg-[#FFFDF9] border border-[#D5C6AF] rounded-sm font-serif"
                  />
                </div>
                <div>
                  <label className="block text-[10.5px] font-serif text-[#7A6A56] mb-1">
                    Signature
                  </label>
                  <input
                    type="text"
                    value={letter.senderName}
                    onChange={(e) => handleUpdate({ senderName: e.target.value })}
                    className="w-full px-2 py-1 text-xs bg-[#FFFDF9] border border-[#D5C6AF] rounded-sm font-serif font-bold"
                  />
                </div>
              </div>
            </div>

            {/* Back & Next Navigation */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  sounds.playPaperRustle();
                  onSetStep(1);
                }}
                className="py-2.5 px-3 bg-[#EFE7DC] hover:bg-[#E5DACB] text-[#5C4533] rounded-md font-serif text-xs font-semibold border border-[#DDD0BC] cursor-pointer"
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={() => {
                  sounds.playWaxCrack();
                  onSetStep(3);
                }}
                className="flex-1 py-2.5 bg-[#8F3F35] hover:bg-[#7D3229] text-[#FAF5EB] rounded-md font-serif text-xs font-semibold shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Next: Step 3 · Preview Envelope & Unfold</span>
                <span>→</span>
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 3: PREVIEW & UNFOLD ================= */}
        {currentStep === 3 && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  sounds.playPaperRustle();
                  onSetStep(2);
                }}
                className="py-2.5 px-3 bg-[#EFE7DC] hover:bg-[#E5DACB] text-[#5C4533] rounded-md font-serif text-xs font-semibold border border-[#DDD0BC] cursor-pointer"
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={() => {
                  sounds.playStampThud();
                  onSetStep(4);
                }}
                className="flex-1 py-2.5 bg-[#8F3F35] hover:bg-[#7D3229] text-[#FAF5EB] rounded-md font-serif text-xs font-semibold shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Continue to Send & Download</span>
                <span>→</span>
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 4: SEND & PDF ================= */}
        {currentStep === 4 && (
          <div className="space-y-4 animate-fade-in">
            {/* Generate Shareable Link Action */}
            <div className="p-3.5 bg-[#FFFDF9] rounded-lg border border-[#D5C6AF] shadow-xs space-y-2.5">
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
                <div className="space-y-2 animate-fade-in">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={generatedLink}
                      className="flex-1 text-xs px-2.5 py-1.5 bg-[#FAF8F2] border border-[#C5B39A] rounded-md font-mono text-[#5C4D3D] focus:outline-none select-all shadow-inner"
                    />
                    <button
                      type="button"
                      onClick={handleCopyLink}
                      className={`px-3 py-1.5 text-xs font-serif font-medium rounded-md transition-all whitespace-nowrap cursor-pointer shadow-xs ${
                        copiedLink
                          ? 'bg-[#4B6E50] text-white'
                          : 'bg-[#8F3F35] text-white hover:bg-[#7D3229]'
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
                      }}
                      className="flex-1 py-1.5 px-2.5 text-xs font-serif bg-[#EFE7DC] hover:bg-[#E5DACB] border border-[#DDD0BC] rounded-md text-[#3D3226] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>👁️</span>
                      <span>Test Receiver View</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleGenerateShareLink}
                      className="py-1.5 px-2.5 text-xs font-serif text-[#7A6A56] hover:text-[#2E2419] transition-colors cursor-pointer"
                      title="Regenerate link"
                    >
                      ↻ Regenerate
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Direct Download Buttons */}
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                disabled={isExporting}
                onClick={() => handleDownloadPDF(false)}
                className="p-2.5 bg-[#FFFDF9] hover:bg-[#F5EEE0] border border-[#DDD0BC] rounded-md text-center transition-colors font-serif text-xs font-semibold text-[#2E2419] cursor-pointer disabled:opacity-50 flex items-center justify-center gap-1.5 shadow-2xs"
              >
                <span>📄</span>
                <span>Letter PDF</span>
              </button>

              <button
                type="button"
                disabled={isExporting}
                onClick={() => handleDownloadPDF(true)}
                className="p-2.5 bg-[#FFFDF9] hover:bg-[#F5EEE0] border border-[#DDD0BC] rounded-md text-center transition-colors font-serif text-xs font-semibold text-[#2E2419] cursor-pointer disabled:opacity-50 flex items-center justify-center gap-1.5 shadow-2xs"
              >
                <span>✉️</span>
                <span>Envelope & Letter PDF</span>
              </button>

              <button
                type="button"
                disabled={isExporting}
                onClick={handleDownloadImage}
                className="p-2.5 bg-[#FFFDF9] hover:bg-[#F5EEE0] border border-[#DDD0BC] rounded-md text-center transition-colors font-serif text-xs font-semibold text-[#2E2419] cursor-pointer col-span-2 disabled:opacity-50 flex items-center justify-center gap-1.5 shadow-2xs"
              >
                <span>🖼️</span>
                <span>Save Image (PNG)</span>
              </button>
            </div>

            {exportStatus && (
              <div className="p-2 bg-[#FAF0DE] border border-[#E5D2B8] rounded text-center text-xs font-serif text-[#684920] animate-fade-in">
                {exportStatus}
              </div>
            )}

            <button
              type="button"
              onClick={() => onSetStep(2)}
              className="w-full py-2 bg-[#FAF8F2] hover:bg-[#F2ECE0] border border-[#DDD0BC] text-[#5C4533] rounded-md font-serif text-xs font-medium cursor-pointer"
            >
              ← Edit Card & Letter
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
