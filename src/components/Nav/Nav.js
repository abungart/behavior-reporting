import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import LogOutButton from "../LogOutButton/LogOutButton";
import "./Nav.css";
import mapStoreToProps from "../../redux/mapStoreToProps";

const Nav = (props) => {
  let loginLinkData = {
    path: "/home",
    text: "Login",
  };

  if (props.store.user.id != null && props.store.user.role === "admin") {
    loginLinkData.path = "/admin";
    loginLinkData.text = "Home";
  } else if (
    props.store.user.id != null &&
    props.store.user.role === "teacher"
  ) {
    loginLinkData.path = "/teacher";
    loginLinkData.text = "Home";
  } else if (
    props.store.user.id != null &&
    props.store.user.role === "specials"
  ) {
    loginLinkData.path = "/specials";
    loginLinkData.text = "Home";
  } else if (
    props.store.user.id != null &&
    props.store.user.role === "student"
  ) {
    loginLinkData.path = "/student";
    loginLinkData.text = "Home";
  }

  return (
    <div className="nav">
      <h2 className="nav-title">Behavior Tracking and Reporting</h2>
      <div className="nav-right">
        <Link className="nav-link" to={loginLinkData.path}>
          {/* Show this link if they are logged in or not,
          but call this link 'Home' if they are logged in,
          and call this link 'Login' if they are not */}
          {loginLinkData.text}
        </Link>
        {/* Conditional rendering for the NAV bar to show Logout, Register Students, and Register Staff*/}
        {(props.store.user.role === "admin" ||
          props.store.user.role === "specials") && (
          <>
            <Link className="nav-link" to="/school">
              School
            </Link>
          </>
        )}
        {props.store.user.role === "admin" && (
          <>
            <Link className="nav-link" to="/staffRegister">
              Register Staff
            </Link>
          </>
        )}
        {props.store.user.role === "teacher" && (
          <>
            <Link className="nav-link" to="/studentRegister">
              Register Students
            </Link>
          </>
        )}
        {props.store.user.id && (
          <>
            <LogOutButton className="nav-link" />
          </>
        )}
      </div>
    </div>
  );
};

export default connect(mapStoreToProps)(Nav);
