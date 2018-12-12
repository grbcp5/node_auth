/**
 *
 * Copyright (c) 2018 - ATAQ
 *
 * Grant Broadwater
 * 12/4/18
 *
 */


/* App Variables */

const DEV = "development";
const PROD = "production";
const ENV = DEV;


var express = require( 'express' );
var path = require( 'path' );
var cookieParser = require( 'cookie-parser' );
var logger = require( 'morgan' );

var auth = require( './auth/auth' );
var apiRouter = require( './routes/api/api' );
var errorHandler = require( './routes/error' );

var app = express();
app.settings.env = ENV;

var mongoose = require( 'mongoose' );


/* Middleware Setup */


app.use( logger( ':remote-addr :method :url :status :response-time ms - :res[content-length]' ) );
app.use( express.json() );
app.use( express.urlencoded( { extended: false } ) );
app.use( cookieParser() );
app.use( express.static( path.join( __dirname, 'public' ) ) );
app.use( auth() );


/* Database */

mongoose.connect( 'mongodb://localhost/ataq', { useNewUrlParser: true } );
var db = mongoose.connection;
db.on( 'error', console.error.bind( console, 'connection error: ' ) );
db.on( 'open', function () {
  console.log( "db connected." );
} );

/* Application Routers */


app.use( '/api/', apiRouter );
errorHandler( app );


/* Exports */


module.exports = app;
