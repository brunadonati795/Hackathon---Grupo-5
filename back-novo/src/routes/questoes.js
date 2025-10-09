const express = require('express');
const router = express.Router();
const QuestaoController = require('../controllers/QuestaoController');
const { authenticateToken, optionalAuth } = require('../middleware/auth');
const { 
  validateQuestaoCreate, 
  validateIdParam,
  validatePagination,
  validateFilters 
} = require('../middleware/validation');
const { asyncErrorHandler } = require('../middleware/errorHandler');

// Rotas públicas
router.get('/', validatePagination, validateFilters, asyncErrorHandler(QuestaoController.listar));
router.get('/:id', validateIdParam, asyncErrorHandler(QuestaoController.obterPorId));

// Rotas com autenticação opcional
router.get('/disciplina/:id_disciplina', validateIdParam, optionalAuth, asyncErrorHandler(QuestaoController.obterPorDisciplina));
router.get('/dificuldade/:dificuldade', optionalAuth, asyncErrorHandler(QuestaoController.obterPorDificuldade));
router.get('/disciplina/:id_disciplina/dificuldade/:dificuldade', 
  validateIdParam, 
  optionalAuth, 
  asyncErrorHandler(QuestaoController.obterPorDisciplinaEDificuldade)
);

// Quiz e questões aleatórias
router.get('/quiz/gerar', validatePagination, validateFilters, asyncErrorHandler(QuestaoController.gerarQuiz));
router.get('/disciplina/:id_disciplina/dificuldade/:dificuldade/aleatoria', 
  validateIdParam, 
  optionalAuth, 
  asyncErrorHandler(QuestaoController.obterQuestaoAleatoria)
);

// Verificação de resposta
router.post('/:id/verificar-resposta', 
  authenticateToken, 
  validateIdParam, 
  asyncErrorHandler(QuestaoController.verificarResposta)
);

// Estatísticas
router.get('/estatisticas/geral', asyncErrorHandler(QuestaoController.getEstatisticas));
router.get('/disciplina/:id_disciplina/estatisticas', 
  validateIdParam, 
  asyncErrorHandler(QuestaoController.getEstatisticas)
);

// Rotas administrativas
router.post('/', 
  authenticateToken, 
  validateQuestaoCreate, 
  asyncErrorHandler(QuestaoController.criar)
);

router.put('/:id', 
  authenticateToken, 
  validateIdParam, 
  asyncErrorHandler(QuestaoController.atualizar)
);

router.delete('/:id', 
  authenticateToken, 
  validateIdParam, 
  asyncErrorHandler(QuestaoController.deletar)
);

module.exports = router;
