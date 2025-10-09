const Metodo = require('../models/Metodo');
const MetodoAluno = require('../models/MetodoAluno');
const logger = require('../config/logger');

class MetodoController {
  // Listar todos os métodos de aprendizagem
  static async listar(req, res) {
    try {
      const metodos = await Metodo.findAll();

      res.json({
        success: true,
        data: metodos
      });
    } catch (error) {
      logger.error('Erro ao listar métodos:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  // Obter método por ID
  static async obterPorId(req, res) {
    try {
      const { id } = req.params;
      const metodo = await Metodo.findById(id);

      if (!metodo) {
        return res.status(404).json({
          success: false,
          message: 'Método não encontrado'
        });
      }

      res.json({
        success: true,
        data: metodo
      });
    } catch (error) {
      logger.error('Erro ao obter método por ID:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  // Criar novo método (apenas para administradores)
  static async criar(req, res) {
    try {
      const { nome_metodo } = req.body;
      const metodo = await Metodo.create({ nome_metodo });

      res.status(201).json({
        success: true,
        message: 'Método criado com sucesso',
        data: metodo
      });
    } catch (error) {
      logger.error('Erro ao criar método:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  // Atualizar método (apenas para administradores)
  static async atualizar(req, res) {
    try {
      const { id } = req.params;
      const metodo = await Metodo.findById(id);

      if (!metodo) {
        return res.status(404).json({
          success: false,
          message: 'Método não encontrado'
        });
      }

      await metodo.update(req.body);

      res.json({
        success: true,
        message: 'Método atualizado com sucesso',
        data: metodo
      });
    } catch (error) {
      logger.error('Erro ao atualizar método:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  // Deletar método (apenas para administradores)
  static async deletar(req, res) {
    try {
      const { id } = req.params;
      const metodo = await Metodo.findById(id);

      if (!metodo) {
        return res.status(404).json({
          success: false,
          message: 'Método não encontrado'
        });
      }

      await metodo.delete();

      res.json({
        success: true,
        message: 'Método deletado com sucesso'
      });
    } catch (error) {
      logger.error('Erro ao deletar método:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  // Associar métodos ao aluno (questionário de métodos)
  static async associarMetodosAluno(req, res) {
    try {
      const { metodos_ids } = req.body;
      const id_aluno = req.user.id_aluno;

      // Atualizar métodos do aluno
      await MetodoAluno.updateMetodosAluno(id_aluno, metodos_ids);

      logger.info('Métodos do aluno atualizados com sucesso', { 
        id_aluno, 
        metodos_ids 
      });

      res.json({
        success: true,
        message: 'Métodos de aprendizagem atualizados com sucesso'
      });
    } catch (error) {
      logger.error('Erro ao associar métodos ao aluno:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  // Obter métodos do aluno
  static async obterMetodosAluno(req, res) {
    try {
      const id_aluno = req.user.id_aluno;
      const metodos = await MetodoAluno.findByAluno(id_aluno);

      res.json({
        success: true,
        data: metodos
      });
    } catch (error) {
      logger.error('Erro ao obter métodos do aluno:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  // Remover método do aluno
  static async removerMetodoAluno(req, res) {
    try {
      const { id_metodo } = req.params;
      const id_aluno = req.user.id_aluno;

      await MetodoAluno.remove({ id_metodo, id_aluno });

      logger.info('Método removido do aluno com sucesso', { 
        id_aluno, 
        id_metodo 
      });

      res.json({
        success: true,
        message: 'Método removido com sucesso'
      });
    } catch (error) {
      logger.error('Erro ao remover método do aluno:', error);
      
      if (error.message === 'Associação não encontrada') {
        return res.status(404).json({
          success: false,
          message: 'Método não associado ao aluno'
        });
      }

      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  // Verificar se aluno tem métodos associados
  static async verificarMetodosAluno(req, res) {
    try {
      const id_aluno = req.user.id_aluno;
      const temMetodos = await MetodoAluno.alunoTemMetodos(id_aluno);

      res.json({
        success: true,
        data: {
          tem_metodos: temMetodos
        }
      });
    } catch (error) {
      logger.error('Erro ao verificar métodos do aluno:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  // Obter estatísticas dos métodos
  static async getEstatisticas(req, res) {
    try {
      // Aqui você pode implementar lógica para obter estatísticas
      // como distribuição de métodos, alunos por método, etc.
      const metodos = await Metodo.findAll();
      
      const estatisticas = {
        total_metodos: metodos.length,
        metodos: metodos.map(metodo => ({
          id_metodo: metodo.id_metodo,
          nome_metodo: metodo.nome_metodo
        }))
      };

      res.json({
        success: true,
        data: estatisticas
      });
    } catch (error) {
      logger.error('Erro ao obter estatísticas dos métodos:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }
}

module.exports = MetodoController;
