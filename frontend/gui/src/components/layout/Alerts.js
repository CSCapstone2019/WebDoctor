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
    }

    if (message !== prevProps.message) {
      if (message.deletePatient) alert.success(message.deletePatient);
      if (message.addPatient) alert.success(message.addPatient);
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
