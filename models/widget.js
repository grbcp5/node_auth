/**
 *
 * Copyright (c) 2018 - ATAQ
 *
 * Grant Broadwater
 * 12/11/18
 *
 */

const mongoose = require( 'mongoose' );

const widgetSchema = new mongoose.Schema( {
  
  description: String,
  weight: Number
  
} );
const Widget = mongoose.model('Widget', widgetSchema);


/* Exports */


module.exports.get = function(widget_id, callback) {
  Widget.findById(widget_id, callback);
};


module.exports.post = function ( widget, callback ) {
  
  let widget_id = widget._id;
  if ( widget_id ) {
    
    Widget.findOneAndUpdate( { _id: widget_id }, widget, { upsert: true }, ( error ) => callback( error, widget ) );
    
  } else {
  
    Widget.create( widget, callback );
  
  }
};
