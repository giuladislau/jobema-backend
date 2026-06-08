import { Router } from "express";

import valeController from "../controllers/valeController.js";

const router = Router();

router.get("/", valeController.index);

router.get("/:id", valeController.show);

router.post("/", valeController.store);

router.put("/:id", valeController.update);

router.delete("/:id", valeController.destroy);

export default router;