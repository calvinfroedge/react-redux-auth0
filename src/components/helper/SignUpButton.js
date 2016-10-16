import React, { PropTypes } from 'react'

function SignUpButton({ children, href, onClick }) {
  return (
      <div className="signup">
        <a href={href} className="btn btn-default" onClick={onClick}>{children}</a>
      </div>
  )
}

SignUpButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  href: PropTypes.string,
  children: PropTypes.element
};

SignUpButton.defaultProps = {
  href: '#',
  title: 'Sign up'
};

export default SignUpButton;
