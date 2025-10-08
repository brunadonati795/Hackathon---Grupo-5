import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './NivelamentoDisciplina.css';

const NivelamentoDisciplina = () => {
  const { disciplina } = useParams();
  const navigate = useNavigate();
  const [nivel, setNivel] = useState('');

  const enviarNivelamento = async () => {
    if (!nivel) return alert('Selecione um nível antes de prosseguir.');

    try {
      await fetch('http://localhost:3000/api/quiz-nivel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          disciplina: disciplina,
          nivelConhecimento: nivel,
        }),
      });

      // Redireciona para a próxima etapa ou dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Erro ao enviar nível:', error);
    }
  };

  const sair = () => {
    navigate('/disciplinas');
  };

  return (
    <div className="nivelamento-container">
      <button className="btn-voltar" onClick={() => navigate('/disciplinas')} aria-label="Voltar">
        ← Voltar
      </button>
      <h1>{disciplina.toUpperCase()}</h1>
      <p>Qual é o seu nível de conhecimento nessa disciplina?</p>

      <div className="botoes-nivel">
        <button
          className={`botao-nivel ${nivel === 'alto' ? 'ativo' : ''}`}
          onClick={() => setNivel('alto')}
        >
          Alto
        </button>
        <button
          className={`botao-nivel ${nivel === 'medio' ? 'ativo' : ''}`}
          onClick={() => setNivel('medio')}
        >
          Médio
        </button>
        <button
          className={`botao-nivel ${nivel === 'baixo' ? 'ativo' : ''}`}
          onClick={() => setNivel('baixo')}
        >
          Baixo
        </button>
      </div>

      <button className="botao-prosseguir" onClick={enviarNivelamento}>
        PROSSEGUIR
      </button>
      <button className="botao-sair" onClick={sair}>
        SAIR
      </button>
    </div>
  );
};

export default NivelamentoDisciplina;