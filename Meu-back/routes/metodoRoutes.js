const express = require('express');
const router = express.Router();
const metodoController = require('../controllers/metodoController');

router.get('/', metodoController.listarMetodos);

module.exports = router;
