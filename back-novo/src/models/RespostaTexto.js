const db = require('../config/database');
const logger = require('../config/logger');

class RespostaTexto {
  constructor(data) {
    this.id_resposta = data.id_resposta;
    this.id_aluno = data.id_aluno;
    this.id_disciplina = data.id_disciplina;
    this.id_material = data.id_material;
    this.modulo = data.modulo;
    this.resposta_texto = data.resposta_texto;
    this.data_resposta = data.data_resposta;
  }

  // Criar nova resposta de texto
  static async create(data) {
    try {
      const query = `
        INSERT INTO RespostasTexto (id_aluno, id_disciplina, id_material, modulo, resposta_texto)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
      `;
      
      const values = [
        data.id_aluno,
        data.id_disciplina,
        data.id_material || null,
        data.modulo,
        data.resposta_texto
      ];

      const result = await db.query(query, values);
      return new RespostaTexto(result.rows[0]);
    } catch (error) {
      logger.error('Erro ao criar resposta de texto:', error);
      throw error;
    }
  }

  // Buscar respostas por aluno e disciplina
  static async findByAlunoDisciplina(id_aluno, id_disciplina) {
    try {
      const query = `
        SELECT rt.*, d.nome_disciplina, m.nome_material
        FROM RespostasTexto rt
        LEFT JOIN Disciplinas d ON rt.id_disciplina = d.id_disciplina
        LEFT JOIN Materiais m ON rt.id_material = m.id_material
        WHERE rt.id_aluno = $1 AND rt.id_disciplina = $2
        ORDER BY rt.data_resposta DESC
      `;
      
      const result = await db.query(query, [id_aluno, id_disciplina]);
      return result.rows.map(row => new RespostaTexto(row));
    } catch (error) {
      logger.error('Erro ao buscar respostas por aluno e disciplina:', error);
      throw error;
    }
  }

  // Buscar resposta por ID
  static async findById(id_resposta) {
    try {
      const query = `
        SELECT rt.*, d.nome_disciplina, m.nome_material, a.nome_aluno
        FROM RespostasTexto rt
        LEFT JOIN Disciplinas d ON rt.id_disciplina = d.id_disciplina
        LEFT JOIN Materiais m ON rt.id_material = m.id_material
        LEFT JOIN Alunos a ON rt.id_aluno = a.id_aluno
        WHERE rt.id_resposta = $1
      `;
      
      const result = await db.query(query, [id_resposta]);
      return result.rows.length > 0 ? new RespostaTexto(result.rows[0]) : null;
    } catch (error) {
      logger.error('Erro ao buscar resposta por ID:', error);
      throw error;
    }
  }

  // Atualizar resposta
  async update(data) {
    try {
      const query = `
        UPDATE RespostasTexto 
        SET resposta_texto = $1, data_resposta = CURRENT_TIMESTAMP
        WHERE id_resposta = $2
        RETURNING *
      `;
      
      const result = await db.query(query, [data.resposta_texto, this.id_resposta]);
      
      if (result.rows.length > 0) {
        Object.assign(this, result.rows[0]);
        return this;
      }
      
      throw new Error('Resposta não encontrada');
    } catch (error) {
      logger.error('Erro ao atualizar resposta:', error);
      throw error;
    }
  }

  // Deletar resposta
  async delete() {
    try {
      const query = 'DELETE FROM RespostasTexto WHERE id_resposta = $1';
      await db.query(query, [this.id_resposta]);
      return true;
    } catch (error) {
      logger.error('Erro ao deletar resposta:', error);
      throw error;
    }
  }

  // Buscar todas as respostas de um aluno
  static async findByAluno(id_aluno) {
    try {
      const query = `
        SELECT rt.*, d.nome_disciplina, m.nome_material
        FROM RespostasTexto rt
        LEFT JOIN Disciplinas d ON rt.id_disciplina = d.id_disciplina
        LEFT JOIN Materiais m ON rt.id_material = m.id_material
        WHERE rt.id_aluno = $1
        ORDER BY rt.data_resposta DESC
      `;
      
      const result = await db.query(query, [id_aluno]);
      return result.rows.map(row => new RespostaTexto(row));
    } catch (error) {
      logger.error('Erro ao buscar respostas do aluno:', error);
      throw error;
    }
  }
}

module.exports = RespostaTexto;
