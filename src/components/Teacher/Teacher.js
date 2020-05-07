import React, { Component } from "react";
import { connect } from "react-redux";
import LogOutButton from "../LogOutButton/LogOutButton";
import mapStoreToProps from "../../redux/mapStoreToProps";
import StudentListItem from "../StudentListItem/StudentListItem";

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class Teacher extends Component {
  componentDidMount() {
    console.log("Teacher Mounted", this.props.store.user);
    this.props.dispatch({
      type: "FETCH_STAFF",
      payload: this.props.store.user,
    });
    this.props.dispatch({
      type: "GET_STUDENT_LIST",
      payload: this.props.store.user,
    });
  }

  state = {
    heading: "Teacher Page!",
  };

  render() {
    console.log("Teacher Render", this.props.store.currentUserData);
    console.log("Student List", this.props.store.userList);
    return (
      <div>
        <h2>{this.state.heading}</h2>
        <div>
          <p>{this.props.store.currentUserData.staff_name}</p>
          <p>Email Address: {this.props.store.currentUserData.email_address}</p>
          <p>Position: {this.props.store.currentUserData.position}</p>
          <button type="button">Edit</button>
        </div>
        <div>
          <ul>
            {this.props.store.userList.map((userItem) => {
              return <StudentListItem key={userItem.id} userItem={userItem} />;
            })}
          </ul>
        </div>
        <LogOutButton className="log-in" />
      </div>
    );
  }
}

export default connect(mapStoreToProps)(Teacher);
