const { db } = require('../database/connection.cjs'); 

async function getAll() {
    try {
        const [rows] = await db.query("SELECT * FROM tarifa");
        return rows;
    } catch (error) {
        console.error("Error en TarifaModel.getAll:", error);
        throw error;
    }
}

async function create(data) {
    try {
        const sql = "INSERT INTO tarifa SET ?";
        const [result] = await db.query(sql, data);
        return { ...data, id_tarifa: result.insertId };
    } catch (error) {
        console.error("Error en TarifaModel.create:", error);
        throw error;
    }
}

async function update(id_tarifa, data) {
    try {
        const sql = "UPDATE tarifa SET ? WHERE id_tarifa = ?";
        const [result] = await db.query(sql, [data, id_tarifa]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error("Error en TarifaModel.update:", error);
        throw error;
    }
}

async function deleteTarifa(id_tarifa) {
    try {
        const sql = "DELETE FROM tarifa WHERE id_tarifa = ?";
        const [result] = await db.query(sql, [id_tarifa]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error("Error en TarifaModel.delete:", error);
        throw error;
    }
}

module.exports = {
    getAll,
    create,
    update,
    delete: deleteTarifa
};
