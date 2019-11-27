import React from 'react';
import Appointment from './Appointment';
import AppointmentForm from './AppointmentForm';
import ScheduleComponent from './ScheduleComponent';
import Footer from '../layout/Footer';

export default function AppointmentDashboard() {
  return (
    <>
      <AppointmentForm />
      <Appointment />
      <ScheduleComponent />
      <Footer />
    </>
  );
}
