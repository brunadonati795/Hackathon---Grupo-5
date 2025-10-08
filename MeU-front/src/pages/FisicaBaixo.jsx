import '../App.css';
import { useNavigate } from 'react-router-dom';

const FisicaBaixo = () => {
  const navigate = useNavigate();
  return (
    <div className="quiz-container">
      <button className="botao-sair" onClick={() => navigate('/disciplinas')}>Voltar</button>
      <h1>Física - Nível Baixo</h1>
      <p>Introdução aos principais conceitos do Ensino Médio.</p>

      <div className="opcoes" style={{ gap: 16 }}>
        <details>
          <summary>Conceitos Iniciais</summary>
          <ul>
            <li>Grandezas físicas e unidades (SI)</li>
            <li>Escalares x vetoriais, notação científica</li>
            <li>Leitura de gráficos simples</li>
          </ul>
        </details>
        <details>
          <summary>Noções de Movimento</summary>
          <ul>
            <li>Velocidade média e instantânea</li>
            <li>Aceleração, direção e sentido</li>
            <li>Exercícios básicos de MRU e MRUV</li>
          </ul>
        </details>
        <details>
          <summary>Forças do Dia a Dia</summary>
          <ul>
            <li>Peso, normal e atrito (intuição)</li>
            <li>Empurrar, puxar e equilíbrio</li>
            <li>Noções de segurança e forças</li>
          </ul>
        </details>
        <details>
          <summary>Eletricidade do Cotidiano</summary>
          <ul>
            <li>O que é corrente, tensão e resistência</li>
            <li>Consumo de energia em casa (kWh)</li>
            <li>Cuidados e boas práticas</li>
          </ul>
        </details>
      </div>
    </div>
  );
};

export default FisicaBaixo;


