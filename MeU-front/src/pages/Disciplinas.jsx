import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
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
  const [userPreferences, setUserPreferences] = useState(null);

  useEffect(() => {
    // Carregar preferências do usuário do localStorage
    const preferences = localStorage.getItem('userPreferences');
    if (preferences) {
      setUserPreferences(JSON.parse(preferences));
    }
  }, []);

  const irParaQuizNivel = (disciplina) => {
    navigate(`/quiz-nivel/${disciplina.toLowerCase()}`);
  };

  const onCardClick = (nome) => {
    setSelecionada(nome);
  };

  const onCardDoubleClick = (nome) => {
    irParaQuizNivel(nome);
  };

  const getMetodologiaText = (metodologias) => {
    const map = {
      'audio-visual': 'Vídeo aulas',
      'visual': 'Conteúdo visual',
      'escrita-leitura': 'Textos e resumos',
      'questoes': 'Questões',
      'explicando': 'Explicações',
      'pratica': 'Experimentos práticos'
    };
    return metodologias.map(m => map[m] || m).join(', ');
  };

  return (
    <div className="selecao-container">
      <h1>Escolha uma disciplina</h1>
      
      {/* Mostrar preferências do usuário */}
      {userPreferences && (
        <div className="user-preferences-info" style={{
          backgroundColor: '#f0f8ff',
          padding: '15px',
          borderRadius: '8px',
          marginBottom: '20px',
          border: '1px solid #e0e0e0'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>Suas preferências de estudo:</h3>
          <p style={{ margin: '0', color: '#666' }}>
            <strong>Metodologias:</strong> {getMetodologiaText(userPreferences.metodologias)}
          </p>
          <p style={{ margin: '5px 0 0 0', color: '#666' }}>
            <strong>Hábito de estudo:</strong> {userPreferences.habitoEstudo === 'sim' ? 'Sim' : 'Não'}
            {userPreferences.tempoEstudo && ` (${userPreferences.tempoEstudo}h por dia)`}
          </p>
        </div>
      )}
      
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