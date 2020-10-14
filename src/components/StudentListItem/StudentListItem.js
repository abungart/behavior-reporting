import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import mapStoreToProps from "../../redux/mapStoreToProps";

import Button from "@material-ui/core/Button";

import "./StudentListItem.css";

class StudentListItem extends Component {
  studentBehavior = () => {
    this.props.dispatch({
      type: "FETCH_STUDENT_SEPARATE",
      payload: this.props.userItem,
    });

    this.props.history.push("/individualBehavior");
  };

  render() {
    return (
      <div className="user_list">
        <h2 onClick={this.studentBehavior}>{this.props.userItem.name}</h2>
        <Button color="secondary" variant="contained" size="small">
          -
        </Button>
        <h2>{this.props.userItem.behavior_points} Bulldog Points</h2>
        <Button color="primary" variant="contained" size="small">
          +
        </Button>
      </div>
    );
  }
}

export default withRouter(connect(mapStoreToProps)(StudentListItem));
