import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import { upcomingEvents } from '../../data/mockData.js';

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('pt-PT', { day: '2-digit', month: 'short' }).toUpperCase();
}

export default function UpcomingEvents() {
  return (
    <section className="bg-forest py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <span className="eyebrow">Próximas Datas</span>
            <h2 className="mt-4 font-display text-6xl lg:text-7xl tracking-tightest text-paper uppercase">
              Eventos
            </h2>
          </div>
          <Link to="/eventos" className="inline-flex items-center gap-2 text-paper font-semibold text-sm group">
            Ver agenda completa
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {upcomingEvents.map((e) => (
            <div key={e.title} className="group bg-forest-dark border border-cue/10 rounded-sm overflow-hidden hover:border-cue/40 transition-colors">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={e.cover}
                  alt={e.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-spotlight text-ink font-mono text-xs font-semibold px-2.5 py-1 rounded-sm">
                  {formatDate(e.date)}
                </div>
              </div>
              <div className="p-5">
                <p className="font-mono text-[10px] text-cue tracking-widest2 uppercase mb-2">{e.type}</p>
                <h3 className="font-body font-semibold text-paper text-xl leading-snug">{e.title}</h3>
                <p className="flex items-center gap-1.5 text-paper/50 text-sm mt-3">
                  <MapPin size={14} /> {e.city}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
