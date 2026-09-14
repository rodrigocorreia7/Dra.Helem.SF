import { NextResponse } from 'next/server';
import supabase from '../../../src/lib/db-client';

export const dynamic = 'force-dynamic';

const ALLOWED_AUDIENCES = new Set(['mulheres', 'homens', 'geral', 'nao_informado']);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

function sanitizeString(str: unknown, maxLen = 255): string {
  if (typeof str !== 'string') return '';
  return str
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '') // remove control chars
    .trim()
    .slice(0, maxLen);
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

// 1. GET - Somente administradores autenticados via Bearer Token (Proteção LGPD)
export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('authorization') || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : '';
    const adminSecret = process.env.ADMIN_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!adminSecret || !token || token !== adminSecret) {
      return NextResponse.json(
        { error: 'Acesso não autorizado. Chave administrativa necessária.' },
        { status: 401, headers: corsHeaders }
      );
    }

    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('id', { ascending: false })
      .limit(200);

    if (error) throw error;
    return NextResponse.json(data, { status: 200, headers: corsHeaders });
  } catch (err) {
    console.error('API Error [leads GET]:', err);
    return NextResponse.json(
      { error: 'Erro interno ao processar requisição.' },
      { status: 500, headers: corsHeaders }
    );
  }
}

// 2. POST - Cadastro público de novo lead com validação e sanitização estrita
export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { name, email, phone, audience, message, source } = body || {};

    const cleanName = sanitizeString(name, 100);
    const cleanPhone = sanitizeString(phone, 25);
    const cleanEmail = sanitizeString(email, 120);
    const cleanMessage = sanitizeString(message, 1000);
    const cleanSource = sanitizeString(source || 'site', 50);

    if (!cleanName || cleanName.length < 2) {
      return NextResponse.json(
        { error: 'Nome inválido (mínimo de 2 caracteres).' },
        { status: 400, headers: corsHeaders }
      );
    }

    const rawDigits = cleanPhone.replace(/\D/g, '');
    if (rawDigits.length < 10 || rawDigits.length > 15) {
      return NextResponse.json(
        { error: 'WhatsApp inválido com DDD (ex: 47 9151-2620).' },
        { status: 400, headers: corsHeaders }
      );
    }

    if (cleanEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      return NextResponse.json(
        { error: 'Formato de e-mail inválido.' },
        { status: 400, headers: corsHeaders }
      );
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

    return NextResponse.json(
      { success: true, id: data.id },
      { status: 201, headers: corsHeaders }
    );
  } catch (err) {
    console.error('API Error [leads POST]:', err);
    return NextResponse.json(
      { error: 'Erro interno ao processar requisição.' },
      { status: 500, headers: corsHeaders }
    );
  }
}
