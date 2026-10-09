import { LetterData } from '../types/stationery';
import { DEFAULT_LETTER } from './presets';

const STORAGE_KEY = 'billet_doux_saved_letters';
const CURRENT_LETTER_KEY = 'billet_doux_current';

/**
 * Safely encode Unicode JSON object to URL-safe base64 string
 */
export function encodeLetterToHash(letter: LetterData): string {
  try {
    const jsonStr = JSON.stringify(letter);
    // Handle UTF-8 characters safely
    const bytes = new TextEncoder().encode(jsonStr);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    const base64 = btoa(binary);
    // Make URL friendly
    return encodeURIComponent(base64);
  } catch (err) {
    console.error('Failed to encode letter', err);
    return '';
  }
}

/**
 * Decode URL-safe base64 string to LetterData
 */
export function decodeLetterFromHash(encodedStr: string): LetterData | null {
  try {
    const cleanStr = decodeURIComponent(encodedStr);
    const binary = atob(cleanStr);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    const jsonStr = new TextDecoder().decode(bytes);
    const parsed = JSON.parse(jsonStr);
    // Merge with default letter to guarantee all keys exist
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
