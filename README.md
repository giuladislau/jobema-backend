# Jobema Backend

API REST para gerenciamento de clientes, caminhões, operações, vales e fechamentos mensais.

O sistema foi desenvolvido para apoiar o controle operacional de empresas de transporte e logística, centralizando informações que normalmente seriam mantidas em planilhas ou registros manuais.

## Funcionalidades

* Cadastro e gerenciamento de clientes
* Cadastro e gerenciamento de caminhões
* Registro de operações de entrega e retirada
* Controle de vales vinculados às operações
* Consolidação de fechamentos mensais
* Autenticação baseada em JWT

## Tecnologias

* Node.js
* Express
* PostgreSQL
* JSON Web Token (JWT)
* bcrypt
* ESLint
* Nodemon

## Arquitetura

O projeto utiliza arquitetura em camadas para separar responsabilidades e facilitar manutenção e evolução.

```text
src
├── controllers
├── services
├── repositories
├── routes
├── middlewares
├── validations
├── database
├── config
├── utils
└── docs
```

| Camada       | Responsabilidade                 |
| ------------ | -------------------------------- |
| Controllers  | Recebimento das requisições HTTP |
| Services     | Regras de negócio                |
| Repositories | Persistência de dados            |
| Routes       | Definição das rotas              |
| Middlewares  | Processamento intermediário      |
| Database     | Conexão com banco de dados       |
| Utils        | Utilitários compartilhados       |

## Regras de Negócio

* Operações devem estar vinculadas a cliente, caminhão e usuário.
* Cada vale está associado a uma única operação.
* Um vale não pode ser reutilizado.
* Fechamentos mensais consolidam automaticamente as operações registradas.
* Rotas de negócio exigem autenticação JWT.

## Instalação

Clonar o repositório:

```bash
git clone <url-do-repositorio>
```

Instalar dependências:

```bash
npm install
```

Criar um arquivo `.env` utilizando o modelo disponível em `.env.example`.

## Execução

Ambiente de desenvolvimento:

```bash
npm run dev
```

Execução padrão:

```bash
npm start
```

## Segurança

* Senhas armazenadas com bcrypt.
* Autenticação baseada em JWT.
* Variáveis sensíveis mantidas fora do repositório através do arquivo `.env`.
* Rotas protegidas por middleware de autenticação.

## Melhorias Futuras

* Controle de permissões por perfil de usuário.
* Dashboard gerencial.
* Exportação de relatórios.
* Testes automatizados.
* Interface web para operação do sistema.