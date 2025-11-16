class UIRegistrarEntrada {
    constructor(ctrlRegistrarEntrada) {
        this.ctrlRegistrarEntrada = ctrlRegistrarEntrada;
    }

    capturarDatos() {
        // Simula la captura de datos desde una interfaz de usuario
        const placa = "ABC123";
        const sedeId = 1;
        return { placa, sedeId };
    }
    mostrarConfirmacion(ticket) {
        console.log("Entrada registrada exitosamente:");
        console.log(`  Placa: ${ticket.placa}`);
        console.log(`  Espacio: ${ticket.espacioCodigo}`);
        console.log(`  Hora de entrada: ${ticket.horaEntrada}`);
    }

    mostrarError(mensaje) {
        console.error("Error al registrar la entrada:", mensaje);
    }
}