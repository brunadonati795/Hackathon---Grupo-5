import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PaginaInicial from './pages/PaginaInicial';
import QuizEstiloAprendizagem from './pages/QuizAprendizagem';
import QuizNivelDisciplina from './pages/QuizNivelDisciplina';
import SelecaoDisciplina from './pages/Disciplinas';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PaginaInicial />} />
        <Route path="/quiz-estilo" element={<QuizEstiloAprendizagem />} />
        <Route path="/quiz-nivel" element={<QuizNivelDisciplina />} />
        <Route path="/selecao-disciplina" element={<SelecaoDisciplina />} />
      </Routes>
    </Router>
  );
}

export default App;
