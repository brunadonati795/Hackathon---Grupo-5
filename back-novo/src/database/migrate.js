require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
const logger = require('../config/logger');

// Configuração do banco de dados
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'educandos',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'senha123',
});

async function migrate() {
  const client = await pool.connect();
  
  try {
    logger.info('Iniciando migração do banco de dados...');
    
    // Ler arquivo SQL
    const sqlPath = path.join(__dirname, '../../modelo.sql');
    const sqlContent = fs.readFileSync(sqlPath, 'utf8');
    
    // Executar script SQL
    await client.query(sqlContent);
    
    logger.info('Migração concluída com sucesso!');
    
    // Verificar se as tabelas foram criadas
    const result = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);
    
    logger.info('Tabelas criadas:', result.rows.map(row => row.table_name));
    
  } catch (error) {
    logger.error('Erro durante a migração:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

// Executar migração se chamado diretamente
if (require.main === module) {
  migrate()
    .then(() => {
      logger.info('Migração finalizada');
      process.exit(0);
    })
    .catch((error) => {
      logger.error('Falha na migração:', error);
      process.exit(1);
    });
}

module.exports = migrate;
