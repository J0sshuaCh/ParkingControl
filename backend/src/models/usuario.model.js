import { db } from "../database/connection.js";

export const UsuarioModel = {
  login: (username, password, callback) => {
    const sql = "SELECT * FROM usuario WHERE username = ? AND password = ?";
    db.query(sql, [username, password], callback);
  }
};
