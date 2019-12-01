import React, { Component } from 'react';
import { Select, Form, Button, Input, Upload, Icon, message  } from 'antd';
import request from 'request';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import * as reportActions from '../../store/actions/report';
import * as patientActions from '../../store/actions/patients';
import { getAllPatients, getStaff, getPatients, deletePatient } from '../../store/actions/patients';
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

class ReportForm extends Component {
  state = {
    fileList: [],
    fileName: '',
    uploading: false,
    usernames: [],
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
    this.props.getStaff();
    this.props.getAllPatients();

  }


  // Value 
  handleChange = value => {
    console.log("VALUE USER   ", value);
    this.setState({
      usernames: value
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
        console.log('Received values of form FORMATTED: ', appointment_date, appointment_time, message);


        axios.defaults.headers = {
          "Content-Type": "application/json",
          Authorization: `Token ${this.props.auth.token}`
        };
        axios
          .post('http://127.0.0.1:8000/chat/report/create/', {
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






  handleOpenChange = open => {
    this.setState({ open });
  };

  normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  handleChange = info => {
    let fileList = [...info.fileList];

    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    fileList = fileList.slice(-2);

    // 2. Read from response and show file link
    fileList = fileList.map(file => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });

    this.setState({ fileList });
  };






  handleUpload = () => {
    const { fileList } = this.state;
    const formData = new FormData();
    fileList.forEach(file => {
      formData.append('files[]', file);
    });

    console.log("UPLOAD DATA ON UPLOAD:------------", formData )
    this.setState({
      uploading: true,
    });

    // // You can use any AJAX library you like
    // request({
    //   url: 'http://localhost:8000/media/reports/pds/reports/pdfs/',
    //   method: 'post',
    //   processData: false,
    //   data: formData,
    //   success: () => {
    //     this.setState({
    //       fileList: [],
    //       uploading: false,
    //     });
    //     message.success('upload successfully.');
    //   },
    //   error: () => {
    //     this.setState({
    //       uploading: false,
    //     });
    //     message.error('upload failed.');
    //   },
    // });
  };







  render() {
    const { uploading, fileList } = this.state;
    const props = {
      onRemove: file => {
        this.setState(state => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: file => {
        this.setState(state => ({
          fileList: [...state.fileList, file],
        }));
        console.log("BEFORE UPLOAD FILELIST------------:", fileList)
        return false;
      },
      fileList,
    };


    //--------------------------
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
          <h1 className="display-3">Reports</h1>
          <p className="lead">
            See your reports.
          </p>
          <hr className="my-2" />
        </Jumbotron>

        <div className="card card-body mt-4 mb-4">
          <h2 className="text-center">
            <strong>Upload a Report</strong>
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
            

            <Form.Item label="Reason:">
              {getFieldDecorator('reason', {
                rules: [
                  {
                    required: true,
                    message: 'Please enter the name of the Report!',
                  },
                ],
              })(<TextArea rows={1} style={{ width: '50%' }} />)}
            </Form.Item>



            {/* UPLOADING */}


            <Form.Item label="Upload" extra="">
              <Upload {...props}>
                  <Button>
                    <Icon type="upload" /> Click to upload
                  </Button>
                </Upload>
            </Form.Item>




            <Form.Item
              wrapperCol={{
                xs: { span: 24, offset: 0 },
                sm: { span: 16, offset: 8 },
              }}
            >
              <Button 
                type="primary" 
                htmlType="submit" 
                onClick={this.handleUpload}
                disabled={fileList.length === 0}
                loading={uploading}>
                Upload
              </Button>
            </Form.Item>
          </Form>
        </div>

      </>
    );
  }
}

const AddReportForm = Form.create()(ReportForm);

const mapStateToProps = state => ({
  staff: state.patients.staff,
  all_patients: state.patients.all_patients,
  auth: state.auth
});

const mapDispatchToProps = dispatch => {
  return {
    getUserReport: (username) => dispatch(reportActions.getUserReport(username)),
    getPatients: () => dispatch(patientActions.getPatients()),
    getAllPatients: () => dispatch(patientActions.getAllPatients()),
    getStaff: () => dispatch(patientActions.getStaff()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  AddReportForm
);
