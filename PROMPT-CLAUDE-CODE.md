# IMPLEMENTAÇÃO — Site Dr. Luiz Prestes (Instituto de Psiquiatria Moderna)

Implemente o site one-page do protótipo em React. O arquivo `referencia-claude-design.html` nesta pasta é a **fonte da verdade absoluta** para copy, cores, espaçamentos e hierarquia — porte fielmente, não reinvente. As imagens já estão em `public/images/`.

## Stack
- Vite + React + TypeScript + Tailwind CSS
- Leaflet 1.9.4 via npm (`leaflet` + `@types/leaflet`) — CSS importado no componente do mapa
- Deploy alvo: Cloudflare Pages (build `npm run build`, output `dist`)

## Design tokens (usar via Tailwind theme extend)
```js
colors: {
  cream:    '#F7F4EF',  // fundo base
  paper:    '#FBF8F1',  // cards/molduras
  sand:     '#EAE2D3',  // fundos de imagem
  ink:      '#2B2619',  // texto principal
  muted:    '#6B6250',  // texto secundário
  label:    '#8A8171',  // labels uppercase
  forest:   '#1E3A2F',  // verde autoridade (fundos escuros, CTAs)
  bronze:   '#B8925A',  // dourado/bronze (bordas hairline, acentos)
  brick:    '#C0392B',  // vermelho-helicônia (hover de links, detalhes raros)
}
```
- Tipografia: **Playfair Display** (títulos, serifada; itálico para acentos) + **Source Sans 3** (corpo). Via Google Fonts com `preconnect` + `display=swap`.
- Labels/marcadores: Source Sans 3 600, uppercase, `letter-spacing: .18em–.24em`, 10.5–11px, cor `label` ou `bronze`.
- Molduras: `border: 1px solid rgba(184,146,90,.6)` (hairline bronze) + fundo `paper` + padding interno — padrão "moldura de galeria" usado em todas as fotos.
- Seleção de texto: `::selection { background: rgba(184,146,90,.32) }`. Links: cor forest, hover brick.
- Easing padrão dos reveals: `cubic-bezier(.22,.61,.36,1)`, duração .95s, translateY(26px) → 0.

## Estrutura de arquivos
- Todo conteúdo em arrays/objetos em `/src/data/` (tratamentos.ts, faq.ts, instituto.ts, site.ts com telefone/endereço/coordenadas). Componentes NUNCA hardcodam conteúdo.
- Config central em `site.ts`: `whatsapp: '5563984613530'`, links `wa.me` com `?text=` de mensagem pré-preenchida ("Olá! Vim pelo site e gostaria de agendar uma consulta.") — URL-encoded.
- Seções como componentes: `Hero`, `TrustBar`, `Tratamentos`, `Reac`, `Sobre`, `Instituto`, `ComoChegar`, `Faq`, `CtaFinal`, `Footer`.

## Navbar (kit padrão do estúdio — NÃO NEGOCIÁVEL)
- Hook `useScrollDirection`: esconde ao rolar pra baixo, mostra ao rolar pra cima.
- Scroll spy marcando o link ativo (one-page).
- Menu mobile via `ReactDOM.createPortal`, overlay + painel com **estilos inline** (não Tailwind), z-index 9998/9999.
- Scroll lock iOS: `position:fixed + top:-scrollY` no body (NUNCA `overflow:hidden`).
- Transições: `transition-[transform,background-color,backdrop-filter,border-color]` (NUNCA `transition-all`).
- `border-b` SEMPRE no DOM: transparente no topo, `rgba(184,146,90,.3)` quando rolado — sem layout shift.
- Visual: fundo `rgba(247,244,239,.9)` + `backdrop-blur(14px)`. Logo: quadrado 36px com borda bronze e "LP" em Playfair + nome/subtítulo em duas linhas (ver referência). Links: INÍCIO · TRATAMENTOS · REAC · O INSTITUTO · COMO CHEGAR · CONTATO + botão AGENDAR (fundo forest, texto cream).

