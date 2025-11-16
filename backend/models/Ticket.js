export class Ticket {
  constructor({ id_ticket, hora_ingreso, espacio_id}) {
    this.id_ticket = id_ticket;
    this.hora_ingreso = hora_ingreso;
    this.hora_salida = null;
    this.monto_calculado = 0.0;
    this.estado = EstadoTicket.EMITIDO; // Se inicializa a EMITIDO
    this.espacio_id = espacio_id;
    this.vehiculo_placa = '';
  }

  /**
     * Inicializa el ticket con los datos de ingreso.
     * @param {Vehiculo} v - El vehículo que ingresa.
     * @param {Espacio} e - El espacio asignado.
     * @param {Date} hora - La hora de ingreso.
     */
    emitir(v, e, hora) {
        this.hora_entrada = hora;
        this.estado = EstadoTicket.EMITIDO;
        this.espacioID = e.id_espacio;
        this.vehiculo_placa = v.placa;
        console.log(`Ticket ${this.id} emitido. Vehículo: ${v.placa}, Espacio ID: ${e.id_espacio}`);
    }

    /**
     * Calcula la duración total del parqueo en minutos.
     * @returns {number} Duración en minutos.
     */
    calcularDuracion() {
        if (!this.hora_salida || !this.hora_ingreso) {
            console.error("No se puede calcular la duración: Falta hora de ingreso o salida.");
            return 0;
        }
        
        // Calcula la diferencia en milisegundos y la convierte a minutos (dividiendo por 60000)
        const diffMs = this.hora_salida.getTime() - this.hora_ingreso.getTime();
        const duracionMinutos = diffMs / 60000;
        
        // Redondea al minuto más cercano (como en el código Python)
        return Math.round(duracionMinutos);
    }

    /**
     * Registra la hora de salida del vehículo.
     * @param {Date} hora - La hora de salida.
     */
    registrar_salida(hora) {
        this.hora_salida = hora;
        console.log(`Hora de salida registrada: ${hora.toLocaleTimeString()}`);
    }

    /**
     * Consolida el cobro, calculando el monto total y cambiando el estado a COBRADO.
     * El parámetro 'monto' de Python no se usa, ya que la lógica de cálculo está aquí.
     */
    consolidar_cobro() {
        if (this.estado !== EstadoTicket.EMITIDO) {
            console.error("No se puede consolidar el cobro: El ticket no está EMITIDO.");
            return;
        }

        const duracion = this.calcularDuracion();
        // Llama al método estático de PrecioParqueo para obtener la tarifa por minuto
        const tarifaMinuto = PrecioParqueo.getPrecioParqueo(); 
        
        this.monto_cobrado = duracion * tarifaMinuto;
        this.estado = EstadoTicket.COBRADO;
        
        console.log(`Cobro consolidado. Duración: ${duracion} min. Monto: $${this.monto_cobrado.toFixed(2)}.`);
    }
}