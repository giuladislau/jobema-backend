# Jobema Backend

Backend do sistema de gerenciamento de distribuição de água da empresa Jobema.

## Objetivo

O sistema tem como objetivo registrar e controlar:

- Clientes
- Caminhões
- Operações de entrega e retirada
- Emissão de vales
- Fechamentos mensais

Substituindo controles manuais por uma aplicação web com rastreabilidade das operações.

---

## Tecnologias

- Node.js
- Express
- PostgreSQL
- ESLint
- Prettier
- Nodemon

---

## Arquitetura

O projeto segue uma arquitetura em camadas:

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

### Responsabilidades

| Camada | Responsabilidade |
|----------|----------|
| Controllers | Receber requisições HTTP |
| Services | Regras de negócio |
| Repositories | Acesso ao banco de dados |
| Routes | Definição dos endpoints |
| Middlewares | Tratamento de erros e validações |
| Database | Conexão e scripts do banco |

---

## Estrutura do Banco

Principais entidades:

- Usuário
- Cliente
- Caminhão
- Operação
- Vale
- Fechamento Mensal

Banco de dados:

```text
PostgreSQL
```

---

## Instalação

### Clonar projeto

```bash
git clone <url-do-repositorio>
```

### Instalar dependências

```bash
npm install
```

### Configurar ambiente

Criar arquivo:

```env
.env
```

Exemplo:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=jobema
DB_USER=postgres
DB_PASSWORD=sua_senha
PORT=3000
```

---

## Executar projeto

Modo desenvolvimento:

```bash
npm run dev
```

Modo produção:

```bash
npm start
```

---

## Health Check

Endpoint para verificar disponibilidade da API:

```http
GET /health
```

Resposta:

```json
{
  "status": "ok",
  "message": "api funcionando"
}
```

---

## Padrão de Resposta

### Sucesso

```json
{
  "success": true,
  "data": {}
}
```

### Listagem

```json
{
  "success": true,
  "data": []
}
```

### Erro

```json
{
  "success": false,
  "message": "cliente não encontrado"
}
```

---

## Fluxo de Desenvolvimento

Estratégia baseada em Git Flow simplificado.