import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <>
        <footer className="blog-footer">
          <p className="mb-1">&copy; 2019 WebDoctor</p>
          <ul class="list-inline">
            <li class="list-inline-item">
              <a href="/patients">Patient</a>
            </li>
            <li class="list-inline-item">
              <a href="/appointments">Appointments</a>
            </li>
            <li class="list-inline-item">
              <a href="/messages">Messages</a>
            </li>
          </ul>
        </footer>
      </>
    );
  }
}

export default Footer;
