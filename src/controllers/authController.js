import authService from "../services/authService.js";

async function login(request, response, next) {
    try {
        const result = await authService.login(
            request.body,
        );

        return response.status(200).json({
            success: true,
            data: result,
        });
    } catch (error) {
        next(error);
    }
}

export default {
    login,
};