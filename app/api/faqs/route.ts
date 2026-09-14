import { NextResponse } from 'next/server';
import supabase from '../../../src/lib/db-client';

export const dynamic = 'force-dynamic';

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

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('faqs')
      .select('id, question, answer, category, sort_order')
      .order('sort_order', { ascending: true });

    if (error) throw error;
    return NextResponse.json(data || [], { status: 200, headers: corsHeaders });
  } catch (err) {
    console.error('API Error [faqs GET]:', err);
    return NextResponse.json(
      { error: 'Erro interno ao carregar FAQs.' },
      { status: 500, headers: corsHeaders }
    );
  }
}
