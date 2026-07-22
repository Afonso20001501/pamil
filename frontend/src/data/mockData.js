// Dados de exemplo — formato idêntico ao que a API Django (DRF) devolverá.
// Substituir por chamadas reais em src/services/api.js quando o backend estiver disponível.

export const services = [
  { cue: 'Q1', title: 'Produção de Eventos', slug: 'producao-de-eventos', desc: 'Concepção, planeamento e coordenação total do evento, do briefing ao encerramento.' },
  { cue: 'Q2', title: 'Gestão de Artistas', slug: 'gestao-de-artistas', desc: 'Booking, agenda e representação de artistas nacionais e internacionais.' },
  { cue: 'Q3', title: 'Sonorização', slug: 'sonorizacao', desc: 'Sistemas de som profissionais dimensionados para cada tipo de espaço e público.' },
  { cue: 'Q4', title: 'Iluminação', slug: 'iluminacao', desc: 'Desenho de luz cénica, robótica e arquitectural para criar atmosfera e impacto.' },
  { cue: 'Q5', title: 'Palcos e Estruturas', slug: 'palcos-e-estruturas', desc: 'Montagem de palcos, coberturas e estruturas certificadas para qualquer escala.' },
  { cue: 'Q6', title: 'Telões LED', slug: 'teloes-led', desc: 'Ecrãs LED de alta definição para conteúdo visual e transmissão ao vivo no palco.' },
  { cue: 'Q7', title: 'Live Streaming', slug: 'live-streaming', desc: 'Transmissão multi-câmara em directo para redes sociais e plataformas próprias.' },
  { cue: 'Q8', title: 'Fotografia e Vídeo', slug: 'fotografia-e-video', desc: 'Registo profissional de todo o evento, da pré-produção à entrega final editada.' },
];

export const featuredArtists = [
  { name: 'Nzinga M.', category: 'Cantora / Semba', photo: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=400&auto=format&fit=crop' },
  { name: 'DJ Kizua', category: 'DJ / Afro House', photo: 'https://images.unsplash.com/photo-1571266028243-e1ba6f30ffb1?q=80&w=400&auto=format&fit=crop' },
  { name: 'Grupo Kilandu', category: 'Dança Tradicional', photo: 'https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=400&auto=format&fit=crop' },
  { name: 'Banda Massano', category: 'Banda / Kizomba', photo: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=400&auto=format&fit=crop' },
];

export const upcomingEvents = [
  { title: 'Festival Kianda Live', type: 'Festival', date: '2026-08-15T19:00:00', city: 'Luanda', cover: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=600&auto=format&fit=crop' },
  { title: 'Gala Corporativa Sonangol', type: 'Evento Corporativo', date: '2026-08-22T18:30:00', city: 'Luanda', cover: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=600&auto=format&fit=crop' },
  { title: 'Noite Semba & Kizomba', type: 'Show', date: '2026-09-05T20:00:00', city: 'Benguela', cover: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=600&auto=format&fit=crop' },
];

export const stats = [
  { value: '12', unit: 'ANOS', label: 'de experiência em palco' },
  { value: '340+', unit: 'EVENTOS', label: 'produzidos com sucesso' },
  { value: '85', unit: 'ARTISTAS', label: 'na agência' },
  { value: '98%', unit: 'CLIENTES', label: 'satisfeitos e recorrentes' },
];
