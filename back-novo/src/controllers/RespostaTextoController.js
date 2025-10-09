const RespostaTexto = require('../models/RespostaTexto');
const logger = require('../config/logger');

class RespostaTextoController {
  // Criar nova resposta de texto
  static async criar(req, res) {
    try {
      const { id_disciplina, id_material, modulo, resposta_texto } = req.body;
      const id_aluno = req.user.id_aluno;

      // Validar dados obrigatórios
      if (!id_disciplina || !modulo || !resposta_texto) {
        return res.status(400).json({
          success: false,
          message: 'Dados obrigatórios: id_disciplina, modulo e resposta_texto'
        });
      }

      // Criar resposta
      const resposta = await RespostaTexto.create({
        id_aluno,
        id_disciplina,
        id_material,
        modulo,
        resposta_texto
      });

      logger.info('Resposta de texto criada com sucesso', {
        id_resposta: resposta.id_resposta,
        id_aluno: resposta.id_aluno,
        modulo: resposta.modulo
      });

      res.status(201).json({
        success: true,
        message: 'Resposta salva com sucesso',
        data: {
          id_resposta: resposta.id_resposta,
          modulo: resposta.modulo,
          data_resposta: resposta.data_resposta
        }
      });
    } catch (error) {
      logger.error('Erro ao criar resposta de texto:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  // Buscar respostas por disciplina
  static async buscarPorDisciplina(req, res) {
    try {
      const { id_disciplina } = req.params;
      const id_aluno = req.user.id_aluno;

      const respostas = await RespostaTexto.findByAlunoDisciplina(id_aluno, id_disciplina);

      res.json({
        success: true,
        data: respostas
      });
    } catch (error) {
      logger.error('Erro ao buscar respostas por disciplina:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  // Buscar todas as respostas do aluno
  static async buscarTodas(req, res) {
    try {
      const id_aluno = req.user.id_aluno;

      const respostas = await RespostaTexto.findByAluno(id_aluno);

      res.json({
        success: true,
        data: respostas
      });
    } catch (error) {
      logger.error('Erro ao buscar todas as respostas:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  // Atualizar resposta
  static async atualizar(req, res) {
    try {
      const { id_resposta } = req.params;
      const { resposta_texto } = req.body;
      const id_aluno = req.user.id_aluno;

      // Buscar resposta
      const resposta = await RespostaTexto.findById(id_resposta);
      if (!resposta) {
        return res.status(404).json({
          success: false,
          message: 'Resposta não encontrada'
        });
      }

      // Verificar se a resposta pertence ao aluno
      if (resposta.id_aluno !== id_aluno) {
        return res.status(403).json({
          success: false,
          message: 'Acesso negado'
        });
      }

      // Atualizar resposta
      await resposta.update({ resposta_texto });

      logger.info('Resposta de texto atualizada com sucesso', {
        id_resposta: resposta.id_resposta,
        id_aluno: resposta.id_aluno
      });

      res.json({
        success: true,
        message: 'Resposta atualizada com sucesso',
        data: {
          id_resposta: resposta.id_resposta,
          resposta_texto: resposta.resposta_texto,
          data_resposta: resposta.data_resposta
        }
      });
    } catch (error) {
      logger.error('Erro ao atualizar resposta:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  // Deletar resposta
  static async deletar(req, res) {
    try {
      const { id_resposta } = req.params;
      const id_aluno = req.user.id_aluno;

      // Buscar resposta
      const resposta = await RespostaTexto.findById(id_resposta);
      if (!resposta) {
        return res.status(404).json({
          success: false,
          message: 'Resposta não encontrada'
        });
      }

      // Verificar se a resposta pertence ao aluno
      if (resposta.id_aluno !== id_aluno) {
        return res.status(403).json({
          success: false,
          message: 'Acesso negado'
        });
      }

      // Deletar resposta
      await resposta.delete();

      logger.info('Resposta de texto deletada com sucesso', {
        id_resposta: resposta.id_resposta,
        id_aluno: resposta.id_aluno
      });

      res.json({
        success: true,
        message: 'Resposta deletada com sucesso'
      });
    } catch (error) {
      logger.error('Erro ao deletar resposta:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }
}

module.exports = RespostaTextoController;
