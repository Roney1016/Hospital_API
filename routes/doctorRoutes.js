const express = require('express');
const doctorController = require('../controller/doctorController')
const router = express.Router();


//  POST  http://localhost:3000/doctors/register
router.post('/register', doctorController.doctorRegister)

//POST  http://localhost:3000/doctors/login
router.post('/login', doctorController.doctorLogin);


module.exports = router;