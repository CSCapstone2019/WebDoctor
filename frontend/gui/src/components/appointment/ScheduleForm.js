import React, { Component } from 'react';
import { Select, Form, DatePicker, TimePicker, Button, Input  } from 'antd';
import moment from 'moment';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import * as scheduleActions from '../../store/actions/schedule';
import * as patientActions from '../../store/actions/patients';
import { getAllPatients, getStaff, getPatients, deletePatient } from '../../store/actions/patients';
import { addAppointment } from '../../store/actions/appointments';
import {
  Jumbotron,
  Container,
  Col,
  Row,
  FormGroup,
  Label,
} from 'reactstrap';

const { Option } = Select;
const { TextArea } = Input;
const FormItem = Form.Item;
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class ScheduleForm extends Component {
  state = {
    usernames: [],
    appointment_date: '',
    appointment_time: '',
    message: '',
    open: false,
    error: null, 
  };

  static propTypes = {
    auth: PropTypes.object.isRequired,
    getStaff: PropTypes.func.isRequired,
    staff: PropTypes.array.isRequired,
    getAllPatients: PropTypes.func.isRequired,
    all_patients: PropTypes.array.isRequired,
  };

  componentDidMount() {
    this.props.form.validateFields();
    this.props.getPatients();
    this.props.getStaff();
    this.props.getAllPatients();

  }

  // onChange = e =>
  //   this.setState({
  //     [e.target.name]: e.target.value
  //   });
 
  
  // Value 
  handleChange = value => {
    console.log("VALUE USER   ", value);
    this.setState({
      usernames: value
    });
  };
  // Value 
  handleChangeTime = value => {
    console.log("VALUE TIME   ", value);
    this.setState({
      appointment_time: value
    });
  };
  // Value 
  handleChangeDate = value => {
    console.log("VALUE DATE  ", value);
    this.setState({
      appointment_date: value
    });
  };
  // Value 
  handleChangeMessage = value => {
    console.log("VALUE MESSAGE  ", value);
    this.setState({
      message: value
    });
  };
  handleSubmit = e => {
    const component = this;
    const { user } = this.props.auth;
    // const { usernames, appointment_date, appointment_time, message } = component.state;
    const { usernames } = component.state;
    const combined = [usernames, component.props.auth.user.username];
    console.log("COMBINED", combined);
    e.preventDefault();


    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) {
        console.log('Received values of form: ', fieldsValue);
        // Should format date value before submit.
        // const values = {
        //   ...fieldsValue,
        //   'datepicker': fieldsValue['date-picker'].format('YYYY-MM-DD'),
        //   'timepicker': fieldsValue['time-picker'].format('HH:mm:ss'),
        // };
        const values = {
          ...fieldsValue,
          'timepicker': fieldsValue['time-picker'].format('HH:mm:ss'),
          'datepicker': fieldsValue['date-picker'].format('YYYY-MM-DD'),
        };
        component.state.appointment_date = values.datepicker;
        component.state.appointment_time = values.timepicker;
        component.state.message = values.reason;

      
        // console.log('Received values of form FORMATTED: ', values);
        const { appointment_date, appointment_time, message } = component.state;
        console.log('Received values of form FORMATTED: ', appointment_date, appointment_time, message );


        axios.defaults.headers = {
          "Content-Type": "application/json",
          Authorization: `Token ${this.props.auth.token}`
        };
        axios
          .post('http://127.0.0.1:8000/chat/schedule/create/', {
            appointment_date: appointment_date, 
            appointment_time: appointment_time, 
            message: message,
            participants: combined
          })
          .then(res => {
            console.log("DATA ONS SCHEDULE SUBMIT: ", res.data);
            // this.props.history.push(`/appointments/`);
            this.props.getUserSchedule(component.props.auth.user.username);
          })
          .catch(err => {
            console.error(err);
            this.setState({
              error: err
            });
          });
      }
    
        

        
        // const combined = [usernames, component.props.auth.user.username];
        // console.log("COMBINED", combined);
        // axios.defaults.headers = {
        //   "Content-Type": "application/json",
        //   Authorization: `Token ${this.props.auth.token}`
        // };
        // axios
        //   .post('http://127.0.0.1:8000/chat/schedule/create/', {
        //     appointment_date: appointment_date,
        //     appointment_time: appointment_time,
        //     message: message,
        //     participants: combined
        //   })
        //   .then(res => {
        //     console.log("DATA ONS SCHEDULE SUBMIT: ", res.data);
        //     // this.props.history.push(`/appointment/`);
        //     this.props.getUserSchedule(component.props.auth.user.username);
        //   })
        //   .catch(err => {
        //     console.error(err);
        //     this.setState({
        //       error: err
        //     });
        //   });
    });
  };
      
    
  
  
  // TIME SELECT
  onTimeChange(time) {
    console.log(time);
    this.setState({
      appointment_time: time,
      open: false,
    });
  }

  handleOpenChange = open => {
    this.setState({ open });
  };




  render() {

    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const config = {
      rules: [{ type: 'object', required: true, message: 'Please select time!' }],
    };

    //-----------------
    const { isAuthenticated, isStaff, user } = this.props.auth;
    const { usernames, appointment_date, appointment_time, message } = this.state;
    let patientOptions = this.props.staff.map(p => {
      return (
        <Option key={p.id} value={p.username}>
          {p.username}
        </Option>
      );
    });

    let doctorOptions = this.props.all_patients.map(p => {
      return (


        <Option key={p.id} value={p.username}>
          {p.username}
        </Option>
      );
    });

    return (
      <>
        <Jumbotron>
          <h1 className="display-3">Appointments</h1>
          <p className="lead">
            Schedule an appointment with us using this simple form!
          </p>
          <hr className="my-2" />
          <p>Hours are: 9am-4pm M-F</p>
        </Jumbotron>

          <div className="card card-body mt-4 mb-4">
            <h2 className="text-center">
              <strong>Schedule an Appointment</strong>
            </h2>
            <br />
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>

              <FormItem label="Select a user">

                {isStaff ? <Select
                  showSearch
                  style={{ width: '50%' }}
                  placeholder="Select a patient"
                  optionFilterProp="children"
                  onChange={this.handleChange}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {doctorOptions}
                </Select> : <Select
                  showSearch
                  style={{ width: '50%' }}
                  placeholder="Select a doctor"
                  optionFilterProp="children"
                  onChange={this.handleChange}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                    {patientOptions}
                  </Select>}
              </FormItem>
              <Form.Item label="DatePicker">
                {getFieldDecorator('date-picker', config)(<DatePicker />)}
              </Form.Item>
              <Form.Item label="TimePicker">
                {getFieldDecorator('time-picker', config)(<TimePicker />)}
              </Form.Item>

              <Form.Item label="Reason:">
                {getFieldDecorator('reason', {
                  rules: [
                    {
                      required: true,
                      message: 'Please state a reason for you visit!',
                    },
                  ],
                })(<TextArea rows={4} style={{ width: '50%' }} />)}
              </Form.Item>


              <Form.Item
                wrapperCol={{
                  xs: { span: 24, offset: 0 },
                  sm: { span: 16, offset: 8 },
                }}
              >
                <Button type="primary" htmlType="submit">
                  Submit
              </Button>
              </Form.Item>
            </Form>
        </div>

      </>
    );
  }
}

const WrappedTimeRelatedForm = Form.create({ name: 'time_related_controls' })(ScheduleForm);

const mapStateToProps = state => ({
  patients: state.patients.patients,
  staff: state.patients.staff,
  all_patients: state.patients.all_patients,
  auth: state.auth
});

const mapDispatchToProps = dispatch => {
  return {
    getUserSchedule: (username) => dispatch(scheduleActions.getUserSchedule(username)),
    getPatients: () => dispatch(patientActions.getPatients()),
    getAllPatients: () => dispatch(patientActions.getAllPatients()),
    getStaff: () => dispatch(patientActions.getStaff()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  WrappedTimeRelatedForm
);
