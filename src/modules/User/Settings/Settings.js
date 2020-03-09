import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <section className="page-section">
        <div className="bg-img1  d-flex align-items-center">
          <div className="container p-41 height-pass d-flex justify-content-center align-items-center back-color">
            <div className="text-center" id="hover-effect-set">
              <h4>
                <NavLink to="/storage-provider">Storage Providers</NavLink>
              </h4>
              <h4>
                <NavLink to="/change-password">Change Password</NavLink>
              </h4>
              <h4>
                <NavLink to="/backup-and-restore">Backup & Restore</NavLink>
              </h4>
              
              <h4>
                <NavLink to="/api-setting">API Settings</NavLink>
              </h4>
              <h4>
                <NavLink to="/reset-browser">Log out</NavLink>
              </h4>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Settings;
