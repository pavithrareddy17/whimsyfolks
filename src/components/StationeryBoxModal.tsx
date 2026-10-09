import React from 'react';
import { LetterData } from '../types/stationery';
import { deleteSavedLetter, getSavedLetters } from '../utils/serialization';
import { sounds } from '../utils/soundEffects';

interface StationeryBoxModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLetter: (letter: LetterData) => void;
  onNewLetter: () => void;
  currentLetterId: string;
}

export const StationeryBoxModal: React.FC<StationeryBoxModalProps> = ({
  isOpen,
  onClose,
  onSelectLetter,
  onNewLetter,
  currentLetterId,
}) => {
  const [letters, setLetters] = React.useState<LetterData[]>([]);

  React.useEffect(() => {
    if (isOpen) {
      setLetters(getSavedLetters());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = deleteSavedLetter(id);
    setLetters(updated);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="relative w-full max-w-md bg-[#FAF7F0] border border-[#D5C6AF] rounded-lg shadow-2xl p-6 text-[#3D3226]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E2D6C5] pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🗃️</span>
            <div>
              <h3 className="font-serif text-lg font-medium text-[#2E2419]">
                My Stationery Box
              </h3>
              <p className="text-[11px] text-[#7A6A56] font-serif italic">
                Saved letter drafts and recent creations
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#7A6A56] hover:text-[#2E2419] rounded-md transition-colors"
          >
            ✕
          </button>
        </div>

        {/* New Letter Button */}
        <button
          type="button"
          onClick={() => {
            sounds.playPaperRustle();
            onNewLetter();
            onClose();
          }}
          className="w-full mb-4 py-2 px-3 bg-[#8F3F35] hover:bg-[#7D3229] text-[#FAF5EB] rounded-md text-xs font-serif font-medium transition-colors shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <span>✍</span> Start a Fresh New Letter
        </button>

        {/* Saved Letters List */}
        <div className="max-h-72 overflow-y-auto space-y-2 pr-1">
          {letters.length === 0 ? (
            <div className="text-center py-8 text-xs text-[#8C765C] font-serif italic">
              Your stationery box is currently empty. Any letters you customize are automatically saved here!
            </div>
          ) : (
            letters.map((l) => {
              const isCurrent = l.id === currentLetterId;
              const dateStr = new Date(l.updatedAt || Date.now()).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
              });

              return (
                <div
                  key={l.id}
                  onClick={() => {
                    sounds.playPaperRustle();
                    onSelectLetter(l);
                    onClose();
                  }}
                  className={`p-3 rounded-md border text-left transition-all cursor-pointer flex items-center justify-between group ${
                    isCurrent
                      ? 'border-[#8F3F35] bg-[#FFFDF9] ring-1 ring-[#8F3F35]'
                      : 'border-[#DDD0BC] bg-[#FAF8F2] hover:bg-[#F3ECE0]'
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-serif text-xs font-semibold text-[#2E2419] truncate">
                        {l.title || l.salutation || 'Untitled Letter'}
                      </span>
                      {isCurrent && (
                        <span className="text-[10px] px-1.5 py-0.2 bg-[#EAD8D8] text-[#7A3F49] rounded-xs font-mono">
                          Current
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-[#7A6A56] truncate mt-0.5 font-serif italic">
                      For: {l.recipientName || 'Unknown recipient'} · {dateStr}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => handleDelete(l.id, e)}
                    className="opacity-0 group-hover:opacity-100 p-1 text-[#8C765C] hover:text-[#B33E3E] transition-opacity ml-2"
                    title="Delete letter draft"
                  >
                    🗑
                  </button>
                </div>
              );
            })
          )}
        </div>

        <div className="mt-4 pt-3 border-t border-[#E2D6C5] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-serif text-[#6E5A44] hover:text-[#2E2419]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
