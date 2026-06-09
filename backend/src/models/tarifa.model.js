const { db } = require('../database/connection.cjs');

// Lista blanca de campos permitidos para tarifa
const ALLOWED_FIELDS = ['tipo_vehiculo', 'precio_hora', 'fecha_vigencia_inicio', 'fecha_vigencia_fin', 'estado'];

/**
 * Filtra y sanitiza un objeto para solo incluir campos permitidos.
 */
function sanitizeFields(data) {
  const sanitized = {};
  for (const field of ALLOWED_FIELDS) {
    if (data[field] !== undefined) {
      sanitized[field] = data[field];
    }
  }
  return sanitized;
}

async function getAll() {
  try {
    const [rows] = await db.query("SELECT * FROM tarifa ORDER BY tipo_vehiculo ASC");
    return rows;
  } catch (error) {
    console.error("Error en TarifaModel.getAll:", error.message);
    throw error;
  }
}

async function create(data) {
  try {
    const sanitized = sanitizeFields(data);

    // Usar INSERT con campos y valores explícitos en lugar de SET ?
    const fields = Object.keys(sanitized);
    const values = Object.values(sanitized);
    const placeholders = fields.map(() => '?').join(', ');

    const sql = `INSERT INTO tarifa (${fields.join(', ')}) VALUES (${placeholders})`;
    const [result] = await db.query(sql, values);

    return { ...sanitized, id_tarifa: result.insertId };
  } catch (error) {
    console.error("Error en TarifaModel.create:", error.message);
    throw error;
  }
}

async function update(id_tarifa, data) {
  try {
    const sanitized = sanitizeFields(data);

    if (Object.keys(sanitized).length === 0) {
      return false;
    }

    const setClauses = Object.keys(sanitized).map(field => `${field} = ?`).join(', ');
    const values = [...Object.values(sanitized), id_tarifa];

    const sql = `UPDATE tarifa SET ${setClauses} WHERE id_tarifa = ?`;
    const [result] = await db.query(sql, values);

    return result.affectedRows > 0;
  } catch (error) {
    console.error("Error en TarifaModel.update:", error.message);
    throw error;
  }
}

async function deleteTarifa(id_tarifa) {
  try {
    const sql = "DELETE FROM tarifa WHERE id_tarifa = ?";
    const [result] = await db.query(sql, [id_tarifa]);
    return result.affectedRows > 0;
  } catch (error) {
    console.error("Error en TarifaModel.delete:", error.message);
    throw error;
  }
}

module.exports = {
  getAll,
  create,
  update,
  delete: deleteTarifa
};
