import axios from "axios";

const API_URL = "http://localhost:8800/api/dashboard";

export interface DashboardStats {
    vehiclesInside: number;
    freeSpaces: number;
    incomeToday: number;
    alerts: number;
}

export interface RecentActivity {
    type: 'entry' | 'exit';
    action: string;
    time: string;
}

export interface DashboardData {
    stats: DashboardStats;
    activity: RecentActivity[];
}

export const getDashboardOverview = async (): Promise<DashboardData> => {
    try {
        const res = await axios.get(`${API_URL}/overview`);
        return res.data;
    } catch (err: any) {
        console.error("Error fetching dashboard overview:", err);
        throw err.response?.data || { message: "Error al obtener datos del dashboard." };
    }
};
