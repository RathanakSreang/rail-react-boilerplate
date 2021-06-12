import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import MaterialIcon from '@material/react-material-icon';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  InputGroup,
  InputGroupText,
  InputGroupAddon,
} from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import {updatePassword} from "../redux/service";
import {toggleModalPassword} from "../redux/commonSlice";
import {logout} from "../redux/userSlice";
import {removeTokens} from "../redux/tokenStore";

const PasswordSchema = Yup.object().shape({
  password: Yup.string().required('Required'),
  current_password: Yup.string().required('Required'),
 });

const PasswordModal = (props) => {
  const {
    className
  } = props;
  const dispatch = useDispatch()
  const modalPasswordOpen = useSelector((state) => state.commonReducer.modalPasswordOpen)

  const toggle = () => {
    dispatch(toggleModalPassword(!modalPasswordOpen));
  }

  return (
    <div>
      <Modal centered isOpen={modalPasswordOpen} toggle={toggle} className={className}>
        <ModalHeader className="w-100">
          <div className="d-flex w-100">
            <div className="flex-grow-1 ms-3">
              Update password
            </div>
            <div className="flex-shrink-0">
              <button className="btn btn-sm" onClick={toggle}>
                <MaterialIcon icon='close' className="icon" />
              </button>
            </div>
          </div>
        </ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{ password: '', current_password: '' }}
            validationSchema={PasswordSchema}
            onSubmit={(values, { setSubmitting, setErrors, resetForm }) => {
              updatePassword(values).then((respond) => {
                toggle();
                setSubmitting(false);
                resetForm();
                dispatch(logout());
                removeTokens();
              }).catch((err) => {
                setSubmitting(false);
                if (err.response && err.response.data) {
                  setErrors(err.response.data.errors);
                }
              });
            }}
          >
           {({ isSubmitting, errors, dirty }) => (
              <Form className="w-100">
                <div className="form-group mb-3">
                  <label>
                    Current Password
                  </label>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText><MaterialIcon icon='lock' /></InputGroupText>
                    </InputGroupAddon>
                    <Field type="password" name="current_password" className="form-control" placeholder="***********"/>
                  </InputGroup>
                  <ErrorMessage name="current_password" component="div" className="text-danger" />
                </div>

                <div className="form-group mb-3">
                  <label>
                    New Password
                  </label>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText><MaterialIcon icon='lock' /></InputGroupText>
                    </InputGroupAddon>
                    <Field type="password" name="password" className="form-control" placeholder="***********"/>
                  </InputGroup>
                  <ErrorMessage name="password" component="div" className="text-danger" />
                </div>

                <div className="row">
                  <div className="col-6">
                    <button type="submit" disabled={isSubmitting}
                      className="btn btn-block btn-outline-primary mb-4 w-100">
                       Update
                    </button>
                  </div>
                  <div className="col-6">
                    <button type="reset" onClick={toggle}
                      className="btn btn-block btn-outline-secondary mb-4 w-100">
                       Cancel
                    </button>
                  </div>
                </div>
              </Form>
           )}
          </Formik>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default PasswordModal;
