const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const compression = require('compression');
const logger = require('../config/logger');

// Rate limiting para autenticação
const authRateLimit = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 60000, // 1 minuto
  max: 5, // máximo 5 tentativas por minuto
  message: {
    success: false,
    message: 'Muitas tentativas de login. Tente novamente em 1 minuto.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    logger.warn('Rate limit excedido para autenticação', {
      ip: req.ip,
      userAgent: req.get('User-Agent')
    });
    res.status(429).json({
      success: false,
      message: 'Muitas tentativas de login. Tente novamente em 1 minuto.'
    });
  }
});

// Rate limiting geral
const generalRateLimit = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 60000, // 1 minuto
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // máximo 100 requests por minuto
  message: {
    success: false,
    message: 'Muitas requisições. Tente novamente em 1 minuto.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    logger.warn('Rate limit excedido', {
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      path: req.path
    });
    res.status(429).json({
      success: false,
      message: 'Muitas requisições. Tente novamente em 1 minuto.'
    });
  }
});

// Configuração do Helmet para segurança
const helmetConfig = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
  },
  crossOriginEmbedderPolicy: false,
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
});

// Middleware de validação de entrada
const validateInput = (req, res, next) => {
  // Sanitizar entrada básica
  const sanitizeString = (str) => {
    if (typeof str !== 'string') return str;
    return str.trim().replace(/[<>]/g, '');
  };

  // Aplicar sanitização em strings do body
  if (req.body) {
    for (const key in req.body) {
      if (typeof req.body[key] === 'string') {
        req.body[key] = sanitizeString(req.body[key]);
      }
    }
  }

  // Aplicar sanitização em strings dos parâmetros
  if (req.params) {
    for (const key in req.params) {
      if (typeof req.params[key] === 'string') {
        req.params[key] = sanitizeString(req.params[key]);
      }
    }
  }

  next();
};

// Middleware de validação de tamanho de payload
const validatePayloadSize = (maxSize = 1024 * 1024) => { // 1MB padrão
  return (req, res, next) => {
    const contentLength = parseInt(req.get('content-length') || '0');
    
    if (contentLength > maxSize) {
      logger.warn('Payload muito grande', {
        contentLength,
        maxSize,
        ip: req.ip
      });
      
      return res.status(413).json({
        success: false,
        message: 'Payload muito grande'
      });
    }
    
    next();
  };
};

// Middleware de logging de segurança
const securityLogger = (req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    
    // Log de tentativas suspeitas
    if (res.statusCode === 401 || res.statusCode === 403) {
      logger.warn('Tentativa de acesso negada', {
        ip: req.ip,
        userAgent: req.get('User-Agent'),
        path: req.path,
        method: req.method,
        statusCode: res.statusCode,
        duration
      });
    }
    
    // Log de erros do servidor
    if (res.statusCode >= 500) {
      logger.error('Erro interno do servidor', {
        ip: req.ip,
        userAgent: req.get('User-Agent'),
        path: req.path,
        method: req.method,
        statusCode: res.statusCode,
        duration
      });
    }
  });
  
  next();
};

// Middleware de CORS personalizado
const corsConfig = (req, res, next) => {
  const allowedOrigins = process.env.ALLOWED_ORIGINS ? 
    process.env.ALLOWED_ORIGINS.split(',') : 
    ['http://localhost:3000', 'http://localhost:3001'];
  
  const origin = req.headers.origin;
  
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  next();
};

// Middleware de sanitização de entrada
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
  authRateLimit,
  generalRateLimit,
  helmetConfig,
  validateInput,
  validatePayloadSize,
  securityLogger,
  corsConfig,
  compression: compression(),
  sanitizeInput
};
