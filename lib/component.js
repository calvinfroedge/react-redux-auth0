'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _index = require('./components/index');

var _reactRedux = require('react-redux');

var _constants = require('./constants');

var _reduxActions = require('redux-actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseComponent = function (_React$Component) {
  _inherits(BaseComponent, _React$Component);

  function BaseComponent() {
    _classCallCheck(this, BaseComponent);

    return _possibleConstructorReturn(this, (BaseComponent.__proto__ || Object.getPrototypeOf(BaseComponent)).apply(this, arguments));
  }

  _createClass(BaseComponent, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var props = this.props;


      props.dispatch((0, _reduxActions.createAction)(_constants.auth.check)());
    }
  }, {
    key: 'render',
    value: function render() {
      var auth = this.props.auth;


      return _react2.default.createElement(
        'div',
        null,
        !auth.token && _react2.default.createElement(_index.LoginSignup, { login: true }),
        auth.token && _react2.default.createElement(_index.Logout, null)
      );
    }
  }]);

  return BaseComponent;
}(_react2.default.Component);

exports.default = (0, _reactRedux.connect)(function (state) {
  var auth = state.auth;

  return { auth: auth };
})(BaseComponent);