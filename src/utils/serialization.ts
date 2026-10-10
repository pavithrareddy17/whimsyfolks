import LZString from 'lz-string';
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
import { DEFAULT_LETTER } from './presets';

const STORAGE_KEY = 'billet_doux_saved_letters';
const CURRENT_LETTER_KEY = 'billet_doux_current';

// Compact index dictionaries for ultra-short URLs
const ENVELOPE_STYLES: readonly EnvelopeStyleId[] = [
  'plain-cream',
  'folk-floral',
  'vienna-lace',
  'candy-stripe',
  'crimson-velvet',
  'blush-linen',
  'soft-sage',
  'kraft-rustic',
];

const ENVELOPE_FLAPS = ['peaked', 'rounded', 'square', 'scalloped'] as const;

const ENVELOPE_DECORS: readonly EnvelopeDecorId[] = [
  'none',
  'golden-stars',
  'gingham-bow',
  'red-satin-bow',
  'pearl-buttons',
  'dried-florals',
];

const PAPER_STYLES: readonly PaperStyleId[] = [
  'plain-ivory',
  'scalloped-linen',
  'lace-doily',
  'folk-botanical',
  'candy-stripe-card',
  'cotton-deckle',
  'vintage-parchment',
  'lined-notebook',
];

const WAX_MOTIFS: readonly WaxSealMotif[] = [
  'rose',
  'butterfly',
  'strawberry',
  'bunny',
  'tulip',
  'swans',
  'ribbon-bow',
  'love',
  'heart-wreath',
  'heart-balloons',
  'sword-rose',
  'botanical',
  'bee',
  'monogram',
];

const WAX_COLORS: readonly WaxColor[] = [
  'crimson-velvet',
  'ruby-wine',
  'metallic-bronze',
  'dusty-mauve',
  'blush-pink',
  'antique-gold',
  'dusty-sage',
  'terracotta',
];

const WAX_RIMS: readonly WaxRimShape[] = [
  'organic-melted',
  'round-classic',
  'oval-vintage',
  'ruffled-petal',
];

const STICKER_TYPES: readonly StickerId[] = [
  'birthday-cake',
  'happy-birthday-cutout',
  'gingham-bow',
  'red-satin-bow',
  'golden-stars',
  'vintage-button',
  'pressed-daisy',
  'lavender-sprig',
  'sweet-heart',
  'cottage-strawberry',
  'storybook-bunny',
  'vintage-teacup',
  'enchanted-mushroom',
  'honey-bee',
];

const FONTS: readonly FontChoice[] = [
  'cedarville',
  'caveat',
  'playfair',
  'courier',
  'garamond',
  'homemade',
  'alex-brush',
];

const INKS: readonly InkColor[] = [
  'crimson',
  'sepia',
  'espresso',
  'charcoal',
  'dried-rose',
  'forest',
  'indigo',
];

const TEXT_ALIGNS = ['left', 'center', 'justify'] as const;

/**
 * Compact schema structure to achieve ultra-short URL links
 */
interface CompactLetterPayload {
  v: 2;
  r: string; // recipientName
  s: string; // senderName
  a: string; // salutation
  t: string; // title
  b: string; // body
  o: string; // signoff
  d: string; // dateHeading
  p?: string; // postscript
  // Style indices: [envStyle, envFlap, envDecor, paperStyle, waxMotif, waxColor, waxRim, waxGilded, monoLetter, font, ink, textAlign]
  sty: [number, number, number, number, number, number, number, number, string, number, number, number];
  // Stickers: [typeIdx, target (0=card, 1=env), x, y, rotation]
  stk: [number, number, number, number, number][];
}

/**
 * Ultra-compact encoder using LZ-String compression and index packing.
 * Shrinks URLs by 70-85% compared to raw base64 JSON.
 */
