import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import LoadingPage from '../screens/LoadingPage';
import NotFoundPage from '../screens/NotFoundPage';
import PasswordModal from '../components/PasswordModal';
import PageRoutes from './PageRoutes';
import PrivateRoute from './PrivateRoute';
import { DefaultLayout, AuthLayout } from '../layouts';

const AppRouter = () => {
  const user = useSelector((state) => state.userReducer.user)
  const pageLoading = useSelector((state) => state.commonReducer.pageLoading)
  const isAuthenicated = !isEmpty(user);
  const Layout = isAuthenicated ? DefaultLayout : AuthLayout;

  if (pageLoading) {
    return <LoadingPage />;
  }

  return (
    <Router>
      <div>
        <Layout>
          <Switch>
            {PageRoutes.map((route, index) => {
              return (
                <PrivateRoute
                  user={user}
                  config={route}
                  key={index}
                  path={route.path}
                  exact={route.exact}>
                  <route.component />
                </PrivateRoute>
              );
            })}
            <Route component={NotFoundPage} />
          </Switch>
        </Layout>
        {
          isAuthenicated &&
          <>
            <PasswordModal />
          </>
        }
      </div>
    </Router>
  );
}

export default AppRouter;
