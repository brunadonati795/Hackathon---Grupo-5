const pool = require('../db');

exports.listarMetodos = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Metodos');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao buscar métodos');
  }
};
