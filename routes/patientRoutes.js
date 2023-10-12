const express = require('express');
const patientController = require('../controller/patientController');
const verify = require('../config/jwtMiddleware')

router = express.Router();


router.post('/register', patientController.patientRegister)

router.post('/:id/create_report', verify, patientController.createPatientReport)

module.exports = router;