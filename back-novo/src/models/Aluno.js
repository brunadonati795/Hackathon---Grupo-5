const db = require('../config/database');
const bcrypt = require('bcryptjs');
const logger = require('../config/logger');

class Aluno {
  constructor(data) {
    this.id_aluno = data.id_aluno;
    this.email = data.email;
    this.senha = data.senha;
    this.nome_aluno = data.nome_aluno;
    this.data_ingressao = data.data_ingressao;
  }

  // Criar novo aluno
  static async create({ email, senha, nome_aluno }) {
    try {
      // Verificar se email já existe
      const existingAluno = await db.query(
        'SELECT id_aluno FROM Alunos WHERE email = $1',
        [email]
      );

      if (existingAluno.rows.length > 0) {
        throw new Error('Email já cadastrado');
      }

      // Criptografar senha
      const saltRounds = parseInt(process.env.BCRYPT_ROUNDS) || 12;
      const senhaHash = await bcrypt.hash(senha, saltRounds);

      // Inserir aluno
      const result = await db.query(
        'INSERT INTO Alunos (email, senha, nome_aluno) VALUES ($1, $2, $3) RETURNING *',
        [email, senhaHash, nome_aluno]
      );

      const aluno = new Aluno(result.rows[0]);
      logger.info('Aluno criado com sucesso', { id_aluno: aluno.id_aluno, email: aluno.email });
      return aluno;
    } catch (error) {
      logger.error('Erro ao criar aluno:', error);
      throw error;
    }
  }

  // Buscar aluno por email
  static async findByEmail(email) {
    try {
      const result = await db.query(
        'SELECT * FROM Alunos WHERE email = $1',
        [email]
      );

      if (result.rows.length === 0) {
        return null;
      }

      return new Aluno(result.rows[0]);
    } catch (error) {
      logger.error('Erro ao buscar aluno por email:', error);
      throw error;
    }
  }

  // Buscar aluno por ID
  static async findById(id_aluno) {
    try {
      const result = await db.query(
        'SELECT * FROM Alunos WHERE id_aluno = $1',
        [id_aluno]
      );

      if (result.rows.length === 0) {
        return null;
      }

      return new Aluno(result.rows[0]);
    } catch (error) {
      logger.error('Erro ao buscar aluno por ID:', error);
      throw error;
    }
  }

  // Verificar senha
  async verificarSenha(senha) {
    try {
      return await bcrypt.compare(senha, this.senha);
    } catch (error) {
      logger.error('Erro ao verificar senha:', error);
      throw error;
    }
  }

  // Atualizar dados do aluno
  async update(data) {
    try {
      const updates = [];
      const values = [];
      let paramCount = 1;

      if (data.nome_aluno) {
        updates.push(`nome_aluno = $${paramCount}`);
        values.push(data.nome_aluno);
        paramCount++;
      }

      if (data.senha) {
        const saltRounds = parseInt(process.env.BCRYPT_ROUNDS) || 12;
        const senhaHash = await bcrypt.hash(data.senha, saltRounds);
        updates.push(`senha = $${paramCount}`);
        values.push(senhaHash);
        paramCount++;
      }

      if (updates.length === 0) {
        throw new Error('Nenhum campo para atualizar');
      }

      values.push(this.id_aluno);
      const query = `UPDATE Alunos SET ${updates.join(', ')} WHERE id_aluno = $${paramCount} RETURNING *`;

      const result = await db.query(query, values);
      
      // Atualizar instância
      Object.assign(this, result.rows[0]);
      
      logger.info('Aluno atualizado com sucesso', { id_aluno: this.id_aluno });
      return this;
    } catch (error) {
      logger.error('Erro ao atualizar aluno:', error);
      throw error;
    }
  }

  // Deletar aluno
  async delete() {
    try {
      await db.query('DELETE FROM Alunos WHERE id_aluno = $1', [this.id_aluno]);
      logger.info('Aluno deletado com sucesso', { id_aluno: this.id_aluno });
      return true;
    } catch (error) {
      logger.error('Erro ao deletar aluno:', error);
      throw error;
    }
  }

  // Obter perfil completo do aluno
  async getPerfilCompleto() {
    try {
      // Buscar métodos de aprendizagem do aluno
      const metodosResult = await db.query(`
        SELECT m.id_metodo, m.nome_metodo
        FROM Metodos m
        INNER JOIN MetodosAlunos ma ON m.id_metodo = ma.id_metodo
        WHERE ma.id_aluno = $1
      `, [this.id_aluno]);

      // Buscar disciplinas e níveis do aluno
      const disciplinasResult = await db.query(`
        SELECT d.id_disciplina, d.nome_disciplina, da.conhecimento_aluno
        FROM Disciplinas d
        INNER JOIN DisciplinasAlunos da ON d.id_disciplina = da.id_disciplina
        WHERE da.id_aluno = $1
      `, [this.id_aluno]);

      return {
        id_aluno: this.id_aluno,
        email: this.email,
        nome_aluno: this.nome_aluno,
        data_ingressao: this.data_ingressao,
        metodos_aprendizagem: metodosResult.rows,
        disciplinas: disciplinasResult.rows
      };
    } catch (error) {
      logger.error('Erro ao obter perfil completo do aluno:', error);
      throw error;
    }
  }

  // Verificar se aluno respondeu questionário de métodos
  async temMetodosAprendizagem() {
    try {
      const result = await db.query(
        'SELECT COUNT(*) as count FROM MetodosAlunos WHERE id_aluno = $1',
        [this.id_aluno]
      );
      return parseInt(result.rows[0].count) > 0;
    } catch (error) {
      logger.error('Erro ao verificar métodos de aprendizagem:', error);
      throw error;
    }
  }

  // Verificar se aluno tem nível definido para disciplina
  async temNivelDisciplina(id_disciplina) {
    try {
      const result = await db.query(
        'SELECT COUNT(*) as count FROM DisciplinasAlunos WHERE id_aluno = $1 AND id_disciplina = $2',
        [this.id_aluno, id_disciplina]
      );
      return parseInt(result.rows[0].count) > 0;
    } catch (error) {
      logger.error('Erro ao verificar nível da disciplina:', error);
      throw error;
    }
  }
}

module.exports = Aluno;
