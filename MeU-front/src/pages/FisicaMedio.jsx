import '../App.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const FisicaMedio = () => {
  const navigate = useNavigate();
  const [expandedCards, setExpandedCards] = useState({});
  const [showQuestions, setShowQuestions] = useState({});
  const [answers, setAnswers] = useState({});

  const modules = [
    {
      id: 'cinematica',
      title: 'Cinemática',
      videoUrl: '#',
      summary: 'Estudo do movimento sem considerar as causas. MRU, MRUV e lançamentos são fundamentais.',
      estimatedTime: '1.5 horas',
      experiment: {
        title: 'Movimento uniforme com carrinho',
        materials: [
          '1 carrinho de brinquedo',
          '1 régua ou fita métrica',
          '1 cronômetro',
          '1 superfície plana'
        ],
        procedure: [
          '1. Coloque o carrinho em uma superfície plana.',
          '2. Marque uma distância de 1 metro.',
          '3. Empurre o carrinho com força constante.',
          '4. Meça o tempo que ele leva para percorrer 1 metro.'
        ],
        observation: 'O carrinho percorre distâncias iguais em tempos iguais, demonstrando movimento uniforme.',
        explanation: 'Quando a velocidade é constante, o objeto percorre distâncias iguais em intervalos de tempo iguais.'
      },
      mindMap: {
        title: 'CINEMÁTICA',
        concepts: [
          { term: 'VELOCIDADE MÉDIA', definition: 'Razão entre deslocamento e tempo total.' },
          { term: 'VELOCIDADE INSTANTÂNEA', definition: 'Velocidade em um momento específico.' },
          { term: 'ACELERAÇÃO', definition: 'Taxa de variação da velocidade.' }
        ],
        scales: [
          { name: 'MRU', range: 'v = Δs/Δt' },
          { name: 'MRUV', range: 'v = v₀ + at' },
          { name: 'LANÇAMENTO', range: 'x = v₀t + ½at²' }
        ],
        conversion: 'v = Δs/Δt (velocidade média)',
        variation: 'a = Δv/Δt (aceleração média)'
      },
      questions: [
        {
          id: 1,
          question: 'Qual a diferença entre velocidade média e instantânea?',
          options: [
            'Velocidade média é em um intervalo, instantânea é em um momento',
            'Não há diferença entre elas',
            'Velocidade instantânea é sempre maior',
            'Velocidade média é sempre maior'
          ],
          correct: 0
        },
        {
          id: 2,
          question: 'O que é aceleração centrípeta?',
          options: [
            'Aceleração que aponta para o centro da trajetória circular',
            'Aceleração que aponta para fora da trajetória',
            'Aceleração tangencial',
            'Aceleração gravitacional'
          ],
          correct: 0
        }
      ]
    },
    {
      id: 'dinamica',
      title: 'Dinâmica',
      videoUrl: '#',
      summary: 'Leis de Newton e suas aplicações. Forças, atrito e equilíbrio.',
      estimatedTime: '2 horas',
      experiment: {
        title: 'Primeira lei de Newton com moeda',
        materials: [
          '1 moeda',
          '1 cartão de papel',
          '1 copo',
          '1 mesa'
        ],
        procedure: [
          '1. Coloque o cartão sobre o copo.',
          '2. Coloque a moeda sobre o cartão.',
          '3. Puxe o cartão rapidamente para o lado.',
          '4. Observe o que acontece com a moeda.'
        ],
        observation: 'A moeda cai dentro do copo, demonstrando a inércia.',
        explanation: 'A moeda tende a permanecer em repouso devido à inércia, enquanto o cartão é puxado.'
      },
      mindMap: {
        title: 'DINÂMICA',
        concepts: [
          { term: 'INÉRCIA', definition: 'Tendência de manter o estado de movimento.' },
          { term: 'FORÇA', definition: 'Agente capaz de alterar o movimento.' },
          { term: 'ATRITO', definition: 'Força que se opõe ao movimento.' }
        ],
        scales: [
          { name: '1ª LEI', range: 'F = 0 → v = constante' },
          { name: '2ª LEI', range: 'F = ma' },
          { name: '3ª LEI', range: 'F₁₂ = -F₂₁' }
        ],
        conversion: 'F = ma (segunda lei de Newton)',
        variation: 'Fat = μN (força de atrito)'
      },
      questions: [
        {
          id: 3,
          question: 'Qual é a primeira lei de Newton?',
          options: [
            'F = ma',
            'Ação e reação',
            'Inércia - corpo em repouso ou MRU permanece assim',
            'Força é proporcional à aceleração'
          ],
          correct: 2
        },
        {
          id: 4,
          question: 'Como calcular a força de atrito?',
          options: [
            'Fat = μ × N',
            'Fat = m × a',
            'Fat = F × d',
            'Fat = v × t'
          ],
          correct: 0
        }
      ]
    },
    {
      id: 'energia',
      title: 'Energia e Trabalho',
      videoUrl: '#',
      summary: 'Conceitos de trabalho, energia cinética e potencial. Conservação de energia.',
      estimatedTime: '1.5 horas',
      experiment: {
        title: 'Energia potencial com bola',
        materials: [
          '1 bola de tênis',
          '1 régua',
          '1 superfície macia'
        ],
        procedure: [
          '1. Segure a bola a 1 metro de altura.',
          '2. Solte a bola e observe.',
          '3. Repita de alturas diferentes.',
          '4. Observe a velocidade de impacto.'
        ],
        observation: 'Quanto maior a altura, maior a velocidade de impacto da bola.',
        explanation: 'A energia potencial gravitacional se transforma em energia cinética durante a queda.'
      },
      mindMap: {
        title: 'ENERGIA E TRABALHO',
        concepts: [
          { term: 'ENERGIA CINÉTICA', definition: 'Energia associada ao movimento.' },
          { term: 'ENERGIA POTENCIAL', definition: 'Energia associada à posição.' },
          { term: 'TRABALHO', definition: 'Transferência de energia por força.' }
        ],
        scales: [
          { name: 'EC', range: 'Ec = ½mv²' },
          { name: 'EP', range: 'Ep = mgh' },
          { name: 'TRABALHO', range: 'W = Fd' }
        ],
        conversion: 'W = Fd (trabalho)',
        variation: 'Ec + Ep = constante (conservação)'
      },
      questions: [
        {
          id: 5,
          question: 'O que é energia cinética?',
          options: [
            'Energia de movimento',
            'Energia de posição',
            'Energia térmica',
            'Energia elétrica'
          ],
          correct: 0
        },
        {
          id: 6,
          question: 'Como calcular trabalho?',
          options: [
            'W = F × d',
            'W = m × v',
            'W = P × t',
            'W = E × t'
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
        <h1>Física - Nível Médio</h1>
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

export default FisicaMedio;


