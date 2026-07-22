import { stats } from '../../data/mockData.js';
import VuMeter from '../ui/VuMeter.jsx';

export default function Stats() {
  return (
    <section className="bg-forest-dark py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-12">
          <VuMeter bars={5} className="h-3 text-cue" />
          <span className="eyebrow">Ficha Técnica</span>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {stats.map((s) => (
            <div key={s.label} className="border-l border-cue/20 pl-5">
              <p className="font-display text-5xl lg:text-6xl text-spotlight tracking-tightest">{s.value}</p>
              <p className="font-mono text-[11px] text-cue tracking-widest2 mt-2">{s.unit}</p>
              <p className="text-paper/50 text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
