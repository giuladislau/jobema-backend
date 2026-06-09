const LIMIT = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutos

const attempts = new Map();

function loginRateLimit(request, response, next) {
    const ip = request.ip;
    const now = Date.now();
    const record = attempts.get(ip);

    if (record && now < record.resetAt) {
        if (record.count >= LIMIT) {
            return response.status(429).json({
                success: false,
                message: "muitas tentativas de login",
            });
        }

        record.count += 1;
    } else {
        attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    }

    next();
}

export default loginRateLimit;
