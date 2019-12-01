import React, { Component } from "react";
import { Select, Form, Button, Input, Upload, Icon, message } from "antd";

import { Jumbotron, Container, Col, Row, FormGroup, Label } from "reactstrap";


class ReportPageBanner extends Component {

  render() {

    return (
      <>
        <Jumbotron>
          <h1 className="display-3">Reports</h1>
          <p className="lead">See your visit reports below!</p>
          <hr className="my-2" />
        </Jumbotron>
          </>
        );
    }
}

export default (ReportPageBanner);
