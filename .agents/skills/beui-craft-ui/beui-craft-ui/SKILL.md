---
name: beui-craft-ui
description: >-
  Design System dark de alta precisão e motion fluido inspirado no BeUI (beui.dev). Apresenta canvas escuro neutro calibrado em obsidian/carvão (#151515), superfícies e cards em charcoal (#1c1c1c), camadas mutáveis e rails em (#262626), bordas hairline ultra-sutis de 1px (rgba(255, 255, 255, 0.08) / #262626), acento de ação em Electric Blue (#0084ff), assinatura visual contrastante em Chartreuse Acid (#d5ff66 com texto #172000), paleta de dados vibrante (#2563eb, #38bdf8, #0d9488, #fbbf24) e componentes interativos orientados a micro-interações do framer-motion (sidebars retráteis para icon rail, swipeable lists com spring-settle, listas ordenáveis com drag-handle, switches táteis e charts modernos). Ative esta skill sempre que o usuário solicitar interfaces no estilo BeUI, componentes motion-driven, swipeable rows, sidebars retráteis animadas ou dashboards SaaS escuros de alta fidelidade.
---

# BeUI Craft UI — Motion-First Dark Design System

> **"Make room for what matters."**
> Design System dark de alta precisão, composável e focado em micro-interações fluidas (spring motion), extraído com fidelidade cromática absoluta da biblioteca oficial [BeUI](https://beui.dev/).

**Tema Base:** Dark Charcoal Obsidian (`#151515`)  
**Superfícies de Cards e Linhas:** `#1c1c1c`  
**Superfícies Muted e Rails:** `#262626`  
**Acentos Principais:** Electric Blue (`#0084ff` / `#2563eb`), Chartreuse Acid (`#d5ff66`), Paleta de Métricas (`#38bdf8`, `#0d9488`, `#fbbf24`, `#10b981`)  
**Assinatura Geométrica:** Bordas Hairline de 1px (`#262626` ou `border-white/[0.08]`), cantos arredondados generosos de `16px` (`rounded-2xl`) em cards e linhas, e pílulas `rounded-full` em botões e switches.

---

## 1. Tokens de Superfícies & Cores (Calibração Exata do beui.dev)

Diferente de sistemas azuis/roxeados ou do pitch-black `#000000`, o BeUI emprega uma paleta escura neutra e acolhedora (`#151515`), criando uma transição suave entre o canvas e as superfícies interativas (`#1c1c1c`):

| Token Semântico | Hex Real | RGB | Função / Aplicação |
| :--- | :--- | :--- | :--- |
| `--background` / `--bg-canvas` | `#151515` | `21, 21, 21` | **Canvas principal do BeUI**: Fundo da página, abas e corpo do layout. |
| `--card` / `--bg-surface` | `#1c1c1c` | `28, 28, 28` | **Superfície de Cards e Linhas**: O fundo padrão de linhas de listas (Swipeable / Sortable), painéis e modais. |
| `--muted` / `--bg-muted` | `#262626` | `38, 38, 38` | **Trilho (Rail) & Ações Ocultas**: Fundo revelado durante o gesto de swipe, botões secundários e containers de ícone neutros. |
| `--surface-hover` | `#242424` | `36, 36, 36` | **Hover Sutil**: Realce de botões, itens de menu e cards sob o cursor. |
| `--border` / `--border-subtle` | `#262626` | `rgba(255,255,255,0.08)` | **Borda Hairline 1px**: Divisão sutil entre linhas e contêineres. |
| `--border-focus-active` | `#0084ff` | `0, 132, 255` | **Borda Ativa**: Contorno de seleção de cards (ex: "Signed contract"). |
| `--text-foreground` | `#ededed` | `237, 237, 237` | **Texto Primário**: Títulos, nomes de itens e métricas em destaque. |
| `--text-muted` | `#8e8e93` | `142, 142, 147` | **Texto Secundário / Muted**: Descrições, horas, contadores e tags. |
| `--accent-action` | `#0084ff` | `0, 132, 255` | **Electric Blue**: Botões primários, toggles de notificação ativos e destaques. |
| `--accent-brand` | `#d5ff66` | `#172000` text | **Chartreuse Acid**: Badge de avatar do usuário, tags especiais e pontos de atenção. |

### 1.1 Paleta de Gráficos e Status (Charts & Data Viz)
Extraída diretamente dos blocos de gráficos (Donut Chart e Price Target Fan) do BeUI:
- **Royal Blue (Team / Focus):** `#2563eb`
- **Sky Blue (Business / Target 2):** `#38bdf8`
- **Teal / Emerald (Enterprise / High Target):** `#0d9488` / `#10b981`
- **Amber (Starter / Base Target):** `#fbbf24` / `#f59e0b`
- **Destructive / Error:** `#ef4444` / `#f87171`

---

## 2. Tipografia & Escala

- **Família Sans:** `Inter`, `-apple-system`, `BlinkMacSystemFont`, `sans-serif`
- **Família Mono:** `ui-monospace`, `SFMono-Regular`, `Menlo`, `Monaco`, `monospace`
- **Diretriz de Tracking:**
  - Títulos principais (`text-xl`, `text-2xl`): `tracking-tight` (`-0.025em`).
  - Metadados e horas (`9:41`, `11:08`): `font-normal` e cores atenuadas (`#8e8e93`).
  - Kickers e overlines: `text-[10px]` ou `text-xs uppercase font-semibold tracking-[0.16em]`.

---

## 3. Geometria & Física de Movimento (Motion Specs)

### 3.1 Raios de Curvatura
- **Linhas de Listas (Swipeable / Sortable Rows):** `16px` (`rounded-2xl`)
- **Contêineres de Widget / Shells:** `20px` a `24px` (`rounded-2xl` / `rounded-3xl`)
- **Caixas de Ícone Internas:** `10px` a `12px` (`rounded-xl`)
- **Botões de Ação, Toggles e Avatares:** `9999px` (`rounded-full`)

### 3.2 Spring Physics (Especificação do Swipeable List)
Baseado na implementação do BeUI (`ROW_SETTLE`):
```ts
const ROW_SETTLE = {
  type: "spring",
  stiffness: 560,
  damping: 48,
  mass: 0.82,
  restDelta: 0.5,
  restSpeed: 8,
};
const OPEN_DISTANCE_RATIO = 0.46;
const CLOSE_DISTANCE_RATIO = 0.72;
```
- **Arrasto no eixo X (`touch-pan-y`):** O elemento pai isola o gesto horizontal enquanto a página mantém a rolagem vertical nativa.
- **Rail Oculto (`bg-muted`):** Fica sob a linha (`absolute inset-0 z-0 bg-[#262626]`) revelando as ações de swipe à esquerda ou à direita.

---

## 4. Componentes Principais

Consulte o arquivo [`resources/components.md`](./resources/components.md) para ver a implementação completa dos componentes:
1. **Swipeable List (Priority Queue):** Linhas interativas com fundo `#1c1c1c`, borda hairline `#262626`, rail `#262626` e suporte a ações de arrasto/swipe.
2. **Animated Sidebar:** Header com Workspace switcher, Menus agrupados com submenus animados, Footer de usuário com badge Chartreuse e transição elástica para icon rail.
3. **Sortable Studio List:** Lista reordenável com drag-handle (6 pontos), caixas de ícones coloridas e contadores tabulares.
4. **Donut Chart & Price Target Fan:** Gráficos elegantes com a paleta analítica do BeUI.
5. **Selection Cards & Toggles:** Cards ativos com borda Electric Blue `#0084ff` e switches táteis em pílula.

---

## 5. Diretrizes de Implementação & Brand Neutrality (Regra Inegociável)

> [!IMPORTANT]
> **Neutralidade de Marca na Interface (White-Label):**
> Ao implementar interfaces usando esta skill, **NUNCA injete referências ao nome da skill ou à biblioteca de origem** (ex: NÃO escreva *"BeUI"*, *"beui.dev"*, *"BeUI Design System"*, *"beui active"* etc.) em nenhum elemento da tela (títulos, logos, badges, kickers, placeholders ou rodapés), a menos que o usuário solicite explicitamente essa marca.
> A interface gerada deve ser 100% voltada ao produto do usuário ou utilizar marcas fictícias limpas (ex: *"Acme Inc"*, *"Workspace"*, *"Studio"*, *"Analytics"*).

### O que fazer (Do):
- ✅ Mantenha a interface 100% white-label e contextualizada ao negócio do usuário, sem auto-referências à skill.
- ✅ Use **`#151515`** como a cor de fundo definitiva da aplicação e **`#1c1c1c`** para superfícies de cards e linhas de listas.
- ✅ Use **`#262626`** para superfícies neutras rebaixadas/reveladas (rail de swipe, fundos de badges neutros e bordas sutis).
- ✅ Mantenha o acento **Electric Blue (`#0084ff`)** para ações afirmativas e toggles ligados, e o **Chartreuse Acid (`#d5ff66`)** com texto `#172000` para identificação de perfil.
- ✅ Utilize `rounded-2xl` (16px) nas linhas de listas e contêineres principais.
- ✅ Aplique `touch-pan-y` nas linhas com swipe para preservar a rolagem vertical no mobile.

### O que NÃO fazer (Don't):
- ❌ **NUNCA** adicione "beui", "beui.dev" ou similares em textos visíveis, badges de status, logos ou cabeçalhos da interface gerada.
- ❌ NÃO utilize preto azulado (`#0c0d0e`) ou preto puro (`#000000`) no fundo geral; o design system utiliza o tom neutro calibrado `#151515`.
- ❌ NÃO utilize cinzas frios ou saturados de azul para os cards; mantenha o neutro `#1c1c1c`.
- ❌ NÃO use sombras pretas pesadas; a separação cromática entre `#151515` e `#1c1c1c` combinada com bordas de `1px #262626` é a assinatura visual.
- ❌ NÃO force bordas grossas nos itens inativos; mantenha a sutileza da linha hairline.

---

## 6. Recursos da Skill

- [`resources/tokens.css`](./resources/tokens.css): Variáveis CSS exatas com a paleta `#151515` / `#1c1c1c`.
- [`resources/tailwind.config.js`](./resources/tailwind.config.js): Configuração estendida para Tailwind CSS v3.
- [`resources/components.md`](./resources/components.md): Catálogo de componentes com Swipeable List, Donut Chart e Sidebar.
- [`resources/templates/preview.html`](./resources/templates/preview.html): Demonstração interativa e fiel pronta para abrir no navegador.
