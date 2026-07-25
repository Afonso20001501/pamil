import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
    ArrowRight, ArrowLeft, Loader2, CheckCircle2, AlertCircle,
    Building2, Music, PartyPopper, Heart, Sparkles, HelpCircle,
} from 'lucide-react';
import { api } from '../services/api.js';
import { useApiData } from '../hooks/useApiData.js';
import { services as mockServices } from '../data/mockData.js';
import VuMeter from '../components/ui/VuMeter.jsx';
import { generateQuotePDF } from '../utils/generateQuotePDF.js';
import { openWhatsAppWithQuote } from '../utils/whatsapp.js';

const eventTypeOptions = [
    { value: 'Corporativo', icon: Building2 },
    { value: 'Show/Concerto', icon: Music },
    { value: 'Festival', icon: PartyPopper },
    { value: 'Casamento', icon: Heart },
    { value: 'Evento Privado', icon: Sparkles },
    { value: 'Outro', icon: HelpCircle },
];

const budgetOptions = [
    { value: 'ate_500k', label: 'Até 500.000 Kz' },
    { value: '500k_2m', label: '500.000 – 2.000.000 Kz' },
    { value: '2m_5m', label: '2.000.000 – 5.000.000 Kz' },
    { value: 'acima_5m', label: 'Acima de 5.000.000 Kz' },
    { value: 'a_definir', label: 'Ainda não sei' },
];

const steps = ['Tipo de Evento', 'Serviços', 'Detalhes', 'Contacto'];

const initialForm = {
    event_type: '',
    services: [],
    event_date: '',
    guests_estimate: '',
    location: '',
    budget_range: '',
    full_name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
};

