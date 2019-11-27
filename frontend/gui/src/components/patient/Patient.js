import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPatients, deletePatient } from '../../store/actions/patients';
import { Button, Container, Table } from 'reactstrap';

class Patients extends Component {
  static propTypes = {
    patients: PropTypes.array.isRequired,
    getPatients: PropTypes.func.isRequired,
    deletePatient: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getPatients();
  }

  render() {
    return (
      <>
        <Container>
          <h2 className="text-center">
            <u>Patients</u>
          </h2>
          <Table dark hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Sex</th>
                <th>City</th>
                <th>New Patient Date</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {this.props.patients.map(p => (
                <tr key={p.patient_id}>
                  <td>{p.patient_id}</td>
                  <td>
                    {p.first_name} {p.last_name}
                  </td>
                  <td>{p.email}</td>
                  <td>{p.phone}</td>
                  <td>{p.sex}</td>
                  <td>{p.city}</td>
                  <td>{p.new_patient_date.slice(0, 10)}</td>
                  <td>
                    <Button
                      onClick={this.props.deletePatient.bind(
                        this,
                        p.patient_id
                      )}
                      color="danger"
                      size="sm"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </>
    );
  }
}

// Gets patients from the state from patients reducer
const mapStateToProps = state => ({
  patients: state.patients.patients
});

export default connect(mapStateToProps, { getPatients, deletePatient })(
  Patients
);
