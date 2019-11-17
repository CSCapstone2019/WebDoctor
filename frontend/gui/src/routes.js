import React from 'react';
import { Route } from 'react-router-dom';

import Home from './containers/Home';
import Appointments from './components/Appointments';
import Patient from './components/Patient';
import PatientsForm from './components/PatientForm';
import About from './containers/About';
import Login from './containers/Login';
import Signup from './containers/Signup';
import Chat from './components/chat/Chat';
import ChatApp from './containers/ChatApp';
// import Hoc from './hoc/hoc';

const BaseRouter = () => (
  <div>
    <Route exact path="/" component={Home} />
    <Route exact path="/appointments/" component={Appointments} />
    <Route exact path="/patient/" component={PatientsForm} />
    <Route exact path="/patientslist/" component={Patient} />
    <Route exact path="/about-us/" component={About} />
    <Route exact path="/login/" component={Login} />
    <Route exact path="/signup/" component={Signup} />
    <Route exact path="/chat/" component={ChatApp} />
    <Route exact path="/chat/:chatID/" component={Chat} />
  </div>
);

export default BaseRouter;
