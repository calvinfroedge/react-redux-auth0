'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _index = require('./index');

var _reduxSetup = require('./redux-setup.js');

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Redux
_reactDom2.default.render(_react2.default.createElement(
  _reactRedux.Provider,
  { store: _reduxSetup.store },
  _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(_index.AuthExample, null),
    _react2.default.createElement(_reduxSetup.DevTools, null)
  )
), document.getElementById('root'));