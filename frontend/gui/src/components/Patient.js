import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPatients, deletePatient } from '../store/actions/patients';
import { Button, Container, Table } from 'reactstrap';

class Patients extends Component {
  static propTypes = {
    patients: PropTypes.array.isRequired
  };

  componentDidMount() {
    this.props.getPatients();
  }

  render() {
    return (
      <>
        <Container>
          <h2 className="text-center">Patients</h2>
          <Table dark hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Sex</th>
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
                  <td>{p.sex}</td>
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

const mapStateToProps = state => ({
  patients: state.patients.patients
});

export default connect(mapStateToProps, { getPatients, deletePatient })(
  Patients
);
