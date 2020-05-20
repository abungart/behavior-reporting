import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import mapStoreToProps from "../../redux/mapStoreToProps";
import StudentListItem from "../StudentListItem/StudentListItem";
import InterventionStart from "../InterventionStart/InterventionStart";

import Grid from "@material-ui/core/Grid";

import "./Classroom.css";

class Classroom extends Component {
  componentDidMount() {
    if (this.props.store.user.role === "teacher") {
      this.props.dispatch({
        type: "GET_STUDENT_LIST",
        payload: this.props.store.user,
      });
    } else if (
      this.props.store.user.role === "admin" ||
      this.props.store.user.role === "specials"
    ) {
      this.props.dispatch({
        type: "GET_STUDENT_LIST",
        payload: this.props.store.currentUserData,
      });
    }
  }

  render() {
    return (
      <div className="classroom_container">
        <Grid
          container
          spacing={2}
          justify="space-between"
          direction="row"
          alignItems="flex-start"
        >
          <Grid
            container
            item
            lg={7}
            spacing={2}
            justify="space-between"
            direction="row"
            alignItems="flex-start"
          >
            <ul>
              {this.props.store.userList.map((userItem) => {
                return (
                  <StudentListItem key={userItem.id} userItem={userItem} />
                );
              })}
            </ul>
          </Grid>
          <Grid
            container
            item
            lg={5}
            justify="space-between"
            direction="row"
            alignItems="flex-end"
          >
            <div>
              <h2>Intervention List</h2>
              <ul>
                {this.props.store.userList.map((userItem) => {
                  return (
                    <InterventionStart key={userItem.id} userItem={userItem} />
                  );
                })}
              </ul>
            </div>
          </Grid>
        </Grid>
        <div>
          <LogOutButton className="log-in" />
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStoreToProps)(Classroom));
