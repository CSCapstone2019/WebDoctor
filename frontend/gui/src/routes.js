import React from 'react';
import { Route } from 'react-router-dom';

// import App from './App';
import Home from './containers/Home';
import Appointments from './components/Appointments';
import Patients from './components/Patients';
import PatientList from './containers/PatientListView';
import ChatApp from './assets/ChatApp';

const BaseRouter = () => (
  <div>
    <Route exact path="/" component={Home} />
    <Route path="/appointments" component={Appointments} />
    <Route path="/patients" component={Patients} />
    <Route path="/patientslist" component={PatientList} />
    <Route path="/chat" component={ChatApp} />
  </div>
);

export default BaseRouter;
