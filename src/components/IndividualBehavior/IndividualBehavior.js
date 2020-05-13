import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import StudentData from "../StudentData/StudentData";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const hour = [
  { value: "8am to 9am", label: "8" },
  { value: "9am to 10am", label: "9" },
  { value: "10am to 11am", label: "10" },
  { value: "11am to 12pm", label: "11" },
  { value: "12pm to 1pm", label: "12" },
  { value: "1pm to 2pm", label: "1" },
  { value: "2pm to 3pm", label: "2" },
  { value: "3pm to 4pm", label: "3" },
];

class IndividualBehavior extends Component {
  componentDidMount() {
    console.log("Individual Behavior Mounted", this.props.store.user);
  }

  state = {
    heading: "Individual Behavior Page!",
    pointGoal: 0,
    notes: "",
    date: new Date(),
    hour: "",
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

  submitHourlyIntervention = () => {
    console.log("In Hourly Submit", this.state);
  };

  // Text Input Handler
  handlePointsChange = (event) => {
    this.setState({
      pointGoal: event.target.value,
    });
  };

  handleNotesChange = (event) => {
    this.setState({
      notes: event.target.value,
    });
  };

  handleDateChange = (date) => {
    this.setState({
      date: date,
    });
  };

  handleHourChange = (selectedOption) => {
    this.setState({
      hour: selectedOption.value,
    });
  };

  render() {
    const { selectedOption } = this.state.hour;
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
            <div>
              <div>
                <button type="button" onClick={this.interventionSwitch}>
                  Stop Intervention
                </button>
              </div>
              <div>
                <DatePicker
                  selected={this.state.date}
                  onChange={this.handleDateChange}
                />
                <Select
                  value={selectedOption}
                  onChange={this.handleHourChange}
                  options={hour}
                />
                <label>Points this hour:</label>
                <input
                  type="number"
                  placeholder="0"
                  onChange={this.handlePointsChange}
                />
                <label>Notes for the hour:</label>
                <input
                  type="textBlock"
                  placeholder="Notes"
                  onChange={this.handleNotesChange}
                />
                <button type="button" onClick={this.submitHourlyIntervention}>
                  Submit Hourly Intervention
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default connect(mapStoreToProps)(IndividualBehavior);
