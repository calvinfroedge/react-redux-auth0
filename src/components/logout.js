import React, { PropTypes } from 'react'
import { createAction as act } from 'redux-actions'
import { connect } from 'react-redux'
import { auth } from '../constants'

class Logout extends React.Component {
  constructor(props){
    super(props);
  }

  logout(){
    let { dispatch, onLogout } = this.props;
    dispatch(act(auth.logout)());
    if (onLogout) {
      onLogout();
    }
  }

  render(){
    const { href, children } = this.props;

    return (
      <div className="logout">
        <a href={href} onClick={::this.logout} className="logout">{children}</a>
      </div>
    );
  }
}

Logout.propTypes = {
  href: PropTypes.string,
  children: PropTypes.element,
  onLogout: PropTypes.func,
};

Logout.defaultProps = {
  children: 'Logout',
  href: '#',
};

export default connect((state)=>{
  let { auth } = state;

  return { auth };
})(Logout);
