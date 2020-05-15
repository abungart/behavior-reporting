import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import mapStoreToProps from "../../redux/mapStoreToProps";

class DailyInterventionOutput extends Component {
  render() {
    const interventionData = this.props.store.intervention;
    console.log("Data:", interventionData);
    return <div></div>;
  }
}

export default withRouter(connect(mapStoreToProps)(DailyInterventionOutput));
