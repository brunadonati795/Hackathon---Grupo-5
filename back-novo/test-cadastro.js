const http = require('http');

const postData = JSON.stringify({
  email: 'teste@email.com',
  senha: '123456',
  nome_aluno: 'Usuário Teste'
});

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/alunos/cadastrar',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = http.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('Response:', data);
  });
});

req.on('error', (error) => {
  console.error('Error:', error);
});

req.write(postData);
req.end();
