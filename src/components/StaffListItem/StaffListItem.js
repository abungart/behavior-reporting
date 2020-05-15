import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import { withRouter } from "react-router-dom";

class ListItem extends Component {
  deleteClick = () => {
    console.log("In Delete Button", this.props.userItem.username);
    this.props.dispatch({
      type: "DELETE_STAFF",
      payload: `/api/user/deleteStaff/${this.props.userItem.username}`,
    });
    this.props.dispatch({
      type: "GET_STAFF_LIST",
    });
  };

  chooseStaff = () => {
    this.props.dispatch({
      type: "FETCH_STAFF",
      payload: this.props.userItem,
    });

    this.props.history.push(`/${this.props.userItem.role}`);
  };

  render() {
    return (
      <li className="user_list">
        <h2 onClick={this.chooseStaff}>{this.props.userItem.staff_name}</h2>
        {this.props.store.user.role === "admin" && (
          <button onClick={this.deleteClick}>Delete Staff</button>
        )}
      </li>
    );
  }
}

export default withRouter(connect(mapStoreToProps)(ListItem));
