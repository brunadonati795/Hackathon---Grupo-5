const express = require('express');
const router = express.Router();
const RespostaTextoController = require('../controllers/RespostaTextoController');
const { authenticateToken } = require('../middleware/auth');
const { asyncErrorHandler } = require('../middleware/errorHandler');

// Todas as rotas precisam de autenticação
router.use(authenticateToken);

// Rotas para respostas de texto
router.post('/criar', asyncErrorHandler(RespostaTextoController.criar));
router.get('/disciplina/:id_disciplina', asyncErrorHandler(RespostaTextoController.buscarPorDisciplina));
router.get('/todas', asyncErrorHandler(RespostaTextoController.buscarTodas));
router.put('/:id_resposta', asyncErrorHandler(RespostaTextoController.atualizar));
router.delete('/:id_resposta', asyncErrorHandler(RespostaTextoController.deletar));

module.exports = router;
