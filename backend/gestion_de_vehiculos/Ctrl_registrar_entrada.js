import { db } from "../database/db.js";
import { Ticket } from "../models/Ticket.js";
import { Espacio } from "../models/Espacio.js";

class CtrlRegistrarEntrada {   
    /**
     * Maneja el caso de uso principal: registra la entrada y emite un ticket.
     * @param {Vehiculo} v - El vehículo que ingresa.
     * @param {Espacio} e - El espacio asignado.
     * @param {Date} hora - La hora de ingreso.
     * @returns {Ticket} El ticket emitido.
     */
    async handle(v, e, hora) {
        // Inicializa un nuevo Ticket.
        // Asumiendo que el constructor de Ticket ahora recibe datos
        const t = new Ticket(v.placa, e.codigo); 
        
        // Emite el ticket con los datos del vehículo, espacio y hora
        t.emitir(v, e, hora);

        try {
          await e.ocupar();
        } catch (err) {
          console.error('[CtrlRegistrarEntrada] No se pudo ocupar el espacio:', err);
          throw err;
        }

        this.marcar_ocupado(e.id_espacio);

        this.guardar(t);
        
        return t;
    }
    
    // --- Implementación de IPoliticaAsignacionEspacio ---

    /**
     * Asigna un espacio libre siguiendo alguna política (ej. el más cercano, el primero libre).
     * @param {string} placa - La placa del vehículo.
     * @returns {Promise<Espacio>} El objeto Espacio asignado.
     */
    async asignar(placa) {
        console.log(`  -> Buscando espacio para ${placa}...`);
        
        try {
            const espaciosLibres = await this.buscar_libres();
            
            if (espaciosLibres.length === 0) {
                console.log(`  -> No hay espacios disponibles`);
                return null;
            }
            
            // Selecciona el primer espacio libre (política simple)
            const e = espaciosLibres[0];
            console.log(`  -> Espacio asignado: ${e.codigo}`);
            
            return e;
        } catch (error) {
            console.error(`Error al asignar espacio: ${error.message}`);
            return null;
        }
    }
    
    // --- Implementación de IRepoEspacio y IRepoTicket (Métodos de Repositorio) ---

    /**
     * Busca y retorna una lista de espacios que se encuentran LIBRES en una sede.
     * @returns {Array<Espacio>} Lista de espacios libres.
     */
    async buscar_libres() {
        // Lógica de acceso a base de datos (Ej: un ORM o Firebase) para buscar espacios LIBRES

        console.log(`[RepoEspacio] Buscando espacios libres...`);

        const espaciosLibres = [];
        
        try {
            // Ejecuta el procedimiento almacenado sin parámetros
            const [rows] = await db.query('CALL sp_buscar_espacios_libres()');
            
            // El resultado está en rows[0] porque MySQL devuelve arrays anidados para SPs
            const espacios = Array.isArray(rows) ? rows[0] : rows;
            
            if (espacios && espacios.length > 0) {
                espacios.forEach(fila => {
                    const espacio = new Espacio({
                        id_espacio: fila.id_espacio,
                        numero_espacio: fila.numero_espacio,
                        estado: fila.estado
                    });
                    espaciosLibres.push(espacio);
                });
                console.log(`[RepoEspacio] Se encontraron ${espaciosLibres.length} espacios libres.`);
            } else {
                console.log(`[RepoEspacio] No hay espacios libres disponibles.`);
            }
            
        } catch (error) {
            console.error(`[RepoEspacio] Error al ejecutar sp_buscar_espacios_libres:`, error);
        }
        
        return espaciosLibres;
    }

    /**
     * Marca un espacio como OCUPADO en el repositorio de datos.
     * @param {Espacio} e - El espacio a marcar como ocupado.
     */
    marcar_ocupado(e) {
        e.ocupar();
        console.log(`[RepoEspacio] Marcando espacio ${e.codigo} como OCUPADO.`);
    }

    /**
     * Marca un espacio como LIBRE en el repositorio de datos.
     * @param {Espacio} e - El espacio a marcar como libre.
     */
    marcar_libre(e) {
        e.liberar();
        console.log(`[RepoEspacio] Marcando espacio ${e.codigo} como LIBRE.`);
    }

    /**
     * Inserta un registro de ticket en la base de datos.
     * @param {Ticket} t - El ticket a registrar.
     */
    async guardar_ticket(t) {
    console.log(`[RepoTicket] Guardando ticket ${t.codigo_ticket}.`);

        // Mapear atributos del objeto Ticket con nombres alternativos por compatibilidad
        const codigo = t.codigo_ticket ?? null;
        const horaEntrada = t.hora_entrada ?? null;
        const horaSalida = t.hora_salida ?? null;
        const montoTotal = t.monto_total ?? null;
        const estado = t.estado ?? EstadoTicket.EMITIDO;
        const idVehiculo = t.id_vehiculo ?? 1;
        const idEspacio = t.id_espacio ?? null;
        const idUsuarioEntrada = t.id_usuario_entrada ?? 1;
        const idUsuarioSalida = t.id_usuario_salida ?? null;
        const idTarifa = t.id_tarifa ?? 1;

        // p_hora_salida, p_tiempo_permanencia, p_monto_total, p_id_usuario_salida => opcionales, enviar NULL
        const params = [
            codigo,
            horaEntrada,
            estado,
            idVehiculo,
            idEspacio,
            idUsuarioEntrada,
            idTarifa,
            horaSalida, // p_hora_salida
            montoTotal, // p_monto_total
            idUsuarioSalida  // p_id_usuario_salida
        ];

        try {
            const [resultSets] = await db.query('CALL sp_insertar_ticket(?,?,?,?,?,?,?,?,?,?)', params);

            // MySQL devuelve un array de resultsets; el SELECT LAST_INSERT_ID() suele estar en resultSets[0][0]
            let idGenerado = null;
            if (Array.isArray(resultSets) && resultSets.length > 0) {
                const first = resultSets[0];
                if (Array.isArray(first) && first.length > 0) {
                    const row = first[0];
                    idGenerado = row.id_ticket_generado ?? row.id_ticket ?? null;
                } else if (first && typeof first === 'object') {
                    idGenerado = first.id_ticket_generado ?? first.id_ticket ?? null;
                }
            }

            console.log(`[RepoTicket] Ticket insertado, id: ${idGenerado}`);
            return idGenerado;
        } catch (error) {
            console.error(`[RepoTicket] Error al ejecutar sp_insertar_ticket:`, error);
            throw error;
        }
    }

