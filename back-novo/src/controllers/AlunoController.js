const Aluno = require('../models/Aluno');
const { generateToken } = require('../middleware/auth');
const logger = require('../config/logger');

class AlunoController {
  // Cadastrar novo aluno
  static async cadastrar(req, res) {
    try {
      const { email, senha, nome_aluno } = req.body;

      // Criar aluno
      const aluno = await Aluno.create({ email, senha, nome_aluno });

      // Gerar token
      const token = generateToken(aluno);

      logger.info('Aluno cadastrado com sucesso', { 
        id_aluno: aluno.id_aluno, 
        email: aluno.email 
      });

      res.status(201).json({
        success: true,
        message: 'Aluno cadastrado com sucesso',
        data: {
          id_aluno: aluno.id_aluno,
          email: aluno.email,
          nome_aluno: aluno.nome_aluno,
          data_ingressao: aluno.data_ingressao,
          token
        }
      });
    } catch (error) {
      logger.error('Erro ao cadastrar aluno:', error);
      
      if (error.message === 'Email já cadastrado') {
        return res.status(409).json({
          success: false,
          message: 'Email já cadastrado'
        });
      }

      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  // Login do aluno
  static async login(req, res) {
    try {
      const { email, senha } = req.body;

      // Buscar aluno por email
      const aluno = await Aluno.findByEmail(email);
      if (!aluno) {
        return res.status(401).json({
          success: false,
          message: 'Credenciais inválidas'
        });
      }

      // Verificar senha
      const senhaValida = await aluno.verificarSenha(senha);
      if (!senhaValida) {
        return res.status(401).json({
          success: false,
          message: 'Credenciais inválidas'
        });
      }

      // Gerar token
      const token = generateToken(aluno);

      logger.info('Login realizado com sucesso', { 
        id_aluno: aluno.id_aluno, 
        email: aluno.email 
      });

      res.json({
        success: true,
        message: 'Login realizado com sucesso',
        data: {
          id_aluno: aluno.id_aluno,
          email: aluno.email,
          nome_aluno: aluno.nome_aluno,
          data_ingressao: aluno.data_ingressao,
          token
        }
      });
    } catch (error) {
      logger.error('Erro ao fazer login:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  // Obter perfil do aluno
  static async getPerfil(req, res) {
    try {
      const aluno = await Aluno.findById(req.user.id_aluno);
      if (!aluno) {
        return res.status(404).json({
          success: false,
          message: 'Aluno não encontrado'
        });
      }

      // Obter perfil completo
      const perfilCompleto = await aluno.getPerfilCompleto();

      res.json({
        success: true,
        data: perfilCompleto
      });
    } catch (error) {
      logger.error('Erro ao obter perfil do aluno:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  // Atualizar perfil do aluno
  static async atualizarPerfil(req, res) {
    try {
      const aluno = await Aluno.findById(req.user.id_aluno);
      if (!aluno) {
        return res.status(404).json({
          success: false,
          message: 'Aluno não encontrado'
        });
      }

      // Atualizar dados
      await aluno.update(req.body);

      logger.info('Perfil do aluno atualizado com sucesso', { 
        id_aluno: aluno.id_aluno 
      });

      res.json({
        success: true,
        message: 'Perfil atualizado com sucesso',
        data: {
          id_aluno: aluno.id_aluno,
          email: aluno.email,
          nome_aluno: aluno.nome_aluno,
          data_ingressao: aluno.data_ingressao
        }
      });
    } catch (error) {
      logger.error('Erro ao atualizar perfil do aluno:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  // Deletar conta do aluno
  static async deletarConta(req, res) {
    try {
      const aluno = await Aluno.findById(req.user.id_aluno);
      if (!aluno) {
        return res.status(404).json({
          success: false,
          message: 'Aluno não encontrado'
        });
      }

      // Deletar aluno (cascade vai remover dados relacionados)
      await aluno.delete();

      logger.info('Conta do aluno deletada com sucesso', { 
        id_aluno: aluno.id_aluno 
      });

      res.json({
        success: true,
        message: 'Conta deletada com sucesso'
      });
    } catch (error) {
      logger.error('Erro ao deletar conta do aluno:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  // Verificar se aluno respondeu questionário de métodos
  static async verificarQuestionarioMetodos(req, res) {
    try {
      const aluno = await Aluno.findById(req.user.id_aluno);
      if (!aluno) {
        return res.status(404).json({
          success: false,
          message: 'Aluno não encontrado'
        });
      }

      const temMetodos = await aluno.temMetodosAprendizagem();

      res.json({
        success: true,
        data: {
          tem_metodos: temMetodos
        }
      });
    } catch (error) {
      logger.error('Erro ao verificar questionário de métodos:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  // Verificar se aluno tem nível definido para disciplina
  static async verificarNivelDisciplina(req, res) {
    try {
      const { id_disciplina } = req.params;
      const aluno = await Aluno.findById(req.user.id_aluno);
      
      if (!aluno) {
        return res.status(404).json({
          success: false,
          message: 'Aluno não encontrado'
        });
      }

      const temNivel = await aluno.temNivelDisciplina(id_disciplina);

      res.json({
        success: true,
        data: {
          tem_nivel: temNivel
        }
      });
    } catch (error) {
      logger.error('Erro ao verificar nível da disciplina:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  // Obter estatísticas do aluno
  static async getEstatisticas(req, res) {
    try {
      const aluno = await Aluno.findById(req.user.id_aluno);
      if (!aluno) {
        return res.status(404).json({
          success: false,
          message: 'Aluno não encontrado'
        });
      }

      // Obter perfil completo para estatísticas
      const perfilCompleto = await aluno.getPerfilCompleto();

      const estatisticas = {
        id_aluno: aluno.id_aluno,
        nome_aluno: aluno.nome_aluno,
        data_ingressao: aluno.data_ingressao,
        total_metodos: perfilCompleto.metodos_aprendizagem.length,
        total_disciplinas: perfilCompleto.disciplinas.length,
        metodos_aprendizagem: perfilCompleto.metodos_aprendizagem,
        disciplinas: perfilCompleto.disciplinas
      };

      res.json({
        success: true,
        data: estatisticas
      });
    } catch (error) {
      logger.error('Erro ao obter estatísticas do aluno:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }
}

module.exports = AlunoController;
