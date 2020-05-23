import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import mapStoreToProps from "../../redux/mapStoreToProps";
import "./DailyIntervention.css";
const moment = require("moment");

class DailyInterventionOutput extends Component {
  render() {
    const interventionData = this.props.store.intervention || {};
    console.log("intervention Data:", interventionData);
    return (
      <div>
        {interventionData.date !== "" && (
          <div>
            <h3>
              Intervention for the day of <> </>
              {moment(interventionData.date).format("MM-DD-YYYY")}
            </h3>
            <table className="intervention_table">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Points</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {interventionData.map((interventionItem) => {
                  return (
                    <tr>
                      <td>{interventionItem.hour}am</td>
                      <td>{interventionItem.points}</td>
                      <td>{interventionItem.notes}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(connect(mapStoreToProps)(DailyInterventionOutput));
