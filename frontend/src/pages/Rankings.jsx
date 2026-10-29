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

const MEDAL_COLORS = ['#e4f222', '#e5e5e6', '#d0d6e0'];

const RankRow = ({ index, label, sublabel, value, displayValue, maxValue }) => {
  const pct = maxValue > 0 ? (value / maxValue) * 100 : 0;

  return (
    <div style={{
      padding: '0.75rem 0',
      borderBottom: '1px solid var(--border-hairline)',
      animation: 'fadeInUp 0.25s ease-out both',
      animationDelay: `${index * 0.03}s`,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.375rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 0 }}>
          {index < 3 ? (
            <div style={{
              width: 26, height: 26, borderRadius: 'var(--radius-xs)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: index === 0 ? 'rgba(228, 242, 34, 0.12)' : 'var(--bg-obsidian)',
              border: `1px solid ${index === 0 ? 'rgba(228, 242, 34, 0.3)' : 'var(--border-hairline)'}`,
              color: MEDAL_COLORS[index],
              flexShrink: 0,
            }}>
              <Trophy size={13} />
            </div>
          ) : (
            <div style={{
              width: 26, height: 26, borderRadius: 'var(--radius-xs)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'var(--bg-carbon)',
              border: '1px solid var(--border-hairline)',
              color: 'var(--text-fog)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6875rem', fontWeight: 600,
              flexShrink: 0,
            }}>
              {index + 1}
            </div>
          )}
          <div style={{ minWidth: 0 }}>
            <div style={{ fontWeight: 500, fontSize: '0.8125rem', color: 'var(--text-paper)' }} className="truncate">
              {label}
            </div>
            {sublabel && <div className="font-mono text-xs text-secondary">{sublabel}</div>}
          </div>
        </div>
        <span className="font-mono" style={{ fontWeight: 600, fontSize: '0.8125rem', color: index === 0 ? 'var(--accent-electric)' : 'var(--text-paper)', flexShrink: 0, marginLeft: '1rem' }}>
          {displayValue || value}
        </span>
      </div>
      <div style={{ height: 3, borderRadius: 1.5, background: 'var(--bg-subtle)', overflow: 'hidden' }}>
        <div style={{
          height: '100%',
          width: `${pct}%`,
          borderRadius: 1.5,
          background: index === 0 ? 'var(--accent-electric)' : 'var(--text-ash)',
          opacity: Math.max(0.3, 1 - index * 0.07),
          transition: 'width 0.5s ease-out',
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
        <Card style={{ animation: 'fadeInUp 0.25s ease-out' }}>
          <div className="eyebrow" style={{ marginBottom: '0.25rem' }}>Administração Pública</div>
          <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, marginBottom: '0.25rem', color: 'var(--text-paper)' }}>
            Top Órgãos Compradores
          </h3>
          <p className="font-mono text-xs text-secondary" style={{ marginBottom: '1rem' }}>
            Classificação por quantidade de editais emitidos
          </p>
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
        <Card style={{ animation: 'fadeInUp 0.25s ease-out' }}>
          <div className="eyebrow" style={{ marginBottom: '0.25rem' }}>Mercado Privado</div>
          <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, marginBottom: '0.25rem', color: 'var(--text-paper)' }}>
            Top Fornecedores por Volume
          </h3>
          <p className="font-mono text-xs text-secondary" style={{ marginBottom: '1rem' }}>
            Classificação por montante total contratado (R$)
          </p>
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
        <Card style={{ animation: 'fadeInUp 0.25s ease-out' }}>
          <div className="eyebrow" style={{ marginBottom: '0.25rem' }}>Federação</div>
          <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, marginBottom: '0.25rem', color: 'var(--text-paper)' }}>
            Ranking por Estado (UF)
          </h3>
          <p className="font-mono text-xs text-secondary" style={{ marginBottom: '1rem' }}>
            Unidades Federativas com maior volume de editais
          </p>
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
        <Card style={{ animation: 'fadeInUp 0.25s ease-out' }}>
          <div className="eyebrow" style={{ marginBottom: '0.25rem' }}>Procedimentos Legais</div>
          <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, marginBottom: '0.25rem', color: 'var(--text-paper)' }}>
            Ranking por Modalidade
          </h3>
          <p className="font-mono text-xs text-secondary" style={{ marginBottom: '1rem' }}>
            Modalidades de contratação mais frequentes
          </p>
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
