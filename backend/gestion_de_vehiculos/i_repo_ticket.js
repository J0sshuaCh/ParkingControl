const IRepoTicket = {
    guardar: function(t) {
        throw new Error("Method 'guardar(t)' must be implemented.");
    },
    obtener: function(id) {
        throw new Error("Method 'obtener(id)' must be implemented.");
    },
    actualizar: function(t) {
        throw new Error("Method 'actualizar(t)' must be implemented.");
    },
    buscarPorPlaca: function(placa, abierto) {
        throw new Error("Method 'buscarPorPlaca(placa, abierto)' must be implemented.");
    }
};