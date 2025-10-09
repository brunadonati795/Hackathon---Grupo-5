-- Tabela para armazenar respostas de texto dos usuários
CREATE TABLE IF NOT EXISTS RespostasTexto (
  id_resposta SERIAL PRIMARY KEY,
  id_aluno INTEGER NOT NULL,
  id_disciplina INTEGER NOT NULL,
  id_material INTEGER,
  modulo VARCHAR(100) NOT NULL,
  resposta_texto TEXT NOT NULL,
  data_resposta TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_aluno_resposta FOREIGN KEY (id_aluno) REFERENCES Alunos(id_aluno) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_disciplina_resposta FOREIGN KEY (id_disciplina) REFERENCES Disciplinas(id_disciplina) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_material_resposta FOREIGN KEY (id_material) REFERENCES Materiais(id_material) ON DELETE SET NULL ON UPDATE CASCADE
);

-- Índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_respostas_aluno ON RespostasTexto(id_aluno);
CREATE INDEX IF NOT EXISTS idx_respostas_disciplina ON RespostasTexto(id_disciplina);
CREATE INDEX IF NOT EXISTS idx_respostas_data ON RespostasTexto(data_resposta);
