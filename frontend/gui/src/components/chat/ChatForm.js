import React, { Component } from 'react';
import { Form, Button, Select } from 'antd';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as navActions from '../../store/actions/nav';
import * as messageActions from '../../store/actions/message';
import * as patientActions from '../../store/actions/patients';

import PropTypes from "prop-types";

const { Option } = Select;
const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class HorizontalAddChatForm extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    patients: PropTypes.array.isRequired,
    getPatients: PropTypes.func.isRequired,
    getStaff: PropTypes.func.isRequired,
    staff: PropTypes.array.isRequired,
    getAllPatients: PropTypes.func.isRequired,
    all_patients: PropTypes.array.isRequired,
  }
  state = {
    usernames: [],
    error: null,
  };

  // Value is patient_id
  handleChange = value => {
    console.log("CHAT FORM VALUE CHANGE: ", value);
    this.setState({
      usernames: value
    });
  };

  componentDidMount() {
    this.props.form.validateFields();
    this.props.getPatients();
    this.props.getStaff();
    this.props.getAllPatients();
  }

  handleSubmit = e => {
    const component = this;
    const { user } = this.props.auth;
    const { usernames } = this.state;
    console.log("SUBMIT CHAT USERNAMES: ", usernames);
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const combined = [usernames, component.props.auth.user.username];
        console.log("COMBINED", combined);
        axios.defaults.headers = {
          "Content-Type": "application/json",
          Authorization: `Token ${this.props.auth.token}`
        };
        axios
          .post('http://127.0.0.1:8000/chat/create/', {
            messages: [],
            participants: combined
          })
          .then(res => {
            console.log("DATA ON SUBMIT: ", res.data);
            this.props.history.push(`/chat/${res.data.chat_id}`);
            this.props.closeAddChatPopup();
            this.props.getUserChats(component.props.auth.user.username);
          })
          .catch(err => {
            console.error(err);
            this.setState({
              error: err
            });
          });
      }
    });
  };

  render() {
    const { isAuthenticated, isStaff, user } = this.props.auth;
    const { usernames, appointment_date, appointment_time, message } = this.state;
    let patientOptions = this.props.staff.map(p => {
      return (
        <Option value={p.username}>
          {p.username}
        </Option>
      );
    });

    let doctorOptions = this.props.all_patients.map(p => {
      return (
        <Option value={p.username}>
          {p.username}
        </Option>
      );
    });

    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched
    } = this.props.form;

    const userNameError =
      isFieldTouched('userName') && getFieldError('userName');

    return (
      <Form className="login-form" onSubmit={this.handleSubmit}>
        {/* {this.state.error ? `${this.state.error}` : null} */}
        {this.state.error ? 'The user selected is not authorized as a Contact yet. Please select another user.' : null}

        <FormItem
          // validateStatus={userNameError ? 'error' : ''}
          // help={userNameError || ''}
        >
          {/* {getFieldDecorator('userName', {
            rules: [
              {
                required: true,
                message:
                  'Please input the username of the person you want to connect with.'
              }
            ]
          })(

            // <Select
            //   mode="tags"
            //   style={{ width: '90%' }}
            //   placeholder="Input a username"
            //   onChange={this.handleChange}
            // >
            //   {[]}
            // </Select>

            <Select
              showSearch
              style={{ width: '90%' }}
              placeholder="Select a person"
              optionFilterProp="children"
              onChange={this.handleChange}
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {this.props.patients.map(p => (
                  <Option key={p.patient_id}>{p.first_name} {p.last_name}</Option>
              ))}
            </Select>

          )} */}

          {isStaff ? <Select
            showSearch
            style={{ width: '100%' }}
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
            style={{ width: '100%' }}
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
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            disabled={hasErrors(getFieldsError())}
          >
            Start a chat
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const AddChatForm = Form.create()(HorizontalAddChatForm);

const mapStateToProps = state => {
  return {
    auth: state.auth,
    patients: state.patients.patients,
    staff: state.patients.staff,
    all_patients: state.patients.all_patients,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeAddChatPopup: () => dispatch(navActions.closeAddChatPopup()),
    getUserChats: (username) =>dispatch(messageActions.getUserChats(username)),
    getPatients: () => dispatch(patientActions.getPatients()),
    getAllPatients: () => dispatch(patientActions.getAllPatients()),
    getStaff: () => dispatch(patientActions.getStaff()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddChatForm)
);
