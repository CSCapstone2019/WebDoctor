import React from 'react';


import Report from './Report';
import ReportForm from './ReportForm';
import ReportViewer from './ReportViewer';
import Footer from '../layout/Footer';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ReportDashboard extends React.Component {
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
        <ReportForm />
        <Report />
        {/* <ReportViewer /> */}
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


export default connect(mapStateToProps)(ReportDashboard);