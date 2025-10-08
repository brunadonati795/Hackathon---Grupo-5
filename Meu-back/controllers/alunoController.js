const pool = require('../db');

// Cadastrar novo aluno
exports.criarAluno = async (req, res) => {
  const { nome_aluno, data_ingressao } = req.body;
  try {
    await pool.query(
      'INSERT INTO Alunos (nome_aluno, data_ingressao) VALUES ($1, $2)',
      [nome_aluno, data_ingressao]
    );
    res.status(201).send('Aluno criado com sucesso!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao criar aluno');
  }
};

// Listar alunos
exports.listarAlunos = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Alunos');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao listar alunos');
  }
};
