# 🚀 Instruções Rápidas - Educandos API

## ⚡ Setup Rápido

### 1. Instalar Dependências
```bash
npm install
```

### 2. Configurar Banco de Dados PostgreSQL
```sql
-- Conectar como postgres
psql -U postgres

-- Criar banco
CREATE DATABASE educandos;

-- Criar usuário (opcional)
CREATE USER educandos_user WITH PASSWORD '123456';
GRANT ALL PRIVILEGES ON DATABASE educandos TO educandos_user;
```

### 3. Executar Migração do Banco
```bash
npm run migrate
```

### 4. Iniciar Servidor
```bash
npm run dev
```

## 🔧 Configurações do Banco

**Credenciais padrão:**
- Host: `localhost`
- Port: `5432`
- Database: `educandos`
- User: `postgres`
- Password: `123456`

## 🧪 Testar API

### Health Check
```bash
curl http://localhost:3000/api/health
```

### Cadastrar Aluno
```bash
curl -X POST http://localhost:3000/api/alunos/cadastrar \
  -H "Content-Type: application/json" \
  -d '{
    "email": "teste@exemplo.com",
    "senha": "MinhaSenh@123",
    "nome_aluno": "João Silva"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/api/alunos/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "teste@exemplo.com",
    "senha": "MinhaSenh@123"
  }'
```

## 📚 Endpoints Principais

- **Health:** `GET /api/health`
- **Info:** `GET /api/info`
- **Cadastro:** `POST /api/alunos/cadastrar`
- **Login:** `POST /api/alunos/login`
- **Métodos:** `GET /api/metodos`
- **Disciplinas:** `GET /api/disciplinas`

## 🐛 Solução de Problemas

### Erro de Conexão com Banco
1. Verificar se PostgreSQL está rodando
2. Verificar credenciais no arquivo `.env`
3. Verificar se o banco `educandos` existe

### Erro de Middleware
- O erro foi corrigido na versão atual
- Execute `npm install` novamente se necessário

### Porta em Uso
- Altere a porta no arquivo `.env`: `PORT=3001`

## 📞 Suporte

Se houver problemas, verifique:
1. Se todas as dependências foram instaladas
2. Se o PostgreSQL está rodando
3. Se as credenciais estão corretas
4. Se os diretórios `uploads/` e `logs/` foram criados
