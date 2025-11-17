import { Espacio } from "../models/Espacio";

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
    
    // NOTA: Los métodos de IRepoTicket (ej: guardar_ticket, buscar_ticket) 
    // deberían ir aquí si CtrlRegistrarEntrada también implementa esa interfaz.

    guardar(t) {
        //TODO: Lógica de acceso a base de datos para guardar el ticket
        console.log(`[RepoTicket] Guardando ticket para vehículo ${t.placa}.`);
    }   
}