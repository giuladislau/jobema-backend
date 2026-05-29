// controller cliente

import { getAllClients } from "../services/clienteService.js";

import { successResponse } from "../utils/apiResponse.js";

async function getClients(request, response, next) {
  try {
    const clients = await getAllClients();

    return successResponse(
      response,
      clients,
      "clientes listados",
    );
  } catch (error) {
    next(error);
  }
}

export { getClients };