import React, { Component } from 'react';
import { Select, TimePicker } from 'antd';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import * as scheduleActions from '../../store/actions/schedule';
import * as patientActions from '../../store/actions/patients';
import { getAllPatients, getStaff, getPatients, deletePatient } from '../../store/actions/patients';
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

const { Option } = Select;

class AppointmentForm extends Component {
  state = {
    usernames: [],
    appointment_date: '',
    appointment_time: '',
    message: ''
  };

  static propTypes = {
    auth: PropTypes.object.isRequired,
    getStaff: PropTypes.func.isRequired,
    staff: PropTypes.array.isRequired,
    getAllPatients: PropTypes.func.isRequired,
    all_patients: PropTypes.array.isRequired,
  };

  componentDidMount() {
    this.props.getPatients();
    this.props.getStaff();
    this.props.getAllPatients();

  }

  onChange = e =>
    this.setState({
      [e.target.name]: e.target.value
    });

  // Value 
  handleChange = value => {
    console.log("VALUE   ", value);
    this.setState({
      usernames: value
    });
  };

  handleSubmit = e => {
    const component = this;
    const { user } = this.props.auth;
    const { usernames, appointment_date, appointment_time, message } = this.state;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const combined = [...usernames, component.props.auth.user.username];
        console.log("COMBINED", combined);
        axios.defaults.headers = {
          "Content-Type": "application/json",
          Authorization: `Token ${this.props.auth.token}`
        };
        axios
          .post('http://127.0.0.1:8000/chat/schedule/create/', {
            appointment_date: appointment_date, 
            appointment_time: appointment_time, 
            message: message,
            participants: combined
          })
          .then(res => {
            console.log(res.data);
            this.props.getUserSchedule(component.props.auth.user.username);
          })
          .catch(err => {
            console.error(err);
            this.setState({
              error: err
            });
          });
      }
    });
  };
  
  // // TIME SELECT
  // onTimeChange(time, timeString) {
  //   console.log(time, timeString);
  //   this.setState({
  //     appTime: time
  //   });
  // }

  // onSubmit = e => {
  //   e.preventDefault();
  //   const { patient, appointment_date, appointment_time, message } = this.state;

  //   const appointment = {
  //     patient,
  //     appointment_date,
  //     appointment_time,
  //     message
  //   };
  //   console.log("PATIENT", this.state.patient)
  //   this.props.addAppointment(appointment);
  //   this.setState({
  //     patient: '',
  //     appointment_date: '',
  //     appointment_time: '',
  //     message: ''
  //   });
  // };

  render() {
    const { isAuthenticated, isStaff, user } = this.props.auth;
    const { usernames, appointment_date, appointment_time, message } = this.state;
    let patientOptions = this.props.staff.map(p => {
      return (
        <Option value={p.username}>
          {p.username}
        </Option>
      );
    });

    let doctorOptions = this.props.all_patients.map(p => {
      return (
        <Option value={p.username}>
          {p.username}
        </Option>
      );
    });

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
              <strong>Schedule an Appointment</strong>
            </h2>
            <br />
            <Form onSubmit={this.onSubmit}>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    {isStaff ? <Label>Patient</Label> : <Label>Doctor</Label>}
                    {isStaff ? <Select
                      showSearch
                      style={{ width: '100%' }}
                      placeholder="Select a patient"
                      optionFilterProp="children"
                      onChange={this.handleChange}
                      filterOption={(input, option) =>
                        option.props.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {doctorOptions}
                    </Select> : <Select
                      showSearch
                      style={{ width: '100%' }}
                      placeholder="Select a doctor"
                      optionFilterProp="children"
                        onChange={this.handleChange}
                      filterOption={(input, option) =>
                        option.props.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                        {patientOptions}
                      </Select>}

                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label>Appointment Date</Label>
                    <Input
                      type="date"
                      name="appointment_date"
                      onChange={this.onChange}
                      value={appointment_date}
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
                      name="appointment_time"
                      onChange={this.onChange}
                      value={appointment_time}
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
const mapStateToProps = state => ({
  patients: state.patients.patients,
  staff: state.patients.staff,
  all_patients: state.patients.all_patients,
  auth: state.auth
});

const mapDispatchToProps = dispatch => {
  return {
    getUserSchedule: (username) => dispatch(scheduleActions.getUserSchedule(username)),
    getPatients: () => dispatch(patientActions.getPatients()),
    getAllPatients: () => dispatch(patientActions.getAllPatients()),
    getStaff: () => dispatch(patientActions.getStaff()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  AppointmentForm
);
