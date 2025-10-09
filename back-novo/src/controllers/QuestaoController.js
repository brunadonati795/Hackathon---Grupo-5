const Questao = require('../models/Questao');
const Disciplina = require('../models/Disciplina');
const logger = require('../config/logger');

class QuestaoController {
  // Listar todas as questões
  static async listar(req, res) {
    try {
      const { page = 1, limit = 20, ...filters } = req.query;
      const offset = (page - 1) * limit;

      let questoes;
      if (filters.id_disciplina && filters.dificuldade) {
        questoes = await Questao.findByDisciplinaEDificuldade(filters.id_disciplina, filters.dificuldade);
      } else if (filters.id_disciplina) {
        questoes = await Questao.findByDisciplina(filters.id_disciplina);
      } else if (filters.dificuldade) {
        questoes = await Questao.findByDificuldade(filters.dificuldade);
      } else {
        questoes = await Questao.findAll();
      }

      // Aplicar paginação
      const startIndex = offset;
      const endIndex = offset + parseInt(limit);
      const paginatedQuestoes = questoes.slice(startIndex, endIndex);

      res.json({
        success: true,
        data: paginatedQuestoes,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: questoes.length
        }
      });
    } catch (error) {
      logger.error('Erro ao listar questões:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  // Obter questão por ID
  static async obterPorId(req, res) {
    try {
      const { id } = req.params;
      const questao = await Questao.findById(id);

      if (!questao) {
        return res.status(404).json({
          success: false,
          message: 'Questão não encontrada'
        });
      }

      res.json({
        success: true,
        data: questao
      });
    } catch (error) {
      logger.error('Erro ao obter questão por ID:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  // Criar nova questão
  static async criar(req, res) {
    try {
      const questao = await Questao.create(req.body);

      logger.info('Questão criada com sucesso', { 
        id_questoes: questao.id_questoes, 
        id_disciplina: questao.id_disciplina 
      });

      res.status(201).json({
        success: true,
        message: 'Questão criada com sucesso',
        data: questao
      });
    } catch (error) {
      logger.error('Erro ao criar questão:', error);
      
      if (error.message === 'Dificuldade inválida') {
        return res.status(400).json({
          success: false,
          message: 'Dificuldade deve ser Fácil, Médio ou Difícil'
        });
      }
      
      if (error.message === 'Gabarito inválido') {
        return res.status(400).json({
          success: false,
          message: 'Gabarito deve ser A, B, C ou D'
        });
      }

      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  // Atualizar questão
  static async atualizar(req, res) {
    try {
      const { id } = req.params;
      const questao = await Questao.findById(id);

      if (!questao) {
        return res.status(404).json({
          success: false,
          message: 'Questão não encontrada'
        });
      }

      await questao.update(req.body);

      logger.info('Questão atualizada com sucesso', { 
        id_questoes: questao.id_questoes 
      });

      res.json({
        success: true,
        message: 'Questão atualizada com sucesso',
        data: questao
      });
    } catch (error) {
      logger.error('Erro ao atualizar questão:', error);
      
      if (error.message === 'Dificuldade inválida') {
        return res.status(400).json({
          success: false,
          message: 'Dificuldade deve ser Fácil, Médio ou Difícil'
        });
      }
      
      if (error.message === 'Gabarito inválido') {
        return res.status(400).json({
          success: false,
          message: 'Gabarito deve ser A, B, C ou D'
        });
      }

      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  // Deletar questão
  static async deletar(req, res) {
    try {
      const { id } = req.params;
      const questao = await Questao.findById(id);

      if (!questao) {
        return res.status(404).json({
          success: false,
          message: 'Questão não encontrada'
        });
      }

      await questao.delete();

      logger.info('Questão deletada com sucesso', { 
        id_questoes: questao.id_questoes 
      });

      res.json({
        success: true,
        message: 'Questão deletada com sucesso'
      });
    } catch (error) {
      logger.error('Erro ao deletar questão:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  // Obter questões por disciplina
  static async obterPorDisciplina(req, res) {
    try {
      const { id_disciplina } = req.params;
      const questoes = await Questao.findByDisciplina(id_disciplina);

      res.json({
        success: true,
        data: questoes
      });
    } catch (error) {
      logger.error('Erro ao obter questões por disciplina:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  // Obter questões por dificuldade
  static async obterPorDificuldade(req, res) {
    try {
      const { dificuldade } = req.params;
      const questoes = await Questao.findByDificuldade(dificuldade);

      res.json({
        success: true,
        data: questoes
      });
    } catch (error) {
      logger.error('Erro ao obter questões por dificuldade:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  // Obter questões por disciplina e dificuldade
  static async obterPorDisciplinaEDificuldade(req, res) {
    try {
      const { id_disciplina, dificuldade } = req.params;
      const questoes = await Questao.findByDisciplinaEDificuldade(id_disciplina, dificuldade);

      res.json({
        success: true,
        data: questoes
      });
    } catch (error) {
      logger.error('Erro ao obter questões por disciplina e dificuldade:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  // Verificar resposta da questão
  static async verificarResposta(req, res) {
    try {
      const { id } = req.params;
      const { resposta } = req.body;

      const questao = await Questao.findById(id);
      if (!questao) {
        return res.status(404).json({
          success: false,
          message: 'Questão não encontrada'
        });
      }

      const isCorrect = questao.verificarResposta(resposta);

      logger.info('Resposta verificada', { 
        id_questoes: questao.id_questoes, 
        resposta, 
        isCorrect 
      });

      res.json({
        success: true,
        data: {
          isCorrect,
          gabarito: questao.gabarito,
          resposta_fornecida: resposta.toUpperCase()
        }
      });
    } catch (error) {
      logger.error('Erro ao verificar resposta:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  // Obter questão aleatória por disciplina e dificuldade
  static async obterQuestaoAleatoria(req, res) {
    try {
      const { id_disciplina, dificuldade } = req.params;
      const questoes = await Questao.findByDisciplinaEDificuldade(id_disciplina, dificuldade);

      if (questoes.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Nenhuma questão encontrada para os critérios especificados'
        });
      }

      // Selecionar questão aleatória
      const questaoAleatoria = questoes[Math.floor(Math.random() * questoes.length)];

      res.json({
        success: true,
        data: questaoAleatoria
      });
    } catch (error) {
      logger.error('Erro ao obter questão aleatória:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  // Obter estatísticas das questões
  static async getEstatisticas(req, res) {
    try {
      const { id_disciplina } = req.params;
      
      if (id_disciplina) {
        // Estatísticas por disciplina
        const questoes = await Questao.findByDisciplina(id_disciplina);
        
        const estatisticas = {
          total_questoes: questoes.length,
          por_dificuldade: {
            Fácil: questoes.filter(q => q.dificuldade === 'Fácil').length,
            Médio: questoes.filter(q => q.dificuldade === 'Médio').length,
            Difícil: questoes.filter(q => q.dificuldade === 'Difícil').length
          }
        };

        res.json({
          success: true,
          data: estatisticas
        });
      } else {
        // Estatísticas gerais
        const questoes = await Questao.findAll();
        
        const estatisticas = {
          total_questoes: questoes.length,
          por_dificuldade: {
            Fácil: questoes.filter(q => q.dificuldade === 'Fácil').length,
            Médio: questoes.filter(q => q.dificuldade === 'Médio').length,
            Difícil: questoes.filter(q => q.dificuldade === 'Difícil').length
          }
        };

        res.json({
          success: true,
          data: estatisticas
        });
      }
    } catch (error) {
      logger.error('Erro ao obter estatísticas das questões:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  // Gerar quiz aleatório
  static async gerarQuiz(req, res) {
    try {
      const { id_disciplina, dificuldade, quantidade = 10 } = req.query;
      
      let questoes;
      if (id_disciplina && dificuldade) {
        questoes = await Questao.findByDisciplinaEDificuldade(id_disciplina, dificuldade);
      } else if (id_disciplina) {
        questoes = await Questao.findByDisciplina(id_disciplina);
      } else {
        questoes = await Questao.findAll();
      }

      // Embaralhar e selecionar quantidade solicitada
      const questoesEmbaralhadas = questoes.sort(() => Math.random() - 0.5);
      const quiz = questoesEmbaralhadas.slice(0, parseInt(quantidade));

      res.json({
        success: true,
        data: {
          quiz,
          total_questoes: quiz.length,
          criterios: {
            id_disciplina: id_disciplina || 'todas',
            dificuldade: dificuldade || 'todas',
            quantidade_solicitada: parseInt(quantidade)
          }
        }
      });
    } catch (error) {
      logger.error('Erro ao gerar quiz:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }
}

module.exports = QuestaoController;
