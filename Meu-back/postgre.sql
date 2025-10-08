CREATE DATABASE educandos;
\c educandos;

CREATE TABLE Alunos(
	id_aluno GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	data_ingressao DATE DEFAULT CURRENT_DATE,
	nome_aluno VARCHAR(100) NOT NULL
);


CREATE TABLE Metodos(
	id_metodo GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	nome_metodo VARCHAR(100) NOT NULL
);


CREATE TABLE Disciplinas(
	id_disciplina GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	nome_disciplina VARCHAR(100) NOT NULL
);


CREATE TABLE Materiais(
	id_material GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	nome_material VARCHAR(100) NOT NULL,
	data_criacao DATE DEFAULT CURRENT_DATE,
	nivel_conhecimento VARCHAR(10) NOT NULL 
	CHECK (nivel_conhecimento IN ('Alto', 'Médio', 'Baixo')),
	id_metodo INTEGER NOT NULL,
	id_disciplina INTEGER NOT NULL,
	CONSTRAINT fk_metodos1
		FOREIGN KEY (id_metodo)
		REFERENCES Metodos(id_metodo)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
	CONSTRAINT fk_disciplinas1
		FOREIGN KEY (id_disciplina)
		REFERENCES Disciplinas(id_disciplina)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);


CREATE TABLE DisciplinasAlunos(
	conhecimento_aluno VARCHAR(10) NOT NULL
	CHECK (conhecimento_aluno IN ('Alto', 'Médio', 'Baixo')),
	id_disciplina INTEGER,
	id_aluno INTEGER,
	CONSTRAINT fk_disciplinas2
		FOREIGN KEY (id_disciplina)
		REFERENCES Disciplinas(id_disciplina)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
	CONSTRAINT fk_alunos1
		FOREIGN KEY (id_aluno)
		REFERENCES Alunos(id_aluno)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
	PRIMARY KEY(id_disciplina, id_aluno)
);


CREATE TABLE MetodosAlunos(
	id_metodo INTEGER,
	id_aluno INTEGER,
	CONSTRAINT fk_metodos2
		FOREIGN KEY (id_metodo)
		REFERENCES Metodos(id_metodo)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
	CONSTRAINT fk_alunos2
		FOREIGN KEY (id_aluno)
		REFERENCES Alunos(id_aluno)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
	PRIMARY KEY(id_metodo, id_aluno)
);

CREATE TABLE Questoes(
    id_questoes GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_disciplina INTEGER,
    dificuldade VARCHAR(10) CHECK (dificuldade IN ('Fácil', 'Médio', 'Difícil')),
    CONSTRAINT fk_disciplinas3
		FOREIGN KEY (id_disciplina)
		REFERENCES Disciplinas(id_disciplina)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
    pergunta TEXT NOT NULL,
    alternativa_a TEXT NOT NULL,
    alternativa_b TEXT NOT NULL,
    alternativa_c TEXT NOT NULL,
    alternativa_d TEXT NOT NULL,
    gabarito CHAR(1) NOT NULL 
    CHECK (gabarito IN ('A', 'B', 'C', 'D'))
);