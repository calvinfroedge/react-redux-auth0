import React from 'react'
import { auth } from '../constants'
import { createAction as act } from 'redux-actions'
import { connect } from 'react-redux'

class LoginSignup extends React.Component {
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
        process.env.AUTH0_CLIENTID || 'Set process.env.AUTH0_CLIENTID', 
        process.env.AUTH0_DOMAIN || 'Set process.env.AUTH0_DOMAIN', 
        Object.assign({}, options, this.props.auth0)
      );
      return this.lock;
    } catch(e){
      console.log('auth0 mount error', e);
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
    this.show(event, {initialScreen: 'login'}, this.finish.bind(this, 'signin'));
  }

  showSignupModal(event){
    this.show(event, {initialScreen: 'signUp'}, this.finish.bind(this, 'signup'));
  }

  finish(method, err, profile, token){
    let { props } = this;
    let action;
    let obj;
    let newUser = false;

    if(method == 'signin'){ //These both do the same thing now, but that may not be the case later
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

  render(){
    let { props } = this;

    return (
      <div className="login-signup">
        {
          props.signup ? '' : <div className="login">
            <a href="#" className="btn btn-default" onClick={::this.showLoginModal}>Login</a>
          </div>
        }
        {
          props.login ? '' : <div className="signup">
            <a href="#" className="btn btn-default" onClick={::this.showSignupModal}>Signup</a>
          </div>
        }
      </div>
    );
  }
}

export default connect((state)=>{
  let { auth } = state;
  return { auth };
})(LoginSignup);
