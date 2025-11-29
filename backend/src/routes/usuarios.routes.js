import express from "express";
import { UsuarioController } from "../controllers/usuarios.controller.js";

const router = express.Router();

router.post("/login", UsuarioController.loginUsuario);

router.post("/register", UsuarioController.registerUsuario);

router.get("/listar", UsuarioController.listarUsuario);

router.put("/editar/:id_usuario", UsuarioController.editarUsuario);

router.delete("/eliminar/:id_usuario", UsuarioController.eliminarUsuario);

export default router;