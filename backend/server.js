const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./database');

const app = express();
app.use(cors());
app.use(express.json());

// Importar as rotas
const produtoRoutes = require('./routes/produtoRoutes');
app.use('/produtos', produtoRoutes);

sequelize.authenticate()
    .then(() => console.log('Conectado ao banco de dados'))
    .catch((error) => console.error('Erro ao conectar ao banco de dados: ', error));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));