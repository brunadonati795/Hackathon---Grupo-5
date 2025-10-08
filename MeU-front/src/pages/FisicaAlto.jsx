import '../App.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const FisicaAlto = () => {
  const navigate = useNavigate();
  const [expandedCards, setExpandedCards] = useState({});
  const [showQuestions, setShowQuestions] = useState({});
  const [answers, setAnswers] = useState({});

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const modules = [
    {
      id: 'termologia',
      title: 'Termologia',
      videoUrl: '#',
      summary: 'Estudo do calor e temperatura. Termometria, dilatação térmica e calorimetria são fundamentais.',
      estimatedTime: '1 hora',
      experiment: {
        title: 'Dilatação térmica com uma tampa e um pote',
        materials: [
          '1 pote de vidro com tampa metálica (tipo de geleia)',
          'Água quente',
          'Água fria'
        ],
        procedure: [
          '1. Feche bem o pote.',
          '2. Tente abrir a tampa — se estiver difícil, mergulhe só a tampa em água quente por alguns segundos.',
          '3. Tente abrir novamente.'
        ],
        observation: 'A tampa metálica se dilata com o calor, ficando ligeiramente maior que o vidro. Isso facilita a abertura.',
        explanation: 'A tampa metálica se dilata com o calor, ficando ligeiramente maior que o vidro. Isso facilita a abertura.'
      },
      mindMap: {
        title: 'TERMOMETRIA',
        concepts: [
          { term: 'TEMPERATURA', definition: 'Grau de agitação de uma molécula.' },
          { term: 'CALOR', definition: 'Fluxo espontâneo de energia devido à diferença de temperatura entre os corpos.' },
          { term: 'FLUXO DE CALOR', definition: 'Da região de maior temperatura para a região de menor temperatura.' }
        ],
        scales: [
          { name: 'CELSIUS', range: '0°C a 100°C' },
          { name: 'FAHRENHEIT', range: '32°F a 212°F' },
          { name: 'KELVIN', range: '273K a 373K' }
        ],
        conversion: 'C / 5 = (F - 32) / 9 = (K - 273) / 5',
        variation: 'ΔC / 5 = ΔF / 9 = ΔK / 5'
      },
      questions: [
        {
          id: 1,
          question: 'Qual é a diferença entre calor e temperatura?',
          options: [
            'Calor é energia, temperatura é medida de agitação molecular',
            'Calor é temperatura elevada, temperatura é calor baixo',
            'Não há diferença entre calor e temperatura',
            'Calor é uma grandeza vetorial, temperatura é escalar'
          ],
          correct: 0
        },
        {
          id: 2,
          question: 'Como funciona a dilatação térmica?',
          options: [
            'Materiais contraem quando aquecidos',
            'Materiais dilatam quando aquecidos',
            'Materiais não sofrem alteração com temperatura',
            'Apenas metais dilatam com temperatura'
          ],
          correct: 1
        }
      ]
    },
    {
      id: 'optica',
      title: 'Óptica',
      videoUrl: '#',
      summary: 'Estudo da luz e seus fenômenos. Reflexão, refração e difração são conceitos fundamentais.',
      estimatedTime: '1.5 horas',
      experiment: {
        title: 'Refração da luz com lápis na água',
        materials: [
          '1 copo transparente',
          'Água',
          '1 lápis',
          'Lanterna (opcional)'
        ],
        procedure: [
          '1. Encha o copo com água até a metade.',
          '2. Coloque o lápis dentro do copo, inclinado.',
          '3. Observe o lápis de diferentes ângulos.',
          '4. Use a lanterna para iluminar o lápis.'
        ],
        observation: 'O lápis parece "quebrado" na superfície da água devido à refração da luz.',
        explanation: 'A luz muda de velocidade ao passar do ar para a água, causando a refração e fazendo o lápis parecer quebrado.'
      },
      mindMap: {
        title: 'ÓPTICA GEOMÉTRICA',
        concepts: [
          { term: 'REFLEXÃO', definition: 'Luz volta na mesma direção que chegou.' },
          { term: 'REFRACTION', definition: 'Luz muda de direção ao mudar de meio.' },
          { term: 'DIFRAÇÃO', definition: 'Luz se espalha ao passar por fendas pequenas.' }
        ],
        scales: [
          { name: 'ÍNDICE DE REFRAÇÃO', range: 'n = c/v' },
          { name: 'LEI DE SNELL', range: 'n₁senθ₁ = n₂senθ₂' },
          { name: 'LEI DA REFLEXÃO', range: 'θᵢ = θᵣ' }
        ],
        conversion: 'n = c/v (índice de refração)',
        variation: 'θᵢ = θᵣ (ângulo de incidência = ângulo de reflexão)'
      },
      questions: [
        {
          id: 1,
          question: 'Como funciona a reflexão da luz?',
          options: [
            'Luz é absorvida pela superfície',
            'Luz volta na mesma direção que chegou',
            'Luz é refratada pela superfície',
            'Luz é difratada pela superfície'
          ],
          correct: 1
        },
        {
          id: 2,
          question: 'O que é difração da luz?',
          options: [
            'Luz passa por fendas e se espalha',
            'Luz é refletida em superfícies',
            'Luz é absorvida por materiais',
            'Luz é refratada em lentes'
          ],
          correct: 0
        }
      ]
    },
    {
      id: 'eletromagnetismo',
      title: 'Eletromagnetismo',
      videoUrl: '#',
      summary: 'Estudo da relação entre eletricidade e magnetismo. Lei de Faraday-Lenz e força de Lorentz.',
      estimatedTime: '2 horas',
      experiment: {
        title: 'Gerador elétrico simples com ímã',
        materials: [
          '1 ímã de neodímio',
          '1 bobina de fio de cobre',
          '1 LED',
          'Fita isolante'
        ],
        procedure: [
          '1. Conecte as extremidades da bobina ao LED.',
          '2. Mova o ímã rapidamente dentro da bobina.',
          '3. Observe o LED piscar.',
          '4. Experimente diferentes velocidades de movimento.'
        ],
        observation: 'O LED acende quando o ímã se move dentro da bobina, demonstrando a indução eletromagnética.',
        explanation: 'O movimento do ímã cria um campo magnético variável que induz corrente elétrica na bobina, acendendo o LED.'
      },
      mindMap: {
        title: 'ELETROMAGNETISMO',
        concepts: [
          { term: 'CAMPO MAGNÉTICO', definition: 'Região onde forças magnéticas atuam.' },
          { term: 'INDUÇÃO ELETROMAGNÉTICA', definition: 'Campo magnético variável gera corrente elétrica.' },
          { term: 'FORÇA DE LORENTZ', definition: 'Força em partícula carregada em campo magnético.' }
        ],
        scales: [
          { name: 'LEI DE FARADAY', range: 'ε = -dΦ/dt' },
          { name: 'FORÇA DE LORENTZ', range: 'F = q(v × B)' },
          { name: 'LEI DE AMPÈRE', range: '∇ × B = μ₀J' }
        ],
        conversion: 'ε = -dΦ/dt (força eletromotriz induzida)',
        variation: 'F = q(v × B) (força de Lorentz)'
      },
      questions: [
        {
          id: 1,
          question: 'O que diz a lei de Faraday-Lenz?',
          options: [
            'Corrente elétrica gera campo magnético',
            'Campo magnético variável gera corrente elétrica',
            'Cargas elétricas se atraem',
            'Magnetos têm dois polos'
          ],
          correct: 1
        },
        {
          id: 2,
          question: 'O que é a força de Lorentz?',
          options: [
            'Força entre cargas elétricas',
            'Força em partícula carregada em campo magnético',
            'Força gravitacional',
            'Força de atrito'
          ],
          correct: 1
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
        <h1>Física - Nível Alto</h1>
        <div className="header-logo">
          <img src={new URL('../assets/image-removebg-preview.png', import.meta.url).href} alt="Marca" className="fisica-logo" />
        </div>
        <button className="logout-button" onClick={handleLogout}>Sair</button>
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

export default FisicaAlto;


