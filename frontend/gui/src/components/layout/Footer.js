import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <>
        <footer className="blog-footer">
          <p className="mb-1">&copy; 2019 WebDoctor</p>
          <ul className="list-inline">
            <li className="list-inline-item">
              <a href="/patient">Patients</a>
            </li>
            <li className="list-inline-item">
              <a href="/appointments">Appointments</a>
            </li>
            <li className="list-inline-item">
              <a href="/chat">Messages</a>
            </li>
            <li className="list-inline-item">
              <a href="/about-us">About Us</a>
            </li>
          </ul>
        </footer>
      </>
    );
  }
}

export default Footer;
