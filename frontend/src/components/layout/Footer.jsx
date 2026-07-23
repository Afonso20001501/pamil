import { Link } from 'react-router-dom';
import { Instagram, Facebook, Youtube, Phone, Mail, MapPin } from 'lucide-react';
import { services } from '../../data/mockData.js';
import PamilLogo from "../../assets/pamil.png";

export default function Footer() {
  return (
    <footer className="bg-forest-dark text-paper/80 border-t border-cue/10">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div>
            <img
                      src={PamilLogo}
                      alt="Pamil Produções"
                      className="h-14 w-auto object-contain"
                    />
          <p className="mt-4 text-sm leading-relaxed text-paper/60 max-w-xs">
            Produção de eventos e gestão de artistas em Angola. Do briefing ao
            encerramento das luzes — cuidamos de cada deixa.
          </p>
          <div className="flex gap-4 mt-6">
            <a href="#" aria-label="Instagram" className="hover:text-cue transition-colors"><Instagram size={18} /></a>
            <a href="#" aria-label="Facebook" className="hover:text-cue transition-colors"><Facebook size={18} /></a>
            <a href="#" aria-label="YouTube" className="hover:text-cue transition-colors"><Youtube size={18} /></a>
          </div>
        </div>

        <div>
          <span className="eyebrow">Serviços</span>
          <ul className="mt-4 space-y-2.5 text-sm">
            {services.slice(0, 6).map((s) => (
              <li key={s.slug}>
                <Link to={`/servicos/${s.slug}`} className="hover:text-cue transition-colors">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <span className="eyebrow">Empresa</span>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link to="/sobre-nos" className="hover:text-cue transition-colors">Sobre Nós</Link></li>
            <li><Link to="/artistas" className="hover:text-cue transition-colors">Artistas</Link></li>
            <li><Link to="/eventos" className="hover:text-cue transition-colors">Eventos</Link></li>
            <li><Link to="/galeria" className="hover:text-cue transition-colors">Galeria</Link></li>
            <li><Link to="/noticias" className="hover:text-cue transition-colors">Notícias</Link></li>
          </ul>
        </div>

        <div>
          <span className="eyebrow">Contactos</span>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-center gap-2"><Phone size={15} className="text-spotlight" /> +244 929 818 191 - 923 002 299</li>
            <li className="flex items-center gap-2"><Mail size={15} className="text-spotlight" /> contacto@pamilproducoes.ao</li>
            <li className="flex items-start gap-2"><MapPin size={15} className="text-spotlight mt-0.5" /> Lubango, Angola</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cue/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-paper/40 font-mono">
          <span>© {new Date().getFullYear()} PAMIL — TODOS OS DIREITOS RESERVADOS</span>
          <span className="text-spotlight mt-0.5" >POWERED BY · AFONSO MIQUEIAS</span>
        </div>
      </div>
    </footer>
  );
}
