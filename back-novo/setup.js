const fs = require('fs');
const path = require('path');

console.log('🚀 Configurando projeto Educandos API...\n');

// Verificar se .env existe, se não, copiar do exemplo
if (!fs.existsSync('.env')) {
  console.log('📝 Criando arquivo .env...');
  fs.copyFileSync('env.example', '.env');
  console.log('✅ Arquivo .env criado com sucesso!');
} else {
  console.log('✅ Arquivo .env já existe');
}

// Criar diretórios necessários
const directories = ['uploads', 'logs'];

directories.forEach(dir => {
  if (!fs.existsSync(dir)) {
    console.log(`📁 Criando diretório ${dir}...`);
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✅ Diretório ${dir} criado!`);
  } else {
    console.log(`✅ Diretório ${dir} já existe`);
  }
});

console.log('\n🎉 Configuração concluída!');
console.log('\n📋 Próximos passos:');
console.log('1. Configure o PostgreSQL com as credenciais:');
console.log('   - Host: localhost');
console.log('   - Port: 5432');
console.log('   - Database: educandos');
console.log('   - User: postgres');
console.log('   - Password: 123456');
console.log('\n2. Execute o banco de dados:');
console.log('   npm run migrate');
console.log('\n3. Inicie o servidor:');
console.log('   npm run dev');
console.log('\n4. Teste a API:');
console.log('   http://localhost:3000/api/health');
