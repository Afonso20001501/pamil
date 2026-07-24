import { Loader2 } from 'lucide-react';
import { api } from '../services/api.js';
import { siteInfo as mockInfo } from '../data/mockData.js';
import Stats from '../components/sections/Stats.jsx';
import CTAQuote from '../components/sections/CTAQuote.jsx';
import VuMeter from '../components/ui/VuMeter.jsx';
import { useApiData } from '../hooks/useApiData.js';

export default function Sobre() {
  const { data: settings, loading, error } = useApiData(api.getSiteSettings, null, []);

  const info = !loading && !error && settings ? settings : mockInfo;

  const pillars = [
    { cue: 'Q1', title: 'Missão', text: info.mission },
    { cue: 'Q2', title: 'Visão', text: info.vision },
    { cue: 'Q3', title: 'Valores', text: info.values },
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-forest-dark py-20 lg:py-28">
        <div className="border-b border-cue/10 pb-8 mb-8 flex justify-center">
          <VuMeter bars={30} className="h-3 text-cue/50" />
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="eyebrow">Sobre Nós</span>
          <h1 className="mt-4 font-display text-6xl lg:text-8xl tracking-tightest text-paper uppercase leading-[0.9]">
            {info.company_name ?? 'A Empresa'}
          </h1>

          {loading ? (
            <div className="flex items-center justify-center gap-2 text-paper/50 mt-8">
              <Loader2 size={16} className="animate-spin" /> A carregar…
            </div>
          ) : (
            <p className="mt-8 text-paper/60 text-lg leading-relaxed">
              {info.about_text}
            </p>
          )}
        </div>
      </section>

      {/* Missão / Visão / Valores — folha de deixas */}
      <section className="bg-paper py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-14">
            <span className="eyebrow !text-forest">A Nossa Direcção de Palco</span>
            <h2 className="mt-4 font-display text-6xl lg:text-7xl tracking-tightest text-forest uppercase">
              O que nos guia
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-ink/10">
            {pillars.map((p) => (
              <div key={p.cue} className="bg-paper p-8">
                <span className="font-mono text-sm text-spotlight-dark">{p.cue}</span>
                <h3 className="font-body font-semibold text-2xl text-ink mt-3 mb-3">{p.title}</h3>
                <p className="text-sage text-sm leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reaproveita a Ficha Técnica já construída na Home */}
      <Stats />

      {/* Reaproveita o CTA final já construído na Home */}
      <CTAQuote />
    </>
  );
}