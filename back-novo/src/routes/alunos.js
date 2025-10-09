const express = require('express');
const router = express.Router();
const AlunoController = require('../controllers/AlunoController');
const { authenticateToken } = require('../middleware/auth');
const { 
  validateAlunoCreate, 
  validateAlunoLogin, 
  validateAlunoUpdate 
} = require('../middleware/validation');
const { asyncErrorHandler } = require('../middleware/errorHandler');

// Rotas públicas
router.post('/cadastrar', validateAlunoCreate, asyncErrorHandler(AlunoController.cadastrar));
router.post('/login', validateAlunoLogin, asyncErrorHandler(AlunoController.login));

// Rotas protegidas
router.get('/perfil', authenticateToken, asyncErrorHandler(AlunoController.getPerfil));
router.put('/perfil', authenticateToken, validateAlunoUpdate, asyncErrorHandler(AlunoController.atualizarPerfil));
router.delete('/conta', authenticateToken, asyncErrorHandler(AlunoController.deletarConta));

// Verificações de perfil
router.get('/verificar-questionario-metodos', authenticateToken, asyncErrorHandler(AlunoController.verificarQuestionarioMetodos));
router.get('/verificar-nivel-disciplina/:id_disciplina', authenticateToken, asyncErrorHandler(AlunoController.verificarNivelDisciplina));

// Estatísticas
router.get('/estatisticas', authenticateToken, asyncErrorHandler(AlunoController.getEstatisticas));

module.exports = router;
