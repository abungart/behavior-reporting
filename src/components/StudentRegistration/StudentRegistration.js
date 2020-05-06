import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";

class StudentRegistration extends Component {
  state = {
    username: "",
    password: "",
    role: "student",
    name: "",
    nickname: "",
    home_phone: "",
    cell_phone: "",
    work_phone: "",
    email_address: "",
    teacher_id: this.props.user.id,
  };

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password && this.state.name) {
      console.log(this.state);
      this.props.dispatch({
        type: "REGISTER_STUDENT",
        payload: {
          username: this.state.username,
          password: this.state.password,
          role: "student",
          name: this.state.name,
          nickname: this.state.nickname,
          home_phone: this.state.home_phone,
          cell_phone: this.state.cell_phone,
          work_phone: this.state.work_phone,
          email_address: this.state.email_address,
          teacher_id: this.state.teacher_id,
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

  render() {
    return (
      <div>
        {this.props.errors.registrationMessage && (
          <h2 className="alert" role="alert">
            {this.props.errors.registrationMessage}
          </h2>
        )}
        <form className="formPanel" onSubmit={this.registerUser}>
          <h1>Register New Student</h1>
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
            <label htmlFor="name">
              Name:
              <input
                type="name"
                name="name"
                value={this.state.name}
                onChange={this.handleInputChangeFor("name")}
              />
            </label>
          </div>
          <div>
            <label htmlFor="nickname">
              Nickname:
              <input
                type="nickname"
                name="nickname"
                value={this.state.nickname}
                onChange={this.handleInputChangeFor("nickname")}
              />
            </label>
          </div>
          <div>
            <label htmlFor="home_phone">
              Home Phone:
              <input
                type="home_phone"
                name="home_phone"
                value={this.state.home_phone}
                onChange={this.handleInputChangeFor("home_phone")}
              />
            </label>
          </div>
          <div>
            <label htmlFor="cell_phone">
              Cell Phone:
              <input
                type="cell_phone"
                name="cell_phone"
                value={this.state.cell_phone}
                onChange={this.handleInputChangeFor("cell_phone")}
              />
            </label>
          </div>
          <div>
            <label htmlFor="work_phone">
              Work Phone:
              <input
                type="work_phone"
                name="work_phone"
                value={this.state.work_phone}
                onChange={this.handleInputChangeFor("work_phone")}
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

export default connect(mapStoreToProps)(StudentRegistration);
