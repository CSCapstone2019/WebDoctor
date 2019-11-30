import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as scheduleActions from '../../store/actions/schedule';
import { Button, Container, Table } from 'reactstrap';
import Contact from '../chat/ChatContact';

class Schedule extends Component {

  state = {
    all_schedules: [],
    activeSchedule: null,
  }
  static propTypes = {
    auth: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    getUserSchedule: PropTypes.func.isRequired,
  };

  
  waitForAuthDetails() {
    const component = this;
  
    setTimeout(function () {
      if (!(component.props.isLoading)) {
        component.props.getUserSchedule("doc"); //component.props.auth.user.username
        return;
      } else {
        console.log("waiting for authentication details...");
        this.waitForAuthDetails();
      }
    }, 100);
  }


  componentDidMount() {
    this.waitForAuthDetails();
    console.log("SCHEDULE MOUNTED");
  }

  render() {
    let activeSchedule = this.props.schedules.map(c => {
      return (
        <Table dark hover responsive>
          <thead>
            <tr>
              <th>Participants</th>
              <th>Appointment Date</th>
              <th>Appointment Time</th>
              <th>Reason</th>
              <th />
            </tr>
          </thead>
          <tbody>
              <tr key={c.schedule_id}>
              {/* <td>{c.participants.map(a => (
                a.id))}</td> */}
                <td>{c.participants.toString()}</td>
                <td>{c.appointment_date}</td>
                <td>{c.appointment_time}</td>
                <td>{c.message}</td>
              </tr>
          </tbody>
          </Table>
      );
    });

    console.log("SCHEDULE ", this.props.schedules);

    return (
      
      <>
      <Container>
          <div>
            <ul>{activeSchedule}</ul>
          </div>
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
  auth: state.auth.isLoading,
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
