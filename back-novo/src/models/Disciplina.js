const db = require('../config/database');
const logger = require('../config/logger');

class Disciplina {
  constructor(data) {
    this.id_disciplina = data.id_disciplina;
    this.nome_disciplina = data.nome_disciplina;
  }

  // Buscar todas as disciplinas
  static async findAll() {
    try {
      const result = await db.query('SELECT * FROM Disciplinas ORDER BY id_disciplina');
      return result.rows.map(row => new Disciplina(row));
    } catch (error) {
      logger.error('Erro ao buscar disciplinas:', error);
      throw error;
    }
  }

  // Buscar disciplina por ID
  static async findById(id_disciplina) {
    try {
      const result = await db.query(
        'SELECT * FROM Disciplinas WHERE id_disciplina = $1',
        [id_disciplina]
      );

      if (result.rows.length === 0) {
        return null;
      }

      return new Disciplina(result.rows[0]);
    } catch (error) {
      logger.error('Erro ao buscar disciplina por ID:', error);
      throw error;
    }
  }

  // Criar nova disciplina
  static async create({ nome_disciplina }) {
    try {
      const result = await db.query(
        'INSERT INTO Disciplinas (nome_disciplina) VALUES ($1) RETURNING *',
        [nome_disciplina]
      );

      const disciplina = new Disciplina(result.rows[0]);
      logger.info('Disciplina criada com sucesso', { id_disciplina: disciplina.id_disciplina, nome_disciplina: disciplina.nome_disciplina });
      return disciplina;
    } catch (error) {
      logger.error('Erro ao criar disciplina:', error);
      throw error;
    }
  }

  // Atualizar disciplina
  async update({ nome_disciplina }) {
    try {
      const result = await db.query(
        'UPDATE Disciplinas SET nome_disciplina = $1 WHERE id_disciplina = $2 RETURNING *',
        [nome_disciplina, this.id_disciplina]
      );

      Object.assign(this, result.rows[0]);
      logger.info('Disciplina atualizada com sucesso', { id_disciplina: this.id_disciplina });
      return this;
    } catch (error) {
      logger.error('Erro ao atualizar disciplina:', error);
      throw error;
    }
  }

  // Deletar disciplina
  async delete() {
    try {
      await db.query('DELETE FROM Disciplinas WHERE id_disciplina = $1', [this.id_disciplina]);
      logger.info('Disciplina deletada com sucesso', { id_disciplina: this.id_disciplina });
      return true;
    } catch (error) {
      logger.error('Erro ao deletar disciplina:', error);
      throw error;
    }
  }

  // Obter estatísticas da disciplina
  async getEstatisticas() {
    try {
      // Contar materiais por nível
      const materiaisResult = await db.query(`
        SELECT nivel_conhecimento, COUNT(*) as total
        FROM Materiais 
        WHERE id_disciplina = $1 
        GROUP BY nivel_conhecimento
      `, [this.id_disciplina]);

      // Contar alunos que acessaram a disciplina
      const alunosResult = await db.query(`
        SELECT COUNT(*) as total_alunos
        FROM DisciplinasAlunos 
        WHERE id_disciplina = $1
      `, [this.id_disciplina]);

      // Contar questões por dificuldade
      const questoesResult = await db.query(`
        SELECT dificuldade, COUNT(*) as total
        FROM Questoes 
        WHERE id_disciplina = $1 
        GROUP BY dificuldade
      `, [this.id_disciplina]);

      return {
        id_disciplina: this.id_disciplina,
        nome_disciplina: this.nome_disciplina,
        materiais_por_nivel: materiaisResult.rows,
        total_alunos: parseInt(alunosResult.rows[0].total_alunos),
        questoes_por_dificuldade: questoesResult.rows
      };
    } catch (error) {
      logger.error('Erro ao obter estatísticas da disciplina:', error);
      throw error;
    }
  }
}

module.exports = Disciplina;
