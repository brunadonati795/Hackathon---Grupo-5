const Disciplina = require('../models/Disciplina');
const DisciplinaAluno = require('../models/DisciplinaAluno');
const Material = require('../models/Material');
const logger = require('../config/logger');

class DisciplinaController {
  // Listar todas as disciplinas
  static async listar(req, res) {
    try {
      const disciplinas = await Disciplina.findAll();

      res.json({
        success: true,
        data: disciplinas
      });
    } catch (error) {
      logger.error('Erro ao listar disciplinas:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  // Obter disciplina por ID
  static async obterPorId(req, res) {
    try {
      const { id } = req.params;
      const disciplina = await Disciplina.findById(id);

      if (!disciplina) {
        return res.status(404).json({
          success: false,
          message: 'Disciplina não encontrada'
        });
      }

      res.json({
        success: true,
        data: disciplina
      });
    } catch (error) {
      logger.error('Erro ao obter disciplina por ID:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  // Criar nova disciplina (apenas para administradores)
  static async criar(req, res) {
    try {
      const { nome_disciplina } = req.body;
      const disciplina = await Disciplina.create({ nome_disciplina });

      res.status(201).json({
        success: true,
        message: 'Disciplina criada com sucesso',
        data: disciplina
      });
    } catch (error) {
      logger.error('Erro ao criar disciplina:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  // Atualizar disciplina (apenas para administradores)
  static async atualizar(req, res) {
    try {
      const { id } = req.params;
      const disciplina = await Disciplina.findById(id);

      if (!disciplina) {
        return res.status(404).json({
          success: false,
          message: 'Disciplina não encontrada'
        });
      }

      await disciplina.update(req.body);

      res.json({
        success: true,
        message: 'Disciplina atualizada com sucesso',
        data: disciplina
      });
    } catch (error) {
      logger.error('Erro ao atualizar disciplina:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  // Deletar disciplina (apenas para administradores)
  static async deletar(req, res) {
    try {
      const { id } = req.params;
      const disciplina = await Disciplina.findById(id);

      if (!disciplina) {
        return res.status(404).json({
          success: false,
          message: 'Disciplina não encontrada'
        });
      }

      await disciplina.delete();

      res.json({
        success: true,
        message: 'Disciplina deletada com sucesso'
      });
    } catch (error) {
      logger.error('Erro ao deletar disciplina:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  // Definir nível de conhecimento do aluno na disciplina
  static async definirNivelAluno(req, res) {
    try {
      const { id_disciplina } = req.params;
      const { conhecimento_aluno } = req.body;
      const id_aluno = req.user.id_aluno;

      // Criar ou atualizar associação
      const disciplinaAluno = await DisciplinaAluno.create({
        id_disciplina,
        id_aluno,
        conhecimento_aluno
      });

      logger.info('Nível de conhecimento definido com sucesso', { 
        id_aluno, 
        id_disciplina, 
        conhecimento_aluno 
      });

      res.json({
        success: true,
        message: 'Nível de conhecimento definido com sucesso',
        data: disciplinaAluno
      });
    } catch (error) {
      logger.error('Erro ao definir nível do aluno na disciplina:', error);
      
      if (error.message === 'Nível de conhecimento inválido') {
        return res.status(400).json({
          success: false,
          message: 'Nível de conhecimento deve ser Alto, Médio ou Baixo'
        });
      }

      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  // Obter disciplinas do aluno
  static async obterDisciplinasAluno(req, res) {
    try {
      const id_aluno = req.user.id_aluno;
      const disciplinas = await DisciplinaAluno.findByAluno(id_aluno);

      res.json({
        success: true,
        data: disciplinas
      });
    } catch (error) {
      logger.error('Erro ao obter disciplinas do aluno:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  // Obter nível do aluno em uma disciplina específica
  static async obterNivelAlunoDisciplina(req, res) {
    try {
      const { id_disciplina } = req.params;
      const id_aluno = req.user.id_aluno;

      const disciplinaAluno = await DisciplinaAluno.findByAlunoEDisciplina(id_aluno, id_disciplina);

      if (!disciplinaAluno) {
        return res.status(404).json({
          success: false,
          message: 'Aluno não possui nível definido para esta disciplina'
        });
      }

      res.json({
        success: true,
        data: disciplinaAluno
      });
    } catch (error) {
      logger.error('Erro ao obter nível do aluno na disciplina:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  // Atualizar nível do aluno na disciplina
  static async atualizarNivelAluno(req, res) {
    try {
      const { id_disciplina } = req.params;
      const { conhecimento_aluno } = req.body;
      const id_aluno = req.user.id_aluno;

      const disciplinaAluno = await DisciplinaAluno.findByAlunoEDisciplina(id_aluno, id_disciplina);

      if (!disciplinaAluno) {
        return res.status(404).json({
          success: false,
          message: 'Aluno não possui nível definido para esta disciplina'
        });
      }

      await disciplinaAluno.updateNivel(conhecimento_aluno);

      logger.info('Nível de conhecimento atualizado com sucesso', { 
        id_aluno, 
        id_disciplina, 
        conhecimento_aluno 
      });

      res.json({
        success: true,
        message: 'Nível de conhecimento atualizado com sucesso',
        data: disciplinaAluno
      });
    } catch (error) {
      logger.error('Erro ao atualizar nível do aluno na disciplina:', error);
      
      if (error.message === 'Nível de conhecimento inválido') {
        return res.status(400).json({
          success: false,
          message: 'Nível de conhecimento deve ser Alto, Médio ou Baixo'
        });
      }

      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  // Obter materiais da disciplina
  static async obterMateriais(req, res) {
    try {
      const { id } = req.params;
      const materiais = await Material.findByDisciplina(id);

      res.json({
        success: true,
        data: materiais
      });
    } catch (error) {
      logger.error('Erro ao obter materiais da disciplina:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  // Obter materiais recomendados para o aluno na disciplina
  static async obterMateriaisRecomendados(req, res) {
    try {
      const { id } = req.params;
      const id_aluno = req.user.id_aluno;

      // Verificar se aluno tem nível definido para a disciplina
      const temNivel = await DisciplinaAluno.alunoTemNivelDisciplina(id_aluno, id);
      if (!temNivel) {
        return res.status(400).json({
          success: false,
          message: 'Aluno deve definir seu nível de conhecimento nesta disciplina primeiro'
        });
      }

      const materiais = await Material.findRecomendados(id_aluno, id);

      res.json({
        success: true,
        data: materiais
      });
    } catch (error) {
      logger.error('Erro ao obter materiais recomendados:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  // Obter estatísticas da disciplina
  static async getEstatisticas(req, res) {
    try {
      const { id } = req.params;
      const disciplina = await Disciplina.findById(id);

      if (!disciplina) {
        return res.status(404).json({
          success: false,
          message: 'Disciplina não encontrada'
        });
      }

      const estatisticas = await disciplina.getEstatisticas();

      res.json({
        success: true,
        data: estatisticas
      });
    } catch (error) {
      logger.error('Erro ao obter estatísticas da disciplina:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  // Verificar se aluno tem nível definido para disciplina
  static async verificarNivelAluno(req, res) {
    try {
      const { id } = req.params;
      const id_aluno = req.user.id_aluno;

      const temNivel = await DisciplinaAluno.alunoTemNivelDisciplina(id_aluno, id);

      res.json({
        success: true,
        data: {
          tem_nivel: temNivel
        }
      });
    } catch (error) {
      logger.error('Erro ao verificar nível do aluno na disciplina:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }
}

module.exports = DisciplinaController;
