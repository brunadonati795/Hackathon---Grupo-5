import '../App.css';
import { useNavigate } from 'react-router-dom';

const FisicaMedio = () => {
  const navigate = useNavigate();
  return (
    <div className="quiz-container">
      <button className="botao-sair" onClick={() => navigate('/disciplinas')}>Voltar</button>
      <h1>Física - Nível Médio</h1>
      <p>Módulos essenciais para consolidar a base do Ensino Médio.</p>

      <div className="opcoes" style={{ gap: 16 }}>
        <details>
          <summary>Cinemática</summary>
          <ul>
            <li>MRU e MRUV (gráficos, equações)</li>
            <li>Lançamento oblíquo e queda livre</li>
            <li>Movimento circular uniforme</li>
          </ul>
        </details>
        <details>
          <summary>Leis de Newton</summary>
          <ul>
            <li>Forças de contato, atrito e tração</li>
            <li>Diagramas de forças e equilíbrio</li>
            <li>Aplicações em planos inclinados</li>
          </ul>
        </details>
        <details>
          <summary>Energia e Trabalho</summary>
          <ul>
            <li>Trabalho de forças constantes</li>
            <li>Energia cinética e potencial</li>
            <li>Conservação de energia mecânica</li>
          </ul>
        </details>
        <details>
          <summary>Eletricidade Básica</summary>
          <ul>
            <li>Lei de Ohm e potência elétrica</li>
            <li>Resistores em série e paralelo</li>
            <li>Associação de capacitores (noções)</li>
          </ul>
        </details>
      </div>
    </div>
  );
};

export default FisicaMedio;


