import { useEffect } from 'react';
import { X, Instagram, Facebook, Youtube, Music } from 'lucide-react';

export default function ArtistModal({ artist, onClose }) {
  // Fecha com a tecla Esc
  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose();
    }

    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!artist) return null;

  const socials = [
    { url: artist.instagram_url, icon: Instagram, label: 'Instagram' },
    { url: artist.facebook_url, icon: Facebook, label: 'Facebook' },
    { url: artist.youtube_url, icon: Youtube, label: 'YouTube' },
    { url: artist.spotify_url, icon: Music, label: 'Spotify' },
  ].filter((s) => s.url);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`Perfil de ${artist.name}`}
    >
      {/* Backdrop — clicar fora fecha o modal */}
      <div
        className="absolute inset-0 bg-ink/80 backdrop-blur-sm animate-riseIn"
        onClick={onClose}
      />

      <div className="relative bg-forest-dark border border-cue/15 rounded-sm w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-riseIn">
        <button
          onClick={onClose}
          aria-label="Fechar"
          className="absolute top-4 right-4 z-10 bg-ink/50 hover:bg-cue hover:text-ink text-paper rounded-full p-2 transition-colors"
        >
          <X size={18} />
        </button>

        <div className="grid sm:grid-cols-[280px_1fr]">
          {/* Foto */}
          <div className="relative h-64 sm:h-full bg-forest">
            <img
              src={artist.photo}
              alt={artist.name}
              className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-ink/70 via-transparent to-transparent" />
          </div>

          {/* Informação */}
          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-1">
              <span className="font-mono text-[10px] text-cue tracking-widest2 uppercase">
                {artist.category_display ?? artist.category}
              </span>

              {artist.is_available === false && (
                <span className="font-mono text-[9px] text-paper/50 tracking-widest2 uppercase border border-paper/20 px-2 py-0.5 rounded-sm">
                  Indisponível
                </span>
              )}

              {artist.is_available !== false && (
                <span className="flex items-center gap-1.5 font-mono text-[9px] text-cue tracking-widest2 uppercase">
                  <span className="h-1.5 w-1.5 rounded-full bg-cue animate-blink" />
                  Disponível
                </span>
              )}
            </div>

            <h2 className="font-display text-5xl tracking-tightest text-paper uppercase mt-2">
              {artist.name}
            </h2>

            <p className="mt-5 text-paper/60 text-sm leading-relaxed whitespace-pre-line">
              {artist.bio}
            </p>

            {/* Redes sociais */}
            {socials.length > 0 && (
              <div className="flex gap-3 mt-6 pt-6 border-t border-cue/10">
                {socials.map(({ url, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="p-2.5 border border-cue/20 rounded-sm text-paper/70 hover:text-cue hover:border-cue transition-colors"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            )}

            {/* Solicitar artista */}
            <a
              href="/pedido-de-orcamento"
              className="btn-primary mt-8 inline-flex text-sm !py-2.5"
            >
              Solicitar Este Artista
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

