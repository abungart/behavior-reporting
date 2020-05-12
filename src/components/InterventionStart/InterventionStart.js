import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import mapStoreToProps from "../../redux/mapStoreToProps";

class InterventionStart extends Component {
  state = {
    present: true,
  };

  presentToggle = () => {
    if (this.state.present === true) {
      this.setState({
        present: false,
      });
    } else {
      this.setState({
        present: true,
      });
    }
  };

  render() {
    console.log("User Item", this.props.userItem);
    return (
      <div>
        {this.props.userItem.in_intervention === true && (
          <li className="user_list">
            <h2>{this.props.userItem.name}</h2>
            {this.state.present === true && (
              <button type="button" onClick={this.presentToggle}>
                Is Absent?
              </button>
            )}
            {this.state.present === false && (
              <button type="button" onClick={this.presentToggle}>
                Is Present?
              </button>
            )}
          </li>
        )}
      </div>
    );
  }
}

export default withRouter(connect(mapStoreToProps)(InterventionStart));
