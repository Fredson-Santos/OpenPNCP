import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Pagination = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const visiblePages = [];
  const start = Math.max(1, page - 2);
  const end = Math.min(totalPages, page + 2);
  for (let i = start; i <= end; i++) {
    visiblePages.push(i);
  }

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.375rem',
      marginTop: '1.5rem',
      fontSize: '0.75rem',
      fontVariantNumeric: 'tabular-nums',
    }}>
      <button
        className="btn btn-outline btn-sm"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        aria-label="Página anterior"
      >
        <ChevronLeft size={14} />
      </button>

      {start > 1 && (
        <>
          <button className="btn btn-outline btn-sm" onClick={() => onPageChange(1)}>1</button>
          {start > 2 && <span style={{ color: 'var(--text-muted)', padding: '0 0.25rem' }}>…</span>}
        </>
      )}

      {visiblePages.map((p) => (
        <button
          key={p}
          className={`btn btn-sm ${p === page ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => onPageChange(p)}
          style={{ minWidth: 34, padding: '0.35rem 0.6rem' }}
        >
          {p}
        </button>
      ))}

      {end < totalPages && (
        <>
          {end < totalPages - 1 && <span style={{ color: 'var(--text-muted)', padding: '0 0.25rem' }}>…</span>}
          <button className="btn btn-outline btn-sm" onClick={() => onPageChange(totalPages)}>{totalPages}</button>
        </>
      )}

      <button
        className="btn btn-outline btn-sm"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        aria-label="Próxima página"
      >
        <ChevronRight size={14} />
      </button>
    </div>
  );
};
