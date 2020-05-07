import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";

class ListItem extends Component {
  deleteClick = () => {
    console.log("In Delete Button", this.props.userItem.username);
    this.props.dispatch({
      type: "DELETE_STAFF",
      payload: `/api/user/deleteStaff/${this.props.userItem.username}`,
    });
  };

  render() {
    return (
      <li className="user_list">
        <h2>{this.props.userItem.staff_name}</h2>
        {this.props.store.user.role === "admin" && (
          <button onClick={this.deleteClick}>Delete Staff</button>
        )}
      </li>
    );
  }
}

export default connect(mapStoreToProps)(ListItem);
