import React from 'react';
import AppNavbar from './AppNavbar';
import {
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col,
  Container
} from 'reactstrap';

const PatientLists = props => {
  return (
    <>
      <AppNavbar />
      <Container>
        <Row>
          <Col sm="6">
            <Card body>
              <CardTitle>{`${res.first_name} ${res.last_name}`}</CardTitle>
              <CardText>{res.email}</CardText>
              <Button>Go somewhere</Button>
            </Card>
          </Col>
          <Col sm="6">
            <Card body>
              <CardTitle>{`${res.first_name} ${res.last_name}`}</CardTitle>
              <CardText>{res.email}</CardText>
              <Button>Go somewhere</Button>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PatientLists;
