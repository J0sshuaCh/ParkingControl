import { VehiculoModel } from "../models/vehiculo.model.js";

export const VehiculoController = {
  // GET: Listar espacios libres
  listarEspaciosLibres: async (req, res) => {
    try {
      const espacios = await VehiculoModel.obtenerEspaciosLibres();
      res.json(espacios);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener espacios", error: error.message });
    }
  },

  // GET: Listar vehículos en el parqueo
  listarVehiculosActivos: async (req, res) => {
    try {
      const vehiculos = await VehiculoModel.obtenerVehiculosEnParqueo();
      res.json(vehiculos);
    } catch (error) {
      res.status(500).json({ message: "Error al listar vehículos", error: error.message });
    }
  },

  // POST: Registrar Entrada
  registrarVehiculo: async (req, res) => {
    const { placa, tipo_vehiculo, modo_asignacion, id_espacio_manual } = req.body;

    if (!placa || !tipo_vehiculo) {
      return res.status(400).json({ message: "Faltan datos: Placa y Tipo son obligatorios." });
    }

    try {
      // 1. Validar Tarifa (Importante: debe existir una tarifa para ese vehículo)
      const tarifa = await VehiculoModel.obtenerTarifa(tipo_vehiculo);
      if (!tarifa) {
        return res.status(400).json({ message: `No existe una tarifa configurada para ${tipo_vehiculo}. Cree una en Administración.` });
      }

      // 2. Obtener espacios libres
      const espacios = await VehiculoModel.obtenerEspaciosLibres();
      if (espacios.length === 0) {
        return res.status(400).json({ message: "¡El estacionamiento está lleno!" });
      }

      // 3. Asignar Espacio
      let espacioSeleccionado = null;
      if (modo_asignacion === 'manual' && id_espacio_manual) {
        espacioSeleccionado = espacios.find(e => e.id_espacio === parseInt(id_espacio_manual));
        if (!espacioSeleccionado) return res.status(400).json({ message: "El espacio seleccionado ya no está disponible." });
      } else {
        // Automático: Tomar el primero
        espacioSeleccionado = espacios[0];
      }

      // 4. Guardar en DB
      const resultado = await VehiculoModel.registrarIngreso(
        placa.toUpperCase(),
        tipo_vehiculo,
        espacioSeleccionado.id_espacio,
        tarifa.id_tarifa
      );

      res.status(201).json({
        message: "Entrada registrada correctamente",
        ticket: resultado.codigo_ticket,
        espacio: espacioSeleccionado.codigo
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error interno al registrar entrada.", error: error.message });
    }
  },

  // GET: Verificar si una placa está en el parqueo
  verificarPlaca: async (req, res) => {
    const { placa } = req.params;
    try {
      if (!placa) return res.status(400).json({ message: "Se requiere la placa" });

      const existe = await VehiculoModel.verificarPlacaActiva(placa.toUpperCase());
      res.json({ existe });

    } catch (error) {
      res.status(500).json({ message: "Error al verificar placa", error: error.message });
    }
  }
};