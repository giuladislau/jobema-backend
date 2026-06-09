-- =====================================================
-- Jobema - Schema Database
-- PostgreSQL
-- =====================================================

-- =====================================================
-- TABELA: usuario
-- =====================================================

CREATE TABLE usuario (
    id_usuario SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    login VARCHAR(50) NOT NULL UNIQUE,
    senha_hash VARCHAR(255) NOT NULL,
    perfil VARCHAR(30) NOT NULL
);

-- =====================================================
-- TABELA: cliente
-- =====================================================

CREATE TABLE cliente (
    id_cliente SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    telefone VARCHAR(20),
    endereco VARCHAR(255),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- TABELA: caminhao
-- =====================================================

CREATE TABLE caminhao (
    id_caminhao SERIAL PRIMARY KEY,
    placa VARCHAR(10) NOT NULL UNIQUE,
    motorista VARCHAR(100) NOT NULL,
    capacidade_litros INTEGER NOT NULL,

    CONSTRAINT chk_capacidade_litros
        CHECK (capacidade_litros > 0)
);

-- =====================================================
-- TABELA: operacao
-- =====================================================

CREATE TABLE operacao (
    id_operacao SERIAL PRIMARY KEY,

    id_cliente INTEGER NOT NULL,
    id_caminhao INTEGER NOT NULL,
    id_usuario INTEGER NOT NULL,

    tipo VARCHAR(20) NOT NULL,
    quantidade INTEGER NOT NULL,
    data_operacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    observacao TEXT,
    valor NUMERIC(10,2) NOT NULL,

    CONSTRAINT chk_tipo_operacao
        CHECK (tipo IN ('ENTREGA', 'RETIRADA')),

    CONSTRAINT chk_quantidade_operacao
        CHECK (quantidade > 0),

    CONSTRAINT chk_valor_operacao
        CHECK (valor > 0),

    CONSTRAINT fk_operacao_cliente
        FOREIGN KEY (id_cliente)
        REFERENCES cliente(id_cliente),

    CONSTRAINT fk_operacao_caminhao
        FOREIGN KEY (id_caminhao)
        REFERENCES caminhao(id_caminhao),

    CONSTRAINT fk_operacao_usuario
        FOREIGN KEY (id_usuario)
        REFERENCES usuario(id_usuario)
);

-- =====================================================
-- TABELA: vale
-- =====================================================

CREATE TABLE vale (
    id_vale SERIAL PRIMARY KEY,

    id_operacao INTEGER NOT NULL UNIQUE,

    valor NUMERIC(10,2) NOT NULL,
    data_emissao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    pago BOOLEAN DEFAULT FALSE,
    data_pagamento TIMESTAMP,

    CONSTRAINT chk_valor_vale
        CHECK (valor > 0),

    CONSTRAINT fk_vale_operacao
        FOREIGN KEY (id_operacao)
        REFERENCES operacao(id_operacao)
        ON DELETE CASCADE
);

-- =====================================================
-- TABELA: fechamento_mensal
-- =====================================================

CREATE TABLE fechamento_mensal (
    id_fechamento SERIAL PRIMARY KEY,

    id_cliente INTEGER NOT NULL,
    id_usuario INTEGER NOT NULL,

    mes SMALLINT NOT NULL,
    ano SMALLINT NOT NULL,

    total_operacoes INTEGER NOT NULL DEFAULT 0,
    total_quantidade INTEGER NOT NULL DEFAULT 0,

    gerado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_mes
        CHECK (mes BETWEEN 1 AND 12),

    CONSTRAINT chk_total_operacoes
        CHECK (total_operacoes >= 0),

    CONSTRAINT chk_total_quantidade
        CHECK (total_quantidade >= 0),

    CONSTRAINT unq_fechamento
        UNIQUE (id_cliente, mes, ano),

    CONSTRAINT fk_fechamento_cliente
        FOREIGN KEY (id_cliente)
        REFERENCES cliente(id_cliente),

    CONSTRAINT fk_fechamento_usuario
        FOREIGN KEY (id_usuario)
        REFERENCES usuario(id_usuario)
);

-- =====================================================
-- ÍNDICES
-- =====================================================

CREATE INDEX idx_operacao_cliente
    ON operacao(id_cliente);

CREATE INDEX idx_operacao_data
    ON operacao(data_operacao);

CREATE INDEX idx_vale_operacao
    ON vale(id_operacao);

CREATE INDEX idx_fechamento_cliente
    ON fechamento_mensal(id_cliente);

-- =====================================================
-- FUNÇÃO: CRIAR VALE AUTOMATICAMENTE
-- =====================================================

CREATE OR REPLACE FUNCTION fn_criar_vale_automatico()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN

    INSERT INTO vale (
        id_operacao,
        valor
    )
    VALUES (
        NEW.id_operacao,
        NEW.valor
    );

    RETURN NEW;

END;
$$;

-- =====================================================
-- FUNÇÃO: ATUALIZAR FECHAMENTO MENSAL
-- =====================================================

CREATE OR REPLACE FUNCTION fn_atualizar_fechamento()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
    v_mes SMALLINT;
    v_ano SMALLINT;
    v_cliente INTEGER;
    v_usuario INTEGER;
BEGIN

    IF TG_OP = 'DELETE' THEN

        v_mes := EXTRACT(MONTH FROM OLD.data_operacao);
        v_ano := EXTRACT(YEAR FROM OLD.data_operacao);

        v_cliente := OLD.id_cliente;
        v_usuario := OLD.id_usuario;

    ELSE

        v_mes := EXTRACT(MONTH FROM NEW.data_operacao);
        v_ano := EXTRACT(YEAR FROM NEW.data_operacao);

        v_cliente := NEW.id_cliente;
        v_usuario := NEW.id_usuario;

    END IF;

    INSERT INTO fechamento_mensal (
        id_cliente,
        id_usuario,
        mes,
        ano,
        total_operacoes,
        total_quantidade
    )
    SELECT
        v_cliente,
        v_usuario,
        v_mes,
        v_ano,
        COUNT(*),
        COALESCE(SUM(quantidade), 0)
    FROM operacao
    WHERE id_cliente = v_cliente
      AND EXTRACT(MONTH FROM data_operacao) = v_mes
      AND EXTRACT(YEAR FROM data_operacao) = v_ano

    ON CONFLICT (id_cliente, mes, ano)
    DO UPDATE SET
        total_operacoes = EXCLUDED.total_operacoes,
        total_quantidade = EXCLUDED.total_quantidade,
        gerado_em = CURRENT_TIMESTAMP;

    RETURN NULL;

END;
$$;

-- =====================================================
-- TRIGGERS
-- =====================================================

CREATE TRIGGER trg_criar_vale
AFTER INSERT ON operacao
FOR EACH ROW
EXECUTE FUNCTION fn_criar_vale_automatico();

CREATE TRIGGER trg_fechamento_mensal
AFTER INSERT OR UPDATE OR DELETE
ON operacao
FOR EACH ROW
EXECUTE FUNCTION fn_atualizar_fechamento();