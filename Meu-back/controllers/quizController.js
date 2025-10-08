const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

module.exports = pool;

exports.quizMetodo = async (req, res) => {
  const { nome, resultado } = req.body;
  try {
    await pool.query(
      'INSERT INTO usuarios (nome, metodo_aprendizado) VALUES ($1, $2)',
      [nome, resultado]
    );
    res.status(201).send('Resultado do método salvo!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao salvar resultado');
  }
};

exports.quizNivel = async (req, res) => {
  const { nome, nivel } = req.body;
  try {
    await pool.query(
      'UPDATE usuarios SET nivel = $1 WHERE nome = $2',
      [nivel, nome]
    );
    res.send('Nível atualizado!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao atualizar nível');
  }
};
