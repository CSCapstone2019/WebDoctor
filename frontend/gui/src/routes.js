import React from 'react';
import { Route } from 'react-router-dom';

import Home from './containers/Home';
import AppointmentDashboard from './components/appointment/AppointmentDashboard';

import ScheduleDashboard from './components/appointment/ScheduleDashboard';

import PatientDashboard from './components/patient/PatientDashboard';
import DocDashboard from './components/patient/DocDashboard';
import About from './containers/About';
import Report from './containers/Reports';
import Login from './components/accounts/Login';
import Register from './components/accounts/Register';
import Chat from './components/chat/Chat';
import ChatApp from './containers/ChatApp';
import Hoc from './hoc/hoc';

import PrivateRoute from './components/common/PrivateRoute';

const BaseRouter = () => (
  <Hoc>
    <Route exact path="/" component={Home} />
    <Route exact path="/patient/" component={DocDashboard} />
    <Route exact path="/appointments/" component={ScheduleDashboard} />
    <Route exact path="/appointments/:appointmentID/" component={ScheduleDashboard} />
    {/* <Route exact path="/patientslist/" component={Patient} /> */}
    <Route exact path="/dashboard/" component={PatientDashboard} />
    <Route exact path="/about-us/" component={About} />
    <Route exact path="/login/" component={Login} />
    <Route exact path="/register/" component={Register} />
    <Route exact path="/chat/" component={ChatApp} />
    <Route exact path="/chat/:chatID/" component={Chat} />
    <Route exact path="/reports/" component={Report} />
  </Hoc>
);

export default BaseRouter;
