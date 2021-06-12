// import { DefaultLayout, AuthLayout, Public } from '../layouts';

import Dashboard from '../screens/Dashboard';
import EditProfile from '../screens/EditProfile';
import LandingPage from '../screens/LandingPage';
import SignInPage from '../screens/auth/SignInPage';
import RegisterPage from '../screens/auth/RegisterPage';
import ThankYouPage from '../screens/auth/ThankYouPage';
import ForgotPasswordPage from '../screens/auth/ForgotPasswordPage';
import ResetPasswordPage from '../screens/auth/ResetPasswordPage';

const PageRoutes = [
  {
    path: '/',
    plublic: false,
    exact: true,
    component: Dashboard,
  },
  {
    path: '/edit-profile',
    plublic: false,
    exact: true,
    component: EditProfile,
  },

  {
    path: '/',
    plublic: true,
    exact: true,
    component: LandingPage,
  },
  {
    path: '/signin',
    plublic: true,
    exact: true,
    component: SignInPage,
  },
  {
    path: '/register',
    plublic: true,
    exact: true,
    component: RegisterPage,
  },
  {
    path: '/forget-password/instruction-sent',
    plublic: true,
    exact: true,
    component: ThankYouPage,
  },
  {
    path: '/reset-password/changed',
    plublic: true,
    exact: true,
    component: ThankYouPage,
  },
  {
    path: '/forgot-password',
    plublic: true,
    exact: true,
    component: ForgotPasswordPage,
  },
  {
    path: '/reset-password/:token',
    plublic: true,
    exact: true,
    component: ResetPasswordPage,
  },
];

export default PageRoutes;
