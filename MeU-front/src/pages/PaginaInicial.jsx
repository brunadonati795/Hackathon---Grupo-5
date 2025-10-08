import { useNavigate } from 'react-router-dom';
import '../App.css';
import brand from '../assets/image-removebg-preview.png';

const PaginaInicial = () => {
  const navigate = useNavigate();

  const iniciarQuiz = () => {
    navigate('/quiz-estilo');
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
      <button className="botao-perguntas" onClick={iniciarQuiz}>PERGUNTAS</button>
    </div>
  );
};

export default PaginaInicial;