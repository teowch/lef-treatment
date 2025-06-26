const express = require('express');
const router = express.Router();
const controller = require('../controllers/competitionsController');

router.get('/', controller.getCompetitions);
router.get('/:id', controller.getCompetitionById);
router.get('/:id/sessions', controller.getSessionsByCompetitionId);

module.exports = router;
