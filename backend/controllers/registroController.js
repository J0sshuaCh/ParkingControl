import { db } from '../config/db.js';
import { asignarEspacioDisponible } from '../services/asignacionService.js';
import { v4 as uuidv4 } from 'uuid';

// HU1: Registrar entrada de vehículo
export const registrarEntrada = async (req, res) => {
  try {
    const { placa, tipo_vehiculo, id_usuario } = req.body;

    // Verificar si el vehículo ya está dentro
    const [vehiculosActivos] = await db.query(`
      SELECT v.placa FROM ticket t
      JOIN vehiculos v ON t.id_vehiculo = v.id_vehiculo
      WHERE t.estado = 'Emitido' AND v.placa = ?`, [placa]);
    if (vehiculosActivos.length > 0)
      return res.status(400).json({ msg: 'El vehículo ya se encuentra dentro.' });

    // Buscar o registrar vehículo
    const [existe] = await db.query("SELECT * FROM vehiculos WHERE placa=?", [placa]);
    let idVehiculo;
    if (existe.length === 0) {
      const [result] = await db.query(
        "INSERT INTO vehiculos (placa, tipo_vehiculo, fecha_registro) VALUES (?, ?, NOW())",
        [placa, tipo_vehiculo]
      );
      idVehiculo = result.insertId;
    } else {
      idVehiculo = existe[0].id_vehiculo;
    }

    // Asignar espacio disponible
    const espacio = await asignarEspacioDisponible();
    if (!espacio) return res.status(400).json({ msg: 'No hay espacios disponibles.' });

    // Crear ticket
    const codigo = 'TCK-' + uuidv4().slice(0, 8);
    await db.query(
      `INSERT INTO ticket (codigo_ticket, hora_entrada, id_vehiculo, id_espacio, id_usuario_entrada, estado, fecha_emision)
       VALUES (?, NOW(), ?, ?, ?, 'Emitido', NOW())`,
      [codigo, idVehiculo, espacio.id_espacio, id_usuario]
    );

    res.status(201).json({ msg: 'Entrada registrada', codigo_ticket: codigo, espacio_asignado: espacio.numero_espacio });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al registrar entrada', error });
  }
};

// HU3: Consultar historial de ingresos
export const listarIngresos = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT t.codigo_ticket, v.placa, v.tipo_vehiculo, t.hora_entrada, e.numero_espacio
      FROM ticket t
      JOIN vehiculos v ON t.id_vehiculo = v.id_vehiculo
      JOIN espacio e ON t.id_espacio = e.id_espacio
      ORDER BY t.hora_entrada DESC LIMIT 20`);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ msg: 'Error al listar ingresos', error });
  }
};
