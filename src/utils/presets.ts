import { LetterData } from '../types/stationery';

export const DEFAULT_LETTER: LetterData = {
  id: 'letter-default',
  updatedAt: Date.now(),

  // STEP 1: Starts completely plain as requested!
  envelopeStyle: 'plain-cream', // Clean blank slate
  envelopeFlap: 'peaked',
  envelopeDecor: 'none',
  waxSealMotif: 'botanical',
  waxSealMonogramLetter: 'W',
  waxColor: 'terracotta',
  recipientName: 'Dearest Friend',
  senderName: 'Your Companion',

  // STEP 2: Starts with clean paper, no stickers yet (build as you go)
  paperStyle: 'plain-ivory',
  stickers: [],
  fontChoice: 'cedarville',
  inkColor: 'crimson',
  textAlign: 'left',

  // Letter Text Content
  dateHeading: 'A quiet morning',
  salutation: 'Dearest Friend,',
  title: 'A little note from my desk',
  body: `The morning sun is streaming through the window, and I wanted to send this gentle dispatch to you.

I hope life is treating you with tenderness and sweet surprises today. May this little note bring a smile to your heart whenever you unfold it.`,
  signoff: 'With warmth and fondness,',
  postscript: 'P.S. Write back whenever you have a quiet moment.',
};

export interface GuidedPreset {
  id: string;
  name: string;
  tagline: string;
  previewColor: string;
  data: Partial<LetterData>;
}

export const GUIDED_PRESETS: GuidedPreset[] = [
  {
    id: 'clean-slate',
    name: 'Plain Minimalist Slate',
    tagline: 'Clean ivory envelope & card without decorations',
    previewColor: '#FAF5EA',
    data: {
      envelopeStyle: 'plain-cream',
      envelopeDecor: 'none',
      paperStyle: 'plain-ivory',
      stickers: [],
      waxColor: 'terracotta',
      waxSealMotif: 'botanical',
    },
  },
  {
    id: 'folk-birthday',
    name: 'Folk Birthday Celebration',
    tagline: 'Folk floral envelope with tiered cake sticker & red scalloped card',
    previewColor: '#B83232',
    data: {
      envelopeStyle: 'folk-floral',
      envelopeDecor: 'golden-stars',
      paperStyle: 'scalloped-linen',
      stickers: [
        { id: 'bday-1', type: 'birthday-cake', target: 'card', x: 80, y: 15, rotation: 3 },
        { id: 'bday-2', type: 'happy-birthday-cutout', target: 'card', x: 50, y: 8, rotation: -2 },
        { id: 'bday-3', type: 'gingham-bow', target: 'envelope', x: 20, y: 25, rotation: -5 },
      ],
      fontChoice: 'caveat',
      inkColor: 'crimson',
      salutation: 'Happy Birthday, Wonderful Soul!',
      title: 'May your sweetest wishes come true',
      body: `Wishing you a day filled with laughter that rings like bells, warm slices of berry cake, and all the love this world has to offer!

Blow out the candles and make the biggest wish!`,
      signoff: 'With endless birthday hugs,',
      postscript: 'P.S. Save the biggest slice of frosted cake for me!',
    },
  },
  {
    id: 'vienna-romance',
    name: 'Vienna Lace Romance',
    tagline: 'Burgundy wine sheer lace envelope with cream lace card and red satin bow',
    previewColor: '#5C1E28',
    data: {
      envelopeStyle: 'vienna-lace',
      envelopeDecor: 'red-satin-bow',
      paperStyle: 'lace-doily',
      stickers: [
        { id: 'vienna-1', type: 'red-satin-bow', target: 'card', x: 18, y: 15, rotation: -4 },
        { id: 'vienna-2', type: 'sweet-heart', target: 'envelope', x: 75, y: 70, rotation: 6 },
      ],
      waxColor: 'ruby-wine',
      waxSealMotif: 'heart-wreath',
      fontChoice: 'homemade',
      inkColor: 'dried-rose',
      salutation: 'My Beloved,',
      title: 'Written by the glow of candlelight',
      body: `Every time I hold this pen, my thoughts wander straight to you. You are woven into the quiet moments of my days, like sunlight filtering through morning lace.`,
      signoff: 'Yours eternally,',
      postscript: 'Counting the seconds until we walk together again.',
    },
  },
  {
    id: 'candy-stripes',
    name: 'Candy Stripe Pen Pal',
    tagline: 'Festive red candy stripes with golden star charms and typewriter font',
    previewColor: '#E87D88',
    data: {
      envelopeStyle: 'candy-stripe',
      envelopeDecor: 'golden-stars',
      paperStyle: 'candy-stripe-card',
      stickers: [
        { id: 'cs-1', type: 'golden-stars', target: 'envelope', x: 82, y: 22, rotation: 12 },
      ],
      fontChoice: 'courier',
      inkColor: 'charcoal',
      salutation: 'Dear Pen Pal,',
      title: 'Dispatch from the Attic Desk',
      body: `Here is a cheerful note to brighten your week! The autumn breeze has set the leaves dancing, and I could not resist sitting down with an extra mug of cocoa to write to you.`,
      signoff: 'Warmest regards from afar,',
      postscript: 'P.S. Do write back soon!',
    },
  },
];
