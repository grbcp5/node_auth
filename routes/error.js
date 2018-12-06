/**
 *
 * Copyright (c) 2018 - ATAQ
 *
 * Grant Broadwater
 * 12/4/18
 *
 */


/* Variables */


var express = require( 'express' );
var router = express.Router();
var createError = require( 'http-errors' );


/* Export */

module.exports = function ( app ) {
  
  app.use( function ( req, res, next ) {
    next( createError( 404 ) );
  } );
  
  app.use( function ( err, req, res, next ) {
    res.status(err.status | 400).send(err);
  });
  
};