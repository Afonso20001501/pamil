import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { featuredArtists } from '../../data/mockData.js';

export default function FeaturedArtists() {
  return (
    <section className="bg-paper py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <span className="eyebrow !text-forest">Line-up da Agência</span>
            <h2 className="mt-4 font-display text-6xl lg:text-7xl tracking-tightest text-forest uppercase">
              Artistas
            </h2>
          </div>
          <Link to="/artistas" className="inline-flex items-center gap-2 text-forest font-semibold text-sm group">
            Ver todos os artistas
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredArtists.map((a) => (
            <div key={a.name} className="group relative overflow-hidden rounded-sm aspect-[3/4] bg-forest">
              <img
                src={a.photo}
                alt={a.name}
                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="font-mono text-[10px] text-cue tracking-widest2 uppercase mb-1">{a.category}</p>
                <p className="font-body font-semibold text-paper text-lg leading-tight">{a.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
