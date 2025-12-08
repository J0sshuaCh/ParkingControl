import { db } from "../database/connection.js";

export const UsuarioModel = {
    // LOGIN
    login: async (username, password) => {
        try {
            // 1. Verificamos contraseña (función SQL existente)
            const sqlCheck = "SELECT fn_verificar_contrasena(?, ?) AS es_valido";
            const [checkRows] = await db.query(sqlCheck, [username, password]);

            if (checkRows[0].es_valido === 0) {
                return [];
            }

            // 2. Si es válido, traemos los datos usando el NUEVO SP
            // Reemplaza el SELECT directo por CALL
            const sqlUser = "CALL sp_usuario_obtener_por_username(?)";
            const [result] = await db.query(sqlUser, [username]);

            // Los SP devuelven los resultados en un array anidado: [[RowDataPacket], OkPacket]
            // Por eso retornamos result[0]
            return result[0];

        } catch (error) {
            console.error("Error en UsuarioModel.login:", error);
            throw error;
        }
    },

    // REGISTRO
    register: async (username, password, email, id_rol, fecha_creacion, nombre_completo) => {
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
    },

    // LISTAR: Adaptado a SP
    listarUsuario: async () => {
        try {
            const sql = "CALL sp_usuario_listar()";
            const [rows] = await db.query(sql);
            // rows[0] contiene el array de usuarios
            return rows[0];
        } catch (error) {
            console.error("Error en UsuarioModel.listarUsuario:", error);
            throw error;
        }
    },

    // EDITAR: Adaptado a SP
    editarUsuario: async (id_usuario, datos) => {
        try {
            const sql = "CALL sp_usuario_editar(?, ?, ?, ?, ?)";

            // Desestructuramos para garantizar el orden de los parámetros del SP
            // Usamos || null para que si el dato no viene, se envíe NULL y el SP mantenga el valor viejo
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
    },

    // ELIMINAR: Adaptado a SP
    eliminarUsuario: async (id_usuario) => {
        try {
            const sql = "CALL sp_usuario_eliminar(?)";
            const [result] = await db.query(sql, [id_usuario]);
            return result;
        } catch (error) {
            console.error("Error en UsuarioModel.eliminarUsuario:", error);
            throw error;
        }
    }
};