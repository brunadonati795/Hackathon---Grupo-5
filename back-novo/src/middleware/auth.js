const jwt = require('jsonwebtoken');
const Aluno = require('../models/Aluno');
const logger = require('../config/logger');

// Middleware de autenticação
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token de acesso necessário'
      });
    }

    // Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Buscar aluno no banco
    const aluno = await Aluno.findById(decoded.id_aluno);
    if (!aluno) {
      return res.status(401).json({
        success: false,
        message: 'Usuário não encontrado'
      });
    }

    // Adicionar dados do aluno ao request
    req.user = {
      id_aluno: aluno.id_aluno,
      email: aluno.email,
      nome_aluno: aluno.nome_aluno
    };

    next();
  } catch (error) {
    logger.error('Erro na autenticação:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Token inválido'
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expirado'
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};

// Middleware opcional de autenticação (não falha se não houver token)
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const aluno = await Aluno.findById(decoded.id_aluno);
      
      if (aluno) {
        req.user = {
          id_aluno: aluno.id_aluno,
          email: aluno.email,
          nome_aluno: aluno.nome_aluno
        };
      }
    }

    next();
  } catch (error) {
    // Se houver erro no token, continua sem autenticação
    next();
  }
};

// Gerar token JWT
const generateToken = (aluno) => {
  return jwt.sign(
    { 
      id_aluno: aluno.id_aluno,
      email: aluno.email 
    },
    process.env.JWT_SECRET,
    { 
      expiresIn: process.env.JWT_EXPIRES_IN || '30m' 
    }
  );
};

// Verificar se aluno tem permissão para acessar recurso
const checkOwnership = (req, res, next) => {
  const resourceUserId = req.params.id_aluno || req.body.id_aluno;
  
  if (req.user.id_aluno !== parseInt(resourceUserId)) {
    return res.status(403).json({
      success: false,
      message: 'Acesso negado: você só pode acessar seus próprios dados'
    });
  }
  
  next();
};

module.exports = {
  authenticateToken,
  optionalAuth,
  generateToken,
  checkOwnership
};
