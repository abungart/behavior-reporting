import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import Button from "@material-ui/core/Button";

class StudentData extends Component {
  state = {
    inEdit: false,
    name: "",
    nickname: "",
    email_address: "",
    home_phone: "",
    cell_phone: "",
    work_phone: "",
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
      name: this.state.name,
      nickname: this.state.nickname,
      email_address: this.state.email_address,
      home_phone: this.state.home_phone,
      cell_phone: this.state.cell_phone,
      work_phone: this.state.work_phone,
      username: this.props.store.studentInfo.username,
    };

    if (updatedUser.name == null || updatedUser.name === "") {
      updatedUser.name = this.props.store.studentInfo.name;
    }

    if (updatedUser.nickname == null || updatedUser.nickname === "") {
      updatedUser.nickname = this.props.store.studentInfo.nickname;
    }

    if (updatedUser.email_address == null || updatedUser.email_address === "") {
      updatedUser.email_address = this.props.store.studentInfo.email_address;
    }

    if (updatedUser.home_phone == null || updatedUser.home_phone === "") {
      updatedUser.home_phone = this.props.store.studentInfo.home_phone;
    }

    if (updatedUser.cell_phone == null || updatedUser.cell_phone === "") {
      updatedUser.cell_phone = this.props.store.studentInfo.cell_phone;
    }

    if (updatedUser.work_phone == null || updatedUser.work_phone === "") {
      updatedUser.work_phone = this.props.store.studentInfo.work_phone;
    }

    this.props.dispatch({
      type: "UPDATE_STUDENT",
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
        {this.state.inEdit === false && (
          <div>
            <p>{this.props.store.studentInfo.name}</p>
            <p>{this.props.store.studentInfo.nickname}</p>
            <p>Email Address: {this.props.store.studentInfo.email_address}</p>
            <p>Home Phone: {this.props.store.studentInfo.home_phone}</p>
            <p>Cell Phone: {this.props.store.studentInfo.cell_phone}</p>
            <p>Work Phone: {this.props.store.studentInfo.work_phone}</p>
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
              <label htmlFor="name">
                Name:
                <input
                  type="name"
                  name="name"
                  defaultValue={this.props.store.studentInfo.name}
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
                  defaultValue={this.props.store.studentInfo.nickname}
                  onChange={this.handleInputChangeFor("nickname")}
                />
              </label>
            </div>
            <div>
              <label htmlFor="email_address">
                Email Address:
                <input
                  type="email_address"
                  name="email_address"
                  defaultValue={this.props.store.studentInfo.email_address}
                  onChange={this.handleInputChangeFor("email_address")}
                />
              </label>
            </div>
            <div>
              <label htmlFor="home_phone">
                Home Phone:
                <input
                  type="home_phone"
                  name="home_phone"
                  defaultValue={this.props.store.studentInfo.home_phone}
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
                  defaultValue={this.props.store.studentInfo.cell_phone}
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
                  defaultValue={this.props.store.studentInfo.work_phone}
                  onChange={this.handleInputChangeFor("work_phone")}
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
      </div>
    );
  }
}
export default connect(mapStoreToProps)(StudentData);
