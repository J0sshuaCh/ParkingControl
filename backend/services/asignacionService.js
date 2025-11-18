import db from '../config/db.js';

// Define y exporta la función
export async function asignarEspacioDisponible() {
  
  // Tu script SQL usa 'Libre'
  const [rows] = await db.query("SELECT * FROM espacio WHERE estado='Libre' LIMIT 1"); 
  if (rows.length === 0) return null;

  const espacio = rows[0];
  
  // Esta lógica la movimos al controlador (registroController.js)
  // para que solo se marque como ocupado si el ticket se crea.
  
  return espacio;
}