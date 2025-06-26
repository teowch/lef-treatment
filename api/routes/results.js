const express = require('express');
const router = express.Router();
const controller = require('../controllers/resultsController');

router.get('/heats/:id/results', controller.getResultsByHeatId);

module.exports = router;
