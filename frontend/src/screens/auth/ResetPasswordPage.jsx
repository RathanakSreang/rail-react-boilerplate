import React from 'react';
import { Redirect, withRouter } from 'react-router';
import isEmpty from 'lodash/isEmpty';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link, useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import {resetPassword} from "../../redux/service";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  min-height: 350px;
`;
const ResetPasswordPage = () => {
  let history = useHistory();
  let { token } = useParams();
  const user = useSelector((state) => state.userReducer.user)

  if(!isEmpty(user)) {
    return (<Redirect to={'/'}/>);
  }

  return (
    <Container>
      <p className="login-card-description">Reset your password!</p>
      <Formik
       initialValues={{ new_password: '', repeat_new_password: '', token: '' }}
       validate={values => {
         const errors = {};
         if (!values.new_password) {
           errors.new_password = 'Required';
         } else if(values.new_password !== values.repeat_new_password) {
            errors.repeat_new_password = 'Password not match';
         }

         return errors;
       }}
       onSubmit={(values, { setSubmitting, setErrors }) => {
          resetPassword({...values, token: token}).then(() => {
            setSubmitting(false);
            history.push('/reset-password/changed');
          }).catch((err) => {
            setSubmitting(false);
            if (err.response && err.response.data) {
              setErrors(err.response.data.errors);
            }
          });
       }}
      >
       {({ isSubmitting }) => (
          <Form>
            <div className="form-group text-center">
              <ErrorMessage name="token" component="div" className="text-danger" />
            </div>
            <div className="form-group mb-2">
              <label htmlFor="new_password" className="sr-only">New password</label>
              <Field type="password" name="new_password" className="form-control" placeholder="New password"/>
              <ErrorMessage name="new_password" component="div" className="text-danger" />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="repeat_new_password" className="sr-only">Repeat new password</label>
              <Field type="password" name="repeat_new_password" className="form-control" placeholder="Repeat password"/>
              <ErrorMessage name="repeat_new_password" component="div" className="text-danger" />
            </div>
            <button type="submit" disabled={isSubmitting} className="btn btn-block login-btn mb-4 w-100">
               Submit
             </button>
          </Form>
       )}
      </Formik>
      <p className="login-card-footer-text mb-0">ត្រលប់ទៅ
        <Link to='/signin' className="register-link"> Sign In!</Link>
      </p>
    </Container>
  );
}


export default withRouter(ResetPasswordPage);
