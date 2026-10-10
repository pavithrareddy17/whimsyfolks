interface VercelReq {
  method?: string;
  query: Record<string, string | string[]>;
}

interface VercelRes {
  setHeader(name: string, value: string): void;
  status(code: number): VercelRes;
  json(data: any): void;
  end(): void;
}

declare global {
  // eslint-disable-next-line no-var
  var __lettersStore: Map<string, { letter: any; createdAt: number }> | undefined;
}

if (!globalThis.__lettersStore) {
  globalThis.__lettersStore = new Map();
}

export default async function handler(req: VercelReq, res: VercelRes) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { id } = req.query;
  const store = globalThis.__lettersStore!;

  if (typeof id === 'string' && store.has(id)) {
    const data = store.get(id);
    return res.status(200).json({ id, letter: data?.letter, createdAt: data?.createdAt });
  }

  return res.status(404).json({ error: 'Letter not found' });
}
