// Dados de exemplo — formato idêntico ao que a API Django (DRF) devolverá.
// Substituir por chamadas reais em src/services/api.js quando o backend estiver disponível.

export const services = [
  { cue: 'Q1', title: 'Produção de Eventos', slug: 'producao-de-eventos', desc: 'Concepção, planeamento e coordenação total do evento, do briefing ao encerramento.' },
  { cue: 'Q2', title: 'Gestão de Artistas', slug: 'gestao-de-artistas', desc: 'Booking, agenda e representação de artistas nacionais e internacionais.' },
  { cue: 'Q3', title: 'Sonorização', slug: 'sonorizacao', desc: 'Sistemas de som profissionais dimensionados para cada tipo de espaço e público.' },
  { cue: 'Q4', title: 'Iluminação', slug: 'iluminacao', desc: 'Desenho de luz cénica, robótica e arquitectural para criar atmosfera e impacto.' },
  { cue: 'Q5', title: 'Palcos e Estruturas', slug: 'palcos-e-estruturas', desc: 'Montagem de palcos, coberturas e estruturas certificadas para qualquer escala.' },
  { cue: 'Q6', title: 'Tela LED', slug: 'teloes-led', desc: 'Ecrãs LED de alta definição para conteúdo visual e transmissão ao vivo no palco.' },
  { cue: 'Q7', title: 'Live Streaming', slug: 'live-streaming', desc: 'Transmissão multi-câmara em directo para redes sociais e plataformas próprias.' },
  { cue: 'Q8', title: 'Sala de Ensaio e Banda', slug: 'sala-de-ensaio-e-banda', desc: 'Espaço dedicado a ensaios e gravações de artistas.' },
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

export const siteInfo = {
  company_name: 'PalcoVerde',
  about_text:
    'Somos uma produtora angolana dedicada a transformar ideias em eventos memoráveis. Desde o primeiro briefing até à última luz do palco a apagar-se, cuidamos de cada deixa da produção com uma só equipa multidisciplinar.',
  mission:
    'Entregar produções de eventos e gestão de artistas com padrão internacional, cuidando de cada detalhe técnico e criativo para que o cliente só precise de aparecer e brilhar.',
  vision:
    'Ser a produtora de referência em Angola e na região da SADC, reconhecida pela excelência técnica e pela confiança que constrói com artistas e clientes.',
  values:
    'Rigor técnico, pontualidade, transparência no orçamento, e respeito pelo trabalho do artista em palco.',
};


export const artistCategories = [
  { value: '', label: 'Todos' },
  { value: 'dj', label: 'DJ' },
  { value: 'banda', label: 'Banda' },
  { value: 'cantor', label: 'Cantor/Cantora' },
  { value: 'danca', label: 'Grupo de Dança' },
  { value: 'humorista', label: 'Humorista' },
];

export const allArtists = [
  { name: 'Nzinga M.', slug: 'nzinga-m', category: 'cantor', category_display: 'Cantor/Cantora', photo: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=400&auto=format&fit=crop', is_available: true },
  { name: 'DJ Kizua', slug: 'dj-kizua', category: 'dj', category_display: 'DJ', photo: 'https://images.unsplash.com/photo-1571266028243-e1ba6f30ffb1?q=80&w=400&auto=format&fit=crop', is_available: true },
  { name: 'Grupo Kilandu', slug: 'grupo-kilandu', category: 'danca', category_display: 'Grupo de Dança', photo: 'https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=400&auto=format&fit=crop', is_available: true },
  { name: 'Banda Massano', slug: 'banda-massano', category: 'banda', category_display: 'Banda', photo: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=400&auto=format&fit=crop', is_available: false },
  { name: 'Zé Bacana', slug: 'ze-bacana', category: 'humorista', category_display: 'Humorista', photo: 'https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=400&auto=format&fit=crop', is_available: true },
  { name: 'DJ Nandó', slug: 'dj-nando', category: 'dj', category_display: 'DJ', photo: 'https://images.unsplash.com/photo-1571935441005-1a6d0a8f3e5b?q=80&w=400&auto=format&fit=crop', is_available: true },
];

export const eventTypes = [
  { value: '', label: 'Todos' },
  { value: 'corporativo', label: 'Corporativo' },
  { value: 'show', label: 'Show/Concerto' },
  { value: 'festival', label: 'Festival' },
  { value: 'privado', label: 'Evento Privado' },
  { value: 'casamento', label: 'Casamento' },
];

export const allEvents = [
  { title: 'Festival Kianda Live', slug: 'festival-kianda-live', event_type: 'festival', event_type_display: 'Festival', date_start: '2026-08-15T19:00:00', location: 'Recinto da Fortaleza', city: 'Luanda', cover_image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=900&auto=format&fit=crop', description: 'Um dia inteiro de música ao vivo com o melhor line-up nacional, três palcos e zona gastronómica.', artists: [{ name: 'DJ Kizua', slug: 'dj-kizua', photo: 'https://images.unsplash.com/photo-1571266028243-e1ba6f30ffb1?q=80&w=200&auto=format&fit=crop' }], services_used: [{ title: 'Sonorização' }, { title: 'Iluminação' }, { title: 'Palcos e Estruturas' }] },
  { title: 'Gala Corporativa Sonangol', slug: 'gala-corporativa-sonangol', event_type: 'corporativo', event_type_display: 'Evento Corporativo', date_start: '2026-08-22T18:30:00', location: 'Hotel Epic Sana', city: 'Luanda', cover_image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=900&auto=format&fit=crop', description: 'Gala anual de reconhecimento de colaboradores, com jantar, discursos e actuação musical.', artists: [{ name: 'Nzinga M.', slug: 'nzinga-m', photo: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=200&auto=format&fit=crop' }], services_used: [{ title: 'Produção de Eventos' }, { title: 'Sonorização' }, { title: 'Live Streaming' }] },
  { title: 'Noite Semba & Kizomba', slug: 'noite-semba-kizomba', event_type: 'show', event_type_display: 'Show/Concerto', date_start: '2026-09-05T20:00:00', location: 'Centro Cultural', city: 'Benguela', cover_image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=900&auto=format&fit=crop', description: 'Noite dedicada aos clássicos do semba e kizomba, com banda ao vivo e convidados especiais.', artists: [{ name: 'Banda Massano', slug: 'banda-massano', photo: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=200&auto=format&fit=crop' }], services_used: [{ title: 'Sonorização' }, { title: 'Iluminação' }] },
  { title: 'Casamento Ana & Miguel', slug: 'casamento-ana-miguel', event_type: 'casamento', event_type_display: 'Casamento', date_start: '2026-05-10T17:00:00', location: 'Quinta da Mariposa', city: 'Luanda', cover_image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=900&auto=format&fit=crop', description: 'Celebração íntima ao ar livre, com iluminação decorativa e banda acústica.', artists: [], services_used: [{ title: 'Sonorização' }, { title: 'Iluminação' }, { title: 'Fotografia e Vídeo' }] },
];

export const galleryItems = [
  { id: 1, title: 'Festival Kianda Live — Palco Principal', media_type: 'imagem', image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=900&auto=format&fit=crop', event_title: 'Festival Kianda Live', category: 'Festival' },
  { id: 2, title: 'Gala Sonangol — Jantar', media_type: 'imagem', image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=900&auto=format&fit=crop', event_title: 'Gala Corporativa Sonangol', category: 'Corporativo' },
  { id: 3, title: 'Montagem de Palco', media_type: 'imagem', image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=900&auto=format&fit=crop', event_title: 'Noite Semba & Kizomba', category: 'Bastidores' },
  { id: 4, title: 'Aftermovie Festival Kianda 2025', media_type: 'video', video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', event_title: 'Festival Kianda Live', category: 'Festival' },
  { id: 5, title: 'Iluminação Cénica', media_type: 'imagem', image: 'https://images.unsplash.com/photo-1508973379184-7517410fb0bc?q=80&w=900&auto=format&fit=crop', event_title: null, category: 'Bastidores' },
  { id: 6, title: 'Casamento Ana & Miguel', media_type: 'imagem', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=900&auto=format&fit=crop', event_title: 'Casamento Ana & Miguel', category: 'Casamento' },
];

export const newsPosts = [
  {
    title: 'Pamil produz maior festival de música do ano em Luanda',
    slug: 'maior-festival-do-ano',
    excerpt: 'O Festival Kianda Live reuniu mais de 8 mil pessoas num só dia, com três palcos e produção técnica integrada.',
    content: 'O Festival Kianda Live decorreu no passado fim-de-semana e reuniu milhares de pessoas num único recinto. A produção envolveu três palcos simultâneos, sonorização line-array, e uma equipa de mais de 40 técnicos em bastidores.\n\nO evento contou também com transmissão em directo para redes sociais, alcançando um público adicional fora do recinto. A equipa da PalcoVerde geriu toda a logística, desde o load-in às 6h da manhã até ao encerramento das luzes, já depois da meia-noite.',
    cover_image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=900&auto=format&fit=crop',
    author_name: 'Equipa Pamil',
    published_at: '2026-06-20T10:00:00',
  },
  {
    title: 'Novo sistema de som line-array chega à frota da Pamil',
    slug: 'novo-sistema-line-array',
    excerpt: 'Investimento em equipamento próprio reforça a capacidade de produção para eventos de grande escala.',
    content: 'A Pamil anuncia a chegada de um novo sistema de sonorização line-array de última geração, permitindo cobrir espaços de maior dimensão com qualidade de som homogénea do primeiro ao último lugar.\n\nO investimento faz parte de um plano mais amplo de modernização do parque técnico da empresa, que inclui também novos equipamentos de iluminação robótica e ecrãs LED de alta densidade de pixel.',
    cover_image: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=900&auto=format&fit=crop',
    author_name: 'Equipa Pamil',
    published_at: '2026-05-12T09:00:00',
  },
  {
    title: 'Pamil assina parceria com agência internacional de artistas',
    slug: 'parceria-agencia-internacional',
    excerpt: 'Acordo amplia o catálogo de artistas disponíveis para eventos corporativos e privados em Angola.',
    content: 'Foi assinado um acordo de representação com uma agência internacional, permitindo à Pamil trazer artistas estrangeiros para eventos em Angola com maior facilidade logística e contratual.\n\nA parceria deverá reforçar a oferta da agência para eventos corporativos de maior escala já a partir do próximo trimestre.',
    cover_image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=900&auto=format&fit=crop',
    author_name: 'Equipa Pamil',
    published_at: '2026-04-02T09:00:00',
  },
];