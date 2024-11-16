const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3000;

// Importando as rotas de veículos
const vehicleRoutes = require('./routes/vehicleRoutes');

// Usuário fixo para login
const validUser = {
  username: 'Admin',
  password: '123'
};

// Middleware
app.use(cors({ origin: '*' }));// Para permitir requisições de diferentes origens (necessário para o frontend Angular)
app.use(express.json()); // Para processar JSON no corpo das requisições

// Rota de Login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Adicione um log para verificar se os dados estão sendo recebidos corretamente
  console.log('Dados recebidos:', req.body);

  // Verifica se as credenciais são válidas
  if (username === validUser.username && password === validUser.password) {
    // Se as credenciais forem válidas, cria um token JWT
    const token = jwt.sign({ username: validUser.username }, 'secretKey', { expiresIn: '1h' });

    return res.json({ token });
  } else {
    return res.status(401).json({ message: 'Credenciais inválidas' });
  }
});

// Middleware para verificar o token JWT
function verifyToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'Token não fornecido' });
  }

  jwt.verify(token, 'secretKey', (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido' });
    }
    req.user = decoded; // O usuário é decodificado e adicionado à requisição
    next();
  });
}

// Rota protegida - Home
app.get('/home', verifyToken, (req, res) => {
  res.send('Página Home - Usuário autenticado');
});

// Usando as rotas de veículos
app.use('/api', vehicleRoutes);

// Iniciando o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
