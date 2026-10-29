import React from 'react';
import { EmptyState } from '../components/ui/EmptyState';
import { ShieldAlert } from 'lucide-react';

export const Alertas = () => {
  return (
    <div>
      <div className="page-header">
        <div className="eyebrow">Auditoria // Detecção de Anomalias</div>
        <h1>Alertas e Integridade</h1>
        <p>Motor de regras heurísticas para identificação de padrões atípicos e sobrepreço em tempo real.</p>
      </div>

      <div style={{ marginTop: '3.5rem', animation: 'fadeInUp 0.3s ease-out' }}>
        <EmptyState 
          icon={ShieldAlert} 
          title="Motor de Anomalias em Calibração" 
          description="Os pipelines de análise preditiva e heurísticas de auditoria contínua estão em fase de homologação final." 
        />
      </div>
    </div>
  );
};
