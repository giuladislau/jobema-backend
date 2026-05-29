// regras negocio cliente

import { findAllClients } from "../repositories/clienteRepository.js";

async function getAllClients() {
  const clients = await findAllClients();

  return clients;
}

export { getAllClients };