import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";

class StudentListItem extends Component {
  deleteClick = () => {
    console.log("In Delete Button", this.props.userItem.username);
    this.props.dispatch({
      type: "DELETE_STUDENT",
      payload: `/api/user/delete/${this.props.userItem.username}`,
    });
  };

  render() {
    return (
      <li className="user_list">
        <h2>{this.props.userItem.name}</h2>
        <button onClick={this.deleteClick}>Delete Student</button>
      </li>
    );
  }
}

export default connect(mapStoreToProps)(StudentListItem);
