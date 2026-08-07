import supabase from './db-client.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'GET') {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('id', { ascending: false })
        .limit(200);
      if (error) throw error;
      return res.status(200).json(data);
    }

    if (req.method === 'POST') {
      const { name, email, phone, audience, message, source } = req.body || {};

      if (!name || String(name).trim().length < 2) {
        return res.status(400).json({ error: 'Nome inválido' });
      }
      if (!phone || String(phone).replace(/\D/g, '').length < 10) {
        return res.status(400).json({ error: 'WhatsApp inválido' });
      }
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email))) {
        return res.status(400).json({ error: 'E-mail inválido' });
      }

      const { data, error } = await supabase
        .from('leads')
        .insert({
          name: String(name).trim(),
          email: email ? String(email).trim() : null,
          phone: String(phone).trim(),
          audience: audience || 'nao_informado',
          message: message ? String(message).trim() : null,
          source: source || 'site',
          status: 'novo',
          created_at: new Date().toISOString(),
        })
        .select()
        .single();
      if (error) throw error;
      return res.status(201).json(data);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API error:', err);
    return res.status(500).json({ error: err.message });
  }
}
