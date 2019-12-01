import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as scheduleActions from '../../store/actions/schedule';
import { Button, Container, Table } from 'reactstrap';
import Contact from '../chat/ChatContact';
import { Calendar, Badge } from "antd";
import moment from "moment";


class Schedule extends React.Component {
  state = {
    listDate: []
  };
  static propTypes = {
    auth: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    getUserSchedule: PropTypes.func.isRequired
  };

  waitForDetail() {
    const component = this;
    console.log(
      "-------------IS LOADING SHCEUDLE: ",
      component.props.isLoading
    );
    setTimeout(function() {
      if (!component.props.isLoading) {
        console.log("-------------USER: ", component.props.auth.user.username);
        component.props.getUserSchedule(component.props.auth.user.username); //component.props.auth.user.username
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

  // CALENDAR
  getListData = value => {
    console.log("GET LIST DATA VALUE: ", value);
    let listData;
    switch (value.date()) {
      case 8:
        listData = [
          { type: "warning", content: "This is warning event." },
          { type: "success", content: "This is usual event." }
        ];
        break;
      case 10:
        listData = [
          { type: "warning", content: "This is warning event." },
          { type: "success", content: "This is usual event." },
          { type: "error", content: "This is error event." }
        ];
        break;
      case 15:
        listData = [
          { type: "warning", content: "This is warning event" },
          { type: "success", content: "This is very long usual event。。...." },
          { type: "error", content: "This is error event 1." },
          { type: "error", content: "This is error event 2." },
          { type: "error", content: "This is error event 3." },
          { type: "error", content: "This is error event 4." }
        ];
        break;
      default:
    }
    return listData || [];
  };

  dateCellRender = value => {
    console.log("DATE CELL RENDER VALUE:", value);
    const listData = this.getListData(value);
    return (
      <ul className="events">
        {listData.map(item => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  getMonthData = value => {
    if (value.month() === 8) {
      return 1394;
    }
  };

  monthCellRender = value => {
    const num = this.getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  onPanelChange = (value, mode) => {
    console.log(value, mode);
  };
  //CALENDAR END


  render() {
    // const { value, selectedValue } = this.state;
    let activeSchedule = this.props.schedules.map(c => {
      return (
        <tr key={c.schedule_id}>
          <td>{c.schedule_id}</td>
          <td>{c.participants.toString()}</td>
          <td>{c.appointment_date}</td>
          <td>{c.appointment_time}</td>
          <td>{c.message}</td>
        </tr>
      );
    });

    console.log("SCHEDULE ", this.props.schedules);

    return (
      <>
        <Container>
          <Table dark hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Participants</th>
                <th>Appointment Date</th>
                <th>Appointment Time</th>
                <th>Reason</th>
                <th />
              </tr>
            </thead>
            <tbody>{activeSchedule}</tbody>
          </Table>
        </Container>
        <Container>
          <div
            style={{
              width: "100%",
              border: "1px solid #d9d9d9",
              borderRadius: 4
            }}
          >
            <Calendar
              dateCellRender={this.dateCellRender}
              monthCellRender={this.monthCellRender}
              onPanelChange={this.onPanelChange}
            />
          </div>
        </Container>
      </>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  isLoading: state.auth.isLoading,
  loading: state.loading, 
  schedules: state.schedule.schedules
});

const mapDispatchToProps = dispatch => {
  return {
    getUserSchedule: (username) => dispatch(scheduleActions.getUserSchedule(username))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(
  Schedule
);
