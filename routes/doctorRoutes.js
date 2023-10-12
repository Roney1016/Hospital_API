const express = require('express');
const doctorController = require('../controller/doctorController')
const router = express.Router();

const verify = require('../config/jwtMiddleware')

//  POST  http://localhost:3000/doctors/register
router.post('/register', doctorController.doctorRegister)

//POST  http://localhost:3000/doctors/login
router.post('/login', doctorController.doctorLogin);


module.exports = router;