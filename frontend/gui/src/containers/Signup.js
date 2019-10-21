import React, { Component } from 'react';
import { Form, Input, Icon, Button, Layout } from 'antd';
import { NavLink } from 'react-router-dom';
import Footer from '../components/Footer';
import * as actions from '../store/actions/auth';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';

const { Content } = Layout;

class RegistrationForm extends Component {
  state = {
    confirmDirty: false
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.onAuth(
          values.username,
          values.email,
          values.password,
          values.confirm
        );
      }
      this.props.history.push('/');
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Must match the above password!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <>
        <Layout className="layout">
          <Content
            style={{ padding: '0 50px', marginTop: '30px', width: '30%' }}
          >
            <Form onSubmit={this.handleSubmit}>
              <Form.Item>
                {getFieldDecorator('username', {
                  rules: [
                    { required: true, message: 'Please input your username!' }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                    }
                    placeholder="Username"
                  />
                )}
              </Form.Item>

              <Form.Item>
                {getFieldDecorator('email', {
                  rules: [
                    {
                      type: 'email',
                      message: 'The input is not valid E-mail!'
                    },
                    {
                      required: true,
                      message: 'Please input your E-mail!'
                    }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />
                    }
                    placeholder="Email"
                  />
                )}
              </Form.Item>

              <Form.Item hasFeedback>
                {getFieldDecorator('password', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your password!'
                    },
                    {
                      validator: this.validateToNextPassword
                    }
                  ]
                })(
                  <Input.Password
                    prefix={
                      <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                    }
                    type="password"
                    placeholder="Password"
                  />
                )}
              </Form.Item>

              <Form.Item hasFeedback>
                {getFieldDecorator('confirm', {
                  rules: [
                    {
                      required: true,
                      message: 'Please confirm your password!'
                    },
                    {
                      validator: this.compareToFirstPassword
                    }
                  ]
                })(
                  <Input.Password
                    onBlur={this.handleConfirmBlur}
                    prefix={
                      <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                    }
                    type="password"
                    placeholder="Confirm password"
                  />
                )}
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ marginRight: '10px' }}
                >
                  Signup
                </Button>
                Or
                <NavLink style={{ marginRight: '10px' }} to="/login/">
                  {' '}
                  login
                </NavLink>
              </Form.Item>
            </Form>
          </Content>
        </Layout>
        <Footer />
      </>
    );
  }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(
  RegistrationForm
);

const mapStateToProps = state => {
  return {
    loading: state.loading,
    error: state.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (username, email, password1, password2) => {
      dispatch(actions.authSignup(username, email, password1, password2));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedRegistrationForm);
