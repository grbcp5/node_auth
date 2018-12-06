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

/* GET home page. */
router.use('/helloWorld/', helloWorldRouter);

module.exports = router;