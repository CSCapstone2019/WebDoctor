import React, { Component } from 'react';
import AppNavbar from '../components/AppNavbar';
import Footer from '../components/Footer';
import GoogleMapReact from 'google-map-react';
import { Link } from 'react-router-dom';
import { Jumbotron, Button } from 'reactstrap';

const SomeComponent = ({ text }) => (
  <div
    style={{
      color: 'white',
      background: 'grey',
      padding: '15px 10px',
      display: 'inline-flex',
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '100%',
      transform: 'translate(-50%, -50%)'
    }}
  >
    {text}
  </div>
);

class About extends Component {
  static defaultProps = {
    center: {
      lat: 33.969,
      lng: -84.55
    },
    zoom: 7
  };

  render() {
    return (
      <>
        <AppNavbar />
        <Jumbotron>
          <h1 className="display-3">About Us!</h1>
          <p className="lead">
            We are a local physician's office located right here in Marietta,
            GA. <br />
            Make sure to fill out a <Link to="/patient">patient form</Link>{' '}
            before scheduling an <Link to="/appointments">appointment</Link>{' '}
            with us. <br /> Check your email regularly for updates.
          </p>
          <hr className="my-2" />
          <p>Hours are: 9am-4pm M-F</p>
          <p className="lead">
            <Button color="primary">Learn More</Button>
          </p>
        </Jumbotron>
        <div style={{ height: '40vh', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: 'AIzaSyD1F09eNrOouc-5Pd7OelVROaQarbW_UxU'
            }}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
          >
            <SomeComponent
              lat={33.969}
              lng={-84.552}
              text="Kennestone Hospital"
            />
          </GoogleMapReact>
        </div>
        <Footer />
      </>
    );
  }
}

export default About;
