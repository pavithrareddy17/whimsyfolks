export type EnvelopeStyleId =
  | 'plain-cream'      // Clean plain ivory/cream linen envelope (Clean slate default!)
  | 'folk-floral'      // Image 1: Rich Hungarian/Scandinavian folk art botanical embroidery
  | 'vienna-lace'      // Image 8: Romantic burgundy wine lace pattern
  | 'candy-stripe'     // Image 2: Red/rose vertical candy stripes with star charms
  | 'crimson-velvet'   // Image 3: Deep rich crimson red with scalloped edges
  | 'blush-linen'      // Soft blush pink linen
  | 'soft-sage'        // Herb garden muted sage
  | 'kraft-rustic';    // Natural vintage kraft paper

export type PaperStyleId =
  | 'plain-ivory'        // Clean plain ivory card (Clean slate default!)
  | 'scalloped-linen'    // Image 3: Cream card with crimson red scalloped border
  | 'lace-doily'         // Image 4: Intricate cream lace doily border with ribbon bow
  | 'folk-botanical'     // Image 1: Folk art floral framing
  | 'candy-stripe-card'  // Image 2: Subtle candy stripe border
  | 'cotton-deckle'      // Deckled edge cotton handmade paper
  | 'vintage-parchment'  // Aged tea-stained parchment
  | 'lined-notebook';    // Vintage ruled journal paper

export type WaxSealMotif =
  | 'rose'             // Reference Images 1 & 2: Blooming garden rose
  | 'butterfly'        // Reference Image 1: Detailed engraved butterfly
  | 'strawberry'       // Reference Image 1: Sweet cottagecore strawberry
  | 'bunny'            // Reference Image 1: Cottontail bunny rabbit with wheat
  | 'tulip'            // Reference Image 1: Elegant tulip with leaves
  | 'swans'            // Reference Image 1: Twin swans forming a heart
  | 'ribbon-bow'       // Reference Image 1: Tied gift ribbon bow
  | 'love'             // Reference Image 1: Retro bubble "LOVE" lettering
  | 'heart-wreath'     // Reference Image 2: Heart in circular laurel wreath
  | 'heart-balloons'   // Reference Image 2: Heart balloons bouquet with bow
  | 'sword-rose'       // Reference Image 2: Dagger through rose
  | 'botanical'        // Wildflower dandelion / botanical sprig
  | 'bee'              // Vintage honeybee
  | 'monogram';        // Ornate calligraphy initials

export type WaxColor =
  | 'crimson-velvet'   // Reference Image 2: Deep rich crimson red
  | 'ruby-wine'        // Reference Image 2: Dark romantic wine red
  | 'metallic-bronze'  // Reference Image 2: Antique burnished metallic bronze
  | 'dusty-mauve'      // Reference Image 1: Muted lavender lilac mauve
  | 'blush-pink'       // Reference Image 1: Soft rose quartz pink
  | 'antique-gold'     // Warm gilded antique gold
  | 'dusty-sage'       // Herb garden green
  | 'terracotta';      // Burnt orange clay

export type WaxRimShape =
  | 'organic-melted'   // Melted organic wax puddle with drips
  | 'round-classic'    // Traditional round beveled coin rim
  | 'oval-vintage'     // Slender vintage oval
  | 'ruffled-petal';   // Petal-scalloped melted rim

export type EnvelopeDecorId =
  | 'none'
  | 'golden-stars'     // Image 2: Brass celestial star charms
  | 'gingham-bow'      // Image 7: Red & white gingham fabric bow
  | 'red-satin-bow'    // Image 4: Red satin ribbon bow
  | 'pearl-buttons'    // Vintage mother-of-pearl buttons
  | 'dried-florals';   // Pressed botanical sprig

export type StickerId =
  | 'birthday-cake'          // Whimsical tiered birthday cake with candles & bows
  | 'happy-birthday-cutout'  // Newspaper/scrapbook collage "HAPPY BIRTHDAY" letters
  | 'gingham-bow'            // Gingham checkered ribbon bow
  | 'red-satin-bow'          // Silky red satin ribbon bow
  | 'golden-stars'           // Antique brass star charms with shimmer
  | 'vintage-button'         // Mother-of-pearl carved button with thread
  | 'pressed-daisy'          // Botanical pressed wildflower daisy
  | 'lavender-sprig'         // Dried lavender botanical sprig
  | 'sweet-heart'            // Hand-drawn sketch heart
  | 'cottage-strawberry'     // Sweet ripe strawberry with blossom
  | 'storybook-bunny'        // Vintage storybook cottontail bunny
  | 'vintage-teacup'         // Delicate floral china teacup
  | 'enchanted-mushroom'     // Red polka dot cottagecore mushroom
  | 'honey-bee';             // Golden bumblebee with gossamer wings

export interface PlacedSticker {
  id: string;
  type: StickerId;
  target: 'envelope' | 'card'; // can be placed on envelope or card
  x: number; // percentage from left (0 to 100%)
  y: number; // percentage from top (0 to 100%)
  rotation?: number; // degrees (-30 to 30)
  scale?: number; // scale multiplier
  // Backwards compatibility for older preset formats
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center-top';
}

export type FontChoice =
  | 'cedarville'
  | 'caveat'
  | 'playfair'
  | 'courier'
  | 'garamond'
  | 'homemade'
  | 'alex-brush';

export type InkColor =
  | 'crimson'
  | 'sepia'
  | 'espresso'
  | 'charcoal'
  | 'dried-rose'
  | 'forest'
  | 'indigo';

export interface LetterData {
  id: string;
  updatedAt: number;

  // STEP 1: Envelope & Outer Styling (Starts completely plain!)
  envelopeStyle: EnvelopeStyleId;
  envelopeFlap: 'peaked' | 'rounded' | 'square' | 'scalloped';
  envelopeDecor: EnvelopeDecorId;
  waxSealMotif: WaxSealMotif;
  waxSealMonogramLetter: string;
  waxColor: WaxColor;
  waxRimShape?: WaxRimShape;
  waxGilded?: boolean;
  recipientName: string;
  senderName: string;
  recipientAddress?: string;
  senderLocation?: string;

  // STEP 2: Letter Paper & Whimsical Stickers
  paperStyle: PaperStyleId;
  stickers: PlacedSticker[];
  fontChoice: FontChoice;
  inkColor: InkColor;
  textAlign: 'left' | 'center' | 'justify';

  // Letter Text Content
  dateHeading: string;
  salutation: string;
  title: string;
  body: string;
  signoff: string;
  postscript: string;
}
