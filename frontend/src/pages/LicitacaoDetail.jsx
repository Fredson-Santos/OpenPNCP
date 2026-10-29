import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Tabs } from '../components/ui/Tabs';
import { Timeline } from '../components/ui/Timeline';
import { EmptyState } from '../components/ui/EmptyState';
import { Skeleton } from '../components/ui/Skeleton';
import {
  ArrowLeft, Building2, Calendar, FileText,
  Package, Paperclip, History, ExternalLink
} from 'lucide-react';

const formatCurrency = (val) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

const formatDate = (dateStr) => {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('pt-BR', {
    day: '2-digit', month: 'long', year: 'numeric',
  });
};

const getPncpUrl = (numeroControle) => {
  if (numeroControle) {
    const parts = numeroControle.split(/[-/]/);
    if (parts.length >= 4) {
      const cnpj = parts[0];
      const sequencial = parseInt(parts[2], 10);
      const ano = parts[3];
      return `https://pncp.gov.br/app/editais/${cnpj}/${ano}/${sequencial}`;
    } else if (parts.length === 3) {
      const cnpj = parts[0];
      const sequencial = parseInt(parts[1], 10);
      const ano = parts[2];
      return `https://pncp.gov.br/app/editais/${cnpj}/${ano}/${sequencial}`;
    }
  }
  return 'https://pncp.gov.br/app/editais/';
};

