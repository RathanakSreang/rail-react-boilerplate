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

import {registerAccount} from "../../redux/service";
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
  name: Yup.string().required('Required'),
  email: Yup.string().email().required('Required'),
  password: Yup.string().required('Required'),
 });

const RegisterPage = () => {
  const user = useSelector((state) => state.userReducer.user)
  const dispatch = useDispatch();

  if(!isEmpty(user)) {
    return (<Redirect to={'/'}/>);
  }
  return(
    <Container>
      <p className="login-card-description">បង្កើតក្នុងគណនីរបស់អ្នក</p>
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        validationSchema={AuthSchema}
        onSubmit={(values, { setSubmitting, setErrors }) => {
          registerAccount(values).then((respond) => {
            setSubmitting(false);
            dispatch(login(respond.data));
            updateAuthStore(respond.data);
          }).catch((err) => {
            setSubmitting(false);
            if (err.response && err.response.data) {
              setErrors(err.response.data.errors);
            }
          });
        }}
      >
       {({ isSubmitting, errors }) => (
          <Form>
            <div className="form-group mb-2">
              <InputGroup className="">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText><MaterialIcon icon='person' /></InputGroupText>
                </InputGroupAddon>
                <Field type="text" name="name" className="form-control" placeholder="Name"/>
              </InputGroup>
              <ErrorMessage name="name" component="div" className="text-danger" />
            </div>
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
               បង្តើត
             </button>
          </Form>
       )}
      </Formik>
      <p className="login-card-footer-text mb-0">
        Already have account? <Link to='/signin' className="register-link"> Signin!</Link>
      </p>
    </Container>
  );
}

export default RegisterPage
