import usuarioService from "../services/usuarioService.js";

async function listUsers(request, response, next) {
  try {
    const users = await usuarioService.listUsers();

    return response.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    next(error);
  }
}

async function getUserById(request, response, next) {
  try {
    const user = await usuarioService.getUserById(request.params.id);

    return response.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
}

async function createUser(request, response, next) {
  try {
    const user = await usuarioService.createUser(request.body);

    return response.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
}

async function updateUser(request, response, next) {
  try {
    const user = await usuarioService.updateUser(
      request.params.id,
      request.body
    );

    return response.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
}

async function deleteUser(request, response, next) {
  try {
    await usuarioService.deleteUser(request.params.id);

    return response.status(204).send();
  } catch (error) {
    next(error);
  }
}

async function listUsersForSelect(request, response, next) {
  try {
    const users = await usuarioService.listUsersForSelect();
    return response.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    next(error);
  }
}

export default {
  listUsers,
  getUserById,
  listUsersForSelect,
  createUser,
  updateUser,
  deleteUser,
};
