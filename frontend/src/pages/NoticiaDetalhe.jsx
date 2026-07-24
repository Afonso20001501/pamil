import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { api } from '../services/api.js';
import { useApiData } from '../hooks/useApiData.js';
import { newsPosts as mockNews } from '../data/mockData.js';
import CTAQuote from '../components/sections/CTAQuote.jsx';

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('pt-PT', { day: '2-digit', month: 'long', year: 'numeric' });
}

export default function NoticiaDetalhe() {
  const { slug } = useParams();

  const { data: apiPost, loading, error } = useApiData(
    () => api.getNewsBySlug(slug),
    null,
    [slug]
  );

  const mockMatch = mockNews.find((p) => p.slug === slug);
  const post = !loading && !error && apiPost ? apiPost : mockMatch;

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-sage gap-2">
        <Loader2 size={18} className="animate-spin" /> A carregar…
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
        <h1 className="font-display text-5xl text-forest tracking-tightest">Notícia não encontrada</h1>
        <Link to="/noticias" className="btn-primary mt-6 inline-flex">
          Ver todas as notícias
        </Link>
      </div>
    );
  }

  return (
    <>
      <article className="bg-paper py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-6">
          <Link to="/noticias" className="inline-flex items-center gap-2 text-sage hover:text-forest text-sm mb-8 transition-colors">
            <ArrowLeft size={15} /> Todas as notícias
          </Link>

          <p className="font-mono text-[10px] text-forest tracking-widest2 uppercase">
            {formatDate(post.published_at)} · {post.author_name}
          </p>
          <h1 className="mt-3 font-display text-5xl lg:text-6xl tracking-tightest text-ink uppercase leading-[0.95]">
            {post.title}
          </h1>

          <div className="aspect-video overflow-hidden rounded-sm my-10">
            <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" />
          </div>

          <div className="prose-content text-ink/80 leading-relaxed space-y-5 text-[17px]">
            {post.content.split('\n\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      </article>

      <CTAQuote />
    </>
  );
}