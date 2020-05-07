import React, { Component } from "react";
import { connect } from "react-redux";
import LogOutButton from "../LogOutButton/LogOutButton";
import mapStoreToProps from "../../redux/mapStoreToProps";

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class Student extends Component {
  componentDidMount() {
    console.log("Student Mounted", this.props.store.user);
    this.props.dispatch({
      type: "FETCH_STUDENT",
      payload: this.props.store.user,
    });
  }

  state = {
    heading: "Student Page!",
    inEdit: false,
    name: "",
    nickname: "",
    email_address: "",
    home_phone: "",
    cell_phone: "",
    work_phone: "",
  };

  render() {
    console.log("Student Render", this.props.store.currentUserData);
    return (
      <div>
        <h2>{this.state.heading}</h2>
        <div>
          <p>{this.props.store.currentUserData.name}</p>
          <p>{this.props.store.currentUserData.nickname}</p>
          <p>Email Address: {this.props.store.currentUserData.email_address}</p>
          <p>Home Phone: {this.props.store.currentUserData.home_phone}</p>
          <p>Cell Phone: {this.props.store.currentUserData.cell_phone}</p>
          <p>Work Phone: {this.props.store.currentUserData.work_phone}</p>
          <p>Teacher: {this.props.store.currentUserData.staff_name}</p>
          <button type="button">Edit</button>
        </div>
        <LogOutButton className="log-in" />
      </div>
    );
  }
}

export default connect(mapStoreToProps)(Student);
