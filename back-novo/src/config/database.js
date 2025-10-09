const { Pool } = require('pg');
const logger = require('./logger');

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'educandos',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '123456',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Teste de conexão
pool.on('connect', () => {
  logger.info('Conectado ao banco de dados PostgreSQL');
});

pool.on('error', (err) => {
  logger.error('Erro inesperado no cliente PostgreSQL:', err);
  process.exit(-1);
});

// Função para executar queries
const query = async (text, params) => {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    logger.debug('Query executada', { text, duration, rows: res.rowCount });
    return res;
  } catch (error) {
    logger.error('Erro na query:', { text, error: error.message });
    throw error;
  }
};

// Função para transações
const getClient = async () => {
  return await pool.connect();
};

module.exports = {
  query,
  getClient,
  pool
};
