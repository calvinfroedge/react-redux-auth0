'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.store = exports.DevTools = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//Redux DevTools


//Redux


//Reducers


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reduxDevtools = require('redux-devtools');

var _reduxDevtoolsLogMonitor = require('redux-devtools-log-monitor');

var _reduxDevtoolsLogMonitor2 = _interopRequireDefault(_reduxDevtoolsLogMonitor);

var _reduxDevtoolsDockMonitor = require('redux-devtools-dock-monitor');

var _reduxDevtoolsDockMonitor2 = _interopRequireDefault(_reduxDevtoolsDockMonitor);

var _redux = require('redux');

var _index = require('./reducers/index');

var reducers = _interopRequireWildcard(_index);

var _middlewares = require('./middlewares');

var AuthMiddlewares = _interopRequireWildcard(_middlewares);

var _constants = require('./constants');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Set up Redux Middleware
var reducer = (0, _redux.combineReducers)(_extends({}, reducers));

//Set up Dev Tools
var DevTools = (0, _reduxDevtools.createDevTools)(_react2.default.createElement(
  _reduxDevtoolsDockMonitor2.default,
  { toggleVisibilityKey: 'ctrl-h',
    changePositionKey: 'ctrl-q' },
  _react2.default.createElement(_reduxDevtoolsLogMonitor2.default, { theme: 'tomorrow', preserveScrollTop: false })
));

//Create the store


var finalCreateStore = (0, _redux.compose)((0, _redux.applyMiddleware)(AuthMiddlewares.TokenMiddleware(), AuthMiddlewares.AuthMiddlewareHook([{
  type: _constants.auth.signin,
  func: function func(payload, state, dispatch) {
    console.log("I was called on signin!", payload, state, dispatch);
  }
}])), DevTools.instrument())(_redux.createStore);

var store = finalCreateStore(reducer);

//Exports
exports.default = store;
exports.DevTools = DevTools;
exports.store = store;