const { Router } = require('express');
const { DashboardController } = require('../controllers/dashboard.controller.js');

const router = Router();

router.get('/overview', DashboardController.getOverview);

module.exports = router;
