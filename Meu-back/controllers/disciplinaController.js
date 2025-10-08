const pool = require('../db');

exports.listarDisciplinas = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Disciplinas');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao buscar disciplinas');
  }
};
