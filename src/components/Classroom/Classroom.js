import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import mapStoreToProps from "../../redux/mapStoreToProps";
import StudentListItem from "../StudentListItem/StudentListItem";

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
        <LogOutButton className="log-in" />
      </div>
    );
  }
}

export default withRouter(connect(mapStoreToProps)(Classroom));
