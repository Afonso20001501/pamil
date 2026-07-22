import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { services } from '../../data/mockData.js';

export default function Services() {
  return (
    <section className="bg-paper py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div>
            <span className="eyebrow !text-forest">Ordem de Montagem</span>
            <h2 className="mt-4 font-display text-6xl lg:text-7xl tracking-tightest text-forest uppercase">
              Cada deixa,
              <br />
              coberta.
            </h2>
          </div>
          <p className="text-sage max-w-sm text-sm leading-relaxed">
            Do briefing ao encerramento das luzes, esta é a sequência real com que
            construímos um evento — cada serviço entra exactamente quando o show precisa dele.
          </p>
        </div>

        <div className="border-t border-ink/10">
          {services.map((s) => (
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
      </div>
    </section>
  );
}
