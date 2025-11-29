import { UsuarioModel } from "../models/usuario.model.js";

export const UsuarioController = {
    loginUsuario: async (req, res) => {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Faltan datos" });
        }

        try {
            const results = await UsuarioModel.login(username, password);
            
            if (results.length === 0) {
                return res.status(401).json({ message: "Usuario o contraseña incorrectos" });
            }

            const user = results[0];

            return res.json({
                message: "Login exitoso",
                user: {
                    id_usuario: user.id_usuario,
                    username: user.username,
                    nombre_completo: user.nombre_completo, // Importante para el frontend
                    email: user.email,
                    estado: user.estado,
                    id_rol: user.id_rol
                }
            });

        } catch (err) {
            console.error("Error en login:", err);
            return res.status(500).json({ message: "Error interno del servidor" });
        }
    },

    registerUsuario: async (req, res) => {
        const { username, password, email, id_rol } = req.body;
        // Fecha creación automática si no viene
        const fecha_creacion = new Date();

        if (!username || !password || !id_rol) {
            return res.status(400).json({ message: "Faltan datos obligatorios" });
        }

        try {
            const result = await UsuarioModel.register(username, password, email, id_rol, fecha_creacion);

            // CORRECCIÓN: Usamos 'result' (singular) y verificamos affectedRows
            if (result.affectedRows === 0) {
                return res.status(400).json({ message: "No se pudo registrar el usuario" });
            }

            return res.status(201).json({
                message: "Usuario registrado con éxito",
                id_usuario: result.insertId
            });
        } catch (err) {
            console.error("Error en register:", err);
            // Verificar si es error de duplicado (username único)
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ message: "El nombre de usuario ya existe" });
            }
            return res.status(500).json({ message: "Error del servidor al registrar" });
        }
    },

    listarUsuario: async (req, res) => {
        try {
            const users = await UsuarioModel.listarUsuario();
            return res.json(users);
        } catch (err) {
            console.error("Error al listar usuarios:", err);
            return res.status(500).json({ message: "Error al obtener lista de usuarios" });
        }
    },

    editarUsuario: async (req, res) => {
        const { id_usuario } = req.params;
        const datos = req.body;
        try {
            const result = await UsuarioModel.editarUsuario(id_usuario, datos);
            if (result.affectedRows === 0) return res.status(404).json({ message: "Usuario no encontrado" });
            
            return res.json({ message: "Usuario actualizado con éxito" });
        } catch (err) {
            console.error("Error al editar usuario:", err);
            return res.status(500).json({ message: "Error del servidor" });
        }
    },

    eliminarUsuario: async (req, res) => {
        const { id_usuario } = req.params;
        try {
            const result = await UsuarioModel.eliminarUsuario(id_usuario);
            if (result.affectedRows === 0) return res.status(404).json({ message: "Usuario no encontrado" });

            return res.json({ message: "Usuario eliminado con éxito" });
        } catch (err) {
            console.error("Error al eliminar usuario:", err);
            return res.status(500).json({ message: "Error del servidor" });
        }
    }
};