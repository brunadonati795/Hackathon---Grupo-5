import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './NivelamentoDisciplina.css';

const NivelamentoDisciplina = () => {
  const { disciplina } = useParams();
  const navigate = useNavigate();
  const [nivel, setNivel] = useState('');

  const enviarNivelamento = async () => {
    if (!nivel) return alert('Selecione um nível antes de prosseguir.');

    const normalizar = (texto) =>
      (texto || '')
        .normalize('NFD')
        .replace(/\p{Diacritic}+/gu, '')
        .toLowerCase();

    const navegarPorNivel = () => {
      const disc = normalizar(disciplina);
      if (disc === 'fisica') {
        // Mapear níveis A/B/C para alto/médio/baixo
        if (nivel === 'a') return navigate('/fisica/alto');
        if (nivel === 'b') return navigate('/fisica/medio');
        if (nivel === 'c') return navigate('/fisica/baixo');
      }
      return navigate('/disciplinas');
    };

    try {
      await fetch('http://localhost:3000/api/quiz-nivel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          disciplina: disciplina,
          nivelConhecimento: nivel,
        }),
      });
    } catch (error) {
      console.error('Erro ao enviar nível:', error);
    } finally {
      // Garante a navegação mesmo se o backend estiver offline
      navegarPorNivel();
    }
  };

  const sair = () => {
    navigate('/disciplinas');
  };

  return (
    <div className="nivelamento-container">
      {/* botão voltar removido */}
      <h1>{disciplina.toUpperCase()}</h1>
      <p>Qual é o seu nível de conhecimento nessa disciplina?</p>

      <div className="botoes-nivel">
        <button
          className={`botao-nivel ${nivel === 'a' ? 'ativo' : ''}`}
          onClick={() => setNivel('a')}
        >
          Nível A
        </button>
        <button
          className={`botao-nivel ${nivel === 'b' ? 'ativo' : ''}`}
          onClick={() => setNivel('b')}
        >
          Nível B
        </button>
        <button
          className={`botao-nivel ${nivel === 'c' ? 'ativo' : ''}`}
          onClick={() => setNivel('c')}
        >
          Nível C
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