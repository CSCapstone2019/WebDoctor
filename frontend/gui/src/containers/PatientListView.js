import React, { Component } from 'react';
import axios from 'axios';
// import Patients from '../components/Patients';
import PatientLists from '../components/PatientList';

class PatientList extends Component {
  state = {
    patients: []
  };

  componentDidMount() {
    axios.get('http://127.0.0.1:8000/api/patient/').then(res => {
      this.setState({
        patients: res.data
      });
      // console.log(res.data);
    });
  }

  render() {
    return <PatientLists data={this.state.patients} />;
  }
}

export default PatientList;
