const logger = require('../config/logger');

// Middleware de tratamento de erros global
const errorHandler = (err, req, res, next) => {
  logger.error('Erro capturado pelo middleware global:', {
    error: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });

  // Erro de validação do banco de dados
  if (err.code === '23505') { // Unique violation
    return res.status(409).json({
      success: false,
      message: 'Dados duplicados. Verifique se o registro já existe.'
    });
  }

  if (err.code === '23503') { // Foreign key violation
    return res.status(400).json({
      success: false,
      message: 'Referência inválida. Verifique se os IDs fornecidos existem.'
    });
  }

  if (err.code === '23502') { // Not null violation
    return res.status(400).json({
      success: false,
      message: 'Campos obrigatórios não fornecidos.'
    });
  }

  if (err.code === '23514') { // Check constraint violation
    return res.status(400).json({
      success: false,
      message: 'Valor inválido para um dos campos.'
    });
  }

  // Erro de conexão com banco de dados
  if (err.code === 'ECONNREFUSED' || err.code === 'ENOTFOUND') {
    return res.status(503).json({
      success: false,
      message: 'Serviço temporariamente indisponível. Tente novamente em alguns minutos.'
    });
  }

  // Erro de timeout
  if (err.code === 'ETIMEDOUT') {
    return res.status(504).json({
      success: false,
      message: 'Timeout na operação. Tente novamente.'
    });
  }

  // Erro de JWT
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'Token inválido'
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      message: 'Token expirado'
    });
  }

  // Erro de validação
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Dados inválidos',
      errors: err.errors
    });
  }

  // Erro de sintaxe JSON
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({
      success: false,
      message: 'JSON inválido'
    });
  }

  // Erro de tamanho de payload
  if (err.type === 'entity.too.large') {
    return res.status(413).json({
      success: false,
      message: 'Payload muito grande'
    });
  }

  // Erro de arquivo não encontrado
  if (err.code === 'ENOENT') {
    return res.status(404).json({
      success: false,
      message: 'Arquivo não encontrado'
    });
  }

  // Erro de permissão
  if (err.code === 'EACCES') {
    return res.status(403).json({
      success: false,
      message: 'Permissão negada'
    });
  }

  // Erro de memória
  if (err.code === 'ENOMEM') {
    return res.status(507).json({
      success: false,
      message: 'Memória insuficiente'
    });
  }

  // Erro padrão do servidor
  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || 'Erro interno do servidor';

  res.status(statusCode).json({
    success: false,
    message: process.env.NODE_ENV === 'production' 
      ? 'Erro interno do servidor' 
      : message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
};

// Middleware para capturar rotas não encontradas
const notFoundHandler = (req, res) => {
  logger.warn('Rota não encontrada', {
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });

  res.status(404).json({
    success: false,
    message: 'Rota não encontrada',
    path: req.url,
    method: req.method
  });
};

// Middleware para capturar erros assíncronos
const asyncErrorHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// Middleware para validar parâmetros de URL
const validateUrlParams = (req, res, next) => {
  const { id, id_aluno, id_disciplina, id_metodo } = req.params;
  
  // Validar IDs numéricos
  const numericParams = { id, id_aluno, id_disciplina, id_metodo };
  
  for (const [key, value] of Object.entries(numericParams)) {
    if (value && (!Number.isInteger(parseInt(value)) || parseInt(value) <= 0)) {
      return res.status(400).json({
        success: false,
        message: `${key} deve ser um número inteiro positivo`
      });
    }
  }
  
  next();
};

// Middleware para sanitizar entrada
const sanitizeInput = (req, res, next) => {
  const sanitizeString = (str) => {
    if (typeof str !== 'string') return str;
    return str.trim().replace(/[<>]/g, '');
  };

  // Sanitizar body
  if (req.body) {
    for (const key in req.body) {
      if (typeof req.body[key] === 'string') {
        req.body[key] = sanitizeString(req.body[key]);
      }
    }
  }

  // Sanitizar query parameters
  if (req.query) {
    for (const key in req.query) {
      if (typeof req.query[key] === 'string') {
        req.query[key] = sanitizeString(req.query[key]);
      }
    }
  }

  next();
};

module.exports = {
  errorHandler,
  notFoundHandler,
  asyncErrorHandler,
  validateUrlParams,
  sanitizeInput
};