export const LicitacaoDetail = () => {
  const { id } = useParams();
  const [licitacao, setLicitacao] = useState(null);
  const [itens, setItens] = useState([]);
  const [arquivos, setArquivos] = useState([]);
  const [historico, setHistorico] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('info');

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [licRes, itensRes, arqRes, histRes] = await Promise.all([
          api.get(`/licitacoes/${id}`),
          api.get(`/licitacoes/${id}/itens`).catch(() => ({ data: [] })),
          api.get(`/licitacoes/${id}/arquivos`).catch(() => ({ data: [] })),
          api.get(`/licitacoes/${id}/historico`).catch(() => ({ data: [] })),
        ]);
        setLicitacao(licRes.data);
        setItens(itensRes.data);
        setArquivos(arqRes.data);
        setHistorico(histRes.data);
      } catch (err) {
        console.error('Erro ao carregar detalhes:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [id]);

  if (loading) {
    return (
      <div>
        <Skeleton width="20%" height="1.5rem" />
        <div style={{ marginTop: '1.5rem' }}>
          <Skeleton height="180px" borderRadius="var(--radius-lg)" />
        </div>
      </div>
    );
  }

  if (!licitacao) {
    return (
      <div>
        <Link to="/licitacoes" className="btn btn-ghost" style={{ marginBottom: '1rem' }}>
          <ArrowLeft size={15} /> Voltar
        </Link>
        <Card>
          <EmptyState title="Licitação não encontrada" description="O registro pode ter sido removido ou o link é inválido." />
        </Card>
      </div>
    );
  }

  const tabs = [
    { key: 'info', label: 'Informações', icon: <FileText size={14} /> },
    { key: 'itens', label: 'Itens', icon: <Package size={14} />, count: itens.length },
    { key: 'arquivos', label: 'Arquivos', icon: <Paperclip size={14} />, count: arquivos.length },
    { key: 'historico', label: 'Histórico', icon: <History size={14} />, count: historico.length },
  ];

  return (
    <div>
      <Link to="/licitacoes" className="btn btn-ghost" style={{ marginBottom: '1.25rem', padding: '0.375rem 0' }}>
        <ArrowLeft size={15} /> Voltar para busca
      </Link>

      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        <div>
          <div className="eyebrow">Edital Oficial // Identificador PNCP</div>
          <h1 className="font-mono" style={{ fontSize: '1.375rem', letterSpacing: '-0.025em' }}>
            {licitacao.numero_controle || 'Licitação'}
          </h1>
          <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
            <Building2 size={13} style={{ color: 'var(--text-fog)' }} /> {licitacao.orgao?.nome}
          </p>
        </div>
        <a
          href={getPncpUrl(licitacao.numero_controle)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
        >
          <span>Abrir no PNCP</span>
          <ExternalLink size={14} />
        </a>
      </div>

      <div className="grid grid-cols-4" style={{ marginBottom: '1.5rem' }}>
        <Card>
          <div className="eyebrow" style={{ marginBottom: '0.25rem' }}>Modalidade</div>
          <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-paper)' }}>{licitacao.modalidade || '—'}</div>
        </Card>
        <Card>
          <div className="eyebrow" style={{ marginBottom: '0.25rem' }}>Valor Estimado</div>
          <div className="font-mono" style={{ fontWeight: 700, color: 'var(--accent-electric)', fontSize: '0.9375rem' }}>
            {licitacao.valor_estimado ? formatCurrency(licitacao.valor_estimado) : '—'}
          </div>
        </Card>
        <Card>
          <div className="eyebrow" style={{ marginBottom: '0.25rem' }}>Situação</div>
          <div>
            <Badge color="blue">{licitacao.situacao || '—'}</Badge>
          </div>
        </Card>
        <Card>
          <div className="eyebrow" style={{ marginBottom: '0.25rem' }}>Publicação</div>
          <div className="font-mono" style={{ fontWeight: 500, fontSize: '0.8125rem', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <Calendar size={13} style={{ color: 'var(--text-fog)' }} />
            {formatDate(licitacao.data_publicacao)}
          </div>
        </Card>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'info' && (
        <Card style={{ animation: 'fadeInUp 0.25s ease-out' }}>
          <div className="eyebrow" style={{ marginBottom: '0.5rem' }}>Descrição do Processo</div>
          <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--text-paper)' }}>
            Objeto da Licitação
          </h3>
          <p style={{ color: 'var(--text-bone)', lineHeight: 1.6, fontSize: '0.875rem' }}>
            {licitacao.objeto}
          </p>

          {licitacao.data_encerramento && (
            <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-hairline)' }}>
              <span className="eyebrow" style={{ marginRight: '0.5rem' }}>Data de Encerramento:</span>
              <span className="font-mono" style={{ fontWeight: 500, fontSize: '0.8125rem', color: 'var(--text-paper)' }}>
                {formatDate(licitacao.data_encerramento)}
              </span>
            </div>
          )}
        </Card>
      )}

      {activeTab === 'itens' && (
        <Card style={{ animation: 'fadeInUp 0.25s ease-out', padding: 0, overflow: 'hidden' }}>
          {itens.length === 0 ? (
            <EmptyState icon={Package} title="Nenhum item registrado" description="Este edital não possui itens detalhados." />
          ) : (
            <div className="table-container" style={{ border: 'none', borderRadius: 0 }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>Descrição</th>
                    <th style={{ textAlign: 'right' }}>Qtd</th>
                    <th style={{ textAlign: 'right' }}>Valor Unit.</th>
                    <th style={{ textAlign: 'right' }}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {itens.map((item) => (
                    <tr key={item.id}>
                      <td style={{ color: 'var(--text-paper)' }}>{item.descricao}</td>
                      <td className="font-mono" style={{ textAlign: 'right', color: 'var(--text-ash)' }}>{item.quantidade}</td>
                      <td className="font-mono" style={{ textAlign: 'right', color: 'var(--text-ash)' }}>
                        {item.valor_unitario != null ? formatCurrency(item.valor_unitario) : '—'}
                      </td>
                      <td className="font-mono" style={{ textAlign: 'right', fontWeight: 600, color: 'var(--text-paper)' }}>
                        {item.valor_total != null ? formatCurrency(item.valor_total) : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      )}

      {activeTab === 'arquivos' && (
        <Card style={{ animation: 'fadeInUp 0.25s ease-out' }}>
          {arquivos.length === 0 ? (
            <EmptyState icon={Paperclip} title="Nenhum arquivo anexo" description="Não foram encontrados documentos para esta licitação." />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {arquivos.map((arq) => (
                <a
                  key={arq.id}
                  href={arq.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem 1rem',
                    border: '1px solid var(--border-hairline)',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--bg-obsidian)',
                    transition: 'all var(--transition-fast)',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--border-strong)'; e.currentTarget.style.background = 'var(--bg-surface-hover)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-hairline)'; e.currentTarget.style.background = 'var(--bg-obsidian)'; }}
                >
                  <Paperclip size={15} style={{ color: 'var(--accent-electric)', flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 500, fontSize: '0.8125rem', color: 'var(--text-paper)' }} className="truncate">{arq.nome}</div>
                    {arq.tipo && <div className="font-mono text-xs text-secondary">{arq.tipo}</div>}
                  </div>
                  <ExternalLink size={13} style={{ color: 'var(--text-fog)', flexShrink: 0 }} />
                </a>
              ))}
            </div>
          )}
        </Card>
      )}

      {activeTab === 'historico' && (
        <Card style={{ animation: 'fadeInUp 0.25s ease-out' }}>
          {historico.length === 0 ? (
            <EmptyState icon={History} title="Sem histórico registrado" description="Nenhuma fase foi registrada para esta licitação." />
          ) : (
            <Timeline items={historico} />
          )}
        </Card>
      )}
    </div>
  );
};
