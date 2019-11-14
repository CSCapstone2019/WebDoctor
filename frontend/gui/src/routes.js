import React from "react";
import { Route } from "react-router-dom";

import Home from "./containers/Home";
import Appointments from "./components/Appointments";
import Patients from "./components/PatientForm";
import PatientList from "./containers/PatientListView";
import About from "./containers/About";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import ChatApp from "./assets/ChatApp";
import Reports from "./containers/Reports";
import Hoc from "./hoc/hoc";

const BaseRouter = () => (
  <Hoc>
    <Route exact path="/" component={Home} />
    <Route exact path="/appointments/" component={Appointments} />
    <Route exact path="/patient/" component={Patients} />
    <Route exact path="/patientslist/" component={PatientList} />
    <Route exact path="/about-us/" component={About} />
    <Route exact path="/login/" component={Login} />
    <Route exact path="/signup/" component={Signup} />
    <Route exact path="/:chatID/" component={ChatApp} />
    <Route exact path="/reports/" component={Reports} />
  </Hoc>
);

export default BaseRouter;
