import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })

  try {
    const { achievementId } = await req.json()

    const achievement = await prisma.achievement.upsert({
      where: {
        userId_achievementId: {
          userId: session.user.id,
          achievementId,
        },
      },
      update: {},
      create: {
        userId: session.user.id,
        achievementId,
      },
    })

    return NextResponse.json(achievement)
  } catch (error) {
    console.error('Achievement save error:', error)
    return NextResponse.json({ error: 'Erro ao salvar conquista' }, { status: 500 })
  }
}
