import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import mapStoreToProps from "../../redux/mapStoreToProps";

class InterventionStart extends Component {
  studentBehavior = () => {
    console.log("In studentBehavior Click", this.props.userItem);
    this.props.dispatch({
      type: "FETCH_STUDENT_SEPARATE",
      payload: this.props.userItem,
    });

    this.props.history.push("/individualBehavior");
  };

  render() {
    console.log("User Item", this.props.userItem);
    return (
      <div>
        {this.props.userItem.in_intervention === true && (
          <li className="user_list">
            <h2 onClick={this.studentBehavior}>{this.props.userItem.name}</h2>
          </li>
        )}
      </div>
    );
  }
}

export default withRouter(connect(mapStoreToProps)(InterventionStart));
