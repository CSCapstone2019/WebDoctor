import React, { Component } from 'react';
import AppNavbar from '../components/AppNavbar';
import {
  Card,
  Button,
  CardTitle,
  CardText,
  CardDeck,
  CardSubtitle,
  CardBody,
  CardImg,
  Row,
  Col,
  Container
} from 'reactstrap';

class PatientList extends Component {
  state = {
    patients: []
  };

  async componentDidMount() {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/patient/');
      const patients = await res.json();
      this.setState({
        patients
      });
      // console.log(patients);
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <>
        <AppNavbar />
        {this.state.patients.map(item => (
          <Container key={item.patient_id}>
            <CardDeck>
              <Card>
                {/* <CardImg top width="100%" src="/assets/256x186.svg" alt="Card image cap" /> */}
                <CardBody>
                  <CardTitle>{`${item.first_name} ${item.last_name}`}</CardTitle>
                  <CardSubtitle>
                    <strong>Email:</strong> {item.email}
                  </CardSubtitle>
                  <br />
                  <CardSubtitle>
                    <strong>Email:</strong> {item.email}
                  </CardSubtitle>
                  <CardText>text</CardText>
                  <Button>Button</Button>
                </CardBody>
              </Card>
            </CardDeck>
          </Container>
        ))}
      </>
    );
  }
}

export default PatientList;
