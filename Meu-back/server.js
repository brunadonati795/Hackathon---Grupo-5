const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Importa as rotas
const alunoRoutes = require('./routes/alunoRoutes');
const metodoRoutes = require('./routes/metodoRoutes');
const disciplinaRoutes = require('./routes/disciplinaRoutes');
const quizRoutes = require('./routes/quizRoutes');

app.use('/api/alunos', alunoRoutes);
app.use('/api/metodos', metodoRoutes);
app.use('/api/disciplinas', disciplinaRoutes);
app.use('/api/quiz', quizRoutes);

// Inicia o servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
