import React from 'react'
import { auth } from './constants'
import { createAction as act } from 'redux-actions'
import { connect } from 'react-redux'

class AuthComponent extends React.Component {
  constructor(props){
    super(props);

    if(props.signup && props.login) throw new Error('You may only pass "signup" or "login".');
  }

  hide(){
    this.lock.hide();
  }

  mountAuth0(options={}){
    try {
      this.lock = new Auth0Lock(
        process.env.REACT_APP_AUTH0_CLIENTID || 'Set process.env.REACT_APP_AUTH0_CLIENTID', 
        process.env.REACT_APP_AUTH0_DOMAIN || 'Set process.env.REACT_APP_AUTH0_DOMAIN', 
        Object.assign({}, options, this.props.auth0)
      );

      this.lock.on('authenticated', (authResult) => {
        this.lock.getUserInfo(authResult.accessToken, (error, profile) => {
          if (error) {
            // Handle error
            console.error(error);
            return;
          }

          const method = this.props.signup ? 'signup' : 'login';
          this.finish(method, error, profile, authResult);
        });
      });

      return this.lock;
    } catch(e){
      console.log('auth0 mount error', e);
    }
  }

  componentDidMount(){
    const { props } = this;

    let auth0 = props.auth0 || {};
    let authSettings = auth0.auth || {};

    if(authSettings.redirect){ //Because redirect restarts browser memory, auth0 needs to be mounted again in redirect mode for on.authenticated callback handler to be reached
      this.mountAuth0();
    }
  }

  componentWillReceiveProps(nextProps){
    const { props } = this;
    const {onAuthenticated, auth} = nextProps;

    if(auth.token && !this.props.auth.token && nextProps.onAuthenticated){
      nextProps.onAuthenticated(auth.token, auth.profile);
    }
  }

  componentWillUnmount(){
    this.lock = null;
  }

  show(event, opts, cb){
    event.preventDefault();
    let auth0 = this.mountAuth0(opts);
    auth0.show(cb);
  }

  showLoginModal(event){
    this.show(event, {initialScreen: 'login'});
  }

  showSignupModal(event){
    this.show(event, {initialScreen: 'signUp'});
  }

  finish(method, err, profile, token){
    let { props } = this;
    let action;
    let obj;
    let newUser = false;

    if(method == 'login'){ //These both do the same thing now, but that may not be the case later
      action = act(auth.signin);
    } else if(method == 'signup'){
      action = act(auth.signin);
      newUser = true;
    }

    if(err){
      action = act(auth.error);
      obj = { error: err };
    } else {
      obj = { profile, token, newUser };
    }

    props.dispatch(action(obj));
  }

  logout(){
    let { dispatch } = this.props;
    dispatch(act(auth.logout)());
  }

  render(){
    let { props } = this;

    const LOGGED_OUT = (
      <div className="login-signup">
        {
          props.signup ? '' : <div className="login">
            <a href="#" className="btn btn-default" onClick={::this.showLoginModal}>Login</a>
          </div>
        }
        {props.login || props.signup ? '' : <span>or</span>}
        {
          props.login ? '' : <div className="signup">
            <a href="#" className="btn btn-default" onClick={::this.showSignupModal}>Signup</a>
          </div>
        }
      </div>
    );

    const LOGGED_IN = (
      <div className="logout">
        <a href="#" onClick={::this.logout} className="logout">Logout</a>
      </div>
    );

    return props.auth.token ? LOGGED_IN : LOGGED_OUT;
  }
}

/*
 * Make redirect "false" 
 */
AuthComponent.defaultProps = {
  auth0: {
    auth: {
      redirect: true
    }
  }
}

AuthComponent.propTypes = {
  onAuthenticated: React.PropTypes.func
};

export default connect((state)=>{
  let { auth } = state;
  return { auth };
})(AuthComponent);
