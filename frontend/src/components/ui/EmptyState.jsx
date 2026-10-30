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
      animation: 'fadeInUp 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
    }}>
      <div style={{
        width: 48,
        height: 48,
        borderRadius: 'var(--radius-md)',
        background: 'var(--bg-muted)',
        border: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '1rem',
        color: 'var(--text-muted)',
      }}>
        <IconComponent size={22} />
      </div>
      <h3 style={{
        fontSize: '0.9375rem',
        fontWeight: 600,
        color: 'var(--text-primary)',
        letterSpacing: '-0.02em',
        marginBottom: '0.375rem',
      }}>
        {title || 'Nenhum resultado encontrado'}
      </h3>
      <p style={{
        fontSize: '0.8125rem',
        color: 'var(--text-muted)',
        maxWidth: 360,
        lineHeight: 1.5,
      }}>
        {description || 'Tente ajustar os filtros ou o termo de busca.'}
      </p>
    </div>
  );
};
