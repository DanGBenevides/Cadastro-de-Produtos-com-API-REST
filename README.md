# Sistema de Cadastro de Produtos

Este é um projeto desenvolvido como parte da prova prática para a empresa **Task**. O sistema permite o cadastro, edição, listagem e exclusão de produtos em um estoque.

---

## Tecnologias Utilizadas

- **Backend:** Node.js, Express.js, Sequelize, MySQL
- **Frontend:** Next.js, React, Axios, Tailwind CSS

---

## Como Rodar o Projeto

### **1️⃣ Clonar o repositório**
```bash
git clone https://github.com/DanGBenevides/Cadastro-de-Produtos-com-API-REST.git
cd Cadastro-de-Produtos-com-API-REST
```

### **2️⃣ Configurar e Rodar o Backend e Banco de Dados** 
Pré-requisitos: Ter **Node.js** e **MySQL** instalados

#### Criar o banco de dados no MySQL
```sql
CREATE DATABASE estoque;
```
#### Renomeie o arquivo .env-example para .env e atualize as variáveis **DB_USER** e **DB_PASS** com as credenciais do seu banco de dados.

#### Instalar as dependências do backend e criar a tabela produtos através do migrations
```bash
cd backend
npm install
npx sequelize-cli db:migrate
node server.js
```

### **3️⃣ Configurar e Rodar o Frontend**
```bash
cd frontend
npm install
npm run dev
```