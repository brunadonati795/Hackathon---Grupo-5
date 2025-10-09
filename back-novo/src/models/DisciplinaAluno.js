const db = require('../config/database');
const logger = require('../config/logger');

class DisciplinaAluno {
  constructor(data) {
    this.id_disciplina = data.id_disciplina;
    this.id_aluno = data.id_aluno;
    this.conhecimento_aluno = data.conhecimento_aluno;
  }

  // Associar disciplina ao aluno com nível de conhecimento
  static async create({ id_disciplina, id_aluno, conhecimento_aluno }) {
    try {
      // Validar nível de conhecimento
      const niveisValidos = ['Alto', 'Médio', 'Baixo'];
      if (!niveisValidos.includes(conhecimento_aluno)) {
        throw new Error('Nível de conhecimento inválido');
      }

      // Verificar se associação já existe
      const existing = await db.query(
        'SELECT * FROM DisciplinasAlunos WHERE id_disciplina = $1 AND id_aluno = $2',
        [id_disciplina, id_aluno]
      );

      if (existing.rows.length > 0) {
        // Atualizar nível existente
        const result = await db.query(
          'UPDATE DisciplinasAlunos SET conhecimento_aluno = $1 WHERE id_disciplina = $2 AND id_aluno = $3 RETURNING *',
          [conhecimento_aluno, id_disciplina, id_aluno]
        );
        logger.info('Nível de conhecimento atualizado com sucesso', { 
          id_disciplina, 
          id_aluno, 
          conhecimento_aluno 
        });
        return new DisciplinaAluno(result.rows[0]);
      } else {
        // Criar nova associação
        const result = await db.query(
          'INSERT INTO DisciplinasAlunos (id_disciplina, id_aluno, conhecimento_aluno) VALUES ($1, $2, $3) RETURNING *',
          [id_disciplina, id_aluno, conhecimento_aluno]
        );
        logger.info('Disciplina associada ao aluno com sucesso', { 
          id_disciplina, 
          id_aluno, 
          conhecimento_aluno 
        });
        return new DisciplinaAluno(result.rows[0]);
      }
    } catch (error) {
      logger.error('Erro ao associar disciplina ao aluno:', error);
      throw error;
    }
  }

  // Buscar disciplinas do aluno
  static async findByAluno(id_aluno) {
    try {
      const result = await db.query(`
        SELECT da.*, d.nome_disciplina
        FROM DisciplinasAlunos da
        INNER JOIN Disciplinas d ON da.id_disciplina = d.id_disciplina
        WHERE da.id_aluno = $1
        ORDER BY d.nome_disciplina
      `, [id_aluno]);
      return result.rows.map(row => new DisciplinaAluno(row));
    } catch (error) {
      logger.error('Erro ao buscar disciplinas do aluno:', error);
      throw error;
    }
  }

  // Buscar nível de conhecimento do aluno em uma disciplina
  static async findByAlunoEDisciplina(id_aluno, id_disciplina) {
    try {
      const result = await db.query(`
        SELECT da.*, d.nome_disciplina
        FROM DisciplinasAlunos da
        INNER JOIN Disciplinas d ON da.id_disciplina = d.id_disciplina
        WHERE da.id_aluno = $1 AND da.id_disciplina = $2
      `, [id_aluno, id_disciplina]);

      if (result.rows.length === 0) {
        return null;
      }

      return new DisciplinaAluno(result.rows[0]);
    } catch (error) {
      logger.error('Erro ao buscar nível do aluno na disciplina:', error);
      throw error;
    }
  }

  // Atualizar nível de conhecimento
  async updateNivel(conhecimento_aluno) {
    try {
      // Validar nível de conhecimento
      const niveisValidos = ['Alto', 'Médio', 'Baixo'];
      if (!niveisValidos.includes(conhecimento_aluno)) {
        throw new Error('Nível de conhecimento inválido');
      }

      const result = await db.query(
        'UPDATE DisciplinasAlunos SET conhecimento_aluno = $1 WHERE id_disciplina = $2 AND id_aluno = $3 RETURNING *',
        [conhecimento_aluno, this.id_disciplina, this.id_aluno]
      );

      this.conhecimento_aluno = conhecimento_aluno;
      logger.info('Nível de conhecimento atualizado com sucesso', { 
        id_disciplina: this.id_disciplina, 
        id_aluno: this.id_aluno, 
        conhecimento_aluno 
      });
      return this;
    } catch (error) {
      logger.error('Erro ao atualizar nível de conhecimento:', error);
      throw error;
    }
  }

  // Remover disciplina do aluno
  static async remove({ id_disciplina, id_aluno }) {
    try {
      const result = await db.query(
        'DELETE FROM DisciplinasAlunos WHERE id_disciplina = $1 AND id_aluno = $2 RETURNING *',
        [id_disciplina, id_aluno]
      );

      if (result.rows.length === 0) {
        throw new Error('Associação não encontrada');
      }

      logger.info('Disciplina removida do aluno com sucesso', { id_disciplina, id_aluno });
      return true;
    } catch (error) {
      logger.error('Erro ao remover disciplina do aluno:', error);
      throw error;
    }
  }

  // Remover todas as disciplinas do aluno
  static async removeAllByAluno(id_aluno) {
    try {
      await db.query(
        'DELETE FROM DisciplinasAlunos WHERE id_aluno = $1',
        [id_aluno]
      );

      logger.info('Todas as disciplinas removidas do aluno com sucesso', { id_aluno });
      return true;
    } catch (error) {
      logger.error('Erro ao remover todas as disciplinas do aluno:', error);
      throw error;
    }
  }

  // Verificar se aluno tem nível definido para disciplina
  static async alunoTemNivelDisciplina(id_aluno, id_disciplina) {
    try {
      const result = await db.query(
        'SELECT COUNT(*) as count FROM DisciplinasAlunos WHERE id_aluno = $1 AND id_disciplina = $2',
        [id_aluno, id_disciplina]
      );
      return parseInt(result.rows[0].count) > 0;
    } catch (error) {
      logger.error('Erro ao verificar nível do aluno na disciplina:', error);
      throw error;
    }
  }

  // Obter estatísticas por disciplina
  static async getEstatisticasPorDisciplina(id_disciplina) {
    try {
      const result = await db.query(`
        SELECT 
          conhecimento_aluno,
          COUNT(*) as total_alunos
        FROM DisciplinasAlunos 
        WHERE id_disciplina = $1 
        GROUP BY conhecimento_aluno
        ORDER BY conhecimento_aluno
      `, [id_disciplina]);
      return result.rows;
    } catch (error) {
      logger.error('Erro ao obter estatísticas da disciplina:', error);
      throw error;
    }
  }
}

module.exports = DisciplinaAluno;
