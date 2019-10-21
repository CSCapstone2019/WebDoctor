import React, { Component } from 'react';
import {
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col,
  Container
} from 'reactstrap';

class Patient extends Component {
  render() {
    return (
      <>
        {this.props.data.map(item => (
          <Container key={item.patient_id}>
            <Row>
              <Col sm="6">
                <Card body>
                  <CardTitle>{`${item.first_name} ${item.last_name}`}</CardTitle>
                  <CardText>{item.email}</CardText>
                  <Button>Go somewhere</Button>
                </Card>
              </Col>
            </Row>
          </Container>
        ))}
      </>
    );
  }
}

export default Patient;
