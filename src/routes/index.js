const { Router } = require('express');

const uptimeController = require('../controllers/uptime');
const healthController = require('../controllers/health');

const router = Router();

router.get('/uptime', uptimeController.uptime);
router.get('/server/uptime', uptimeController.serverUptime);
router.get('/health', healthController.health);

module.exports = router;
