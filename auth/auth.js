/**
 *
 * Copyright (c) 2018 - ATAQ
 *
 * Grant Broadwater
 * 12/4/18
 *
 */

// TODO: Change
const CLIENT_ID = "848234276765-2f7qr400h17q2mboi9nt56pj5fge2m4e.apps.googleusercontent.com";

const { OAuth2Client } = require( 'google-auth-library' );
const googleClient = new OAuth2Client( CLIENT_ID );


module.exports = function () {
  return async function ( req, res, next ) {
    
    /* Get token */
    let authHeader = req.get( 'Authorization' );
    if ( !authHeader ) {
      next( { status: 401, description: "No auth token provided" } );
      return;
    }
    
    let bearerToken = authHeader.split( "Bearer " )[ 1 ];
    if ( !bearerToken ) {
      next( { status: 401, description: "No bearer token provided" } );
      return;
    }
    
    /* Parse token */
    var tokenPayload;
    try {
      tokenPayload = parseJwt( bearerToken );
    } catch ( error ) {
      next( { status: 401, description: "Unable to parse jwt." } );
      return;
    }
    
    /* Check token iss */
    if ( !tokenPayload.iss ) {
      next( { status: 401, description: "Auth jwt does not contain an iss." } );
      return;
    }
    
    /* Check if token is google access token */
    if ( tokenPayload.iss.toLowerCase().includes( "google" ) ) {
  
      /* Have google verify token */
      await verifyGoogleToken( bearerToken )
        .then( function ( payload ) {
          res.locals.auth = payload;
          next();
        } )
        .catch( function ( error ) {
          next( { status: 401, description: error.message.split( ":" )[ 0 ].trim() } );
        } );
    } else { /* iss != google */
      next( { status: 401, description: "ISS not recognized." } );
    }
  }
};


function parseJwt( token ) {
  let base64Url = token.split( '.' )[ 1 ];
  let base64 = base64Url.replace( '-', '+' ).replace( '_', '/' );
  return JSON.parse( require( "atob" )( base64 ) );
}


async function verifyGoogleToken( token ) {
  
  const ticket = await googleClient.verifyIdToken( {
    idToken: token,
    audience: CLIENT_ID,
  } );
  
  return ticket.getPayload();
}
