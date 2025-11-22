import { UsuarioModel } from "../models/usuario.model.js";

// Hacemos que la función sea asíncrona
export const loginUsuario = async (req, res) => {
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
};