import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../App.css';

// imagens das disciplinas
import imgGeo from '../assets/geo.png';
import imgFisica from '../assets/fisica.png';
import imgPortugues from '../assets/portugues.png';
import imgMatematica from '../assets/mate.png';
import imgHistoria from '../assets/hist.png';
import imgFilosofia from '../assets/filo.png';
import imgQuimica from '../assets/quimic.png';
import imgBiologia from '../assets/bio.png';

const disciplinas = [
  { nome: 'Geografia' },
  { nome: 'Física' },
  { nome: 'Português' },
  { nome: 'Matemática' },
  { nome: 'História' },
  { nome: 'Filosofia' },
  { nome: 'Química' },
  { nome: 'Biologia' },
];

const imagensPorDisciplina = {
  Geografia: imgGeo,
  'Física': imgFisica,
  'Português': imgPortugues,
  'Matemática': imgMatematica,
  'História': imgHistoria,
  'Filosofia': imgFilosofia,
  'Química': imgQuimica,
  'Biologia': imgBiologia,
};

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
            <div className="icone-temp" aria-hidden="true">
              <img src={imagensPorDisciplina[disciplina.nome]} alt={disciplina.nome} />
            </div>
            <p>{disciplina.nome}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelecaoDisciplina;