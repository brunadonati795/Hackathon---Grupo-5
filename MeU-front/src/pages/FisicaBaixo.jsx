import '../App.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const FisicaBaixo = () => {
  const navigate = useNavigate();
  const [expandedCards, setExpandedCards] = useState({});
  const [showQuestions, setShowQuestions] = useState({});
  const [answers, setAnswers] = useState({});

  const modules = [
    {
      id: 'conceitos',
      title: 'Conceitos Básicos',
      videoUrl: '#',
      summary: 'Introdução às grandezas físicas, unidades do SI e notação científica. Base para entender a Física.',
      estimatedTime: '1 hora',
      experiment: {
        title: 'Medindo com precisão',
        materials: [
          '1 régua',
          '1 fita métrica',
          '1 cronômetro',
          '1 balança de cozinha'
        ],
        procedure: [
          '1. Meça o comprimento de uma mesa com a régua.',
          '2. Meça o mesmo comprimento com a fita métrica.',
          '3. Compare os resultados.',
          '4. Meça o tempo de queda de uma moeda.'
        ],
        observation: 'Diferentes instrumentos podem dar resultados ligeiramente diferentes.',
        explanation: 'A precisão depende do instrumento usado. Sempre anote a unidade de medida.'
      },
      mindMap: {
        title: 'GRANDEZAS FÍSICAS',
        concepts: [
          { term: 'GRANDEZA', definition: 'Propriedade que pode ser medida.' },
          { term: 'UNIDADE', definition: 'Padrão de medida internacional.' },
          { term: 'NOTAÇÃO CIENTÍFICA', definition: 'Forma de escrever números muito grandes ou pequenos.' }
        ],
        scales: [
          { name: 'COMPRIMENTO', range: 'metro (m)' },
          { name: 'MASSA', range: 'quilograma (kg)' },
          { name: 'TEMPO', range: 'segundo (s)' }
        ],
        conversion: '1 km = 1000 m',
        variation: '1 m = 100 cm'
      },
      questions: [
        {
          id: 1,
          question: 'O que são grandezas físicas?',
          options: [
            'Propriedades que podem ser medidas',
            'Apenas números',
            'Símbolos matemáticos',
            'Unidades de medida'
          ],
          correct: 0
        },
        {
          id: 2,
          question: 'Para que servem as unidades do SI?',
          options: [
            'Para padronizar medidas no mundo todo',
            'Para complicar a Física',
            'Para medir apenas comprimento',
            'Para medir apenas tempo'
          ],
          correct: 0
        }
      ]
    },
    {
      id: 'movimento',
      title: 'Noções de Movimento',
      videoUrl: '#',
      summary: 'Velocidade, aceleração e tipos de movimento. Conceitos fundamentais para começar.',
      estimatedTime: '1.5 horas',
      experiment: {
        title: 'Velocidade com carrinho',
        materials: [
          '1 carrinho de brinquedo',
          '1 cronômetro',
          '1 régua',
          '1 superfície plana'
        ],
        procedure: [
          '1. Coloque o carrinho em uma superfície plana.',
          '2. Marque uma distância de 50 cm.',
          '3. Empurre o carrinho e cronometre o tempo.',
          '4. Calcule a velocidade: v = distância/tempo.'
        ],
        observation: 'O carrinho percorre a distância em um tempo determinado.',
        explanation: 'Velocidade é a distância percorrida dividida pelo tempo gasto.'
      },
      mindMap: {
        title: 'MOVIMENTO',
        concepts: [
          { term: 'VELOCIDADE', definition: 'Rapidez com que algo se move.' },
          { term: 'ACELERAÇÃO', definition: 'Mudança na velocidade.' },
          { term: 'TRAJETÓRIA', definition: 'Caminho percorrido pelo objeto.' }
        ],
        scales: [
          { name: 'VELOCIDADE', range: 'v = s/t' },
          { name: 'ACELERAÇÃO', range: 'a = Δv/t' },
          { name: 'DISTÂNCIA', range: 's = vt' }
        ],
        conversion: 'v = s/t (velocidade)',
        variation: 'a = Δv/t (aceleração)'
      },
      questions: [
        {
          id: 3,
          question: 'Qual a diferença entre velocidade e aceleração?',
          options: [
            'Velocidade é rapidez, aceleração é mudança de velocidade',
            'Não há diferença',
            'Velocidade é aceleração elevada ao quadrado',
            'Aceleração é velocidade dividida por tempo'
          ],
          correct: 0
        },
        {
          id: 4,
          question: 'O que é movimento uniforme?',
          options: [
            'Movimento com velocidade constante',
            'Movimento com aceleração constante',
            'Movimento em linha reta',
            'Movimento circular'
          ],
          correct: 0
        }
      ]
    },
    {
      id: 'forcas',
      title: 'Forças do Dia a Dia',
      videoUrl: '#',
      summary: 'Peso, normal, atrito e outras forças que vemos no cotidiano.',
      estimatedTime: '1 hora',
      experiment: {
        title: 'Força de atrito com livro',
        materials: [
          '1 livro',
          '1 mesa',
          '1 folha de papel',
          '1 balança (opcional)'
        ],
        procedure: [
          '1. Coloque o livro sobre a mesa.',
          '2. Tente empurrar o livro com força suave.',
          '3. Coloque uma folha de papel embaixo do livro.',
          '4. Tente empurrar novamente.'
        ],
        observation: 'O livro desliza mais facilmente sobre o papel.',
        explanation: 'O atrito é menor entre o livro e o papel do que entre o livro e a mesa.'
      },
      mindMap: {
        title: 'FORÇAS',
        concepts: [
          { term: 'PESO', definition: 'Força da gravidade sobre um corpo.' },
          { term: 'FORÇA NORMAL', definition: 'Força perpendicular à superfície.' },
          { term: 'ATRITO', definition: 'Força que se opõe ao movimento.' }
        ],
        scales: [
          { name: 'PESO', range: 'P = mg' },
          { name: 'NORMAL', range: 'N = P (em repouso)' },
          { name: 'ATRITO', range: 'Fat = μN' }
        ],
        conversion: 'P = mg (peso)',
        variation: 'Fat = μN (atrito)'
      },
      questions: [
        {
          id: 5,
          question: 'O que é peso?',
          options: [
            'Força da gravidade sobre um corpo',
            'Massa do objeto',
            'Volume do objeto',
            'Densidade do objeto'
          ],
          correct: 0
        },
        {
          id: 6,
          question: 'O que é força normal?',
          options: [
            'Força perpendicular à superfície de contato',
            'Força paralela à superfície',
            'Força de atrito',
            'Força gravitacional'
          ],
          correct: 0
        }
      ]
    }
  ];

  const toggleCard = (cardId) => {
    setExpandedCards(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  const toggleQuestions = (cardId) => {
    setShowQuestions(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  const handleAnswer = (moduleId, questionId, answerIndex) => {
    setAnswers(prev => ({
      ...prev,
      [`${moduleId}-${questionId}`]: answerIndex
    }));
  };

  const checkAnswer = (moduleId, questionId, userAnswer) => {
    const module = modules.find(m => m.id === moduleId);
    const question = module?.questions.find(q => q.id === questionId);
    return question && userAnswer === question.correct;
  };

  return (
    <div className="fisica-container">
      {/* Header */}
      <div className="fisica-header">
        <button className="back-button" onClick={() => navigate('/disciplinas')}>←</button>
        <h1>Física - Nível Baixo</h1>
        <div className="header-logo">
          <img src={new URL('../assets/image-removebg-preview.png', import.meta.url).href} alt="Marca" className="fisica-logo" />
        </div>
      </div>


      {/* Modules */}
      <div className="modules-container">
        {modules.map((module) => (
          <div key={module.id} className="module-card">
            <div 
              className="module-header clickable"
              onClick={() => toggleCard(module.id)}
            >
              <div className="module-icon">●</div>
              <h3>{module.title}</h3>
            </div>
            
            {/* Expanded Content */}
            {expandedCards[module.id] && (
              <>
                {/* Video Area */}
                <div className="video-container">
                  <div className="video-placeholder">
                    <div className="play-button">▶</div>
                  </div>
                </div>

                {/* Experiment Section */}
                {module.experiment && (
                  <div className="experiment-section">
                    <h4>Experimento</h4>
                    <div className="experiment-card">
                      <h5>{module.experiment.title}</h5>
                      
                      <div className="experiment-materials">
                        <h6>Materiais:</h6>
                        <ul>
                          {module.experiment.materials.map((material, index) => (
                            <li key={index}>{material}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="experiment-procedure">
                        <h6>Procedimento:</h6>
                        <ol>
                          {module.experiment.procedure.map((step, index) => (
                            <li key={index}>{step}</li>
                          ))}
                        </ol>
                      </div>

                      <div className="experiment-observation">
                        <h6>O que acontece:</h6>
                        <p>{module.experiment.observation}</p>
                      </div>

                      <div className="experiment-explanation">
                        <h6>EXPLICAÇÃO:</h6>
                        <p>{module.experiment.explanation}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Mind Map Section */}
                {module.mindMap && (
                  <div className="mindmap-section">
                    <h4>Resumo Visual</h4>
                    <div className="mindmap-card">
                      <h5 className="mindmap-title">{module.mindMap.title}</h5>
                      
                      <div className="mindmap-concepts">
                        <h6>CONCEITO</h6>
                        {module.mindMap.concepts.map((concept, index) => (
                          <div key={index} className="concept-item">
                            <span className="concept-term">{concept.term}:</span>
                            <span className="concept-definition">{concept.definition}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mindmap-scales">
                        <h6>ESCALAS E FÓRMULAS</h6>
                        {module.mindMap.scales.map((scale, index) => (
                          <div key={index} className="scale-item">
                            <span className="scale-name">{scale.name}:</span>
                            <span className="scale-range">{scale.range}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mindmap-conversion">
                        <h6>CONVERSÃO</h6>
                        <p>{module.mindMap.conversion}</p>
                      </div>

                      <div className="mindmap-variation">
                        <h6>VARIAÇÃO</h6>
                        <p>{module.mindMap.variation}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Summary Area */}
                <div className="summary-section">
                  <h4>Resumo da conversa</h4>
                  <div className="text-box green-border">
                    <p>{module.summary}</p>
                  </div>
                </div>

                {/* Questions Area */}
                <div className="questions-section">
                  <h4>Explique aqui</h4>
                  <div className="text-box blue-border">
                    <textarea 
                      placeholder="Escreva suas respostas aqui..."
                      rows="4"
                    ></textarea>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="module-footer">
                  <p>Tempo Estimado: {module.estimatedTime}</p>
                  <button 
                    className="time-question-button"
                    onClick={() => toggleQuestions(module.id)}
                  >
                    Muito tempo?
                  </button>
                </div>

                {/* Questions Content */}
                {showQuestions[module.id] && (
                  <div className="questions-content">
                    <h4>Questões de múltipla escolha:</h4>
                    {module.questions.map((question) => (
                      <div key={question.id} className="question-item">
                        <h5>{question.question}</h5>
                        <div className="options-container">
                          {question.options.map((option, index) => {
                            const userAnswer = answers[`${module.id}-${question.id}`];
                            const isCorrect = checkAnswer(module.id, question.id, index);
                            const isSelected = userAnswer === index;
                            const showResult = userAnswer !== undefined;
                            
                            return (
                              <label 
                                key={index} 
                                className={`option-label ${showResult ? (isCorrect ? 'correct' : (isSelected ? 'incorrect' : '')) : ''}`}
                              >
                                <input
                                  type="radio"
                                  name={`${module.id}-${question.id}`}
                                  value={index}
                                  checked={isSelected}
                                  onChange={() => handleAnswer(module.id, question.id, index)}
                                />
                                <span>{option}</span>
                                {showResult && isCorrect && <span className="result-icon">✓</span>}
                                {showResult && isSelected && !isCorrect && <span className="result-icon">✗</span>}
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FisicaBaixo;


