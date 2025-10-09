const express = require('express');
const router = express.Router();
const DisciplinaController = require('../controllers/DisciplinaController');
const { authenticateToken } = require('../middleware/auth');
const { 
  validateDisciplinaCreate, 
  validateNivelConhecimento,
  validateIdDisciplinaParam 
} = require('../middleware/validation');
const { asyncErrorHandler } = require('../middleware/errorHandler');

// Rotas públicas
router.get('/', asyncErrorHandler(DisciplinaController.listar));
router.get('/:id', validateIdDisciplinaParam, asyncErrorHandler(DisciplinaController.obterPorId));

// Rotas protegidas - Nível de conhecimento
router.post('/:id_disciplina/nivel-aluno', 
  authenticateToken, 
  validateIdDisciplinaParam, 
  validateNivelConhecimento, 
  asyncErrorHandler(DisciplinaController.definirNivelAluno)
);

router.get('/aluno/disciplinas', authenticateToken, asyncErrorHandler(DisciplinaController.obterDisciplinasAluno));
router.get('/:id_disciplina/nivel-aluno', authenticateToken, validateIdDisciplinaParam, asyncErrorHandler(DisciplinaController.obterNivelAlunoDisciplina));
router.put('/:id_disciplina/nivel-aluno', 
  authenticateToken, 
  validateIdDisciplinaParam, 
  validateNivelConhecimento, 
  asyncErrorHandler(DisciplinaController.atualizarNivelAluno)
);

// Materiais
router.get('/:id/materiais', validateIdDisciplinaParam, asyncErrorHandler(DisciplinaController.obterMateriais));
router.get('/:id/materiais-recomendados', authenticateToken, validateIdDisciplinaParam, asyncErrorHandler(DisciplinaController.obterMateriaisRecomendados));

// Verificações
router.get('/:id/verificar-nivel-aluno', authenticateToken, validateIdDisciplinaParam, asyncErrorHandler(DisciplinaController.verificarNivelAluno));

// Estatísticas
router.get('/:id/estatisticas', validateIdDisciplinaParam, asyncErrorHandler(DisciplinaController.getEstatisticas));

// Rotas administrativas
router.post('/', validateDisciplinaCreate, asyncErrorHandler(DisciplinaController.criar));
router.put('/:id', validateIdDisciplinaParam, asyncErrorHandler(DisciplinaController.atualizar));
router.delete('/:id', validateIdDisciplinaParam, asyncErrorHandler(DisciplinaController.deletar));

module.exports = router;
