# Catálogo de Componentes — Motion Dark UI

> [!IMPORTANT]
> **Regra Inegociável de White-Label:** Ao implementar estes componentes, NUNCA adicione referências à skill ou biblioteca de origem (como "BeUI", "beui.dev"). Mantenha a interface 100% voltada ao produto do usuário ou utilize títulos e dados neutros.

Todos os componentes abaixo foram calibrados com a escala cromática oficial:
- **Canvas / Fundo:** `#151515`
- **Superfície de Cards e Linhas:** `#1c1c1c`
- **Muted / Rail de Swipe:** `#262626`
- **Borda Hairline:** `#262626` / `rgba(255, 255, 255, 0.08)`
- **Texto Principal:** `#ededed`
- **Texto Muted:** `#8e8e93`

---

## 1. Swipeable List (Priority Queue com Spring Motion)

Bloco interativo de linhas deslizáveis com ações ocultas no trilho (`rail`), conforme `beui.dev/components/blocks/swipeable-list`.

### Exemplo em HTML + Tailwind CSS
```html
<div class="w-full max-w-md rounded-3xl bg-[#151515] p-5">
  <!-- Header -->
  <div class="flex items-center justify-between mb-4 px-1">
    <div>
      <h3 class="text-sm font-semibold text-[#ededed]">Priority queue</h3>
      <p class="text-xs text-[#8e8e93] mt-0.5">Ready</p>
    </div>
    <button class="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium text-[#8e8e93] hover:text-[#ededed] bg-[#1c1c1c] border border-[#262626] transition-colors">
      <svg class="size-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
      <span>Reset</span>
    </button>
  </div>

  <!-- Swipeable Rows Stack -->
  <div class="space-y-2">
    <!-- Row 1: Launch brief -->
    <div class="relative isolate overflow-hidden rounded-2xl bg-[#262626]">
      <!-- Hidden Action Rail Underneath -->
      <div class="absolute inset-0 z-0 flex items-center justify-between px-4">
        <button class="flex items-center gap-1.5 text-xs text-[#8e8e93] hover:text-[#ededed] transition-colors">
          <svg class="size-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
          <span>Complete</span>
        </button>
        <button class="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 transition-colors">
          <svg class="size-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
          <span>Delete</span>
        </button>
      </div>

      <!-- Surface Card (Draggable / Motion) -->
      <div class="relative z-10 flex min-h-[72px] cursor-grab touch-pan-y items-center justify-between rounded-2xl border border-[#262626] bg-[#1c1c1c] px-4 py-3 shadow-sm hover:border-white/[0.12] transition-colors">
        <div class="flex items-center gap-3 min-w-0">
          <div class="grid size-9 shrink-0 place-items-center rounded-xl bg-[#262626] text-[#8e8e93]">
            <svg class="size-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
          </div>
          <div class="min-w-0">
            <h4 class="truncate text-sm font-medium text-[#ededed]">Launch brief</h4>
            <p class="truncate text-xs text-[#8e8e93] mt-0.5">Finalize the announcement copy</p>
          </div>
        </div>
        <span class="shrink-0 text-xs font-medium text-[#8e8e93] ml-2">9:41</span>
      </div>
    </div>

    <!-- Row 2: Client feedback -->
    <div class="relative isolate overflow-hidden rounded-2xl bg-[#262626]">
      <div class="relative z-10 flex min-h-[72px] cursor-grab touch-pan-y items-center justify-between rounded-2xl border border-[#262626] bg-[#1c1c1c] px-4 py-3 shadow-sm hover:border-white/[0.12] transition-colors">
        <div class="flex items-center gap-3 min-w-0">
          <div class="grid size-9 shrink-0 place-items-center rounded-xl bg-[#262626] text-[#8e8e93]">
            <svg class="size-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
          </div>
          <div class="min-w-0">
            <h4 class="truncate text-sm font-medium text-[#ededed]">Client feedback</h4>
            <p class="truncate text-xs text-[#8e8e93] mt-0.5">Three comments need a response</p>
          </div>
        </div>
        <span class="shrink-0 text-xs font-medium text-[#8e8e93] ml-2">11:08</span>
      </div>
    </div>

    <!-- Row 3: Design review -->
    <div class="relative isolate overflow-hidden rounded-2xl bg-[#262626]">
      <div class="relative z-10 flex min-h-[72px] cursor-grab touch-pan-y items-center justify-between rounded-2xl border border-[#262626] bg-[#1c1c1c] px-4 py-3 shadow-sm hover:border-white/[0.12] transition-colors">
        <div class="flex items-center gap-3 min-w-0">
          <div class="grid size-9 shrink-0 place-items-center rounded-xl bg-[#262626] text-[#8e8e93]">
            <svg class="size-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
          </div>
          <div class="min-w-0">
            <h4 class="truncate text-sm font-medium text-[#ededed]">Design review</h4>
            <p class="truncate text-xs text-[#8e8e93] mt-0.5">Check spacing before handoff</p>
          </div>
        </div>
        <span class="shrink-0 text-xs font-medium text-[#8e8e93] ml-2">13:20</span>
      </div>
    </div>

    <!-- Row 4: Flagged run -->
    <div class="relative isolate overflow-hidden rounded-2xl bg-[#262626]">
      <div class="relative z-10 flex min-h-[72px] cursor-grab touch-pan-y items-center justify-between rounded-2xl border border-[#262626] bg-[#1c1c1c] px-4 py-3 shadow-sm hover:border-white/[0.12] transition-colors">
        <div class="flex items-center gap-3 min-w-0">
          <div class="grid size-9 shrink-0 place-items-center rounded-xl bg-[#262626] text-[#8e8e93]">
            <svg class="size-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"/></svg>
          </div>
          <div class="min-w-0">
            <h4 class="truncate text-sm font-medium text-[#ededed]">Flagged run</h4>
            <p class="truncate text-xs text-[#8e8e93] mt-0.5">Retry queue has one failed job</p>
          </div>
        </div>
        <span class="shrink-0 text-xs font-medium text-[#8e8e93] ml-2">Now</span>
      </div>
    </div>
  </div>

  <!-- Footer Info -->
  <div class="flex items-center justify-between mt-4 px-1 text-xs text-[#8e8e93]">
    <span>4 open</span>
    <span>Today</span>
  </div>
</div>
```

