export class Espacio {
  constructor({ id_espacio, codigo, numero_espacio}) {
    this.id_espacio = id_espacio;
    this.codigo = codigo;
    this.numero_espacio = numero_espacio;
    this.estado = EstadoEspacio.LIBRE;
  }

  ocupar() {
    this.estado = EstadoEspacio.OCUPADO;
  }

  liberar() {
    this.estado = EstadoEspacio.LIBRE;
  }
}