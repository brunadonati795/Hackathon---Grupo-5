const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

router.post('/metodo', quizController.salvarMetodoAluno);
router.post('/nivel', quizController.salvarNivelAluno);

module.exports = router;
