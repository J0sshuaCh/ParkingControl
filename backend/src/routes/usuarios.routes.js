import express from "express";
import { loginUsuario, UsuarioController } from "../controllers/usuarios.controller.js";

const router = express.Router();

router.post("/login", UsuarioController.loginUsuario);

router.post("/register", UsuarioController.registerUsuario);

router.post("/listar", UsuarioController.listarUsuarios);

router.put("/editar/:id_usuario", UsuarioController.editarUsuario);

router.delete("/eliminar/:id_usuario", UsuarioController.eliminarUsuario);

router.get("/test", (req, res) => {
  res.send("Ruta usuarios funcionando");
});

export default router;
