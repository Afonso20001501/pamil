import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Loader2, ArrowRight } from 'lucide-react';
import { api } from '../services/api.js';
import { useApiData } from '../hooks/useApiData.js';
import { services as mockServices } from '../data/mockData.js';
import CTAQuote from '../components/sections/CTAQuote.jsx';

export default function ServicoDetalhe() {
  const { t } = useTranslation();
  const { slug } = useParams();

  const { data: apiService, loading, error } = useApiData(
    () => api.getServiceBySlug(slug),
    null,
    [slug]
  );

  const mockMatch = mockServices.find((s) => s.slug === slug);
  const mockIndex = mockServices.findIndex((s) => s.slug === slug);
  const service =
    !loading && !error && apiService
      ? apiService
      : mockMatch
      ? { ...mockMatch, cue: mockMatch.cue ?? `Q${mockIndex + 1}` }
      : null;

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-sage gap-2">
        <Loader2 size={18} className="animate-spin" /> {t('common.loading')}
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
        <h1 className="font-display text-5xl text-forest tracking-tightest">{t('services.notFoundTitle')}</h1>
        <Link to="/servicos" className="btn-primary mt-6 inline-flex">
          {t('services.allServices')}
        </Link>
      </div>
    );
  }

  const cover = service.cover_image;
  const description = service.description ?? service.desc;
  const cueLabel = service.cue ?? 'Q?';

  return (
    <>
      <section className="relative bg-forest-dark">
        <div className="relative h-72 sm:h-96 overflow-hidden">
          <img src={cover} alt={service.title} className="w-full h-full object-cover opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-dark via-forest-dark/40 to-transparent" />
        </div>

        <div className="max-w-4xl mx-auto px-6 -mt-24 relative pb-16">
          <Link to="/servicos" className="inline-flex items-center gap-2 text-paper/60 hover:text-cue text-sm mb-6 transition-colors">
            <ArrowLeft size={15} /> {t('services.allServices')}
          </Link>
          <span className="font-mono text-sm text-spotlight">{cueLabel}</span>
          <h1 className="mt-2 font-display text-6xl lg:text-7xl tracking-tightest text-paper uppercase leading-[0.9]">
            {service.title}
          </h1>
          <p className="mt-6 text-paper/70 text-lg leading-relaxed max-w-2xl">
            {description}
          </p>
          <Link to="/pedido-de-orcamento" className="btn-primary mt-8 inline-flex">
            {t('services.requestThisService')} <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <CTAQuote />
    </>
  );
}