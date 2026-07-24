import { useEffect } from 'react';
import { X } from 'lucide-react';
import { getEmbedUrl } from '../../utils/embedVideo.js';


export default function GalleryModal({ item, onClose }) {
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

  if (!item) return null;

  const isVideo = item.media_type === 'video';

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
    >
      <div className="absolute inset-0 bg-ink/90 backdrop-blur-sm animate-riseIn" onClick={onClose} />

      <div className="relative w-full max-w-4xl animate-riseIn">
        <button
          onClick={onClose}
          aria-label="Fechar"
          className="absolute -top-12 right-0 sm:top-0 sm:-right-12 bg-ink/50 hover:bg-cue hover:text-ink text-paper rounded-full p-2 transition-colors z-10"
        >
          <X size={18} />
        </button>

        <div className="bg-forest-dark border border-cue/15 rounded-sm overflow-hidden">
          {isVideo ? (
            <div className="aspect-video">
              <iframe
                src={getEmbedUrl(item.video_url)}
                title={item.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <img src={item.image} alt={item.title} className="w-full max-h-[75vh] object-contain bg-ink" />
          )}

          <div className="p-4 sm:p-5 flex items-center justify-between gap-4">
            <div>
              <p className="font-body font-semibold text-paper">{item.title}</p>
              {item.event_title && (
                <p className="font-mono text-[10px] text-cue tracking-widest2 uppercase mt-1">
                  {item.event_title}
                </p>
              )}
            </div>
            {item.category && (
              <span className="font-mono text-[10px] text-paper/40 border border-paper/15 px-2.5 py-1 rounded-sm uppercase tracking-widest2 shrink-0">
                {item.category}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}