import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = parseInt(process.env.PORT || '3000', 10);
const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'letters.json');

// Ensure data storage directory exists
if (!fs.existsSync(DATA_DIR)) {
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  } catch (err) {
    console.warn('Could not create data directory:', err);
  }
}

// In-memory letter cache + persistent JSON backing
interface LetterRecord {
  id: string;
  letter: any;
  createdAt: number;
  viewsCount?: number;
  lastOpenedAt?: number;
}

let letterStore: Record<string, LetterRecord> = {};

function loadStoredLetters(): Record<string, LetterRecord> {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error('Failed reading data file:', err);
  }
  return {};
}

function saveStoredLetters(data: Record<string, LetterRecord>) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed saving data file:', err);
  }
}

letterStore = loadStoredLetters();

// Generates concise, unambiguous 6-character short code for clean one-line links
function generateShortId(): string {
  const chars = '23456789abcdefghjkmnpqrstuvwxyz';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '10mb' }));

  // API endpoint: save letter and return short one-line code
  app.post('/api/letters', (req, res) => {
    try {
      const { letter } = req.body;
      if (!letter) {
        return res.status(400).json({ error: 'Missing letter data' });
      }

      let id = generateShortId();
      while (letterStore[id]) {
        id = generateShortId();
      }

      const record: LetterRecord = {
        id,
        letter,
        createdAt: Date.now(),
        viewsCount: 0,
      };

      letterStore[id] = record;
      saveStoredLetters(letterStore);

      return res.json({ id, success: true });
    } catch (err) {
      console.error('Error saving letter:', err);
      return res.status(500).json({ error: 'Failed to save letter' });
    }
  });

  // API endpoint: retrieve letter by short code (tracks views & opens)
  app.get('/api/letters/:id', (req, res) => {
    try {
      const { id } = req.params;
      const record = letterStore[id];
      if (!record || !record.letter) {
        return res.status(404).json({ error: 'Letter not found' });
      }

      // Record views/opens
      record.viewsCount = (record.viewsCount || 0) + 1;
      record.lastOpenedAt = Date.now();
      saveStoredLetters(letterStore);

      return res.json({
        id: record.id,
        letter: record.letter,
        createdAt: record.createdAt,
        viewsCount: record.viewsCount,
        lastOpenedAt: record.lastOpenedAt,
      });
    } catch (err) {
      console.error('Error retrieving letter:', err);
      return res.status(500).json({ error: 'Failed to retrieve letter' });
    }
  });

  // API endpoint: database portal list all letters & analytics
  app.get('/api/portal/letters', (_req, res) => {
    try {
      const list = Object.values(letterStore).sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

      let totalOpens = 0;
      const waxMotifCounts: Record<string, number> = {};
      const paperStyleCounts: Record<string, number> = {};

      for (const item of list) {
        totalOpens += item.viewsCount || 0;
        if (item.letter?.waxSealMotif) {
          waxMotifCounts[item.letter.waxSealMotif] = (waxMotifCounts[item.letter.waxSealMotif] || 0) + 1;
        }
        if (item.letter?.paperStyle) {
          paperStyleCounts[item.letter.paperStyle] = (paperStyleCounts[item.letter.paperStyle] || 0) + 1;
        }
      }

      const topMotif = Object.entries(waxMotifCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'rose';
      const topPaper = Object.entries(paperStyleCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'plain-ivory';

      return res.json({
        letters: list,
        stats: {
          totalLetters: list.length,
          totalOpens,
          topMotif,
          topPaper,
        },
      });
    } catch (err) {
      console.error('Error fetching portal letters:', err);
      return res.status(500).json({ error: 'Failed to fetch portal data' });
    }
  });

  // API endpoint: delete a letter record by ID
  app.delete('/api/portal/letters/:id', (req, res) => {
    try {
      const { id } = req.params;
      if (!letterStore[id]) {
        return res.status(404).json({ error: 'Letter not found' });
      }
      delete letterStore[id];
      saveStoredLetters(letterStore);
      return res.json({ success: true, id });
    } catch (err) {
      console.error('Error deleting letter:', err);
      return res.status(500).json({ error: 'Failed to delete letter' });
    }
  });

  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Billet-Doux server active on port ${PORT}`);
  });
}

startServer();
