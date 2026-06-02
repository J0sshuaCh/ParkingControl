/**
 * Rate Limiter - Previene ataques de fuerza bruta y DoS.
 * Implementación en memoria sin dependencias externas.
 */

const requests = new Map();

// Limpiar entradas antiguas cada 5 minutos
setInterval(() => {
  const now = Date.now();
  for (const [key, timestamps] of requests.entries()) {
    const filtered = timestamps.filter(t => now - t < 60000);
    if (filtered.length === 0) {
      requests.delete(key);
    } else {
      requests.set(key, filtered);
    }
  }
}, 300000);

/**
 * Crea un middleware de rate limiting.
 * @param {number} maxRequests - Máximo de requests permitidos
 * @param {number} windowMs - Ventana de tiempo en ms
 */
function rateLimiter(maxRequests = 30, windowMs = 60000) {
  return (req, res, next) => {
    const key = req.ip || req.connection.remoteAddress || 'unknown';
    const now = Date.now();

    if (!requests.has(key)) {
      requests.set(key, [now]);
      return next();
    }

    const timestamps = requests.get(key).filter(t => now - t < windowMs);
    timestamps.push(now);
    requests.set(key, timestamps);

    if (timestamps.length > maxRequests) {
      return res.status(429).json({
        message: 'Demasiadas solicitudes. Intente de nuevo en un momento.',
        retryAfter: Math.ceil(windowMs / 1000)
      });
    }

    next();
  };
}

/**
 * Rate limiter específico para login (más restrictivo).
 */
function loginLimiter() {
  return rateLimiter(5, 60000); // 5 intentos por minuto
}

module.exports = { rateLimiter, loginLimiter };
