import { UsuarioModel } from "../models/usuario.model.js";

export const UsuarioController = {
    loginUsuario: async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Faltan datos" });
    }

    try {
        // Usamos await para esperar el resultado del modelo
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
                nombre_completo: user.nombre_completo,
                email: user.email,
                estado: user.estado,
                id_rol: user.id_rol
            }
        });

    } catch (err) {
        // Manejo centralizado de errores de la base de datos
        console.error("Error en login:", err);
        return res.status(500).json({ message: "Error del servidor al procesar el login" });
    }
},

registerUsuario: async (req, res) => {
    const { username, password, email, id_rol, fecha_creacion } = req.body;
    if (!username || !password || !email || !id_rol || !fecha_creacion) {
        return res.status(400).json({ message: "Faltan datos" });
    }
    try {
        const result = await UsuarioModel.register(username, password, email, id_rol, fecha_creacion);

        if(results.length===0) {
            return res.status(401).json({ message: "No se pudo registrar el usuario" });
        }

        return res.status(201).json({
            message: "Usuario registrado con éxito",
            id_usuario: result.insertId
        });
    } catch (err) {
        console.error("Error en register:", err);
        return res.status(500).json({ message: "Error del servidor al procesar el registro" });
    }
},

listarUsuario: async (req, res) => {
    try {
        const users = await UsuarioModel.listarUsuario();
        return res.json(users);
    } catch (err) {
        console.error("Error al listar usuarios:", err);
        return res.status(500).json({ message: "Error del servidor al listar usuarios" });
    }
},

editarUsuario: async (req, res) => {
    const { id_usuario } = req.params;
    const datos = req.body;
    try {
        await UsuarioModel.editarUsuario(id_usuario, datos);
        return res.json({ message: "Usuario actualizado con éxito" });
    } catch (err) {
        console.error("Error al editar usuario:", err);
        return res.status(500).json({ message: "Error del servidor al editar usuario" });
    }
},

eliminarUsuario: async (req, res) => {
    const { id_usuario } = req.params;
    try {
        await UsuarioModel.eliminarUsuario(id_usuario);
        return res.json({ message: "Usuario eliminado con éxito" });
    } catch (err) {
        console.error("Error al eliminar usuario:", err);
        return res.status(500).json({ message: "Error del servidor al eliminar usuario" });
    }

}
};