import React, { PropTypes } from 'react'
import { auth } from '../constants'
import { createAction as act } from 'redux-actions'
import { connect } from 'react-redux'

import LoginButton from './helper/LoginButton';
import SignUpButton from './helper/SignUpButton';

class LoginSignup extends React.Component {
  constructor(props){
    super(props);

    if(props.signup && props.login) throw new Error('You may only pass "signup" or "login".');
  }

  componentDidMount(){
    const options = this.props.options;
    try {
      this.lock = new Auth0Lock(process.env.AUTH0_CLIENTID || 'Set process.env.AUTH0_CLIENTID', process.env.AUTH0_DOMAIN || 'Set process.env.AUTH0_DOMAIN', options);

      this.lock.on('authenticated', (authResult) => {
        lock.getProfile(authResult.idToken, function(error, profile) {
          if (error) {
            // Handle error
            console.error(error);
            return;
          }

          if (this.props.onAuthenticated) {
            this.props.onAuthenticated(authResult, profile);
          }
        });
      });
    } catch(e){
      console.log('auth0 mount error', e);
    }
  }

  showLoginModal = (event) => {
    this.lock.show({
      initialScreen: 'login'
    });
  };

  showSignupModal = (event) => {
    this.lock.show({
      initialScreen: 'signIn'
    });
  };

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
    let { href, children } = props;

    return (
      <div className="login-signup">
        {
          props.login ? null : <SignUpButton href={href} onClick={this.showSignupModal}>{children}</SignUpButton>
        }
        {
          props.signup ? null : <LoginButton href={href} onClick={this.showLoginModal}>{children}</LoginButton>
        }
      </div>
    );
  }
}

LoginSignup.propTypes = {
  signup: PropTypes.bool,
  signin: PropTypes.bool,
  children: PropTypes.element,
  href: PropTypes.string,
  options: PropTypes.object,
};

export default connect((state)=>{
  let { auth } = state;
  return { auth };
})(LoginSignup);
