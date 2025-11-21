import { UsuarioModel } from "../models/usuario.model.js";

export const loginUsuario = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Faltan datos" });
  }

  UsuarioModel.login(username, password, (err, results) => {
    if (err) {
      console.error("Error en login:", err);
      return res.status(500).json({ message: "Error del servidor" });
    }

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
  });
};
