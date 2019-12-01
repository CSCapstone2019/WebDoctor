import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as scheduleActions from '../../store/actions/schedule';
import { Button, Container, Table } from 'reactstrap';
import Contact from '../chat/ChatContact';

class Schedule extends React.Component {

  // state = {
  //   all_schedules: [],
  //   activeSchedule: null,
  // }
  static propTypes = {
    auth: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    getUserSchedule: PropTypes.func.isRequired,
  };

  
  waitForDetail() {
    const component = this;
    console.log("-------------IS LOADING SHCEUDLE: ", component.props.isLoading)
    setTimeout(function () {
      if (!(component.props.isLoading)) {
        console.log("-------------USER: ", component.props.auth.user.username)
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

  render() {
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
            <tbody>
              {activeSchedule}
            </tbody>
          </Table>
      </Container>
      </>
      // <>
      //   <Container>
      //     <h2 className="text-center">
      //       <strong>Appointments</strong>
      //     </h2>
      //     <br />
      //     <Table dark hover responsive>
      //       <thead>
      //         <tr>
      //           <th>#</th>
      //           <th>Patient</th>
      //           <th>Appointment Date</th>
      //           <th>Appointment Time</th>
      //           <th>Message</th>
      //           <th />
      //         </tr>
      //       </thead>
      //       <tbody>
      //         {this.props.appointments.map(a => (
      //           <tr key={a.appointment_id}>
      //             <td>{a.appointment_id}</td>
      //             <td>{a.patient}</td>
      //             <td>{a.appointment_date}</td>
      //             <td>{a.appointment_time}</td>
      //             <td>{a.message}</td>
      //             <td>
      //               <Button
      //                 onClick={this.props.deleteAppointment.bind(
      //                   this,
      //                   a.appointment_id
      //                 )}
      //                 color="danger"
      //                 size="sm"
      //               >
      //                 Delete
      //               </Button>
      //             </td>
      //           </tr>
      //         ))}
      //       </tbody>
      //     </Table>
      //   </Container>
      // </>
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
