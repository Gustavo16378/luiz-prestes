# Dr. Luiz Prestes — Instituto de Psiquiatria Moderna

Site institucional one-page do Dr. Luiz Prestes (psiquiatria intervencionista e
neuromodulação REAC em Palmas – TO). Vite + React + TypeScript + Tailwind CSS.

## Rodar localmente

```bash
npm install
npm run dev      # http://localhost:5173
```

## Build de produção

```bash
npm run build    # gera WebP + og-image (prebuild) e compila para dist/
npm run preview  # serve o dist localmente
```

O `prebuild` (`scripts/gen-assets.mjs`) converte os PNGs de `public/images` para
WebP e gera a `public/og-image.jpg` (1200×630) a partir do retrato + faixa
forest. Se o `sharp` não estiver disponível, o passo é ignorado sem quebrar o
build (o `<picture>` cai no PNG).

## Deploy — Cloudflare Pages

- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Node:** 18+

## Estrutura

- `src/data/` — todo o conteúdo (copy, tratamentos, FAQ, instituto, config em
  `site.ts` com WhatsApp/endereço/coordenadas). Componentes não hardcodam texto.
- `src/hooks/` — scroll direction, scroll spy, reveal, parallax, scroll lock.
- `src/components/` — seções (Hero, TrustBar, Tratamentos, Reac, Sobre,
  Instituto, ComoChegar, Faq, CtaFinal, Footer) + Navbar, mapa Leaflet e botão
  flutuante.

## Notas de conformidade (CFM)

A copy segue as diretrizes: sem promessa de cura/resultado, sem depoimentos de
pacientes e sem preços. O disclaimer da REAC é obrigatório — não remover nem
suavizar.
