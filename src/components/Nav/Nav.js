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

  if (props.store.user.id != null && props.store.user.is_admin) {
    loginLinkData.path = "/admin";
    loginLinkData.text = "Home";
  } else if (props.store.user.id != null && props.store.user.is_teacher) {
    loginLinkData.path = "/teacher";
    loginLinkData.text = "Home";
  } else if (props.store.user.id != null && props.store.user.is_specials) {
    loginLinkData.path = "/specials";
    loginLinkData.text = "Home";
  } else {
    loginLinkData.path = "/student";
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
          and call this link 'Login' if they are not */}
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
