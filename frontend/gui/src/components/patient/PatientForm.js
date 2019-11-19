import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addPatient } from '../../store/actions/patients';
import {
  Jumbotron,
  Container,
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';

class PatientsForm extends Component {
  state = {
    firstName: '',
    lastName: '',
    street: '',
    city: '',
    zip: '',
    email: '',
    phone: '',
    dob: '',
    sex: ''
  };

  static propTypes = {
    addPatient: PropTypes.func.isRequired
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    const {
      first_name,
      last_name,
      street,
      city,
      zipcode,
      email,
      phone,
      dob,
      sex
    } = this.state;
    const patient = {
      first_name,
      last_name,
      street,
      city,
      zipcode,
      email,
      phone,
      dob,
      sex
    };
    this.props.addPatient(patient);
    this.setState({
      first_name: '',
      last_name: '',
      street: '',
      city: '',
      zipcode: '',
      email: '',
      phone: '',
      dob: '',
      sex: ''
    });
  };

  render() {
    const {
      first_name,
      last_name,
      street,
      city,
      zipcode,
      email,
      phone,
      dob,
      sex
    } = this.state;
    return (
      <>
        <Jumbotron>
          <h1 className="display-3">Patient Form</h1>
          <p className="lead">
            Let us know who you are by filling out this simple form!
          </p>
          <hr className="my-2" />
          <p>Hours are: 9am-4pm M-F</p>
          <p className="lead">
            <Button color="primary">
              <a
                href="/about-us/"
                style={{ textDecoration: 'none', color: 'white' }}
              >
                Learn More
              </a>
            </Button>
          </p>
        </Jumbotron>
        <Container>
          <div className="card card-body mt-4 mb-4">
            <h2 className="text-center">
              <u>Add Patient</u>
            </h2>
            <Form onSubmit={this.onSubmit}>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label>First Name</Label>
                    <Input
                      type="text"
                      name="first_name"
                      placeholder="Enter your first name"
                      onChange={this.onChange}
                      value={first_name}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label>Last Name</Label>
                    <Input
                      type="text"
                      name="last_name"
                      placeholder="Enter your last name"
                      onChange={this.onChange}
                      value={last_name}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={4}>
                  <FormGroup>
                    <Label>Email</Label>
                    <Input
                      type="email"
                      name="email"
                      placeholder="admin@example.com"
                      onChange={this.onChange}
                      value={email}
                    />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label>Phone</Label>
                    <Input
                      type="number"
                      name="phone"
                      placeholder="7704267272"
                      onChange={this.onChange}
                      value={phone}
                    />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label>Sex</Label>
                    <Input
                      type="select"
                      name="sex"
                      onChange={this.onChange}
                      value={sex}
                    >
                      <option>F</option>
                      <option>M</option>
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={4}>
                  <FormGroup>
                    <Label>City</Label>
                    <Input
                      type="text"
                      name="city"
                      placeholder="Marietta"
                      onChange={this.onChange}
                      value={city}
                    />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label>Street</Label>
                    <Input
                      type="text"
                      name="street"
                      placeholder="123 Main St"
                      onChange={this.onChange}
                      value={street}
                    />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label>Zip</Label>
                    <Input
                      type="number"
                      name="zipcode"
                      placeholder="30152"
                      onChange={this.onChange}
                      value={zipcode}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <Label>Date of birth</Label>
                <Input
                  type="date"
                  name="dob"
                  placeholder="date placeholder"
                  onChange={this.onChange}
                  value={dob}
                />
              </FormGroup>
              <FormGroup>
                <Button color="primary">Submit</Button>
              </FormGroup>
            </Form>
          </div>
        </Container>
      </>
    );
  }
}

export default connect(null, { addPatient })(PatientsForm);
