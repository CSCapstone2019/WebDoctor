import React, { Component } from 'react';
import { withAlert } from 'react-alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class Alerts extends Component {
  static propTypes = {
    error: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired
  };

  componentDidUpdate(prevProps) {
    const { error, alert, message } = this.props;
    if (error !== prevProps.error) {
      if (error.msg.first_name) alert.error('First name is required.');
      if (error.msg.last_name) alert.error('Last name is required.');
      if (error.msg.zipcode) alert.error('Zipcode is required.');
      if (error.msg.email) alert.error('Email may not be blank.');
      if (error.msg.street) alert.error('Street may not be blank.');
      if (error.msg.city) alert.error('City may not be blank.');
      if (error.msg.dob) alert.error(error.msg.dob.join());
      if (error.msg.sex) alert.error(error.msg.sex.join());
      if (error.msg.phone)
        alert.error('Phone may not be blank or is in the incorrect format.');
      if (error.msg.non_field_errors)
        alert.error(error.msg.non_field_errors.join());
      if (error.msg.username) alert.error(error.msg.username.join());
      if (error.msg.appointment_date)
        alert.error(error.msg.appointment_date.join());
      if (error.msg.appointment_time)
        alert.error(error.msg.appointment_time.join());
    }

    if (message !== prevProps.message) {
      if (message.deletePatient) alert.success(message.deletePatient);
      if (message.addPatient) alert.success(message.addPatient);
      if (message.deleteAppointment) alert.success(message.deleteAppointment);
      if (message.addAppointment) alert.success(message.addAppointment);
      if (message.passwordNotMatch) alert.error(message.passwordNotMatch);
      if (message.patientLogin) alert.success(message.patientLogin);
      if (message.patientRegister) alert.success(message.patientRegister);
      if (message.patientLogout) alert.success(message.patientLogout);
    }
  }

  render() {
    return <></>;
  }
}

const mapStateToProps = state => ({
  error: state.errors,
  message: state.errorMsg
});

export default connect(mapStateToProps)(withAlert()(Alerts));
