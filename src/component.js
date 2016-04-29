import React from 'react'
import { LoginSignup, Logout }  from './components/index'
import { connect } from 'react-redux'
import { auth } from './constants'
import { createAction as act } from 'redux-actions'

class BaseComponent extends React.Component {
  componentDidMount(){
    let { props } = this;

    props.dispatch(act(auth.check)());
  }

  render(){
    let { auth } = this.props;

    return <div>
      {!auth.token && <LoginSignup login />}
      {auth.token &&  <Logout />}
    </div>
  }
}

export default connect((state)=>{
  let { auth } = state;
  return { auth };
})(BaseComponent);
