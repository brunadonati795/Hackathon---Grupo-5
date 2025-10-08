import '../App.css';
import { useNavigate } from 'react-router-dom';

const FisicaAlto = () => {
  const navigate = useNavigate();
  return (
    <div className="quiz-container">
      <button className="botao-sair" onClick={() => navigate('/disciplinas')}>Voltar</button>
      <h1>Física - Nível Alto</h1>
      <p>Trilhas avançadas para aprofundar conteúdos do Ensino Médio.</p>

      <div className="opcoes" style={{ gap: 16 }}>
        <details>
          <summary>Leis de Newton e Dinâmica Avançada</summary>
          <ul>
            <li>Sistemas com polias, atrito variável, planos inclinados compostos</li>
            <li>Trabalho e energia com forças não conservativas</li>
            <li>Momento linear, colisões oblíquas e centro de massa</li>
          </ul>
        </details>
        <details>
          <summary>Oscilações e Ondas</summary>
          <ul>
            <li>MHS com massa-mola e pêndulo físico</li>
            <li>Superposição, batimentos e ondas estacionárias</li>
            <li>Acústica, intensidade e nível sonoro (dB)</li>
          </ul>
        </details>
        <details>
          <summary>Eletromagnetismo</summary>
          <ul>
            <li>Lei de Faraday-Lenz, indutância e RL/RC transitórios</li>
            <li>Campo magnético de condutores, força de Lorentz</li>
            <li>Circuitos em corrente alternada (noções)</li>
          </ul>
        </details>
        <details>
          <summary>Óptica Geométrica e Física</summary>
          <ul>
            <li>Lentes delgadas, espelhos esféricos e instrumentação</li>
            <li>Interferência e difração (noções), redes de difração</li>
            <li>Polarização e aplicações</li>
          </ul>
        </details>
      </div>
    </div>
  );
};

export default FisicaAlto;


