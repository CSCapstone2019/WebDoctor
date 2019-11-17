import React from 'react';
import PatientsForm from './PatientForm';
import Patients from './Patient';
import Footer from '../layout/Footer';

export default function DocDashboard() {
  return (
    <>
      <PatientsForm />
      <Patients />
      <Footer />
    </>
  );
}
