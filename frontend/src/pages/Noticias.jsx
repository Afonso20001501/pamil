import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Loader2, ArrowRight } from 'lucide-react';
import { api } from '../services/api.js';
import { useApiData } from '../hooks/useApiData.js';
import { newsPosts as mockNews } from '../data/mockData.js';
import VuMeter from '../components/ui/VuMeter.jsx';

export default function Noticias() {
  const { t, i18n } = useTranslation();
  const dateLocale = i18n.language === 'en' ? 'en-GB' : 'pt-PT';

  function formatDate(iso) {
    const d = new Date(iso);
    return d.toLocaleDateString(dateLocale, { day: '2-digit', month: 'long', year: 'numeric' });
  }

  const { data: apiNews, loading, error } = useApiData(api.getNews, [], []);
  const source = !loading && !error && apiNews.length > 0 ? apiNews : mockNews;

  return (
    <>
      <section className="bg-forest-dark py-20">
        <div className="border-b border-cue/10 pb-8 mb-8 flex justify-center">
          <VuMeter bars={30} className="h-3 text-cue/50" />
        </div>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="eyebrow">{t('news.eyebrow')}</span>
          <h1 className="mt-4 font-display text-6xl lg:text-8xl tracking-tightest text-paper uppercase">
            {t('news.title')}
          </h1>
        </div>
      </section>

      <section className="bg-paper py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-6">
          {loading && (
            <div className="flex items-center gap-2 text-sage py-10">
              <Loader2 size={16} className="animate-spin" /> {t('common.loading')}
            </div>
          )}

          {!loading && source.length === 0 && (
            <p className="text-sage py-10">{t('news.noResults')}</p>
          )}

          {!loading && source.length > 0 && (
            <div className="divide-y divide-ink/10">
              {source.map((post) => (
                <Link
                  key={post.slug}
                  to={`/noticias/${post.slug}`}
                  className="group grid sm:grid-cols-[200px_1fr] gap-6 py-8 first:pt-0"
                >
                  <div className="aspect-video sm:aspect-square overflow-hidden rounded-sm bg-forest">
                    <img
                      src={post.cover_image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] text-forest tracking-widest2 uppercase mb-2">
                      {formatDate(post.published_at)}
                    </p>
                    <h2 className="font-body font-semibold text-2xl text-ink group-hover:text-forest transition-colors leading-snug">
                      {post.title}
                    </h2>
                    <p className="text-sage text-sm mt-2 leading-relaxed">{post.excerpt}</p>
                    <span className="inline-flex items-center gap-1.5 text-forest text-sm font-medium mt-3">
                      {t('common.readMore')} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </span>
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