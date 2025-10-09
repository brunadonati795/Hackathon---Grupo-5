const express = require('express');
const router = express.Router();
const MetodoController = require('../controllers/MetodoController');
const { authenticateToken } = require('../middleware/auth');
const { validateMetodosAluno } = require('../middleware/validation');
const { asyncErrorHandler } = require('../middleware/errorHandler');

// Rotas públicas
router.get('/', asyncErrorHandler(MetodoController.listar));
router.get('/:id', asyncErrorHandler(MetodoController.obterPorId));

// Rotas protegidas - Questionário de métodos
router.post('/associar-aluno', authenticateToken, validateMetodosAluno, asyncErrorHandler(MetodoController.associarMetodosAluno));
router.get('/aluno/metodos', authenticateToken, asyncErrorHandler(MetodoController.obterMetodosAluno));
router.delete('/aluno/:id_metodo', authenticateToken, asyncErrorHandler(MetodoController.removerMetodoAluno));
router.get('/aluno/verificar', authenticateToken, asyncErrorHandler(MetodoController.verificarMetodosAluno));

// Estatísticas
router.get('/estatisticas/geral', asyncErrorHandler(MetodoController.getEstatisticas));

// Rotas administrativas (implementar middleware de admin se necessário)
router.post('/', asyncErrorHandler(MetodoController.criar));
router.put('/:id', asyncErrorHandler(MetodoController.atualizar));
router.delete('/:id', asyncErrorHandler(MetodoController.deletar));

module.exports = router;
