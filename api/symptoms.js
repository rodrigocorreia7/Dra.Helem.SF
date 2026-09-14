import supabase from './db-client.js';

const ALLOWED_AUDIENCES = new Set(['mulheres', 'homens', 'geral', 'todos']);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'GET') {
      const { audience } = req.query || {};
      let query = supabase
        .from('symptoms')
        .select('id, title, description, audience, icon, sort_order')
        .order('sort_order', { ascending: true });

      if (audience && typeof audience === 'string' && ALLOWED_AUDIENCES.has(audience)) {
        query = query.eq('audience', audience);
      }

      const { data, error } = await query;
      if (error) throw error;
      return res.status(200).json(data);
    }
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API Error [symptoms]:', err);
    return res.status(500).json({ error: 'Erro interno ao carregar sintomas.' });
  }
}
