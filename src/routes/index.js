// dependencias
const { Router } = require("express");

const router = Router();

// rota health check
router.get("/health", (req, res) => {
  return res.status(200).json({
    status: "ok",
  });
});

module.exports = router;