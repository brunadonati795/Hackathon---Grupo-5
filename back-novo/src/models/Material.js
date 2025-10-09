const db = require('../config/database');
const logger = require('../config/logger');

class Material {
  constructor(data) {
    this.id_material = data.id_material;
    this.nome_material = data.nome_material;
    this.data_criacao = data.data_criacao;
    this.nivel_conhecimento = data.nivel_conhecimento;
    this.id_metodo = data.id_metodo;
    this.id_disciplina = data.id_disciplina;
    this.conteudo_texto = data.conteudo_texto;
    this.tipo_midia = data.tipo_midia;
    this.caminho_midia = data.caminho_midia;
  }

  // Buscar todos os materiais
  static async findAll() {
    try {
      const result = await db.query(`
        SELECT m.*, met.nome_metodo, d.nome_disciplina
        FROM Materiais m
        INNER JOIN Metodos met ON m.id_metodo = met.id_metodo
        INNER JOIN Disciplinas d ON m.id_disciplina = d.id_disciplina
        ORDER BY m.data_criacao DESC
      `);
      return result.rows.map(row => new Material(row));
    } catch (error) {
      logger.error('Erro ao buscar materiais:', error);
      throw error;
    }
  }

  // Buscar material por ID
  static async findById(id_material) {
    try {
      const result = await db.query(`
        SELECT m.*, met.nome_metodo, d.nome_disciplina
        FROM Materiais m
        INNER JOIN Metodos met ON m.id_metodo = met.id_metodo
        INNER JOIN Disciplinas d ON m.id_disciplina = d.id_disciplina
        WHERE m.id_material = $1
      `, [id_material]);

      if (result.rows.length === 0) {
        return null;
      }

      return new Material(result.rows[0]);
    } catch (error) {
      logger.error('Erro ao buscar material por ID:', error);
      throw error;
    }
  }

  // Buscar materiais por disciplina
  static async findByDisciplina(id_disciplina) {
    try {
      const result = await db.query(`
        SELECT m.*, met.nome_metodo, d.nome_disciplina
        FROM Materiais m
        INNER JOIN Metodos met ON m.id_metodo = met.id_metodo
        INNER JOIN Disciplinas d ON m.id_disciplina = d.id_disciplina
        WHERE m.id_disciplina = $1
        ORDER BY m.data_criacao DESC
      `, [id_disciplina]);
      return result.rows.map(row => new Material(row));
    } catch (error) {
      logger.error('Erro ao buscar materiais por disciplina:', error);
      throw error;
    }
  }

  // Buscar materiais recomendados para aluno
  static async findRecomendados(id_aluno, id_disciplina) {
    try {
      const result = await db.query(`
        SELECT DISTINCT m.*, met.nome_metodo, d.nome_disciplina
        FROM Materiais m
        INNER JOIN Metodos met ON m.id_metodo = met.id_metodo
        INNER JOIN Disciplinas d ON m.id_disciplina = d.id_disciplina
        INNER JOIN MetodosAlunos ma ON m.id_metodo = ma.id_metodo
        INNER JOIN DisciplinasAlunos da ON m.id_disciplina = da.id_disciplina
        WHERE ma.id_aluno = $1 
          AND da.id_aluno = $1
          AND m.id_disciplina = $2
          AND m.nivel_conhecimento = da.conhecimento_aluno
        ORDER BY m.data_criacao DESC
      `, [id_aluno, id_disciplina]);
      return result.rows.map(row => new Material(row));
    } catch (error) {
      logger.error('Erro ao buscar materiais recomendados:', error);
      throw error;
    }
  }

  // Criar novo material
  static async create({ 
    nome_material, 
    nivel_conhecimento, 
    id_metodo, 
    id_disciplina, 
    conteudo_texto = null,
    tipo_midia = null,
    caminho_midia = null
  }) {
    try {
      // Validar nível de conhecimento
      const niveisValidos = ['Alto', 'Médio', 'Baixo'];
      if (!niveisValidos.includes(nivel_conhecimento)) {
        throw new Error('Nível de conhecimento inválido');
      }

      const result = await db.query(`
        INSERT INTO Materiais (nome_material, nivel_conhecimento, id_metodo, id_disciplina, conteudo_texto, tipo_midia, caminho_midia) 
        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *
      `, [nome_material, nivel_conhecimento, id_metodo, id_disciplina, conteudo_texto, tipo_midia, caminho_midia]);

      const material = new Material(result.rows[0]);
      logger.info('Material criado com sucesso', { 
        id_material: material.id_material, 
        nome_material: material.nome_material 
      });
      return material;
    } catch (error) {
      logger.error('Erro ao criar material:', error);
      throw error;
    }
  }