---

## 2. Donut Chart (Métricas e Segmentação de Planos)

Gráfico circular segmentado com paleta analítica BeUI (`#2563eb`, `#38bdf8`, `#0d9488`, `#fbbf24`) sobre fundo `#151515`.

```html
<div class="w-full max-w-lg rounded-3xl bg-[#151515] p-6 text-[#ededed]">
  <!-- Top Metric -->
  <div class="flex flex-col md:flex-row items-center gap-8 justify-between">
    <!-- SVG Circular Arc / Donut -->
    <div class="relative size-44 shrink-0 flex items-center justify-center">
      <svg class="size-full -rotate-90" viewBox="0 0 100 100">
        <!-- Background Track -->
        <circle cx="50" cy="50" r="38" fill="transparent" stroke="#262626" stroke-width="12" />
        <!-- Team (37.3%) - Blue -->
        <circle cx="50" cy="50" r="38" fill="transparent" stroke="#2563eb" stroke-width="12" stroke-dasharray="89 238" stroke-dashoffset="0" stroke-linecap="round" />
        <!-- Business (27.1%) - Sky -->
        <circle cx="50" cy="50" r="38" fill="transparent" stroke="#38bdf8" stroke-width="12" stroke-dasharray="64 238" stroke-dashoffset="-94" stroke-linecap="round" />
        <!-- Enterprise (19.6%) - Teal -->
        <circle cx="50" cy="50" r="38" fill="transparent" stroke="#0d9488" stroke-width="12" stroke-dasharray="46 238" stroke-dashoffset="-162" stroke-linecap="round" />
        <!-- Starter (16.0%) - Amber -->
        <circle cx="50" cy="50" r="38" fill="transparent" stroke="#fbbf24" stroke-width="12" stroke-dasharray="38 238" stroke-dashoffset="-212" stroke-linecap="round" />
      </svg>
      <!-- Center Text -->
      <div class="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span class="text-xl font-bold tracking-tight text-[#ededed]">$115,150</span>
        <span class="text-[11px] text-[#8e8e93]">Monthly revenue</span>
      </div>
    </div>

    <!-- Breakdown Legend -->
    <div class="flex-1 w-full space-y-3.5">
      <!-- Team -->
      <div>
        <div class="flex items-center justify-between text-xs">
          <div class="flex items-center gap-2">
            <span class="size-2 rounded-full bg-[#2563eb]"></span>
            <span class="font-medium text-[#ededed]">Team</span>
          </div>
          <span class="font-medium text-[#ededed]">37.3% <span class="text-[#8e8e93] font-normal">$42,900</span></span>
        </div>
        <div class="w-full bg-[#262626] h-1.5 rounded-full mt-1.5 overflow-hidden">
          <div class="bg-[#2563eb] h-full rounded-full" style="width: 37.3%"></div>
        </div>
      </div>

      <!-- Business -->
      <div>
        <div class="flex items-center justify-between text-xs">
          <div class="flex items-center gap-2">
            <span class="size-2 rounded-full bg-[#38bdf8]"></span>
            <span class="font-medium text-[#ededed]">Business</span>
          </div>
          <span class="font-medium text-[#ededed]">27.1% <span class="text-[#8e8e93] font-normal">$31,250</span></span>
        </div>
        <div class="w-full bg-[#262626] h-1.5 rounded-full mt-1.5 overflow-hidden">
          <div class="bg-[#38bdf8] h-full rounded-full" style="width: 27.1%"></div>
        </div>
      </div>

      <!-- Enterprise -->
      <div>
        <div class="flex items-center justify-between text-xs">
          <div class="flex items-center gap-2">
            <span class="size-2 rounded-full bg-[#0d9488]"></span>
            <span class="font-medium text-[#ededed]">Enterprise</span>
          </div>
          <span class="font-medium text-[#ededed]">19.6% <span class="text-[#8e8e93] font-normal">$22,600</span></span>
        </div>
        <div class="w-full bg-[#262626] h-1.5 rounded-full mt-1.5 overflow-hidden">
          <div class="bg-[#0d9488] h-full rounded-full" style="width: 19.6%"></div>
        </div>
      </div>

      <!-- Starter -->
      <div>
        <div class="flex items-center justify-between text-xs">
          <div class="flex items-center gap-2">
            <span class="size-2 rounded-full bg-[#fbbf24]"></span>
            <span class="font-medium text-[#ededed]">Starter</span>
          </div>
          <span class="font-medium text-[#ededed]">16.0% <span class="text-[#8e8e93] font-normal">$18,400</span></span>
        </div>
        <div class="w-full bg-[#262626] h-1.5 rounded-full mt-1.5 overflow-hidden">
          <div class="bg-[#fbbf24] h-full rounded-full" style="width: 16%"></div>
        </div>
      </div>
    </div>
  </div>

  <p class="text-[11px] text-[#8e8e93] mt-6 text-center">Select a plan to filter</p>
</div>
```

