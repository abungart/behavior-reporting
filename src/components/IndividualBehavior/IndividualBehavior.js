import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import StudentData from "../StudentData/StudentData";

class IndividualBehavior extends Component {
  componentDidMount() {
    console.log("Individual Behavior Mounted", this.props.store.user);
  }

  state = {
    heading: "Individual Behavior Page!",
  };

  render() {
    return (
      <div>
        <h2>"{this.state.heading}"</h2>
        <StudentData />
      </div>
    );
  }
}
export default connect(mapStoreToProps)(IndividualBehavior);
