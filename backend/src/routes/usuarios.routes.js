const express = require("express");
const { UsuarioController } = require("../controllers/usuarios.controller.js");
const { authMiddleware, requireRole } = require("../middleware/auth");
const { validateLogin, validateRegister } = require("../middleware/validation");

const router = express.Router();

// Rutas públicas
router.post("/login", validateLogin, UsuarioController.loginUsuario);

// Rutas protegidas (solo administradores gestionan usuarios)
router.post("/register", authMiddleware, requireRole('administrador'), validateRegister, UsuarioController.registerUsuario);
router.get("/listar", authMiddleware, requireRole('administrador'), UsuarioController.listarUsuario);
router.put("/editar/:id_usuario", authMiddleware, requireRole('administrador'), UsuarioController.editarUsuario);
router.delete("/eliminar/:id_usuario", authMiddleware, requireRole('administrador'), UsuarioController.eliminarUsuario);

module.exports = router;
