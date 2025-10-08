import { useNavigate } from 'react-router-dom';
import '../App.css';

const PaginaInicial = () => {
  const navigate = useNavigate();

  const iniciarQuiz = () => {
    navigate('/quiz-estilo');
  };

  return (
    <div className="pagina-inicial">
      <div className="logo-area">
        <img src="/logo.png" alt="Logo Metitulo"/>
        <h1>MeU</h1>
        <p className="subtitulo">Meu Ensino Único</p>
      </div>

      <div className="texto-intro">
        <h2>Aprenda da sua forma, no seu tempo</h2>
        <p>Responda às perguntas e personalize sua experiência!</p>
      </div>

      <button className="botao-perguntas" onClick={iniciarQuiz}>
        PERGUNTAS
      </button>
    </div>
  );
};

export default PaginaInicial;