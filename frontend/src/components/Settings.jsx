import React from 'react';
import MaterialIcon from '@material/react-material-icon';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {
  InputGroup,
  InputGroupText,
  InputGroupAddon,
} from 'reactstrap';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import {updateAccount} from "../redux/service";
import {updateUser} from "../redux/userSlice";
import {toggleModalPassword} from "../redux/commonSlice";

const ProfileSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
 });

const Settings = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user)
  const toggleChangePassword = () => {
    dispatch(toggleModalPassword(true));
  }

  return(
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col items-center justify-center sm:py-12">
      <div className="row">
        <div className="col-12 mb-1">
          <div className="card h-100 card-state mb-3 card-action" onClick={toggleChangePassword}>
            <div className="card-body d-flex align-items-center">
              <div className="flex-shrink-0">
                <MaterialIcon icon='lock' className="icon" />
              </div>
              <div className="flex-grow-1 ms-3">
                <p className="card-text mb-0">Change password</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="card h-100 card-state">
            <div className="card-body d-flex align-items-center">
              <Formik
                initialValues={{ name: user.name, email: user.email }}
                validationSchema={ProfileSchema}
                onSubmit={(values, { setSubmitting, setErrors, resetForm }) => {
                  updateAccount({name: values.name}).then((respond) => {
                    setSubmitting(false);
                    dispatch(updateUser(respond.data));
                    resetForm({values: values});
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
                        <Field type="email" readOnly name="email" className="form-control" placeholder="អាស័យ​ដ្ឋាន​អ៊ី​ម៉េ​ល"/>
                      </InputGroup>
                      <ErrorMessage name="email" component="div" className="text-danger" />
                    </div>

                    {
                      dirty &&
                      <div className="row">
                        <div className="col-6">
                          <button type="submit" disabled={isSubmitting}
                            className="btn btn-block btn-outline-primary mb-4 w-100">
                             Update
                          </button>
                        </div>
                        <div className="col-6">
                          <button type="reset" disabled={isSubmitting}
                            className="btn btn-block btn-outline-secondary mb-4 w-100">
                             Reset
                          </button>
                        </div>
                      </div>
                    }
                  </Form>
               )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
