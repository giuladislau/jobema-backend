import clienteRepository from "../repositories/clienteRepository.js";

import AppError from "../utils/AppError.js";

// lista clientes
async function listClients() {
  const clients = await clienteRepository.findAll();

  return clients;
}

// busca cliente por id
async function getClientById(id) {
  const client = await clienteRepository.findById(id);

  if (!client) {
    throw new AppError("cliente não encontrado", 404);
  }

  return client;
}

// cria cliente
async function createClient(data) {
  if (!data.nome?.trim()) {
    throw new AppError("nome é obrigatório", 400);
  }

  const client = await clienteRepository.create(data);

  return client;
}

// atualiza cliente
async function updateClient(id, data) {
  const client = await clienteRepository.findById(id);

  if (!client) {
    throw new AppError("cliente não encontrado", 404);
  }

  if (!data.nome?.trim()) {
    throw new AppError("nome é obrigatório", 400);
  }

  const updatedClient = await clienteRepository.update(
    id,
    data,
  );

  return updatedClient;
}

// remove cliente
async function deleteClient(id) {
  const client = await clienteRepository.findById(id);

  if (!client) {
    throw new AppError("cliente não encontrado", 404);
  }

  await clienteRepository.remove(id);
}

export default {
  listClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
};