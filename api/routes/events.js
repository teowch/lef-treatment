const express = require('express');
const router = express.Router();
const controller = require('../controllers/eventsController');

router.get('/sessions/:id/events', controller.getEventsBySessionId);
router.get('/events/:id/ranking', controller.getRankingByEventId);

module.exports = router;
