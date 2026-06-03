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

export default {
  listClients,
  getClientById,
};