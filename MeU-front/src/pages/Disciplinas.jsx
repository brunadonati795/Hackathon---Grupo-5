import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../App.css';

const disciplinas = [
  { nome: 'Geografia', imagem: 'c1.png' },
  { nome: 'Física', imagem: 'hashtag.png' },
  { nome: 'Português', imagem: 'b3.png' },
  { nome: 'Matemática', imagem: 'hashtag.png' },
  { nome: 'História', imagem: 'hashtag.png' },
  { nome: 'Filosofia', imagem: 'a2.png' },
  { nome: 'Química', imagem: 'b3.png' },
  { nome: 'Biologia', imagem: 'a1.png' },
];

const SelecaoDisciplina = () => {
  const navigate = useNavigate();
  const [selecionada, setSelecionada] = useState(null);

  const irParaQuizNivel = (disciplina) => {
    navigate(`/quiz-nivel/${disciplina.toLowerCase()}`);
  };

  const onCardClick = (nome) => {
    setSelecionada(nome);
  };

  const onCardDoubleClick = (nome) => {
    irParaQuizNivel(nome);
  };

  return (
    <div className="selecao-container">
      <h1>Escolha uma disciplina</h1>
      <div className="grade-cards">
        {disciplinas.map((disciplina, index) => (
          <div
            key={index}
            className={`card-disciplina ${selecionada === disciplina.nome ? 'selecionada' : ''}`}
            onClick={() => onCardClick(disciplina.nome)}
            onDoubleClick={() => onCardDoubleClick(disciplina.nome)}
          >
            <div className="icone-temp" aria-hidden="true">📘</div>
            <p>{disciplina.nome}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelecaoDisciplina;