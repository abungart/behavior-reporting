import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import mapStoreToProps from "../../redux/mapStoreToProps";
import StudentListItem from "../StudentListItem/StudentListItem";
import InterventionStart from "../InterventionStart/InterventionStart";

class Classroom extends Component {
  componentDidMount() {
    console.log("Classroom Mounted", this.props.store.user);

    this.props.dispatch({
      type: "GET_STUDENT_LIST",
      payload: this.props.store.user,
    });
  }

  state = {
    heading: "Classroom Page!",
  };

  startIntervention = () => {
    console.log("Start Intervention");
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
            <button type="button" onClick={this.startIntervention}>
              Start Daily Interventions
            </button>
          </ul>
        </div>
        <LogOutButton className="log-in" />
      </div>
    );
  }
}

export default withRouter(connect(mapStoreToProps)(Classroom));
