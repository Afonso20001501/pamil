import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout.jsx';
import Home from './pages/Home.jsx';
import Sobre from './pages/Sobre.jsx';
import Servicos from './pages/Servicos.jsx';
import ServicoDetalhe from './pages/ServicoDetalhe.jsx';
import Artistas from './pages/Artistas.jsx';
import Eventos from './pages/Eventos.jsx';
import EventoDetalhe from './pages/EventoDetalhe.jsx';
import Galeria from './pages/Galeria.jsx';
import Noticias from './pages/Noticias.jsx';
import NoticiaDetalhe from './pages/NoticiaDetalhe.jsx';
import Contactos from './pages/Contactos.jsx';

function EmComBreve({ titulo }) {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center text-center px-6">
      <span className="eyebrow mb-3">Em construção</span>
      <h1 className="font-display text-5xl tracking-tightest text-forest">{titulo}</h1>
      <p className="mt-3 text-sage max-w-md">
        Esta secção está a ser preparada. Volta em breve.
      </p>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre-nos" element={<Sobre />} />
          <Route path="/servicos" element={<Servicos />} />
          <Route path="/servicos/:slug" element={<ServicoDetalhe />} />
          <Route path="/artistas" element={<Artistas />} />
          <Route path="/eventos" element={<Eventos />} />
          <Route path="/eventos/:slug" element={<EventoDetalhe />} />
          <Route path="/galeria" element={<Galeria />} />
          <Route path="/noticias" element={<Noticias titulo="Notícias" />} />
          <Route path="/noticias/:slug" element={<NoticiaDetalhe />} />
          <Route path="/contactos" element={<Contactos titulo="Contactos" />} />
          <Route path="/pedido-de-orcamento" element={<EmComBreve titulo="Pedido de Orçamento" />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}