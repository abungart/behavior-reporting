import React, { Component } from "react";
import { connect } from "react-redux";
import LogOutButton from "../LogOutButton/LogOutButton";
import mapStoreToProps from "../../redux/mapStoreToProps";

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class Admin extends Component {
  componentDidMount() {
    console.log("Admin Mounted", this.props.store.user);
    this.props.dispatch({
      type: "FETCH_STAFF",
      payload: this.props.store.user,
    });
    this.props.dispatch({
      type: "GET_STAFF_LIST",
    });
  }

  state = {
    heading: "Admin Page!",
  };

  render() {
    console.log("Admin Render", this.props.store.currentUserData);
    console.log("Staff List", this.props.store.userList);
    return (
      <div>
        <h2>"{this.state.heading}"</h2>
        <div>
          <p>{this.props.store.currentUserData.staff_name}</p>
          <p>Email Address: {this.props.store.currentUserData.email_address}</p>
          <p>Position: {this.props.store.currentUserData.position}</p>
          <p>Role: {this.props.store.currentUserData.role}</p>
          <button type="button">Edit</button>
        </div>
        <LogOutButton className="log-in" />
      </div>
    );
  }
}

export default connect(mapStoreToProps)(Admin);
