import React, { Component } from "react";
import { connect } from "react-redux";
import LogOutButton from "../LogOutButton/LogOutButton";
import mapStoreToProps from "../../redux/mapStoreToProps";
import StudentData from "../StudentData/StudentData";

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class Student extends Component {
  componentDidMount() {
    console.log("Student Mounted", this.props.store.user);
    this.props.dispatch({
      type: "FETCH_STUDENT_SEPARATE",
      payload: this.props.store.user,
    });
  }

  state = {
    heading: "Student Page!",
  };

  render() {
    return (
      <div>
        <h2>{this.state.heading}</h2>
        <StudentData />
        <LogOutButton className="log-in" />
      </div>
    );
  }
}

export default connect(mapStoreToProps)(Student);
