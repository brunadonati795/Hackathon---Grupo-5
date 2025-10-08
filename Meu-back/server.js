require('dotenv').config();
const express = require('express');
const app = express();
const quizController = require('./controllers/quizController');

app.use(express.json());

app.post('/quiz/metodo', quizController.quizMetodo);
app.post('/quiz/nivel', quizController.quizNivel);

// Rota de teste para consultar o banco
app.get('/usuarios', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM usuarios');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/', (req, res) => {
  res.send('API funcionando!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});