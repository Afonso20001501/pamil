import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import VuMeter from '../ui/VuMeter.jsx';

export default function CTAQuote() {
  return (
    <section className="bg-paper py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative bg-forest-dark rounded-sm px-8 py-16 lg:py-20 text-center overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.07] pointer-events-none">
            <VuMeter bars={60} className="h-40 text-cue" />
          </div>
          <div className="relative">
            <span className="eyebrow">Vamos ao palco</span>
            <h2 className="mt-4 font-display text-6xl lg:text-8xl tracking-tightest text-paper uppercase max-w-3xl mx-auto leading-[0.9]">
              Pronto para o seu showtime?
            </h2>
            <p className="mt-6 text-paper/60 max-w-xl mx-auto">
              Conte-nos o tipo de evento, data e serviços que precisa —
              respondemos com uma proposta em até 48 horas.
            </p>
            <Link to="/pedido-de-orcamento" className="btn-primary mt-9 inline-flex">
              Pedir Orçamento Agora <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
