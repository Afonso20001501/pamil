import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Loader2, Play } from 'lucide-react';
import { api } from '../services/api.js';
import { useApiData } from '../hooks/useApiData.js';
import { galleryItems as mockGallery } from '../data/mockData.js';
import VuMeter from '../components/ui/VuMeter.jsx';
import GalleryModal from '../components/ui/GalleryModal.jsx';

export default function Galeria() {
  const { t } = useTranslation();
  const [mediaType, setMediaType] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const filters = [
    { value: '', label: t('gallery.all') },
    { value: 'imagem', label: t('gallery.photos') },
    { value: 'video', label: t('gallery.videos') },
  ];

  const query = mediaType ? `?media_type=${mediaType}` : '';
  const { data: apiItems, loading, error } = useApiData(
    () => api.getGallery(query),
    [],
    [mediaType]
  );

  let source = !loading && !error && apiItems.length > 0 ? apiItems : mockGallery;
  if (source === mockGallery && mediaType) {
    source = source.filter((i) => i.media_type === mediaType);
  }

  return (
    <>
      <section className="bg-forest-dark py-20">
        <div className="border-b border-cue/10 pb-8 mb-8 flex justify-center">
          <VuMeter bars={30} className="h-3 text-cue/50" />
        </div>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="eyebrow">{t('gallery.eyebrow')}</span>
          <h1 className="mt-4 font-display text-6xl lg:text-8xl tracking-tightest text-paper uppercase">
            {t('gallery.title')}
          </h1>
        </div>
      </section>

      <section className="bg-paper py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-2 mb-12 border-b border-ink/10 pb-8">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setMediaType(f.value)}
                className={`font-mono text-xs tracking-widest2 uppercase px-4 py-2 rounded-sm border transition-colors ${
                  mediaType === f.value
                    ? 'bg-forest text-paper border-forest'
                    : 'border-ink/15 text-sage hover:border-forest hover:text-forest'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {loading && (
            <div className="flex items-center gap-2 text-sage py-10">
              <Loader2 size={16} className="animate-spin" /> {t('common.loading')}
            </div>
          )}

          {!loading && source.length === 0 && (
            <p className="text-sage py-10">{t('gallery.noResults')}</p>
          )}

          {!loading && source.length > 0 && (
            <div className="columns-2 md:columns-3 gap-4 space-y-4">
              {source.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className="group relative break-inside-avoid overflow-hidden rounded-sm bg-forest cursor-pointer"
                >
                  <img
                    src={item.media_type === 'video' ? (item.thumbnail ?? item.image) : item.image}
                    alt={item.title}
                    className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  {item.media_type === 'video' && (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="bg-spotlight text-ink rounded-full p-3 group-hover:scale-110 transition-transform">
                        <Play size={18} fill="currentColor" />
                      </span>
                    </span>
                  )}

                  <p className="absolute bottom-3 left-3 right-3 text-paper text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity truncate">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {selectedItem && (
        <GalleryModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </>
  );
}