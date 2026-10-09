import React, { useRef, useState, useEffect } from 'react';
import { PlacedSticker } from '../types/stationery';
import { WhimsicalSticker } from './WhimsicalAssets';
import { sounds } from '../utils/soundEffects';

interface DraggableStickerProps {
  sticker: PlacedSticker;
  isInteractive?: boolean;
  onUpdatePosition?: (id: string, x: number, y: number) => void;
  onRemove?: (id: string) => void;
  className?: string;
}

export const DraggableSticker: React.FC<DraggableStickerProps> = ({
  sticker,
  isInteractive = true,
  onUpdatePosition,
  onRemove,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [pos, setPos] = useState({ x: sticker.x ?? 50, y: sticker.y ?? 50 });

  // Sync external position changes
  useEffect(() => {
    if (!isDragging) {
      setPos({ x: sticker.x ?? 50, y: sticker.y ?? 50 });
    }
  }, [sticker.x, sticker.y, isDragging]);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!isInteractive || !onUpdatePosition) return;
    // Don't drag if clicking remove button
    if ((e.target as HTMLElement).closest('.sticker-remove-btn')) return;

    e.preventDefault();
    e.stopPropagation();

    const parent = containerRef.current?.parentElement;
    if (!parent) return;

    setIsDragging(true);
    sounds.playPaperRustle();

    const startRect = parent.getBoundingClientRect();

    const handlePointerMove = (moveEv: PointerEvent) => {
      moveEv.preventDefault();
      const parentRect = parent.getBoundingClientRect();
      const rawX = ((moveEv.clientX - parentRect.left) / parentRect.width) * 100;
      const rawY = ((moveEv.clientY - parentRect.top) / parentRect.height) * 100;

      // Clamp coordinates within 4% and 96%
      const clampedX = Math.max(5, Math.min(95, Math.round(rawX * 10) / 10));
      const clampedY = Math.max(5, Math.min(95, Math.round(rawY * 10) / 10));

      setPos({ x: clampedX, y: clampedY });
    };

    const handlePointerUp = (upEv: PointerEvent) => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);

      setIsDragging(false);

      const parentRect = parent.getBoundingClientRect();
      const finalX = Math.max(5, Math.min(95, Math.round(((upEv.clientX - parentRect.left) / parentRect.width) * 1000) / 10));
      const finalY = Math.max(5, Math.min(95, Math.round(((upEv.clientY - parentRect.top) / parentRect.height) * 1000) / 10));

      sounds.playStampThud();
      onUpdatePosition(sticker.id, finalX, finalY);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: false });
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);
  };

  const rotation = sticker.rotation ?? 0;

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        left: `${pos.x}%`,
        top: `${pos.y}%`,
        transform: `translate(-50%, -50%) rotate(${rotation}deg) scale(${isDragging ? 1.08 : 1})`,
        zIndex: isDragging ? 50 : 20,
        touchAction: 'none',
      }}
      className={`absolute select-none transition-[box-shadow,transform] duration-150 group ${
        isInteractive ? 'cursor-grab active:cursor-grabbing' : 'pointer-events-none'
      } ${className}`}
    >
      {/* Visual Sticker Graphic */}
      <div className="relative">
        <WhimsicalSticker type={sticker.type} />

        {/* Tactile Grab Indicator & Remove Button (visible on hover/active in editing mode) */}
        {isInteractive && (isHovered || isDragging) && (
          <div className="absolute -top-3 -right-3 flex items-center gap-1 z-30 animate-fade-in pointer-events-auto">
            {onRemove && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  sounds.playPenClick();
                  onRemove(sticker.id);
                }}
                className="sticker-remove-btn w-6 h-6 rounded-full bg-[#8F2424] hover:bg-[#6E1515] text-white flex items-center justify-center text-xs font-bold shadow-md cursor-pointer transition-transform hover:scale-110 border border-white"
                title="Remove sticker"
              >
                ✕
              </button>
            )}
          </div>
        )}

        {/* Drag Hint Outline when hovered */}
        {isInteractive && isHovered && !isDragging && (
          <div className="absolute inset-0 -m-1 border border-dashed border-[#8F3F35]/50 rounded-lg pointer-events-none animate-pulse" />
        )}
      </div>
    </div>
  );
};
