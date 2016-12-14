import React from 'react'
import ReactReduxAuth0 from './component'
import { connect } from 'react-redux'
import { auth, token, profile } from './constants'
import { createAction as act } from 'redux-actions'

class BaseComponent extends React.Component {
  componentDidMount(){
    let { props } = this;
    props.dispatch(act(auth.check)());
  }

  onAuthenticated(token, profile){ //if loginResult is null, it's likely because a token was already set
    console.log(`Login token ${token}, profile ${JSON.stringify(profile)}`);
  }

  render(){
    let { auth } = this.props;

    return <ReactReduxAuth0 onAuthenticated={::this.onAuthenticated}/>
  }
}

export default connect((state)=>{
  let { auth } = state;
  return { auth };
})(BaseComponent);
