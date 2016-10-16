"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function LoginButton(_ref) {
  var children = _ref.children;
  var href = _ref.href;
  var onClick = _ref.onClick;

  return _react2.default.createElement(
    "div",
    { className: "login" },
    _react2.default.createElement(
      "a",
      { href: href, className: "btn btn-default", onClick: onClick },
      children
    )
  );
}

LoginButton.propTypes = {
  onClick: _react.PropTypes.func.isRequired,
  href: _react.PropTypes.string,
  children: _react.PropTypes.element
};

LoginButton.defaultProps = {
  href: '#',
  children: 'Sign in'
};

exports.default = LoginButton;