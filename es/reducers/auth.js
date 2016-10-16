'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reduxActions = require('redux-actions');

var _constants = require('../constants');

var fn = function fn() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return Object.assign({}, {
    profile: '',
    token: '',
    id: '',
    submitting: false,
    error: false,
    newUser: false
  }, obj);
};

var obj = {};

obj[_constants.auth.signin] = function (state, action) {
  var payload = action.payload;
  var profile = payload.profile;
  var token = payload.token;


  return fn({
    id: profile.global_client_id,
    profile: profile,
    token: token
  });
};

obj[_constants.auth.logout] = function (state, action) {
  return fn();
};

obj[_constants.auth.error] = function (state, action) {
  var payload = action.payload;
  var error = payload.error;


  return fn({ error: error });
};

exports.default = (0, _reduxActions.handleActions)(obj, fn());