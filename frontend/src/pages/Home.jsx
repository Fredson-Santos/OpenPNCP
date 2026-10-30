import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { StatCard } from '../components/ui/StatCard';
import { Card } from '../components/ui/Card';
import { SkeletonCard } from '../components/ui/Skeleton';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';
import {
  FileText, DollarSign, Building2
} from 'lucide-react';

const formatCurrency = (val) => {
  if (val >= 1e9) return `R$ ${(val / 1e9).toFixed(1)}B`;
  if (val >= 1e6) return `R$ ${(val / 1e6).toFixed(1)}M`;
  if (val >= 1e3) return `R$ ${(val / 1e3).toFixed(0)}K`;
  return `R$ ${val}`;
};

const BEUI_CHART_COLORS = ['#2563eb', '#38bdf8', '#0d9488', '#fbbf24', '#10b981'];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: 'var(--bg-surface)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-md)',
      padding: '0.5rem 0.75rem',
      fontSize: '0.75rem',
      boxShadow: 'var(--shadow-md)',
    }}>
      <div style={{ color: 'var(--text-muted)', marginBottom: '0.2rem' }}>
        {label ? label.split('-').reverse().join('/') : ''}
      </div>
      <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
        {payload[0].value.toLocaleString('pt-BR')} licitações
      </div>
    </div>
  );
};

export const Home = () => {
  const [stats, setStats] = useState(null);
  const [evolucao, setEvolucao] = useState([]);
  const [rankEstados, setRankEstados] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, evoRes, estRes] = await Promise.all([
          api.get('/stats'),
          api.get('/stats/evolucao-diaria'),
          api.get('/ranking/estados?limit=5&t=1'),
        ]);
        setStats(statsRes.data);
        setEvolucao(evoRes.data);
        setRankEstados(estRes.data);
      } catch (err) {
        console.error('Erro ao carregar dashboard:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const maxEstado = rankEstados.length > 0
    ? Math.max(...rankEstados.map((e) => e.total_licitacoes))
    : 1;

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div className="eyebrow">Observatório // Panorama Nacional</div>
          <h1>Painel Geral</h1>
          <p>Visão macro das licitações públicas no Brasil com análise contínua de integridade.</p>
        </div>
        {stats?.ultima_atualizacao && (
          <div style={{
            color: 'var(--text-muted)',
            fontSize: '0.75rem',
            fontWeight: 500,
            background: 'var(--bg-surface)',
            padding: '0.35rem 0.85rem',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--border-subtle)',
          }}>
            Última sync: {new Date(stats.ultima_atualizacao).toLocaleDateString('pt-BR')}
          </div>
        )}
      </div>

      {loading ? (
        <div className="grid grid-cols-3" style={{ marginBottom: '1.25rem' }}>
          <SkeletonCard /><SkeletonCard /><SkeletonCard />
        </div>
      ) : (
        <div className="grid grid-cols-3" style={{ marginBottom: '1.25rem' }}>
          <StatCard
            icon={<FileText size={18} />}
            label="Licitações"
            value={stats?.total_licitacoes?.toLocaleString('pt-BR') ?? '—'}
            detail="total cadastradas"
            accentColor="blue"
          />
          <StatCard
            icon={<DollarSign size={18} />}
            label="Valor Total"
            value={stats ? formatCurrency(stats.valor_total) : '—'}
            detail="em licitações"
            accentColor="green"
          />
          <StatCard
            icon={<Building2 size={18} />}
            label="Órgãos Ativos"
            value={stats?.orgaos_ativos?.toLocaleString('pt-BR') ?? '—'}
            detail="publicando editais"
            accentColor="purple"
          />
        </div>
      )}

      <div className="grid grid-cols-2" style={{ marginBottom: '1.5rem' }}>
        <Card variant="elevated">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                Evolução Diária
              </h3>
              <p className="text-xs text-secondary" style={{ marginTop: '0.125rem' }}>Licitações publicadas por dia</p>
            </div>
            <span className="badge badge-blue">30 dias</span>
          </div>
          <div style={{ width: '100%', height: 240 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={evolucao.slice(-30)} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorQtd" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0084ff" stopOpacity={0.28} />
                    <stop offset="95%" stopColor="#0084ff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" vertical={false} />
                <XAxis
                  dataKey="data"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'var(--text-muted)', fontSize: 11 }}
                  tickFormatter={(val) => {
                    if (!val) return '';
                    const [, m, d] = val.split('-');
                    return `${d}/${m}`;
                  }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'var(--text-muted)', fontSize: 11 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="quantidade"
                  stroke="#0084ff"
                  strokeWidth={2}
                  fill="url(#colorQtd)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card variant="elevated">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                Top Estados
              </h3>
              <p className="text-xs text-secondary" style={{ marginTop: '0.125rem' }}>Distribuição por volume de editais</p>
            </div>
            <span className="text-xs text-secondary">UF</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {rankEstados.map((est, idx) => {
              const barColor = BEUI_CHART_COLORS[idx % BEUI_CHART_COLORS.length];
              return (
                <div key={est.uf}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.375rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{
                        width: 8,
                        height: 8,
                        borderRadius: 'var(--radius-full)',
                        background: barColor,
                        display: 'inline-block',
                      }} />
                      <span style={{ fontWeight: 500, fontSize: '0.8125rem', color: 'var(--text-primary)' }}>
                        {est.uf}
                      </span>
                    </div>
                    <span className="text-xs text-secondary" style={{ fontVariantNumeric: 'tabular-nums' }}>
                      <strong style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                        {est.total_licitacoes.toLocaleString('pt-BR')}
                      </strong>{' '}
                      editais
                    </span>
                  </div>
                  <div style={{
                    height: 6,
                    borderRadius: 'var(--radius-full)',
                    background: 'var(--bg-muted)',
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      height: '100%',
                      width: `${(est.total_licitacoes / maxEstado) * 100}%`,
                      borderRadius: 'var(--radius-full)',
                      background: barColor,
                      transition: 'width 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
                    }} />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
};