export function encodeLetterToShortHash(letter: LetterData): string {
  try {
    const payload: CompactLetterPayload = {
      v: 2,
      r: letter.recipientName || '',
      s: letter.senderName || '',
      a: letter.salutation || '',
      t: letter.title || '',
      b: letter.body || '',
      o: letter.signoff || '',
      d: letter.dateHeading || '',
      p: letter.postscript || '',
      sty: [
        Math.max(0, ENVELOPE_STYLES.indexOf(letter.envelopeStyle)),
        Math.max(0, ENVELOPE_FLAPS.indexOf(letter.envelopeFlap || 'peaked')),
        Math.max(0, ENVELOPE_DECORS.indexOf(letter.envelopeDecor || 'none')),
        Math.max(0, PAPER_STYLES.indexOf(letter.paperStyle)),
        Math.max(0, WAX_MOTIFS.indexOf(letter.waxSealMotif || 'rose')),
        Math.max(0, WAX_COLORS.indexOf(letter.waxColor || 'crimson-velvet')),
        Math.max(0, WAX_RIMS.indexOf(letter.waxRimShape || 'organic-melted')),
        letter.waxGilded ? 1 : 0,
        (letter.waxSealMonogramLetter || 'W').slice(0, 1).toUpperCase(),
        Math.max(0, FONTS.indexOf(letter.fontChoice || 'alex-brush')),
        Math.max(0, INKS.indexOf(letter.inkColor || 'sepia')),
        Math.max(0, TEXT_ALIGNS.indexOf(letter.textAlign || 'left')),
      ],
      stk: (letter.stickers || []).map((st) => [
        Math.max(0, STICKER_TYPES.indexOf(st.type)),
        st.target === 'envelope' ? 1 : 0,
        Math.round(st.x),
        Math.round(st.y),
        Math.round(st.rotation || 0),
      ]),
    };

    const compressed = LZString.compressToEncodedURIComponent(JSON.stringify(payload));
    return compressed;
  } catch (err) {
    console.error('Failed to encode letter with LZ compression, falling back', err);
    return encodeLetterToLegacyHash(letter);
  }
}

/**
 * Legacy base64 encoder kept for fallback
 */
function encodeLetterToLegacyHash(letter: LetterData): string {
  try {
    const jsonStr = JSON.stringify(letter);
    const bytes = new TextEncoder().encode(jsonStr);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    const base64 = btoa(binary);
    return encodeURIComponent(base64);
  } catch (err) {
    console.error('Failed to encode legacy letter', err);
    return '';
  }
}

/**
 * Local cache for short letter IDs
 */
function cacheShortLetter(id: string, letter: LetterData) {
  try {
    const raw = localStorage.getItem('billet_short_letters') || '{}';
    const map = JSON.parse(raw);
    map[id] = letter;
    localStorage.setItem('billet_short_letters', JSON.stringify(map));
  } catch {
    // Ignore storage errors
  }
}

function getCachedShortLetter(id: string): LetterData | null {
  try {
    const raw = localStorage.getItem('billet_short_letters');
    if (raw) {
      const map = JSON.parse(raw);
      if (map[id]) return map[id];
    }
  } catch {
    // Ignore
  }
  return null;
}

/**
 * Standard encode function: outputs the ultra-short hash
 */
export function encodeLetterToHash(letter: LetterData): string {
  return encodeLetterToShortHash(letter);
}

/**
 * Generate full clean shareable URL with compact #l= hash (synchronous fallback)
 */
export function createLetterShareUrl(letter: LetterData): string {
  const code = encodeLetterToShortHash(letter);
  const origin = window.location.origin + window.location.pathname;
  return `${origin}#l=${code}`;
}

/**
 * Generates an ultra-short one-line URL via the backend service (e.g. https://...#l=abc123),
 * with instant local caching and graceful fallback.
 */
export async function generateOneLineShareUrl(letter: LetterData): Promise<string> {
  const origin = window.location.origin + window.location.pathname;

  try {
    const res = await fetch('/api/letters', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ letter }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data && data.id) {
        cacheShortLetter(data.id, letter);
        return `${origin}#l=${data.id}`;
      }
    }
  } catch (err) {
    console.warn('Could not reach backend /api/letters, falling back to local encoding', err);
  }

  // Graceful client-side fallback
  const code = encodeLetterToShortHash(letter);
  return `${origin}#l=${code}`;
}

/**
 * Resolves a letter from either a short 6-character code OR a compressed/legacy hash
 */
export async function resolveLetterFromCodeOrHash(codeOrHash: string): Promise<LetterData | null> {
  if (!codeOrHash) return null;

  const trimmed = codeOrHash.trim();

  // 1. If it looks like a short ID (6-16 alphanumeric characters)
  if (trimmed.length <= 16 && /^[a-zA-Z0-9_-]+$/.test(trimmed)) {
    // Check local cache first for instant resolution
    const cached = getCachedShortLetter(trimmed);
    if (cached) {
      return cached;
    }

    // Fetch from backend API
    try {
      const res = await fetch(`/api/letters/${encodeURIComponent(trimmed)}`);
      if (res.ok) {
        const data = await res.json();
        if (data && data.letter) {
          cacheShortLetter(trimmed, data.letter);
          return data.letter;
        }
      }
    } catch (err) {
      console.warn('Failed retrieving letter by short code:', err);
    }
  }

  // 2. Decode from LZString or legacy base64 hash
  return decodeLetterFromHash(trimmed);
}

