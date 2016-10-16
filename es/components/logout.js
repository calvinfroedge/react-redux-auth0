'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reduxActions = require('redux-actions');

var _reactRedux = require('react-redux');

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Logout = function (_React$Component) {
  _inherits(Logout, _React$Component);

  function Logout(props) {
    _classCallCheck(this, Logout);

    return _possibleConstructorReturn(this, (Logout.__proto__ || Object.getPrototypeOf(Logout)).call(this, props));
  }

  _createClass(Logout, [{
    key: 'logout',
    value: function logout() {
      var _props = this.props;
      var dispatch = _props.dispatch;
      var onLogout = _props.onLogout;
      var href = _props.href;
      var children = _props.children;

      dispatch((0, _reduxActions.createAction)(_constants.auth.logout)());
      if (onLogout) {
        onLogout();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'logout' },
        _react2.default.createElement(
          'a',
          { href: href, onClick: this.logout.bind(this), className: 'logout' },
          children
        )
      );
    }
  }]);

  return Logout;
}(_react2.default.Component);

Logout.propTypes = {
  href: _react.PropTypes.string,
  children: _react.PropTypes.element,
  onLogout: _react.PropTypes.func
};

Logout.defaultProps = {
  children: 'Logout',
  href: '#'
};

exports.default = (0, _reactRedux.connect)(function (state) {
  var auth = state.auth;


  return { auth: auth };
})(Logout);