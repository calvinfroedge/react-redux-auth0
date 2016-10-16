import React, { PropTypes } from 'react'

function LoginButton({ children, href, onClick }) {
  return (
      <div className="login">
        <a href={href} className="btn btn-default" onClick={onClick}>{children}</a>
      </div>
  )
}

LoginButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  href: PropTypes.string,
  children: PropTypes.element
};

LoginButton.defaultProps = {
  href: '#',
  children: 'Sign in'
};

export default LoginButton;
