import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import mapStoreToProps from "../../redux/mapStoreToProps";
import StudentListItem from "../StudentListItem/StudentListItem";
import InterventionStart from "../InterventionStart/InterventionStart";

import "./Classroom.css";

class Classroom extends Component {
  componentDidMount() {
    if (this.props.store.user.role == "teacher") {
      this.props.dispatch({
        type: "GET_STUDENT_LIST",
        payload: this.props.store.user,
      });
    } else if (
      this.props.store.user.role == "admin" ||
      this.props.store.user.role == "specials"
    ) {
      this.props.dispatch({
        type: "GET_STUDENT_LIST",
        payload: this.props.store.currentUserData,
      });
    }
  }

  state = {
    heading: "Classroom Page!",
  };

  startIntervention = () => {
    console.log("Start Intervention");
    for (let student of this.props.store.userList) {
      if (student.in_intervention === true) {
        console.log("Intervention List", student);
        this.props.dispatch({
          type: "START_DAILY_INTERVENTION",
          payload: student,
        });
      }
    }
  };

  render() {
    return (
      <div>
        <div>
          <h2>{this.state.heading}</h2>

          <ul>
            {this.props.store.userList.map((userItem) => {
              return <StudentListItem key={userItem.id} userItem={userItem} />;
            })}
          </ul>
        </div>
        <div>
          <h1>Intervention List</h1>
          <ul>
            {this.props.store.userList.map((userItem) => {
              return (
                <InterventionStart key={userItem.id} userItem={userItem} />
              );
            })}
          </ul>
          <button type="button" onClick={this.startIntervention}>
            Start Daily Interventions
          </button>
        </div>
        <LogOutButton className="log-in" />
      </div>
    );
  }
}

export default withRouter(connect(mapStoreToProps)(Classroom));
