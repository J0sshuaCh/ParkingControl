import { db } from '../config/db.js';

export async function asignarEspacioDisponible() {
  const [rows] = await db.query("SELECT * FROM espacio WHERE estado='Disponible' LIMIT 1");
  if (rows.length === 0) return null;

  const espacio = rows[0];
  await db.query("UPDATE espacio SET estado='Ocupado' WHERE id_espacio=?", [espacio.id_espacio]);
  return espacio;
}