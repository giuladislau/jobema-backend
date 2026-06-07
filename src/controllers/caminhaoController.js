import caminhaoService from "../services/caminhaoService.js";

// lista caminhões
async function index(request, response, next) {
    try {
        const trucks = await caminhaoService.listTrucks();

        return response.status(200).json({
            success: true,
            data: trucks,
        });
    } catch (error) {
        next(error);
    }
}

// busca caminhão por id
async function show(request, response, next) {
    try {
        const { id } = request.params;

        const truck = await caminhaoService.getTruckById(id);

        return response.status(200).json({
            success: true,
            data: truck,
        });
    } catch (error) {
        next(error);
    }
}

// cria caminhão
async function store(request, response, next) {
    try {
        const truck = await caminhaoService.createTruck(request.body);

        return response.status(201).json({
            success: true,
            data: truck,
        });
    } catch (error) {
        next(error);
    }
}

// atualiza caminhão
async function update(request, response, next) {
    try {
        const { id } = request.params;

        const truck = await caminhaoService.updateTruck(
            id,
            request.body,
        );

        return response.status(200).json({
            success: true,
            data: truck,
        });
    } catch (error) {
        next(error);
    }
}

// remove caminhão
async function destroy(request, response, next) {
    try {
        const { id } = request.params;

        await caminhaoService.deleteTruck(id);

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