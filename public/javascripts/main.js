/**
 *
 * Copyright (c) 2018 - ATAQ
 *
 * Grant Broadwater
 * 12/6/18
 *
 */

var googleTokenPayload;

function parseJwt (token) {
  let base64Url = token.split('.')[1];
  let base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
}

function pad(num, size) {
  let s = num+"";
  while (s.length < size) s = "0" + s;
  return s;
}

function onSignIn( googleUser ) {
  $("#token").text(googleUser.getAuthResponse().id_token);
  $("#name").text(googleUser.getBasicProfile().getName());
  $("#email").text(googleUser.getBasicProfile().getEmail());
  
  googleTokenPayload = parseJwt(googleUser.getAuthResponse().id_token);
  
  updateExp();
  setInterval(updateExp, 1000);
}


function updateExp() {
  let now = Math.round((new Date()).getTime() / 1000);
  let diff = googleTokenPayload.exp - now;
  $("#exp").text(Math.floor(diff / 60) + ":" + pad(Math.round(diff - Math.floor(diff / 60) * 60), 2));
}