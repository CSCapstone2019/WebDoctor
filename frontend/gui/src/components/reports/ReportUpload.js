import React, { Component } from "react";
import request from "request";
import { Select, Form, Button, Input, Upload, Icon, message } from "antd";
import { connect } from "react-redux";
import axios from "axios";
import PropTypes from "prop-types";
import * as reportActions from "../../store/actions/report";
import * as patientActions from "../../store/actions/patients";
import {
  getAllPatients,
  getStaff,
  getPatients,
  deletePatient
} from "../../store/actions/patients";
import { Jumbotron, Container, Col, Row, FormGroup, Label } from "reactstrap";

const { Option } = Select;
const { TextArea } = Input;
const FormItem = Form.Item;
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class ReportForm extends Component {
  state = {
    file: null,
    /////////////////////////////////
    fileList: [],
    fileName: "",
    uploading: false,
    usernames: [],
    title: "",
    open: false,
    error: null
  };

  static propTypes = {
    auth: PropTypes.object.isRequired,
    getStaff: PropTypes.func.isRequired,
    staff: PropTypes.array.isRequired,
    getAllPatients: PropTypes.func.isRequired,
    all_patients: PropTypes.array.isRequired
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

  // UPLOAD

  handleUpload = () => {
    const getCsrfToken = () => {
      const csrf = document.cookie.match("(^|;)\\s*csrftoken\\s*=\\s*([^;]+)");
      return csrf ? csrf.pop() : "";
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
      uploading: true
    });

    request({
      url: "http://localhost:8000/media/reports/pds/reports/pdfs/",
      method: "post",
      processData: false,
      data: formData,
      headers: headers,
      success: () => {
        this.setState({
          fileList: [],
          uploading: false
        });
        message.success("upload successfully.");
      },
      error: () => {
        this.setState({
          uploading: false
        });
        message.error("upload failed.");
      }
    });
  };

  onUploadChange = file => {
    console.log(" FILE  ", file);
    this.setState({
      file: file
    });
  };

  handleFile(e) {
    let file = e.target.files[0];
    this.setState({ file: file });
  }

  handleClick(e){
    console.log(this.state, "----------------State--------------");
    const getCsrfToken = () => {
      const csrf = document.cookie.match("(^|;)\\s*csrftoken\\s*=\\s*([^;]+)");
      return csrf ? csrf.pop() : "";
    };
    const csrf_cookie = getCsrfToken();
    let headers = new Headers();
    headers.append("X-CSRFToken", `${csrf_cookie}`);
    let file= this.state.file;
    let formData = new FormData()
    formData.append('file', file)
    // formData.append('name', 'NameHere')

    request({
      url: "http://localhost:8000/media/reports/pdfs/",
      method: "post",
      headers: headers,
      credentials: 'include',
      data: formData,
      success: () => {
        this.setState({
          fileList: [],
          uploading: false
        });
        message.success("upload successfully.");
      },
      error: () => {
        this.setState({
          uploading: false
        });
        message.error("upload failed.");
      }
    });
  }

  render() {
    const { uploading, fileList, fileName } = this.state;
    const props = {
      onRemove: file => {
        this.setState(state => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList
          };
        });
      },

      beforeUpload: file => {
        console.log(" FILE  ", file);
        this.setState(state => ({
          fileList: [...state.fileList, file],
          file: file,
          fileName: file.name
        }));
        console.log(" THE FILEEEEEEEE  ", file);
        console.log(" THE FILEEEEEEEE NAMEEEE  ", file.name);

        return false;
      },

      fileList
    };

    //--------------------------
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };

    //-----------------
    const { isAuthenticated, isStaff, user } = this.props.auth;
    const {
      usernames,
      appointment_date,
      appointment_time,
      message
    } = this.state;
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
          <p className="lead">See all your uploaded reports below.</p>
          <hr className="my-2" />
        </Jumbotron>

        <div className="card card-body mt-4 mb-4">
          <h2 className="text-center">
            <strong>Upload a Report</strong>
          </h2>
          <br />

          <Form {...formItemLayout} onSubmit={this.handleUpload}>
            <FormItem label="Select a user">
              {isStaff ? (
                <Select
                  showSearch
                  style={{ width: "50%" }}
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
                </Select>
              ) : (
                <Select
                  showSearch
                  style={{ width: "50%" }}
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
                </Select>
              )}
            </FormItem>
            <Form.Item label="Title:">
              {getFieldDecorator("title", {
                rules: [
                  {
                    required: true,
                    message: "Please enter the name of the Report!"
                  }
                ]
              })(<TextArea rows={1} style={{ width: "50%" }} />)}
            </Form.Item>

            <Form.Item
              wrapperCol={{
                xs: { span: 24, offset: 0 },
                sm: { span: 16, offset: 8 }
              }}
            >
              {/* <Button
                type="primary"
                htmlType="submit"
                // onClick={this.handleUpload}
                disabled={fileList.length === 0}
                // loading={uploading}
              >
                Upload
              </Button> */}
            </Form.Item>
          </Form>
        </div>

        <h1>UPLOAD</h1>
        <form>
          <label>Upload:</label>
          <input type="file" name="file" onChange={e => this.handleFile(e)} />
        </form>
        <button type="button" onClick={e => this.handleClick(e)}>
          Upload
        </button>
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
    getUserReport: username => dispatch(reportActions.getUserReport(username)),
    getPatients: () => dispatch(patientActions.getPatients()),
    getAllPatients: () => dispatch(patientActions.getAllPatients()),
    getStaff: () => dispatch(patientActions.getStaff())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddReportForm);