---

## 3. Animated Sidebar (Fundo `#1c1c1c` com Avatar `#d5ff66`)

```html
<aside class="flex flex-col h-[720px] w-64 bg-[#1c1c1c] border-r border-[#262626] text-[#ededed] p-3 transition-all duration-300">
  <!-- Header / Workspace Selector -->
  <div class="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-white/[0.04] cursor-pointer transition-colors">
    <div class="grid size-7 shrink-0 place-items-center rounded-lg bg-white text-black font-semibold text-xs">
      <svg class="size-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/></svg>
    </div>
    <div class="flex flex-1 items-center justify-between min-w-0">
      <span class="truncate text-sm font-semibold text-[#ededed]">Acme Inc</span>
      <svg class="size-3.5 text-[#8e8e93] shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4"/></svg>
    </div>
  </div>

  <!-- Primary Fast Nav -->
  <div class="mt-4 space-y-1">
    <button class="flex w-full items-center gap-3 px-2.5 py-1.5 rounded-lg text-sm text-[#8e8e93] hover:text-[#ededed] hover:bg-white/[0.04] transition-colors">
      <svg class="size-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
      <span>Search</span>
    </button>
    <button class="flex w-full items-center gap-3 px-2.5 py-1.5 rounded-lg text-sm text-[#8e8e93] hover:text-[#ededed] hover:bg-white/[0.04] transition-colors">
      <svg class="size-4 text-[#d5ff66]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>
      <span>AI Assistant</span>
    </button>
  </div>

  <!-- Workspace Group -->
  <div class="mt-6 flex-1 overflow-y-auto">
    <p class="px-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8e8e93]">Workspaces</p>
    <nav class="mt-2 space-y-1">
      <button class="flex w-full items-center justify-between px-2.5 py-1.5 rounded-lg text-sm font-medium bg-[#151515] text-[#ededed] transition-colors">
        <div class="flex items-center gap-3">
          <svg class="size-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
          <span>People</span>
        </div>
        <svg class="size-3.5 text-[#8e8e93]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
      </button>
    </nav>
  </div>

  <!-- Footer with Chartreuse Avatar -->
  <div class="pt-3 border-t border-[#262626]">
    <button class="flex w-full items-center gap-3 p-1 rounded-xl hover:bg-white/[0.04] transition-colors text-left">
      <span class="grid size-9 shrink-0 place-items-center rounded-full bg-[#d5ff66] text-xs font-semibold text-[#172000]">
        AS
      </span>
      <div class="min-w-0 flex-1">
        <p class="truncate text-sm font-medium text-[#ededed]">Ava Stone</p>
        <p class="truncate text-xs text-[#8e8e93]">ava@solace.app</p>
      </div>
    </button>
  </div>
</aside>
```
