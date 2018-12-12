/**
 *
 * Copyright (c) 2018 - ATAQ
 *
 * Grant Broadwater
 * 12/4/18
 *
 */

var express = require('express');
var router = express.Router();
var helloWorldRouter = require('./helloWorld');
var widgetRouter = require('./widget');

/* GET home page. */
router.use('/helloWorld/', helloWorldRouter);
router.use('/widget/', widgetRouter);


module.exports = router;