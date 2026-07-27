import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Phone, Mail, MapPin, Loader2, CheckCircle2, AlertCircle, Send } from 'lucide-react';
import { api } from '../services/api.js';
import { useApiData } from '../hooks/useApiData.js';
import { siteInfo as mockInfo } from '../data/mockData.js';
import VuMeter from '../components/ui/VuMeter.jsx';

const initialForm = { name: '', email: '', phone: '', subject: '', message: '' };

export default function Contactos() {
  const { t } = useTranslation();

  const { data: settings, loading: loadingSettings, error: settingsError } = useApiData(
    api.getSiteSettings,
    null,
    []
  );
  const info = !loadingSettings && !settingsError && settings ? settings : mockInfo;

  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    try {
      await api.submitContactMessage(form);
      setStatus('success');
      setForm(initialForm);
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  }

  return (
    <>
      <section className="bg-forest-dark py-20">
        <div className="border-b border-cue/10 pb-8 mb-8 flex justify-center">
          <VuMeter bars={30} className="h-3 text-cue/50" />
        </div>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="eyebrow">{t('contact.eyebrow')}</span>
          <h1 className="mt-4 font-display text-6xl lg:text-8xl tracking-tightest text-paper uppercase">
            {t('contact.title')}
          </h1>
          <p className="mt-6 text-paper/60 max-w-xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>
      </section>

      <section className="bg-paper py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-[1fr_1.3fr] gap-12">
          {/* Painel de informação — estilo crachá de bastidores */}
          <div className="bg-forest-dark rounded-sm p-8 h-fit">
            <span className="eyebrow">{t('contact.directLine')}</span>
            <ul className="mt-6 space-y-5">
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-spotlight mt-0.5 shrink-0" />
                <div>
                  <p className="text-paper/40 text-xs font-mono uppercase tracking-widest2">{t('contact.phone')}</p>
                  <p className="text-paper">{info.phone ?? '+244 923 000 000'}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-spotlight mt-0.5 shrink-0" />
                <div>
                  <p className="text-paper/40 text-xs font-mono uppercase tracking-widest2">{t('contact.email')}</p>
                  <p className="text-paper">{info.email ?? 'contacto@palcoverde.ao'}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-spotlight mt-0.5 shrink-0" />
                <div>
                  <p className="text-paper/40 text-xs font-mono uppercase tracking-widest2">{t('contact.address')}</p>
                  <p className="text-paper">{info.address ?? 'Talatona, Luanda, Angola'}</p>
                </div>
              </li>
            </ul>

            <div className="mt-8 pt-6 border-t border-cue/10">
              <p className="font-mono text-[10px] text-cue tracking-widest2 uppercase mb-2">{t('contact.hours')}</p>
              <p className="text-paper/60 text-sm">{t('contact.hoursValue')}</p>
            </div>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label={t('contact.fullName')} name="name" value={form.name} onChange={handleChange} required />
              <Field label={t('contact.email')} name="email" type="email" value={form.email} onChange={handleChange} required />
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label={t('contact.phone')} name="phone" value={form.phone} onChange={handleChange} />
              <Field label={t('contact.subject')} name="subject" value={form.subject} onChange={handleChange} required />
            </div>
            <div>
              <label className="font-mono text-[11px] text-sage tracking-widest2 uppercase block mb-2">
                {t('contact.message')}
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full bg-transparent border border-ink/15 rounded-sm px-4 py-3 text-ink focus:border-forest outline-none transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === 'sending' ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> {t('contact.sending')}
                </>
              ) : (
                <>
                  {t('contact.send')} <Send size={16} />
                </>
              )}
            </button>

            {status === 'success' && (
              <p className="flex items-center gap-2 text-cue-dim text-sm pt-2">
                <CheckCircle2 size={16} /> {t('contact.success')}
              </p>
            )}
            {status === 'error' && (
              <p className="flex items-center gap-2 text-red-600 text-sm pt-2">
                <AlertCircle size={16} /> {t('contact.error')}
              </p>
            )}
          </form>
        </div>
      </section>
    </>
  );
}

function Field({ label, name, type = 'text', value, onChange, required = false }) {
  return (
    <div>
      <label className="font-mono text-[11px] text-sage tracking-widest2 uppercase block mb-2">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full bg-transparent border border-ink/15 rounded-sm px-4 py-3 text-ink focus:border-forest outline-none transition-colors"
      />
    </div>
  );
}