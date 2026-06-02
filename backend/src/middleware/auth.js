const { verify } = require('../utils/jwt');

/**
 * Middleware de autenticación JWT.
 * Protege rutas que requieren un usuario autenticado.
 */
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token de autenticación requerido' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token de autenticación requerido' });
  }

  const secret = process.env.JWT_SECRET || 'fallback_secret_change_me';
  const decoded = verify(token, secret);

  if (!decoded) {
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }

  // Adjuntar datos del usuario al request
  req.user = {
    id_usuario: decoded.id_usuario,
    username: decoded.username,
    id_rol: decoded.id_rol,
    nombre_rol: decoded.nombre_rol,
  };

  next();
}

/**
 * Middleware de autorización por roles.
 * @param  {...string} roles - Roles permitidos (ej: 'administrador', 'supervisor')
 */
function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Autenticación requerida' });
    }

    if (!roles.includes(req.user.nombre_rol)) {
      return res.status(403).json({ message: 'No tienes permisos para esta acción' });
    }

    next();
  };
}

module.exports = { authMiddleware, requireRole };