    /**
     * Busca un ticket por su código único.
     * Llama al procedimiento almacenado sp_buscar_ticket.
     * @param {string} codigo - El código del ticket a buscar.
     * @returns {Promise<Ticket|null>} Objeto Ticket si existe, null si no.
     */
    async buscar_por_codigo(codigo) {
        console.log(`[RepoTicket] Buscando ticket con código: ${codigo}`);
        
        try {
            const [resultSets] = await db.query('CALL sp_buscar_ticket(?)', [codigo]);
            
            // El resultado está en resultSets[0] porque MySQL devuelve arrays anidados para SPs
            const resultados = Array.isArray(resultSets) ? resultSets[0] : resultSets;
            
            if (resultados && resultados.length > 0) {
                const fila = resultados[0];
                
                // Crear objeto Ticket con los datos del procedimiento
                const ticket = new Ticket(fila.codigo_ticket, fila.hora_entrada, fila.id_vehiculo, fila.id_espacio);
                ticket.id_ticket = fila.id_ticket;
                ticket.hora_salida = fila.hora_salida;
                ticket.monto_total = fila.monto_total;
                ticket.estado = fila.estado;
                ticket.id_usuario_entrada = fila.id_usuario_entrada;
                ticket.id_usuario_salida = fila.id_usuario_salida;
                ticket.id_tarifa = fila.id_tarifa;
                
                console.log(`[RepoTicket] Ticket encontrado: ${fila.codigo_ticket}`);
                return ticket;
            } else {
                console.log(`[RepoTicket] No se encontró ticket con código: ${codigo}`);
                return null;
            }
        } catch (error) {
            console.error(`[RepoTicket] Error al ejecutar sp_buscar_ticket:`, error);
            return null;
        }
    }

    /**
     * Busca todos los tickets asociados a una placa de vehículo.
     * Llama al procedimiento almacenado sp_buscar_ticket_por_placa.
     * @param {string} placa - La placa del vehículo.
     * @returns {Promise<Array<Ticket>>} Array de objetos Ticket.
     */
    async buscar_por_placa(placa) {
        console.log(`[RepoTicket] Obteniendo tickets para placa: ${placa}`);
        
        const tickets = [];
        
        try {
            const [resultSets] = await db.query('CALL sp_buscar_ticket_por_placa(?)', [placa]);
            
            // El resultado está en resultSets[0] porque MySQL devuelve arrays anidados para SPs
            const resultados = Array.isArray(resultSets) ? resultSets[0] : resultSets;
            
            if (resultados && resultados.length > 0) {
                resultados.forEach(fila => {
                    // Crear objeto Ticket con los datos del procedimiento
                    const ticket = new Ticket(fila.codigo_ticket, fila.hora_entrada, fila.id_vehiculo, fila.id_espacio);
                    ticket.id_ticket = fila.id_ticket;
                    ticket.hora_salida = fila.hora_salida;
                    ticket.monto_total = fila.monto_total;
                    ticket.estado = fila.estado;
                    ticket.id_usuario_entrada = fila.id_usuario_entrada;
                    ticket.id_usuario_salida = fila.id_usuario_salida;
                    ticket.id_tarifa = fila.id_tarifa;
                    
                    tickets.push(ticket);
                });
                console.log(`[RepoTicket] Se encontraron ${tickets.length} tickets para placa ${placa}`);
            } else {
                console.log(`[RepoTicket] No hay tickets para la placa: ${placa}`);
            }
        } catch (error) {
            console.error(`[RepoTicket] Error al ejecutar sp_buscar_ticket_por_placa:`, error);
        }
        
        return tickets;
    }

    /**
     * Actualiza un ticket existente en la base de datos.
     * Llama al procedimiento almacenado sp_actualizar_ticket.
     * @param {Ticket} t - El ticket a actualizar.
     * @returns {Promise<boolean>} true si se actualizó exitosamente.
     */
    async actualizar(t) {
        console.log(`[RepoTicket] Actualizando ticket ${t.codigo_ticket}`);
        
        const params = [
            t.id_ticket,
            t.hora_salida ?? null,
            t.tiempo_permanencia ?? null,
            t.monto_total ?? null,
            t.estado ?? EstadoTicket.EMITIDO,
            t.id_usuario_salida ?? null
        ];
        
        try {
            const [resultSets] = await db.query('CALL sp_actualizar_ticket(?,?,?,?,?,?)', params);
            
            // El resultado está en resultSets[0] porque MySQL devuelve arrays anidados para SPs
            const resultado = Array.isArray(resultSets) ? resultSets[0] : resultSets;
            
            if (resultado && resultado.length > 0) {
                const row = resultado[0];
                console.log(`[RepoTicket] ${row.Mensaje}`);
                return row.filas_afectadas > 0;
            } else {
                console.warn(`[RepoTicket] No se pudo actualizar el ticket.`);
                return false;
            }
        } catch (error) {
            console.error(`[RepoTicket] Error al ejecutar sp_actualizar_ticket:`, error);
            return false;
        }
    }
}