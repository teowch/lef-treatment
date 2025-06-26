const express = require('express');
const router = express.Router();
const controller = require('../controllers/heatsController');

router.get('/events/:id/heats', controller.getHeatsByEventId);

module.exports = router;
