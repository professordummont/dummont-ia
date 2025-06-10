import { NextResponse } from 'next/server';
import { pool } from '../../../lib/db';

// POST - Salvar ou atualizar respostas
export async function POST(req) {
  try {
    const { userId, respostas } = await req.json();

    if (!userId || !Array.isArray(respostas)) {
      return NextResponse.json({ error: 'Dados inválidos.' }, { status: 400 });
    }

    const { rowCount } = await pool.query(
      'SELECT id FROM questionarios_aprendizagem WHERE user_id = $1',
      [userId]
    );

    if (rowCount > 0) {
      await pool.query(
        'UPDATE questionarios_aprendizagem SET respostas_json = $1 WHERE user_id = $2',
        [JSON.stringify(respostas), userId]
      );
    } else {
      await pool.query(
        'INSERT INTO questionarios_aprendizagem (user_id, respostas_json) VALUES ($1, $2)',
        [userId, JSON.stringify(respostas)]
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Erro ao salvar questionário:', err);
    return NextResponse.json({ error: 'Erro interno no servidor.' }, { status: 500 });
  }
}

// GET - Buscar respostas salvas
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'userId ausente na query.' }, { status: 400 });
    }

    const result = await pool.query(
      'SELECT respostas_json FROM questionarios_aprendizagem WHERE user_id = $1',
      [userId]
    );

    if (result.rows.length > 0) {
      return NextResponse.json(result.rows[0].respostas_json);
    } else {
      // Caso o usuário ainda não tenha respostas, retorna array em branco
      return NextResponse.json(Array(10).fill(""));
    }
  } catch (err) {
    console.error('Erro ao buscar respostas:', err);
    return NextResponse.json({ error: 'Erro interno no servidor.' }, { status: 500 });
  }
}
