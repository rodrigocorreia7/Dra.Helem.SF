import supabase from './db-client.js';

const ALLOWED_AUDIENCES = new Set(['mulheres', 'homens', 'geral', 'nao_informado']);

function sanitizeString(str, maxLen = 255) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '') // remove control chars
    .trim()
    .slice(0, maxLen);
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    // 1. GET - Somente administradores autenticados via Bearer Token (Proteção LGPD)
    if (req.method === 'GET') {
      const authHeader = req.headers.authorization || '';
      const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : '';
      const adminSecret = process.env.ADMIN_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

      if (!adminSecret || !token || token !== adminSecret) {
        return res.status(401).json({ error: 'Acesso não autorizado. Chave administrativa necessária.' });
      }

      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('id', { ascending: false })
        .limit(200);

      if (error) throw error;
      return res.status(200).json(data);
    }

    // 2. POST - Cadastro público de novo lead com validação e sanitização estrita
    if (req.method === 'POST') {
      const { name, email, phone, audience, message, source } = req.body || {};

      const cleanName = sanitizeString(name, 100);
      const cleanPhone = sanitizeString(phone, 25);
      const cleanEmail = sanitizeString(email, 120);
      const cleanMessage = sanitizeString(message, 1000);
      const cleanSource = sanitizeString(source || 'site', 50);

      if (!cleanName || cleanName.length < 2) {
        return res.status(400).json({ error: 'Nome inválido (mínimo de 2 caracteres).' });
      }

      const rawDigits = cleanPhone.replace(/\D/g, '');
      if (rawDigits.length < 10 || rawDigits.length > 15) {
        return res.status(400).json({ error: 'WhatsApp inválido com DDD (ex: 47 9151-2620).' });
      }

      if (cleanEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
        return res.status(400).json({ error: 'Formato de e-mail inválido.' });
      }

      const safeAudience = ALLOWED_AUDIENCES.has(audience) ? audience : 'nao_informado';

      const { data, error } = await supabase
        .from('leads')
        .insert({
          name: cleanName,
          email: cleanEmail || null,
          phone: cleanPhone,
          audience: safeAudience,
          message: cleanMessage || null,
          source: cleanSource,
          status: 'novo',
          created_at: new Date().toISOString(),
        })
        .select('id, name, created_at')
        .single();

      if (error) throw error;
      return res.status(201).json({ success: true, id: data.id });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API Error [leads]:', err);
    return res.status(500).json({ error: 'Erro interno ao processar requisição.' });
  }
}
