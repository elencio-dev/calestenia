import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })

  try {
    const { skillKey } = await req.json()

    const skill = await prisma.skill.upsert({
      where: {
        userId_skillKey: {
          userId: session.user.id,
          skillKey,
        },
      },
      update: {},
      create: {
        userId: session.user.id,
        skillKey,
      },
    })

    return NextResponse.json(skill)
  } catch (error) {
    console.error('Skill save error:', error)
    return NextResponse.json({ error: 'Erro ao salvar skill' }, { status: 500 })
  }
}
