const express = require('express');
const patientController = require('../controller/patientController')
router = express.Router();


router.post('/register', patientController.patientRegister)

module.exports = router;