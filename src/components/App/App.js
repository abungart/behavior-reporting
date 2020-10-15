import React, { Component } from "react";
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import { connect } from "react-redux";

import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import AdminPage from "../Admin/Admin";
import TeacherPage from "../Teacher/Teacher";
import SpecialsPage from "../Specials/Specials";
import StudentPage from "../Student/Student";
import LandingPage from "../LandingPage/LandingPage";
import LoginPage from "../LoginPage/LoginPage";
import StaffRegister from "../StaffRegistration/StaffRegistration";
import StudentRegister from "../StudentRegistration/StudentRegistration";
import IndividualBehavior from "../IndividualBehavior/IndividualBehavior";

import mapStoreToProps from "../../redux/mapStoreToProps";

import "./App.css";

class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: "FETCH_USER" });
  }

  render() {
    let userRoute = "/" + this.props.store.user.role;
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />
            <Route exact path="/home" component={LandingPage} />

            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
            <ProtectedRoute exact path="/admin" component={AdminPage} />
            <ProtectedRoute exact path="/teacher" component={TeacherPage} />
            <ProtectedRoute exact path="/specials" component={SpecialsPage} />
            <ProtectedRoute exact path="/student" component={StudentPage} />
            <ProtectedRoute
              exact
              path="/individualBehavior"
              component={IndividualBehavior}
            />
            <ProtectedRoute
              exact
              path="/staffRegister"
              component={StaffRegister}
            />
            <ProtectedRoute
              exact
              path="/studentRegister"
              component={StudentRegister}
            />
            {/* This works the same as the other protected route, except that if the user is logged in,
            they will be redirected to the authRedirect path provided. */}
            <ProtectedRoute
              exact
              path="/login"
              authRedirect={userRoute}
              component={LoginPage}
            />

            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default connect(mapStoreToProps)(App);
