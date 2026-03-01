import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      workouts: { orderBy: { completedAt: 'desc' }, take: 30 },
      challenges: { orderBy: { weekNumber: 'desc' }, take: 20 },
      personalRecords: { orderBy: { recordAt: 'desc' } },
      skills: true,
      achievements: true,
    },
  })

  if (!user) return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 })

  return NextResponse.json(user)
}

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const allowed = ['name', 'weight', 'height', 'age', 'goal', 'currentWeek', 'totalWorkouts', 'streak', 'lastWorkout', 'hasCompletedOnboarding', 'hasCompletedProgram']
    const data: Record<string, unknown> = {}
    for (const key of allowed) {
      if (key in body) data[key] = body[key]
    }

    const user = await prisma.user.update({
      where: { id: session.user.id },
      data,
    })

    return NextResponse.json(user)
  } catch (error) {
    console.error('Update error:', error)
    return NextResponse.json({ error: 'Erro ao atualizar' }, { status: 500 })
  }
}
