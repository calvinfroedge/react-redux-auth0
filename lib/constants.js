"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.auth = exports.profile = exports.token = undefined;

var _namespacedConstants = require("namespaced-constants");

var _namespacedConstants2 = _interopRequireDefault(_namespacedConstants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var token = exports.token = "auth.token";
var profile = exports.profile = "auth.profile";
var auth = exports.auth = (0, _namespacedConstants2.default)('auth')('submitting', 'logout', 'signin', 'error', 'check');