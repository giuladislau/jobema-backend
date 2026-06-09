import { Router } from "express";

import authController from "../controllers/authController.js";
import loginRateLimit from "../middlewares/loginRateLimitMiddleware.js";

const router = Router();

router.post("/login", loginRateLimit, authController.login);

export default router;