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
    pointGoal: 0,
  };

  interventionSwitch = () => {
    let interventionToggle = {
      user: this.props.store.studentInfo.username,
      toggle: this.props.store.studentInfo.in_intervention,
      points: this.state.pointGoal,
    };
    console.log("in intervention toggle", interventionToggle);
    if (this.props.store.studentInfo.in_intervention === false) {
      interventionToggle.toggle = true;
    } else {
      interventionToggle.toggle = false;
    }
    console.log("Intervention Toggle info:", interventionToggle);

    this.props.dispatch({
      type: "INTERVENTION_TOGGLE",
      payload: interventionToggle,
    });
  }; // end InterventionSwitch

  // Text Input Handler
  handlePointsChange = (event) => {
    this.setState({
      pointGoal: event.target.value,
    });
  };

  render() {
    return (
      <div>
        <h2>"{this.state.heading}"</h2>
        <StudentData />
        <div>
          <h2>Start Intervention</h2>
          {this.props.store.studentInfo.in_intervention === false && (
            <div>
              <label>Points Goal</label>
              <input
                type="int"
                placeholder="0"
                onChange={this.handlePointsChange}
              />
              <button type="button" onClick={this.interventionSwitch}>
                Start Intervention
              </button>
            </div>
          )}
          {this.props.store.studentInfo.in_intervention === true && (
            <button type="button" onClick={this.interventionSwitch}>
              Stop Intervention
            </button>
          )}
        </div>
      </div>
    );
  }
}
export default connect(mapStoreToProps)(IndividualBehavior);
