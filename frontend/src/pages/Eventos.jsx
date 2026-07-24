import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Loader2 } from 'lucide-react';
import { api } from '../services/api.js';
import { useApiData } from '../hooks/useApiData.js';
import { allEvents as mockEvents, eventTypes } from '../data/mockData.js';
import VuMeter from '../components/ui/VuMeter.jsx';

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('pt-PT', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase();
}

const statusTabs = [
  { value: 'proximos', label: 'Próximos' },
  { value: 'passados', label: 'Passados' },
  { value: '', label: 'Todos' },
];

export default function Eventos() {
  const [status, setStatus] = useState('proximos');
  const [type, setType] = useState('');

  const params = new URLSearchParams();
  if (status) params.set('status', status);
  if (type) params.set('event_type', type);
  const query = `?${params.toString()}`;

  const { data: apiEvents, loading, error } = useApiData(
    () => api.getEvents(query),
    [],
    [status, type]
  );

  const now = new Date();
  let source = !loading && !error && apiEvents.length > 0 ? apiEvents : mockEvents;

  // Aplica os mesmos filtros aos dados mock (a API já filtra os reais)
  if (source === mockEvents) {
    source = source.filter((e) => {
      const matchesType = type ? e.event_type === type : true;
      const isFuture = new Date(e.date_start) >= now;
      const matchesStatus =
        status === 'proximos' ? isFuture : status === 'passados' ? !isFuture : true;
      return matchesType && matchesStatus;
    });
  }

  return (
    <>
      <section className="bg-forest-dark py-20">
        <div className="border-b border-cue/10 pb-8 mb-8 flex justify-center">
          <VuMeter bars={30} className="h-3 text-cue/50" />
        </div>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="eyebrow">Agenda</span>
          <h1 className="mt-4 font-display text-6xl lg:text-8xl tracking-tightest text-paper uppercase">
            Eventos
          </h1>
        </div>
      </section>

      <section className="bg-paper py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12 pb-8 border-b border-ink/10">
            <div className="flex gap-2">
              {statusTabs.map((t) => (
                <button
                  key={t.value}
                  onClick={() => setStatus(t.value)}
                  className={`font-mono text-xs tracking-widest2 uppercase px-4 py-2 rounded-sm border transition-colors ${
                    status === t.value
                      ? 'bg-forest text-paper border-forest'
                      : 'border-ink/15 text-sage hover:border-forest hover:text-forest'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="font-mono text-xs tracking-widest2 uppercase px-4 py-2 rounded-sm border border-ink/15 text-sage bg-paper"
            >
              {eventTypes.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>

          {loading && (
            <div className="flex items-center gap-2 text-sage py-10">
              <Loader2 size={16} className="animate-spin" /> A carregar eventos…
            </div>
          )}

          {!loading && source.length === 0 && (
            <p className="text-sage py-10">Nenhum evento encontrado com estes filtros.</p>
          )}

          {!loading && source.length > 0 && (
            <div className="grid lg:grid-cols-3 gap-6">
              {source.map((e) => (
                <Link
                  key={e.slug}
                  to={`/eventos/${e.slug}`}
                  className="group bg-forest border border-cue/10 rounded-sm overflow-hidden hover:border-cue/40 transition-colors"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={e.cover_image}
                      alt={e.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-spotlight text-ink font-mono text-xs font-semibold px-2.5 py-1 rounded-sm">
                      {formatDate(e.date_start)}
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="font-mono text-[10px] text-cue tracking-widest2 uppercase mb-2">
                      {e.event_type_display}
                    </p>
                    <h3 className="font-body font-semibold text-paper text-xl leading-snug">{e.title}</h3>
                    <p className="flex items-center gap-1.5 text-paper/50 text-sm mt-3">
                      <MapPin size={14} /> {e.city}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}