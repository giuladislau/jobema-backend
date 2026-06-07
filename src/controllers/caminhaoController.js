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

export default {
    index,
};