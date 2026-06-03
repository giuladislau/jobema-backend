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

// busca cliente por id
async function show(request, response, next) {
  try {
    const { id } = request.params;

    const client = await clienteService.getClientById(id);

    return response.status(200).json({
      success: true,
      data: client,
    });
  } catch (error) {
    next(error);
  }
}
// cria cliente
async function store(request, response, next) {
  try {
    const client = await clienteService.createClient(request.body);

    return response.status(201).json({
      success: true,
      data: client,
    });
  } catch (error) {
    next(error);
  }
}
export default {
  index,
  show,
  store,
};