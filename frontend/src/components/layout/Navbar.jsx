import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { services } from '../../data/mockData.js';
import PamilLogo from "../../assets/pamil.png";

const navLinks = [
  { label: 'Sobre Nós', to: '/sobre-nos' },
  { label: 'Artistas', to: '/artistas' },
  { label: 'Eventos', to: '/eventos' },
  { label: 'Galeria', to: '/galeria' },
  { label: 'Notícias', to: '/noticias' },
  { label: 'Contactos', to: '/contactos' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-forest-dark/95 backdrop-blur border-b border-cue/10">
      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-cue animate-blink" />
          </span>
          <img
            src={PamilLogo}
            alt="Pamil Produções"
            className="h-14 w-auto object-contain"
          />
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button className="flex items-center gap-1 text-paper/90 hover:text-cue text-sm font-medium transition-colors">
              Serviços <ChevronDown size={14} />
            </button>
            {servicesOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-72">
                <div className="bg-forest-dark border border-cue/15 rounded-sm shadow-2xl py-2">
                  {services.map((s) => (
                    <Link
                      key={s.slug}
                      to={`/servicos/${s.slug}`}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-paper/80 hover:text-cue hover:bg-cue/5 transition-colors"
                    >
                      <span className="font-mono text-[10px] text-spotlight/80">{s.cue}</span>
                      {s.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {navLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive ? 'text-cue' : 'text-paper/90 hover:text-cue'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}

          <Link to="/pedido-de-orcamento" className="btn-primary text-sm !py-2.5">
            Pedir Orçamento
          </Link>
        </div>

        <button
          className="lg:hidden text-paper"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden bg-forest-dark border-t border-cue/10 px-6 py-6 flex flex-col gap-4">
          <span className="eyebrow">Serviços</span>
          <div className="grid grid-cols-2 gap-2 mb-2">
            {services.map((s) => (
              <Link
                key={s.slug}
                to={`/servicos/${s.slug}`}
                className="text-sm text-paper/80"
                onClick={() => setOpen(false)}
              >
                <span className="font-mono text-[10px] text-spotlight/80 mr-1">{s.cue}</span>
                {s.title}
              </Link>
            ))}
          </div>
          {navLinks.map((l) => (
            <Link key={l.to} to={l.to} className="text-paper/90 text-sm" onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <Link to="/pedido-de-orcamento" className="btn-primary justify-center mt-2" onClick={() => setOpen(false)}>
            Pedir Orçamento
          </Link>
        </div>
      )}
    </header>
  );
}
