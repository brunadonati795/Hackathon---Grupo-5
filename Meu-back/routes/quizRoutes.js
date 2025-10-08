const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

router.post('/metodo', quizController.quizMetodo);
router.post('/nivel', quizController.quizNivel);

module.exports = router;
