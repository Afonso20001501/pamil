import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Loader2 } from 'lucide-react';
import { api } from '../services/api.js';
import { allArtists as mockArtists } from '../data/mockData.js';
import VuMeter from '../components/ui/VuMeter.jsx';
import { useApiData } from '../hooks/useApiData.js';
import ArtistModal from '../components/ui/ArtistModal.jsx';

export default function Artistas() {
  const { t } = useTranslation();
  const [category, setCategory] = useState('');
  const [selectedArtist, setSelectedArtist] = useState(null);

  const categoryOptions = [
    { value: '', label: t('artists.all') },
    { value: 'dj', label: t('artists.categories.dj') },
    { value: 'banda', label: t('artists.categories.banda') },
    { value: 'cantor', label: t('artists.categories.cantor') },
    { value: 'danca', label: t('artists.categories.danca') },
    { value: 'humorista', label: t('artists.categories.humorista') },
  ];

  const query = category ? `?category=${category}` : '';
  const { data: apiArtists, loading, error } = useApiData(
    () => api.getArtists(query),
    [],
    [category]
  );

  const source = !loading && !error && apiArtists.length > 0 ? apiArtists : mockArtists;
  const items = category ? source.filter((a) => a.category === category) : source;

  return (
    <>
      <section className="bg-forest-dark py-20">
        <div className="border-b border-cue/10 pb-8 mb-8 flex justify-center">
          <VuMeter bars={30} className="h-3 text-cue/50" />
        </div>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="eyebrow">{t('artists.eyebrow')}</span>
          <h1 className="mt-4 font-display text-6xl lg:text-8xl tracking-tightest text-paper uppercase">
            {t('artists.title')}
          </h1>
          <p className="mt-6 text-paper/60 max-w-xl mx-auto">
            {t('artists.subtitle')}
          </p>
        </div>
      </section>

      <section className="bg-paper py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Filtro por categoria — estilo botões de canal de mesa de som */}
          <div className="flex flex-wrap gap-2 mb-12 border-b border-ink/10 pb-8">
            {categoryOptions.map((c) => (
              <button
                key={c.value}
                onClick={() => setCategory(c.value)}
                className={`font-mono text-xs tracking-widest2 uppercase px-4 py-2 rounded-sm border transition-colors ${
                  category === c.value
                    ? 'bg-forest text-paper border-forest'
                    : 'border-ink/15 text-sage hover:border-forest hover:text-forest'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {loading && (
            <div className="flex items-center gap-2 text-sage py-10">
              <Loader2 size={16} className="animate-spin" /> {t('common.loading')}
            </div>
          )}

          {!loading && items.length === 0 && (
            <p className="text-sage py-10">{t('artists.noResults')}</p>
          )}

          {!loading && items.length > 0 && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {items.map((a) => (
                <div
                  key={a.slug}
                  onClick={() => setSelectedArtist(a)}
                  className="group relative overflow-hidden rounded-sm aspect-[3/4] bg-forest cursor-pointer"
                >
                  <img
                    src={a.photo}
                    alt={a.name}
                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />

                  {!a.is_available && (
                    <span className="absolute top-3 right-3 bg-ink/70 text-paper/80 font-mono text-[9px] tracking-widest2 uppercase px-2 py-1 rounded-sm">
                      {t('artists.unavailable')}
                    </span>
                  )}

                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="font-mono text-[10px] text-cue tracking-widest2 uppercase mb-1">
                      {a.category_display}
                    </p>
                    <p className="font-body font-semibold text-paper text-lg leading-tight">
                      {a.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {selectedArtist && (
        <ArtistModal artist={selectedArtist} onClose={() => setSelectedArtist(null)} />
      )}
    </>
  );
}