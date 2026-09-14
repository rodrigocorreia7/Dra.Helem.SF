import { NextResponse } from 'next/server';
import supabase from '../../../src/lib/db-client';

export const dynamic = 'force-dynamic';

const ALLOWED_AUDIENCES = new Set(['mulheres', 'homens', 'geral', 'todos']);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const audience = searchParams.get('audience');

    let query = supabase
      .from('symptoms')
      .select('id, title, description, audience, icon, sort_order')
      .order('sort_order', { ascending: true });

    if (audience && ALLOWED_AUDIENCES.has(audience)) {
      query = query.eq('audience', audience);
    }

    const { data, error } = await query;
    if (error) throw error;

    return NextResponse.json(data || [], { status: 200, headers: corsHeaders });
  } catch (err) {
    console.error('API Error [symptoms GET]:', err);
    return NextResponse.json(
      { error: 'Erro interno ao carregar sintomas.' },
      { status: 500, headers: corsHeaders }
    );
  }
}
