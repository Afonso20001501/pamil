# PalcoVerde — Frontend

Site institucional e de gestão de leads para produção de eventos e gestão de
artistas. React + Tailwind CSS, preparado para consumir a API Django (DRF).

## Instalação

```bash
npm install
npm run dev
```

Cria um ficheiro `.env` (opcional) para apontar para o backend:

```env
VITE_API_URL=http://localhost:8000/api/v1
```

## Sistema de Design — "Cue Sheet"

A identidade visual usa o vocabulário real de produção de eventos ao vivo
(deixas de palco, rundown de show) para justificar a paleta verde/amarelo
pedida — não é uma escolha arbitrária, é a linguagem de quem trabalha em palco.

### Cores (`tailwind.config.js`)
| Token | Hex | Uso |
|---|---|---|
| `forest-dark` | `#081F19` | Fundo escuro principal (nav, footer, secções) |
| `forest` | `#0E3B2E` | Fundo verde intermédio |
| `cue` | `#34D399` | Verde-luz-de-palco: links, sinal "GO", sucesso |
| `spotlight` | `#F5B700` | Âmbar-holofote: CTA principal, destaques |
| `paper` | `#F6F4EC` | Fundo claro das secções |
| `ink` | `#10140F` | Texto principal sobre fundo claro |
| `sage` | `#5C6B62` | Texto secundário |

### Tipografia
- **Bebas Neue** (`font-display`) — títulos grandes, maiúsculas, condensada (sinalética de palco)
- **Space Grotesk** (`font-body`) — corpo de texto e UI
- **IBM Plex Mono** (`font-mono`) — labels utilitários, horários, números de cue

### Elemento assinatura
A secção `Services.jsx` apresenta os 8 serviços como uma **folha de deixas**
(Q1–Q8) seguindo a ordem real de montagem de um evento: produção → artistas →
som → luz → palco → LED → streaming → registo. O `VuMeter.jsx` é um medidor
de níveis de áudio ambiente, usado com moderação (hero, stats, CTA final) —
respeita `prefers-reduced-motion`.

## Estrutura

```
src/
├── components/
│   ├── layout/    (Navbar, Footer, Layout)
│   ├── sections/  (Hero, Services, Stats, FeaturedArtists, UpcomingEvents, CTAQuote)
│   └── ui/        (VuMeter)
├── pages/         (Home.jsx — restantes páginas a construir na próxima fase)
├── data/          (mockData.js — mesmo formato da API, para já estático)
└── services/      (api.js — camada de acesso à API Django)
```

## Próximos passos
- Substituir `mockData.js` por chamadas reais via `services/api.js`
- Construir as páginas internas: Sobre Nós, Artistas, Eventos, Galeria,
  Notícias, Contactos, Pedido de Orçamento (formulário)
- Adicionar loading states e tratamento de erros nas chamadas à API
