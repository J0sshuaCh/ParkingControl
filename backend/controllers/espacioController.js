import db from '../config/db.js';

// HU7: Visualizar mapa de ocupación en tiempo real
export const listarEspacios = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        e.id_espacio, 
        e.numero_espacio AS id, 
        e.estado AS status,
        (SELECT v.placa FROM ticket t 
         JOIN vehiculos v ON t.id_vehiculo = v.id_vehiculo 
         WHERE t.id_espacio = e.id_espacio AND t.estado = 'Emitido' LIMIT 1) AS vehiclePlate,
        (SELECT r.motivo FROM reserva r 
         WHERE r.id_espacio = e.id_espacio AND r.estado = 'Activa' LIMIT 1) AS reservedFor,
        (SELECT r.duracion FROM reserva r 
         WHERE r.id_espacio = e.id_espacio AND r.estado = 'Activa' LIMIT 1) AS reservedUntil
      FROM espacio e
    `);
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al obtener espacios', error });
  }
};

// HU8: Reservar un espacio manualmente
export const reservarEspacio = async (req, res) => {
  try {
    const { id_espacio } = req.params;
    const { motivo, duracion, id_usuario } = req.body;

    const [espacios] = await db.query("SELECT estado FROM espacio WHERE id_espacio = ?", [id_espacio]);
    if (espacios.length === 0) {
      return res.status(404).json({ msg: 'Espacio no encontrado.' });
    }
    if (espacios[0].estado !== 'Libre') {
      return res.status(400).json({ msg: 'El espacio no está libre y no se puede reservar.' });
    }

    await db.query("UPDATE espacio SET estado = 'Reservado' WHERE id_espacio = ?", [id_espacio]);

    // Asumimos que tu tabla 'reserva' tiene las columnas 'motivo' y 'duracion'
    await db.query(
      `INSERT INTO reserva (id_espacio, id_usuario_creador, fecha_inicio, motivo, duracion, estado) 
       VALUES (?, ?, NOW(), ?, ?, 'Activa')`,
      [id_espacio, id_usuario, motivo, duracion]
    );

    res.status(201).json({ msg: 'Espacio reservado exitosamente.' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al reservar espacio', error });
  }
};