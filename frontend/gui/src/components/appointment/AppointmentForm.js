import React, { Component } from 'react';
import { Select, TimePicker } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAllPatients,getStaff, getPatients, deletePatient } from '../../store/actions/patients';
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
    patient: '',
    appointment_date: '',
    appointment_time: '',
    message: ''
  };

  static propTypes = {
    auth: PropTypes.object.isRequired,
    addAppointment: PropTypes.func.isRequired,
    patients: PropTypes.array.isRequired,
    getPatients: PropTypes.func.isRequired,
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

  // PATIENT SELECT
  onPatientChange = value => {
    console.log(value);
    this.setState({
      patient: value
    });
  };

  // // TIME SELECT
  // onTimeChange(time, timeString) {
  //   console.log(time, timeString);
  //   this.setState({
  //     appTime: time
  //   });
  // }

  onSubmit = e => {
    e.preventDefault();
    const { patient, appointment_date, appointment_time, message } = this.state;

    const appointment = {
      patient,
      appointment_date,
      appointment_time,
      message
    };
    console.log("PATIENT", this.state.patient)
    this.props.addAppointment(appointment);
    this.setState({
      patient: '',
      appointment_date: '',
      appointment_time: '',
      message: ''
    });
  };

  render() {
    const { isAuthenticated, isStaff, user } = this.props.auth;
    const { patient, appointment_date, appointment_time, message } = this.state;
    let patientOptions = this.props.staff.map(p => {
      return (
        <Option value={p.id}>
          {p.username}
        </Option>
      );
    });

    let doctorOptions = this.props.all_patients.map(p => {
      return (
        <Option value={p.id}>
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
            <br/>
            <Form onSubmit={this.onSubmit}>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    {isStaff ? <Label>Patient</Label> : <Label>Doctor</Label>}
                    {/* <Input
                      type="text"
                      name="patient"
                      placeholder="Enter your patient"
                      onChange={this.onChange}
                      value={patient}
                    /> */}

                    {isStaff ? <Select
                      showSearch
                      style={{ width: '100%' }}
                      placeholder="Select a patient"
                      optionFilterProp="children"
                      onChange={this.onPatientChange}
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
                      onChange={this.onPatientChange}
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

                    {/* <TimePicker 
                      style={{ width: '100%' }}
                      use12Hours 
                      format="h:mm a" 
                      value = {appTime}
                      name = "appTime"
                      onChange={this.onTimeChange} /> */}
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
export default connect(mapStateToProps, { getAllPatients ,getStaff, getPatients, addAppointment })(
  AppointmentForm
);
