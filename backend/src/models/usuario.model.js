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
    }
};