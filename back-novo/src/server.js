require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');

// Importar middlewares
const { 
  helmetConfig, 
  generalRateLimit, 
  authRateLimit,
  corsConfig,
  compression,
  securityLogger,
  validateInput,
  sanitizeInput
} = require('./middleware/security');

const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');

// Importar rotas
const routes = require('./routes');

// Importar logger
const logger = require('./config/logger');

const app = express();
const PORT = process.env.PORT || 3000;

// Criar diretório de uploads se não existir
const uploadsDir = process.env.UPLOAD_PATH || 'uploads';
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Criar diretório de logs se não existir
const logsDir = 'logs';
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Middlewares de segurança
app.use(helmetConfig);
app.use(compression);
app.use(corsConfig);
app.use(securityLogger);

// Rate limiting
app.use('/api/alunos/login', authRateLimit);
app.use('/api/alunos/cadastrar', authRateLimit);
app.use(generalRateLimit);

// Middlewares de parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Middlewares de validação e sanitização
app.use(validateInput);
app.use(sanitizeInput);

// Logging de requisições
app.use(morgan('combined', {
  stream: {
    write: (message) => logger.info(message.trim())
  }
}));

// Servir arquivos estáticos (uploads)
app.use('/uploads', express.static(uploadsDir));

// Rotas da API
app.use('/api', routes);

// Rota raiz
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Bem-vindo à API Educandos',
    version: '1.0.0',
    documentation: '/api/info',
    health: '/api/health'
  });
});

// Middleware de tratamento de erros
app.use(notFoundHandler);
app.use(errorHandler);

// Iniciar servidor
app.listen(PORT, () => {
  logger.info(`Servidor rodando na porta ${PORT}`);
  logger.info(`Ambiente: ${process.env.NODE_ENV || 'development'}`);
  logger.info(`Health check: http://localhost:${PORT}/api/health`);
  logger.info(`Documentação: http://localhost:${PORT}/api/info`);
});

// Tratamento de sinais do sistema
process.on('SIGTERM', () => {
  logger.info('SIGTERM recebido, encerrando servidor graciosamente');
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('SIGINT recebido, encerrando servidor graciosamente');
  process.exit(0);
});

// Tratamento de erros não capturados
process.on('uncaughtException', (err) => {
  logger.error('Erro não capturado:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Promise rejeitada não tratada:', { reason, promise });
  process.exit(1);
});

module.exports = app;
