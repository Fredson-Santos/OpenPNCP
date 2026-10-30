import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Card } from '../components/ui/Card';
import { Tabs } from '../components/ui/Tabs';
import { SkeletonRow } from '../components/ui/Skeleton';
import { EmptyState } from '../components/ui/EmptyState';
import {
  Building2, Users, MapPin, Layers,
  Trophy
} from 'lucide-react';

const formatCurrency = (val) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

const ROW_BAR_COLORS = ['#0084ff', '#38bdf8', '#0d9488', '#fbbf24'];

const RankRow = ({ index, label, sublabel, value, displayValue, maxValue }) => {
  const pct = maxValue > 0 ? (value / maxValue) * 100 : 0;
  const isFirst = index === 0;
  const barColor = index < 3 ? ROW_BAR_COLORS[index] : '#2563eb';

  return (
    <div style={{
      padding: '0.875rem 1rem',
      marginBottom: '0.5rem',
      borderRadius: 'var(--radius-lg)',
      background: 'var(--bg-canvas)',
      border: '1px solid var(--border-subtle)',
      animation: 'fadeInUp 0.25s cubic-bezier(0.22, 1, 0.36, 1) both',
      animationDelay: `${index * 0.03}s`,
      transition: 'border-color var(--transition-fast)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 0 }}>
          {index < 3 ? (
            <div style={{
              width: 34, height: 34, borderRadius: '10px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: isFirst ? 'var(--accent-brand)' : 'var(--bg-muted)',
              color: isFirst ? 'var(--accent-brand-fg)' : barColor,
              flexShrink: 0,
            }}>
              <Trophy size={15} />
            </div>
          ) : (
            <div style={{
              width: 34, height: 34, borderRadius: '10px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'var(--bg-muted)',
              color: 'var(--text-muted)',
              fontSize: '0.75rem', fontWeight: 600,
              fontVariantNumeric: 'tabular-nums',
              flexShrink: 0,
            }}>
              {index + 1}
            </div>
          )}
          <div style={{ minWidth: 0 }}>
            <div style={{ fontWeight: 500, fontSize: '0.875rem', color: 'var(--text-primary)' }} className="truncate">
              {label}
            </div>
            {sublabel && <div className="text-xs text-secondary" style={{ marginTop: '0.1rem' }}>{sublabel}</div>}
          </div>
        </div>
        <span style={{
          fontWeight: 600,
          fontSize: '0.8125rem',
          color: 'var(--text-primary)',
          fontVariantNumeric: 'tabular-nums',
          flexShrink: 0,
          marginLeft: '1rem',
        }}>
          {displayValue || value}
        </span>
      </div>
      <div style={{ height: 5, borderRadius: 'var(--radius-full)', background: 'var(--bg-muted)', overflow: 'hidden' }}>
        <div style={{
          height: '100%',
          width: `${pct}%`,
          borderRadius: 'var(--radius-full)',
          background: barColor,
          opacity: Math.max(0.45, 1 - index * 0.06),
          transition: 'width 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
        }} />
      </div>
    </div>
  );
};

export const Rankings = () => {
  const [orgaos, setOrgaos] = useState([]);
  const [fornecedores, setFornecedores] = useState([]);
  const [estados, setEstados] = useState([]);
  const [modalidades, setModalidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('orgaos');

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [orgRes, fornRes, estRes, modRes] = await Promise.all([
          api.get('/ranking/orgaos?limit=10'),
          api.get('/ranking/fornecedores/volume?limit=10'),
          api.get('/ranking/estados?limit=10&t=1'),
          api.get('/ranking/modalidades?limit=10'),
        ]);
        setOrgaos(orgRes.data);
        setFornecedores(fornRes.data);
        setEstados(estRes.data);
        setModalidades(modRes.data);
      } catch (err) {
        console.error('Erro ao carregar rankings:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const tabs = [
    { key: 'orgaos', label: 'Órgãos', icon: <Building2 size={14} /> },
    { key: 'fornecedores', label: 'Fornecedores', icon: <Users size={14} /> },
    { key: 'estados', label: 'Estados', icon: <MapPin size={14} /> },
    { key: 'modalidades', label: 'Modalidades', icon: <Layers size={14} /> },
  ];

  const renderLoading = () => (
    Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} columns={2} />)
  );

  return (
    <div>
      <div className="page-header">
        <div className="eyebrow">Métricas // Liderança & Volume</div>
        <h1>Rankings</h1>
        <p>Panorama analítico dos maiores compradores, fornecedores e tendências de contratação pública.</p>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'orgaos' && (
        <Card style={{ animation: 'fadeInUp 0.25s cubic-bezier(0.22, 1, 0.36, 1)' }}>
          <div style={{ marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              Top Órgãos Compradores
            </h3>
            <p className="text-xs text-secondary" style={{ marginTop: '0.125rem' }}>
              Classificação por quantidade de editais emitidos
            </p>
          </div>
          {loading ? renderLoading() : orgaos.length === 0 ? (
            <EmptyState title="Sem dados de órgãos" />
          ) : (
            orgaos.map((org, idx) => (
              <RankRow
                key={org.orgao_id}
                index={idx}
                label={org.nome}
                sublabel={`${org.total_licitacoes.toLocaleString('pt-BR')} licitações registradas`}
                value={org.total_licitacoes}
                displayValue={org.total_licitacoes.toLocaleString('pt-BR')}
                maxValue={orgaos[0]?.total_licitacoes || 1}
              />
            ))
          )}
        </Card>
      )}

      {activeTab === 'fornecedores' && (
        <Card style={{ animation: 'fadeInUp 0.25s cubic-bezier(0.22, 1, 0.36, 1)' }}>
          <div style={{ marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              Top Fornecedores por Volume
            </h3>
            <p className="text-xs text-secondary" style={{ marginTop: '0.125rem' }}>
              Classificação por montante total contratado (R$)
            </p>
          </div>
          {loading ? renderLoading() : fornecedores.length === 0 ? (
            <EmptyState title="Sem dados de fornecedores" />
          ) : (
            fornecedores.map((forn, idx) => (
              <RankRow
                key={forn.fornecedor_id}
                index={idx}
                label={forn.nome}
                sublabel={`CNPJ: ${forn.ni} • ${forn.quantidade_contratos} contratos`}
                value={forn.volume_total}
                displayValue={formatCurrency(forn.volume_total)}
                maxValue={fornecedores[0]?.volume_total || 1}
              />
            ))
          )}
        </Card>
      )}

      {activeTab === 'estados' && (
        <Card style={{ animation: 'fadeInUp 0.25s cubic-bezier(0.22, 1, 0.36, 1)' }}>
          <div style={{ marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              Ranking por Estado (UF)
            </h3>
            <p className="text-xs text-secondary" style={{ marginTop: '0.125rem' }}>
              Unidades Federativas com maior volume de editais
            </p>
          </div>
          {loading ? renderLoading() : estados.length === 0 ? (
            <EmptyState title="Sem dados regionais" />
          ) : (
            estados.map((est, idx) => (
              <RankRow
                key={est.uf}
                index={idx}
                label={est.uf}
                sublabel={`${est.total_licitacoes.toLocaleString('pt-BR')} editais`}
                value={est.total_licitacoes}
                displayValue={est.total_licitacoes.toLocaleString('pt-BR')}
                maxValue={estados[0]?.total_licitacoes || 1}
              />
            ))
          )}
        </Card>
      )}

      {activeTab === 'modalidades' && (
        <Card style={{ animation: 'fadeInUp 0.25s cubic-bezier(0.22, 1, 0.36, 1)' }}>
          <div style={{ marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              Ranking por Modalidade
            </h3>
            <p className="text-xs text-secondary" style={{ marginTop: '0.125rem' }}>
              Modalidades de contratação mais frequentes
            </p>
          </div>
          {loading ? renderLoading() : modalidades.length === 0 ? (
            <EmptyState title="Sem dados de modalidades" />
          ) : (
            modalidades.map((mod, idx) => (
              <RankRow
                key={mod.modalidade}
                index={idx}
                label={mod.modalidade}
                sublabel={`${mod.total_licitacoes.toLocaleString('pt-BR')} licitações`}
                value={mod.total_licitacoes}
                displayValue={mod.total_licitacoes.toLocaleString('pt-BR')}
                maxValue={modalidades[0]?.total_licitacoes || 1}
              />
            ))
          )}
        </Card>
      )}
    </div>
  );
};
