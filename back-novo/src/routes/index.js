const express = require('express');
const router = express.Router();

// Importar todas as rotas
const alunosRoutes = require('./alunos');
const metodosRoutes = require('./metodos');
const disciplinasRoutes = require('./disciplinas');
const materiaisRoutes = require('./materiais');
const questoesRoutes = require('./questoes');
const respostasRoutes = require('./respostas');

// Configurar rotas
router.use('/alunos', alunosRoutes);
router.use('/metodos', metodosRoutes);
router.use('/disciplinas', disciplinasRoutes);
router.use('/materiais', materiaisRoutes);
router.use('/questoes', questoesRoutes);
router.use('/respostas', respostasRoutes);

// Rota de health check
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API funcionando corretamente',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Rota de informações da API
router.get('/info', (req, res) => {
  res.json({
    success: true,
    data: {
      name: 'Educandos API',
      version: '1.0.0',
      description: 'API para sistema educacional adaptativo',
      endpoints: {
        alunos: '/api/alunos',
        metodos: '/api/metodos',
        disciplinas: '/api/disciplinas',
        materiais: '/api/materiais',
        questoes: '/api/questoes'
      },
      documentation: '/api/docs'
    }
  });
});

module.exports = router;
