const express = require('express');
const doctorController = require('../controller/doctorController')
const router = express.Router();


router.post('/register', doctorController.doctorRegister)



module.exports = router;