import { NextResponse } from 'next/server';
import supabase from '../../../src/lib/db-client';

export const dynamic = 'force-dynamic';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

function sanitizeString(str: unknown, maxLen = 255): string {
  if (typeof str !== 'string') return '';
  return str
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    .trim()
    .slice(0, maxLen);
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('testimonials')
      .select('id, author, context, quote, sort_order')
      .eq('published', true)
      .order('sort_order', { ascending: true });

    if (error) throw error;
    return NextResponse.json(data || [], { status: 200, headers: corsHeaders });
  } catch (err) {
    console.error('API Error [testimonials GET]:', err);
    return NextResponse.json(
      { error: 'Erro interno ao carregar depoimentos.' },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { author, context, quote, sort_order } = body || {};

    const cleanAuthor = sanitizeString(author, 80);
    const cleanContext = sanitizeString(context, 80);
    const cleanQuote = sanitizeString(quote, 600);

    if (!cleanAuthor || cleanAuthor.length < 2) {
      return NextResponse.json(
        { error: 'Nome do autor é obrigatório (mínimo de 2 caracteres).' },
        { status: 400, headers: corsHeaders }
      );
    }
    if (!cleanQuote || cleanQuote.length < 5) {
      return NextResponse.json(
        { error: 'Depoimento inválido ou muito curto.' },
        { status: 400, headers: corsHeaders }
      );
    }

    const safeSortOrder =
      typeof sort_order === 'number' && sort_order >= 0 && sort_order <= 999
        ? sort_order
        : 99;

    const { data, error } = await supabase
      .from('testimonials')
      .insert({
        author: cleanAuthor,
        context: cleanContext || null,
        quote: cleanQuote,
        published: false, // Sempre pendente de moderação médica
        sort_order: safeSortOrder,
        created_at: new Date().toISOString(),
      })
      .select('id, created_at')
      .single();

    if (error) throw error;

    return NextResponse.json(
      { success: true, id: data.id, message: 'Depoimento enviado para moderação.' },
      { status: 201, headers: corsHeaders }
    );
  } catch (err) {
    console.error('API Error [testimonials POST]:', err);
    return NextResponse.json(
      { error: 'Erro interno ao enviar depoimento.' },
      { status: 500, headers: corsHeaders }
    );
  }
}
