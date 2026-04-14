# Brothers Labs Frontend

Landing page institucional premium da **Brothers Labs**, desenvolvida com Angular 20 para comunicar posicionamento global de tecnologia, inovacao e engenharia de software de alto nivel.

## Visao Geral

Este projeto entrega uma HomePage moderna, responsiva e escalavel para apresentacao institucional da Brothers Labs, com foco em:

- desenvolvimento de sistemas sob medida
- inteligencia artificial aplicada a negocio
- front-end moderno com Angular
- APIs e back-end com Node.js
- arquitetura escalavel para produtos SaaS

A interface foi planejada para alto valor percebido: design escuro sofisticado, gradientes, glow sutil, microinteracoes e tipografia premium.

## Stack Tecnica

- Angular `20.x` (standalone components)
- TypeScript `5.8.x`
- Angular Material + CDK
- HTML5 semantico
- CSS3 avancado (animacoes, glassmorphism leve, layout responsivo)
- RxJS
- Karma + Jasmine (estrutura padrao para testes unitarios)

## Requisitos de Ambiente

- Node.js `>= 20` (recomendado LTS)
- npm `>= 10`
- Angular CLI `20` (opcional global, pois o projeto usa `npx`/script local)

## Setup Rapido

```bash
# 1) instalar dependencias
npm install

# 2) rodar em desenvolvimento
npm run start

# 3) abrir no navegador
http://localhost:4200
```

## Scripts Disponiveis

```bash
npm run start   # ng serve (dev server)
npm run build   # build de producao
npm run watch   # build em modo watch/dev
npm run test    # testes unitarios com Karma
```

## Arquitetura Atual

```text
src/
  app/
    app.ts          # componente raiz (dados da home, tipagem, animacao de contadores)
    app.html        # markup semantico da landing page
    app.css         # estilos locais premium (secoes, cards, efeitos, responsividade)
    app.config.ts   # providers globais (router + animacoes)
    app.routes.ts   # rotas da aplicacao
    app.spec.ts     # teste baseline do componente raiz
  index.html        # metadados, fontes e bootstrap HTML
  main.ts           # bootstrap da aplicacao
  styles.css        # estilos globais + tema Angular Material
public/
  favicon.ico
```

## Estrutura de Secoes da Home

A HomePage contem:

1. Header fixo com efeito ao scroll
2. Hero de alto impacto com CTA duplo
3. Sobre a empresa
4. Servicos (cards premium)
5. Diferenciais
6. Indicadores com contador animado
7. Tecnologias (badges por categoria)
8. CTA final de conversao
9. Footer institucional

## Design System (Brand Tokens)

Paleta aplicada no projeto:

- Primary: `#00AEEF`
- Primary Dark: `#0077B6`
- Primary Light: `#6EDBFF`
- Secondary: `#7A5CFF`
- Secondary Dark: `#4B3AC7`
- Secondary Light: `#B6A8FF`
- Background Main: `#050B18`
- Background Soft: `#0A1F44`
- Background Card: `#0F172A`
- Background Hover: `#16213E`
- Text Primary: `#FFFFFF`
- Text Secondary: `#A0A7B8`
- Text Muted: `#6B7280`

Gradientes principais:

- `linear-gradient(135deg, #00AEEF, #7A5CFF)`
- `linear-gradient(180deg, #050B18 0%, #0A1F44 100%)`

## Acessibilidade e UX

Implementacoes basicas ja contempladas:

- hierarquia semantica de headings e secoes
- elementos de navegacao com `aria-label`
- suporte a `prefers-reduced-motion`
- contraste pensado para tema escuro premium
- navegacao por links internos com scroll suave

## Responsividade

Breakpoints principais aplicados para desktop, tablet e mobile:

- ajuste de grid para cards/secoes
- reorganizacao de hero e footer em telas menores
- menu mobile com Angular Material (`mat-menu`)

## Build e Qualidade

- build de producao validado com `npm run build`
- configuracao de budget ajustada para landing premium em `angular.json`
- codigo organizado em separacao clara de `TS + HTML + CSS`

## Deploy

### Build de producao

```bash
npm run build
```

Artefatos gerados em:

```text
dist/brothers-labs-frontend/
```

Esse diretorio pode ser publicado em provedores como Vercel, Netlify, Azure Static Web Apps, AWS S3 + CloudFront, etc.

## GitHub Actions (CI, Deploy e Release)

Este repositorio ja possui pipeline completa em:

- `.github/workflows/ci.yml`
- `.github/workflows/deploy-pages.yml`
- `.github/workflows/release.yml`

### 1. CI automatica

- Dispara em `push` e `pull_request` para `main`
- Executa:
  - `npm ci`
  - `npm run build`

### 2. Deploy automatico no GitHub Pages

- Dispara em `push` para `main` (e tambem manualmente)
- Build com `base-href` dinamico para repositorio de projeto no Pages
- Publica o artefato de `dist/brothers-labs-frontend/browser`

Passos obrigatorios no GitHub (uma unica vez):

1. Ir em `Settings > Pages`
2. Em `Source`, selecionar `GitHub Actions`
3. Garantir que a branch principal seja `main`

Depois disso, cada push na `main` publica uma nova versao do site.

### 3. Release com versionamento semantico

Workflow manual em `Actions > Release Version > Run workflow`

Escolha o tipo de incremento:

- `patch` (ex: `0.0.1` -> `0.0.2`)
- `minor` (ex: `0.0.1` -> `0.1.0`)
- `major` (ex: `0.0.1` -> `1.0.0`)

Esse fluxo faz automaticamente:

1. Atualiza versao no `package.json`/`package-lock.json`
2. Cria commit `chore(release): vX.Y.Z`
3. Cria tag Git `vX.Y.Z`
4. Faz push para `main`
5. Cria GitHub Release com notas automaticas

Observacao:

- O push da release na `main` tambem aciona o deploy do site.

## Convencoes Recomendadas (time)

- usar tipagem explicita para modelos e dados de UI
- manter componentizacao por secao para escalar a landing
- centralizar tokens de tema para reaproveitamento
- adotar Conventional Commits (`feat:`, `fix:`, `chore:`)

## Evolucao Sugerida de Estrutura

Para crescimento do projeto, recomenda-se migrar para:

```text
src/app/
  core/                 # models, constants, services, guards
  shared/               # componentes e utilitarios reutilizaveis
  pages/
    home/
      home.page.ts
      home.page.html
      home.page.css
  components/
    sections/
      hero-section/
      services-section/
      metrics-section/
      technologies-section/
      cta-section/
      footer-section/
```

## Roadmap Tecnico

- [ ] separar Home em componentes de secao reutilizaveis
- [ ] adicionar testes unitarios para regras de animacao e navegacao
- [ ] integrar formulario real de contato (API/CRM)
- [ ] adicionar analiticos (GA4 / eventos de conversao)
- [ ] configurar CI (lint, test, build)
- [ ] preparar i18n para versoes multi-idioma

## Troubleshooting

### Erro de dependencia Angular Material

Use versoes compativeis com Angular 20:

```bash
npm install @angular/material@^20 @angular/cdk@^20 @angular/animations@^20
```

### Porta 4200 em uso

```bash
npx ng serve --port 4300
```

## Licenca

Uso interno da Brothers Labs. Definir licenca oficial antes de distribuicao publica.

## Contato

Brothers Labs

- Site: `https://brotherslabs.com` (placeholder)
- Email: `contato@brotherslabs.com` (placeholder)
- LinkedIn: `https://www.linkedin.com/company/brothers-labs` (placeholder)
