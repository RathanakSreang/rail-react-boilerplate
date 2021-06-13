import React from 'react';
import { Redirect } from 'react-router';
import isEmpty from 'lodash/isEmpty';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link, useHistory } from 'react-router-dom';
import {
  InputGroup,
  InputGroupText,
  InputGroupAddon,
} from 'reactstrap';
import MaterialIcon from '@material/react-material-icon';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import {forgetPassword} from "../../redux/service";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const  ForgotPasswordPage = () => {
  let history = useHistory();
  const user = useSelector((state) => state.userReducer.user);

  if(!isEmpty(user)) {
    return (<Redirect to={'/'}/>);
  }

  return (
    <Container>
      <p className="login-card-description">Forgot your password?</p>
      <Formik
       initialValues={{ email: '' }}
       validate={values => {
         const errors = {};
         if (!values.email) {
           errors.email = 'Required';
         } else if (
           !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
         ) {
           errors.email = 'Invalid email address';
         }
         return errors;
       }}
       onSubmit={(values, { setSubmitting, setErrors }) => {
          forgetPassword(values).then(() => {
            setSubmitting(false);
            history.push('/forget-password/instruction-sent');
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
            <div className="form-group mb-3">
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText><MaterialIcon icon='email' /></InputGroupText>
                </InputGroupAddon>
                <Field type="email" name="email" className="form-control" placeholder="អាស័យ​ដ្ឋាន​អ៊ី​ម៉េ​ល"/>
              </InputGroup>
              <ErrorMessage name="email" component="div" className="text-danger" />
            </div>
            <button type="submit" disabled={isSubmitting} className="btn btn-block login-btn mb-4 w-100">
               Send reset password instruction
             </button>
          </Form>
       )}
      </Formik>
      <p className="login-card-footer-text mb-0">Back
        <Link to='/signin' className="register-link"> Sign In!</Link>
      </p>
    </Container>
  );
}

export default ForgotPasswordPage
