import bcrypt from "bcrypt";

import usuarioRepository from "../repositories/usuarioRepository.js";

import AppError from "../utils/AppError.js";

async function listUsers() {
    return await usuarioRepository.findAll();
}

async function getUserById(id) {
    const user = await usuarioRepository.findById(id);

    if (!user) {
        throw new AppError(
            "usuário não encontrado",
            404,
        );
    }

    return user;
}

async function createUser(data) {
    const {
        nome,
        login,
        senha,
        perfil,
    } = data;

    if (!nome?.trim()) {
        throw new AppError(
            "nome é obrigatório",
            400,
        );
    }

    if (!login?.trim()) {
        throw new AppError(
            "login é obrigatório",
            400,
        );
    }

    if (!senha?.trim()) {
        throw new AppError(
            "senha é obrigatória",
            400,
        );
    }

    if (!perfil?.trim()) {
        throw new AppError(
            "perfil é obrigatório",
            400,
        );
    }

    const loginExists =
        await usuarioRepository.findByLogin(login);

    if (loginExists) {
        throw new AppError(
            "login já cadastrado",
            409,
        );
    }

    const senha_hash = await bcrypt.hash(
        senha,
        10,
    );

    return await usuarioRepository.create({
        nome,
        login,
        senha_hash,
        perfil,
    });
}

async function updateUser(id, data) {
    const user =
        await usuarioRepository.findByIdWithPassword(
            id,
        );

    if (!user) {
        throw new AppError(
            "usuário não encontrado",
            404,
        );
    }

    const {
        nome,
        login,
        senha,
        perfil,
    } = data;

    if (!nome?.trim()) {
        throw new AppError(
            "nome é obrigatório",
            400,
        );
    }

    if (!login?.trim()) {
        throw new AppError(
            "login é obrigatório",
            400,
        );
    }

    if (!perfil?.trim()) {
        throw new AppError(
            "perfil é obrigatório",
            400,
        );
    }

    const loginExists =
        await usuarioRepository.findByLoginExceptId(
            login,
            id,
        );

    if (loginExists) {
        throw new AppError(
            "login já cadastrado",
            409,
        );
    }

    let senha_hash = user.senha_hash;

    if (senha?.trim()) {
        senha_hash = await bcrypt.hash(
            senha,
            10,
        );
    }

    return await usuarioRepository.update(id, {
        nome,
        login,
        senha_hash,
        perfil,
    });
}

async function deleteUser(id) {
    const user =
        await usuarioRepository.findById(id);

    if (!user) {
        throw new AppError(
            "usuário não encontrado",
            404,
        );
    }

    await usuarioRepository.remove(id);
}

export default {
    listUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};