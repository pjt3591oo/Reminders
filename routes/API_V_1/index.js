var express = require('express');
var router = express.Router();

var reminder = require('./reminder')
var reminderItem = require('./reminderItem')

router.use('/reminder', reminder)
router.use('/reminderitem', reminderItem)

module.exports = router;
