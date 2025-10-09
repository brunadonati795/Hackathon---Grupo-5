require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares básicos
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging de requisições
app.use(morgan('combined'));

// Banco de dados em memória (simulado)
let users = [
  {
    id_aluno: 1,
    email: 'teste@email.com',
    senha: '123456', // Em produção seria hash
    nome_aluno: 'Usuário Teste',
    data_ingressao: new Date().toISOString()
  }
];

let respostasTexto = [];

// Middleware de autenticação simples
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Token de acesso necessário'
    });
  }

  try {
    // Token simples base64 (em produção seria JWT)
    const decoded = JSON.parse(Buffer.from(token, 'base64').toString());
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: 'Token inválido'
    });
  }
};

// Gerar token simples
const generateToken = (user) => {
  const payload = {
    id_aluno: user.id_aluno,
    email: user.email
  };
  return Buffer.from(JSON.stringify(payload)).toString('base64');
};

// Rotas da API

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'API funcionando corretamente',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Cadastrar usuário
app.post('/api/alunos/cadastrar', (req, res) => {
  try {
    const { email, senha, nome_aluno } = req.body;

    // Verificar se email já existe
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Email já cadastrado'
      });
    }

    // Criar novo usuário
    const newUser = {
      id_aluno: users.length + 1,
      email,
      senha, // Em produção seria hash
      nome_aluno: nome_aluno || email.split('@')[0],
      data_ingressao: new Date().toISOString()
    };

    users.push(newUser);
    const token = generateToken(newUser);

    res.status(201).json({
      success: true,
      message: 'Aluno cadastrado com sucesso',
      data: {
        id_aluno: newUser.id_aluno,
        email: newUser.email,
        nome_aluno: newUser.nome_aluno,
        data_ingressao: newUser.data_ingressao,
        token
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// Login
app.post('/api/alunos/login', (req, res) => {
  try {
    const { email, senha } = req.body;

    const user = users.find(u => u.email === email && u.senha === senha);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Credenciais inválidas'
      });
    }

    const token = generateToken(user);

    res.json({
      success: true,
      message: 'Login realizado com sucesso',
      data: {
        id_aluno: user.id_aluno,
        email: user.email,
        nome_aluno: user.nome_aluno,
        data_ingressao: user.data_ingressao,
        token
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// Criar resposta de texto
app.post('/api/respostas/criar', authenticateToken, (req, res) => {
  try {
    const { id_disciplina, id_material, modulo, resposta_texto } = req.body;
    const id_aluno = req.user.id_aluno;

    if (!id_disciplina || !modulo || !resposta_texto) {
      return res.status(400).json({
        success: false,
        message: 'Dados obrigatórios: id_disciplina, modulo e resposta_texto'
      });
    }

    const novaResposta = {
      id_resposta: respostasTexto.length + 1,
      id_aluno,
      id_disciplina,
      id_material,
      modulo,
      resposta_texto,
      data_resposta: new Date().toISOString()
    };

    respostasTexto.push(novaResposta);

    res.status(201).json({
      success: true,
      message: 'Resposta salva com sucesso',
      data: {
        id_resposta: novaResposta.id_resposta,
        modulo: novaResposta.modulo,
        data_resposta: novaResposta.data_resposta
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// Buscar respostas por disciplina
app.get('/api/respostas/disciplina/:id_disciplina', authenticateToken, (req, res) => {
  try {
    const { id_disciplina } = req.params;
    const id_aluno = req.user.id_aluno;

    const respostas = respostasTexto.filter(r => 
      r.id_aluno === id_aluno && r.id_disciplina == id_disciplina
    );

    res.json({
      success: true,
      data: respostas
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// Buscar todas as respostas do usuário
app.get('/api/respostas/todas', authenticateToken, (req, res) => {
  try {
    const id_aluno = req.user.id_aluno;

    const respostas = respostasTexto.filter(r => r.id_aluno === id_aluno);

    res.json({
      success: true,
      data: respostas
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// Atualizar resposta
app.put('/api/respostas/:id_resposta', authenticateToken, (req, res) => {
  try {
    const { id_resposta } = req.params;
    const { resposta_texto } = req.body;
    const id_aluno = req.user.id_aluno;

    const respostaIndex = respostasTexto.findIndex(r => 
      r.id_resposta == id_resposta && r.id_aluno === id_aluno
    );

    if (respostaIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Resposta não encontrada'
      });
    }

    respostasTexto[respostaIndex].resposta_texto = resposta_texto;
    respostasTexto[respostaIndex].data_resposta = new Date().toISOString();

    res.json({
      success: true,
      message: 'Resposta atualizada com sucesso',
      data: {
        id_resposta: respostasTexto[respostaIndex].id_resposta,
        resposta_texto: respostasTexto[respostaIndex].resposta_texto,
        data_resposta: respostasTexto[respostaIndex].data_resposta
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// Deletar resposta
app.delete('/api/respostas/:id_resposta', authenticateToken, (req, res) => {
  try {
    const { id_resposta } = req.params;
    const id_aluno = req.user.id_aluno;

    const respostaIndex = respostasTexto.findIndex(r => 
      r.id_resposta == id_resposta && r.id_aluno === id_aluno
    );

    if (respostaIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Resposta não encontrada'
      });
    }

    respostasTexto.splice(respostaIndex, 1);

    res.json({
      success: true,
      message: 'Resposta deletada com sucesso'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// Rota raiz
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Bem-vindo à API Educandos (Modo Simulado)',
    version: '1.0.0',
    note: 'Usando banco de dados em memória para testes'
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📋 Modo: Simulado (sem PostgreSQL)`);
});

module.exports = app;
