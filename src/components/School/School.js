import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import mapStoreToProps from "../../redux/mapStoreToProps";
import StaffListItem from "../StaffListItem/StaffListItem";

class School extends Component {
  componentDidMount() {
    console.log("School Mounted", this.props.store.user);

    this.props.dispatch({
      type: "GET_STAFF_LIST",
    });
  }

  state = {
    heading: "School Page!",
  };

  render() {
    return (
      <div>
        <h2>"{this.state.heading}"</h2>

        <div>
          <ul>
            {this.props.store.userList.map((userItem) => {
              return <StaffListItem key={userItem.id} userItem={userItem} />;
            })}
          </ul>
        </div>
        <LogOutButton className="log-in" />
      </div>
    );
  }
}

export default withRouter(connect(mapStoreToProps)(School));
