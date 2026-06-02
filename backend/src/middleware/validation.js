/**
 * Middleware de validación de inputs.
 * Sanitiza y valida datos de entrada para prevenir inyecciones y datos maliciosos.
 */

const MAX_STRING_LENGTH = 255;
const ALLOWED_USERNAME_REGEX = /^[a-zA-Z0-9_\-.]{3,50}$/;
const ALLOWED_PLATE_REGEX = /^[a-zA-Z0-9\-]{1,20}$/;
const ALLOWED_EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Valida y sanitiza un string.
 */
function sanitizeString(value, maxLength = MAX_STRING_LENGTH) {
  if (typeof value !== 'string') return '';
  return value.trim().substring(0, maxLength);
}

/**
 * Middleware para validar login.
 */
function validateLogin(req, res, next) {
  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({ message: 'Usuario y contraseña son requeridos' });
  }

  if (typeof username !== 'string' || typeof password !== 'string') {
    return res.status(400).json({ message: 'Formato inválido' });
  }

  if (username.length > 100 || password.length > 255) {
    return res.status(400).json({ message: 'Longitud excede el límite permitido' });
  }

  req.body.username = sanitizeString(username);
  // No sanitizar password - se compara tal cual con bcrypt

  next();
}

/**
 * Middleware para validar registro de usuario.
 */
function validateRegister(req, res, next) {
  const { username, password, nombre_completo, email, id_rol } = req.body || {};

  if (!username || !password || !nombre_completo || !id_rol) {
    return res.status(400).json({ message: 'Faltan datos obligatorios' });
  }

  if (!ALLOWED_USERNAME_REGEX.test(username)) {
    return res.status(400).json({
      message: 'Nombre de usuario inválido. Use 3-50 caracteres: letras, números, _, -, .'
    });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'La contraseña debe tener al menos 6 caracteres' });
  }

  if (password.length > 128) {
    return res.status(400).json({ message: 'La contraseña excede la longitud máxima' });
  }

  if (nombre_completo.length > 100) {
    return res.status(400).json({ message: 'El nombre completo excede la longitud máxima' });
  }

  if (email && !ALLOWED_EMAIL_REGEX.test(email)) {
    return res.status(400).json({ message: 'Formato de email inválido' });
  }

  const allowedRoles = [1, 2, 3];
  if (!allowedRoles.includes(Number(id_rol))) {
    return res.status(400).json({ message: 'Rol no válido' });
  }

  next();
}

/**
 * Middleware para validar tarifas.
 */
function validateTarifa(req, res, next) {
  const { tipo_vehiculo, precio_hora, estado } = req.body || {};

  const allowedTypes = ['Sedan', 'SUV', 'Compacto', 'Camioneta', 'Moto'];
  if (tipo_vehiculo && !allowedTypes.includes(tipo_vehiculo)) {
    return res.status(400).json({ message: 'Tipo de vehículo no válido' });
  }

  if (precio_hora !== undefined) {
    const precio = Number(precio_hora);
    if (isNaN(precio) || precio < 0 || precio > 10000) {
      return res.status(400).json({ message: 'Precio por hora no válido' });
    }
    req.body.precio_hora = precio;
  }

  const allowedStatuses = ['En vigencia', 'Pasado'];
  if (estado && !allowedStatuses.includes(estado)) {
    return res.status(400).json({ message: 'Estado no válido' });
  }

  // Sanitizar el resto de campos
  const sanitizedBody = {};
  const allowedFields = ['tipo_vehiculo', 'precio_hora', 'fecha_vigencia_inicio', 'fecha_vigencia_fin', 'estado'];
  for (const field of allowedFields) {
    if (req.body[field] !== undefined) {
      sanitizedBody[field] = typeof req.body[field] === 'string'
        ? sanitizeString(req.body[field])
        : req.body[field];
    }
  }
  req.body = sanitizedBody;

  next();
}

/**
 * Middleware para validar registro de entrada de vehículo.
 */
function validateVehicleEntry(req, res, next) {
  const { placa, tipo_vehiculo } = req.body || {};

  if (!placa || !tipo_vehiculo) {
    return res.status(400).json({ message: 'Placa y tipo de vehículo son obligatorios' });
  }

  if (!ALLOWED_PLATE_REGEX.test(placa)) {
    return res.status(400).json({ message: 'Formato de placa inválido. Use letras, números y guiones.' });
  }

  const allowedTypes = ['Sedan', 'SUV', 'Compacto', 'Camioneta', 'Moto'];
  if (!allowedTypes.includes(tipo_vehiculo)) {
    return res.status(400).json({ message: 'Tipo de vehículo no válido' });
  }

  if (req.body.modo_asignacion && !['auto', 'manual'].includes(req.body.modo_asignacion)) {
    return res.status(400).json({ message: 'Modo de asignación no válido' });
  }

  next();
}

/**
 * Middleware para validar pago de ticket.
 */
function validatePayment(req, res, next) {
  const { id_ticket, monto_final } = req.body || {};

  if (!id_ticket || monto_final === undefined) {
    return res.status(400).json({ message: 'ID de ticket y monto final son requeridos' });
  }

  const id = Number(id_ticket);
  const monto = Number(monto_final);

  if (isNaN(id) || id <= 0) {
    return res.status(400).json({ message: 'ID de ticket no válido' });
  }

  if (isNaN(monto) || monto < 0) {
    return res.status(400).json({ message: 'Monto no válido' });
  }

  req.body.id_ticket = id;
  req.body.monto_final = monto;
  next();
}

module.exports = {
  validateLogin,
  validateRegister,
  validateTarifa,
  validateVehicleEntry,
  validatePayment,
  sanitizeString,
};
