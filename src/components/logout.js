import React from 'react'
import { createAction as act } from 'redux-actions'
import { connect } from 'react-redux'
import { auth } from '../constants'

class Logout extends React.Component {
  constructor(props){
    super(props);
  }

  logout(){
    let { dispatch } = this.props;
    dispatch(act(auth.logout)());
  }

  render(){
    return (
      <div className="logout">
        <a href="#" onClick={::this.logout} className="logout">Logout</a>
      </div>
    );
  }
}

export default connect((state)=>{
  let { auth } = state;

  return { auth };
})(Logout);
