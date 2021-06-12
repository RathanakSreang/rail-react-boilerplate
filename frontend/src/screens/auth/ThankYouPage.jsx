import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

const ThankYouPage = ({match}) => {
  const path = match.path;
  let title = 'Thank you for registration!';
  let description = 'Please check your email for your account information.';
  if(path === '/forget-password/instruction-sent') {
    title = 'Forget password emailed!';
    description = 'Please check your email for your reset password instruction.';
  } else if (path === '/reset-password/changed') {
    title = 'Password is updated!';
    description = 'Your password is updated.';
  }

  return (
    <div className="text-center">
      <p className="login-card-description font-weight-bold mb-1">{title}</p>
      <p className="login-card-footer-text mb-2">{description}</p>
      <p className="login-card-footer-text mb-0">ត្រលប់ទៅ
        <Link to='/signin' className="register-link"> Sign In!</Link>
      </p>
    </div>
  );
}


export default withRouter(ThankYouPage);
