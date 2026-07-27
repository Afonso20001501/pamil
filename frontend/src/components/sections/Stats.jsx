import { Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { api } from '../../services/api.js';
import { useApiData } from '../../hooks/useApiData.js';
import { stats as mockStats } from '../../data/mockData.js';
import VuMeter from '../ui/VuMeter.jsx';

export default function Stats() {
  const { t } = useTranslation();
  const { data: settings, loading, error } = useApiData(api.getSiteSettings, null, []);

  const items =
    !loading && !error && settings
      ? [
          { value: String(settings.years_experience ?? '—'), unit: 'ANOS', label: 'de experiência em palco' },
          { value: `${settings.events_completed ?? '—'}+`, unit: 'EVENTOS', label: 'produzidos com sucesso' },
          { value: String(settings.artists_count ?? '—'), unit: 'ARTISTAS', label: 'na agência' },
          { value: `${settings.happy_clients ?? '—'}%`, unit: 'CLIENTES', label: 'satisfeitos e recorrentes' },
        ]
      : mockStats;

  return (
    <section className="bg-forest-dark py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-12">
          <VuMeter bars={5} className="h-3 text-cue" />
          <span className="eyebrow">{t('home.statsEyebrow')}</span>
        </div>

        {loading ? (
          <div className="flex items-center gap-2 text-paper/60 py-4">
            <Loader2 size={16} className="animate-spin" /> {t('common.loading')}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {items.map((s) => (
              <div key={s.label} className="border-l border-cue/20 pl-5">
                <p className="font-display text-5xl lg:text-6xl text-spotlight tracking-tightest">{s.value}</p>
                <p className="font-mono text-[11px] text-cue tracking-widest2 mt-2">{s.unit}</p>
                <p className="text-paper/50 text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}