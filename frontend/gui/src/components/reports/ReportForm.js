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
    fileUpload: null,
    fileList: [],
    fileName: '',
    uploading: false,
    usernames: [],
    title: '',
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
  handleChangeUser = value => {
    console.log("VALUE USER   ", value);
    this.setState({
      usernames: value
    });
  };
  // Value 
  handleChangeTitle = value => {
    console.log("VALUE MESSAGE  ", value);
    this.setState({
      title: value
    });
  };


  // Not Used -do not delete
  handleSubmit = e => {
    const getCsrfToken = () => {
      const csrf = document.cookie.match('(^|;)\\s*csrftoken\\s*=\\s*([^;]+)');
      return csrf ? csrf.pop() : '';
    };
    const csrf_cookie = getCsrfToken();
    console.log("CSRF COOKIE:", csrf_cookie)
    const component = this;
    let formData = new FormData();
    formData.append('file', this.file);
    console.log('>> formData >> ', formData);
    const { user } = this.props.auth;
    // const { usernames, appointment_date, appointment_time, message } = component.state;
    const { usernames } = component.state;
    const combined = [usernames, component.props.auth.user.username];
    console.log("COMBINED", combined);
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) {
        this.handleUpload();
        console.log('Received values of form: ', fieldsValue);
        const values = {
          ...fieldsValue,
        };
        component.state.title = values.title;
        // console.log('Received values of form FORMATTED: ', values);
        const { fileName, title } = component.state;
        console.log('Received values of form FORMATTED: ', fileName, title);
        axios.defaults.headers = {
          "Content-Type": 'multipart/form-data',
          Authorization: `Token ${this.props.auth.token}`
        };

        axios
          .post("http://127.0.0.1:8000/chat/upload/", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Token ${this.props.auth.token}`,
              "X-CSRFToken": `${csrf_cookie}`,
            }
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


    // this.props.form.validateFields((err, fieldsValue) => {
    //   if (!err) {
    //     this.handleUpload();
    //     console.log('Received values of form: ', fieldsValue);
    //     const values = {
    //       ...fieldsValue,
    //     };
    //     component.state.title = values.title;
    //     // console.log('Received values of form FORMATTED: ', values);
    //     const { fileName, title } = component.state;
    //     console.log('Received values of form FORMATTED: ', fileName, title);
    //     axios.defaults.headers = {
    //       "Content-Type": "application/json",
    //       // "Content-Type": 'multipart/form-data',
    //       Authorization: `Token ${this.props.auth.token}`
    //     };
    //     axios
    //       .post('http://127.0.0.1:8000/chat/report/create/', {
    //         title: title,
    //         pdf: fileName,
    //         participants: combined
    //       })
    //       .then(res => {
    //         console.log("DATA ONS SCHEDULE SUBMIT: ", res.data);
    //         // this.props.history.push(`/appointments/`);
    //         this.props.getUserSchedule(component.props.auth.user.username);
    //       })
    //       .catch(err => {
    //         console.error(err);
    //         this.setState({
    //           error: err
    //         });
    //       });
    //   }




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




  // UPLOAD 

  handleUpload = () => {
    const getCsrfToken = () => {
      const csrf = document.cookie.match('(^|;)\\s*csrftoken\\s*=\\s*([^;]+)');
      return csrf ? csrf.pop() : '';
    };

    const csrf_cookie = getCsrfToken();
    let headers = new Headers();
    headers.append("X-CSRFToken", `${csrf_cookie}`);

    const { fileList } = this.state;
    const formData = new FormData();
    fileList.forEach(file => {
      formData.append("files[]", file);
    });

    this.setState({
      uploading: true,
    });

    request({
      url: 'http://localhost:8000/media/reports/pds/reports/pdfs/',
      method: 'post',
      processData: false,
      data: formData,
      headers: headers,
      success: () => {
        this.setState({
          fileList: [],
          uploading: false,
        });
        message.success('upload successfully.');
      },
      error: () => {
        this.setState({
          uploading: false,
        });
        message.error('upload failed.');
      },
    });
  };


  onUploadChange = file => {
    console.log(" FILE  ", file);
    this.setState({
      file: file
    });
  };




  render() {
    const { uploading, fileList, fileName } = this.state;
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
        console.log(" FILE  ", file);
        this.setState(state => ({
          fileList: [...state.fileList, file],
          file: file,
          fileName: file.name,        
        }));
        console.log(" THE FILEEEEEEEE  ", file);
        console.log(" THE FILEEEEEEEE NAMEEEE  ", file.name);

        return false;
      },

      fileList,
    };

    //   beforeUpload: file => {
    //     this.setState(state => ({
    //       fileList: [...state.fileList, file],
    //     }));
    //     console.log("BEFORE UPLOAD FILELIST------------:", fileList)
    //     console.log("BEFORE UPLOAD FILE------------:", file)
    //     return false;
    //   },
    //   fileList,
    // };


    //   beforeUpload: file => {
    //     this.setState(state => ({
    //       file: this.state.file,
    //     }));
    //     console.log("BEFORE UPLOAD FILELIST------------:", fileList)
    //     console.log("BEFORE UPLOAD FILE------------:", file)
    //     return false;
    //   },
    //   fileList,
    // };


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
            See all your uploaded reports below.
          </p>
          <hr className="my-2" />
        </Jumbotron>

        <div className="card card-body mt-4 mb-4">
          <h2 className="text-center">
            <strong>Upload a Report</strong>
          </h2>
          <br />





          <Form {...formItemLayout} onSubmit={this.handleUpload}>
            <FormItem label="Select a user">
              {isStaff ? <Select
                showSearch
                style={{ width: '50%' }}
                placeholder="Select a patient"
                optionFilterProp="children"
                onChange={this.handleChangeUser}
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
                onChange={this.handleChangeUser}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                  {patientOptions}
                </Select>}
            </FormItem>
            <Form.Item label="Title:">
              {getFieldDecorator('title', {
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
                // onClick={this.handleUpload}
                disabled={fileList.length === 0}
                // loading={uploading}
                >
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
