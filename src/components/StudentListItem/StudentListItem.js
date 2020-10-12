import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import mapStoreToProps from "../../redux/mapStoreToProps";

import Button from "@material-ui/core/Button";

class StudentListItem extends Component {
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
        <div>
          <h2 onClick={this.studentBehavior}>{this.props.userItem.name}</h2>
          <> </>
          <Button color="primary" variant="contained" size="small">
            +
          </Button>
          <Button color="secondary" variant="contained" size="small">
            -
          </Button>
        </div>
      </li>
    );
  }
}

export default withRouter(connect(mapStoreToProps)(StudentListItem));
