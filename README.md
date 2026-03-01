# 💪 CALISTENIA PRO — Next.js Full-Stack

Programa completo de calistenia com banco de dados, autenticação e mobile-first.

## Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Prisma ORM** + SQLite (dev) / PostgreSQL (prod)
- **NextAuth.js** — autenticação com email/senha
- **Barlow Condensed + DM Sans** — tipografia

## Quickstart

```bash
# 1. Instalar dependências
npm install

# 2. Configurar variáveis de ambiente
cp .env.example .env
# Edite NEXTAUTH_SECRET para algo seguro

# 3. Criar o banco de dados
npm run db:push

# 4. Iniciar em desenvolvimento
npm run dev
```

Acesse: **http://localhost:3000**

## Estrutura

```
app/
  (app)/           # Rotas protegidas (requer login)
    treino/        # Tela de treino do dia
    progresso/     # Progresso e conquistas
    programa/      # Visão geral 52 semanas
    perfil/        # Perfil e configurações
  api/             # API Routes
    auth/          # NextAuth + registro
    user/          # CRUD do usuário
    workouts/      # Salvar séries completadas
    challenges/    # Desafios diários
    skills/        # Habilidades desbloqueadas
    achievements/  # Conquistas
  login/           # Página de login/registro

components/        # Componentes React
contexts/          # UserDataContext (estado global)
hooks/             # useTimer, useCountdown
lib/
  prisma.ts        # Client Prisma singleton
  auth.ts          # NextAuth config
  program-data.ts  # 55+ exercícios + 52 semanas
```

## Banco de Dados

### Desenvolvimento (padrão)
SQLite — arquivo local `prisma/dev.db`. Zero configuração.

### Produção (PostgreSQL)
```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE"
```

```bash
npm run db:migrate
```

## Deploy

### Vercel (recomendado)
1. Push para GitHub
2. Conecte no Vercel
3. Configure variáveis de ambiente:
   - `DATABASE_URL` (PostgreSQL — use Vercel Postgres, Supabase ou Neon)
   - `NEXTAUTH_SECRET` (string aleatória longa)
   - `NEXTAUTH_URL` (seu domínio)
4. Deploy!

### Railway / Fly.io
Funcionam igualmente com PostgreSQL.

## Funcionalidades

- ✅ Autenticação (registro + login)
- ✅ 55+ exercícios com instruções detalhadas
- ✅ Programa completo de 52 semanas / 5 fases
- ✅ Timer de treino por dia
- ✅ Countdown para descanso entre séries
- ✅ Desafio diário com tracker
- ✅ Progresso salvo no banco por exercício/série
- ✅ Conquistas e habilidades
- ✅ Perfil com IMC
- ✅ Mobile-first / PWA-ready
- ✅ Persistência em banco de dados real

## Migrar de SQLite para PostgreSQL

Edite `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"  // ← mudar aqui
  url      = env("DATABASE_URL")
}
```

```bash
npm run db:migrate
```
