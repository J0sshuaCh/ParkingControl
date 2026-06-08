const { UsuarioModel } = require("../models/usuario.model.js");
const { sign } = require('../utils/jwt');
const { AuditEvent } = require('../utils/audit');

const UsuarioController = {
    loginUsuario: async (req, res) => {
        const { username, password } = req.body;

        if (!username || !password) {
            if (req.audit) req.audit.log(AuditEvent.LOGIN_FAILURE, { username }, 'failure');
            return res.status(400).json({ message: "Faltan datos" });
        }

        try {
            const results = await UsuarioModel.login(username, password);

            if (!results || results.length === 0) {
                if (req.audit) req.audit.log(AuditEvent.LOGIN_FAILURE, { username }, 'failure');
                return res.status(401).json({ message: "Usuario o contraseña incorrectos" });
            }

            const user = results[0];

            if (user.estado !== 'Activo') {
                if (req.audit) req.audit.log(AuditEvent.LOGIN_FAILURE, { username, reason: 'inactive' }, 'failure');
                return res.status(403).json({ message: "Usuario inactivo. Contacte al administrador." });
            }

            const tokenPayload = {
                id_usuario: user.id_usuario,
                username: user.username,
                id_rol: user.id_rol,
                nombre_rol: user.nombre_rol,
            };

            const secret = process.env.JWT_SECRET;
            const token = sign(tokenPayload, secret, '8h');

            // Auditoría: login exitoso
            if (req.audit) req.audit.log(AuditEvent.LOGIN_SUCCESS, { username }, { user_id: user.id_usuario });

            return res.json({
                message: "Login exitoso",
                token,
                user: {
                    id_usuario: user.id_usuario,
                    username: user.username,
                    nombre_completo: user.nombre_completo,
                    email: user.email,
                    estado: user.estado,
                    id_rol: user.id_rol,
                    nombre_rol: user.nombre_rol,
                }
            });

        } catch (err) {
            console.error("Error en login:", err.message);
            if (req.audit) req.audit.log(AuditEvent.LOGIN_FAILURE, { username }, 'failure');
            return res.status(500).json({ message: "Error interno del servidor" });
        }
    },

    registerUsuario: async (req, res) => {
        const { username, password, email, id_rol, nombre_completo } = req.body;

        if (!username || !password || !id_rol || !nombre_completo) {
            return res.status(400).json({ message: "Faltan datos obligatorios" });
        }

        try {
            const result = await UsuarioModel.register(
                username, password, email, id_rol, nombre_completo
            );

            if (!result || result.affectedRows === 0) {
                return res.status(400).json({ message: "No se pudo registrar el usuario" });
            }

            if (req.audit) req.audit.log(AuditEvent.USER_CREATED, { username, id_rol }, { new_user_id: result.insertId });

            return res.status(201).json({
                message: "Usuario registrado con éxito",
                id_usuario: result.insertId
            });
        } catch (err) {
            console.error("Error en register:", err.message);
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ message: "El nombre de usuario ya existe" });
            }
            return res.status(500).json({ message: "Error del servidor al registrar" });
        }
    },

    listarUsuario: async (req, res) => {
        try {
            const users = await UsuarioModel.listarUsuario();
            const safeUsers = users.map(({ password, ...rest }) => rest);
            return res.json(safeUsers);
        } catch (err) {
            console.error("Error al listar usuarios:", err.message);
            return res.status(500).json({ message: "Error al obtener lista de usuarios" });
        }
    },

    editarUsuario: async (req, res) => {
        const { id_usuario } = req.params;
        const datos = req.body;
        try {
            delete datos.password;

            const result = await UsuarioModel.editarUsuario(id_usuario, datos);
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Usuario no encontrado" });
            }

            if (req.audit) req.audit.log(AuditEvent.USER_UPDATED, { target_user_id: Number(id_usuario), changed_fields: Object.keys(datos).join(',') });

            return res.json({ message: "Usuario actualizado con éxito" });
        } catch (err) {
            console.error("Error al editar usuario:", err.message);
            return res.status(500).json({ message: "Error del servidor" });
        }
    },

    eliminarUsuario: async (req, res) => {
        const { id_usuario } = req.params;

        if (req.user && Number(id_usuario) === req.user.id_usuario) {
            return res.status(400).json({ message: "No puedes eliminar tu propio usuario" });
        }

        try {
            const result = await UsuarioModel.eliminarUsuario(id_usuario);
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Usuario no encontrado" });
            }

            if (req.audit) req.audit.log(AuditEvent.USER_DELETED, { target_user_id: Number(id_usuario) });

            return res.json({ message: "Usuario eliminado con éxito" });
        } catch (err) {
            console.error("Error al eliminar usuario:", err.message);
            return res.status(500).json({ message: "Error del servidor" });
        }
    }
};

module.exports = { UsuarioController };
