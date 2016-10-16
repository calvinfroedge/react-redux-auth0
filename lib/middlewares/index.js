'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthMiddlewareHook = exports.TokenMiddleware = undefined;

var _token = require('./token');

var _token2 = _interopRequireDefault(_token);

var _hook = require('./hook');

var _hook2 = _interopRequireDefault(_hook);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.TokenMiddleware = _token2.default;
exports.AuthMiddlewareHook = _hook2.default;