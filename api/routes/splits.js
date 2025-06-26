const express = require('express');
const router = express.Router();
const controller = require('../controllers/splitsController');

router.get('/results/:id/splits', controller.getSplitsByResultId);

module.exports = router;
