import clienteRepository from "../repositories/clienteRepository.js";

// lista clientes
async function listClients() {
  const clients = await clienteRepository.findAll();

  return clients;
}

export default {
  listClients,
};