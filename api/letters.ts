interface VercelReq {
  method?: string;
  body?: any;
  query: Record<string, string | string[]>;
}

interface VercelRes {
  setHeader(name: string, value: string): void;
  status(code: number): VercelRes;
  json(data: any): void;
  end(): void;
}

// Global in-memory storage for Vercel serverless functions
declare global {
  // eslint-disable-next-line no-var
  var __lettersStore: Map<string, { letter: any; createdAt: number }> | undefined;
}

if (!globalThis.__lettersStore) {
  globalThis.__lettersStore = new Map();
}

function generateShortId(): string {
  const chars = '23456789abcdefghjkmnpqrstuvwxyz';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export default async function handler(req: VercelReq, res: VercelRes) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const store = globalThis.__lettersStore!;

  if (req.method === 'POST') {
    try {
      const { letter } = req.body || {};
      if (!letter) {
        return res.status(400).json({ error: 'Missing letter data' });
      }

      let id = generateShortId();
      while (store.has(id)) {
        id = generateShortId();
      }

      store.set(id, { letter, createdAt: Date.now() });
      return res.status(200).json({ id, success: true });
    } catch (err: any) {
      return res.status(500).json({ error: err?.message || 'Server error' });
    }
  }

  if (req.method === 'GET') {
    const { id } = req.query;
    if (typeof id === 'string' && store.has(id)) {
      const data = store.get(id);
      return res.status(200).json({ id, letter: data?.letter, createdAt: data?.createdAt });
    }
    return res.status(404).json({ error: 'Letter not found' });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
