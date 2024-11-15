// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Importando as rotas
const vehicleRoutes = require('./routes/vehicleRoutes');

// Middleware
app.use(cors()); // Para permitir requisições de diferentes origens (necessário para o frontend Angular)
app.use(express.json()); // Para processar JSON no corpo das requisições

// Usando as rotas definidas
app.use('/api', vehicleRoutes);

// Iniciando o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

