import React from 'react';
import { Route } from 'react-router-dom';

import Home from './containers/Home';
import AppointmentDashboard from './components/appointment/AppointmentDashboard';
import DocDashboard from './components/patient/DocDashboard';
import About from './containers/About';
import Login from './components/accounts/Login';
import Register from './components/accounts/Register';
import Chat from './components/chat/Chat';
import ChatApp from './containers/ChatApp';
import Hoc from './hoc/hoc';


import PrivateRoute from './components/common/PrivateRoute';

const BaseRouter = () => (
  <Hoc>
    <Route exact path="/" component={Home} />
    <Route exact path="/appointments/" component={AppointmentDashboard} />
    <PrivateRoute exact path="/patient/" component={DocDashboard} />
    {/* <Route exact path="/patientslist/" component={Patient} /> */}
    <Route exact path="/about-us/" component={About} />
    <Route exact path="/login/" component={Login} />
    <Route exact path="/register/" component={Register} />
    <Route exact path="/chat/" component={ChatApp} />
    <Route exact path="/chat/:chatID/" component={Chat} />
  </Hoc>
);

export default BaseRouter;
