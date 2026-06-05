const fs = require('fs');
const path = require('path');

/**
 * Sistema de Auditoría para ParkingControl.
 * Registra operaciones sensibles en archivos de log y consola.
 */

const LOG_DIR = path.join(__dirname, '..', '..', 'logs');
const AUDIT_FILE = path.join(LOG_DIR, 'audit.log');
const ERROR_FILE = path.join(LOG_DIR, 'error.log');

// Asegurar que el directorio de logs existe
try {
  if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true });
  }
} catch (err) {
  console.warn('No se pudo crear directorio de logs:', err.message);
}

/**
 * Formatea un timestamp ISO para logs.
 */
function timestamp() {
  return new Date().toISOString();
}

/**
 * Escribe una línea en el archivo de auditoría.
 */
function writeAudit(entry) {
  const line = JSON.stringify(entry) + '\n';
  try {
    fs.appendFileSync(AUDIT_FILE, line, 'utf8');
  } catch (err) {
    console.warn('No se pudo escribir en audit.log:', err.message);
  }
}

/**
 * Escribe un error en el archivo de errores.
 */
function writeError(entry) {
  const line = JSON.stringify({ timestamp: timestamp(), ...entry }) + '\n';
  try {
    fs.appendFileSync(ERROR_FILE, line, 'utf8');
  } catch {
    // Silencioso - no queremos que falle por log
  }
}

/**
 * Registra una acción de auditoría.
 *
 * @param {string} action - Tipo de acción (LOGIN, LOGOUT, CREATE_USER, DELETE_USER, etc.)
 * @param {Object} user - Datos del usuario que realizó la acción
 * @param {Object} details - Detalles de la acción (opcional)
 * @param {string} ip - Dirección IP del cliente
 * @param {string} status - Resultado: 'success' | 'failure'
 */
function log(action, user, details = {}, ip = 'unknown', status = 'success') {
  const entry = {
    timestamp: timestamp(),
    action,
    user: user
      ? { id: user.id_usuario, username: user.username, rol: user.nombre_rol }
      : { id: null, username: 'system' },
    ip,
    status,
    details,
  };

  // Log a consola en desarrollo
  if (process.env.NODE_ENV !== 'production') {
    const icon = status === 'success' ? '✓' : '✗';
    console.log(`[AUDIT ${icon}] ${entry.action} | user=${entry.user.username} | ip=${ip} | ${JSON.stringify(details)}`);
  }

  // Log a archivo siempre
  writeAudit(entry);
}

/**
 * Eventos de auditoría predefinidos.
 */
const AuditEvent = {
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGOUT: 'LOGOUT',
  USER_CREATED: 'USER_CREATED',
  USER_UPDATED: 'USER_UPDATED',
  USER_DELETED: 'USER_DELETED',
  VEHICLE_ENTRY: 'VEHICLE_ENTRY',
  TICKET_PAID: 'TICKET_PAID',
  TICKET_ANULLED: 'TICKET_ANULLED',
  TICKET_EDITED: 'TICKET_EDITED',
  SPACE_RESERVED: 'SPACE_RESERVED',
  SPACE_RELEASED: 'SPACE_RELEASED',
  TARIFA_CREATED: 'TARIFA_CREATED',
  TARIFA_UPDATED: 'TARIFA_UPDATED',
  TARIFA_DELETED: 'TARIFA_DELETED',
  REPORT_GENERATED: 'REPORT_GENERATED',
  ACCESS_DENIED: 'ACCESS_DENIED',
  UNAUTHORIZED_ACCESS: 'UNAUTHORIZED_ACCESS',
};

/**
 * Express middleware que inyecta el logger de auditoría en req.
 * Se coloca DESPUÉS de authMiddleware (requiere req.user).
 */
function auditMiddleware() {
  return (req, res, next) => {
    req.audit = {
      /**
       * Registra una acción de auditoría con los datos del request actual.
       */
      log: (action, details = {}, status = 'success') => {
        const ip = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown';
        log(action, req.user || null, details, ip, status);
      },
    };
    next();
  };
}

module.exports = { log, AuditEvent, auditMiddleware, writeError };
