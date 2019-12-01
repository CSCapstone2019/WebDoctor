import React from 'react';


import Schedule from './Schedule';
import ScheduleForm from './ScheduleForm';
import ScheduleComponent from './ScheduleComponent';
import Footer from '../layout/Footer';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ScheduleDashboard extends React.Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
  }
  
  render() {
    const { isAuthenticated, user } = this.props.auth;
    return (
      <>
        <ScheduleForm/>
        <Schedule />
        <Footer />
        {this.props.children}

      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};


export default connect(mapStateToProps)(ScheduleDashboard);