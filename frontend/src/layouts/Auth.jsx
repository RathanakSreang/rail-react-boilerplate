import React from 'react';
import { withRouter } from 'react-router-dom';

import {imagesByPath, imagesList} from './../assets/img/ImageList';

const AuthLayout = (props) => {
  const pathname = props.location.pathname;
  return (
    <div className="d-flex align-items-center py-3 py-md-0 auth-page">
      <div className="container">
        <div className="card login-card">
          <div className="row no-gutters">
            <div className="col-md-5 col-lg-6 position-relative">
              <img src={imagesByPath(pathname)} alt="login" className="login-card-img"></img>
            </div>
            <div className="col-md-7 col-lg-6">
              <div className="card-body">
                <div className="brand-wrapper">
                  <img src={imagesList['logo']} alt="logo" className="logo" />
                </div>
                {props.children}
                <div>
                <p className="login-card-footer-text mb-0">
                  Need support? <a href="http://m.me/khmerlang.official" target="_blank" rel="noreferrer" className="register-link"> Chat to us!</a>
                </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(AuthLayout);
