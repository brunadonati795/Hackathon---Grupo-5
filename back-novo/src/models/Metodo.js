const db = require('../config/database');
const logger = require('../config/logger');

class Metodo {
  constructor(data) {
    this.id_metodo = data.id_metodo;
    this.nome_metodo = data.nome_metodo;
  }

  // Buscar todos os métodos
  static async findAll() {
    try {
      const result = await db.query('SELECT * FROM Metodos ORDER BY id_metodo');
      return result.rows.map(row => new Metodo(row));
    } catch (error) {
      logger.error('Erro ao buscar métodos:', error);
      throw error;
    }
  }

  // Buscar método por ID
  static async findById(id_metodo) {
    try {
      const result = await db.query(
        'SELECT * FROM Metodos WHERE id_metodo = $1',
        [id_metodo]
      );

      if (result.rows.length === 0) {
        return null;
      }

      return new Metodo(result.rows[0]);
    } catch (error) {
      logger.error('Erro ao buscar método por ID:', error);
      throw error;
    }
  }

  // Criar novo método
  static async create({ nome_metodo }) {
    try {
      const result = await db.query(
        'INSERT INTO Metodos (nome_metodo) VALUES ($1) RETURNING *',
        [nome_metodo]
      );

      const metodo = new Metodo(result.rows[0]);
      logger.info('Método criado com sucesso', { id_metodo: metodo.id_metodo, nome_metodo: metodo.nome_metodo });
      return metodo;
    } catch (error) {
      logger.error('Erro ao criar método:', error);
      throw error;
    }
  }

  // Atualizar método
  async update({ nome_metodo }) {
    try {
      const result = await db.query(
        'UPDATE Metodos SET nome_metodo = $1 WHERE id_metodo = $2 RETURNING *',
        [nome_metodo, this.id_metodo]
      );

      Object.assign(this, result.rows[0]);
      logger.info('Método atualizado com sucesso', { id_metodo: this.id_metodo });
      return this;
    } catch (error) {
      logger.error('Erro ao atualizar método:', error);
      throw error;
    }
  }

  // Deletar método
  async delete() {
    try {
      await db.query('DELETE FROM Metodos WHERE id_metodo = $1', [this.id_metodo]);
      logger.info('Método deletado com sucesso', { id_metodo: this.id_metodo });
      return true;
    } catch (error) {
      logger.error('Erro ao deletar método:', error);
      throw error;
    }
  }
}

module.exports = Metodo;
