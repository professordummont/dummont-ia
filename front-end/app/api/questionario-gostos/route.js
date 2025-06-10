// app/api/questionario-gostos/route.js

import { NextResponse } from 'next/server';
import { pool } from '../../../lib/db';

// POST - Salvar ou atualizar respostas
export async function POST(req) {
  try {
    const body = await req.json();
    const { userId, respostas } = body;

    const existing = await pool.query(
      'SELECT id FROM questionarios_gostos WHERE user_id = $1',
      [userId]
    );

    if (existing.rowCount > 0) {
      await pool.query(
        'UPDATE questionarios_gostos SET respostas_json = $1 WHERE user_id = $2',
        [JSON.stringify(respostas), userId]
      );
    } else {
      await pool.query(
        'INSERT INTO questionarios_gostos (user_id, respostas_json) VALUES ($1, $2)',
        [userId, JSON.stringify(respostas)]
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Erro no POST /questionario-gostos:', err);
    return NextResponse.json({ error: 'Erro ao salvar questionário.' }, { status: 500 });
  }
}

// GET - Buscar respostas salvas
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    const result = await pool.query(
      'SELECT respostas_json FROM questionarios_gostos WHERE user_id = $1',
      [userId]
    );

    if (result.rows.length > 0) {
      const respostas = result.rows[0].respostas_json;
      return NextResponse.json(respostas); // já vem como array se for JSONB
    } else {
      return NextResponse.json(Array(7).fill(""));
    }
  } catch (err) {
    console.error('Erro no GET /questionario-gostos:', err);
    return NextResponse.json({ error: 'Erro ao buscar respostas.' }, { status: 500 });
  }
}
