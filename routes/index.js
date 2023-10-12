const express = require('express');
const controller = require('../controller/homeController')
const router = express.Router();

//home page
router.get('/', controller.home)

// doctor routes
router.use('/doctors', require('./doctorRoutes'))
//patient routes
router.use('/patients', require('./patientRoutes'))

module.exports = router;