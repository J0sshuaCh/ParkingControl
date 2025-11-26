import { db } from "../database/connection.js";

export const UsuarioModel = {
    // La función es asíncrona y ya no acepta el 'callback'
    login: async (username, password) => { 
        const sql = "SELECT * FROM usuario WHERE username = ? AND password = ?";
        
        try {
            // Usamos await en db.query. Esto devuelve un array [rows, fields].
            const [rows] = await db.query(sql, [username, password]); 
            return rows; // Retornamos las filas encontradas
        } catch (error) {
            // Propagamos el error para que el controlador lo maneje
            console.error("Error en el modelo de login:", error);
            throw error; 
        }
    },

    register: async (username, password, email, id_rol, fecha_creacion) => {
        const sql = "INSERT INTO usuario (username, password, email, id_rol, fecha_creacion) VALUES (?, ?, ?, ?, ?)";
        try {
            const [result] = await db.query(sql, [username, password, email, id_rol, fecha_creacion]);
            return result;
        } catch (error) {
            console.error("Error en el modelo de register:", error);
            throw error;
        }        
    },

    listarUsuario: async () => {
        const sql = "SELECT * FROM usuario";
        try {
            const [rows] = await db.query(sql);
            return rows;
        } catch (error) {
            console.error("Error en el modelo de listar usuarios:", error);
            throw error;
        }
    },

    editarUsuario: async (id_usuario, datos) => {
        const sql = "UPDATE usuario SET ? WHERE id_usuario = ?";
        try {
            const [result] = await db.query(sql, [datos, id_usuario]);
            return result;
        } catch (error) {
            console.error("Error en el modelo de editar usuario:", error);
            throw error;
        }
    },

    eliminarUsuario: async (id_usuario) => {
        const sql = "DELETE FROM usuario WHERE id_usuario = ?";
        try {
            const [result] = await db.query(sql, [id_usuario]);
            return result;
        } catch (error) {
            console.error("Error en el modelo de eliminar usuario:", error);
            throw error;
        }
    }
};