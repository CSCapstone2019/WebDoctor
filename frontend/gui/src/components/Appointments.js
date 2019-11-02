import React, { Component } from 'react';
import Footer from './Footer';
import {
  Jumbotron,
  Col,
  Container,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from 'reactstrap';

class Appointments extends Component {
  render() {
    return (
      <>
        <Jumbotron>
          <h1 className="display-3">Appointments</h1>
          <p className="lead">
            Schedule an appointment with us using this simple form!
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
          <Form>
            <FormGroup row>
              <Label for="exampleFirstName" sm={2}>
                First Name
              </Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="firstName"
                  id="exampleFirstName"
                  placeholder=""
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleLastName" sm={2}>
                Last Name
              </Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="lastName"
                  id="exampleLastName"
                  placeholder=""
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleStreet" sm={2}>
                Street
              </Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="street"
                  id="exampleStreet"
                  placeholder=""
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleEmail" sm={2}>
                Email
              </Label>
              <Col sm={10}>
                <Input
                  type="email"
                  name="email"
                  id="exampleEmail"
                  placeholder=""
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleCity" sm={2}>
                City
              </Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="city"
                  id="exampleCity"
                  placeholder=""
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleZipcode" sm={2}>
                Zipcode
              </Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="zipcode"
                  id="exampleZipcode"
                  pattern="[0-9]*"
                  placeholder=""
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="examplePhone" sm={2}>
                Phone Number
              </Label>
              <Col sm={10}>
                <Input
                  type="tel"
                  name="phone"
                  id="examplePhone"
                  pattern="[\+]\d{2}[\(]\d{2}[\)]\d{4}[\-]\d{4}"
                  placeholder=""
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleDob" sm={2}>
                Date of birth
              </Label>
              <Col sm={10}>
                <Input type="date" name="dob" id="exampleDob" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleSex" sm={2}>
                Sex
              </Label>
              <Col sm={10}>
                <Input type="select" name="sex" id="exampleSex">
                  <option>Male</option>
                  <option>Female</option>
                </Input>
              </Col>
            </FormGroup>
            <FormGroup check row>
              <Col sm={{ size: 10, offset: 2 }}>
                <Button>Submit</Button>
              </Col>
            </FormGroup>
          </Form>
        </Container>
        <br />
        <Footer />
      </>
    );
  }
}

export default Appointments;
