import jwt from "jsonwebtoken";

function authMiddleware(request, response, next) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        return response.status(401).json({
            success: false,
            message: "token não informado",
        });
    }

    const [, token] = authHeader.split(" ");

    try {
        const payload = jwt.verify(
            token,
            process.env.JWT_SECRET,
        );

        request.user = {
            id_usuario: payload.id_usuario,
            perfil: payload.perfil,
        };

        next();
    } catch {
        return response.status(401).json({
            success: false,
            message: "token inválido",
        });
    }
}

export default authMiddleware;