import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import mapStoreToProps from "../../redux/mapStoreToProps";
import Button from "@material-ui/core/Button";
import StaffListItem from "../StaffListItem/StaffListItem";
import Grid from "@material-ui/core/Grid";

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
    inEdit: false,
    staff_name: "",
    email_address: "",
    position: "",
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

  // Handle text input
  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  render() {
    return (
      <div className="basic_container">
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
                  defaultValue={this.props.store.currentUserData.email_address}
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
          </div>
        )}
        <Grid
          container
          spacing={2}
          justify="center"
          direction="row"
          alignContent="center"
        >
          <ul>
            {this.props.store.userList.map((userItem) => {
              return <StaffListItem key={userItem.id} userItem={userItem} />;
            })}
          </ul>
        </Grid>
      </div>
    );
  }
}

export default withRouter(connect(mapStoreToProps)(Admin));
