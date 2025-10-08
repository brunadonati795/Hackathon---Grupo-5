import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const QuizEstiloAprendizagem = () => {
  const navigate = useNavigate();
  const [estilosSelecionados, setEstilosSelecionados] = useState([]);
  const [temHabitoEstudar, setTemHabitoEstudar] = useState(''); // 'sim' | 'nao'
  const [tempoEstudo, setTempoEstudo] = useState(''); // texto livre ou opções

  const alternarEstilo = (valor) => {
    setEstilosSelecionados((prev) =>
      prev.includes(valor) ? prev.filter((v) => v !== valor) : [...prev, valor]
    );
  };

  const enviarResposta = async () => {
    if (estilosSelecionados.length === 0) return alert('Por favor, selecione ao menos uma opção.');

    try {
      await fetch('http://localhost:3000/api/quiz-estilo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          estilosAprendizagem: estilosSelecionados,
          habitoEstudo: temHabitoEstudar,
          tempoEstudo: tempoEstudo,
        }),
      });
    } catch (error) {
      console.error('Erro ao enviar resposta:', error);
    } finally {
      // Avança de tela mesmo que o backend esteja offline
      navigate('/disciplinas');
    }
  };

  return (
    <div className="quiz-container">
      <h1>Questionário - Forma de Aprendizagem</h1>
      <p>Quais métodos você gosta de utilizar para estudar?</p>

      <div className="opcoes">
        <label>
          <input
            type="checkbox"
            name="estilo"
            value="escrita-leitura"
            checked={estilosSelecionados.includes('escrita-leitura')}
            onChange={() => alternarEstilo('escrita-leitura')}
          />
          Escrita e leitura
        </label>
        <label>
          <input
            type="checkbox"
            name="estilo"
            value="audio-visual"
            checked={estilosSelecionados.includes('audio-visual')}
            onChange={() => alternarEstilo('audio-visual')}
          />
          Áudio-visual
        </label>
        <label>
          <input
            type="checkbox"
            name="estilo"
            value="questoes"
            checked={estilosSelecionados.includes('questoes')}
            onChange={() => alternarEstilo('questoes')}
          />
          Fazer questões
        </label>
        <label>
          <input
            type="checkbox"
            name="estilo"
            value="explicando"
            checked={estilosSelecionados.includes('explicando')}
            onChange={() => alternarEstilo('explicando')}
          />
          Explicando para alguém
        </label>
        <label>
          <input
            type="checkbox"
            name="estilo"
            value="visual"
            checked={estilosSelecionados.includes('visual')}
            onChange={() => alternarEstilo('visual')}
          />
          Visual (infográficos, mapas mentais)
        </label>
        <label>
          <input
            type="checkbox"
            name="estilo"
            value="pratica"
            checked={estilosSelecionados.includes('pratica')}
            onChange={() => alternarEstilo('pratica')}
          />
          Fazer na prática
        </label>
      </div>

      <div className="opcoes" style={{ marginTop: 24 }}>
        <p>Você tem o costume de estudar? Se sim, quanto tempo?</p>
        <label>
          <input
            type="radio"
            name="habito"
            value="sim"
            checked={temHabitoEstudar === 'sim'}
            onChange={() => setTemHabitoEstudar('sim')}
          />
          Sim
        </label>
        <label>
          <input
            type="radio"
            name="habito"
            value="nao"
            checked={temHabitoEstudar === 'nao'}
            onChange={() => setTemHabitoEstudar('nao')}
          />
          Não
        </label>

        {temHabitoEstudar === 'sim' && (
          <div style={{ marginTop: 12 }}>
            <label>
              Tempo por dia (ex.: 30min, 1h, 2h):
              <input
                type="text"
                value={tempoEstudo}
                onChange={(e) => setTempoEstudo(e.target.value)}
                placeholder="Ex.: 1h"
                style={{ marginLeft: 8 }}
              />
            </label>
          </div>
        )}
      </div>

      <button className="botao-prosseguir" onClick={enviarResposta}>
        PROSSEGUIR
      </button>
    </div>
  );
};

export default QuizEstiloAprendizagem;