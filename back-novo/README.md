# Educandos API

API back-end para sistema educacional adaptativo que personaliza o aprendizado baseado nos métodos de aprendizagem preferidos do aluno e seu nível de conhecimento em cada disciplina.

## 🚀 Funcionalidades

### ✅ Requisitos Funcionais Implementados

- **RF01** - Questionário de Métodos de Aprendizagem
- **RF02** - Avaliação de Nível por Disciplina  
- **RF03** - Consulta de Perfil do Aluno
- **RF04** - Recomendação Personalizada de Conteúdo
- **RF05** - Gestão de Disciplinas
- **RF06** - Criação de Conteúdos Didáticos
- **RF07** - Visualização de Materiais Filtrados
- **RF08** - Atualização de Perfil do Aluno
- **RF09** - Autenticação de Usuários
- **RF10** - Cadastro de Novos Alunos
- **RF11** - Gestão de Questões/Exercícios

### 🔒 Recursos de Segurança

- Autenticação JWT com expiração configurável
- Criptografia de senhas com bcrypt (12 rounds)
- Rate limiting para endpoints de autenticação
- Validação e sanitização de entrada
- Headers de segurança (Helmet)
- Proteção contra SQL Injection
- CORS configurado

## 🛠️ Tecnologias

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **PostgreSQL** - Banco de dados
- **JWT** - Autenticação
- **bcryptjs** - Criptografia de senhas
- **Multer** - Upload de arquivos
- **Winston** - Logging
- **Jest** - Testes

## 📋 Pré-requisitos

- Node.js 16+ 
- PostgreSQL 12+
- npm ou yarn

## 🚀 Instalação

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd back-novo
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
cp env.example .env
```

Edite o arquivo `.env` com suas configurações:
```env
# Banco de Dados
DB_HOST=localhost
DB_PORT=5432
DB_NAME=educandos
DB_USER=postgres
DB_PASSWORD=sua_senha

# Segurança
JWT_SECRET=sua_chave_secreta_muito_segura
JWT_EXPIRES_IN=30m
BCRYPT_ROUNDS=12

# Servidor
PORT=3000
NODE_ENV=development
```

4. **Configure o banco de dados**
```bash
# Execute o script SQL para criar o banco
psql -U postgres -f modelo.sql
```

5. **Inicie o servidor**
```bash
# Desenvolvimento
npm run dev

# Produção
npm start
```

## 📚 Documentação da API

### Base URL
```
http://localhost:3000/api
```

### Endpoints Principais

#### 🔐 Autenticação
```http
POST /api/alunos/cadastrar
POST /api/alunos/login
GET  /api/alunos/perfil
```

#### 👤 Alunos
```http
GET    /api/alunos/perfil
PUT    /api/alunos/perfil
DELETE /api/alunos/conta
GET    /api/alunos/estatisticas
```

#### 🎯 Métodos de Aprendizagem
```http
GET  /api/metodos
POST /api/metodos/associar-aluno
GET  /api/metodos/aluno/metodos
```

#### 📚 Disciplinas
```http
GET  /api/disciplinas
POST /api/disciplinas/:id/nivel-aluno
GET  /api/disciplinas/:id/materiais-recomendados
```

#### 📖 Materiais
```http
GET  /api/materiais
POST /api/materiais
GET  /api/materiais/disciplina/:id
```

#### ❓ Questões
```http
GET  /api/questoes
POST /api/questoes
GET  /api/questoes/quiz/gerar
POST /api/questoes/:id/verificar-resposta
```

### Exemplos de Uso

#### 1. Cadastro de Aluno
```bash
curl -X POST http://localhost:3000/api/alunos/cadastrar \
  -H "Content-Type: application/json" \
  -d '{
    "email": "aluno@exemplo.com",
    "senha": "MinhaSenh@123",
    "nome_aluno": "João Silva"
  }'
```

#### 2. Login
```bash
curl -X POST http://localhost:3000/api/alunos/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "aluno@exemplo.com",
    "senha": "MinhaSenh@123"
  }'
```

#### 3. Definir Métodos de Aprendizagem
```bash
curl -X POST http://localhost:3000/api/metodos/associar-aluno \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN" \
  -d '{
    "metodos_ids": [1, 3, 5]
  }'
```

#### 4. Definir Nível em Disciplina
```bash
curl -X POST http://localhost:3000/api/disciplinas/1/nivel-aluno \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN" \
  -d '{
    "conhecimento_aluno": "Médio"
  }'
```

#### 5. Obter Materiais Recomendados
```bash
curl -X GET http://localhost:3000/api/disciplinas/1/materiais-recomendados \
  -H "Authorization: Bearer SEU_TOKEN"
```

## 🏗️ Estrutura do Projeto

```
src/
├── config/
│   ├── database.js      # Configuração do banco
│   └── logger.js        # Configuração de logs
├── controllers/
│   ├── AlunoController.js
│   ├── MetodoController.js
│   ├── DisciplinaController.js
│   ├── MaterialController.js
│   └── QuestaoController.js
├── middleware/
│   ├── auth.js          # Autenticação JWT
│   ├── security.js      # Middlewares de segurança
│   ├── validation.js    # Validações de entrada
│   └── errorHandler.js  # Tratamento de erros
├── models/
│   ├── Aluno.js
│   ├── Metodo.js
│   ├── Disciplina.js
│   ├── Material.js
│   ├── Questao.js
│   ├── MetodoAluno.js
│   └── DisciplinaAluno.js
├── routes/
│   ├── index.js
│   ├── alunos.js
│   ├── metodos.js
│   ├── disciplinas.js
│   ├── materiais.js
│   └── questoes.js
└── server.js            # Servidor principal
```

## 🔧 Scripts Disponíveis

```bash
npm start          # Inicia o servidor
npm run dev        # Inicia em modo desenvolvimento
npm test           # Executa os testes
npm run migrate    # Executa migrações do banco
```

## 🧪 Testes

```bash
# Executar todos os testes
npm test

# Executar testes com cobertura
npm run test:coverage

# Executar testes em modo watch
npm run test:watch
```

## 📊 Monitoramento

### Health Check
```http
GET /api/health
```

### Informações da API
```http
GET /api/info
```

### Logs
Os logs são salvos em:
- `logs/error.log` - Apenas erros
- `logs/combined.log` - Todos os logs

## 🔒 Segurança

### Headers de Segurança
- Content Security Policy
- X-Frame-Options
- X-Content-Type-Options
- Strict-Transport-Security

### Rate Limiting
- Autenticação: 5 tentativas/minuto
- Geral: 100 requisições/minuto

### Validações
- Sanitização de entrada
- Validação de tipos de dados
- Verificação de tamanho de payload
- Validação de arquivos de upload

## 🚀 Deploy

### Docker
```bash
# Build da imagem
docker build -t educandos-api .

# Executar container
docker run -p 3000:3000 educandos-api
```

### Variáveis de Ambiente para Produção
```env
NODE_ENV=production
DB_HOST=seu_host_producao
DB_PASSWORD=senha_segura_producao
JWT_SECRET=chave_super_secreta_producao
```

## 📈 Performance

### Otimizações Implementadas
- Compressão gzip/brotli
- Rate limiting
- Índices otimizados no banco
- Pool de conexões PostgreSQL
- Cache de consultas frequentes

### Métricas de Performance
- Tempo de resposta: < 2s
- Login: < 1s
- Consulta de perfil: < 500ms
- Filtragem de materiais: < 1.5s

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👥 Equipe

- **Grupo 5** - Hackathon Educacional

## 📞 Suporte

Para dúvidas ou suporte, entre em contato através dos issues do repositório.
