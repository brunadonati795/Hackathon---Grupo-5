const Material = require('../models/Material');
const Disciplina = require('../models/Disciplina');
const Metodo = require('../models/Metodo');
const logger = require('../config/logger');

class MaterialController {
  // Listar todos os materiais
  static async listar(req, res) {
    try {
      const { page = 1, limit = 20, ...filters } = req.query;
      const offset = (page - 1) * limit;

      const materiais = await Material.findByFilters({
        ...filters,
        limit: parseInt(limit),
        offset: parseInt(offset)
      });

      res.json({
        success: true,
        data: materiais,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: materiais.length
        }
      });
    } catch (error) {
      logger.error('Erro ao listar materiais:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  // Obter material por ID
  static async obterPorId(req, res) {
    try {
      const { id } = req.params;
      const material = await Material.findById(id);

      if (!material) {
        return res.status(404).json({
          success: false,
          message: 'Material não encontrado'
        });
      }

      res.json({
        success: true,
        data: material
      });
    } catch (error) {
      logger.error('Erro ao obter material por ID:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  // Criar novo material
  static async criar(req, res) {
    try {
      const materialData = {
        ...req.body,
        // Se houver upload de arquivo, adicionar informações
        tipo_midia: req.file ? req.file.mimetype.split('/')[0] : null,
        caminho_midia: req.file ? req.file.path : null
      };

      const material = await Material.create(materialData);

      logger.info('Material criado com sucesso', { 
        id_material: material.id_material, 
        nome_material: material.nome_material 
      });

      res.status(201).json({
        success: true,
        message: 'Material criado com sucesso',
        data: material
      });
    } catch (error) {
      logger.error('Erro ao criar material:', error);
      
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

  // Atualizar material
  static async atualizar(req, res) {
    try {
      const { id } = req.params;
      const material = await Material.findById(id);

      if (!material) {
        return res.status(404).json({
          success: false,
          message: 'Material não encontrado'
        });
      }

      const updateData = {
        ...req.body,
        // Se houver novo upload de arquivo
        ...(req.file && {
          tipo_midia: req.file.mimetype.split('/')[0],
          caminho_midia: req.file.path
        })
      };

      await material.update(updateData);

      logger.info('Material atualizado com sucesso', { 
        id_material: material.id_material 
      });

      res.json({
        success: true,
        message: 'Material atualizado com sucesso',
        data: material
      });
    } catch (error) {
      logger.error('Erro ao atualizar material:', error);
      
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

  // Deletar material
  static async deletar(req, res) {
    try {
      const { id } = req.params;
      const material = await Material.findById(id);

      if (!material) {
        return res.status(404).json({
          success: false,
          message: 'Material não encontrado'
        });
      }

      await material.delete();

      logger.info('Material deletado com sucesso', { 
        id_material: material.id_material 
      });

      res.json({
        success: true,
        message: 'Material deletado com sucesso'
      });
    } catch (error) {
      logger.error('Erro ao deletar material:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  // Obter materiais por disciplina
  static async obterPorDisciplina(req, res) {
    try {
      const { id_disciplina } = req.params;
      const materiais = await Material.findByDisciplina(id_disciplina);

      res.json({
        success: true,
        data: materiais
      });
    } catch (error) {
      logger.error('Erro ao obter materiais por disciplina:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  // Obter materiais recomendados para o aluno
  static async obterRecomendados(req, res) {
    try {
      const { id_disciplina } = req.params;
      const id_aluno = req.user.id_aluno;

      const materiais = await Material.findRecomendados(id_aluno, id_disciplina);

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

  // Buscar materiais por filtros
  static async buscar(req, res) {
    try {
      const { page = 1, limit = 20, ...filters } = req.query;
      const offset = (page - 1) * limit;

      const materiais = await Material.findByFilters({
        ...filters,
        limit: parseInt(limit),
        offset: parseInt(offset)
      });

      res.json({
        success: true,
        data: materiais,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: materiais.length
        }
      });
    } catch (error) {
      logger.error('Erro ao buscar materiais:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  // Obter materiais por método de aprendizagem
  static async obterPorMetodo(req, res) {
    try {
      const { id_metodo } = req.params;
      const materiais = await Material.findByFilters({ id_metodo });

      res.json({
        success: true,
        data: materiais
      });
    } catch (error) {
      logger.error('Erro ao obter materiais por método:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  // Obter materiais por nível de conhecimento
  static async obterPorNivel(req, res) {
    try {
      const { nivel } = req.params;
      const materiais = await Material.findByFilters({ nivel_conhecimento: nivel });

      res.json({
        success: true,
        data: materiais
      });
    } catch (error) {
      logger.error('Erro ao obter materiais por nível:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  // Obter estatísticas dos materiais
  static async getEstatisticas(req, res) {
    try {
      // Implementar lógica para obter estatísticas dos materiais
      // como materiais mais acessados, distribuição por método, etc.
      const estatisticas = {
        total_materiais: 0, // Implementar contagem
        materiais_por_nivel: {
          Alto: 0,
          Médio: 0,
          Baixo: 0
        },
        materiais_por_metodo: [] // Implementar agrupamento por método
      };

      res.json({
        success: true,
        data: estatisticas
      });
    } catch (error) {
      logger.error('Erro ao obter estatísticas dos materiais:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  // Validar compatibilidade de mídia com método
  static validarCompatibilidadeMidia(tipo_midia, id_metodo) {
    const compatibilidades = {
      1: ['imagem', 'documento'], // Visual
      2: ['video', 'audio'], // Áudio-visual
      3: ['documento', 'texto'], // Escrita e Leitura
      4: ['video', 'audio'], // Explicando
      5: ['imagem', 'documento'] // Questões
    };

    return compatibilidades[id_metodo]?.includes(tipo_midia) || false;
  }
}

module.exports = MaterialController;
