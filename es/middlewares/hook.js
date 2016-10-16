'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = require('../constants');

var _reduxActions = require('redux-actions');

/* [eventList]:
 * {
 *  type: An event to check for (such as a route change),
 *  func: (action.payload, AuthState, dispatch) //Callback with user info, state and dispatch
 * }
 */
exports.default = function () {
  var eventList = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  return function (store) {
    return function (next) {
      return function (action) {
        var result = next(action);
        var t, p;
        var payload = action.payload;


        eventList.forEach(function (e) {
          var type = e.type;
          var func = e.func;

          if (action.type == type) {
            func(action.payload, store.getState(), store.dispatch);
          }
        });

        return result;
      };
    };
  };
};