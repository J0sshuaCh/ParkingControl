import { db } from '../database/db.js';

export class Espacio {
  constructor({ id_espacio, codigo, tipo_espacio}) {
    this.id_espacio = id_espacio;
    this.codigo = codigo;
    this.tipo_espacio = tipo_espacio;
    this.estado = EstadoEspacio.LIBRE;
  }

  async ocupar() {
    try {
      await db.query('CALL sp_marcar_espacio_ocupado(?)', [this.codigo]);
      this.estado = EstadoEspacio.OCUPADO;
      return true;
    } catch (error) {
      console.error(`[Espacio] Error al ejecutar sp_marcar_espacio_ocupado para ${this.codigo}:`, error);
      throw error;
    }    
  }

  async liberar() {    
    try {
      await db.query('CALL sp_marcar_espacio_libre(?)', [this.codigo]);
      this.estado = EstadoEspacio.LIBRE;
      return true;
    } catch (error) {
      console.error(`[Espacio] Error al ejecutar sp_marcar_espacio_libre para ${this.codigo}:`, error);
      throw error;
    }
  }
}