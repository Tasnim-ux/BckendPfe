var express = require('express');
var router = express.Router();
const os = require('os');
const oscontroller = require('../controllers/oscontroller')
const { platform, release } = require('process');

router.get('/getOsInformation',oscontroller.getOsInformation) 


module.exports = router;
