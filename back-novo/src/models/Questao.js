const db = require('../config/database');
const logger = require('../config/logger');

class Questao {
  constructor(data) {
    this.id_questoes = data.id_questoes;
    this.id_disciplina = data.id_disciplina;
    this.dificuldade = data.dificuldade;
    this.pergunta = data.pergunta;
    this.alternativa_a = data.alternativa_a;
    this.alternativa_b = data.alternativa_b;
    this.alternativa_c = data.alternativa_c;
    this.alternativa_d = data.alternativa_d;
    this.gabarito = data.gabarito;
  }

  // Buscar todas as questões
  static async findAll() {
    try {
      const result = await db.query(`
        SELECT q.*, d.nome_disciplina
        FROM Questoes q
        INNER JOIN Disciplinas d ON q.id_disciplina = d.id_disciplina
        ORDER BY q.id_questoes
      `);
      return result.rows.map(row => new Questao(row));
    } catch (error) {
      logger.error('Erro ao buscar questões:', error);
      throw error;
    }
  }

  // Buscar questão por ID
  static async findById(id_questoes) {
    try {
      const result = await db.query(`
        SELECT q.*, d.nome_disciplina
        FROM Questoes q
        INNER JOIN Disciplinas d ON q.id_disciplina = d.id_disciplina
        WHERE q.id_questoes = $1
      `, [id_questoes]);

      if (result.rows.length === 0) {
        return null;
      }

      return new Questao(result.rows[0]);
    } catch (error) {
      logger.error('Erro ao buscar questão por ID:', error);
      throw error;
    }
  }

  // Buscar questões por disciplina
  static async findByDisciplina(id_disciplina) {
    try {
      const result = await db.query(`
        SELECT q.*, d.nome_disciplina
        FROM Questoes q
        INNER JOIN Disciplinas d ON q.id_disciplina = d.id_disciplina
        WHERE q.id_disciplina = $1
        ORDER BY q.id_questoes
      `, [id_disciplina]);
      return result.rows.map(row => new Questao(row));
    } catch (error) {
      logger.error('Erro ao buscar questões por disciplina:', error);
      throw error;
    }
  }

  // Buscar questões por dificuldade
  static async findByDificuldade(dificuldade) {
    try {
      const result = await db.query(`
        SELECT q.*, d.nome_disciplina
        FROM Questoes q
        INNER JOIN Disciplinas d ON q.id_disciplina = d.id_disciplina
        WHERE q.dificuldade = $1
        ORDER BY q.id_questoes
      `, [dificuldade]);
      return result.rows.map(row => new Questao(row));
    } catch (error) {
      logger.error('Erro ao buscar questões por dificuldade:', error);
      throw error;
    }
  }

  // Buscar questões por disciplina e dificuldade
  static async findByDisciplinaEDificuldade(id_disciplina, dificuldade) {
    try {
      const result = await db.query(`
        SELECT q.*, d.nome_disciplina
        FROM Questoes q
        INNER JOIN Disciplinas d ON q.id_disciplina = d.id_disciplina
        WHERE q.id_disciplina = $1 AND q.dificuldade = $2
        ORDER BY q.id_questoes
      `, [id_disciplina, dificuldade]);
      return result.rows.map(row => new Questao(row));
    } catch (error) {
      logger.error('Erro ao buscar questões por disciplina e dificuldade:', error);
      throw error;
    }
  }

