export class Ticket {
  constructor({ codigo_ticket, hora_entrada, id_vehiculo, id_espacio}) {
    this.id_ticket = id_ticket;
    this.codigo_ticket = codigo_ticket;
    this.hora_entrada = hora_entrada;
    this.hora_salida = null;
    //tiempo_permanencia se puede calcular con calcularDuracion, no es necesario almacenarlo
    this.monto_total = 0.0;
    this.estado = EstadoTicket.EMITIDO; // Se inicializa a EMITIDO
    //fecha_emision es equivalente a hora_entrada
    this.id_vehiculo = id_vehiculo;
    this.id_espacio = id_espacio;
    this.id_usuario_entrada = 1; //TODO: Cambiar cuando haya un modulo de usuarios
    this.id_usuario_salida = null;
    this.id_tarifa = null;
  }

  /**
     * Inicializa el ticket con los datos de ingreso.
     * @param {Vehiculo} v - El vehículo que ingresa.
     * @param {Espacio} e - El espacio asignado.
     * @param {Date} hora - La hora de ingreso.
     */
    emitir(v, e, hora) {
        this.codigo_ticket = this.id_ticket; // NOTE: Asumiendo temporalmente que el ID del ticket es el código
        this.hora_entrada = hora;
        this.estado = EstadoTicket.EMITIDO;
        this.id_vehiculo = v.id_vehiculo;
        this.id_espacio = e.id_espacio;
        
        this.id_tarifa = 1; //TODO: Crear lógica para asignar tarifa según vehículo/fecha
        console.log(`Ticket ${this.id} emitido. Vehículo: ${v.placa}, Espacio ID: ${e.id_espacio}`);
    }

    /**
     * Calcula la duración total del parqueo en minutos.
     * @returns {number} Duración en minutos.
     */
    calcularDuracion() {
        if (!this.hora_salida || !this.hora_entrada) {
            console.error("No se puede calcular la duración: Falta hora de ingreso o salida.");
            return 0;
        }
        
        // Calcula la diferencia en milisegundos y la convierte a minutos (dividiendo por 60000)
        const diffMs = this.hora_salida.getTime() - this.hora_entrada.getTime();
        const duracionMinutos = diffMs / 60000;
        
        // Redondea al minuto más cercano (como en el código Python)
        return Math.round(duracionMinutos);
    }

    /**
     * Registra la hora de salida del vehículo.
     * @param {Date} hora - La hora de salida.
     */
    registrar_salida() {
        this.hora_salida = new Date();
        console.log(`Hora de salida registrada: ${hora.toLocaleTimeString()}`);
    }

    consolidar_cobro() {
        if (this.estado !== EstadoTicket.EMITIDO) {
            console.error("No se puede consolidar el cobro: El ticket no está EMITIDO.");
            return;
        }

        const duracion = this.calcularDuracion();
        // Llama al método estático de PrecioParqueo para obtener la tarifa por minuto
        const tarifaHora = 2.0 //TODO: tarifaHora debe tomar el valor actual de la tarifa según id_tarifa
        
        this.monto_cobrado = duracion * tarifaHora;
        this.estado = EstadoTicket.COBRADO;
        
        console.log(`Cobro consolidado. Duración: ${duracion} min. Monto: $${this.monto_cobrado.toFixed(2)}.`);
    }
}