---
name: precision-craft-ui
description: >-
  Design System híbrido exclusivo que funde a estética midnight precision do Linear (#08090a, bordas hairline de 1px/0.5px e acento electric acid lime #e4f222), a disciplina tipográfica e terminal do Vercel (Geist Sans com tracking negativo em títulos e Geist Mono em caps com espaçamento aberto) e a arquitetura de componentes do shadcn/ui (radix primitives, raio de curvatura 6px/12px, tokens semânticos e alta acessibilidade). Ative esta skill sempre que o usuário solicitar criação de interfaces, componentes React/Tailwind/HTML, dashboards, landing pages de engenharia, sistemas internos ou refatoração visual com estilo moderno, escuro e de alta precisão.
---

# Precision Craft UI — Hybrid Design System

O **Precision Craft UI** é um Design System de alta fidelidade desenvolvido especificamente para ferramentas de desenvolvimento, dashboards de dados e aplicações SaaS modernas. Ele une o melhor de três mundos:

1. **Linear (Midnight Precision):** Camadas escuras profundas (`#08090a`), bordas estruturais ultra-finas (*hairline* de 1px com baixa opacidade em vez de sombras pesadas) e um acento pontual de alta voltagem (*Acid Lime* `#e4f222`).
2. **Vercel (Typographic Discipline):** Tipografia Geist Sans com tracking negativo cirúrgico em títulos grandes (`-0.05em`), contraste monocromático disciplinado e Geist Mono para metadados, IDs técnicos e atalhos de teclado.
3. **shadcn/ui (Component Architecture):** Padrões composíveis e acessíveis (Radix Primitives), proporção de raios geométricos (6px para controles, 12-14px para contêineres e 9999px para pills) e estrutura limpa de classes Tailwind CSS.

---

## 1. Tokens de Cores e Superfícies

### 1.1 Hierarquia de Superfícies (Dark Stack)

| Nome do Token | Valor Hex | Função / Aplicação |
| :--- | :--- | :--- |
| `--bg-void` | `#08090a` | **Canvas principal**: fundo absoluto da página e telas cheias. |
| `--bg-carbon` | `#0f1011` | **Cards e barras**: primeiro degrau acima do canvas para agrupar conteúdo. |
| `--bg-obsidian` | `#161718` | **Superfícies elevadas**: modais, popovers, dropdowns e menus flutuantes. |
| `--bg-subtle` | `#1c1d1f` | **Itens ativos**: fundo de itens selecionados em listas ou inputs ativos. |
| `--bg-surface-hover` | `#212326` | **Hover**: realce sutil ao passar o cursor sobre superfícies interativas. |

### 1.2 Bordas Hairline & Divisores

Em vez de depender de drop shadows difusas, o sistema utiliza bordas translúcidas de 1px com geometria rígida:
- **Borda Hairline Padrão:** `rgba(255, 255, 255, 0.08)` (em Tailwind: `border-white/[0.08]`)
- **Borda em Hover:** `rgba(255, 255, 255, 0.16)` (`hover:border-white/[0.16]`)
- **Borda de Foco/Destaque:** `rgba(228, 242, 34, 0.8)` (`focus:border-[#e4f222]/80`)

### 1.3 Escala de Texto e Contraste

- **Paper (`#ffffff`):** Títulos principais, display type e números em destaque.
- **Bone (`#e5e5e6`):** Corpo de texto padrão e botões primários escuros.
- **Mist (`#d0d6e0`):** Subtítulos e rótulos de botões secundários.
- **Ash (`#8a8f98`):** Descrições atenuadas, ícones inativos e metadados secundários.
- **Fog (`#62666d`):** Captions, micro-copy, atalhos inativos e placeholders de input.

### 1.4 Acentos de Ação e Status

- **Acid Lime (`#e4f222`):** O acento primário do sistema. Usado com **extrema parcimônia** apenas para o CTA primário, ponto de status ativo ou linha de progresso vital.
- **Pulse Green (`#27a644`):** Indicador de status positivo, deploy com sucesso ou conexão ativa.
- **Coral Red (`#eb5757`):** Erros, ações destrutivas e alertas críticos.
- **Iris Violet (`#6366f1`):** Badges de categoria e tags de organização.
- **Signal Teal (`#02b8cc`):** Links informativos ou rotas de API.

---

## 2. Tipografia e Espaçamento de Precisão

### 2.1 Fontes Recomendadas
- **UI Sans:** `Geist Sans` ou `Inter` (fallback: `-apple-system`, `sans-serif`)
- **UI Mono:** `Geist Mono` ou `JetBrains Mono` (fallback: `ui-monospace`, `monospace`)

### 2.2 Escala Tipográfica & Micro-Tracking

| Papel | Tamanho | Leading | Tracking | Exemplo de Aplicação |
| :--- | :--- | :--- | :--- | :--- |
| **Eyebrow** | `11px` | `1.4` | `+0.071em` (wide) | Mono uppercase para seções (ex: `INFRASTRUCTURE // EDGE`) |
| **Caption** | `12px` | `1.33` | normal | Textos de ajuda, rodapés e carimbos de tempo |
| **Body Sm** | `13px` | `1.5` | `-0.006em` | Itens de lista compacta, descrições secundárias |
| **Body** | `14px` | `1.5` | `-0.011em` | Texto de leitura padrão em cartões e formulários |
| **Subheading** | `20px` | `1.3` | `-0.025em` | Títulos de seções ou cabeçalhos de modal |
| **Heading** | `32px` | `1.15` | `-0.045em` | Títulos de páginas ou dashboards |
| **Display Hero** | `48px–64px` | `1.05` | `-0.055em` a `-0.06em` | Headlines de impacto (estilo Vercel/Linear) |

> **Regra de Ouro da Tipografia:** Títulos grandes sempre usam tracking negativo (`tracking-[-0.05em]`) para gerar um aspecto denso e arquitetado. Rótulos mono em caps usam tracking positivo (`tracking-[0.071em]`) para facilitar a leitura.

---

## 3. Formas, Bordas e Raio Geométrico

- **Controles e Inputs (`6px`):** Botões, inputs de texto, seletores e itens de menu interno usam `rounded-[6px]`.
- **Cards e Painéis (`12px` a `14px`):** Contêineres de informação usam `rounded-[12px]`.
- **Badges de Status & Pills (`9999px`):** Indicadores de status e pills de navegação usam `rounded-full`.
- **Atalhos de Teclado (`3px`):** Tags `<kbd>` usam `rounded-[3px]`.

---

## 4. Padrões de Código e Componentes

Consulte o arquivo de referência de componentes em:
[`resources/components.md`](./resources/components.md)

### 4.1 Botão de Ação Primária (Acid Lime)
```html
<button class="inline-flex items-center justify-center gap-2 px-3.5 py-1.5 text-[13px] font-medium text-[#08090a] bg-[#e4f222] hover:bg-[#d2df1d] active:scale-[0.98] rounded-[6px] transition-all duration-150 select-none">
  Deploy Project
</button>
```

### 4.2 Card Hairline com Hover Sutil
```html
<div class="group relative p-5 bg-[#0f1011] hover:bg-[#121315] border border-white/[0.08] hover:border-white/[0.16] rounded-[12px] transition-all duration-200">
  <div class="font-mono text-[11px] tracking-[0.071em] text-[#8a8f98] uppercase mb-2">ENG-1024</div>
  <h3 class="text-[15px] font-medium text-white mb-1.5 group-hover:text-[#e4f222] transition-colors">Edge Proxy Runtime</h3>
  <p class="text-[13px] text-[#8a8f98] leading-relaxed">Reduced latency overhead across all multi-region clusters.</p>
</div>
```

### 4.3 Trigger de Busca com Atalho ⌘K
```html
<button class="flex items-center justify-between px-3 py-1.5 text-[13px] text-[#8a8f98] bg-[#0f1011] hover:bg-[#161718] border border-white/[0.08] rounded-[6px]">
  <span>Search documentation...</span>
  <kbd class="px-1.5 py-0.5 text-[10px] font-mono text-[#8a8f98] bg-[#161718] border border-white/[0.08] rounded-[3px]">⌘K</kbd>
</button>
```

---

## 5. Diretrizes: Do's and Don'ts

### O que fazer (Do):
- [x] Use a cor preta profunda `#08090a` como base inegociável.
- [x] Delimite caixas com bordas translúcidas finas (`border border-white/[0.08]`) em vez de sombras borradas.
- [x] Aplique o acento `#e4f222` como uma **lanterna funcional**: nunca pinte grandes áreas ou fundos com ele; use-o estritamente no elemento que exige a atenção primária do usuário.
- [x] Inclua atalhos de teclado visíveis (`⌘K`, `↵`, `G + I`) em menus e barras de comando para reforçar a agilidade.
- [x] Combine fontes mono para metadados, status e números, com fontes sans para prosa e títulos.

### O que NÃO fazer (Don't):
- [ ] NÃO use cinzas médios no fundo que deixem a interface parecendo "lavada" ou desbotada. O fundo deve ser quase preto absoluto.
- [ ] NÃO crie sombras volumosas com blur de 30px ou 40px no estilo "neomorfismo" ou "skeuomorfismo".
- [ ] NÃO use gradientes arco-íris exagerados sem propósito funcional.
- [ ] NÃO misture mais de 2 famílias tipográficas. Mantenha Geist Sans + Geist Mono.
- [ ] NÃO use botões com cantos excessivamente arredondados (tipo cápsula) misturados com inputs quadrados de 0px de raio. Siga a regra: 6px para botões/inputs, 12px para cards.

---

## 6. Recursos e Arquivos Auxiliares

- [`resources/tokens.css`](./resources/tokens.css): Definição pura de variáveis CSS e configuração Tailwind v4 `@theme`.
- [`resources/tailwind.config.js`](./resources/tailwind.config.js): Configuração estendida para projetos usando Tailwind CSS v3.
- [`resources/components.md`](./resources/components.md): Guia detalhado de componentes prontos para copiar e colar.
- [`resources/templates/preview.html`](./resources/templates/preview.html): Template completo de demonstração interativa.

