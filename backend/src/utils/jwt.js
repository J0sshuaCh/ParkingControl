const crypto = require('crypto');

/**
 * JWT Utility - Implementación propia sin dependencias externas.
 * Genera y verifica tokens JWT usando HMAC-SHA256.
 */

const ALGORITHM = 'HS256';

function base64urlEncode(str) {
  return Buffer.from(str)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

function base64urlDecode(str) {
  // Restaurar padding y caracteres
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  while (str.length % 4) str += '=';
  return Buffer.from(str, 'base64').toString('utf8');
}

/**
 * Genera un token JWT.
 * @param {Object} payload - Datos a incluir en el token (ej: { id_usuario, username, id_rol })
 * @param {string} secret - Clave secreta para firmar
 * @param {string} expiresIn - Tiempo de expiración (ej: '8h', '1d')
 */
function sign(payload, secret, expiresIn = '8h') {
  const header = { alg: ALGORITHM, typ: 'JWT' };

  const now = Math.floor(Date.now() / 1000);
  const expiresInSeconds = parseExpiresIn(expiresIn);

  const fullPayload = {
    ...payload,
    iat: now,
    exp: now + expiresInSeconds,
  };

  const encodedHeader = base64urlEncode(JSON.stringify(header));
  const encodedPayload = base64urlEncode(JSON.stringify(fullPayload));
  const signatureInput = `${encodedHeader}.${encodedPayload}`;

  const signature = crypto
    .createHmac('sha256', secret)
    .update(signatureInput)
    .digest('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

/**
 * Verifica y decodifica un token JWT.
 * @returns {Object|null} Payload decodificado o null si es inválido/expirado
 */
function verify(token, secret) {
  if (!token || typeof token !== 'string') return null;

  const parts = token.split('.');
  if (parts.length !== 3) return null;

  const [encodedHeader, encodedPayload, signature] = parts;

  // Verificar firma
  const signatureInput = `${encodedHeader}.${encodedPayload}`;
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(signatureInput)
    .digest('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  if (signature !== expectedSignature) return null;

  // Decodificar payload
  let payload;
  try {
    payload = JSON.parse(base64urlDecode(encodedPayload));
  } catch {
    return null;
  }

  // Verificar expiración
  const now = Math.floor(Date.now() / 1000);
  if (payload.exp && payload.exp < now) return null;

  return payload;
}

function parseExpiresIn(expiresIn) {
  const match = expiresIn.match(/^(\d+)(s|m|h|d)$/);
  if (!match) return 28800; // default 8h

  const value = parseInt(match[1], 10);
  const unit = match[2];

  switch (unit) {
    case 's': return value;
    case 'm': return value * 60;
    case 'h': return value * 3600;
    case 'd': return value * 86400;
    default: return 28800;
  }
}

module.exports = { sign, verify };
