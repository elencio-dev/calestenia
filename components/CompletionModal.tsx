'use client'

import { useState } from 'react'
import { Trophy, CheckCircle, ArrowRight } from 'lucide-react'
import { S } from './ui'

interface CompletionModalProps {
    isOpen: boolean
    onClose: () => void
}

export function CompletionModal({ isOpen, onClose }: CompletionModalProps) {
    if (!isOpen) return null

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: 24,
            backdropFilter: 'blur(4px)',
        }}>
            <div style={{
                ...S.card({ background: 'var(--bg-elevated)' }),
                maxWidth: 400,
                width: '100%',
                textAlign: 'center',
                border: '1px solid var(--accent-primary)',
                boxShadow: '0 0 40px rgba(168,85,247, 0.2)', // PRO theme purple glow
                position: 'relative',
                overflow: 'hidden'
            }}>

                {/* Background decorative element */}
                <div style={{
                    position: 'absolute',
                    top: -50,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 200,
                    height: 200,
                    background: 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, rgba(0,0,0,0) 70%)',
                    zIndex: 0
                }} />

                <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{
                        width: 80,
                        height: 80,
                        borderRadius: 40,
                        background: 'var(--accent-primary)22',
                        border: '2px solid var(--accent-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 20px',
                    }}>
                        <Trophy size={40} color="var(--accent-primary)" strokeWidth={1.5} />
                    </div>

                    <h2 style={{ ...S.title(24), marginBottom: 8, color: 'var(--accent-primary)' }}>
                        PRO COMPLETADO
                    </h2>

                    <h3 style={{ ...S.title(16), marginBottom: 16, color: 'var(--text-base)', opacity: 0.9 }}>
                        52 Semanas de Pura Força
                    </h3>

                    <p style={{
                        fontSize: 14,
                        color: 'var(--text-muted)',
                        lineHeight: 1.6,
                        marginBottom: 24,
                        padding: '0 10px'
                    }}>
                        Parabéns! Você alcançou o nível mais alto do programa.
                        Você construiu um domínio corporal que poucas pessoas no mundo possuem.
                        A partir de agora, as amarras do calendário do sistema foram removidas.
                        <br /><br />
                        <strong style={{ color: 'var(--text-base)' }}>Você já pode treinar sozinho.</strong> Sinta-se livre para refazer seus treinos favoritos ou usar o timer à vontade.
                    </p>

                    <button
                        onClick={onClose}
                        style={{
                            ...S.btn('var(--accent-primary)'),
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 8,
                            fontSize: 15
                        }}
                    >
                        Começar Treino Livre
                        <ArrowRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    )
}
