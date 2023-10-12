const express = require('express');
const reportController = require('../controller/reportController');
const router = express.Router();


router.get('/:status', reportController.getReportsByStatus);


module.exports = router;