// Camada de acesso à API Django (DRF). Base URL configurável por variável de ambiente.
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    throw new Error(`Erro na API (${res.status}): ${path}`);
  }
  return res.json();
}

// O DRF devolve listas paginadas como { count, next, previous, results }.
// Esta função devolve sempre um array simples, paginado ou não.
function unwrapList(payload) {
  if (Array.isArray(payload)) return payload;
  if (payload && Array.isArray(payload.results)) return payload.results;
  return [];
}

export const api = {
  getSiteSettings: () => request('/core/settings/'),

  getServices: () => request('/services/').then(unwrapList),
  getServiceBySlug: (slug) => request(`/services/${slug}/`),

  getArtists: (params = '') => request(`/artists/${params}`).then(unwrapList),
  getFeaturedArtists: () =>
    request('/artists/?is_featured=true').then(unwrapList),

  getEvents: (params = '') => request(`/events/${params}`).then(unwrapList),
  getUpcomingEvents: () => 
    request('/events/?status=proximos&ordering=date_start').then(unwrapList),
  getEventBySlug: (slug) => request(`/events/${slug}/`),

  getGallery: (params = '') => request(`/gallery/${params}`).then(unwrapList),
  getNews: () => request('/news/').then(unwrapList),
  getNewsBySlug: (slug) => request(`/news/${slug}/`),

  submitQuoteRequest: (data) =>
    request('/quotes/pedido/', { method: 'POST', body: JSON.stringify(data) }),
  submitContactMessage: (data) =>
    request('/contacts/', { method: 'POST', body: JSON.stringify(data) }),
};