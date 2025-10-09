const express = require('express');
const router = express.Router();
const MaterialController = require('../controllers/MaterialController');
const { authenticateToken, optionalAuth } = require('../middleware/auth');
const { 
  validateMaterialCreate, 
  validateIdParam,
  validatePagination,
  validateFilters 
} = require('../middleware/validation');
const { asyncErrorHandler } = require('../middleware/errorHandler');
const multer = require('multer');

// Configuração do multer para upload de arquivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.env.UPLOAD_PATH || 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 10 * 1024 * 1024 // 10MB
  },
  fileFilter: (req, file, cb) => {
    // Validar tipos de arquivo permitidos
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/webm', 'audio/mp3', 'audio/wav', 'application/pdf'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Tipo de arquivo não permitido'), false);
    }
  }
});

// Rotas públicas
router.get('/', validatePagination, validateFilters, asyncErrorHandler(MaterialController.listar));
router.get('/buscar', validatePagination, validateFilters, asyncErrorHandler(MaterialController.buscar));
router.get('/:id', validateIdParam, asyncErrorHandler(MaterialController.obterPorId));

// Rotas com autenticação opcional
router.get('/disciplina/:id_disciplina', validateIdParam, optionalAuth, asyncErrorHandler(MaterialController.obterPorDisciplina));
router.get('/metodo/:id_metodo', validateIdParam, optionalAuth, asyncErrorHandler(MaterialController.obterPorMetodo));
router.get('/nivel/:nivel', optionalAuth, asyncErrorHandler(MaterialController.obterPorNivel));

// Rotas protegidas - Recomendações personalizadas
router.get('/disciplina/:id_disciplina/recomendados', 
  authenticateToken, 
  validateIdParam, 
  asyncErrorHandler(MaterialController.obterRecomendados)
);

// Rotas administrativas
router.post('/', 
  authenticateToken, 
  upload.single('arquivo'), 
  validateMaterialCreate, 
  asyncErrorHandler(MaterialController.criar)
);

router.put('/:id', 
  authenticateToken, 
  validateIdParam, 
  upload.single('arquivo'), 
  asyncErrorHandler(MaterialController.atualizar)
);

router.delete('/:id', 
  authenticateToken, 
  validateIdParam, 
  asyncErrorHandler(MaterialController.deletar)
);

// Estatísticas
router.get('/estatisticas/geral', asyncErrorHandler(MaterialController.getEstatisticas));

module.exports = router;
