import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import mapStoreToProps from "../../redux/mapStoreToProps";

class InterventionStart extends Component {
  render() {
    console.log("User Item", this.props.userItem);
    return (
      <div>
        {this.props.userItem.in_intervention === true && (
          <li className="user_list">
            <h2>{this.props.userItem.name}</h2>
          </li>
        )}
      </div>
    );
  }
}

export default withRouter(connect(mapStoreToProps)(InterventionStart));
