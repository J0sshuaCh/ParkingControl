const { db } = require('../database/connection.cjs'); 

// LOGIN
async function login(username, password) {
    try {
        // 1. Verificamos contraseña (función SQL existente)
        const sqlCheck = "SELECT fn_verificar_contrasena(?, ?) AS es_valido";
        const [checkRows] = await db.query(sqlCheck, [username, password]);

        if (checkRows[0].es_valido === 0) {
            return [];
        }

        // 2. Si es válido, traemos los datos usando el NUEVO SP
        const sqlUser = "CALL sp_usuario_obtener_por_username(?)";
        const [result] = await db.query(sqlUser, [username]);

        // Retornamos result[0]
        return result[0];

    } catch (error) {
        console.error("Error en UsuarioModel.login:", error);
        throw error;
    }
}

// REGISTRO
async function register(username, password, email, id_rol, fecha_creacion, nombre_completo) {
    try {
        const sql = "CALL sp_insertar_usuario(?, ?, ?, ?, ?)";

        const [result] = await db.query(sql, [
            username,
            password,
            email,
            nombre_completo,
            id_rol
        ]);

        return result[0][0];

    } catch (error) {
        console.error("Error en UsuarioModel.register:", error);
        throw error;
    }
}

// LISTAR: Adaptado a SP
async function listarUsuario() {
    try {
        const sql = "CALL sp_usuario_listar()";
        const [rows] = await db.query(sql);
        return rows[0];
    } catch (error) {
        console.error("Error en UsuarioModel.listarUsuario:", error);
        throw error;
    }
}

// EDITAR: Adaptado a SP
async function editarUsuario(id_usuario, datos) {
    try {
        const sql = "CALL sp_usuario_editar(?, ?, ?, ?, ?)";

        // Desestructuramos para garantizar el orden de los parámetros del SP
        const { nombre_completo, email, estado, id_rol } = datos;

        const [result] = await db.query(sql, [
            id_usuario,
            nombre_completo || null,
            email || null,
            estado || null,
            id_rol || null
        ]);

        return result;

    } catch (error) {
        console.error("Error en UsuarioModel.editarUsuario:", error);
        throw error;
    }
}

// ELIMINAR: Adaptado a SP
async function eliminarUsuario(id_usuario) {
    try {
        const sql = "CALL sp_usuario_eliminar(?)";
        const [result] = await db.query(sql, [id_usuario]);
        return result;

    } catch (error) {
        console.error("Error en UsuarioModel.eliminarUsuario:", error);
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