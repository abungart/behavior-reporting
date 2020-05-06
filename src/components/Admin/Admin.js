import React, { Component } from "react";
import { connect } from "react-redux";
import LogOutButton from "../LogOutButton/LogOutButton";
import mapStoreToProps from "../../redux/mapStoreToProps";

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
  }

  state = {
    heading: "Admin Page!",
  };

  render() {
    console.log("Admin Render", this.props.store.currentUserData);
    return (
      <div>
        <h2>"{this.state.heading}"</h2>
        <LogOutButton className="log-in" />
      </div>
    );
  }
}

export default connect(mapStoreToProps)(Admin);
