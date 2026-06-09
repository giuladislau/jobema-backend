# Banco de Dados - Jobema

## Visão Geral

O banco de dados Jobema foi desenvolvido em PostgreSQL para gerenciamento de operações de transporte de água, emissão automática de vales e geração automática de fechamentos mensais.

---

# Entidades

## Usuario

Representa os usuários autorizados a utilizar o sistema.

### Campos

| Campo | Tipo | Restrições |
|---------|---------|---------|
| id_usuario | INTEGER | PK |
| nome | VARCHAR(100) | NOT NULL |
| login | VARCHAR(50) | NOT NULL, UNIQUE |
| senha_hash | VARCHAR(255) | NOT NULL |
| perfil | VARCHAR(30) | NOT NULL |

### Relacionamentos

- 1:N com Operacao
- 1:N com Fechamento_Mensal

---

## Cliente

Representa os clientes atendidos pela empresa.

### Campos

| Campo | Tipo | Restrições |
|---------|---------|---------|
| id_cliente | INTEGER | PK |
| nome | VARCHAR(100) | NOT NULL |
| telefone | VARCHAR(20) | NULL |
| endereco | VARCHAR(255) | NULL |
| criado_em | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |

### Relacionamentos

- 1:N com Operacao
- 1:N com Fechamento_Mensal

---

## Caminhao

Representa os caminhões responsáveis pelas operações.

### Campos

| Campo | Tipo | Restrições |
|---------|---------|---------|
| id_caminhao | INTEGER | PK |
| placa | VARCHAR(10) | UNIQUE, NOT NULL |
| motorista | VARCHAR(100) | NOT NULL |
| capacidade_litros | INTEGER | NOT NULL, > 0 |

### Relacionamentos

- 1:N com Operacao

---

## Operacao

Registra entregas ou retiradas realizadas.

### Campos

| Campo | Tipo | Restrições |
|---------|---------|---------|
| id_operacao | INTEGER | PK |
| id_cliente | INTEGER | FK |
| id_caminhao | INTEGER | FK |
| id_usuario | INTEGER | FK |
| tipo | VARCHAR(20) | ENTREGA ou RETIRADA |
| quantidade | INTEGER | > 0 |
| data_operacao | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |
| observacao | TEXT | NULL |
| valor | NUMERIC(10,2) | > 0 |

### Relacionamentos

- N:1 Cliente
- N:1 Caminhao
- N:1 Usuario
- 1:1 Vale

### Regras

- Quantidade deve ser maior que zero.
- Valor deve ser maior que zero.
- Tipo deve ser:
  - ENTREGA
  - RETIRADA

### Eventos Automáticos

Ao inserir uma operação:

- Um Vale é criado automaticamente.
- O Fechamento Mensal é recalculado automaticamente.

---

## Vale

Representa o vale financeiro gerado a partir de uma operação.

### Campos

| Campo | Tipo | Restrições |
|---------|---------|---------|
| id_vale | INTEGER | PK |
| id_operacao | INTEGER | FK, UNIQUE |
| valor | NUMERIC(10,2) | > 0 |
| data_emissao | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |
| pago | BOOLEAN | DEFAULT FALSE |
| data_pagamento | TIMESTAMP | NULL |

### Relacionamentos

- 1:1 com Operacao

### Regras

Cada operação pode gerar apenas um vale.

---

## Fechamento_Mensal

Armazena estatísticas consolidadas das operações realizadas por cliente em cada mês.

### Campos

| Campo | Tipo | Restrições |
|---------|---------|---------|
| id_fechamento | INTEGER | PK |
| id_cliente | INTEGER | FK |
| id_usuario | INTEGER | FK |
| mes | SMALLINT | 1 a 12 |
| ano | SMALLINT | NOT NULL |
| total_operacoes | INTEGER | >= 0 |
| total_quantidade | INTEGER | >= 0 |
| gerado_em | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |

### Relacionamentos

- N:1 Cliente
- N:1 Usuario

### Restrições

UNIQUE:

```text
(id_cliente, mes, ano)
```

Isso impede dois fechamentos para o mesmo cliente no mesmo mês.

---

# Triggers

## trg_criar_vale

Tabela monitorada:

```text
operacao
```

Evento:

```text
AFTER INSERT
```

Função executada:

```text
fn_criar_vale_automatico()
```

Objetivo:

Criar automaticamente um vale para a operação recém cadastrada.

---

## trg_fechamento_mensal

Tabela monitorada:

```text
operacao
```

Eventos:

```text
AFTER INSERT
AFTER UPDATE
AFTER DELETE
```

Função executada:

```text
fn_atualizar_fechamento()
```

Objetivo:

Manter os fechamentos mensais sempre atualizados.

---

# Índices

## Operacao

- idx_operacao_cliente
- idx_operacao_data

## Vale

- idx_vale_operacao

## Fechamento_Mensal

- idx_fechamento_cliente

---

# Fluxo de Negócio

1. Usuário registra uma operação.
2. A operação referencia:
   - Cliente
   - Caminhão
   - Usuário responsável
3. O sistema cria automaticamente um Vale.
4. O sistema recalcula automaticamente o Fechamento Mensal.
5. O fechamento passa a refletir:
   - Total de operações
   - Total de litros movimentados
   - Cliente
   - Usuário responsável

---

# Diagrama Simplificado

Usuario
│
├── Operacao
│ ├── Cliente
│ ├── Caminhao
│ └── Vale
│
└── Fechamento_Mensal
     └── Cliente