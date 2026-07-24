import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Loader2, MapPin, Calendar } from 'lucide-react';
import { api } from '../services/api.js';
import { useApiData } from '../hooks/useApiData.js';
import { allEvents as mockEvents } from '../data/mockData.js';
import CTAQuote from '../components/sections/CTAQuote.jsx';

function formatFullDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('pt-PT', { day: '2-digit', month: 'long', year: 'numeric' }) +
    ' · ' + d.toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' });
}

export default function EventoDetalhe() {
  const { slug } = useParams();

  const { data: apiEvent, loading, error } = useApiData(
    () => api.getEventBySlug(slug),
    null,
    [slug]
  );

  const mockMatch = mockEvents.find((e) => e.slug === slug);
  const event = !loading && !error && apiEvent ? apiEvent : mockMatch;

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-sage gap-2">
        <Loader2 size={18} className="animate-spin" /> A carregar…
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
        <h1 className="font-display text-5xl text-forest tracking-tightest">Evento não encontrado</h1>
        <Link to="/eventos" className="btn-primary mt-6 inline-flex">
          Ver todos os eventos
        </Link>
      </div>
    );
  }

  return (
    <>
      <section className="relative bg-forest-dark">
        <div className="relative h-72 sm:h-96 overflow-hidden">
          <img src={event.cover_image} alt={event.title} className="w-full h-full object-cover opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-dark via-forest-dark/40 to-transparent" />
        </div>

        <div className="max-w-4xl mx-auto px-6 -mt-24 relative pb-16">
          <Link to="/eventos" className="inline-flex items-center gap-2 text-paper/60 hover:text-cue text-sm mb-6 transition-colors">
            <ArrowLeft size={15} /> Todos os eventos
          </Link>

          <span className="font-mono text-[11px] text-cue tracking-widest2 uppercase">
            {event.event_type_display}
          </span>
          <h1 className="mt-2 font-display text-6xl lg:text-7xl tracking-tightest text-paper uppercase leading-[0.9]">
            {event.title}
          </h1>

          <div className="flex flex-wrap gap-6 mt-6 text-paper/60 text-sm">
            <span className="flex items-center gap-2"><Calendar size={16} className="text-spotlight" /> {formatFullDate(event.date_start)}</span>
            <span className="flex items-center gap-2"><MapPin size={16} className="text-spotlight" /> {event.location}, {event.city}</span>
          </div>

          <p className="mt-6 text-paper/70 text-lg leading-relaxed max-w-2xl">
            {event.description}
          </p>

          {event.services_used?.length > 0 && (
            <div className="mt-8">
              <span className="font-mono text-[10px] text-spotlight tracking-widest2 uppercase">Serviços neste evento</span>
              <div className="flex flex-wrap gap-2 mt-3">
                {event.services_used.map((s) => (
                  <span key={s.title} className="border border-cue/20 text-paper/70 text-xs px-3 py-1.5 rounded-sm">
                    {s.title}
                  </span>
                ))}
              </div>
            </div>
          )}

          {event.artists?.length > 0 && (
            <div className="mt-8">
              <span className="font-mono text-[10px] text-spotlight tracking-widest2 uppercase">Artistas no palco</span>
              <div className="flex flex-wrap gap-4 mt-4">
                {event.artists.map((a) => (
                  <div key={a.slug ?? a.name} className="flex items-center gap-3">
                    <img src={a.photo} alt={a.name} className="w-12 h-12 rounded-full object-cover border border-cue/20" />
                    <span className="text-paper/80 text-sm">{a.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Link to="/pedido-de-orcamento" className="btn-primary mt-10 inline-flex">
            Quero um Evento Assim <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <CTAQuote />
    </>
  );
}