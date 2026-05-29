// middleware global erros

function errorMiddleware(error, request, response, next) {
  const statusCode = error.statusCode || 500;

  return response.status(statusCode).json({
    success: false,
    message: error.message || "erro interno servidor",
  });
}

export default errorMiddleware;