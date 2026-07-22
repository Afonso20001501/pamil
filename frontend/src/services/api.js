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

export const api = {
  getSiteSettings: () => request('/core/settings/'),
  getServices: () => request('/services/'),
  getArtists: (params = '') => request(`/artists/${params}`),
  getEvents: (params = '') => request(`/events/${params}`),
  getGallery: (params = '') => request(`/gallery/${params}`),
  getNews: () => request('/news/'),
  submitQuoteRequest: (data) =>
    request('/quotes/pedido/', { method: 'POST', body: JSON.stringify(data) }),
  submitContactMessage: (data) =>
    request('/contacts/', { method: 'POST', body: JSON.stringify(data) }),
};
