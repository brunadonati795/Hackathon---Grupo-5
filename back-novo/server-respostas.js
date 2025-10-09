require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares básicos
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging de requisições
app.use(morgan('combined'));

// Banco de dados em memória para respostas de texto
let respostasTexto = [];

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'API funcionando corretamente',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    note: 'Foco em respostas de texto'
  });
});

// Criar resposta de texto (sem autenticação por enquanto)
app.post('/api/respostas/criar', (req, res) => {
  try {
    const { disciplina, modulo, resposta_texto, usuario_email } = req.body;

    if (!disciplina || !modulo || !resposta_texto) {
      return res.status(400).json({
        success: false,
        message: 'Dados obrigatórios: disciplina, modulo e resposta_texto'
      });
    }

    const novaResposta = {
      id_resposta: respostasTexto.length + 1,
      disciplina,
      modulo,
      resposta_texto,
      usuario_email: usuario_email || 'anônimo',
      data_resposta: new Date().toISOString()
    };

    respostasTexto.push(novaResposta);

    console.log('📝 Nova resposta salva:', {
      disciplina: novaResposta.disciplina,
      modulo: novaResposta.modulo,
      usuario: novaResposta.usuario_email,
      tamanho: novaResposta.resposta_texto.length
    });

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
    console.error('Erro ao salvar resposta:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// Buscar respostas por disciplina
app.get('/api/respostas/disciplina/:disciplina', (req, res) => {
  try {
    const { disciplina } = req.params;
    const { usuario_email } = req.query;

    let respostas = respostasTexto.filter(r => r.disciplina === disciplina);
    
    if (usuario_email) {
      respostas = respostas.filter(r => r.usuario_email === usuario_email);
    }

    res.json({
      success: true,
      data: respostas
    });
  } catch (error) {
    console.error('Erro ao buscar respostas:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// Buscar todas as respostas
app.get('/api/respostas/todas', (req, res) => {
  try {
    const { usuario_email } = req.query;

    let respostas = respostasTexto;
    
    if (usuario_email) {
      respostas = respostas.filter(r => r.usuario_email === usuario_email);
    }

    res.json({
      success: true,
      data: respostas
    });
  } catch (error) {
    console.error('Erro ao buscar todas as respostas:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// Estatísticas das respostas
app.get('/api/respostas/estatisticas', (req, res) => {
  try {
    const totalRespostas = respostasTexto.length;
    const respostasPorDisciplina = {};
    const respostasPorModulo = {};

    respostasTexto.forEach(resposta => {
      // Contar por disciplina
      respostasPorDisciplina[resposta.disciplina] = 
        (respostasPorDisciplina[resposta.disciplina] || 0) + 1;
      
      // Contar por módulo
      respostasPorModulo[resposta.modulo] = 
        (respostasPorModulo[resposta.modulo] || 0) + 1;
    });

    res.json({
      success: true,
      data: {
        total_respostas: totalRespostas,
        respostas_por_disciplina: respostasPorDisciplina,
        respostas_por_modulo: respostasPorModulo,
        ultima_resposta: respostasTexto.length > 0 ? respostasTexto[respostasTexto.length - 1].data_resposta : null
      }
    });
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error);
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
    message: 'Bem-vindo à API de Respostas de Texto',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      criar_resposta: 'POST /api/respostas/criar',
      buscar_por_disciplina: 'GET /api/respostas/disciplina/:disciplina',
      buscar_todas: 'GET /api/respostas/todas',
      estatisticas: 'GET /api/respostas/estatisticas'
    }
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor de Respostas rodando na porta ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📝 Endpoint principal: POST http://localhost:${PORT}/api/respostas/criar`);
  console.log(`📈 Estatísticas: http://localhost:${PORT}/api/respostas/estatisticas`);
});

module.exports = app;
