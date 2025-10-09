const db = require('../config/database');
const logger = require('../config/logger');

class MetodoAluno {
  constructor(data) {
    this.id_metodo = data.id_metodo;
    this.id_aluno = data.id_aluno;
  }

  // Associar método ao aluno
  static async create({ id_metodo, id_aluno }) {
    try {
      // Verificar se associação já existe
      const existing = await db.query(
        'SELECT * FROM MetodosAlunos WHERE id_metodo = $1 AND id_aluno = $2',
        [id_metodo, id_aluno]
      );

      if (existing.rows.length > 0) {
        throw new Error('Método já associado ao aluno');
      }

      const result = await db.query(
        'INSERT INTO MetodosAlunos (id_metodo, id_aluno) VALUES ($1, $2) RETURNING *',
        [id_metodo, id_aluno]
      );

      const metodoAluno = new MetodoAluno(result.rows[0]);
      logger.info('Método associado ao aluno com sucesso', { 
        id_metodo: metodoAluno.id_metodo, 
        id_aluno: metodoAluno.id_aluno 
      });
      return metodoAluno;
    } catch (error) {
      logger.error('Erro ao associar método ao aluno:', error);
      throw error;
    }
  }

  // Buscar métodos do aluno
  static async findByAluno(id_aluno) {
    try {
      const result = await db.query(`
        SELECT ma.*, m.nome_metodo
        FROM MetodosAlunos ma
        INNER JOIN Metodos m ON ma.id_metodo = m.id_metodo
        WHERE ma.id_aluno = $1
        ORDER BY m.nome_metodo
      `, [id_aluno]);
      return result.rows.map(row => new MetodoAluno(row));
    } catch (error) {
      logger.error('Erro ao buscar métodos do aluno:', error);
      throw error;
    }
  }

  // Remover método do aluno
  static async remove({ id_metodo, id_aluno }) {
    try {
      const result = await db.query(
        'DELETE FROM MetodosAlunos WHERE id_metodo = $1 AND id_aluno = $2 RETURNING *',
        [id_metodo, id_aluno]
      );

      if (result.rows.length === 0) {
        throw new Error('Associação não encontrada');
      }

      logger.info('Método removido do aluno com sucesso', { id_metodo, id_aluno });
      return true;
    } catch (error) {
      logger.error('Erro ao remover método do aluno:', error);
      throw error;
    }
  }

  // Remover todos os métodos do aluno
  static async removeAllByAluno(id_aluno) {
    try {
      await db.query(
        'DELETE FROM MetodosAlunos WHERE id_aluno = $1',
        [id_aluno]
      );

      logger.info('Todos os métodos removidos do aluno com sucesso', { id_aluno });
      return true;
    } catch (error) {
      logger.error('Erro ao remover todos os métodos do aluno:', error);
      throw error;
    }
  }

  // Atualizar métodos do aluno (substitui todos os métodos)
  static async updateMetodosAluno(id_aluno, metodos_ids) {
    const client = await db.getClient();
    
    try {
      await client.query('BEGIN');

      // Remover todos os métodos atuais
      await client.query(
        'DELETE FROM MetodosAlunos WHERE id_aluno = $1',
        [id_aluno]
      );

      // Adicionar novos métodos
      for (const id_metodo of metodos_ids) {
        await client.query(
          'INSERT INTO MetodosAlunos (id_metodo, id_aluno) VALUES ($1, $2)',
          [id_metodo, id_aluno]
        );
      }

      await client.query('COMMIT');
      logger.info('Métodos do aluno atualizados com sucesso', { id_aluno, metodos_ids });
      return true;
    } catch (error) {
      await client.query('ROLLBACK');
      logger.error('Erro ao atualizar métodos do aluno:', error);
      throw error;
    } finally {
      client.release();
    }
  }

  // Verificar se aluno tem métodos associados
  static async alunoTemMetodos(id_aluno) {
    try {
      const result = await db.query(
        'SELECT COUNT(*) as count FROM MetodosAlunos WHERE id_aluno = $1',
        [id_aluno]
      );
      return parseInt(result.rows[0].count) > 0;
    } catch (error) {
      logger.error('Erro ao verificar métodos do aluno:', error);
      throw error;
    }
  }
}

module.exports = MetodoAluno;
