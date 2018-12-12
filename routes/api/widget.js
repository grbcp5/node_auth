/**
 *
 * Copyright (c) 2018 - ATAQ
 *
 * Grant Broadwater
 * 12/11/18
 *
 */

const express = require( 'express' );
const router = express.Router();

const WidgetModel = require( '../../models/widget' );


router.get( '/:widget_id', function ( req, res, next ) {
  
  let widget_id = req.params.widget_id;
  
  WidgetModel.get( widget_id, function ( error, document ) {
    
    if ( error ) {
      next( { status: 500, description: "Error retrieving widget from database" } );
      console.error( error );
      return;
    }
    
    res.send( { widget: document } );
    
  } );
} );


router.post( '/', function ( req, res, next ) {
  
  let widget = req.body;
  
  WidgetModel.post( widget, function ( error, document ) {
    
    if ( error ) {
      next( { status: 500, description: "Error creating widget in database." } );
      return;
    }
    
    res.send( document );
    
  } );
  
} );

module.exports = router;