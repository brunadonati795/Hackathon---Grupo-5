const pool = require('../db');

// Quiz de método (salva o método escolhido pelo aluno)
exports.salvarMetodoAluno = async (req, res) => {
  const { id_aluno, id_metodo } = req.body;
  try {
    await pool.query(
      'INSERT INTO MetodosAlunos (id_aluno, id_metodo) VALUES ($1, $2)',
      [id_aluno, id_metodo]
    );
    res.status(201).send('Método registrado com sucesso!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao registrar método');
  }
};

// Quiz de nível (salva o nível do aluno em uma disciplina)
exports.salvarNivelAluno = async (req, res) => {
  const { id_aluno, id_disciplina, conhecimento_aluno } = req.body;
  try {
    await pool.query(
      `INSERT INTO DisciplinasAlunos (id_aluno, id_disciplina, conhecimento_aluno)
       VALUES ($1, $2, $3)
       ON CONFLICT (id_disciplina, id_aluno)
       DO UPDATE SET conhecimento_aluno = EXCLUDED.conhecimento_aluno`,
      [id_aluno, id_disciplina, conhecimento_aluno]
    );
    res.status(201).send('Nível de conhecimento salvo com sucesso!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao salvar nível');
  }
};
