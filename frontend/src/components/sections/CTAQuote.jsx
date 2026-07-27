import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import VuMeter from '../ui/VuMeter.jsx';

export default function CTAQuote() {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden bg-forest-dark py-24 lg:py-32">
      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: "url('/images/pronto.png')",
        }}
      />

      {/* OVERLAY VERDE ESCURO */}
      <div className="absolute inset-0 bg-forest-dark/30" />

      {/* GRADIENTE PARA DAR PROFUNDIDADE */}
      <div className="absolute inset-0 bg-gradient-to-r from-forest-dark/95 via-forest-dark/60 to-forest-dark/20" />

      {/* GRADIENTE INFERIOR */}
      <div className="absolute inset-0 bg-gradient-to-t from-forest-dark via-transparent to-forest-dark/30" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="relative bg-forest-dark rounded-sm px-8 py-16 lg:py-20 text-center overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.07] pointer-events-none">
            <VuMeter bars={60} className="h-40 text-cue" />
          </div>
          <div className="relative">
            <span className="eyebrow">{t('home.ctaEyebrow')}</span>
            <h2 className="mt-4 font-display text-6xl lg:text-8xl tracking-tightest text-paper uppercase max-w-3xl mx-auto leading-[0.9]">
              {t('home.ctaTitle')}
            </h2>
            <p className="mt-6 text-paper/60 max-w-xl mx-auto">
              {t('home.ctaSubtitle')}
            </p>
            <Link to="/pedido-de-orcamento" className="btn-primary mt-9 inline-flex">
              {t('home.ctaButton')} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}