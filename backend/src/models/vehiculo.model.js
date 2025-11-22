import { db } from "../database/connection.js";

export const VehiculoModel = {
  // 1. Obtener espacios que estén 'libre' (para llenar dropdown o asignación auto)
  obtenerEspaciosLibres: (callback) => {
    const sql = "SELECT * FROM espacio WHERE estado = 'libre'";
    db.query(sql, callback);
  },

  // 2. Crear el vehículo guardando placa, tipo y el id del espacio
  crear: (data, callback) => {
    const sql = "INSERT INTO vehiculo (placa, tipo_vehiculo, id_espacio, fecha_registro) VALUES (?, ?, ?, NOW())";
    db.query(sql, [data.placa, data.tipo_vehiculo, data.id_espacio], callback);
  },

  // 3. Actualizar el estado del espacio a 'ocupado' una vez asignado
  ocuparEspacio: (id_espacio, callback) => {
    const sql = "UPDATE espacio SET estado = 'ocupado' WHERE id_espacio = ?";
    db.query(sql, [id_espacio], callback);
  },

  // 4. Obtener todos los vehículos en espacios ocupados
  vehiculosEnEspaciosOcupados: (callback) => {
    const sql = "SELECT v.*, e.codigo AS codigo_espacio FROM vehiculo v JOIN espacio e ON v.id_espacio = e.id_espacio WHERE e.estado = 'ocupado'";
    db.query(sql, callback);
  }
};