import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import mapStoreToProps from "../../redux/mapStoreToProps";
const moment = require("moment");

class DailyInterventionOutput extends Component {
  render() {
    const interventionData = this.props.store.intervention[0] || {};
    return (
      <div>
        {interventionData.date !== "" && (
          <div>
            <h3>
              Intervention for the day of <> </>
              {moment(interventionData.date).format("MM-DD-YYYY")}
            </h3>
            <table>
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Points</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>8am to 9am</td>
                  <td>{interventionData["8_points"]}</td>
                  <td>{interventionData["8_notes"]}</td>
                </tr>
                <tr>
                  <td>9am to 10am</td>
                  <td>{interventionData["9_points"]}</td>
                  <td>{interventionData["9_notes"]}</td>
                </tr>
                <tr>
                  <td>10am to 11am</td>
                  <td>{interventionData["10_points"]}</td>
                  <td>{interventionData["10_notes"]}</td>
                </tr>
                <tr>
                  <td>11am to 12pm</td>
                  <td>{interventionData["11_points"]}</td>
                  <td>{interventionData["11_notes"]}</td>
                </tr>
                <tr>
                  <td>12pm to 1pm</td>
                  <td>{interventionData["12_points"]}</td>
                  <td>{interventionData["12_notes"]}</td>
                </tr>
                <tr>
                  <td>1pm to 2pm</td>
                  <td>{interventionData["1_points"]}</td>
                  <td>{interventionData["1_notes"]}</td>
                </tr>
                <tr>
                  <td>2pm to 3pm</td>
                  <td>{interventionData["2_points"]}</td>
                  <td>{interventionData["2_notes"]}</td>
                </tr>
                <tr>
                  <td>3pm to 4pm</td>
                  <td>{interventionData["3_points"]}</td>
                  <td>{interventionData["3_notes"]}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(connect(mapStoreToProps)(DailyInterventionOutput));
