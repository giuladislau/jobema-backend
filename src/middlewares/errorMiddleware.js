// middleware global erros

function errorMiddleware(error, request, response, next) {
  if (error.code === "23503") {
    return response.status(400).json({
      success: false,
      message: "registro possui vínculos e não pode ser removido",
    });
  }

  const statusCode = error.statusCode || 500;

  return response.status(statusCode).json({
    success: false,
    message: error.message || "erro interno servidor",
  });
}

export default errorMiddleware;