export default function PedidoOrcamento() {
    const [searchParams] = useSearchParams();
    const requestedArtist = searchParams.get('artista');

    const [step, setStep] = useState(0);
    const [form, setForm] = useState(initialForm);
    const [status, setStatus] = useState('idle'); // idle | sending | success | error

    const { data: apiServices, loading: loadingServices } = useApiData(api.getServices, [], []);
    const availableServices =
        apiServices.length > 0
            ? apiServices.map((s) => ({ id: s.id, title: s.title }))
            : mockServices.map((s, i) => ({ id: i + 1, title: s.title }));

    useEffect(() => {
        if (!requestedArtist || availableServices.length === 0) return;

        const artistService = availableServices.find((s) =>
            s.title.toLowerCase().includes('artista')
        );

        setForm((f) => ({
            ...f,
            event_type: f.event_type || 'Show/Concerto',
            message: f.message || `Tenho interesse em contratar o(a) artista: ${requestedArtist}.`,
            services:
                artistService && !f.services.includes(artistService.id)
                    ? [...f.services, artistService.id]
                    : f.services,
        }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [requestedArtist, availableServices.length]);

    function update(field, value) {
        setForm((f) => ({ ...f, [field]: value }));
    }

    function toggleService(id) {
        setForm((f) => ({
            ...f,
            services: f.services.includes(id)
                ? f.services.filter((s) => s !== id)
                : [...f.services, id],
        }));
    }

    function canAdvance() {
        if (step === 0) return form.event_type !== '';
        if (step === 1) return form.services.length > 0;
        if (step === 2) return form.budget_range !== '';
        return true;
    }

    function next() {
        if (canAdvance() && step < steps.length - 1) setStep(step + 1);
    }
    function back() {
        if (step > 0) setStep(step - 1);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setStatus('sending');
        try {
            await api.submitQuoteRequest({
                ...form,
                guests_estimate: form.guests_estimate ? Number(form.guests_estimate) : null,
                event_date: form.event_date || null,
            });
            setStatus('success');

            // Gera o PDF automaticamente para o cliente descarregar
            await generateQuotePDF(form, availableServices, requestedArtist);

            // Abre o WhatsApp já preenchido para o cliente só premir Enviar
            openWhatsAppWithQuote(form, availableServices, requestedArtist);
        } catch (err) {
            console.error(err);
            setStatus('error');
        }
    }
    if (status === 'success') {
        return (
            <section className="min-h-[70vh] flex items-center justify-center bg-forest-dark px-6">
                <div className="text-center max-w-lg animate-riseIn">
                    <span className="relative flex h-3 w-3 mx-auto mb-6">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-cue animate-blink" />
                    </span>
                    <span className="eyebrow">Pedido Recebido</span>
                    <h1 className="mt-4 font-display text-6xl tracking-tightest text-paper uppercase">
                        No ar em breve.
                    </h1>
                    <p className="mt-6 text-paper/60">
                        Recebemos o teu pedido. A nossa equipa entrará em contacto
                        com uma proposta à medida do teu evento.
                    </p>
                    <p className="mt-2 text-paper/40 text-xs">
                        O comprovativo em PDF foi descarregado e uma conversa de WhatsApp foi aberta —
                        se não viste nenhum dos dois, o teu navegador pode ter bloqueado. Usa os botões abaixo.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
                        <button
                            onClick={() => generateQuotePDF(form, availableServices, requestedArtist)}
                            className="btn-outline text-sm"
                        >
                            Descarregar Comprovativo (PDF)
                        </button>
                        <button
                            onClick={() => openWhatsAppWithQuote(form, availableServices, requestedArtist)}
                            className="btn-primary text-sm"
                        >
                            Abrir WhatsApp
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="bg-paper py-16 lg:py-20">
            <div className="max-w-5xl mx-auto px-6">
                <div className="text-center mb-12">
                    <span className="eyebrow !text-forest">Pedido de Orçamento</span>
                    <h1 className="mt-4 font-display text-6xl lg:text-7xl tracking-tightest text-forest uppercase">
                        Vamos ao palco
                    </h1>
                    {requestedArtist && (
                        <p className="mt-4 inline-flex items-center gap-2 bg-cue/10 text-forest text-sm font-medium px-4 py-2 rounded-sm">
                            🎤 A solicitar orçamento para: <strong>{requestedArtist}</strong>
                        </p>
                    )}
                </div>
                {/* Barra de progresso — rundown do formulário */}
                <div className="flex items-center mb-14 max-w-2xl mx-auto">
                    {steps.map((label, i) => (
                        <div key={label} className="flex items-center flex-1 last:flex-none">
                            <div className="flex flex-col items-center gap-2">
                                <div
                                    className={`h-9 w-9 rounded-full flex items-center justify-center font-mono text-xs border-2 transition-colors ${i < step
                                        ? 'bg-cue border-cue text-ink'
                                        : i === step
                                            ? 'border-spotlight text-spotlight'
                                            : 'border-ink/15 text-ink/30'
                                        }`}
                                >
                                    {i < step ? '✓' : `Q${i + 1}`}
                                </div>
                                <span className={`text-[11px] font-mono uppercase tracking-widest2 hidden sm:block ${i <= step ? 'text-forest' : 'text-ink/30'
                                    }`}>
                                    {label}
                                </span>
                            </div>
                            {i < steps.length - 1 && (
                                <div className={`h-px flex-1 mx-2 ${i < step ? 'bg-cue' : 'bg-ink/10'}`} />
                            )}
                        </div>
                    ))}
                </div>

                <form onSubmit={handleSubmit} className="grid lg:grid-cols-[1.6fr_1fr] gap-10">
                    <div className="bg-forest-dark rounded-sm p-8 lg:p-10 min-h-[420px]">
                        {/* Passo 1 — Tipo de Evento */}
                        {step === 0 && (
                            <div className="animate-riseIn">
                                <h2 className="font-body font-semibold text-2xl text-paper mb-6">
                                    Que tipo de evento vamos produzir?
                                </h2>
                                <div className="grid sm:grid-cols-3 gap-3">
                                    {eventTypeOptions.map(({ value, icon: Icon }) => (
                                        <button
                                            type="button"
                                            key={value}
                                            onClick={() => update('event_type', value)}
                                            className={`flex flex-col items-center gap-3 p-6 rounded-sm border transition-all ${form.event_type === value
                                                ? 'border-cue bg-cue/10 text-cue'
                                                : 'border-cue/10 text-paper/60 hover:border-cue/40'
                                                }`}
                                        >
                                            <Icon size={24} />
                                            <span className="text-sm font-medium">{value}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Passo 2 — Serviços */}
                        {step === 1 && (
                            <div className="animate-riseIn">
                                <h2 className="font-body font-semibold text-2xl text-paper mb-2">
                                    Que serviços precisas?
                                </h2>
                                <p className="text-paper/50 text-sm mb-6">Podes escolher mais do que um.</p>

                                {loadingServices ? (
                                    <div className="flex items-center gap-2 text-paper/50">
                                        <Loader2 size={16} className="animate-spin" /> A carregar…
                                    </div>
                                ) : (
                                    <div className="grid sm:grid-cols-2 gap-3">
                                        {availableServices.map((s) => (
                                            <button
                                                type="button"
                                                key={s.id}
                                                onClick={() => toggleService(s.id)}
                                                className={`flex items-center gap-3 px-4 py-3.5 rounded-sm border text-left transition-all ${form.services.includes(s.id)
                                                    ? 'border-cue bg-cue/10 text-cue'
                                                    : 'border-cue/10 text-paper/70 hover:border-cue/40'
                                                    }`}
                                            >
                                                <span
                                                    className={`h-4 w-4 rounded-sm border flex items-center justify-center shrink-0 ${form.services.includes(s.id) ? 'bg-cue border-cue' : 'border-paper/30'
                                                        }`}
                                                >
                                                    {form.services.includes(s.id) && <span className="text-ink text-[10px]">✓</span>}
                                                </span>
                                                <span className="text-sm">{s.title}</span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Passo 3 — Detalhes */}
                        {step === 2 && (
                            <div className="animate-riseIn space-y-6">
                                <h2 className="font-body font-semibold text-2xl text-paper mb-2">
                                    Detalhes do evento
                                </h2>
                                <div className="grid sm:grid-cols-2 gap-5">
                                    <DarkField label="Data prevista" type="date" value={form.event_date}
                                        onChange={(v) => update('event_date', v)} />
                                    <DarkField label="Nº de convidados (estimado)" type="number" value={form.guests_estimate}
                                        onChange={(v) => update('guests_estimate', v)} />
                                </div>
                                <DarkField label="Local previsto" value={form.location}
                                    onChange={(v) => update('location', v)} placeholder="Ex: Huíla, Lubango" />

                                <div>
                                    <label className="font-mono text-[11px] text-cue tracking-widest2 uppercase block mb-3">
                                        Faixa de orçamento
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {budgetOptions.map((b) => (
                                            <button
                                                type="button"
                                                key={b.value}
                                                onClick={() => update('budget_range', b.value)}
                                                className={`text-xs px-4 py-2 rounded-sm border transition-colors ${form.budget_range === b.value
                                                    ? 'bg-spotlight border-spotlight text-ink font-medium'
                                                    : 'border-cue/15 text-paper/60 hover:border-cue/40'
                                                    }`}
                                            >
                                                {b.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Passo 4 — Contacto */}
                        {step === 3 && (
                            <div className="animate-riseIn space-y-5">
                                <h2 className="font-body font-semibold text-2xl text-paper mb-2">
                                    Como te contactamos?
                                </h2>
                                <div className="grid sm:grid-cols-2 gap-5">
                                    <DarkField label="Nome completo" value={form.full_name}
                                        onChange={(v) => update('full_name', v)} required />
                                    <DarkField label="E-mail" type="email" value={form.email}
                                        onChange={(v) => update('email', v)} required />
                                </div>
                                <div className="grid sm:grid-cols-2 gap-5">
                                    <DarkField label="Telefone" value={form.phone}
                                        onChange={(v) => update('phone', v)} required />
                                    <DarkField label="Empresa (opcional)" value={form.company}
                                        onChange={(v) => update('company', v)} />
                                </div>
                                <div>
                                    <label className="font-mono text-[11px] text-cue tracking-widest2 uppercase block mb-2">
                                        Mensagem adicional
                                    </label>
                                    <textarea
                                        rows={4}
                                        value={form.message}
                                        onChange={(e) => update('message', e.target.value)}
                                        className="w-full bg-transparent border border-cue/15 rounded-sm px-4 py-3 text-paper focus:border-cue outline-none transition-colors resize-none"
                                    />
                                </div>

                                {status === 'error' && (
                                    <p className="flex items-center gap-2 text-red-400 text-sm">
                                        <AlertCircle size={16} /> Não foi possível enviar. Verifica os dados e tenta novamente.
                                    </p>
                                )}
                            </div>
                        )}

                        {/* Navegação */}
                        <div className="flex justify-between items-center mt-10 pt-6 border-t border-cue/10">
                            <button
                                type="button"
                                onClick={back}
                                disabled={step === 0}
                                className="flex items-center gap-2 text-paper/50 hover:text-paper text-sm disabled:opacity-0 transition-opacity"
                            >
                                <ArrowLeft size={15} /> Voltar
                            </button>

                            {step < steps.length - 1 ? (
                                <button
                                    type="button"
                                    onClick={next}
                                    disabled={!canAdvance()}
                                    className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                    Continuar <ArrowRight size={16} />
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    disabled={status === 'sending'}
                                    className="btn-primary disabled:opacity-60"
                                >
                                    {status === 'sending' ? (
                                        <>
                                            <Loader2 size={16} className="animate-spin" /> A enviar…
                                        </>
                                    ) : (
                                        <>
                                            Confirmar Pedido <CheckCircle2 size={16} />
                                        </>
                                    )}
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Resumo ao vivo — rundown do pedido */}
                    <aside className="bg-forest rounded-sm p-6 h-fit lg:sticky lg:top-24">
                        <div className="flex items-center gap-2 mb-5">
                            <VuMeter bars={5} className="h-3 text-cue" />
                            <span className="font-mono text-[10px] text-cue tracking-widest2 uppercase">
                                Resumo do Pedido
                            </span>
                        </div>
                        {requestedArtist && <SummaryRow label="Artista Solicitado" value={requestedArtist} />}
                        <dl className="space-y-4 text-sm">
                            <SummaryRow label="Tipo" value={form.event_type} />
                            <SummaryRow
                                label="Serviços"
                                value={
                                    form.services.length > 0
                                        ? availableServices
                                            .filter((s) => form.services.includes(s.id))
                                            .map((s) => s.title)
                                            .join(', ')
                                        : ''
                                }
                            />
                            <SummaryRow label="Data" value={form.event_date} />
                            <SummaryRow label="Local" value={form.location} />
                            <SummaryRow
                                label="Orçamento"
                                value={budgetOptions.find((b) => b.value === form.budget_range)?.label}
                            />
                            <SummaryRow label="Nome" value={form.full_name} />
                        </dl>
                    </aside>
                </form>
            </div>
        </section>
    );
}

function DarkField({ label, type = 'text', value, onChange, placeholder, required = false }) {
    return (
        <div>
            <label className="font-mono text-[11px] text-cue tracking-widest2 uppercase block mb-2">
                {label}
            </label>
            <input
                type={type}
                value={value}
                placeholder={placeholder}
                required={required}
                onChange={(e) => onChange(e.target.value)}
                className="w-full bg-transparent border border-cue/15 rounded-sm px-4 py-3 text-paper focus:border-cue outline-none transition-colors"
            />
        </div>
    );
}

function SummaryRow({ label, value }) {
    return (
        <div className="border-b border-cue/10 pb-3">
            <dt className="font-mono text-[9px] text-paper/40 tracking-widest2 uppercase">{label}</dt>
            <dd className={`mt-1 ${value ? 'text-paper' : 'text-paper/30 italic'}`}>
                {value || '—'}
            </dd>
        </div>
    );
}