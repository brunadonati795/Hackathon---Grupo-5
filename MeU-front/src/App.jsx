import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import PaginaInicial from './pages/PaginaInicial';
import QuizEstiloAprendizagem from './pages/QuizAprendizagem';
import QuizNivelDisciplina from './pages/QuizNivelDisciplina';
import SelecaoDisciplina from './pages/Disciplinas';
import FisicaAlto from './pages/FisicaAlto';
import FisicaMedio from './pages/FisicaMedio';
import FisicaBaixo from './pages/FisicaBaixo';

const CornerLogo = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  if (isHome) return null;
  return <img src={new URL('./assets/image-removebg-preview.png', import.meta.url).href} alt="Marca" className="corner-logo corner-logo--lg" />;
};

function App() {
  return (
    <Router>
      <CornerLogo />
      <Routes>
        <Route path="/" element={<PaginaInicial />} />
        <Route path="/quiz-estilo" element={<QuizEstiloAprendizagem />} />
        <Route path="/disciplinas" element={<SelecaoDisciplina />} />
        <Route path="/quiz-nivel/:disciplina" element={<QuizNivelDisciplina />} />
        {/* telas específicas de Física */}
        <Route path="/fisica/alto" element={<FisicaAlto />} />
        <Route path="/fisica/medio" element={<FisicaMedio />} />
        <Route path="/fisica/baixo" element={<FisicaBaixo />} />
        {/* aliases/legacy paths */}
        <Route path="/selecao-disciplina" element={<SelecaoDisciplina />} />
      </Routes>
    </Router>
  );
}

export default App;
