'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _constants = require('../constants');

var _reduxActions = require('redux-actions');

var _reactRedux = require('react-redux');

var _LoginButton = require('./helper/LoginButton');

var _LoginButton2 = _interopRequireDefault(_LoginButton);

var _SignUpButton = require('./helper/SignUpButton');

var _SignUpButton2 = _interopRequireDefault(_SignUpButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LoginSignup = function (_React$Component) {
  _inherits(LoginSignup, _React$Component);

  function LoginSignup(props) {
    _classCallCheck(this, LoginSignup);

    var _this = _possibleConstructorReturn(this, (LoginSignup.__proto__ || Object.getPrototypeOf(LoginSignup)).call(this, props));

    _this.showLoginModal = function (event) {
      event.preventDefault();
      _this.lock.show({
        initialScreen: 'login'
      });
    };

    _this.showSignupModal = function (event) {
      event.preventDefault();
      _this.lock.show({
        initialScreen: 'signIn'
      });
    };

    if (props.signup && props.login) throw new Error('You may only pass "signup" or "login".');
    return _this;
  }

  _createClass(LoginSignup, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var options = this.props.options;
      try {
        var lock = new Auth0Lock(process.env.AUTH0_CLIENTID || 'Set process.env.AUTH0_CLIENTID', process.env.AUTH0_DOMAIN || 'Set process.env.AUTH0_DOMAIN', options);
        this.lock = lock;

        lock.on('authenticated', function (authResult) {
          _this2.lock.getProfile(authResult.idToken, function (error, profile) {
            if (error) {
              // Handle error
              console.error(error);
              return;
            }

            var method = _this2.props.signup ? 'signUp' : 'login';
            _this2.finish(method, error, profile, authResult.idToken);
            if (_this2.props.onAuthenticated) {
              _this2.props.onAuthenticated(authResult, profile);
            }
          });
        });
      } catch (e) {
        console.log('auth0 mount error', e);
      }
    }
  }, {
    key: 'finish',
    value: function finish(method, err, profile, token) {
      var props = this.props;

      var action = void 0;
      var obj = void 0;
      var newUser = false;

      if (method == 'login') {
        //These both do the same thing now, but that may not be the case later
        action = (0, _reduxActions.createAction)(_constants.auth.signin);
      } else if (method == 'signup') {
        action = (0, _reduxActions.createAction)(_constants.auth.signin);
        newUser = true;
      }

      if (err) {
        action = (0, _reduxActions.createAction)(_constants.auth.error);
        obj = { error: err };
      } else {
        obj = { profile: profile, token: token, newUser: newUser };
      }

      props.dispatch(action(obj));
    }
  }, {
    key: 'render',
    value: function render() {
      var props = this.props;
      var href = props.href;
      var children = props.children;


      return _react2.default.createElement(
        'div',
        { className: 'login-signup' },
        props.login ? null : _react2.default.createElement(
          _SignUpButton2.default,
          { href: href, onClick: this.showSignupModal },
          children
        ),
        props.signup ? null : _react2.default.createElement(
          _LoginButton2.default,
          { href: href, onClick: this.showLoginModal },
          children
        )
      );
    }
  }]);

  return LoginSignup;
}(_react2.default.Component);

LoginSignup.propTypes = {
  signup: _react.PropTypes.bool,
  signin: _react.PropTypes.bool,
  children: _react.PropTypes.element,
  href: _react.PropTypes.string,
  onAuthenticated: _react.PropTypes.func,
  options: _react.PropTypes.object
};

exports.default = (0, _reactRedux.connect)(function (state) {
  var auth = state.auth;

  return { auth: auth };
})(LoginSignup);