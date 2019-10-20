import React from 'react';
import { Route } from 'react-router-dom';

// import App from './App';
import Home from './containers/Home';
import Appointments from './components/Appointments';
import Patients from './components/PatientForm';
import PatientList from './containers/PatientListView';
import About from './containers/About';

const BaseRouter = () => (
  <div>
    <Route exact path="/" component={Home} />
    <Route path="/appointments" component={Appointments} />
    <Route path="/patient" component={Patients} />
    <Route path="/patientslist" component={PatientList} />
    <Route exact path="/about-us" component={About} />
  </div>
);

export default BaseRouter;
