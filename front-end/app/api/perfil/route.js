import { NextResponse } from 'next/server';
import { db } from '@/lib/db'; // adapte ao seu client (Prisma, Postgres lib etc.)

export async function POST(request) {
  const body = await request.json();

  try {
    const { student_name, age, grade, city, region, guardian_name, photo } = body;

    await db.query(`
      INSERT INTO profiles (student_name, age, grade, city, region, guardian_name, photo)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      ON CONFLICT (id) DO UPDATE SET
        student_name = EXCLUDED.student_name,
        age = EXCLUDED.age,
        grade = EXCLUDED.grade,
        city = EXCLUDED.city,
        region = EXCLUDED.region,
        guardian_name = EXCLUDED.guardian_name,
        photo = EXCLUDED.photo
    `, [student_name, age, grade, city, region, guardian_name, photo]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao salvar perfil:', error);
    return NextResponse.json({ success: false, error: 'Erro ao salvar perfil.' }, { status: 500 });
  }
}
