import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPatients } from '../../store/actions/patients';
import { getAppointments } from '../../store/actions/appointments';
import Footer from '../layout/Footer';
import {
  Container,
  Card,
  CardGroup,
  Button,
  CardText,
  CardTitle
} from 'reactstrap';

class PatientDashboard extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    patients: PropTypes.array.isRequired,
    appointments: PropTypes.array.isRequired,
    getPatients: PropTypes.func.isRequired,
    getAppointments: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getPatients();
    this.props.getAppointments();
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
            <h4 className="text-center">
              View your patient information and upcoming appointments down
              below.
            </h4>
          </div>

          <h2 className="text-center mt-2">
            Patient{' '}
            <strong style={{ textTransform: 'capitalize' }}>
              {user ? ` ${user.username}` : ''}
            </strong>
          </h2>

          {this.props.patients.map(p => (
            <div className="d-flex justify-content-center">
              <CardGroup key={p.patient_id} className="w-50">
                <Card body outline color="success">
                  <CardTitle>
                    <strong>
                      <u>NAME:</u>
                    </strong>{' '}
                    {p.first_name} {p.last_name}
                  </CardTitle>
                  <CardText>
                    <strong>
                      <u>EMAIL:</u>
                    </strong>{' '}
                    {p.email}
                  </CardText>
                  <CardText>
                    <strong>
                      <u>PHONE:</u>
                    </strong>{' '}
                    {p.phone}
                  </CardText>
                  <CardText>
                    <strong>
                      <u>SEX:</u>
                    </strong>{' '}
                    {p.sex}
                  </CardText>
                  <CardText>
                    <strong>
                      <u>CITY:</u>
                    </strong>{' '}
                    {p.city}
                  </CardText>
                  <CardText>
                    <strong>
                      <u>STREET:</u>
                    </strong>{' '}
                    {p.street}
                  </CardText>
                  <CardText>
                    <strong>
                      <u>ZIPCODE:</u>
                    </strong>{' '}
                    {p.zipcode}
                  </CardText>
                  <CardText>
                    <strong>
                      <u>DOB:</u>
                    </strong>{' '}
                    {p.dob}
                  </CardText>
                  <CardText>
                    <strong>
                      <u>New patient date:</u>
                    </strong>{' '}
                    {p.new_patient_date.slice(0, 10)}
                  </CardText>
                  <Button color="primary">
                    <a
                      href="/patient/"
                      style={{ textDecoration: 'none', color: 'white' }}
                    >
                      Go to Patient Form
                    </a>
                  </Button>
                </Card>
              </CardGroup>
            </div>
          ))}

          <hr />

          <h2 className="text-center">Upcoming appointments:</h2>

          {this.props.appointments.map(a => (
            <div className="d-flex justify-content-center">
              <CardGroup key={a.appointment_id} className="w-50">
                <Card body outline color="danger">
                  <CardTitle>
                    <strong>
                      <u>Date of appointment:</u>
                    </strong>{' '}
                    {a.appointment_date}
                  </CardTitle>
                  <CardText>
                    <strong>
                      <u>Time of appointment:</u>
                    </strong>{' '}
                    {a.appointment_time}
                  </CardText>
                  <CardText>
                    <strong>
                      <u>Message:</u>
                    </strong>{' '}
                    {a.message}
                  </CardText>
                  <Button color="primary">
                    <a
                      href="/appointments/"
                      style={{ textDecoration: 'none', color: 'white' }}
                    >
                      Go to Appointments Form
                    </a>
                  </Button>
                </Card>
              </CardGroup>
            </div>
          ))}
        </Container>
        <br />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  patients: state.patients.patients,
  appointments: state.appointments.appointments,
  auth: state.auth
});

export default connect(mapStateToProps, { getPatients, getAppointments })(
  PatientDashboard
);
