import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import {logout} from "../redux/userSlice";
import {removeTokens} from "../redux/tokenStore";
import logo from './../assets/img/logo.svg';
const Default = ({ children }) => {
  const user = useSelector((state) => state.userReducer.user)
  const dispatch = useDispatch()
  const handleSignOut = (e) => {
    e.preventDefault();
    dispatch(logout());
    removeTokens();
  }

  return (
    <div className="d-flex align-items-center py-3 py-md-0 h-100 application">
      <div className="container h-100">
        <div className="card h-100 main">
          <div className="row no-gutters">
            <div className="profile-nav col-md-4 col-lg-5 position-relative mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center">
                    <div className="app-logo">
                      <img src={logo}
                        alt={user.name}
                        width="80"/>
                    </div>
                    <div className="mt-3 w-100">
                      <h4>{user.name}</h4>
                      <p className="text-secondary mb-1">{user.email}</p>
                      <p className="text-muted font-size-sm">{user.phone}</p>
                      <div className="list-group profile-nav">
                        <NavLink to="/" exact className="list-group-item list-group-item-action">
                          Profile
                        </NavLink>
                        <NavLink to="/edit-profile" exact className="list-group-item list-group-item-action">
                          Setting
                        </NavLink>
                        <a href="#signout"
                          onClick={handleSignOut}
                          className="text-danger list-group-item list-group-item-action">
                          Sign out
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8 col-lg-7">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Default;
