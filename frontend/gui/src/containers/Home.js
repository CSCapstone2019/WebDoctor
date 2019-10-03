import React, { Component } from 'react';
import AppNavbar from '../components/AppNavbar';
import Picture from '../components/Picture';

class Home extends Component {
  render() {
    return (
      <div>
        <AppNavbar />
        <Picture />
      </div>
    );
  }
}

export default Home;
