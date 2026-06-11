# Jobema Backend

## Visão Geral

API REST desenvolvida em Node.js e Express para gerenciamento operacional da empresa Jobema.

O sistema centraliza o controle de:

* Clientes
* Caminhões
* Operações
* Vales
* Usuários
* Fechamentos mensais

Os dados são persistidos em PostgreSQL e o acesso à API é protegido por autenticação baseada em JWT.

---

## Tecnologias

* Node.js
* Express.js
* PostgreSQL
* JWT (JSON Web Token)
* Bcrypt
* PDFKit
* CORS

---

## Arquitetura

O projeto utiliza arquitetura em camadas:

text
Routes
  ↓
Middlewares
  ↓
Controllers
  ↓
Services
  ↓
Repositories
  ↓
PostgreSQL


### Estrutura de diretórios

text
src/
├── controllers/
├── database/
├── middlewares/
├── repositories/
├── routes/
├── services/
├── utils/
└── server.js


---

## Requisitos

* Node.js 18+
* PostgreSQL 16+

---

## Configuração

### Instalação

bash
npm install


### Variáveis de ambiente

Criar um arquivo .env utilizando o .env.example como referência.

Exemplo:

env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=jobema
DB_USER=postgres
DB_PASSWORD=sua_senha

PORT=3000

JWT_SECRET=seu_secret
JWT_EXPIRES_IN=8h


---

## Execução

Modo desenvolvimento:

bash
npm run dev


Modo produção:

bash
npm start


Servidor disponível em:

text
http://localhost:3000


---

## Autenticação

A API utiliza autenticação baseada em JWT.

Após autenticação, o token deve ser enviado no cabeçalho:

http
Authorization: Bearer <token>


---

## Recursos Disponíveis

### Autenticação

Responsável pelo processo de login e emissão de tokens.

### Usuários

Gerenciamento de usuários e perfis de acesso.

### Clientes

Cadastro e manutenção de clientes.

### Caminhões

Cadastro e manutenção da frota.

### Operações

Registro e acompanhamento das operações realizadas.

### Vales

Controle dos vales vinculados às operações.

### Fechamentos Mensais

Consolidação e exportação de informações operacionais.

---

## Padrão de Resposta

### Sucesso

json
{
  "success": true,
  "data": {}
}


### Erro

json
{
  "success": false,
  "message": "Descrição do erro"
}


---

## Códigos HTTP

| Código | Descrição                      |
| ------ | ------------------------------ |
| 200    | Operação realizada com sucesso |
| 201    | Recurso criado                 |
| 400    | Dados inválidos                |
| 401    | Não autenticado                |
| 403    | Acesso negado                  |
| 404    | Recurso não encontrado         |
| 429    | Limite de requisições excedido |
| 500    | Erro interno                   |

---

## Banco de Dados

O banco de dados é composto pelos seguintes módulos principais:

* Usuários
* Clientes
* Caminhões
* Operações
* Vales
* Fechamentos Mensais

A estrutura completa encontra-se no arquivo SQL disponibilizado junto ao projeto.
