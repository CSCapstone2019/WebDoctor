import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Card, Avatar } from 'antd';
import { getPatients } from '../../store/actions/patients';
import { getAppointments } from '../../store/actions/appointments';
import Footer from '../layout/Footer';
import {
  Container,
  CardGroup,
  Button,
  CardText,
  CardTitle
} from 'reactstrap';


const { Meta } = Card;


class PatientDashboard extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
  };

  componentDidMount() {
 
  }

  render() {
    const { isAuthenticated, isStaff, user } = this.props.auth;
    // console.log('USER --------------', user);
    return (
      <div>
        <Container>
          <div className="card card-body mt-4">
            <h1 className="text-center">
              <strong>Welcome to your WebDoctor dashboard, </strong>
              <strong>{isStaff ? `Doctor ` : ''}</strong>
              <strong style={{ textTransform: 'capitalize' }}>
                {user ? ` ${user.username}!` : ''}
              </strong>
            </h1>
          </div>
          {/* {isStaff ?  : } */}
          <br />
          <h5 className="text-center">
            View your information down
            below.
          </h5>
          <br />
          <div>
            <Card  style={{ width: 300 }}>
              <Meta
              avatar={
                  <Avatar src="https://pngimage.net/wp-content/uploads/2018/06/no-avatar-png-8.png" />
              }
                title={user ? `${user.first_name} ${user.last_name}` : ''}
              />
              <p>{user ? `${user.email}` : ''}</p>
              <strong>{isStaff ? 'Doctor' : 'Patient'}</strong>
            </Card>
          </div>
          <br/>
        </Container>
        <Footer />
      </div>

    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(
  PatientDashboard
);
