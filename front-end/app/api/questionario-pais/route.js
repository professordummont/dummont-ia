import { NextResponse } from 'next/server';
import { pool } from '../../../lib/db';

// POST - Salvar ou atualizar respostas
export async function POST(req) {
  try {
    const body = await req.json();
    const { userId, respostas } = body;

    const existing = await pool.query(
      'SELECT id FROM questionarios_pais WHERE user_id = $1',
      [userId]
    );

    if (existing.rowCount > 0) {
      await pool.query(
        'UPDATE questionarios_pais SET respostas_json = $1 WHERE user_id = $2',
        [respostas, userId]
      );
    } else {
      await pool.query(
        'INSERT INTO questionarios_pais (user_id, respostas_json) VALUES ($1, $2)',
        [userId, respostas]
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Erro no POST /questionario-pais:', err);
    return NextResponse.json({ error: 'Erro ao salvar questionário.' }, { status: 500 });
  }
}

// GET - Buscar respostas salvas
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    const result = await pool.query(
      'SELECT respostas_json FROM questionarios_pais WHERE user_id = $1',
      [userId]
    );

    if (result.rows.length > 0) {
      return NextResponse.json(result.rows[0].respostas_json);
    } else {
      return NextResponse.json(Array(6).fill(""));
    }
  } catch (err) {
    console.error('Erro no GET /questionario-pais:', err);
    return NextResponse.json({ error: 'Erro ao buscar respostas.' }, { status: 500 });
  }
}
