import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const weekNumber = searchParams.get('week')
  const dayNumber = searchParams.get('day')

  const where: Record<string, unknown> = { userId: session.user.id }
  if (weekNumber) where.weekNumber = parseInt(weekNumber)
  if (dayNumber !== null) where.dayNumber = parseInt(dayNumber)

  const challenges = await prisma.challenge.findMany({ where })
  return NextResponse.json(challenges)
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })

  try {
    const { weekNumber, dayNumber, progress, target } = await req.json()
    const completed = progress >= target

    const challenge = await prisma.challenge.upsert({
      where: {
        userId_weekNumber_dayNumber: {
          userId: session.user.id,
          weekNumber,
          dayNumber,
        },
      },
      update: {
        progress,
        completed,
        completedAt: completed ? new Date() : null,
      },
      create: {
        userId: session.user.id,
        weekNumber,
        dayNumber,
        progress,
        completed,
        completedAt: completed ? new Date() : null,
      },
    })

    return NextResponse.json(challenge)
  } catch (error) {
    console.error('Challenge save error:', error)
    return NextResponse.json({ error: 'Erro ao salvar desafio' }, { status: 500 })
  }
}