  // Criar nova questão
  static async create({ 
    id_disciplina, 
    dificuldade, 
    pergunta, 
    alternativa_a, 
    alternativa_b, 
    alternativa_c, 
    alternativa_d, 
    gabarito 
  }) {
    try {
      // Validar dificuldade
      const dificuldadesValidas = ['Fácil', 'Médio', 'Difícil'];
      if (!dificuldadesValidas.includes(dificuldade)) {
        throw new Error('Dificuldade inválida');
      }

      // Validar gabarito
      const gabaritosValidos = ['A', 'B', 'C', 'D'];
      if (!gabaritosValidos.includes(gabarito)) {
        throw new Error('Gabarito inválido');
      }

      const result = await db.query(`
        INSERT INTO Questoes (id_disciplina, dificuldade, pergunta, alternativa_a, alternativa_b, alternativa_c, alternativa_d, gabarito) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *
      `, [id_disciplina, dificuldade, pergunta, alternativa_a, alternativa_b, alternativa_c, alternativa_d, gabarito]);

      const questao = new Questao(result.rows[0]);
      logger.info('Questão criada com sucesso', { 
        id_questoes: questao.id_questoes, 
        id_disciplina: questao.id_disciplina 
      });
      return questao;
    } catch (error) {
      logger.error('Erro ao criar questão:', error);
      throw error;
    }
  }

  // Atualizar questão
  async update(data) {
    try {
      const updates = [];
      const values = [];
      let paramCount = 1;

      if (data.id_disciplina) {
        updates.push(`id_disciplina = $${paramCount}`);
        values.push(data.id_disciplina);
        paramCount++;
      }

      if (data.dificuldade) {
        const dificuldadesValidas = ['Fácil', 'Médio', 'Difícil'];
        if (!dificuldadesValidas.includes(data.dificuldade)) {
          throw new Error('Dificuldade inválida');
        }
        updates.push(`dificuldade = $${paramCount}`);
        values.push(data.dificuldade);
        paramCount++;
      }

      if (data.pergunta) {
        updates.push(`pergunta = $${paramCount}`);
        values.push(data.pergunta);
        paramCount++;
      }

      if (data.alternativa_a) {
        updates.push(`alternativa_a = $${paramCount}`);
        values.push(data.alternativa_a);
        paramCount++;
      }

      if (data.alternativa_b) {
        updates.push(`alternativa_b = $${paramCount}`);
        values.push(data.alternativa_b);
        paramCount++;
      }

      if (data.alternativa_c) {
        updates.push(`alternativa_c = $${paramCount}`);
        values.push(data.alternativa_c);
        paramCount++;
      }

      if (data.alternativa_d) {
        updates.push(`alternativa_d = $${paramCount}`);
        values.push(data.alternativa_d);
        paramCount++;
      }

      if (data.gabarito) {
        const gabaritosValidos = ['A', 'B', 'C', 'D'];
        if (!gabaritosValidos.includes(data.gabarito)) {
          throw new Error('Gabarito inválido');
        }
        updates.push(`gabarito = $${paramCount}`);
        values.push(data.gabarito);
        paramCount++;
      }

      if (updates.length === 0) {
        throw new Error('Nenhum campo para atualizar');
      }

      values.push(this.id_questoes);
      const query = `UPDATE Questoes SET ${updates.join(', ')} WHERE id_questoes = $${paramCount} RETURNING *`;

      const result = await db.query(query, values);
      
      // Atualizar instância
      Object.assign(this, result.rows[0]);
      
      logger.info('Questão atualizada com sucesso', { id_questoes: this.id_questoes });
      return this;
    } catch (error) {
      logger.error('Erro ao atualizar questão:', error);
      throw error;
    }
  }

  // Deletar questão
  async delete() {
    try {
      await db.query('DELETE FROM Questoes WHERE id_questoes = $1', [this.id_questoes]);
      logger.info('Questão deletada com sucesso', { id_questoes: this.id_questoes });
      return true;
    } catch (error) {
      logger.error('Erro ao deletar questão:', error);
      throw error;
    }
  }

  // Verificar resposta
  verificarResposta(resposta) {
    return resposta.toUpperCase() === this.gabarito;
  }

  // Obter estatísticas da questão
  async getEstatisticas() {
    try {
      // Aqui você pode implementar lógica para obter estatísticas
      // como número de tentativas, taxa de acerto, etc.
      // Por enquanto, retornando dados básicos
      return {
        id_questoes: this.id_questoes,
        dificuldade: this.dificuldade,
        id_disciplina: this.id_disciplina
      };
    } catch (error) {
      logger.error('Erro ao obter estatísticas da questão:', error);
      throw error;
    }
  }
}

module.exports = Questao;
