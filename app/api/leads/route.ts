import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

type LeadPayload = {
  name?: string;
  email?: string;
  phone?: string;
  audience?: string;
  message?: string;
  source?: string;
};

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error('Supabase não configurado.');
  }

  return createClient(url, key);
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LeadPayload;
    const { name, email, phone, audience, message, source } = body;

    if (!name || String(name).trim().length < 2) {
      return NextResponse.json({ error: 'Nome inválido' }, { status: 400 });
    }

    if (!phone || String(phone).replace(/\D/g, '').length < 10) {
      return NextResponse.json({ error: 'WhatsApp inválido' }, { status: 400 });
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email))) {
      return NextResponse.json({ error: 'E-mail inválido' }, { status: 400 });
    }

    const supabase = getSupabase();
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

    return NextResponse.json(data, {
      status: 201,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Não foi possível enviar.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
