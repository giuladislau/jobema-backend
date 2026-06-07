import operacaoService from "../services/operacaoService.js";

// lista operações
async function index(request, response, next) {
    try {
        const operations =
            await operacaoService.listOperations();

        return response.status(200).json({
            success: true,
            data: operations,
        });
    } catch (error) {
        next(error);
    }
}

// busca operação por id
async function show(request, response, next) {
    try {
        const { id } = request.params;

        const operation =
            await operacaoService.getOperationById(id);

        return response.status(200).json({
            success: true,
            data: operation,
        });
    } catch (error) {
        next(error);
    }
}

// cria operação
async function store(request, response, next) {
    try {
        const operation =
            await operacaoService.createOperation(
                request.body,
            );

        return response.status(201).json({
            success: true,
            data: operation,
        });
    } catch (error) {
        next(error);
    }
}

// atualiza operação
async function update(request, response, next) {
    try {
        const { id } = request.params;

        const operation =
            await operacaoService.updateOperation(
                id,
                request.body,
            );

        return response.status(200).json({
            success: true,
            data: operation,
        });
    } catch (error) {
        next(error);
    }
}

// remove operação
async function destroy(request, response, next) {
    try {
        const { id } = request.params;

        await operacaoService.deleteOperation(id);

        return response.status(200).json({
            success: true,
            data: {},
        });
    } catch (error) {
        next(error);
    }
}

export default {
    index,
    show,
    store,
    update,
    destroy,
};