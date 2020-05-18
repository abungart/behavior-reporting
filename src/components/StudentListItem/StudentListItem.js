import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import mapStoreToProps from "../../redux/mapStoreToProps";

import Button from "@material-ui/core/Button";

class StudentListItem extends Component {
  state = {
    deleteUsername: this.props.userItem.username,
    id: this.props.store.currentUserData.id,
  };

  deleteClick = () => {
    console.log("In Delete Button", this.props.userItem.username);
    this.props.dispatch({
      type: "DELETE_STUDENT",
      payload: this.state,
    });
    this.props.dispatch({
      type: "GET_STUDENT_LIST",
      payload: this.props.store.user,
    });
  };

  studentBehavior = () => {
    console.log("In studentBehavior Click", this.props.userItem);
    this.props.dispatch({
      type: "FETCH_STUDENT_SEPARATE",
      payload: this.props.userItem,
    });

    this.props.history.push("/individualBehavior");
  };

  render() {
    return (
      <li className="user_list">
        <h2 onClick={this.studentBehavior}>
          {this.props.userItem.name}
          <> </>
          <Button
            color="secondary"
            variant="contained"
            size="small"
            onClick={this.deleteClick}
          >
            Delete Student
          </Button>
        </h2>
      </li>
    );
  }
}

export default withRouter(connect(mapStoreToProps)(StudentListItem));
