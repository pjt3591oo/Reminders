var express = require('express');
var router = express.Router();

var reminder = require('./reminder')

router.use('/reminder', reminder)

module.exports = router;
