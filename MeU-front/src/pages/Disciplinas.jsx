import { useNavigate } from 'react-router-dom';
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

  const irParaQuizNivel = (disciplina) => {
    navigate(`/quiz-nivel/${disciplina.toLowerCase()}`);
  };

  return (
    <div className="selecao-container">
      <h1>Escolha uma disciplina</h1>
      <div className="grade-cards">
        {disciplinas.map((disciplina, index) => (
          <div
            key={index}
            className="card-disciplina"
            onClick={() => irParaQuizNivel(disciplina.nome)}
          >
            <img
              src={`/imagens/${disciplina.imagem}`}
              alt={`Ícone ${disciplina.nome}`}
              className="icone-disciplina"
            />
            <p>{disciplina.nome}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelecaoDisciplina;