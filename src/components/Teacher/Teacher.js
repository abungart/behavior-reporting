import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import mapStoreToProps from "../../redux/mapStoreToProps";
import InterventionStart from "../InterventionStart/InterventionStart";
import StudentListItem from "../StudentListItem/StudentListItem";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  root: {
    maxWidth: "90%",
    width: "920px",
    margin: "15px auto",
    paddingTop: 10,
    paddingBottom: 10,
  },
  padding: {
    padding: "8px 20px",
  },
  selectorSize: {
    minWidth: 600,
  },
  inputMargin: {
    margin: "10px 0px",
    minWidth: 600,
  },
});
// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class Teacher extends Component {
  componentDidMount() {
    console.log("Teacher Mounted", this.props.store.user);
    if (this.props.store.user.role === "teacher") {
      this.props.dispatch({
        type: "FETCH_STAFF",
        payload: this.props.store.user,
      });
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

  state = {
    inEdit: false,
    staff_name: "",
    email_address: "",
    position: "",
    status: "Classroom",
    tabValue: 0,
  };

  // Status Toggles
  classroomSelect = () => {
    this.setState({
      status: "Classroom",
    });
  };
  interventionSelect = () => {
    this.setState({
      status: "Intervention",
    });
  };

  onChange = (event, newValue) => {
    this.setState({ tabValue: newValue });
  };

  // EDIT button handlers
  editUser = () => {
    this.setState({
      inEdit: true,
    });
    console.log("In Edit User:", this.props.store.currentUserData);
  };

  submitEdit = () => {
    this.setState({
      inEdit: false,
    });

    let updatedUser = {
      staff_name: this.state.staff_name,
      email_address: this.state.email_address,
      position: this.state.position,
      username: this.props.store.currentUserData.username,
    };

    if (updatedUser.staff_name == null || updatedUser.staff_name === "") {
      updatedUser.staff_name = this.props.store.currentUserData.staff_name;
    }

    if (updatedUser.email_address == null || updatedUser.email_address === "") {
      updatedUser.email_address = this.props.store.currentUserData.email_address;
    }

    if (updatedUser.position == null || updatedUser.position === "") {
      updatedUser.position = this.props.store.currentUserData.position;
    }

    this.props.dispatch({
      type: "UPDATE_STAFF",
      payload: updatedUser,
    });
  };

  cancelEdit = () => {
    this.setState({
      inEdit: false,
    });
    console.log("Edit Cancelled");
  };

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

  // Handle text input
  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className="basic_container">
        <CssBaseline>
          {this.state.inEdit === false && (
            <div>
              <p>{this.props.store.currentUserData.staff_name}</p>
              <p>
                Email Address: {this.props.store.currentUserData.email_address}
              </p>
              <p>Position: {this.props.store.currentUserData.position}</p>
              <Button
                type="button"
                size="small"
                variant="contained"
                color="primary"
                onClick={this.editUser}
              >
                Edit
              </Button>
            </div>
          )}
          {this.state.inEdit === true && (
            <div>
              <div>
                <label htmlFor="staff_name">
                  Name:
                  <input
                    type="staff_name"
                    name="staff_name"
                    defaultValue={this.props.store.currentUserData.staff_name}
                    onChange={this.handleInputChangeFor("staff_name")}
                  />
                </label>
              </div>
              <div>
                <label htmlFor="email_address">
                  Email Address:
                  <input
                    type="email_address"
                    name="email_address"
                    defaultValue={
                      this.props.store.currentUserData.email_address
                    }
                    onChange={this.handleInputChangeFor("email_address")}
                  />
                </label>
              </div>
              <div>
                <label htmlFor="position">
                  Position:
                  <input
                    type="position"
                    name="position"
                    defaultValue={this.props.store.currentUserData.position}
                    onChange={this.handleInputChangeFor("position")}
                  />
                </label>
              </div>
              <Button
                type="button"
                size="small"
                variant="contained"
                color="primary"
                onClick={this.submitEdit}
              >
                Submit
              </Button>
              <Button
                type="button"
                size="small"
                variant="contained"
                color="secondary"
                onClick={this.cancelEdit}
              >
                Cancel
              </Button>
              {this.props.store.user.role === "admin" && (
                <Button
                  size="small"
                  variant="contained"
                  color="secondary"
                  onClick={this.deleteClick}
                >
                  Delete Staff
                </Button>
              )}
            </div>
          )}
          <div>
            <Box display="flex" justifyContent="center" m={1} p={1}>
              <Tabs
                value={this.state.tabValue}
                onChange={this.onChange}
                indicatorColor="primary"
                textColor="primary"
                centered
              >
                <Tab
                  label="Classroom"
                  onClick={this.classroomSelect}
                  color="secondary"
                ></Tab>
                <Tab
                  label="Intervention"
                  onClick={this.interventionSelect}
                  color="secondary"
                ></Tab>
              </Tabs>
            </Box>
          </div>
          <div className="classroom_container">
            {this.state.status === "Classroom" && (
              <Paper styles={{ root: styles.root }} elevation={1}>
                <Typography
                  classes={{ root: styles.padding }}
                  variant="h6"
                  align="center"
                >
                  Classroom
                </Typography>
                <div>
                  {this.props.store.userList.map((userItem) => {
                    return (
                      <StudentListItem key={userItem.id} userItem={userItem} />
                    );
                  })}
                </div>
              </Paper>
            )}
            {this.state.status === "Intervention" && (
              <Paper styles={{ root: styles.root }} elevation={1}>
                <div>
                  <Typography
                    classes={{ root: styles.padding }}
                    variant="h6"
                    align="center"
                  >
                    Intervention List
                  </Typography>
                  <ul>
                    {this.props.store.userList.map((userItem) => {
                      return (
                        <InterventionStart
                          key={userItem.id}
                          userItem={userItem}
                        />
                      );
                    })}
                  </ul>
                </div>
              </Paper>
            )}
          </div>
        </CssBaseline>
      </div>
    );
  }
}

export default withRouter(connect(mapStoreToProps)(Teacher));
