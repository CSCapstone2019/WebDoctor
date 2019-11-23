import React from 'react';
import Appointment from './Appointment';
import AppointmentForm from './AppointmentForm';
import Footer from '../layout/Footer';

export default function AppointmentDashboard() {
  return (
    <>
      <AppointmentForm />
      <Appointment />
      <Footer />
    </>
  );
}
