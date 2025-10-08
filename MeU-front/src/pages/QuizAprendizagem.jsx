import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const QuizEstiloAprendizagem = () => {
  const navigate = useNavigate();
  const [estilo, setEstilo] = useState('');

  const enviarResposta = async () => {
    if (!estilo) return alert('Por favor, selecione uma opção.');

    try {
      await fetch('http://localhost:3000/api/quiz-estilo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estiloAprendizagem: estilo }),
      });

      navigate('/disciplinas'); 
    } catch (error) {
      console.error('Erro ao enviar resposta:', error);
    }
  };

  return (
    <div className="quiz-container">
      <h1>Questionário - Forma de Aprendizagem</h1>
      <p>Quais métodos você gosta de utilizar para estudar?</p>

      <div className="opcoes">
        <label>
          <input
            type="radio"
            name="estilo"
            value="escrita-leitura"
            onChange={(e) => setEstilo(e.target.value)}
          />
          Escrita e leitura
        </label>
        <label>
          <input
            type="radio"
            name="estilo"
            value="audio-visual"
            onChange={(e) => setEstilo(e.target.value)}
          />
          Áudio-visual
        </label>
        <label>
          <input
            type="radio"
            name="estilo"
            value="questoes"
            onChange={(e) => setEstilo(e.target.value)}
          />
          Fazer questões
        </label>
        <label>
          <input
            type="radio"
            name="estilo"
            value="explicando"
            onChange={(e) => setEstilo(e.target.value)}
          />
          Explicando para alguém
        </label>
        <label>
          <input
            type="radio"
            name="estilo"
            value="visual"
            onChange={(e) => setEstilo(e.target.value)}
          />
          Visual (infográficos, mapas mentais)
        </label>
        <label>
          <input
            type="radio"
            name="estilo"
            value="pratica"
            onChange={(e) => setEstilo(e.target.value)}
          />
          Fazer na prática
        </label>
      </div>

      <button className="botao-prosseguir" onClick={enviarResposta}>
        PROSSEGUIR
      </button>
    </div>
  );
};

export default QuizEstiloAprendizagem;