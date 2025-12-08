import { DashboardModel } from '../models/dashboard.model.js';

export const DashboardController = {
    getOverview: async (req, res) => {
        try {
            const stats = await DashboardModel.getStats();
            const activity = await DashboardModel.getRecentActivity();

            res.json({
                stats,
                activity
            });
        } catch (error) {
            console.error('Error in DashboardController.getOverview:', error);
            res.status(500).json({ message: 'Error al obtener datos del dashboard' });
        }
    }
};
