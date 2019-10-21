import React from 'react';
import { Route } from 'react-router-dom';

import Home from './containers/Home';
import Appointments from './components/Appointments';
import Patients from './components/PatientForm';
import PatientList from './containers/PatientListView';
import About from './containers/About';

const BaseRouter = () => (
  <div>
    <Route exact path="/" component={Home} />
    <Route exact path="/appointments" component={Appointments} />
    <Route exact path="/patient" component={Patients} />
    <Route exact path="/patientslist" component={PatientList} />
    <Route exact path="/about-us" component={About} />
  </div>
);

export default BaseRouter;
