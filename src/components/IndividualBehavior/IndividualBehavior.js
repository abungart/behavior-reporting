import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import StudentData from "../StudentData/StudentData";
import DailyInterventionOutput from "../DailyInterventionOutput/DailyInterventionOutput";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const moment = require("moment");

const hour = [
  { value: "8", label: "8am to 9am" },
  { value: "9", label: "9am to 10am" },
  { value: "10", label: "10am to 11am" },
  { value: "11", label: "11am to 12pm" },
  { value: "12", label: "12pm to 1pm" },
  { value: "1", label: "1pm to 2pm" },
  { value: "2", label: "2pm to 3pm" },
  { value: "3", label: "3pm to 4pm" },
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

  // Button handlers
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

    this.props.history.push("/classroom");
  }; // end InterventionSwitch

  submitHourlyIntervention = () => {
    let submission = {
      date: moment(this.state.date).format("YYYY-MM-DD"),
      points: this.state.pointGoal,
      notes: this.state.notes,
      hour: this.state.hour,
      teacher: this.props.store.user.id,
      student: this.props.store.studentInfo.id,
    };
    console.log("submission", submission);
    this.props.dispatch({
      type: "SUBMIT_HOURLY_INTERVENTION",
      payload: submission,
    });
  };

  getIntervention = () => {
    let interventionCriteria = {
      date: moment(this.state.date).format("YYYY-MM-DD"),
      student: this.props.store.studentInfo.id,
    };
    console.log("Intervention Criteria", interventionCriteria);
    this.props.dispatch({
      type: "DAILY_INTERVENTION",
      payload: interventionCriteria,
    });
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
                  dateFormat="yyyy/MM/dd"
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
        <div>
          <h1>Daily Intervention Reports</h1>
          <DatePicker
            dateFormat="yyyy/MM/dd"
            selected={this.state.date}
            onChange={this.handleDateChange}
          />
          <button type="button" onClick={this.getIntervention}>
            Get Daily Report
          </button>
        </div>
        <DailyInterventionOutput />
      </div>
    );
  }
}
export default connect(mapStoreToProps)(IndividualBehavior);
