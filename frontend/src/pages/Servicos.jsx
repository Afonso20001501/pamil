import { Link } from 'react-router-dom';
import { ArrowUpRight, Loader2 } from 'lucide-react';
import { api } from '../services/api.js';
import { useApiData } from '../hooks/useApiData.js';
import { services as mockServices } from '../data/mockData.js';
import VuMeter from '../components/ui/VuMeter.jsx';
import CTAQuote from '../components/sections/CTAQuote.jsx';

export default function Servicos() {
  const { data: apiServices, loading, error } = useApiData(api.getServices, [], []);
  const source = !loading && !error && apiServices.length > 0 ? apiServices : mockServices;

  const items = source.map((s, i) => ({
    cue: s.cue ?? `Q${i + 1}`,
    slug: s.slug,
    title: s.title,
    desc: s.desc ?? s.short_description,
  }));

  return (
    <>
      <section className="bg-forest-dark py-20">
        <div className="border-b border-cue/10 pb-8 mb-8 flex justify-center">
          <VuMeter bars={30} className="h-3 text-cue/50" />
        </div>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="eyebrow">Ordem de Montagem</span>
          <h1 className="mt-4 font-display text-6xl lg:text-8xl tracking-tightest text-paper uppercase">
            Serviços
          </h1>
          <p className="mt-6 text-paper/60 max-w-xl mx-auto">
            Cada disciplina de que um evento ao vivo precisa, coberta por uma só equipa,
            na ordem real em que entram em acção.
          </p>
        </div>
      </section>

      <section className="bg-paper py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          {loading && (
            <div className="flex items-center gap-2 text-sage py-10">
              <Loader2 size={16} className="animate-spin" /> A carregar serviços…
            </div>
          )}

          {!loading && (
            <div className="border-t border-ink/10">
              {items.map((s) => (
                <Link
                  key={s.slug}
                  to={`/servicos/${s.slug}`}
                  className="group grid grid-cols-[3.5rem_1fr_auto] sm:grid-cols-[5rem_1fr_auto] items-center gap-4 sm:gap-8 py-6 border-b border-ink/10 hover:bg-forest transition-colors duration-300 px-2 sm:px-4 -mx-2 sm:-mx-4"
                >
                  <span className="font-mono text-sm text-spotlight-dark group-hover:text-spotlight transition-colors">
                    {s.cue}
                  </span>
                  <div>
                    <h3 className="font-body font-semibold text-lg sm:text-2xl text-ink group-hover:text-paper transition-colors">
                      {s.title}
                    </h3>
                    <p className="hidden sm:block text-sage group-hover:text-paper/60 text-sm mt-1 max-w-xl transition-colors">
                      {s.desc}
                    </p>
                  </div>
                  <ArrowUpRight
                    size={22}
                    className="text-ink/30 group-hover:text-cue group-hover:rotate-45 transition-all duration-300"
                  />
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <CTAQuote />
    </>
  );
}