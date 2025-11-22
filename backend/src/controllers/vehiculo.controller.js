import { VehiculoModel } from "../models/vehiculo.model.js";

// GET: Para llenar el dropdown en el frontend
export const listarEspaciosLibres = (req, res) => {
  VehiculoModel.obtenerEspaciosLibres((err, rows) => {
    if (err) return res.status(500).json({ error: "Error al obtener espacios" });
    res.json(rows);
  });
};

// POST: Registrar vehículo
export const registrarVehiculo = (req, res) => {
  // Recibimos datos del body
  // id_espacio_manual solo viene si el usuario eligió "manual" en el dropdown
  const { placa, tipo_vehiculo, modo_asignacion, id_espacio_manual } = req.body;

  // Validación básica
  if (!placa || !tipo_vehiculo || !modo_asignacion) {
    return res.status(400).json({ message: "Faltan datos requeridos (placa, tipo, modo)" });
  }

  // PASO 1: Buscar espacios libres disponibles en BD
  VehiculoModel.obtenerEspaciosLibres((err, espacios) => {
    if (err) return res.status(500).json({ error: "Error al verificar espacios" });
    
    if (espacios.length === 0) {
      return res.status(400).json({ message: "No hay espacios disponibles (Estacionamiento lleno)." });
    }

    let espacioAsignado = null;

    // PASO 2: Determinar qué espacio usar
    if (modo_asignacion === 'auto') {
      // Lógica Automática: Asignamos el primero que encuentre libre
      espacioAsignado = espacios[0]; 
    } else if (modo_asignacion === 'manual') {
      // Lógica Manual: Buscamos que el ID que mandó el usuario siga libre
      espacioAsignado = espacios.find(e => e.id_espacio == id_espacio_manual);
      
      if (!espacioAsignado) {
        return res.status(400).json({ message: "El espacio seleccionado ya no está disponible." });
      }
    } else {
       return res.status(400).json({ message: "Modo de asignación inválido ('auto' o 'manual')." });
    }

    // Objeto para guardar
    const nuevoVehiculo = {
      placa,
      tipo_vehiculo,
      id_espacio: espacioAsignado.id_espacio
    };

    // PASO 3: Insertar vehículo
    VehiculoModel.crear(nuevoVehiculo, (errCreate, result) => {
      if (errCreate) return res.status(500).json({ error: "Error al registrar el vehículo." });

      // PASO 4: Actualizar estado del espacio a 'ocupado'
      VehiculoModel.ocuparEspacio(espacioAsignado.id_espacio, (errUpdate) => {
        if (errUpdate) {
            // Nota: Aquí idealmente haríamos rollback, pero para empezar así está bien.
            return res.status(500).json({ error: "Vehículo registrado, pero falló al ocupar espacio." });
        }

        // ÉXITO TOTAL
        res.status(201).json({
          message: "Vehículo registrado exitosamente",
          data: {
             id_vehiculo: result.insertId,
             placa: placa,
             espacio: espacioAsignado.codigo || espacioAsignado.letra_espacio, // Para mostrar al usuario
             tipo: tipo_vehiculo
          }
        });
      });
    });
  });
};