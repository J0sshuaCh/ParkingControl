const express = require('express');
const { getTarifas, createTarifa, updateTarifa, deleteTarifa } = require("../controllers/tarifa.controller.js");

const router = express.Router();

router.get("/", getTarifas);
router.post("/", createTarifa);
router.put("/:id", updateTarifa);
router.delete("/:id", deleteTarifa);

module.exports = router;