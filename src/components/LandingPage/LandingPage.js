import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";

import "./LandingPage.css";

class LandingPage extends Component {
  state = {
    heading: "Behavior Tracking and Reporting",
  };

  onLogin = (event) => {
    this.props.history.push("/login");
  };

  render() {
    return (
      <div className="container">
        <h2>{this.state.heading}</h2>

        <div className="grid">
          <div className="grid-col grid-col_8">
            <p>
              This application has been created for use with the Center School
              District. This program is not licensed for use outside of Center
              School District.
            </p>

            <p>
              For assistance logging in, please contact the admin at Center
              School District.
            </p>

            <p>
              For any questions or additional information, please contact use
              the contact link at the bottom of the page.
            </p>
          </div>
          <div className="grid-col grid-col_4">
            <h3>Already a Member?</h3>
            <button className="btn btn_sizeFull" onClick={this.onLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(LandingPage);
