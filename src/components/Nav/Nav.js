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

  if (props.store.user.id != null) {
    loginLinkData.path = "/admin";
    loginLinkData.text = "Home";
  }

  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">Behavior Tracking and Reporting</h2>
      </Link>
      <div className="nav-right">
        <Link className="nav-link" to={loginLinkData.path}>
          {/* Show this link if they are logged in or not,
          but call this link 'Home' if they are logged in,
          and call this link 'Login / Register' if they are not */}
          {loginLinkData.text}
        </Link>
        {/* Show the link to the logout button if the user is logged in */}
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
