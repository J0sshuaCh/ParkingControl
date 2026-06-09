const { db } = require('../database/connection.cjs');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 12;

// LOGIN
async function login(username, password) {
    try {
        // Obtener datos del usuario
        const sqlUser = "CALL sp_usuario_obtener_por_username(?)";
        const [result] = await db.query(sqlUser, [username]);

        if (!result[0] || result[0].length === 0) {
            return [];
        }

        const user = result[0][0];

        // Verificar contraseña con bcrypt
        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            return [];
        }

        return result[0];
    } catch (error) {
        console.error("Error en UsuarioModel.login:", error.message);
        throw error;
    }
}

// REGISTRO
async function register(username, password, email, id_rol, nombre_completo) {
    try {
        // Hashear contraseña con bcrypt
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const sql = "CALL sp_insertar_usuario(?, ?, ?, ?, ?)";

        const [result] = await db.query(sql, [
            username,
            hashedPassword,  // Enviar hash bcrypt (el SP no re-hashea)
            email,
            nombre_completo,
            id_rol
        ]);

        return result[0][0];
    } catch (error) {
        console.error("Error en UsuarioModel.register:", error.message);
        throw error;
    }
}

// LISTAR
async function listarUsuario() {
    try {
        const sql = "CALL sp_usuario_listar()";
        const [rows] = await db.query(sql);
        return rows[0];
    } catch (error) {
        console.error("Error en UsuarioModel.listarUsuario:", error.message);
        throw error;
    }
}

// EDITAR
async function editarUsuario(id_usuario, datos) {
    try {
        // Si se envía password, hashearlo con bcrypt
        if (datos.password) {
            datos.password = await bcrypt.hash(datos.password, SALT_ROUNDS);
        }

        const sql = "CALL sp_usuario_editar(?, ?, ?, ?, ?)";
        const { nombre_completo, email, estado, id_rol, password } = datos;

        const [result] = await db.query(sql, [
            id_usuario,
            nombre_completo || null,
            email || null,
            estado || null,
            id_rol || null
        ]);

        return result;
    } catch (error) {
        console.error("Error en UsuarioModel.editarUsuario:", error.message);
        throw error;
    }
}

// ELIMINAR
async function eliminarUsuario(id_usuario) {
    try {
        const sql = "CALL sp_usuario_eliminar(?)";
        const [result] = await db.query(sql, [id_usuario]);
        return result;
    } catch (error) {
        console.error("Error en UsuarioModel.eliminarUsuario:", error.message);
        throw error;
    }
}

module.exports = {
    UsuarioModel: {
        login,
        register,
        listarUsuario,
        editarUsuario,
        eliminarUsuario
    }
};
