const { body, param, query, validationResult } = require('express-validator');
const logger = require('../config/logger');

// Middleware para verificar erros de validação
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    logger.warn('Erro de validação', {
      errors: errors.array(),
      ip: req.ip,
      path: req.path
    });
    
    return res.status(400).json({
      success: false,
      message: 'Dados inválidos',
      errors: errors.array().map(error => ({
        field: error.path,
        message: error.msg,
        value: error.value
      }))
    });
  }
  
  next();
};

// Validações para Aluno
const validateAlunoCreate = [
  body('email')
    .isEmail()
    .withMessage('Email deve ter formato válido')
    .normalizeEmail()
    .isLength({ max: 100 })
    .withMessage('Email deve ter no máximo 100 caracteres'),
  
  body('senha')
    .isLength({ min: 6 })
    .withMessage('Senha deve ter pelo menos 6 caracteres')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Senha deve conter pelo menos uma letra minúscula, uma maiúscula e um número'),
  
  body('nome_aluno')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Nome deve ter entre 2 e 100 caracteres')
    .matches(/^[a-zA-ZÀ-ÿ\s]+$/)
    .withMessage('Nome deve conter apenas letras e espaços'),
  
  handleValidationErrors
];

const validateAlunoLogin = [
  body('email')
    .isEmail()
    .withMessage('Email deve ter formato válido')
    .normalizeEmail(),
  
  body('senha')
    .notEmpty()
    .withMessage('Senha é obrigatória'),
  
  handleValidationErrors
];

const validateAlunoUpdate = [
  body('nome_aluno')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Nome deve ter entre 2 e 100 caracteres')
    .matches(/^[a-zA-ZÀ-ÿ\s]+$/)
    .withMessage('Nome deve conter apenas letras e espaços'),
  
  body('senha')
    .optional()
    .isLength({ min: 6 })
    .withMessage('Senha deve ter pelo menos 6 caracteres')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Senha deve conter pelo menos uma letra minúscula, uma maiúscula e um número'),
  
  handleValidationErrors
];

// Validações para Métodos de Aprendizagem
const validateMetodosAluno = [
  body('metodos_ids')
    .isArray({ min: 1 })
    .withMessage('Deve selecionar pelo menos um método de aprendizagem')
    .custom((value) => {
      if (!value.every(id => Number.isInteger(id) && id > 0)) {
        throw new Error('IDs dos métodos devem ser números inteiros positivos');
      }
      return true;
    }),
  
  handleValidationErrors
];

// Validações para Disciplina
const validateDisciplinaCreate = [
  body('nome_disciplina')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Nome da disciplina deve ter entre 2 e 100 caracteres')
    .matches(/^[a-zA-ZÀ-ÿ\s]+$/)
    .withMessage('Nome da disciplina deve conter apenas letras e espaços'),
  
  handleValidationErrors
];

const validateNivelConhecimento = [
  body('conhecimento_aluno')
    .isIn(['Alto', 'Médio', 'Baixo'])
    .withMessage('Nível de conhecimento deve ser Alto, Médio ou Baixo'),
  
  handleValidationErrors
];

// Validações para Material
const validateMaterialCreate = [
  body('nome_material')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Nome do material deve ter entre 2 e 100 caracteres'),
  
  body('nivel_conhecimento')
    .isIn(['Alto', 'Médio', 'Baixo'])
    .withMessage('Nível de conhecimento deve ser Alto, Médio ou Baixo'),
  
  body('id_metodo')
    .isInt({ min: 1 })
    .withMessage('ID do método deve ser um número inteiro positivo'),
  
  body('id_disciplina')
    .isInt({ min: 1 })
    .withMessage('ID da disciplina deve ser um número inteiro positivo'),
  
  body('conteudo_texto')
    .optional()
    .isLength({ max: 10000 })
    .withMessage('Conteúdo de texto deve ter no máximo 10000 caracteres'),
  
  body('tipo_midia')
    .optional()
    .isIn(['imagem', 'video', 'audio', 'pdf', 'documento'])
    .withMessage('Tipo de mídia deve ser: imagem, video, audio, pdf ou documento'),
  
  handleValidationErrors
];

// Validações para Questão
const validateQuestaoCreate = [
  body('id_disciplina')
    .isInt({ min: 1 })
    .withMessage('ID da disciplina deve ser um número inteiro positivo'),
  
  body('dificuldade')
    .isIn(['Fácil', 'Médio', 'Difícil'])
    .withMessage('Dificuldade deve ser Fácil, Médio ou Difícil'),
  
  body('pergunta')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Pergunta deve ter entre 10 e 1000 caracteres'),
  
  body('alternativa_a')
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage('Alternativa A deve ter entre 1 e 500 caracteres'),
  
  body('alternativa_b')
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage('Alternativa B deve ter entre 1 e 500 caracteres'),
  
  body('alternativa_c')
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage('Alternativa C deve ter entre 1 e 500 caracteres'),
  
  body('alternativa_d')
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage('Alternativa D deve ter entre 1 e 500 caracteres'),
  
  body('gabarito')
    .isIn(['A', 'B', 'C', 'D'])
    .withMessage('Gabarito deve ser A, B, C ou D'),
  
  handleValidationErrors
];

// Validações de parâmetros
const validateIdParam = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('ID deve ser um número inteiro positivo'),
  
  handleValidationErrors
];

const validateIdAlunoParam = [
  param('id_aluno')
    .isInt({ min: 1 })
    .withMessage('ID do aluno deve ser um número inteiro positivo'),
  
  handleValidationErrors
];

const validateIdDisciplinaParam = [
  param('id_disciplina')
    .isInt({ min: 1 })
    .withMessage('ID da disciplina deve ser um número inteiro positivo'),
  
  handleValidationErrors
];

// Validações de query parameters
const validatePagination = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Página deve ser um número inteiro positivo'),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limite deve ser um número entre 1 e 100'),
  
  handleValidationErrors
];

const validateFilters = [
  query('nivel_conhecimento')
    .optional()
    .isIn(['Alto', 'Médio', 'Baixo'])
    .withMessage('Nível de conhecimento deve ser Alto, Médio ou Baixo'),
  
  query('dificuldade')
    .optional()
    .isIn(['Fácil', 'Médio', 'Difícil'])
    .withMessage('Dificuldade deve ser Fácil, Médio ou Difícil'),
  
  query('id_metodo')
    .optional()
    .isInt({ min: 1 })
    .withMessage('ID do método deve ser um número inteiro positivo'),
  
  query('id_disciplina')
    .optional()
    .isInt({ min: 1 })
    .withMessage('ID da disciplina deve ser um número inteiro positivo'),
  
  handleValidationErrors
];

module.exports = {
  handleValidationErrors,
  validateAlunoCreate,
  validateAlunoLogin,
  validateAlunoUpdate,
  validateMetodosAluno,
  validateDisciplinaCreate,
  validateNivelConhecimento,
  validateMaterialCreate,
  validateQuestaoCreate,
  validateIdParam,
  validateIdAlunoParam,
  validateIdDisciplinaParam,
  validatePagination,
  validateFilters
};
