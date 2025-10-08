import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import PaginaInicial from './pages/PaginaInicial';
import QuizEstiloAprendizagem from './pages/QuizAprendizagem';
import QuizNivelDisciplina from './pages/QuizNivelDisciplina';
import SelecaoDisciplina from './pages/Disciplinas';
import Login from './components/Login';
import Register from './components/Register';
import FisicaAlto from './pages/FisicaAlto';
import FisicaMedio from './pages/FisicaMedio';
import FisicaBaixo from './pages/FisicaBaixo';

const CornerLogo = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isAuth = location.pathname === '/login' || location.pathname === '/register';
  const isFisica = location.pathname.includes('/fisica/');
  
  if (isHome || isAuth) return null;
  
  // Para páginas de Física, a logo será renderizada dentro do header
  if (isFisica) return null;
  
  return <img src={new URL('./assets/image-removebg-preview.png', import.meta.url).href} alt="Marca" className="corner-logo corner-logo--lg" />;
};

// Componente que atua como um 'guarda de rota'
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  // Se não houver token, redireciona o usuário para a página de login
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  // Se houver token, permite que o componente filho seja renderizado
  return children;
};

function App() {
  return (
    <Router>
      <CornerLogo />
      <Routes>
        {/* Rotas Públicas */}
        <Route path="/" element={<PaginaInicial />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Rotas Protegidas */}
        <Route 
          path="/quiz-estilo" 
          element={
            <ProtectedRoute>
              <QuizEstiloAprendizagem />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/disciplinas" 
          element={
            <ProtectedRoute>
              <SelecaoDisciplina />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/quiz-nivel/:disciplina" 
          element={
            <ProtectedRoute>
              <QuizNivelDisciplina />
            </ProtectedRoute>
          } 
        />
        {/* telas específicas de Física */}
        <Route 
          path="/fisica/alto" 
          element={
            <ProtectedRoute>
              <FisicaAlto />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/fisica/medio" 
          element={
            <ProtectedRoute>
              <FisicaMedio />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/fisica/baixo" 
          element={
            <ProtectedRoute>
              <FisicaBaixo />
            </ProtectedRoute>
          } 
        />
        {/* aliases/legacy paths */}
        <Route 
          path="/selecao-disciplina" 
          element={
            <ProtectedRoute>
              <SelecaoDisciplina />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