## Seções (copy EXATA da referência — destaques do que não pode se perder)
1. **Hero** (`#inicio`): H1 "Recuperar sua qualidade de vida é o meu trabalho." + sub "Psiquiatria intervencionista e neuromodulação REAC em Palmas — ciência de fronteira, com a escuta e o tempo que a sua história merece." + credencial "Dr. Luiz Prestes · CRM-TO 1751 · RQE 1621". Foto `dr-luiz-terno.png` em moldura de galeria 4/5 com legenda "Dr. Luiz Prestes, fundador" / "est. 2017". CTA WhatsApp.
2. **TrustBar**: faixa fina com marcos (instituto próprio desde 2017 · psiquiatria intervencionista · neuromodulação REAC).
3. **Tratamentos** (`#tratamentos`): H2 "Antes do diagnóstico, existe uma pessoa." Grid de 6 cards (Ansiedade, Depressão, Insônia, TDAH no adulto, Transtorno bipolar, Burnout e estresse crônico) com as micro-descrições empáticas exatas da referência.
4. **REAC** (`#reac`): seção de fundo forest (inversão dramática). H2 "Neuromodulação REAC", explicação, 3 itens numerados (01 Não invasiva e indolor / 02 Além da medicação / 03 Integrada ao cuidado). Foto `sala-reac.png`. **MANTER o disclaimer**: "A indicação da REAC é definida individualmente, em consulta. Resultados variam de pessoa para pessoa — nenhum tratamento médico oferece garantia de resultado." (conformidade CFM — não remover nem suavizar).
5. **Sobre** (`#sobre`): H2 "A medicina em que eu acredito começa pela escuta." + bio em primeira pessoa. Foto `dr-luiz-camisa.png`.
6. **Instituto** (`#instituto`): H2 "Um consultório com alma de galeria." Foto grande `instituto-recepcao.png` fullwidth com parallax sutil + grid assimétrico com `instituto-sala.png` (horizontal) e `instituto-detalhe.png` (vertical), legendas em itálico e numeração 01/02/03.
7. **Como Chegar** (`#como-chegar`): H2 "Estamos no coração de Palmas." + mapa (spec abaixo).
8. **FAQ**: H2 "O que costumam me perguntar" — accordion (5 itens: primeira consulta, particular/reembolso, telemedicina, o que é REAC, sigilo médico). Um aberto por vez, ícone +/− girando, animação de altura suave.
9. **CTA final** (`#contato`): H2 "O primeiro passo pode ser hoje." + reuso da foto do terno + botão WhatsApp.
10. **Footer**: credenciais, endereço, Instagram @drluizprestes, aviso "Diretor Técnico: Dr. Luiz Prestes — CRM-TO 1751 · RQE 1621", e "Desenvolvido por Gustavo Dev" linkando https://gustavodev.dev.

## Mapa Leaflet (portar exatamente a lógica da referência)
- Container `#lp-mapa` ~480px desktop / 380px mobile, moldura bronze.
- `L.map(el, { zoomControl: false, scrollWheelZoom: false })`, view inicial `[-14.6, -52.5]` zoom 5 (Brasil).
- Tiles CARTO light_all com atribuição OSM+CARTO, `subdomains:'abcd'`, maxZoom 19.
- Filtro no tilePane: `sepia(.28) saturate(.85) hue-rotate(-8deg) brightness(1.02)`.
- Marker `L.divIcon` com pino forest + anel bronze pulsando (keyframe `lpPulse`: scale .55→2.3, opacity .95→0, ciclo ~2.5s).
- **Lazy init**: IntersectionObserver com `rootMargin: '600px'` inicializa o mapa; segundo observer (`threshold: .3`) dispara `flyTo([-10.2103303, -48.3355088], 16, { duration: 3, easeLinearity: .25 })` UMA única vez. Ambos com retry (o Leaflet pode não estar pronto) e cleanup no unmount.
- Card flutuante sobre o mapa (embaixo dele no mobile): "Instituto de Psiquiatria Moderna", "Sala 812 · 8º andar — Palmas Medical Center / Q. 401 Sul, Av. LO 11 · Palmas – TO", botão "Como chegar →" abrindo `https://www.google.com/maps/search/?api=1&query=-10.2103303,-48.3355088` em nova aba.
- Dragging só após interação/toque; controles +/− customizados na paleta.

## Interações globais (portar da referência)
- Reveal on scroll: IntersectionObserver, `data-reveal`, delay escalonado `min(i*90, 270)ms`, respeitando `prefers-reduced-motion`.
- Parallax sutil (`data-parallax`) nas fotos grandes: translateY de até ±26px via requestAnimationFrame com guard de frame.
- Botão flutuante "Agendar pelo WhatsApp" que aparece após `scrollY > innerHeight * 0.72` (fundo forest, dot bronze pulsando).

## Performance e SEO
- Imagens: converter os PNGs para WebP no build (manter PNG como fallback se simples; senão só WebP + width/height explícitos). `loading="lazy"` em tudo abaixo da dobra; hero eager + `fetchpriority="high"`.
- `<title>`: "Dr. Luiz Prestes — Psiquiatra em Palmas · Instituto de Psiquiatria Moderna". Meta description coerente (psiquiatria intervencionista, neuromodulação REAC, Palmas – TO).
- Open Graph + Twitter Card completos com `og-image` (gerar 1200x630 a partir da foto do terno + faixa forest com nome/título) — padrão do estúdio pro link preview de DM/WhatsApp.
- JSON-LD: `Physician` (nome, CRM, especialidade médica psiquiatria, endereço, telefone, geo) + `MedicalClinic` (Instituto de Psiquiatria Moderna, mesmas coordenadas). Sem claims de resultado.
- Lang `pt-BR`, favicon "LP" no estilo do logo.

## Restrições
- NADA de promessa de cura/resultado, depoimentos de pacientes ou preços — a copy da referência já está em conformidade; portar sem "melhorar".
- Sem `transition-all` em lugar nenhum. Sem `overflow:hidden` para scroll lock.
- Mobile-first: revisar cada seção em 390px antes de considerar pronta.
