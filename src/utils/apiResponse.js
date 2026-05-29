// resposta padrao api

export function successResponse(response, data, message = "sucesso") {
  return response.status(200).json({
    success: true,
    message,
    data,
  });
}

export function createdResponse(response, data, message = "criado") {
  return response.status(201).json({
    success: true,
    message,
    data,
  });
}