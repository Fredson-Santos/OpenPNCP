# Precision Craft UI — Catálogo de Componentes

Guia de componentes construídos sobre os princípios híbridos:
- **Atmosfera e Superfícies:** Linear (Dark Midnight, Hairline Borders)
- **Tipografia e Contraste:** Vercel (Geist Sans com tracking negativo, Geist Mono em caps)
- **Ergonomia e Composição:** shadcn/ui (Radix primitives, micro-interações, acessibilidade)

---

## 1. Botões (Buttons)

### 1.1 Botão de Ação Primária (Acid Lime)
*O foco focal da interface. Usado para a ação principal da tela ou fluxo crítico.*

```html
<button class="inline-flex items-center justify-center gap-2 px-3.5 py-1.5 text-[13px] font-medium text-[#08090a] bg-[#e4f222] hover:bg-[#d2df1d] active:scale-[0.98] rounded-[6px] shadow-[0_1px_2px_rgba(0,0,0,0.4)] transition-all duration-150 select-none">
  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
  <span>Deploy Project</span>
</button>
```

### 1.2 Botão Neutro Escuro (Obsidian Hairline)
*Ação secundária padrão. Fundo carbono com borda de 1px hairline e texto mist.*

```html
<button class="inline-flex items-center justify-center gap-2 px-3.5 py-1.5 text-[13px] font-medium text-[#e5e5e6] bg-[#0f1011] hover:bg-[#161718] hover:text-white border border-white/[0.08] hover:border-white/[0.14] active:scale-[0.98] rounded-[6px] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-all duration-150 select-none">
  <span>Documentation</span>
</button>
```

### 1.3 Botão Ghost com Atalho de Teclado (Command Trigger)
*Inspirado no Quick Open do Linear e command menu do Vercel.*

```html
<button class="flex items-center justify-between w-64 px-3 py-1.5 text-[13px] text-[#8a8f98] bg-[#0f1011] hover:bg-[#161718] hover:text-[#d0d6e0] border border-white/[0.08] rounded-[6px] transition-colors duration-150">
  <div class="flex items-center gap-2">
    <svg class="w-3.5 h-3.5 text-[#62666d]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
    </svg>
    <span>Search or jump to...</span>
  </div>
  <kbd class="flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono text-[#8a8f98] bg-[#161718] border border-white/[0.08] rounded-[3px]">
    <span class="text-[11px]">⌘</span>K
  </kbd>
</button>
```

---

## 2. Cards & Contêineres

### 2.1 Card de Precisão com Hairline Border e Efeito Hover
*Fundo `#0f1011`, borda hairline sem sombras volumosas desnecessárias.*

```html
<div class="group relative p-5 bg-[#0f1011] hover:bg-[#121315] border border-white/[0.08] hover:border-white/[0.16] rounded-[12px] transition-all duration-200">
  <!-- Subtle Top Highlight Line -->
  <div class="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.1] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
  
  <div class="flex items-start justify-between mb-3">
    <span class="font-mono text-[11px] tracking-[0.071em] text-[#8a8f98] uppercase">ENG-3402</span>
    <span class="inline-flex items-center gap-1.5 px-2 py-0.5 text-[11px] font-medium text-[#27a644] bg-[#27a644]/10 border border-[#27a644]/20 rounded-full">
      <span class="w-1.5 h-1.5 rounded-full bg-[#27a644] animate-pulse"></span>
      In Progress
    </span>
  </div>

  <h3 class="text-[15px] font-medium text-white tracking-[-0.015em] mb-1.5 group-hover:text-[#e4f222] transition-colors">
    Optimize cold start latency on Edge Workers
  </h3>
  <p class="text-[13px] text-[#8a8f98] leading-relaxed">
    Refactored wasm runtime hooks reducing bundle transfer by 42%. Awaiting canary verification.
  </p>
</div>
```

---

## 3. Badges, Eyebrows & Status

### 3.1 Eyebrow Monospace (Estilo Vercel)
```html
<p class="font-mono text-[11px] font-medium text-[#8a8f98] tracking-[0.071em] uppercase mb-2">
  Infrastructure // Global Edge
</p>
```

### 3.2 Badge de Status Ativo com Pulso Elétrico (Estilo Linear)
```html
<div class="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono text-[#e5e5e6] bg-[#161718] border border-white/[0.08] rounded-full">
  <span class="relative flex h-2 w-2">
    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e4f222] opacity-75"></span>
    <span class="relative inline-flex rounded-full h-2 w-2 bg-[#e4f222]"></span>
  </span>
  <span>99.99% Uptime</span>
</div>
```

---

## 4. Campos de Entrada (Form Inputs)

### 4.1 Input Textual de Alta Precisão
*Borda sutil, sem contornos pesados, foco nítido com anel discreto.*

```html
<div class="space-y-1.5">
  <label class="block text-[12px] font-medium text-[#8a8f98]">Project Name</label>
  <div class="relative">
    <input 
      type="text" 
      placeholder="antigravity-dashboard" 
      class="w-full px-3 py-1.5 text-[13px] text-white placeholder-[#62666d] bg-[#0f1011] border border-white/[0.08] rounded-[6px] focus:outline-none focus:border-[#e4f222]/80 focus:ring-1 focus:ring-[#e4f222]/80 transition-all font-mono"
    />
  </div>
</div>
```

---

## 5. Painel Terminal / CLI (Estilo Vercel Engine)

```html
<div class="bg-[#08090a] border border-white/[0.08] rounded-[10px] overflow-hidden font-mono text-[12px]">
  <!-- Terminal Header -->
  <div class="flex items-center justify-between px-3 py-2 bg-[#0f1011] border-b border-white/[0.06]">
    <div class="flex items-center gap-1.5">
      <span class="w-2.5 h-2.5 rounded-full bg-[#23252a] border border-white/[0.05]"></span>
      <span class="w-2.5 h-2.5 rounded-full bg-[#23252a] border border-white/[0.05]"></span>
      <span class="w-2.5 h-2.5 rounded-full bg-[#23252a] border border-white/[0.05]"></span>
      <span class="ml-2 text-[11px] text-[#62666d]">terminal.sh</span>
    </div>
    <span class="text-[11px] text-[#62666d]">sh</span>
  </div>
  
  <!-- Terminal Body -->
  <div class="p-3.5 space-y-1 text-[#8a8f98] leading-relaxed">
    <p><span class="text-[#27a644]">▲</span> <span class="text-white font-medium">agy deploy</span> --prod</p>
    <p class="text-[#62666d]">Resolving build dependencies...</p>
    <p class="text-[#62666d]">Compiling 38 edge routes [1.14s]</p>
    <p class="text-[#e4f222]">✓ Deployed to production in 2.3s</p>
    <p class="text-white">url: <span class="text-[#02b8cc] underline underline-offset-2">https://precision.internal.dev</span></p>
  </div>
</div>
```

