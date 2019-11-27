import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getAppointments,
  deleteAppointment
} from '../../store/actions/appointments';
import { Button, Container, Table } from 'reactstrap';

class Appointment extends Component {
  static propTypes = {
    appointments: PropTypes.array.isRequired,
    getAppointments: PropTypes.func.isRequired,
    deleteAppointment: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getAppointments();
  }

  render() {
    return (
      <>
        <Container>
          <h2 className="text-center">
            <u>Appointments</u>
          </h2>
          <Table dark hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Patient</th>
                <th>Appointment Date</th>
                <th>Appointment Time</th>
                <th>Message</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {this.props.appointments.map(a => (
                <tr key={a.appointment_id}>
                  <td>{a.appointment_id}</td>
                  <td>{a.patient}</td>
                  <td>{a.appointment_date}</td>
                  <td>{a.appointment_time}</td>
                  <td>{a.message}</td>
                  <td>
                    <Button
                      onClick={this.props.deleteAppointment.bind(
                        this,
                        a.appointment_id
                      )}
                      color="danger"
                      size="sm"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </>
    );
  }
}

const mapStateToProps = state => ({
  appointments: state.appointments.appointments
});

export default connect(mapStateToProps, { getAppointments, deleteAppointment })(
  Appointment
);
