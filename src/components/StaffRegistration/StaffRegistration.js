import React, { Component } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import mapStoreToProps from "../../redux/mapStoreToProps";

const roles = [
  { value: "teacher", label: "Teacher" },
  { value: "specials", label: "Specials Teacher" },
  { value: "admin", label: "Administrator" },
];

class StaffRegistration extends Component {
  state = {
    username: "",
    password: "",
    role: "",
    staff_name: "",
    email_address: "",
    position: "",
  };

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password && this.state.staff_name) {
      console.log(this.state);
      this.props.dispatch({
        type: "REGISTER_STAFF",
        payload: {
          username: this.state.username,
          password: this.state.password,
          role: this.state.role,
          staff_name: this.state.staff_name,
          email_address: this.state.email_address,
          position: this.state.position,
        },
      });
    } else {
      this.props.dispatch({ type: "REGISTRATION_INPUT_ERROR" });
    }
  }; // end registerUser

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  handleRoleChange = (selectedOption) => {
    this.setState({
      role: selectedOption.value,
    });
  };

  render() {
    const { selectedOption } = this.state.role;
    return (
      <div>
        {this.props.errors.registrationMessage && (
          <h2 className="alert" role="alert">
            {this.props.errors.registrationMessage}
          </h2>
        )}
        <form className="formPanel" onSubmit={this.registerUser}>
          <h1>Register New Staff</h1>
          <div>
            <label htmlFor="username">
              Username:
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleInputChangeFor("username")}
              />
            </label>
          </div>
          <div>
            <label htmlFor="password">
              Password:
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChangeFor("password")}
              />
            </label>
          </div>
          <div>
            <label htmlFor="staff_name">
              Name:
              <input
                type="staff_name"
                name="staff_name"
                value={this.state.staff_name}
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
                value={this.state.email_address}
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
                value={this.state.position}
                onChange={this.handleInputChangeFor("position")}
              />
            </label>
          </div>
          <div>
            <Select
              value={selectedOption}
              onChange={this.handleRoleChange}
              options={roles}
            />
          </div>
          <div>
            <input
              className="register"
              type="submit"
              name="submit"
              value="Register"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(StaffRegistration);
