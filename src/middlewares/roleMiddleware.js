function roleCheck(perfilPermitido) {
    return function (request, response, next) {
        if (request.user.perfil === perfilPermitido) {
            return next();
        }

        return response.status(403).json({
            success: false,
            message: "acesso negado",
        });
    };
}

export default roleCheck;
