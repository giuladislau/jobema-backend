import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import usuarioRepository from "../repositories/usuarioRepository.js";

import AppError from "../utils/AppError.js";

async function login(data) {
    const { login, senha } = data;

    if (!login || !senha) {
        throw new AppError("login e senha são obrigatórios", 400);
    }

    const usuario = await usuarioRepository.findByLogin(login);

    if (!usuario) {
        throw new AppError("login ou senha inválidos", 401);
    }

    const senhaValida = await bcrypt.compare(
        senha,
        usuario.senha_hash,
    );

    if (!senhaValida) {
        throw new AppError("login ou senha inválidos", 401);
    }

    const token = jwt.sign(
        {
            id_usuario: usuario.id_usuario,
            perfil: usuario.perfil,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN,
        },
    );

    return {
        usuario: {
            id_usuario: usuario.id_usuario,
            nome: usuario.nome,
            login: usuario.login,
            perfil: usuario.perfil,
        },
        token,
    };
}

export default {
    login,
};