const express = require('express');
const router = express.Router();
const alunoController = require('../controllers/alunoController');

router.post('/', alunoController.criarAluno);
router.get('/', alunoController.listarAlunos);

module.exports = router;
