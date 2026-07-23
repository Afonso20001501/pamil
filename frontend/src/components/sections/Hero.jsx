import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import VuMeter from '../ui/VuMeter.jsx';

const rundown = [
  { time: '14H00', label: 'LOAD-IN', desc: 'Montagem de palco e estruturas' },
  { time: '17H00', label: 'SOUNDCHECK', desc: 'Sonorização e iluminação afinadas' },
  { time: '19H00', label: 'DOORS', desc: 'Abertura ao público' },
  { time: '20H30', label: 'SHOWTIME', desc: 'O seu evento, no ar' },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-forest-dark">
      
      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: "url('/images/banner.png')",
        }}
      />

      {/* OVERLAY VERDE ESCURO */}
      <div className="absolute inset-0 bg-forest-dark/30" />

      {/* GRADIENTE PARA DAR PROFUNDIDADE */}
      <div className="absolute inset-0 bg-gradient-to-r from-forest-dark/95 via-forest-dark/60 to-forest-dark/20" />

      {/* GRADIENTE INFERIOR */}
      <div className="absolute inset-0 bg-gradient-to-t from-forest-dark via-transparent to-forest-dark/30" />

      {/* CONTEÚDO */}
      <div className="relative z-10">
        
        {/* faixa de VU meter ambiente no topo */}
        <div className="border-b border-cue/10 py-2.5 flex justify-center">
          <VuMeter bars={40} className="h-3 text-cue/50" />
        </div>

        <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24 grid lg:grid-cols-[1.2fr_0.8fr] gap-14 items-center min-h-[calc(100vh-50px)]">

          {/* TEXTO */}
          <div className="animate-riseIn">
            <span className="eyebrow">
              Produção de Eventos & Gestão de Artistas
            </span>

            <h1 className="mt-5 font-display text-[15vw] leading-[0.85] lg:text-8xl tracking-tightest text-paper uppercase">
              O seu
              <br />
              evento,
              <br />
              <span className="text-cue">no ar.</span>
            </h1>

            <p className="mt-6 text-paper/70 text-lg max-w-lg leading-relaxed">
              Do Lubango para todo o país: concepção, artistas, som, luz, palco, lela Led, 
              transmissão e sala de ensaio  — cada deixa da sua produção, cuidada por uma só equipa.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link to="/pedido-de-orcamento" className="btn-primary">
                Pedir Orçamento <ArrowRight size={16} />
              </Link>

              <Link to="/eventos" className="btn-outline">
                Ver Eventos
              </Link>
            </div>
          </div>

          {/* RUNDOWN */}
          <div
            className="relative border border-cue/20 bg-forest-dark/50 backdrop-blur-sm rounded-sm animate-riseIn"
            style={{ animationDelay: "0.15s" }}
          >
            <div className="flex items-center justify-between px-5 py-3 border-b border-cue/15">
              <span className="font-mono text-[11px] text-spotlight tracking-widest2 uppercase">
                Rundown — Dia do Show
              </span>

              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-cue animate-blink" />
              </span>
            </div>

            <ul>
              {rundown.map((r, i) => (
                <li
                  key={r.label}
                  className={`flex items-center gap-4 px-5 py-4 ${
                    i !== rundown.length - 1
                      ? "border-b border-cue/10"
                      : ""
                  } ${
                    i === rundown.length - 1
                      ? "bg-cue/10"
                      : ""
                  }`}
                >
                  <span className="font-mono text-xs text-paper/50 w-14 shrink-0">
                    {r.time}
                  </span>

                  <div className="min-w-0">
                    <p
                      className={`font-body font-semibold text-sm tracking-wide ${
                        i === rundown.length - 1
                          ? "text-cue"
                          : "text-paper/90"
                      }`}
                    >
                      {r.label}
                    </p>

                    <p className="text-xs text-paper/50 truncate">
                      {r.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}


