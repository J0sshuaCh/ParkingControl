const { Router } = require('express');
const { DashboardController } = require('../controllers/dashboard.controller.js');
const { authMiddleware } = require('../middleware/auth');

const router = Router();

router.use(authMiddleware);

router.get('/overview', DashboardController.getOverview);

module.exports = router;
