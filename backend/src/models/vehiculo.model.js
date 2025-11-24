import { db } from '../database/connection.js';

export const VehiculoModel = {
  // 1. Obtener espacios libres
  obtenerEspaciosLibres: async () => {
    // Asegúrate de seleccionar el ID y el Código para el frontend
    const sql = "SELECT id_espacio, codigo FROM espacio WHERE estado = 'libre' ORDER BY codigo ASC";
    const [rows] = await db.query(sql);
    return rows;
  },

  // 2. Buscar tarifa vigente para el tipo de vehículo (Necesario para el ticket)
  obtenerTarifa: async (tipoVehiculo) => {
    const sql = "SELECT id_tarifa FROM tarifa WHERE tipo_vehiculo = ? AND estado = 'En vigencia' LIMIT 1";
    const [rows] = await db.query(sql, [tipoVehiculo]);
    return rows[0];
  },

  // 3. Registrar Ingreso COMPLETO (Vehículo + Espacio + Ticket)
  registrarIngreso: async (placa, tipoVehiculo, idEspacio, idTarifa) => {
    const connection = await db.getConnection(); // Usamos una conexión dedicada para la transacción
    try {
      await connection.beginTransaction();

      // A. Insertar o Actualizar Vehículo
      // Si la placa ya existe, actualizamos su info para "reactivar" el vehículo en el sistema
      const sqlVehiculo = `
        INSERT INTO vehiculos (placa, tipo_vehiculo, id_espacio, fecha_registro) 
        VALUES (?, ?, ?, NOW())
        ON DUPLICATE KEY UPDATE 
            tipo_vehiculo = VALUES(tipo_vehiculo), 
            id_espacio = VALUES(id_espacio), 
            fecha_registro = NOW()
      `;
      await connection.query(sqlVehiculo, [placa, tipoVehiculo, idEspacio]);

      // Recuperar ID del vehículo (necesario porque insertId puede no ser fiable en update)
      const [rowsV] = await connection.query("SELECT id_vehiculo FROM vehiculos WHERE placa = ?", [placa]);
      const idVehiculo = rowsV[0].id_vehiculo;

      // B. Actualizar Espacio a 'ocupado'
      const sqlEspacio = "UPDATE espacio SET estado = 'ocupado' WHERE id_espacio = ?";
      await connection.query(sqlEspacio, [idEspacio]);

      // C. Generar Ticket Inicial
      // Generamos un código de ticket simple, ej: TK-123
      const codigoTicket = `TK-${Date.now().toString().slice(-6)}`;
      const sqlTicket = `
                INSERT INTO ticket 
                (codigo_ticket, hora_entrada, estado, id_vehiculo, id_espacio, id_tarifa, id_usuario_entrada) 
                VALUES (?, NOW(), 'Emitido', ?, ?, ?, 1)
            `;
      // Nota: id_usuario_entrada = 1 (Admin hardcodeado por ahora, luego vendrá del login)
      await connection.query(sqlTicket, [codigoTicket, idVehiculo, idEspacio, idTarifa]);

      await connection.commit();
      return { id_vehiculo: idVehiculo, codigo_ticket: codigoTicket };

    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  },

  // 4. Listar vehículos activos (con ticket emitido)
  obtenerVehiculosEnParqueo: async () => {
    const sql = `
            SELECT v.id_vehiculo, v.placa, v.tipo_vehiculo, 
                   date_format(t.hora_entrada, "%H:%i") as hora_ingreso, 
                   e.codigo as espacio, 'Activo' as status, t.codigo_ticket
            FROM vehiculos v
            JOIN espacio e ON v.id_espacio = e.id_espacio
            JOIN ticket t ON v.id_vehiculo = t.id_vehiculo
            WHERE t.estado = 'Emitido'
            ORDER BY t.hora_entrada DESC
        `;
    const [rows] = await db.query(sql);
    return rows;
  }
};