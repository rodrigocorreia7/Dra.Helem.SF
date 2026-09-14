import supabase from './db-client.js';

function sanitizeString(str, maxLen = 255) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    .trim()
    .slice(0, maxLen);
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'GET') {
      const { data, error } = await supabase
        .from('testimonials')
        .select('id, author, context, quote, sort_order')
        .eq('published', true)
        .order('sort_order', { ascending: true });
      if (error) throw error;
      return res.status(200).json(data);
    }

    if (req.method === 'POST') {
      const { author, context, quote, sort_order } = req.body || {};

      const cleanAuthor = sanitizeString(author, 80);
      const cleanContext = sanitizeString(context, 80);
      const cleanQuote = sanitizeString(quote, 600);

      if (!cleanAuthor || cleanAuthor.length < 2) {
        return res.status(400).json({ error: 'Nome do autor é obrigatório (mínimo de 2 caracteres).' });
      }
      if (!cleanQuote || cleanQuote.length < 5) {
        return res.status(400).json({ error: 'Depoimento inválido ou muito curto.' });
      }

      const safeSortOrder = typeof sort_order === 'number' && sort_order >= 0 && sort_order <= 999
        ? sort_order
        : 99;

      const { data, error } = await supabase
        .from('testimonials')
        .insert({
          author: cleanAuthor,
          context: cleanContext || null,
          quote: cleanQuote,
          published: false, // Sempre pendente de aprovação médica
          sort_order: safeSortOrder,
          created_at: new Date().toISOString(),
        })
        .select('id, created_at')
        .single();

      if (error) throw error;
      return res.status(201).json({ success: true, id: data.id, message: 'Depoimento enviado para moderação.' });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API Error [testimonials]:', err);
    return res.status(500).json({ error: 'Erro interno ao processar depoimentos.' });
  }
}
