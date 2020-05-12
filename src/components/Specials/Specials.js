import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import mapStoreToProps from "../../redux/mapStoreToProps";

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class Specials extends Component {
  componentDidMount() {
    console.log("Specials Mounted", this.props.store.user);
    this.props.dispatch({
      type: "FETCH_STAFF",
      payload: this.props.store.user,
    });
    this.props.dispatch({
      type: "GET_STAFF_LIST",
    });
  }

  state = {
    heading: "Specials Page!",
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
      <div>
        <h2>{this.state.heading}</h2>
        {this.state.inEdit === false && (
          <div>
            <p>{this.props.store.currentUserData.staff_name}</p>
            <p>
              Email Address: {this.props.store.currentUserData.email_address}
            </p>
            <p>Position: {this.props.store.currentUserData.position}</p>
            <button type="button" onClick={this.editUser}>
              Edit
            </button>
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
            <button type="button" onClick={this.submitEdit}>
              Submit
            </button>
            <button type="button" onClick={this.cancelEdit}>
              Cancel
            </button>
          </div>
        )}
        <Link to="/school">
          <h1>School</h1>
        </Link>
        <LogOutButton className="log-in" />
      </div>
    );
  }
}

export default withRouter(connect(mapStoreToProps)(Specials));
