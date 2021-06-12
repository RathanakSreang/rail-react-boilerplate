import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';

const PrivateRoute = ({ children, config, user, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !isEmpty(user) ? (
           children
        ) : (
          config.plublic ? (
            children
           ) : (
            <Redirect
              to={{
                pathname: "/signin",
                state: { from: location }
              }}
            />
           )
        )
      }
    />
  );
}

export default PrivateRoute;
