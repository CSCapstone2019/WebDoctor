import React, { Component } from 'react';
import Footer from '../components/Footer';
import GoogleMapReact from 'google-map-react';
import { Link } from 'react-router-dom';
import { Jumbotron } from 'reactstrap';
import '../assets/masthead.css';

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
        </Jumbotron>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/simple-line-icons@2.4.1/css/simple-line-icons.css"
          integrity="sha256-q5+FXlQok94jx7fkiX65EGbJ27/qobH6c6gmhngztLE="
          crossorigin="anonymous"
        ></link>
        <section class="features-icons bg-white text-center">
          <div class="container">
            <div class="row">
              <div class="col-lg-4">
                <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                  <div class="features-icons-icon d-flex">
                    <i class="icon-screen-smartphone m-auto text-primary"></i>
                  </div>
                  <h3>Approachable</h3>
                  <p class="lead mb-0">
                    We are available through phone calls and email. Contact
                    hours are between 9am-4pm M-F.
                  </p>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                  <div class="features-icons-icon d-flex">
                    <i class="icon-people m-auto text-primary"></i>
                  </div>
                  <h3>Customer Service</h3>
                  <p class="lead mb-0">
                    What matters to WebDoctor? Our customer's health and
                    well-being is our first, most important priority.
                  </p>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="features-icons-item mx-auto mb-0 mb-lg-3">
                  <div class="features-icons-icon d-flex">
                    <i class="icon-check m-auto text-primary"></i>
                  </div>
                  <h3>Great Location</h3>
                  <p class="lead mb-0">
                    Located in the center of Marietta. Check out the interactive
                    map below!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

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
