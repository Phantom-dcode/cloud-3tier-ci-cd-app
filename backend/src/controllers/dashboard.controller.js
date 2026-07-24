import { DashboardService } from '../services/dashboard.service.js';

export const DashboardController = {
  getStats: async (req, res, next) => {
    try {
      const stats = await DashboardService.getStats();
      res.json({
        success: true,
        data: stats,
      });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },
};
