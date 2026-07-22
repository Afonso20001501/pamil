import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout.jsx';
import Home from './pages/Home.jsx';

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
          <Route path="/sobre-nos" element={<EmComBreve titulo="Sobre Nós" />} />
          <Route path="/servicos/*" element={<EmComBreve titulo="Serviços" />} />
          <Route path="/artistas" element={<EmComBreve titulo="Artistas" />} />
          <Route path="/eventos" element={<EmComBreve titulo="Eventos" />} />
          <Route path="/galeria" element={<EmComBreve titulo="Galeria" />} />
          <Route path="/noticias" element={<EmComBreve titulo="Notícias" />} />
          <Route path="/contactos" element={<EmComBreve titulo="Contactos" />} />
          <Route path="/pedido-de-orcamento" element={<EmComBreve titulo="Pedido de Orçamento" />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
