import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { FilterPanel } from '../components/ui/FilterPanel';
import { Pagination } from '../components/ui/Pagination';
import { EmptyState } from '../components/ui/EmptyState';
import { SkeletonRow } from '../components/ui/Skeleton';
import { Search, ExternalLink, Calendar, Building2 } from 'lucide-react';

const INITIAL_FILTERS = {
  uf: '', modalidade: '', situacao: '', sort: '', valor_minimo: '', valor_maximo: '', data_inicio: '', data_fim: ''
};

const PAGE_SIZE = 10;

const formatCurrency = (val) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

const formatDate = (dateStr) => {
  if (!dateStr) return null;
  return new Date(dateStr).toLocaleDateString('pt-BR');
};

const SITUACAO_COLOR = {
  'Aberta': 'green',
  'Encerrada': 'red',
  'Suspensa': 'orange',
  'Revogada': 'purple',
};

export const Licitacoes = () => {
  const [licitacoes, setLicitacoes] = useState([]);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchLicitacoes = useCallback(async (searchTerm, currentFilters, currentPage) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set('page', currentPage);
      params.set('page_size', PAGE_SIZE);

      if (searchTerm) params.set('q', searchTerm);
      if (currentFilters.uf) params.set('uf', currentFilters.uf);
      if (currentFilters.modalidade) params.set('modalidade', currentFilters.modalidade);
      if (currentFilters.situacao) params.set('situacao', currentFilters.situacao);
      if (currentFilters.sort) params.set('sort', currentFilters.sort);
      if (currentFilters.valor_minimo) params.set('valor_minimo', currentFilters.valor_minimo);
      if (currentFilters.valor_maximo) params.set('valor_maximo', currentFilters.valor_maximo);
      if (currentFilters.data_inicio) params.set('data_inicio', currentFilters.data_inicio);
      if (currentFilters.data_fim) params.set('data_fim', currentFilters.data_fim);

      const res = await api.get(`/licitacoes?${params.toString()}`);
      setLicitacoes(res.data.data);
      setTotal(res.data.total);
    } catch (err) {
      console.error('Erro ao buscar licitações:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLicitacoes(search, filters, page);
  }, [page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchLicitacoes(search, filters, 1);
  };

  const handleApplyFilters = () => {
    setPage(1);
    fetchLicitacoes(search, filters, 1);
  };

  const handleClearFilters = () => {
    setFilters(INITIAL_FILTERS);
    setPage(1);
    fetchLicitacoes(search, INITIAL_FILTERS, 1);
  };

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div>
      <div className="page-header">
        <div className="eyebrow">Repositório // Editais Oficiais</div>
        <h1>Licitações</h1>
        <p>
          Pesquise e monitore editais em todo o país com rastreabilidade detalhada.{' '}
          {total > 0 && <span className="font-mono text-lime" style={{ fontWeight: 600 }}>{total.toLocaleString('pt-BR')} registros</span>}
        </p>
      </div>

      <Card style={{ marginBottom: '1.25rem', padding: '0.875rem 1rem' }}>
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.625rem' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <Search
              size={15}
              style={{
                position: 'absolute',
                left: '0.875rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-fog)',
                pointerEvents: 'none',
              }}
            />
            <input
              type="text"
              className="input"
              placeholder="Buscar por objeto, órgão ou número de controle..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ paddingLeft: '2.5rem' }}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Buscar
          </button>
        </form>
      </Card>

      <FilterPanel
        filters={filters}
        onFilterChange={setFilters}
        onApply={handleApplyFilters}
        onClear={handleClearFilters}
      />

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th style={{ width: '40%' }}>Objeto / Órgão</th>
              <th>UF</th>
              <th>Modalidade</th>
              <th>Valor Estimado</th>
              <th>Situação</th>
              <th>Publicação</th>
              <th style={{ width: 44 }}></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <SkeletonRow key={i} columns={7} />
              ))
            ) : licitacoes.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ padding: 0 }}>
                  <EmptyState />
                </td>
              </tr>
            ) : (
              licitacoes.map((lic) => (
                <tr key={lic.id}>
                  <td>
                    <Link
                      to={`/licitacoes/${lic.id}`}
                      style={{
                        display: 'block',
                        fontWeight: 500,
                        color: 'var(--text-paper)',
                        marginBottom: '0.25rem',
                        lineHeight: 1.4,
                      }}
                    >
                      {lic.objeto}
                    </Link>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.375rem',
                      fontSize: '0.75rem',
                      color: 'var(--text-ash)',
                    }}>
                      <Building2 size={12} style={{ color: 'var(--text-fog)' }} />
                      <span className="truncate" style={{ maxWidth: 380 }}>{lic.orgao_nome}</span>
                      {lic.numero_controle_pncp && (
                        <span className="font-mono text-tertiary" style={{ fontSize: '0.6875rem' }}>
                          • {lic.numero_controle_pncp}
                        </span>
                      )}
                    </div>
                  </td>
                  <td>
                    <span className="font-mono text-secondary" style={{ fontWeight: 600, fontSize: '0.75rem' }}>
                      {lic.uf || '—'}
                    </span>
                  </td>
                  <td>
                    <span className="text-secondary" style={{ fontSize: '0.75rem' }}>
                      {lic.modalidade_nome || '—'}
                    </span>
                  </td>
                  <td>
                    <span className="font-mono" style={{ fontWeight: 600, color: 'var(--text-paper)' }}>
                      {lic.valor_total_estimado ? formatCurrency(lic.valor_total_estimado) : '—'}
                    </span>
                  </td>
                  <td>
                    <Badge color={SITUACAO_COLOR[lic.situacao_nome] || 'blue'}>
                      {lic.situacao_nome || 'N/A'}
                    </Badge>
                  </td>
                  <td>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.375rem',
                      fontSize: '0.75rem',
                      color: 'var(--text-ash)',
                      fontFamily: 'var(--font-mono)',
                    }}>
                      <Calendar size={12} style={{ color: 'var(--text-fog)' }} />
                      {formatDate(lic.data_publicacao_pncp)}
                    </div>
                  </td>
                  <td>
                    <Link
                      to={`/licitacoes/${lic.id}`}
                      className="btn btn-ghost btn-sm"
                      style={{ padding: '0.3rem', color: 'var(--text-fog)' }}
                      aria-label="Ver detalhes"
                    >
                      <ExternalLink size={14} />
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
};
