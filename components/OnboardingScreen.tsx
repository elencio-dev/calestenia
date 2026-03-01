import React, { useState } from 'react'
import { Dumbbell, Target, ShieldCheck, Smartphone, CheckCircle2, ChevronRight, Zap } from 'lucide-react'
import { S } from './ui'

export function OnboardingScreen({ onComplete }: { onComplete: () => void }) {
    const [step, setStep] = useState(1)

    if (step === 1) {
        return (
            <div style={{
                minHeight: '100vh', background: 'var(--bg-base)', color: 'var(--text-base)',
                display: 'flex', flexDirection: 'column', padding: 'max(40px, env(safe-area-inset-top)) 24px 40px',
            }}>
                <div style={{
                    width: 56, height: 56, borderRadius: 16,
                    background: 'linear-gradient(135deg,#F97316,#F59E0B)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 0 32px rgba(249,115,22,0.4)',
                    marginBottom: 32,
                }}>
                    <Dumbbell color="var(--bg-base)" size={28} />
                </div>

                <h1 style={{ ...S.title(36), lineHeight: 1.1, marginBottom: 16 }}>
                    A CONSISTÊNCIA VENCE A INTENSIDADE.
                </h1>
                <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 40 }}>
                    Esteja pronto para transformar seu corpo. O método Calistenia PRO exige compromisso, mas o resultado é para toda a vida. A dor passa, o foco fica.
                </p>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                        <div style={{
                            width: 40, height: 40, borderRadius: 12, background: 'rgba(249,115,22,0.1)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                        }}>
                            <Target color="#F97316" size={20} />
                        </div>
                        <div>
                            <h3 style={{ ...S.title(18, 'var(--text-base)'), marginBottom: 4 }}>Uma Etapa de Cada Vez</h3>
                            <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.5 }}>Faça o seu treino de hoje, sem se preocupar com o de amanhã. Não tente acelerar, adapte-se ao processo.</p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                        <div style={{
                            width: 40, height: 40, borderRadius: 12, background: 'rgba(74,222,128,0.1)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                        }}>
                            <ShieldCheck color="#4ADE80" size={20} />
                        </div>
                        <div>
                            <h3 style={{ ...S.title(18, 'var(--text-base)'), marginBottom: 4 }}>Descanso também é treino</h3>
                            <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.5 }}>Nossa plataforma calcula os seus dias de repouso na semana. Respeite-os, os músculos crescem durante a recuperação.</p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                        <div style={{
                            width: 40, height: 40, borderRadius: 12, background: 'rgba(59,130,246,0.1)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                        }}>
                            <Zap color="#3B82F6" size={20} />
                        </div>
                        <div>
                            <h3 style={{ ...S.title(18, 'var(--text-base)'), marginBottom: 4 }}>Só Vale Hoje</h3>
                            <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.5 }}>Bloqueamos treinos em dias passados ou futuros. O compromisso é agora.</p>
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => setStep(2)}
                    style={{
                        ...S.btn('#F97316', 'lg'), width: '100%',
                        marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
                    }}>
                    ENTENDI, VAMOS LÁ <ChevronRight size={20} />
                </button>
            </div>
        )
    }

    return (
        <div style={{
            minHeight: '100vh', background: 'var(--bg-base)', color: 'var(--text-base)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24,
            textAlign: 'center'
        }}>
            <div style={{
                width: 80, height: 80, borderRadius: 24,
                background: 'linear-gradient(135deg,var(--bg-elevated),var(--bg-card))',
                border: '1px solid var(--border-subtle)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 32,
            }}>
                <Smartphone color="var(--text-base)" size={36} />
            </div>

            <h1 style={{ ...S.title(32), lineHeight: 1.2, marginBottom: 16 }}>
                USE COMO UM APP
            </h1>
            <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 40, maxWidth: 320 }}>
                Para uma experiência superior durante seus treinos, recomendamos que você adicione esta página à <b>Tela Inicial</b> do seu celular caso esteja acessando pelo navegador.
            </p>

            <div style={{ background: 'var(--bg-card)', borderRadius: 16, padding: 20, width: '100%', maxWidth: 320, marginBottom: 40, textAlign: 'left' }}>
                <p style={{ ...S.label(), marginBottom: 12 }}>COMO ADICIONAR (iOS / ANDROID)</p>
                <ol style={{ paddingLeft: 20, margin: 0, color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.8 }}>
                    <li>Toque no botão de compartilhar (ou três pontos) no seu navegador.</li>
                    <li>Encontre e selecione <span style={{ color: 'var(--text-base)', fontWeight: 600 }}>"Adicionar à Tela Inicial"</span>.</li>
                    <li>Abra o aplicativo através do ícone criado.</li>
                </ol>
            </div>

            <button
                onClick={onComplete}
                style={{
                    ...S.btn('var(--text-base)', 'lg'), color: 'var(--bg-base)', width: '100%', maxWidth: 320,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
                }}>
                JÁ FIZ ISSO <CheckCircle2 size={20} />
            </button>
        </div>
    )
}
