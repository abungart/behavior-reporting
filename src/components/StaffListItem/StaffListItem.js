import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";

class ListItem extends Component {
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
      </li>
    );
  }
}

export default withRouter(connect(mapStoreToProps)(ListItem));
