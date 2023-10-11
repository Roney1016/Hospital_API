const express = require('express');
const controller = require('../controller/homeController')
const router = express.Router();

//home page
router.get('/', controller.home)



module.exports = router;