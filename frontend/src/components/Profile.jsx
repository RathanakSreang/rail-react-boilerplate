import React from 'react';
import MaterialIcon from '@material/react-material-icon';

const Profile = () => {
  return(
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col items-center justify-center sm:py-12">
      <div className="row">
        <div className="col-12 col-sm-6 mb-3">
          <div className="card h-100 card-state mb-3">
            <div className="card-body d-flex align-items-center">
              <div className="flex-grow-1 ms-3">
                <p className="lead mb-1">1000.0K</p>
                <p className="card-text mb-0">Today request</p>
              </div>
              <div className="flex-shrink-0">
                <MaterialIcon icon='sync_alt' className="icon" />
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 mb-3">
          <div className="card h-100 card-state">
            <div className="card-body d-flex align-items-center">
              <div className="flex-grow-1 ms-3">
                <p className="lead mb-1">1000.0K</p>
                <p className="card-text mb-0">Total</p>
              </div>
              <div className="flex-shrink-0">
                <MaterialIcon icon='timeline' className="icon" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
