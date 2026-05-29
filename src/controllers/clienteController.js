import clienteService from "../services/clienteService.js";

// lista clientes
async function index(request, response, next) {
  try {
    const clients = await clienteService.listClients();

    return response.status(200).json({
      success: true,
      data: clients,
    });
  } catch (error) {
    next(error);
  }
}

export default {
  index,
};