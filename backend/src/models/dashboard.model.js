import { db } from '../database/connection.js';

export const DashboardModel = {
    getStats: async () => {
        try {
            // 1. Vehículos Dentro
            const [vehiclesRows] = await db.query("SELECT COUNT(*) as count FROM ticket WHERE estado = 'Emitido'");
            const vehiclesCount = vehiclesRows[0].count;

            // 2. Espacios Libres
            const [spacesRows] = await db.query("SELECT COUNT(*) as count FROM espacio WHERE estado = 'libre'");
            const freeSpacesCount = spacesRows[0].count;

            // 3. Ingresos Hoy
            const [incomeRows] = await db.query("SELECT IFNULL(SUM(monto_total), 0) as total FROM ticket WHERE estado = 'Pagado' AND DATE(hora_salida) = CURDATE()");
            const incomeToday = incomeRows[0].total;

            // 4. Alertas (Reservas Activas o Espacios Ocupados por mucho tiempo? Usamos Reservas Activas por ahora como 'Alertas' de atención)
            const [alertsRows] = await db.query("SELECT COUNT(*) as count FROM reserva WHERE fecha_fin > NOW()");
            const alertsCount = alertsRows[0].count;

            return {
                vehiclesInside: vehiclesCount,
                freeSpaces: freeSpacesCount,
                incomeToday: incomeToday,
                alerts: alertsCount
            };
        } catch (error) {
            console.error("Error in DashboardModel.getStats:", error);
            throw error;
        }
    },

    getRecentActivity: async () => {
        try {
            // Combinar ingresos y salidas recientes
            const sql = `
                (SELECT 'entry' as type, CONCAT('Vehículo ', v.placa, ' registrado') as action, t.hora_entrada as time
                 FROM ticket t JOIN vehiculos v ON t.id_vehiculo = v.id_vehiculo
                 WHERE t.estado = 'Emitido'
                 ORDER BY t.hora_entrada DESC LIMIT 5)
                UNION
                (SELECT 'exit' as type, CONCAT('Vehículo ', v.placa, ' salió del sistema') as action, t.hora_salida as time
                 FROM ticket t JOIN vehiculos v ON t.id_vehiculo = v.id_vehiculo
                 WHERE t.estado = 'Pagado'
                 ORDER BY t.hora_salida DESC LIMIT 5)
                ORDER BY time DESC LIMIT 5
            `;
            const [rows] = await db.query(sql);
            return rows;
        } catch (error) {
            console.error("Error in DashboardModel.getRecentActivity:", error);
            throw error;
        }
    }
};
