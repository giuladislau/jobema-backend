import valeService from "../services/valeService.js";

async function index(request, response, next) {
    try {
        const vales =
            await valeService.listVouchers();

        return response.status(200).json({
            success: true,
            data: vales,
        });
    } catch (error) {
        next(error);
    }
}

async function show(request, response, next) {
    try {
        const { id } = request.params;

        const vale =
            await valeService.getVoucherById(id);

        return response.status(200).json({
            success: true,
            data: vale,
        });
    } catch (error) {
        next(error);
    }
}

async function store(request, response, next) {
    try {
        const vale =
            await valeService.createVoucher(
                request.body,
            );

        return response.status(201).json({
            success: true,
            data: vale,
        });
    } catch (error) {
        next(error);
    }
}

async function update(request, response, next) {
    try {
        const { id } = request.params;

        const vale =
            await valeService.updateVoucher(
                id,
                request.body,
            );

        return response.status(200).json({
            success: true,
            data: vale,
        });
    } catch (error) {
        next(error);
    }
}

async function destroy(request, response, next) {
    try {
        const { id } = request.params;

        await valeService.deleteVoucher(id);

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