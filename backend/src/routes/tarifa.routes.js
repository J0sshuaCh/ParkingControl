const express = require('express');
const { getTarifas, createTarifa, updateTarifa, deleteTarifa } = require("../controllers/tarifa.controller.js");
const { authMiddleware, requireRole } = require('../middleware/auth');
const { validateTarifa } = require('../middleware/validation');

const router = express.Router();

router.use(authMiddleware);

router.get("/", getTarifas);
router.post("/", requireRole('administrador'), validateTarifa, createTarifa);
router.put("/:id", requireRole('administrador'), validateTarifa, updateTarifa);
router.delete("/:id", requireRole('administrador'), deleteTarifa);

module.exports = router;
