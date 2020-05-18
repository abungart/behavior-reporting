import React, { Component } from "react";
import { connect } from "react-redux";
import LogOutButton from "../LogOutButton/LogOutButton";
import mapStoreToProps from "../../redux/mapStoreToProps";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import StudentData from "../StudentData/StudentData";
import DailyInterventionOutput from "../DailyInterventionOutput/DailyInterventionOutput";
const moment = require("moment");

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class Student extends Component {
  componentDidMount() {
    console.log("Student Mounted", this.props.store.user);
    this.props.dispatch({
      type: "FETCH_STUDENT_SEPARATE",
      payload: this.props.store.user,
    });
  }

  state = {
    date: new Date(),
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

  handleDateChange = (date) => {
    this.setState({
      date: date,
    });
  };

  render() {
    return (
      <div>
        <StudentData />
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
        <LogOutButton className="log-in" />
      </div>
    );
  }
}

export default connect(mapStoreToProps)(Student);