/**
 * Decode from hash, supporting both new ultra-compact LZ format and legacy base64 format
 */
export function decodeLetterFromHash(encodedStr: string): LetterData | null {
  if (!encodedStr) return null;

  // 1. Try new ultra-compact LZString decompression first
  try {
    const decompressed = LZString.decompressFromEncodedURIComponent(encodedStr);
    if (decompressed) {
      const parsed = JSON.parse(decompressed);
      if (parsed && parsed.v === 2) {
        const sty = parsed.sty || [];
        const reconstructedStickers: PlacedSticker[] = (parsed.stk || []).map((s: number[], idx: number) => ({
          id: `stk-${idx}-${Date.now()}`,
          type: STICKER_TYPES[s[0]] || 'birthday-cake',
          target: s[1] === 1 ? 'envelope' : 'card',
          x: s[2],
          y: s[3],
          rotation: s[4] || 0,
        }));

        const result: LetterData = {
          ...DEFAULT_LETTER,
          id: `letter-${Date.now()}`,
          updatedAt: Date.now(),
          recipientName: parsed.r ?? DEFAULT_LETTER.recipientName,
          senderName: parsed.s ?? DEFAULT_LETTER.senderName,
          salutation: parsed.a ?? DEFAULT_LETTER.salutation,
          title: parsed.t ?? DEFAULT_LETTER.title,
          body: parsed.b ?? DEFAULT_LETTER.body,
          signoff: parsed.o ?? DEFAULT_LETTER.signoff,
          dateHeading: parsed.d ?? DEFAULT_LETTER.dateHeading,
          postscript: parsed.p ?? '',
          envelopeStyle: ENVELOPE_STYLES[sty[0]] || DEFAULT_LETTER.envelopeStyle,
          envelopeFlap: ENVELOPE_FLAPS[sty[1]] || 'peaked',
          envelopeDecor: ENVELOPE_DECORS[sty[2]] || 'none',
          paperStyle: PAPER_STYLES[sty[3]] || DEFAULT_LETTER.paperStyle,
          waxSealMotif: WAX_MOTIFS[sty[4]] || 'rose',
          waxColor: WAX_COLORS[sty[5]] || 'crimson-velvet',
          waxRimShape: WAX_RIMS[sty[6]] || 'organic-melted',
          waxGilded: sty[7] === 1,
          waxSealMonogramLetter: sty[8] || 'W',
          fontChoice: FONTS[sty[9]] || DEFAULT_LETTER.fontChoice,
          inkColor: INKS[sty[10]] || DEFAULT_LETTER.inkColor,
          textAlign: TEXT_ALIGNS[sty[11]] || 'left',
          stickers: reconstructedStickers,
        };

        return result;
      }
    }
  } catch {
    // Continue to fallback
  }

  // 2. Fallback to legacy base64 decode for older shared links
  try {
    const cleanStr = decodeURIComponent(encodedStr);
    const binary = atob(cleanStr);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    const jsonStr = new TextDecoder().decode(bytes);
    const parsed = JSON.parse(jsonStr);
    return { ...DEFAULT_LETTER, ...parsed };
  } catch (err) {
    console.error('Failed to decode letter', err);
    return null;
  }
}

/**
 * Save letter to localStorage
 */
export function saveLetterToStorage(letter: LetterData) {
  try {
    localStorage.setItem(CURRENT_LETTER_KEY, JSON.stringify(letter));
    // Also save to library
    const library = getSavedLetters();
    const existingIdx = library.findIndex((l) => l.id === letter.id);
    if (existingIdx >= 0) {
      library[existingIdx] = letter;
    } else {
      library.unshift(letter);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(library.slice(0, 20)));
  } catch (e) {
    console.warn('Storage save error', e);
  }
}

/**
 * Get current draft or default
 */
export function loadCurrentDraft(): LetterData {
  try {
    const saved = localStorage.getItem(CURRENT_LETTER_KEY);
    if (saved) {
      return { ...DEFAULT_LETTER, ...JSON.parse(saved) };
    }
  } catch {
    // fallback
  }
  return DEFAULT_LETTER;
}

/**
 * Retrieve saved letter library
 */
export function getSavedLetters(): LetterData[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch {
    // fallback
  }
  return [];
}

/**
 * Delete a saved letter from library
 */
export function deleteSavedLetter(id: string): LetterData[] {
  try {
    const list = getSavedLetters().filter((l) => l.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    return list;
  } catch {
    return [];
  }
}
