import React from 'react';
import { Redirect } from 'react-router';
import isEmpty from 'lodash/isEmpty';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import {
  InputGroup,
  InputGroupText,
  InputGroupAddon,
} from 'reactstrap';
import MaterialIcon from '@material/react-material-icon';
import styled from 'styled-components';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';

import {loginService} from "../../redux/service";
import {updateAuthStore} from "../../redux/tokenStore";
import {login} from "../../redux/userSlice";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  min-height: 350px;
`;
const AuthSchema = Yup.object().shape({
  email: Yup.string().email().required('Required'),
  password: Yup.string().required('Required'),
 });

const SignInPage = () => {
  const user = useSelector((state) => state.userReducer.user)
  const dispatch = useDispatch()

  if(!isEmpty(user)) {
    return (<Redirect to={'/'}/>);
  }

  return(
    <Container>
      <p className="login-card-description">Signin to your account</p>
      <Formik
       initialValues={{ email: '', password: '' }}
       validationSchema={AuthSchema}
       onSubmit={(values, { setSubmitting, setErrors }) => {
          loginService(values).then((respond) => {
            setSubmitting(false);
            dispatch(login(respond.data));
            updateAuthStore(respond.data);
          }).catch(() => {
            setSubmitting(false);
            setErrors({email_password: 'Invalid email or password '});
            // dispatch(incrementAsync(Number(incrementAmount) || 0))
          });
       }}
      >
       {({ isSubmitting, errors }) => (
          <Form>
            {
              errors && errors.email_password &&
              <div className="text-danger text-center mb-3">
                {errors.email_password}
              </div>
            }
            <div className="form-group mb-2">
              <InputGroup className="">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText><MaterialIcon icon='email' /></InputGroupText>
                </InputGroupAddon>
                <Field type="email" name="email" className="form-control" placeholder="អាស័យ​ដ្ឋាន​អ៊ី​ម៉េ​ល"/>
              </InputGroup>
              <ErrorMessage name="email" component="div" className="text-danger" />
            </div>
            <div className="form-group mb-3">
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText><MaterialIcon icon='lock' /></InputGroupText>
                </InputGroupAddon>
                <Field type="password" name="password" className="form-control" placeholder="***********"/>
              </InputGroup>
              <ErrorMessage name="password" component="div" className="text-danger" />
            </div>

            <button type="submit" disabled={isSubmitting} className="btn btn-block login-btn mb-4 w-100">
               Signin
             </button>
          </Form>
       )}
      </Formik>
      <Link to='/forgot-password' className="forgot-password-link">Forget your password?</Link>
      <p className="login-card-footer-text mb-0">
        Not have account? <Link to='/register' className="register-link"> Create new!</Link>
      </p>
    </Container>
  );
}


export default SignInPage;