  // Atualizar material
  async update(data) {
    try {
      const updates = [];
      const values = [];
      let paramCount = 1;

      if (data.nome_material) {
        updates.push(`nome_material = $${paramCount}`);
        values.push(data.nome_material);
        paramCount++;
      }

      if (data.nivel_conhecimento) {
        const niveisValidos = ['Alto', 'Médio', 'Baixo'];
        if (!niveisValidos.includes(data.nivel_conhecimento)) {
          throw new Error('Nível de conhecimento inválido');
        }
        updates.push(`nivel_conhecimento = $${paramCount}`);
        values.push(data.nivel_conhecimento);
        paramCount++;
      }

      if (data.id_metodo) {
        updates.push(`id_metodo = $${paramCount}`);
        values.push(data.id_metodo);
        paramCount++;
      }

      if (data.id_disciplina) {
        updates.push(`id_disciplina = $${paramCount}`);
        values.push(data.id_disciplina);
        paramCount++;
      }

      if (data.conteudo_texto !== undefined) {
        updates.push(`conteudo_texto = $${paramCount}`);
        values.push(data.conteudo_texto);
        paramCount++;
      }

      if (data.tipo_midia !== undefined) {
        updates.push(`tipo_midia = $${paramCount}`);
        values.push(data.tipo_midia);
        paramCount++;
      }

      if (data.caminho_midia !== undefined) {
        updates.push(`caminho_midia = $${paramCount}`);
        values.push(data.caminho_midia);
        paramCount++;
      }

      if (updates.length === 0) {
        throw new Error('Nenhum campo para atualizar');
      }

      values.push(this.id_material);
      const query = `UPDATE Materiais SET ${updates.join(', ')} WHERE id_material = $${paramCount} RETURNING *`;

      const result = await db.query(query, values);
      
      // Atualizar instância
      Object.assign(this, result.rows[0]);
      
      logger.info('Material atualizado com sucesso', { id_material: this.id_material });
      return this;
    } catch (error) {
      logger.error('Erro ao atualizar material:', error);
      throw error;
    }
  }

  // Deletar material
  async delete() {
    try {
      await db.query('DELETE FROM Materiais WHERE id_material = $1', [this.id_material]);
      logger.info('Material deletado com sucesso', { id_material: this.id_material });
      return true;
    } catch (error) {
      logger.error('Erro ao deletar material:', error);
      throw error;
    }
  }

  // Buscar materiais por filtros
  static async findByFilters(filters) {
    try {
      let query = `
        SELECT m.*, met.nome_metodo, d.nome_disciplina
        FROM Materiais m
        INNER JOIN Metodos met ON m.id_metodo = met.id_metodo
        INNER JOIN Disciplinas d ON m.id_disciplina = d.id_disciplina
        WHERE 1=1
      `;
      const values = [];
      let paramCount = 1;

      if (filters.id_disciplina) {
        query += ` AND m.id_disciplina = $${paramCount}`;
        values.push(filters.id_disciplina);
        paramCount++;
      }

      if (filters.id_metodo) {
        query += ` AND m.id_metodo = $${paramCount}`;
        values.push(filters.id_metodo);
        paramCount++;
      }

      if (filters.nivel_conhecimento) {
        query += ` AND m.nivel_conhecimento = $${paramCount}`;
        values.push(filters.nivel_conhecimento);
        paramCount++;
      }

      if (filters.tipo_midia) {
        query += ` AND m.tipo_midia = $${paramCount}`;
        values.push(filters.tipo_midia);
        paramCount++;
      }

      query += ` ORDER BY m.data_criacao DESC`;

      if (filters.limit) {
        query += ` LIMIT $${paramCount}`;
        values.push(filters.limit);
        paramCount++;
      }

      if (filters.offset) {
        query += ` OFFSET $${paramCount}`;
        values.push(filters.offset);
      }

      const result = await db.query(query, values);
      return result.rows.map(row => new Material(row));
    } catch (error) {
      logger.error('Erro ao buscar materiais por filtros:', error);
      throw error;
    }
  }
}

module.exports = Material;
