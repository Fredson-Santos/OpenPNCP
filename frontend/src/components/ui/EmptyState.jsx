import React from 'react';
import { SearchX } from 'lucide-react';

export const EmptyState = ({ icon, title, description }) => {
  const IconComponent = icon || SearchX;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '3rem 2rem',
      textAlign: 'center',
      animation: 'fadeInUp 0.3s ease-out',
    }}>
      <div style={{
        width: 48,
        height: 48,
        borderRadius: 'var(--radius-sm)',
        background: 'var(--bg-obsidian)',
        border: '1px solid var(--border-hairline)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '1rem',
        color: 'var(--accent-electric)',
        boxShadow: 'var(--shadow-inset-top)',
      }}>
        <IconComponent size={22} />
      </div>
      <h3 style={{
        fontSize: '0.9375rem',
        fontWeight: 600,
        color: 'var(--text-paper)',
        letterSpacing: '-0.02em',
        marginBottom: '0.375rem',
      }}>
        {title || 'Nenhum resultado encontrado'}
      </h3>
      <p style={{
        fontSize: '0.8125rem',
        color: 'var(--text-ash)',
        maxWidth: 360,
        lineHeight: 1.5,
      }}>
        {description || 'Tente ajustar os filtros ou o termo de busca.'}
      </p>
    </div>
  );
};
