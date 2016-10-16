'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = require('../constants');

var _reduxActions = require('redux-actions');

exports.default = function () {
  return function (store) {
    return function (next) {
      return function (action) {
        var result = next(action);
        var t, p;
        var payload = action.payload;


        if (action.type == _constants.auth.check) {
          t = localStorage.getItem(_constants.token);
          if (t) {
            t = JSON.parse(t);
            p = JSON.parse(localStorage.getItem(_constants.profile));
            store.dispatch((0, _reduxActions.createAction)(_constants.auth.signin)({ profile: p, token: t }));
          }
        } else if (action.type == _constants.auth.signin) {
          localStorage.setItem(_constants.token, JSON.stringify(payload.token));
          localStorage.setItem(_constants.profile, JSON.stringify(payload.profile));
        } else if (action.type == _constants.auth.logout) {
          localStorage.removeItem(_constants.token);
          localStorage.removeItem(_constants.profile);
        }

        return result;
      };
    };
  };
};