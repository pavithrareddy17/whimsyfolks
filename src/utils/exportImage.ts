import { toPng } from 'html-to-image';
import { createRoot } from 'react-dom/client';
import React from 'react';
import { LetterData } from '../types/stationery';
import { LetterPaper } from '../components/LetterPaper';

/**
 * Downloads a high-resolution PNG of the customized letter paper.
 * If printable-letter-paper is currently rendered in the DOM, it captures that directly.
 * Otherwise, it renders LetterPaper in a hidden off-screen node to generate the PNG.
 */
export async function downloadLetterAsPng(letter: LetterData): Promise<void> {
  const existingNode = document.getElementById('printable-letter-paper');
  let targetNode: HTMLElement | null = existingNode;
  let tempContainer: HTMLDivElement | null = null;
  let root: ReturnType<typeof createRoot> | null = null;

  if (!targetNode) {
    tempContainer = document.createElement('div');
    tempContainer.style.position = 'fixed';
    tempContainer.style.left = '-9999px';
    tempContainer.style.top = '0';
    tempContainer.style.width = '640px';
    tempContainer.style.zIndex = '-1000';
    tempContainer.style.opacity = '1';
    tempContainer.style.pointerEvents = 'none';
    document.body.appendChild(tempContainer);

    root = createRoot(tempContainer);
    root.render(React.createElement(LetterPaper, { letter, isEditable: false }));

    // Wait for DOM paint and styles
    await new Promise((resolve) => setTimeout(resolve, 200));
    targetNode = (tempContainer.querySelector('#printable-letter-paper') as HTMLElement) || tempContainer;
  }

  try {
    const dataUrl = await toPng(targetNode, {
      quality: 0.98,
      pixelRatio: 2.5,
      cacheBust: true,
    });

    const safeRecipient = (letter.recipientName || '')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    const filename = safeRecipient ? `whimsifolks-${safeRecipient}.png` : 'whimsifolks.png';

    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } finally {
    if (tempContainer) {
      if (root) {
        root.unmount();
      }
      if (tempContainer.parentNode) {
        tempContainer.parentNode.removeChild(tempContainer);
      }
    }
  }
}
