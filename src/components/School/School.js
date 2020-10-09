import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import mapStoreToProps from "../../redux/mapStoreToProps";
import StaffListItem from "../StaffListItem/StaffListItem";
import Grid from "@material-ui/core/Grid";

class School extends Component {
  componentDidMount() {
    console.log("School Mounted", this.props.store.user);

    this.props.dispatch({
      type: "GET_STAFF_LIST",
    });
  }

  render() {
    return (
      <div>
        <Grid
          container
          spacing={2}
          justify="center"
          direction="row"
          alignContent="center"
        >
          <ul>
            {this.props.store.userList.map((userItem) => {
              return <StaffListItem key={userItem.id} userItem={userItem} />;
            })}
          </ul>
        </Grid>
      </div>
    );
  }
}

export default withRouter(connect(mapStoreToProps)(School));
