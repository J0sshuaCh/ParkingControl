import express from "express";
import { loginUsuario } from "../controllers/usuarios.controller.js";

const router = express.Router();

router.post("/login", loginUsuario);

router.get("/test", (req, res) => {
  res.send("Ruta usuarios funcionando");
});

export default router;
