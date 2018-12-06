/**
 *
 * Copyright (c) 2018 - ATAQ
 *
 * Grant Broadwater
 * 12/4/18
 *
 */


module.exports = function() {
  return function(req, res, next) {
    
    var bearerToken = req.get('Authorization');
    
    if (!bearerToken) {
      next({status: 401, description: "Unauthorized"});
      return;
    }
    
    next();
  }
};