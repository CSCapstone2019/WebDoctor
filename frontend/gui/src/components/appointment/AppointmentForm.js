import React, { Component } from 'react';
import { Select, TimePicker  } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPatients, deletePatient } from '../../store/actions/patients';
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
  Input,
} from 'reactstrap';

const { Option } = Select;

class AppointmentForm extends Component {

  state = {
    patient_id: '',
    appDate: '',
    appTime: '',
    message: ''
  };

  static propTypes = {
    addAppointment: PropTypes.func.isRequired,
    patients: PropTypes.array.isRequired,
    getPatients: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getPatients();
  }

  onChange = e => 
    this.setState({ 
    [e.target.name]: e.target.value 
  });

  // PATIENT SELECT
  onPatientChange = value => {
    console.log(value);
    this.setState({
      patient_id: value
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
    const { patient_id, appDate, appTime, message } = this.state;

    const appointment = {
      patient_id,
      appDate,
      appTime,
      message
    };

    this.props.addAppointment(appointment);
    this.setState({
      patient_id: '',
      appDate: '',
      appTime: '',
      message: ''
    });
  };

  render() {
    const { patient_id, appDate, appTime, message } = this.state;
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
                    {/* <Input
                      type="text"
                      name="patient"
                      placeholder="Enter your patient"
                      onChange={this.onChange}
                      value={patient}
                    /> */}

                    <Select
                      showSearch
                      style={{ width: '100%' }}
                      placeholder="Select a patient"
                      optionFilterProp="children"
                      onChange={this.onPatientChange}
                      filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {this.props.patients.map(p => (
                        <Option value={p.patient_id}>{p.first_name} {p.last_name}</Option>
                      ))}
                      
                    </Select>


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
  patients: state.patients.patients
});
export default connect(mapStateToProps, { getPatients, addAppointment })(AppointmentForm);
