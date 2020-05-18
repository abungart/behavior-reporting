import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";

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
        <h2 onClick={this.chooseStaff}>
          {this.props.userItem.staff_name}
          <> </>
          {this.props.store.user.role === "admin" && (
            <Button
              size="medium"
              variant="contained"
              color="secondary"
              onClick={this.deleteClick}
            >
              Delete Staff
            </Button>
          )}
        </h2>
      </li>
    );
  }
}

export default withRouter(connect(mapStoreToProps)(ListItem));
