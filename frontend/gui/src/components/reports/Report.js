import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Select, Form, Button, Input } from 'antd';
import PropTypes from 'prop-types';
import * as reportActions from '../../store/actions/report';
import {Container, Table } from 'reactstrap';

class Report extends React.Component {


  static propTypes = {
    auth: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    getUserReports: PropTypes.func.isRequired,
  };


  waitForDetail() {
    const component = this;
    console.log("-------------IS LOADING SHCEUDLE: ", component.props.isLoading)
    setTimeout(function () {
      if (!(component.props.isLoading)) {
        console.log("-------------USER: ", component.props.auth.user.username)
        component.props.getUserReports(component.props.auth.user.username); //component.props.auth.user.username
        return;
      } else {
        console.log("waiting for authentication details...");
        component.waitForDetail();
      }
    }, 100);
  }


  componentDidMount() {
    this.waitForDetail();
  }

  render() {
    let activeReport = this.props.reports.map(c => {
      return (
        <tr key={c.report_id}>
          <td>{c.report_id}</td>
          <td>{c.participants.toString()}</td>
          <td>{c.title}</td>
          <td>
            <Button type="default" href={`${c.pdf}`} target="_blank"> View {c.title} </Button>
          </td>
        </tr>

      );
    });

    console.log("REPORTS ", this.props.reports);

    return (

      <>
        <Container>
          <Table dark hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Can Be Viewed By</th>
                <th>Title</th>
                <th>View Report</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {activeReport}
            </tbody>
          </Table>
        </Container>
      </>
      
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  isLoading: state.auth.isLoading,
  loading: state.loading,
  reports: state.report.reports
});

const mapDispatchToProps = dispatch => {
  return {
    getUserReports: (username) => dispatch(reportActions.getUserReport(username))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(
  Report
);
