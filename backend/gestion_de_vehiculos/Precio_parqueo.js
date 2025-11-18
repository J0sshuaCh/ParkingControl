export class PrecioParqueo {
    constructor() {
        this._precio_parqueo = 1.0;
    }
    getPrecioParqueo() {
        return this._precio_parqueo;
    }
    setPrecioParqueo(precio) {
        if (typeof precio !== 'number' || precio < 0) {
            throw new Error("El precio del parqueo debe ser un número no negativo.");
            return;
        }
        this._precio_parqueo = precio;
    }
}