import fechamentoService from "../services/fechamentoService.js";

async function index(request, response, next) {
    try {
        const closings =
            await fechamentoService.listClosings();

        return response.status(200).json({
            success: true,
            data: closings,
        });
    } catch (error) {
        next(error);
    }
}

async function show(request, response, next) {
    try {
        const { id } = request.params;

        const closing =
            await fechamentoService.getClosingById(id);

        return response.status(200).json({
            success: true,
            data: closing,
        });
    } catch (error) {
        next(error);
    }
}

async function generate(request, response, next) {
    try {
        const { id_usuario } = request.user;

        const result =
            await fechamentoService.generateClosing(id_usuario);

        return response.status(200).json({
            success: true,
            data: result,
        });
    } catch (error) {
        next(error);
    }
}

export default {
    index,
    show,
    generate,
};