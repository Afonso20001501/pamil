/**
 * Barra de níveis de áudio ambiente — o elemento assinatura da marca.
 * Bastões com alturas e atrasos de animação ligeiramente distintos para
 * imitar um medidor de som real em vez de um padrão perfeitamente regular.
 */
export default function VuMeter({ className = '', bars = 12, color = 'text-cue' }) {
  const delays = Array.from({ length: bars }, (_, i) => (i % 5) * 0.09 + (i % 3) * 0.05);

  return (
    <div className={`vu-meter ${color} ${className}`} aria-hidden="true">
      {delays.map((d, i) => (
        <span
          key={i}
          className="animate-vu"
          style={{ animationDelay: `${d}s`, opacity: 0.4 + (i % 4) * 0.15 }}
        />
      ))}
    </div>
  );
}
