import { db } from "../database/connection.js";

export const UsuarioModel = {
    // LOGIN: Delegamos la verificación a la función SQL
    login: async (username, password) => { 
        try {
            // 1. Verificamos si la contraseña es correcta usando la función de la DB
            const sqlCheck = "SELECT fn_verificar_contrasena(?, ?) AS es_valido";
            const [checkRows] = await db.query(sqlCheck, [username, password]);
            
            if (checkRows[0].es_valido === 0) {
                return []; // Retorna vacío si no coincide
            }

            // 2. Si es válido, traemos los datos del usuario (SIN la contraseña)
            const sqlUser = `
                SELECT id_usuario, username, nombre_completo, email, estado, id_rol 
                FROM usuario 
                WHERE username = ?
            `;
            const [userRows] = await db.query(sqlUser, [username]);
            return userRows;
            
        } catch (error) {
            console.error("Error en UsuarioModel.login:", error);
            throw error; 
        }
    },

    // REGISTRO: Usamos el SP que encripta automáticamente
    register: async (username, password, email, id_rol, fecha_creacion) => {
        try {
            // Llamamos al SP. Nota: El orden de parámetros debe coincidir con la definición del SP
            const sql = "CALL sp_insertar_usuario(?, ?, ?, ?, ?)";
            
            // El nombre completo no venía en tu controlador original, 
            // asumiré que usas el username o deberías agregarlo al frontend.
            // Por ahora enviamos username como nombre si no hay otro.
            const nombre_completo = username; 

            const [result] = await db.query(sql, [
                username, 
                password, // Enviamos texto plano, el SP lo encripta
                email, 
                nombre_completo, 
                id_rol
            ]);
            
            // En llamadas CALL, el resultado suele venir anidado
            return result[0][0]; // Devuelve { id_usuario: ... }

        } catch (error) {
            console.error("Error en UsuarioModel.register:", error);
            throw error;
        }        
    },

    // ... (listar, editar, eliminar se mantienen igual)
    listarUsuario: async () => {
        const sql = "SELECT id_usuario, username, nombre_completo, email, estado, id_rol FROM usuario";
        const [rows] = await db.query(sql);
        return rows;
    },
    // ...
};