
💰 API de Controle Financeiro

API RESTful para gerenciamento de finanças pessoais, permitindo cadastro de usuários, autenticação e controle de transações (receitas e despesas).

🚀 Tecnologias utilizadas

Node.js

Express

TypeScript

TypeORM

SQLite

JWT (Autenticação)

Bcrypt (Hash de senha)

📌 Funcionalidades

✅ Cadastro de usuário

✅ Login com autenticação JWT

✅ Criação de transações (receitas/despesas)

✅ Listagem de transações

✅ Paginação de resultados

✅ Filtro por tipo de transação

✅ Cálculo de saldo do usuário

🔐 Autenticação

A API utiliza autenticação via JWT.

Após o login, você receberá um token que deve ser enviado nas requisições protegidas:

Authorization: Bearer seu_token_aqui 

📄 Rotas principais

👤 Usuário

POST /users → Criar usuário

POST /login → Autenticar usuário

💸 Transações

POST /transactions → Criar transação

GET /transactions → Listar transações

Parâmetros de consulta:

?page= → Número da página

?limit= → Quantidade por página

type → (income | expense)

Exemplo:

GET /transactions?page=1&limit=10&type=expense
📊 Exemplo de resposta
{
  "data": [
    {
      "id": 1,
      "type": "expense",
      "amount": 100,
      "description": "Supermercado"
    }
  ],
  "total": 20,
  "page": 1,
  "lastPage": 2
}
⚙️ Como rodar o projeto
1. Clonar o repositório
git clone https://github.com/seu-usuario/seu-repo.git
2. Instalar dependências
npm install
3. Rodar as migrations
npm run typeorm migration:run
4. Iniciar o servidor
npm run dev
🧠 Estrutura do projeto
src/
 ├── controllers
 ├── services
 ├── repositories
 ├── entities
 ├── database
 ├── middleware
 └── routes.ts
🎯 Objetivo

Este projeto foi desenvolvido com foco em prática de desenvolvimento backend, aplicando conceitos como:

Arquitetura em camadas

Autenticação e segurança

Manipulação de banco de dados

Boas práticas com TypeScript

📌 Melhorias futuras

Testes automatizados

Deploy da API

Docker

Documentação com Swagger

AUTOR
Desenvolvido por Rcardo João do Nascimento Filho