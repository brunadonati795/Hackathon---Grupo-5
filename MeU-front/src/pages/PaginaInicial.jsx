import { useNavigate } from 'react-router-dom';
import '../App.css';
import brand from '../assets/image-removebg-preview.png';

const PaginaInicial = () => {
  const navigate = useNavigate();

  const iniciarQuiz = () => {
    // Verificar se o usuário está logado
    const token = localStorage.getItem('token');
    if (!token) {
      // Se não estiver logado, redirecionar para login
      navigate('/login');
    } else {
      // Se estiver logado, ir para o quiz
      navigate('/quiz-estilo');
    }
  };

  const irParaLogin = () => {
    navigate('/login');
  };

  return (
    <div className="pagina-inicial">
      <div className="logo-area">
        <img src={brand} alt="Logo" className="logo logo--hero"/>
        <div className="title-section">
          <h1>MeU</h1>
          <p className="subtitulo">Meu Ensino Único</p>
        </div>
        <div className="description-section">
          <p className="description-text">Aprenda da sua forma, no seu tempo</p>
          <p className="description-subtext">Responda às perguntas e personalize sua experiência!</p>
        </div>
      </div>
      <div className="button-container">
        <button className="botao-perguntas" onClick={iniciarQuiz}>PERGUNTAS</button>
        <button className="botao-login" onClick={irParaLogin}>LOGIN</button>
      </div>
    </div>
  );
};

export default PaginaInicial;