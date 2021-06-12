import React from 'react';
import { Redirect } from 'react-router';
import isEmpty from 'lodash/isEmpty';
import { useSelector } from 'react-redux';

import Settings from "../components/Settings";

const EditProfile = () => {
  const user = useSelector((state) => state.userReducer.user)

  if(isEmpty(user)) {
    return (<Redirect to={'/signin'}/>);
  }

  return(
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col items-center justify-center sm:py-12">
      <Settings/>
    </div>
  );
}

export default EditProfile
