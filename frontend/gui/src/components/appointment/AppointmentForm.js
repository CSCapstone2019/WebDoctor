import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addAppointment } from '../../store/actions/appointments';
import {
  Jumbotron,
  Container,
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';

class AppointmentForm extends Component {
  state = {
    patient: '',
    appDate: '',
    appTime: '',
    message: ''
  };

  static propTypes = {
    addAppointment: PropTypes.func.isRequired
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    const { patient, appDate, appTime, message } = this.state;
    const appointment = {
      patient,
      appDate,
      appTime,
      message
    };
    this.props.addAppointment(appointment);
    this.setState({
      patient: '',
      appDate: '',
      appTime: '',
      message: ''
    });
  };

  render() {
    const { patient, appDate, appTime, message } = this.state;
    return (
      <>
        <Jumbotron>
          <h1 className="display-3">Appointments</h1>
          <p className="lead">
            Schedule an appointment with us using this simple form!
          </p>
          <hr className="my-2" />
          <p>Hours are: 9am-4pm M-F</p>
          <p className="lead">
            <Button color="primary">
              <a
                href="/about-us/"
                style={{ textDecoration: 'none', color: 'white' }}
              >
                Learn More
              </a>
            </Button>
          </p>
        </Jumbotron>
        <Container>
          <div className="card card-body mt-4 mb-4">
            <h2 className="text-center">
              <u>Schedule Appointment</u>
            </h2>
            <Form onSubmit={this.onSubmit}>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label>Patient</Label>
                    <Input
                      type="text"
                      name="patient"
                      placeholder="Enter your patient"
                      onChange={this.onChange}
                      value={patient}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label>Appointment Date</Label>
                    <Input
                      type="date"
                      name="appDate"
                      onChange={this.onChange}
                      value={appDate}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label>Appointment Time</Label>
                    <Input
                      type="time"
                      name="appTime"
                      onChange={this.onChange}
                      value={appTime}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label>Message</Label>
                    <Input
                      type="textarea"
                      name="message"
                      placeholder="Enter your message here"
                      onChange={this.onChange}
                      value={message}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <Button color="primary">Submit</Button>
              </FormGroup>
            </Form>
          </div>
        </Container>
      </>
    );
  }
}

export default connect(null, { addAppointment })(AppointmentForm);
